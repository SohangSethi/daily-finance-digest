// ============================================================
// BIS (Bank for International Settlements) Research Integration
// Fetches latest papers and uses GPT-4o to summarize them
// ============================================================

export interface BISPaper {
  id: number;
  title: string;
  url: string;
  publishedAt: string;
  abstract: string;
  aiSummary: string;
  marketImpact: string;
  category: string;
}

const BIS_RSS_FEEDS = [
  'https://www.bis.org/doclist/bis_fsi_publs.rss',
  'https://www.bis.org/doclist/biswp.rss',
  'https://www.bis.org/doclist/quarterly.rss',
];

function parseRSSXml(xml: string): { title: string; link: string; pubDate: string; description: string }[] {
  const items: { title: string; link: string; pubDate: string; description: string }[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const pubDate = extractTag(itemXml, 'pubDate');
    const description = extractTag(itemXml, 'description');

    if (title && link) {
      items.push({
        title: cleanHtml(title),
        link: link.startsWith('http') ? link : `https://www.bis.org${link}`,
        pubDate: pubDate || new Date().toISOString(),
        description: cleanHtml(description || ''),
      });
    }
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Fetch latest BIS research papers
export async function fetchBISPapers(): Promise<{ title: string; link: string; pubDate: string; description: string }[]> {
  const allPapers: { title: string; link: string; pubDate: string; description: string }[] = [];

  for (const feedUrl of BIS_RSS_FEEDS) {
    try {
      const response = await fetch(feedUrl, {
        next: { revalidate: 3600 }, // Cache 1 hour
        headers: { 'User-Agent': 'BankerBrief/1.0' },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) continue;
      const xml = await response.text();
      const items = parseRSSXml(xml);
      allPapers.push(...items);
    } catch (error) {
      console.warn(`Failed to fetch BIS feed ${feedUrl}:`, error);
    }
  }

  // Deduplicate by title and sort by date
  const seen = new Set<string>();
  const unique = allPapers.filter((p) => {
    if (seen.has(p.title)) return false;
    seen.add(p.title);
    return true;
  });

  unique.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return unique.slice(0, 5); // Latest 5 papers
}

// Use GPT-4o to summarize BIS papers and assess market impact
export async function summarizeBISPapers(
  papers: { title: string; link: string; pubDate: string; description: string }[]
): Promise<BISPaper[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || papers.length === 0) {
    return papers.map((p, i) => ({
      id: i + 1,
      title: p.title,
      url: p.link,
      publishedAt: p.pubDate,
      abstract: p.description || 'Abstract not available.',
      aiSummary: 'GPT-4o summary unavailable — set OPENAI_API_KEY.',
      marketImpact: 'Market impact analysis requires API key.',
      category: 'Research',
    }));
  }

  const paperList = papers.map((p, i) =>
    `[${i + 1}] "${p.title}"\nPublished: ${p.pubDate}\nAbstract: ${p.description || 'No abstract available.'}`
  ).join('\n\n');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: `You are a senior policy analyst at a major bank. For each BIS (Bank for International Settlements) research paper below, provide:

PAPERS:
${paperList}

Respond in this exact JSON format (array):
[
  {
    "index": 1,
    "aiSummary": "<2-3 sentences in plain English explaining what this paper is about and its key findings. Write for a smart non-specialist — no jargon.>",
    "marketImpact": "<1-2 sentences on how this research could broadly impact markets, regulation, or banking policy. Be specific about which sectors/instruments could be affected.>",
    "category": "<one of: Monetary Policy, Financial Stability, Banking Regulation, Digital Currencies, Global Trade, Risk Management>"
  }
]

Return ONLY the JSON array.`
        }],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) throw new Error('GPT-4o failed');

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const summaries = JSON.parse(jsonStr);

    return papers.map((p, i) => {
      const summary = summaries.find((s: { index: number }) => s.index === i + 1);
      return {
        id: i + 1,
        title: p.title,
        url: p.link,
        publishedAt: p.pubDate,
        abstract: p.description || 'No abstract available.',
        aiSummary: summary?.aiSummary || 'Summary pending.',
        marketImpact: summary?.marketImpact || 'Impact analysis pending.',
        category: summary?.category || 'Research',
      };
    });
  } catch (error) {
    console.error('BIS GPT-4o summarization error:', error);
    return papers.map((p, i) => ({
      id: i + 1,
      title: p.title,
      url: p.link,
      publishedAt: p.pubDate,
      abstract: p.description || 'No abstract available.',
      aiSummary: 'AI summary temporarily unavailable.',
      marketImpact: 'Impact analysis temporarily unavailable.',
      category: 'Research',
    }));
  }
}
