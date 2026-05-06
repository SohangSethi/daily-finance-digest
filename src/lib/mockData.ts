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
  studentWhyRead: string;
  studentWhyMatters: string;
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
    studentWhyRead: 'The Federal Reserve decides interest rates, which affect everything from your student loans to how expensive it is for companies to borrow money. They just hinted rates will stay high longer than expected.',
    studentWhyMatters: 'When rates stay high, borrowing money costs more for everyone — businesses, homebuyers, and governments. This means companies might delay big investments or acquisitions because financing is expensive. It also means your savings account earns more interest, but mortgages and car loans cost more. The stock market often dips on this news because investors expected rate cuts sooner.',
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
    studentWhyRead: 'JPMorgan is the biggest bank in the US. Their earnings report tells us a lot about the health of the banking industry and economy overall.',
    studentWhyMatters: 'When JPMorgan says their investment banking fees surged 27%, it means companies are actively raising money and doing deals again after a slow period. Think of investment banks as middlemen — they help companies sell stock, issue bonds, or merge with other companies, and earn fees for it. A strong quarter for JPMorgan usually means the other big banks (Goldman, Morgan Stanley) are doing well too.',
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
    studentWhyRead: 'The US government borrows money by selling Treasury bonds. This announcement tells us how much they plan to borrow, which directly affects interest rates.',
    studentWhyMatters: 'The government needs to borrow money to fund its spending. When they announce how many bonds they will sell, it moves the bond market. If they sell too many, it can push interest rates up (bad for stocks and borrowers). Keeping coupon sizes unchanged is a relief — it means no surprise increase in borrowing that would rattle markets.',
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
    studentWhyRead: 'OpenAI (the company behind ChatGPT) just raised a record amount of money. This sets the benchmark for how much all AI companies are worth.',
    studentWhyMatters: 'A $150 billion valuation means investors believe AI is going to be incredibly profitable. This is the largest venture capital round ever — it signals massive confidence in AI technology. It also affects every other AI startup because investors now compare them to OpenAI. Companies that provide the infrastructure for AI (cloud computing, chip makers like Nvidia) also benefit because more AI investment means more demand for their products.',
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
    studentWhyRead: 'The European Central Bank just cut interest rates while the US Federal Reserve kept theirs high. When two major economies move in opposite directions on rates, it creates big ripple effects.',
    studentWhyMatters: 'When Europe cuts rates and the US doesn\'t, the euro gets weaker against the dollar. This makes European goods cheaper for Americans to buy and European companies cheaper to acquire. It also means European consumers and businesses can borrow more cheaply, which should help their economy grow. For investors, this divergence creates opportunities to invest in Europe at a discount.',
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
    studentWhyRead: 'The government is trying to block two of the biggest grocery chains from merging. This tells us a lot about how tough regulators are being on big company mergers right now.',
    studentWhyMatters: 'When the Department of Justice blocks a merger, it sends a message to all companies: "We\'re watching." This means companies planning to merge with competitors will face more scrutiny and longer timelines. For consumers, blocking the merger could mean more competition and potentially lower grocery prices. For the business world, it means fewer mega-deals will happen because companies fear getting blocked.',
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
    studentWhyRead: 'Companies are rushing to borrow money by issuing bonds at a record pace. This tells us a lot about what corporate America expects to happen with interest rates.',
    studentWhyMatters: 'When companies issue bonds, they\'re essentially borrowing money from investors and promising to pay it back with interest. Record issuance means companies are racing to lock in current borrowing rates before they potentially go higher. It\'s like everyone refinancing their mortgage at the same time. If too many bonds flood the market, investors may demand higher interest rates, which could affect all borrowing costs.',
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
    studentWhyRead: 'Intel is making a huge $20 billion bet to get back into manufacturing chips. This could reshape who makes the world\'s most important technology.',
    studentWhyMatters: 'Computer chips are in everything — phones, cars, AI systems, military equipment. Right now, most advanced chips are made in Taiwan (by TSMC), which is a geopolitical risk. Intel spending $20B to build its own advanced manufacturing means the US could become less dependent on Asia for critical technology. This is also a big deal for the AI boom since AI requires massive amounts of computing power.',
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
    studentWhyRead: 'Private credit (non-bank lending) just passed $2 trillion. This is reshaping how companies borrow money and who controls the lending market.',
    studentWhyMatters: 'Traditionally, if a company needed a big loan, they went to a bank. Now, private credit firms like Apollo and Ares have become major lenders, managing over $2 trillion. This matters because these firms can offer faster, more flexible loans than banks, but often at higher interest rates. For the broader economy, it means more lending is happening outside the regulated banking system, which could be risky during an economic downturn.',
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
    studentWhyRead: 'China\'s economy grew faster than expected. Since China is the world\'s second-largest economy, this affects global trade, commodity prices, and markets everywhere.',
    studentWhyMatters: 'China is the world\'s biggest buyer of raw materials like oil, copper, and iron. When their economy grows faster, they buy more of these commodities, pushing prices up globally. Higher commodity prices can increase inflation in the US and Europe. On the positive side, strong Chinese growth means companies that sell to China (like Apple, Tesla, luxury brands) could see better sales. It\'s a double-edged sword for global markets.',
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

