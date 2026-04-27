// ============================================================
// BANKERBRIEF — MOCK DATA
// Realistic finance data for the MVP static homepage
// ============================================================

export interface MacroIndicator {
  name: string;
  slug: string;
  value: string;
  unit: string;
  change: string;
  direction: 'up' | 'down' | 'flat';
  sparkline: number[];
  nextRelease: string;
  category: 'inflation' | 'employment' | 'growth' | 'rates';
}

export interface MarketInstrument {
  name: string;
  symbol: string;
  value: string;
  unit: string;
  changeAbs: string;
  changePct: string;
  direction: 'up' | 'down' | 'flat';
  sparkline: number[];
  assetClass: 'rates' | 'equities' | 'commodities' | 'credit' | 'vol' | 'fx';
  invertColor?: boolean; // VIX: up = bad
}

export interface Article {
  id: number;
  rank: number;
  title: string;
  source: string;
  sourceSlug: string;
  publishedAt: string;
  timeAgo: string;
  compositeScore: number;
  tags: string[];
  whyRead: string;
  whyMatters: string;
  url: string;
  clusterSize?: number;
}

export interface CalendarEvent {
  id: number;
  name: string;
  type: 'fomc' | 'cpi' | 'pce' | 'gdp' | 'payrolls' | 'ism' | 'refunding' | 'earnings';
  date: string;
  daysUntil: number;
  impactLevel: 'high' | 'medium' | 'low';
}

export interface EarningsEvent {
  company: string;
  ticker: string;
  reportDate: string;
  dayOfWeek: string;
  reportTime: 'before_market' | 'after_close';
  epsEstimate: string;
}

export interface SectorPulse {
  name: string;
  slug: string;
  changePct: number;
  articleCount: number;
}

export interface Deal {
  id: number;
  name: string;
  type: 'M&A' | 'Bond Issuance' | 'IPO' | 'LevFin';
  size: string;
  parties: string;
  leadBanks?: string;
  timeAgo: string;
}

export interface WhatChanged {
  item: string;
  type: 'market' | 'macro' | 'article' | 'event';
  change: string;
  direction: 'up' | 'down' | 'flat' | 'new';
}

export interface TickerItem {
  name: string;
  value: string;
  change: string;
  direction: 'up' | 'down' | 'flat';
}

// ============================================================
// TICKER RIBBON DATA
// ============================================================

export const tickerData: TickerItem[] = [
  { name: 'S&P 500', value: '5,285.3', change: '+0.42%', direction: 'up' },
  { name: 'NDX', value: '18,421.0', change: '+0.68%', direction: 'up' },
  { name: 'DJI', value: '39,142.8', change: '-0.12%', direction: 'down' },
  { name: '10Y', value: '4.42%', change: '+3bp', direction: 'up' },
  { name: '2Y', value: '4.88%', change: '-1bp', direction: 'down' },
  { name: 'VIX', value: '14.2', change: '-0.8', direction: 'down' },
  { name: 'DXY', value: '104.3', change: '+0.2%', direction: 'up' },
  { name: 'WTI', value: '$78.2', change: '-1.1%', direction: 'down' },
  { name: 'Gold', value: '$2,340', change: '+0.3%', direction: 'up' },
  { name: 'IG Spd', value: '93bp', change: '-2bp', direction: 'down' },
  { name: 'HY Spd', value: '338bp', change: '+5bp', direction: 'up' },
  { name: 'SOFR', value: '5.31%', change: '—', direction: 'flat' },
];

// ============================================================
// MACRO INDICATORS
// ============================================================

