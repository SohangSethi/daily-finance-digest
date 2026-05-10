// ============================================================
// Finance News Pipeline
// RSS feeds from bank newsrooms, financial news, geopolitics
// + GPT-4o curation
// ============================================================

export interface NewsArticle {
  id: number;
  rank: number;
  title: string;
  source: string;
  sourceSlug: string;
  url: string;
  publishedAt: string;
  snippet: string;
  whyRead: string;
  whyMatters: string;
  studentWhyRead: string;
  studentWhyMatters: string;
  primaryTopic: string;
  score: number;
  affectedTickers?: string[];
  riskFlags?: string[];
}

// RSS Feed URLs for finance news
const FINANCE_RSS_FEEDS = [
  // Bank Newsrooms
  { url: 'https://www.morganstanley.com/ideas/rss', name: 'Morgan Stanley', slug: 'ms' },
  { url: 'https://www.goldmansachs.com/insights/rss', name: 'Goldman Sachs', slug: 'gs' },
  { url: 'https://www.jpmorganchase.com/feeds/news', name: 'JPMorgan Chase', slug: 'jpm' },
  // Financial News
  { url: 'https://feeds.reuters.com/reuters/businessNews', name: 'Reuters Business', slug: 'reuters' },
  { url: 'https://feeds.reuters.com/Reuters/worldNews', name: 'Reuters World', slug: 'reuters-world' },
  { url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', name: 'CNBC', slug: 'cnbc' },
  { url: 'https://feeds.marketwatch.com/marketwatch/topstories/', name: 'MarketWatch', slug: 'mw' },
  { url: 'https://feeds.bloomberg.com/markets/news.rss', name: 'Bloomberg Markets', slug: 'bbg' },
  // Geopolitics
  { url: 'https://www.cfr.org/rss/global', name: 'Council on Foreign Relations', slug: 'cfr' },
  { url: 'https://www.foreignaffairs.com/rss.xml', name: 'Foreign Affairs', slug: 'fa' },
];

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  sourceSlug: string;
}

// Simple RSS XML parser (no external dependency needed)
function parseRSSXml(xml: string, sourceName: string, sourceSlug: string): RSSItem[] {
  const items: RSSItem[] = [];
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
        link,
        pubDate: pubDate || new Date().toISOString(),
        description: cleanHtml(description || '').slice(0, 300),
        source: sourceName,
        sourceSlug,
      });
    }
  }

  return items.slice(0, 10); // Limit per feed
}