// ============================================================
// BIS RESEARCH PAPERS (FALLBACK)
// ============================================================

export const bisPapersMock = [
  {
    id: 1,
    title: 'Monetary policy transmission in a high-debt environment',
    url: 'https://www.bis.org/publ/work1200.htm',
    publishedAt: '2026-04-28T00:00:00Z',
    abstract: 'This paper examines how elevated public and private debt levels affect the transmission of monetary policy to the real economy.',
    aiSummary: 'The paper finds that when government and household debt levels are high, interest rate changes have a weaker effect on economic activity. Central banks may need to raise rates more aggressively to achieve the same cooling effect, but doing so risks triggering debt distress in highly leveraged sectors.',
    marketImpact: 'Suggests the Fed may need to keep rates higher for longer to tame inflation given current US debt levels. Bearish for long-duration bonds and leveraged credit. Banks with large mortgage portfolios face elevated refinancing risk.',
    category: 'Monetary Policy',
  },
  {
    id: 2,
    title: 'Artificial intelligence and financial stability: emerging risks and policy responses',
    url: 'https://www.bis.org/publ/work1198.htm',
    publishedAt: '2026-04-22T00:00:00Z',
    abstract: 'An assessment of how AI-driven trading and lending systems may create new systemic risks in global financial markets.',
    aiSummary: 'BIS researchers warn that widespread AI adoption in trading and credit decisions could amplify market volatility during stress events. AI models trained on similar data may produce correlated behavior, creating "herding" effects that destabilize markets. The paper calls for new regulatory frameworks to monitor AI concentration in financial services.',
    marketImpact: 'Could accelerate regulation of AI in finance, particularly algorithmic trading and automated lending. Fintech and AI-heavy asset managers may face new compliance costs. Positive for traditional risk management and RegTech firms.',
    category: 'Financial Stability',
  },
  {
    id: 3,
    title: 'Central bank digital currencies: cross-border payment implications',
    url: 'https://www.bis.org/publ/work1195.htm',
    publishedAt: '2026-04-15T00:00:00Z',
    abstract: 'Analysis of how CBDCs could reshape cross-border payment systems and reduce reliance on correspondent banking networks.',
    aiSummary: 'The BIS explores how central bank digital currencies could make international money transfers faster and cheaper by bypassing traditional correspondent banks. The paper models a multi-CBDC platform where central banks can settle cross-border transactions in seconds instead of days, potentially saving the global economy $120B annually in transaction costs.',
    marketImpact: 'Disruptive for SWIFT and correspondent banking networks (JPM, Citi, HSBC cross-border revenue). Positive for payment infrastructure providers adapting to CBDC rails. FX market structure could shift as real-time settlement reduces settlement risk.',
    category: 'Digital Currencies',
  },
  {
    id: 4,
    title: 'Climate stress testing: lessons from the first generation of exercises',
    url: 'https://www.bis.org/publ/work1190.htm',
    publishedAt: '2026-04-08T00:00:00Z',
    abstract: 'A comprehensive review of climate stress tests conducted by major central banks and their implications for bank capital requirements.',
    aiSummary: 'After reviewing climate stress tests from 15 central banks, the BIS concludes that banks are significantly underestimating climate-related credit losses. The paper estimates that a disorderly transition to net-zero could increase bank credit losses by 15-25% over the next decade, with energy, real estate, and agriculture sectors most exposed.',
    marketImpact: 'Could lead to higher capital requirements for banks with large fossil fuel and commercial real estate exposures. European banks face the most immediate impact given ECB prioritization. Green bond issuance likely to accelerate as banks rebalance portfolios.',
    category: 'Banking Regulation',
  },
];