export const macroIndicators: MacroIndicator[] = [
  {
    name: 'Fed Funds',
    slug: 'fed_funds',
    value: '5.25-5.50',
    unit: '%',
    change: '—',
    direction: 'flat',
    sparkline: [5.33, 5.33, 5.33, 5.33, 5.33, 5.33, 5.33, 5.33, 5.33, 5.33, 5.33, 5.33],
    nextRelease: 'Jun 12',
    category: 'rates',
  },
  {
    name: 'CPI YoY',
    slug: 'cpi_yoy',
    value: '3.5',
    unit: '%',
    change: '+0.3',
    direction: 'up',
    sparkline: [3.1, 3.2, 3.2, 3.1, 3.0, 3.1, 3.2, 3.4, 3.1, 3.2, 3.4, 3.5],
    nextRelease: 'May 15',
    category: 'inflation',
  },
  {
    name: 'Core PCE',
    slug: 'core_pce',
    value: '2.8',
    unit: '%',
    change: '→',
    direction: 'flat',
    sparkline: [3.2, 3.1, 3.0, 2.9, 2.9, 2.8, 2.8, 2.9, 2.8, 2.8, 2.8, 2.8],
    nextRelease: 'May 31',
    category: 'inflation',
  },
  {
    name: 'Unemployment',
    slug: 'unemployment',
    value: '3.8',
    unit: '%',
    change: '-0.1',
    direction: 'down',
    sparkline: [3.6, 3.5, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.8, 3.7, 3.9, 3.8],
    nextRelease: 'May 3',
    category: 'employment',
  },
  {
    name: 'GDP QoQ',
    slug: 'gdp',
    value: '3.3',
    unit: '%',
    change: '+0.5',
    direction: 'up',
    sparkline: [2.1, 2.0, 2.1, 4.9, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3],
    nextRelease: 'Jun 27',
    category: 'growth',
  },
];

// ============================================================
// MARKET INSTRUMENTS
// ============================================================

export const marketInstruments: MarketInstrument[] = [
  {
    name: '10Y UST',
    symbol: '^TNX',
    value: '4.42',
    unit: '%',
    changeAbs: '+8bp',
    changePct: '+1.8%',
    direction: 'up',
    sparkline: [4.25, 4.28, 4.32, 4.30, 4.35, 4.38, 4.34, 4.36, 4.40, 4.38, 4.34, 4.42],
    assetClass: 'rates',
  },
  {
    name: '2s10s',
    symbol: '2s10s',
    value: '-46',
    unit: 'bp',
    changeAbs: '+3bp',
    changePct: '',
    direction: 'up',
    sparkline: [-55, -52, -50, -48, -51, -49, -47, -50, -48, -47, -49, -46],
    assetClass: 'rates',
  },
  {
    name: 'IG Spread',
    symbol: 'IG',
    value: '93',
    unit: 'bp',
    changeAbs: '-2bp',
    changePct: '',
    direction: 'down',
    sparkline: [100, 98, 95, 97, 96, 94, 95, 96, 95, 94, 95, 93],
    assetClass: 'credit',
  },
  {
    name: 'HY Spread',
    symbol: 'HY',
    value: '338',
    unit: 'bp',
    changeAbs: '+5bp',
    changePct: '',
    direction: 'up',
    sparkline: [320, 318, 325, 330, 328, 331, 335, 333, 330, 332, 333, 338],
    assetClass: 'credit',
  },
  {
    name: 'VIX',
    symbol: '^VIX',
    value: '14.2',
    unit: '',
    changeAbs: '-0.8',
    changePct: '-5.3%',
    direction: 'down',
    sparkline: [18.5, 17.2, 16.8, 15.9, 15.5, 14.8, 15.2, 15.0, 14.5, 14.8, 15.0, 14.2],
    assetClass: 'vol',
    invertColor: true,
  },
  {
    name: 'WTI Crude Oil',
    symbol: 'CL=F',
    value: '78.20',
    unit: '$',
    changeAbs: '-1.10',
    changePct: '-1.4%',
    direction: 'down',
    sparkline: [82.1, 81.5, 80.8, 80.2, 79.5, 81.0, 80.5, 79.8, 79.0, 78.5, 78.8, 78.2],
    assetClass: 'commodities',
  },
];

// ============================================================
// AI MARKET SUMMARY
// ============================================================
export const aiMarketSummary = "Markets are pricing in a higher-for-longer rate environment following hawkish Fed chatter and robust CPI data, putting pressure on duration and LBO financing windows. Meanwhile, WTI crude has slipped below $80 on inventory builds, providing some disinflationary relief to the macro picture.";

// ============================================================
// AI TOP 10 READS
// ============================================================