function extractTag(xml: string, tag: string): string {
  // Handle CDATA
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

// Fetch all RSS feeds
export async function fetchAllFinanceNews(): Promise<RSSItem[]> {
  const allItems: RSSItem[] = [];

  const fetchPromises = FINANCE_RSS_FEEDS.map(async (feed) => {
    try {
      const response = await fetch(feed.url, {
        next: { revalidate: 1800 }, // Cache 30 min
        headers: { 'User-Agent': 'BankerBrief/1.0' },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        console.warn(`RSS feed ${feed.name} returned ${response.status}`);
        return [];
      }

      const xml = await response.text();
      return parseRSSXml(xml, feed.name, feed.slug);
    } catch (error) {
      console.warn(`Failed to fetch RSS feed ${feed.name}:`, error);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  results.forEach((items) => allItems.push(...items));

  // Sort by publish date (newest first)
  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return allItems;
}

import { PortfolioHolding } from './portfolio';

// Use GPT-4o to curate top 10 finance reads
export async function curateFinanceNews(articles: RSSItem[], portfolioHoldings: PortfolioHolding[] = []): Promise<NewsArticle[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || articles.length === 0) {
    // Return articles as-is without GPT curation
    return articles.slice(0, 10).map((a, i) => ({
      id: i + 1,
      rank: i + 1,
      title: a.title,
      source: a.source,
      sourceSlug: a.sourceSlug,
      url: a.link,
      publishedAt: a.pubDate,
      snippet: a.description,
      whyRead: a.description,
      whyMatters: 'AI curation unavailable — showing raw feed.',
      studentWhyRead: a.description,
      studentWhyMatters: 'AI curation unavailable — showing raw feed.',
      primaryTopic: a.sourceSlug.includes('cfr') || a.sourceSlug.includes('fa') || a.sourceSlug.includes('reuters-world')
        ? 'Geopolitics'
        : 'Markets',
      score: 80 - i * 3,
      affectedTickers: [],
      riskFlags: [],
    }));
  }

  // Build article list for GPT-4o
  const articleList = articles.slice(0, 40).map((a, i) =>
    `[${i + 1}] "${a.title}" — ${a.source}\nURL: ${a.link}\nPreview: ${a.description}`
  ).join('\n\n');

  const portfolioContext = portfolioHoldings.length > 0 
    ? `\n\nUSER PORTFOLIO:\n${portfolioHoldings.map(h => `${h.ticker} (${h.name})`).join(', ')}\nIf an article impacts these holdings, clearly explain how in "whyMatters".`
    : '';

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
          role: 'system',
          content: `You are an elite Wall Street analyst and risk manager. Curate the top 10 most impactful market stories from the provided news feed.
          You must read the articles, filter out noise, and explain exactly why the story matters. ${portfolioContext}

For each of the 10 stories, respond in this exact JSON format (array of objects):
[
  {
    "rank": 1,
    "originalIndex": <the [N] number from above>,
    "whyRead": "<1 sentence: why a trader/banker should read this>",
    "whyMatters": "<2-3 sentences: market impact analysis, what it means for positions/sectors>",
    "studentWhyRead": "<1 sentence: explain to someone who barely knows finance why this article matters, no jargon>",
    "studentWhyMatters": "<2-3 sentences: plain-English explanation of what this means for the economy and everyday people, explain any financial concepts used>",
    "primaryTopic": "<one of: Markets, Macro, Geopolitics, Central Banks, Earnings, M&A, Regulation, Commodities>",
    "score": <relevance score 60-99>,
    "affectedTickers": ["AAPL", "MSFT"] or [],
    "riskFlags": ["Guidance cut", "Macro Shock"] or []
  }
]

Prioritize: (1) market-moving news, (2) central bank/policy, (3) geopolitics affecting markets, (4) major earnings/M&A. Ensure topic diversity.
Return ONLY the JSON array, no markdown.`
        }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error('GPT-4o curation failed:', response.status);
      throw new Error('GPT-4o failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    // Parse JSON (handle potential markdown wrapping)
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const curated = JSON.parse(jsonStr);

    return curated.map((c: { rank: number; originalIndex: number; whyRead: string; whyMatters: string; studentWhyRead?: string; studentWhyMatters?: string; primaryTopic: string; score: number; affectedTickers?: string[]; riskFlags?: string[] }) => {
      const original = articles[c.originalIndex - 1];
      return {
        id: c.rank,
        rank: c.rank,
        title: original?.title || 'Unknown',
        source: original?.source || 'Unknown',
        sourceSlug: original?.sourceSlug || 'unknown',
        url: original?.link || '#',
        publishedAt: original?.pubDate || new Date().toISOString(),
        snippet: original?.description || '',
        whyRead: c.whyRead,
        whyMatters: c.whyMatters,
        studentWhyRead: c.studentWhyRead || c.whyRead,
        studentWhyMatters: c.studentWhyMatters || c.whyMatters,
        primaryTopic: c.primaryTopic,
        score: c.score,
        affectedTickers: c.affectedTickers || [],
        riskFlags: c.riskFlags || [],
      };
    });
  } catch (error) {
    console.error('OpenAI curation error:', error);
    // Fallback: return top 10 as-is
    return articles.slice(0, 10).map((a, i) => ({
      id: i + 1,
      rank: i + 1,
      title: a.title,
      source: a.source,
      sourceSlug: a.sourceSlug,
      url: a.link,
      publishedAt: a.pubDate,
      snippet: a.description,
      whyRead: a.description,
      whyMatters: 'AI curation temporarily unavailable.',
      studentWhyRead: a.description,
      studentWhyMatters: 'AI curation temporarily unavailable.',
      primaryTopic: 'Markets',
      score: 80 - i * 3,
      affectedTickers: [],
      riskFlags: [],
    }));
  }
}

// Generate AI market summary focused on geopolitics impact
export async function generateMarketSummary(articles: RSSItem[]): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || articles.length === 0) {
    return null;
  }

  const headlines = articles.slice(0, 20).map(a => `• ${a.title} (${a.source})`).join('\n');

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
          content: `You are a senior market strategist. Based on these headlines, write a 2-3 sentence market summary for a Wall Street trading desk. Focus on: (1) the biggest market-moving theme, (2) how geopolitics is affecting markets today, (3) what to watch. Be specific and actionable — mention specific indices, sectors, or assets when relevant.

Headlines:
${headlines}

Write ONLY the summary, no formatting or labels. Keep it under 60 words.`
        }],
        temperature: 0.4,
        max_tokens: 200,
      }),
    });

    if (!response.ok) throw new Error('GPT-4o failed');
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch {
    return 'AI market summary temporarily unavailable. Check back shortly.';
  }
}
