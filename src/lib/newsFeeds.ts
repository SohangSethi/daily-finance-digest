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
  summary: string;
  whyRead: string;
  whyMatters: string;
  marketImpact: string;
  studentWhyRead: string;
  studentWhyMatters: string;
  primaryTopic: string;
  score: number;
  affectedTickers?: string[];
  riskFlags?: string[];
}

// RSS Feed URLs for finance news
// priority: higher = more likely to contain market-relevant content
const FINANCE_RSS_FEEDS = [
  // Tier 1: Pure markets & finance
  { url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', name: 'WSJ Markets', slug: 'wsj-markets', priority: 10 },
  { url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml', name: 'WSJ Business', slug: 'wsj', priority: 9 },
  { url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664', name: 'CNBC', slug: 'cnbc', priority: 9 },
  { url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147', name: 'CNBC Economy', slug: 'cnbc-econ', priority: 9 },
  { url: 'https://finance.yahoo.com/news/rssindex', name: 'Yahoo Finance', slug: 'yahoo', priority: 8 },
  { url: 'https://feeds.marketwatch.com/marketwatch/topstories/', name: 'MarketWatch', slug: 'mw', priority: 8 },
  { url: 'https://feeds.marketwatch.com/marketwatch/marketpulse/', name: 'MarketWatch Pulse', slug: 'mw-pulse', priority: 8 },
  // Tier 2: Business news with some market relevance
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml', name: 'BBC Business', slug: 'bbc', priority: 5 },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml', name: 'NYT Business', slug: 'nyt', priority: 5 },
  // Tier 3: Geopolitics (market impact via macro risk)
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', name: 'BBC World', slug: 'bbc-world', priority: 3 },
  { url: 'https://www.foreignaffairs.com/rss.xml', name: 'Foreign Affairs', slug: 'fa', priority: 3 },
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
  if (match && match[1].trim()) return match[1].trim();

  // Handle self-closing tags like <link href="..." />
  if (tag === 'link') {
    const hrefRegex = /<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i;
    const hrefMatch = xml.match(hrefRegex);
    if (hrefMatch) return hrefMatch[1].trim();
  }

  return '';
}

function cleanHtml(text: string): string {
  return text
    // Strip HTML tags
    .replace(/<[^>]*>/g, '')
    // Standard HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&bull;/g, '•')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™')
    .replace(/&euro;/g, '€')
    .replace(/&pound;/g, '£')
    .replace(/&yen;/g, '¥')
    // Numeric HTML entities
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    // Remove any remaining HTML entities
    .replace(/&[a-zA-Z]+;/g, '')
    // Strip common RSS feed artifacts
    .replace(/&{2,}/g, '') // &&& artifacts
    .replace(/\${2,}/g, '') // $$$ artifacts
    .replace(/#{2,}/g, '')  // ### artifacts
    .replace(/\*{3,}/g, '') // *** artifacts
    .replace(/={3,}/g, '')  // === artifacts
    .replace(/~{3,}/g, '')  // ~~~ artifacts
    // Strip CDATA remnants
    .replace(/\[CDATA\[/g, '')
    .replace(/\]\]/g, '')
    // Normalize whitespace
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

// ============================================================
// Smart fallback curation (no AI needed)
// Scores articles by finance/market relevance using keyword matching
// ============================================================

// Keywords that signal market-relevant content, grouped by topic
const MARKET_KEYWORDS: Record<string, { keywords: string[]; weight: number }> = {
  'Central Banks': { keywords: ['fed', 'fomc', 'rate cut', 'rate hike', 'interest rate', 'powell', 'monetary policy', 'central bank', 'ecb', 'boj', 'inflation target', 'quantitative', 'tightening', 'easing', 'dovish', 'hawkish', 'basis points', 'fed funds'], weight: 15 },
  'Macro': { keywords: ['cpi', 'inflation', 'gdp', 'jobs report', 'nonfarm', 'payrolls', 'unemployment', 'pce', 'consumer spending', 'retail sales', 'housing starts', 'pmi', 'ism', 'recession', 'economic growth', 'labor market', 'wage growth', 'treasury yield', 'yield curve', 'bond market'], weight: 14 },
  'Earnings': { keywords: ['earnings', 'revenue', 'profit', 'eps', 'quarterly results', 'beat estimates', 'missed expectations', 'guidance', 'outlook', 'fiscal quarter', 'revenue growth', 'operating income', 'net income', 'margin'], weight: 13 },
  'Markets': { keywords: ['s&p 500', 'nasdaq', 'dow jones', 'stock market', 'rally', 'selloff', 'bull market', 'bear market', 'correction', 'market cap', 'ipo', 'spac', 'trading', 'volatility', 'vix', 'futures', 'options', 'equities', 'shares', 'wall street', 'investors'], weight: 12 },
  'M&A': { keywords: ['merger', 'acquisition', 'takeover', 'buyout', 'deal', 'private equity', 'leveraged', 'spin-off', 'divestiture', 'antitrust'], weight: 12 },
  'Commodities': { keywords: ['oil', 'crude', 'wti', 'brent', 'gold', 'silver', 'copper', 'natural gas', 'opec', 'commodity', 'commodity prices', 'energy prices'], weight: 11 },
  'Regulation': { keywords: ['sec', 'regulation', 'compliance', 'antitrust', 'ftc', 'doj', 'legislation', 'banking regulation', 'capital requirements', 'dodd-frank', 'financial regulation', 'crypto regulation', 'fintech'], weight: 10 },
  'Geopolitics': { keywords: ['tariff', 'trade war', 'sanctions', 'geopolitical', 'china', 'russia', 'ukraine', 'taiwan', 'middle east', 'nato', 'embargo', 'export controls', 'supply chain', 'trade deal', 'g7', 'g20'], weight: 9 },
};

// Common ticker symbols to detect in article text
const COMMON_TICKERS: Record<string, string> = {
  'apple': 'AAPL', 'microsoft': 'MSFT', 'google': 'GOOGL', 'alphabet': 'GOOGL',
  'amazon': 'AMZN', 'meta': 'META', 'facebook': 'META', 'tesla': 'TSLA',
  'nvidia': 'NVDA', 'jpmorgan': 'JPM', 'goldman sachs': 'GS', 'goldman': 'GS',
  'morgan stanley': 'MS', 'bank of america': 'BAC', 'citigroup': 'C', 'citi': 'C',
  'visa': 'V', 'exxon': 'XOM', 'chevron': 'CVX', 'boeing': 'BA',
  'disney': 'DIS', 'netflix': 'NFLX', 'amd': 'AMD', 'intel': 'INTC',
  'walmart': 'WMT', 'target': 'TGT', 'costco': 'COST',
  'unitedhealth': 'UNH', 'johnson & johnson': 'JNJ', 'pfizer': 'PFE',
  'berkshire': 'BRK.B', 'coca-cola': 'KO', 'pepsi': 'PEP',
};

// Topic-specific "why read" and "why matters" templates for bankers
const TOPIC_CONTEXT: Record<string, { whyRead: string; whyMatters: string; studentWhyRead: string; studentWhyMatters: string }> = {
  'Central Banks': {
    whyRead: 'Central bank policy directly drives rates, credit spreads, and asset valuations across your book.',
    whyMatters: 'Fed decisions and forward guidance move Treasury yields, affect LBO financing windows, and reprices duration risk across fixed income portfolios.',
    studentWhyRead: 'Central banks control interest rates, which affect everything from mortgage costs to stock prices.',
    studentWhyMatters: 'When the Federal Reserve changes interest rates, it ripples through the entire economy — affecting borrowing costs for businesses and consumers alike.',
  },
  'Macro': {
    whyRead: 'Key economic data release — watch for market repricing of rate expectations and sector rotation.',
    whyMatters: 'Economic indicators drive Fed policy expectations, credit conditions, and sector allocation. Strong/weak data can trigger rapid position adjustments.',
    studentWhyRead: 'This economic data tells us how healthy the economy is right now.',
    studentWhyMatters: 'Economic reports like jobs data and inflation numbers help everyone understand if the economy is growing or slowing, which affects job security and prices.',
  },
  'Earnings': {
    whyRead: 'Earnings results and guidance drive single-stock moves and set tone for sector peers.',
    whyMatters: 'Earnings beats/misses affect not just the reporting company but set expectations for sector peers. Watch guidance revisions for forward positioning.',
    studentWhyRead: 'A major company just reported how much money it made — this moves its stock price.',
    studentWhyMatters: 'When big companies report earnings, it tells investors whether the company is doing better or worse than expected, which directly moves stock prices.',
  },
  'Markets': {
    whyRead: 'Broad market move — check positioning, hedges, and exposure across your portfolio.',
    whyMatters: 'Market-wide moves affect correlation and beta exposure. Monitor VIX, breadth, and sector leadership for tactical adjustments.',
    studentWhyRead: 'The stock market is making a significant move that affects many investors.',
    studentWhyMatters: 'When the overall market moves significantly up or down, it affects retirement accounts, investment portfolios, and overall economic confidence.',
  },
  'M&A': {
    whyRead: 'M&A activity signals deal flow, spreads, and sector consolidation trends relevant to advisory and trading.',
    whyMatters: 'Deal announcements move target/acquirer stocks, affect merger arb spreads, and signal broader sector consolidation themes. Watch financing terms.',
    studentWhyRead: 'A major deal between companies is happening, which can reshape an industry.',
    studentWhyMatters: 'When companies merge or acquire each other, it can change competition in an industry, affect jobs, and move stock prices significantly.',
  },
  'Commodities': {
    whyRead: 'Commodity price moves affect energy sector earnings, inflation expectations, and EM currencies.',
    whyMatters: 'Oil and metals prices flow through to CPI components, energy sector margins, and commodity-linked EM sovereign risk. Monitor OPEC dynamics.',
    studentWhyRead: 'Oil or commodity prices are moving, which affects gas prices and inflation.',
    studentWhyMatters: 'Commodity prices affect what you pay for gas, food, and energy — when they rise, companies pass costs to consumers, fueling inflation.',
  },
  'Regulation': {
    whyRead: 'Regulatory changes affect compliance costs, deal structures, and sector valuations.',
    whyMatters: 'New regulations can reshape competitive dynamics, increase capital requirements, or open/close market opportunities. Watch for impact on banking and fintech.',
    studentWhyRead: 'New rules or regulations could change how certain industries operate.',
    studentWhyMatters: 'Government regulations can force companies to change how they do business, affecting their profits and the services available to consumers.',
  },
  'Geopolitics': {
    whyRead: 'Geopolitical risk affects commodity flows, sanctions exposure, and cross-border deal activity.',
    whyMatters: 'Geopolitical tensions drive risk premia, safe-haven flows, and can disrupt supply chains. Watch for sanctions, trade barriers, and defense spending shifts.',
    studentWhyRead: 'International events are creating uncertainty that could affect financial markets.',
    studentWhyMatters: 'When countries have conflicts or tensions, it can disrupt trade, raise energy prices, and create uncertainty that makes markets nervous.',
  },
};

function scoreArticleRelevance(title: string, description: string, sourceSlug: string): { score: number; topic: string; tickers: string[] } {
  const text = `${title} ${description}`.toLowerCase();
  let bestScore = 0;
  let bestTopic = 'Markets';

  // Score against each topic category
  for (const [topic, { keywords, weight }] of Object.entries(MARKET_KEYWORDS)) {
    let topicScore = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) {
        topicScore += weight;
      }
    }
    if (topicScore > bestScore) {
      bestScore = topicScore;
      bestTopic = topic;
    }
  }

  // Boost score for finance-first sources
  const sourcePriority = FINANCE_RSS_FEEDS.find(f => f.slug === sourceSlug)?.priority || 5;
  bestScore += sourcePriority;

  // Detect tickers mentioned
  const tickers: string[] = [];
  for (const [name, ticker] of Object.entries(COMMON_TICKERS)) {
    if (text.includes(name.toLowerCase())) {
      if (!tickers.includes(ticker)) tickers.push(ticker);
    }
  }

  return { score: bestScore, topic: bestTopic, tickers };
}

// Fallback curation if OpenAI fails or key is missing
function fallbackCuration(articles: RSSItem[]): NewsArticle[] {
  if (articles.length === 0) return [];

  // Score all articles for market relevance
  const scored = articles.map(a => {
    const { score, topic, tickers } = scoreArticleRelevance(a.title, a.description, a.sourceSlug);
    return { article: a, score, topic, tickers };
  });

  // Sort by relevance score (highest first)
  scored.sort((a, b) => b.score - a.score);

  // Pick top articles with source diversity (max 2 per source)
  const selected: typeof scored = [];
  const sourceCount: Record<string, number> = {};

  for (const item of scored) {
    if (selected.length >= 10) break;
    const count = sourceCount[item.article.source] || 0;
    if (count < 2) {
      selected.push(item);
      sourceCount[item.article.source] = count + 1;
    }
  }

  return selected.map((item, i) => {
    const ctx = TOPIC_CONTEXT[item.topic] || TOPIC_CONTEXT['Markets'];
    return {
      id: i + 1,
      rank: i + 1,
      title: item.article.title,
      source: item.article.source,
      sourceSlug: item.article.sourceSlug,
      url: item.article.link,
      publishedAt: item.article.pubDate,
      snippet: item.article.description,
      summary: item.article.description.slice(0, 200) + (item.article.description.length > 200 ? '...' : ''),
      whyRead: ctx.whyRead,
      whyMatters: ctx.whyMatters,
      marketImpact: `Classified as ${item.topic}. ${item.tickers.length > 0 ? `Potentially affects: ${item.tickers.join(', ')}.` : 'Monitor for broader sector impact.'}`,
      studentWhyRead: ctx.studentWhyRead,
      studentWhyMatters: ctx.studentWhyMatters,
      primaryTopic: item.topic,
      score: Math.min(95, 60 + item.score),
      affectedTickers: item.tickers,
      riskFlags: item.score > 25 ? ['Market Moving'] : [],
    };
  });
}

// Use GPT-4o to curate top 10 finance reads
export async function curateFinanceNews(articles: RSSItem[], portfolioHoldings: PortfolioHolding[] = []): Promise<NewsArticle[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || articles.length === 0) {
    return fallbackCuration(articles);
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
    "summary": "<2-3 sentence factual summary of what this article is about>",
    "whyRead": "<1 sentence: why a trader/banker should read this>",
    "whyMatters": "<2-3 sentences: market impact analysis, what it means for positions/sectors>",
    "marketImpact": "<2-3 sentences: specific market effects — which assets/sectors/instruments move and in which direction>",
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
        }, {
          role: 'user',
          content: articleList
        }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error('GPT-4o curation failed:', response.status);
      return fallbackCuration(articles);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    // Parse JSON (handle potential markdown wrapping)
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const curated = JSON.parse(jsonStr);

    return curated.map((c: { rank: number; originalIndex: number; summary?: string; whyRead: string; whyMatters: string; marketImpact?: string; studentWhyRead?: string; studentWhyMatters?: string; primaryTopic: string; score: number; affectedTickers?: string[]; riskFlags?: string[] }) => {
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
        summary: c.summary || original?.description || '',
        whyRead: c.whyRead,
        whyMatters: c.whyMatters,
        marketImpact: c.marketImpact || '',
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
    // Fallback: return raw articles mapped to NewsArticle
    return fallbackCuration(articles);
  }
}

// Generate a headline-based market summary without AI
function generateHeadlineSummary(articles: RSSItem[]): string {
  if (articles.length === 0) {
    return 'Market data is currently being refreshed. Check back shortly for the latest headlines and analysis.';
  }

  // Pick the top 3 most recent headlines from different sources
  const seen = new Set<string>();
  const topHeadlines: string[] = [];
  for (const a of articles) {
    if (!seen.has(a.source) && topHeadlines.length < 3) {
      seen.add(a.source);
      // Truncate long titles
      const title = a.title.length > 80 ? a.title.slice(0, 77) + '...' : a.title;
      topHeadlines.push(`${title} (${a.source})`);
    }
  }

  const now = new Date();
  const timeLabel = now.getHours() < 12 ? 'this morning' : now.getHours() < 17 ? 'this afternoon' : 'this evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return `Top headlines ${timeLabel}, ${dateStr}: ${topHeadlines.join(' | ')}. Refresh hourly for updated coverage.`;
}

// Generate AI market summary focused on geopolitics impact
export async function generateMarketSummary(articles: RSSItem[]): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  // If no API key, generate a headline-based summary instead of returning null
  if (!apiKey) {
    return generateHeadlineSummary(articles);
  }

  if (articles.length === 0) {
    return 'No live news feeds available at the moment. Data will refresh automatically.';
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
    // Fall back to headline summary if AI fails
    return generateHeadlineSummary(articles);
  }
}