export const topReads: Article[] = [
  {
    id: 1,
    rank: 1,
    title: 'Fed Signals Extended Pause as Inflation Data Stalls Progress Toward 2% Target',
    source: 'Reuters',
    sourceSlug: 'reuters',
    publishedAt: '2025-04-19T04:12:00Z',
    timeAgo: '2h ago',
    compositeScore: 94,
    tags: ['Rates', 'Macro'],
    whyRead: 'Rate path is the dominant input to LBO financing costs — the Fed just shifted its forward guidance language.',
    whyMatters: 'A prolonged pause extends the current rate environment for leveraged finance, keeping spreads stable but limiting refi windows for issuers hoping for lower rates. DCM pipelines should expect steady but unspectacular issuance volumes through Q3. For M&A sponsors, higher-for-longer means continued pressure on deal multiples and carry cost sensitivity in LBO models.',
    url: '#',
    clusterSize: 4,
  },
  {
    id: 2,
    rank: 2,
    title: 'JPMorgan Q1 Earnings Beat — Investment Banking Fees Surge 27% on Debt Issuance',
    source: 'Wall Street Journal',
    sourceSlug: 'wsj',
    publishedAt: '2025-04-19T02:30:00Z',
    timeAgo: '4h ago',
    compositeScore: 91,
    tags: ['Earnings', 'Financials'],
    whyRead: 'Bellwether bank signals IB fee recovery is real — first strong quarter in 6 for deal activity.',
    whyMatters: 'JPM\'s 27% IB fee jump driven largely by debt underwriting confirms the DCM window is wide open. This sets a positive tone for Goldman and Morgan Stanley earnings later this week. For junior bankers: pipeline acceleration means staffing pressure. For S&T: fixed income trading revenue beat suggests rates vol is still generating desk P&L.',
    url: '#',
    clusterSize: 3,
  },
  {
    id: 3,
    rank: 3,
    title: 'Treasury Department Announces $125B Quarterly Refunding — Coupon Sizes Unchanged',
    source: 'U.S. Treasury',
    sourceSlug: 'treasury',
    publishedAt: '2025-04-19T01:00:00Z',
    timeAgo: '5h ago',
    compositeScore: 88,
    tags: ['Rates', 'Macro'],
    whyRead: 'Refunding announcement is the supply-side signal for rates — unchanged coupon sizes remove a key risk factor.',
    whyMatters: 'Steady coupon sizes signal Treasury is comfortable with current issuance pace, reducing term premium anxiety. This is supportive for duration and should keep the 10Y anchored near current levels. For DCM teams, a stable rates backdrop means tighter new-issue concessions and better execution windows.',
    url: '#',
  },
  {
    id: 4,
    rank: 4,
    title: 'OpenAI Closes $6.6B Funding Round at $150B Valuation — Largest VC Round in History',
    source: 'Financial Times',
    sourceSlug: 'ft',
    publishedAt: '2025-04-18T22:15:00Z',
    timeAgo: '8h ago',
    compositeScore: 86,
    tags: ['AI', 'M&A'],
    whyRead: 'Sets the valuation benchmark for the entire AI sector — directly relevant for TMT bankers and growth equity.',
    whyMatters: '$150B valuation at ~15x forward revenue creates a ceiling comp for every AI startup cap table. TMT groups should expect this to accelerate secondary market activity and IPO conversations across the AI stack. Adjacent infrastructure companies (cloud, chips, data centers) see downstream valuation re-rating.',
    url: '#',
    clusterSize: 5,
  },
  {
    id: 5,
    rank: 5,
    title: 'European Central Bank Cuts Rates 25bp as Eurozone Inflation Falls to 2.1%',
    source: 'Bloomberg',
    sourceSlug: 'bloomberg',
    publishedAt: '2025-04-18T20:30:00Z',
    timeAgo: '10h ago',
    compositeScore: 84,
    tags: ['Rates', 'Macro', 'Geopolitics'],
    whyRead: 'ECB-Fed policy divergence widens — direct impact on cross-border deal financing and FX hedging.',
    whyMatters: 'ECB cutting while the Fed holds creates a widening transatlantic rate differential. EUR weakens, making European assets cheaper for USD buyers — bullish for cross-border M&A targeting EU corporates. For credit desks: EUR IG spreads tighten, and reverse-Yankee issuance becomes more attractive for US corporates.',
    url: '#',
    clusterSize: 6,
  },
  {
    id: 6,
    rank: 6,
    title: 'DOJ Files Antitrust Suit to Block $24B Kroger-Albertsons Merger',
    source: 'CNBC',
    sourceSlug: 'cnbc',
    publishedAt: '2025-04-18T19:00:00Z',
    timeAgo: '11h ago',
    compositeScore: 82,
    tags: ['Antitrust', 'M&A'],
    whyRead: 'Landmark regulatory challenge signals continued FTC/DOJ aggression on horizontal mergers.',
    whyMatters: 'DOJ blocking a $24B retail merger reinforces the current hostile antitrust environment. M&A teams should factor in extended timelines and potential divestitures for any horizontal deal above $5B. Break fees and reverse-break structures become critical negotiation points. This chills the mega-deal pipeline for consumer/retail.',
    url: '#',
  },
  {
    id: 7,
    rank: 7,
    title: 'Investment-Grade Corporate Bond Issuance Hits $45B in April — On Pace for Record Month',
    source: 'Bloomberg',
    sourceSlug: 'bloomberg',
    publishedAt: '2025-04-18T18:00:00Z',
    timeAgo: '12h ago',
    compositeScore: 80,
    tags: ['Credit', 'Macro'],
    whyRead: 'Record IG issuance confirms corporates are front-loading supply before potential rate volatility.',
    whyMatters: 'Record issuance month means DCM desks are running hot — expect syndication pressure and potential spread widening if supply outpaces demand. Corporates are locking in before the June FOMC. For credit analysts: monitor orderbook coverage ratios for signs of demand fatigue at these spreads.',
    url: '#',
  },
  {
    id: 8,
    rank: 8,
    title: 'Intel Announces $20B Foundry Partnership with TSMC and ASML for Advanced Packaging',
    source: 'Reuters',
    sourceSlug: 'reuters',
    publishedAt: '2025-04-18T17:00:00Z',
    timeAgo: '13h ago',
    compositeScore: 78,
    tags: ['AI', 'Equities'],
    whyRead: 'Reshapes the semiconductor supply chain and signals Intel\'s strategic pivot back to manufacturing.',
    whyMatters: 'A $20B capex commitment signals Intel is serious about reclaiming foundry share. Industrials and semiconductor capex teams should note the downstream demand for advanced packaging equipment. For equity research: this reprices Intel\'s sum-of-parts and directly impacts TSMC/ASML competitive dynamics.',
    url: '#',
  },
  {
    id: 9,
    rank: 9,
    title: 'Private Credit AUM Passes $2 Trillion — Apollo and Ares Lead Market Share Growth',
    source: 'Financial Times',
    sourceSlug: 'ft',
    publishedAt: '2025-04-18T16:00:00Z',
    timeAgo: '14h ago',
    compositeScore: 76,
    tags: ['Credit', 'M&A'],
    whyRead: 'Private credit milestone reshapes competitive dynamics between banks and alternative lenders.',
    whyMatters: 'At $2T AUM, private credit is no longer an alternative — it\'s the primary market for midcap LBO financing. Banks lose wallet share on leveraged lending but gain advisory and structuring fees. For restructuring teams: private credit\'s growth means more complex creditor dynamics in future default cycles.',
    url: '#',
  },
  {
    id: 10,
    rank: 10,
    title: 'China Q1 GDP Grows 5.3% — Beats Consensus on Stimulus-Driven Manufacturing Recovery',
    source: 'Wall Street Journal',
    sourceSlug: 'wsj',
    publishedAt: '2025-04-18T14:00:00Z',
    timeAgo: '16h ago',
    compositeScore: 74,
    tags: ['Macro', 'Geopolitics'],
    whyRead: 'Stronger China GDP eases global recession fears but reignites commodity demand and trade tension narratives.',
    whyMatters: 'A 5.3% beat is constructive for global growth but raises commodity price pressure — watch copper, iron ore, and oil. For cross-border teams: Chinese outbound M&A may cautiously resume. For macro desks: this supports the risk-on trade and EM credit but complicates the Fed\'s inflation fight if commodity prices rise.',
    url: '#',
  },
];

