// ============================================================
// AI-Powered Internship Scanner
// Uses OpenAI GPT-4o with web search to actively discover
// new Summer 2027 internship postings from the internet.
// This runs every 3 hours and finds postings our static
// sources (Greenhouse/Lever/GitHub repos) miss.
// ============================================================

export interface ScannedPosting {
  company: string;
  title: string;
  location: string;
  url: string;
  postedDate: string | null;
  sector: string;
}

// Companies to actively scan for — focus on banks and firms
// that use custom career portals we can't scrape via API
const SCAN_TARGETS = [
  // Bulge bracket banks
  'JPMorgan Chase', 'Goldman Sachs', 'Morgan Stanley', 'Bank of America',
  'Citigroup', 'Barclays', 'Deutsche Bank', 'UBS', 'Credit Suisse',
  // Japanese / regional banks
  'SMBC', 'Mizuho', 'MUFG', 'Nomura', 'BNP Paribas', 'HSBC',
  'Jefferies', 'RBC Capital Markets', 'Wells Fargo',
  // Elite boutiques
  'Lazard', 'Evercore', 'Moelis', 'PJT Partners', 'Centerview Partners',
  'Perella Weinberg', 'Houlihan Lokey', 'Guggenheim',
  // Consulting
  'McKinsey', 'BCG', 'Bain', 'Oliver Wyman', 'Deloitte', 'PwC', 'EY', 'KPMG',
  // Asset Management / PE
  'BlackRock', 'KKR', 'Blackstone', 'Apollo', 'Carlyle',
  'PGIM', 'Prudential', 'Vanguard', 'Fidelity', 'PIMCO',
  // Quant / HFT
  'Citadel', 'Two Sigma', 'Jane Street', 'D.E. Shaw', 'Point72',
  'Bridgewater', 'AQR', 'Millennium', 'Jump Trading', 'Hudson River Trading',
  // Tech
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'NVIDIA',
  'Stripe', 'Coinbase', 'Palantir', 'Databricks',
  // Other
  'Johnson & Johnson', 'Pfizer', 'Toyota', 'ExxonMobil',
  'Lockheed Martin', 'Boeing', 'Procter & Gamble',
];

/**
 * Use OpenAI GPT-4o with web search to find the latest
 * Summer 2027 internship postings. This is the "go search
 * the internet" function that runs every 3 hours.
 */
export async function scanForNewInternships(): Promise<ScannedPosting[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[Scanner] No OPENAI_API_KEY set, skipping AI scan');
    return [];
  }

  console.log('[Scanner] Starting AI-powered internship scan...');

  try {
    // Split companies into batches to avoid token limits
    const batches = chunkArray(SCAN_TARGETS, 25);
    const allPostings: ScannedPosting[] = [];

    for (const batch of batches) {
      const postings = await scanBatch(apiKey, batch);
      allPostings.push(...postings);
      // Rate limit
      await sleep(1000);
    }

    console.log(`[Scanner] AI scan complete — found ${allPostings.length} postings`);
    return allPostings;
  } catch (error) {
    console.error('[Scanner] AI scan failed:', error);
    return [];
  }
}

async function scanBatch(apiKey: string, companies: string[]): Promise<ScannedPosting[]> {
  const companyList = companies.join(', ');

  const prompt = `You are a job search assistant. Search the web RIGHT NOW for Summer 2027 internship postings from these companies: ${companyList}

IMPORTANT RULES:
- Only include INTERNSHIP, CO-OP, or SUMMER ANALYST roles for Summer 2027
- Do NOT include full-time, senior, manager, or experienced roles
- Only include roles that are CURRENTLY OPEN for applications (not closed or expired)
- Include the DIRECT APPLICATION URL for each role (the actual link to apply, not a search results page)
- If you cannot find any open internship postings for a company, skip it entirely

For each posting found, provide:
- company: The company name
- title: The exact job title
- location: The location(s)
- url: The direct application URL
- postedDate: When it was posted (YYYY-MM-DD format, or null if unknown)
- sector: One of: Banking, Quant / HFT, Consulting, Asset Management, Tech, Healthcare, Consumer, Industrial, Energy, Defense

Respond ONLY with a valid JSON array. No markdown, no code blocks, no explanation. Just the raw JSON array. If no postings found, respond with []`;

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        tools: [{ type: 'web_search_preview' }],
        input: prompt,
        temperature: 0.1,
      }),
      signal: AbortSignal.timeout(60000), // 60s timeout for web search
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Scanner] OpenAI API error: ${response.status} ${errText}`);

      // Fallback to chat completions without web search
      return await scanBatchFallback(apiKey, companies);
    }

    const data = await response.json();

    // Extract text output from the response
    let text = '';
    if (data.output) {
      for (const item of data.output) {
        if (item.type === 'message' && item.content) {
          for (const block of item.content) {
            if (block.type === 'output_text') {
              text += block.text;
            }
          }
        }
      }
    }

    if (!text) {
      console.warn('[Scanner] Empty response from OpenAI');
      return [];
    }

    return parsePostingsFromJSON(text);
  } catch (error) {
    console.warn('[Scanner] Responses API failed, trying fallback:', error);
    return await scanBatchFallback(apiKey, companies);
  }
}

/**
 * Fallback using regular chat completions if Responses API fails
 */
async function scanBatchFallback(apiKey: string, companies: string[]): Promise<ScannedPosting[]> {
  const companyList = companies.join(', ');

  const prompt = `You are a finance recruiting expert. List ALL currently open Summer 2027 internship, summer analyst, and co-op positions from these companies: ${companyList}

RULES:
- ONLY internship/co-op/summer analyst roles for Summer 2027
- NO full-time, senior, or experienced roles
- Include direct application URLs where possible
- If a company hasn't opened Summer 2027 applications yet, skip them

Respond with a JSON array where each item has: company, title, location, url, postedDate (YYYY-MM-DD or null), sector (Banking/Quant / HFT/Consulting/Asset Management/Tech/Healthcare/Consumer/Industrial/Energy/Defense)

Respond ONLY with the raw JSON array, no markdown or explanation.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 4096,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      console.warn(`[Scanner] Chat completions error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    return parsePostingsFromJSON(text);
  } catch (error) {
    console.warn('[Scanner] Fallback scan failed:', error);
    return [];
  }
}

function parsePostingsFromJSON(text: string): ScannedPosting[] {
  try {
    // Clean the response — remove markdown code blocks if present
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((p: Record<string, unknown>) =>
        p.company && p.title && p.url &&
        typeof p.company === 'string' &&
        typeof p.title === 'string' &&
        typeof p.url === 'string'
      )
      .map((p: Record<string, string | null>) => ({
        company: p.company!,
        title: p.title!,
        location: p.location || 'See listing',
        url: p.url!,
        postedDate: p.postedDate || null,
        sector: p.sector || 'Tech',
      }));
  } catch (error) {
    console.warn('[Scanner] Failed to parse AI response as JSON:', error);
    return [];
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