// ============================================================
// UPCOMING EVENTS
// ============================================================

export const upcomingEvents: CalendarEvent[] = [
  { id: 1, name: 'FOMC Minutes Release', type: 'fomc', date: 'Apr 23', daysUntil: 4, impactLevel: 'high' },
  { id: 2, name: 'CPI Release (April)', type: 'cpi', date: 'Apr 24', daysUntil: 5, impactLevel: 'high' },
  { id: 3, name: 'Core PCE Release', type: 'pce', date: 'Apr 25', daysUntil: 6, impactLevel: 'high' },
  { id: 4, name: 'GDP Q1 Advance', type: 'gdp', date: 'Apr 26', daysUntil: 7, impactLevel: 'high' },
  { id: 5, name: 'FOMC Rate Decision', type: 'fomc', date: 'May 1', daysUntil: 12, impactLevel: 'high' },
  { id: 6, name: 'Nonfarm Payrolls', type: 'payrolls', date: 'May 3', daysUntil: 14, impactLevel: 'high' },
  { id: 7, name: 'ISM Manufacturing', type: 'ism', date: 'May 1', daysUntil: 12, impactLevel: 'medium' },
  { id: 8, name: 'CPI Release (May)', type: 'cpi', date: 'May 14', daysUntil: 25, impactLevel: 'high' },
];

// ============================================================
// EARNINGS THIS WEEK
// ============================================================

export const earningsThisWeek: EarningsEvent[] = [
  { company: 'Johnson & Johnson', ticker: 'JNJ', reportDate: 'Apr 22', dayOfWeek: 'Tue', reportTime: 'before_market', epsEstimate: '$2.65' },
  { company: 'Visa', ticker: 'V', reportDate: 'Apr 22', dayOfWeek: 'Tue', reportTime: 'after_close', epsEstimate: '$2.44' },
  { company: 'Tesla', ticker: 'TSLA', reportDate: 'Apr 23', dayOfWeek: 'Wed', reportTime: 'after_close', epsEstimate: '$0.52' },
  { company: 'Meta Platforms', ticker: 'META', reportDate: 'Apr 23', dayOfWeek: 'Wed', reportTime: 'after_close', epsEstimate: '$4.32' },
  { company: 'Microsoft', ticker: 'MSFT', reportDate: 'Apr 24', dayOfWeek: 'Thu', reportTime: 'after_close', epsEstimate: '$2.83' },
  { company: 'Alphabet', ticker: 'GOOGL', reportDate: 'Apr 24', dayOfWeek: 'Thu', reportTime: 'after_close', epsEstimate: '$1.89' },
  { company: 'Amazon', ticker: 'AMZN', reportDate: 'Apr 25', dayOfWeek: 'Fri', reportTime: 'before_market', epsEstimate: '$0.98' },
  { company: 'Apple', ticker: 'AAPL', reportDate: 'Apr 25', dayOfWeek: 'Fri', reportTime: 'after_close', epsEstimate: '$1.50' },
];

// ============================================================
// SECTOR PULSE
// ============================================================

export const sectorPulse: SectorPulse[] = [
  { name: 'Technology', slug: 'technology', changePct: 1.2, articleCount: 8 },
  { name: 'Financials', slug: 'financials', changePct: 0.3, articleCount: 5 },
  { name: 'Energy', slug: 'energy', changePct: -0.8, articleCount: 3 },
  { name: 'Healthcare', slug: 'healthcare', changePct: 0.0, articleCount: 2 },
  { name: 'Industrials', slug: 'industrials', changePct: 0.5, articleCount: 2 },
  { name: 'Consumer', slug: 'consumer', changePct: -0.2, articleCount: 1 },
];

// ============================================================
// DEALS & FINANCING
// ============================================================

export const recentDeals: Deal[] = [
  { id: 1, name: 'Acme Corp Sr Unsecured Notes', type: 'Bond Issuance', size: '$2.0B', parties: 'Acme Corp · Baa2/BBB', leadBanks: 'JPM / GS', timeAgo: 'Today' },
  { id: 2, name: 'WidgetCo / GadgetInc Merger', type: 'M&A', size: '$4.2B', parties: 'All-stock · Strategic', timeAgo: 'Yesterday' },
  { id: 3, name: 'TechStart Inc IPO', type: 'IPO', size: '$800M', parties: 'NYSE listing', leadBanks: 'MS / JPM', timeAgo: '2d ago' },
  { id: 4, name: 'RetailCo Term Loan B', type: 'LevFin', size: '$1.5B', parties: 'B2/B · Sponsor: KKR', leadBanks: 'GS / BofA', timeAgo: '3d ago' },
];

// ============================================================
// WHAT CHANGED SINCE YESTERDAY
// ============================================================

export const whatChanged: WhatChanged[] = [
  { item: '10Y Treasury', type: 'market', change: '4.34% → 4.42% (+8bp)', direction: 'up' },
  { item: 'VIX', type: 'market', change: '15.0 → 14.2 (−0.8pt)', direction: 'down' },
  { item: 'IG Spread', type: 'market', change: '95bp → 93bp (−2bp)', direction: 'down' },
  { item: 'CPI consensus', type: 'macro', change: 'Revised up to 3.5% from 3.4%', direction: 'up' },
  { item: 'New: Fed language shift', type: 'article', change: '+4 articles on FOMC', direction: 'new' },
  { item: 'JPM earnings beat', type: 'article', change: '+3 articles on bank results', direction: 'new' },
  { item: 'TSLA earnings', type: 'event', change: 'Added — reports Wed after close', direction: 'new' },
];
