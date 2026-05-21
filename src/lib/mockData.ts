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
  summary: string;
  whyRead: string;
  whyMatters: string;
  marketImpact: string;
  studentWhyRead: string;
  studentWhyMatters: string;
  url: string;
  clusterSize?: number;
}

// ============================================================
// STOCKS (EQUITY RESEARCH) DATA
// ============================================================

export interface TrendingStock {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePct: number;
  marketCap: string;
  analystRating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  priceTarget: number;
  priceTargetUpside: number;
  catalyst: string;
  whyWatch: string;
  momentum: 'bullish' | 'bearish' | 'neutral';
}

// ============================================================
// GEOPOLITICS DATA
// ============================================================

export interface GeopoliticsArticle {
  id: number;
  title: string;
  source: string;
  sourceSlug: string;
  url: string;
  publishedAt: string;
  timeAgo: string;
  summary: string;
  region: 'US' | 'Europe' | 'Asia' | 'Middle East' | 'Global';
  bias: number; // -3 (far left) to +3 (far right), 0 = center
  biasLabel: string;
  tags: string[];
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
    summary: 'Federal Reserve officials indicated they are in no hurry to cut interest rates after recent inflation data showed limited progress toward the 2% target. Multiple Fed governors reiterated a "data-dependent" stance, pushing back on market expectations for mid-year rate cuts. The 10-year Treasury yield rose 8bp on the news.',
    whyRead: 'Rate path is the dominant input to LBO financing costs — the Fed just shifted its forward guidance language.',
    whyMatters: 'A prolonged pause extends the current rate environment for leveraged finance, keeping spreads stable but limiting refi windows for issuers hoping for lower rates. DCM pipelines should expect steady but unspectacular issuance volumes through Q3. For M&A sponsors, higher-for-longer means continued pressure on deal multiples and carry cost sensitivity in LBO models.',
    marketImpact: 'Bearish for rate-sensitive sectors (REITs, utilities, homebuilders). 10Y yield likely stays above 4.30%. LBO financing costs remain elevated, cooling sponsor activity. DCM issuance window narrows for sub-IG borrowers. Equity markets pricing out 2-3 expected cuts — watch S&P 500 support at 5,200.',
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
    summary: 'JPMorgan Chase reported Q1 earnings that beat analyst estimates, with investment banking fees surging 27% year-over-year driven by a rebound in debt capital markets underwriting. Net interest income came in at $23.1B, and the bank raised its full-year NII guidance. CEO Jamie Dimon struck a cautiously optimistic tone on deal activity.',
    whyRead: 'Bellwether bank signals IB fee recovery is real — first strong quarter in 6 for deal activity.',
    whyMatters: 'JPM\'s 27% IB fee jump driven largely by debt underwriting confirms the DCM window is wide open. This sets a positive tone for Goldman and Morgan Stanley earnings later this week. For junior bankers: pipeline acceleration means staffing pressure. For S&T: fixed income trading revenue beat suggests rates vol is still generating desk P&L.',
    marketImpact: 'Bullish for KBE (bank ETF) and financial sector broadly. GS and MS likely to report similar IB fee recovery. Credit spreads remain supportive for new issuance. JPM shares +3.2% pre-market — bank earnings rotation trade in play. NII guidance raise positive for regional banks.',
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
    summary: 'The U.S. Treasury announced $125 billion in quarterly refunding across 3-year, 10-year, and 30-year maturities, keeping coupon auction sizes unchanged from the previous quarter. The decision signals comfort with the current pace of debt issuance despite elevated fiscal deficits. Bond markets rallied modestly on the news.',
    whyRead: 'Refunding announcement is the supply-side signal for rates — unchanged coupon sizes remove a key risk factor.',
    whyMatters: 'Steady coupon sizes signal Treasury is comfortable with current issuance pace, reducing term premium anxiety. This is supportive for duration and should keep the 10Y anchored near current levels. For DCM teams, a stable rates backdrop means tighter new-issue concessions and better execution windows.',
    marketImpact: 'Supportive for 10Y and 30Y Treasuries — expect 5-10bp rally. Removes supply overhang fear that had been building. Corporate bond issuance likely to accelerate with stable rate backdrop. TLT (long-bond ETF) could see inflows. Reduces tail risk of term premium spike.',
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
    summary: 'OpenAI has completed a $6.6 billion funding round at a $150 billion valuation, making it the largest venture capital raise in history. The round was led by Thrive Capital with participation from Microsoft, Nvidia, and SoftBank. The funds will be used to scale compute infrastructure and accelerate the development of GPT-5 and enterprise AI products.',
    whyRead: 'Sets the valuation benchmark for the entire AI sector — directly relevant for TMT bankers and growth equity.',
    whyMatters: '$150B valuation at ~15x forward revenue creates a ceiling comp for every AI startup cap table. TMT groups should expect this to accelerate secondary market activity and IPO conversations across the AI stack. Adjacent infrastructure companies (cloud, chips, data centers) see downstream valuation re-rating.',
    marketImpact: 'Bullish for NVDA (AI compute demand), MSFT (OpenAI partner), and cloud infrastructure plays (AMZN, GOOGL). Sets valuation ceiling for Anthropic, Mistral IPO discussions. AI infrastructure capex cycle continues — positive for data center REITs (EQIX, DLR). Could trigger AI stock rotation as market digests $150B benchmark.',
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
    summary: 'The European Central Bank cut its main refinancing rate by 25 basis points to 4.25%, citing Eurozone inflation falling to 2.1% — near its 2% target. ECB President Lagarde signaled further cuts are likely if disinflation continues, putting the ECB on a divergent path from the Federal Reserve which remains on hold.',
    whyRead: 'ECB-Fed policy divergence widens — direct impact on cross-border deal financing and FX hedging.',
    whyMatters: 'ECB cutting while the Fed holds creates a widening transatlantic rate differential. EUR weakens, making European assets cheaper for USD buyers — bullish for cross-border M&A targeting EU corporates. For credit desks: EUR IG spreads tighten, and reverse-Yankee issuance becomes more attractive for US corporates.',
    marketImpact: 'EUR/USD drops toward 1.06 — bullish for US exporters with euro-denominated costs. European equities (STOXX 600) rally on lower rates. Cross-border M&A targeting EU companies gets 5-8% cheaper in USD terms. Reverse-Yankee bond issuance to accelerate. DXY strengthens, pressuring gold and EM currencies.',
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
    summary: 'The Department of Justice filed suit to block Kroger\'s $24.6 billion acquisition of Albertsons, arguing the merger would eliminate competition in hundreds of local grocery markets and lead to higher food prices. The DOJ rejected proposed divestitures of 400+ stores as insufficient to preserve competition.',
    whyRead: 'Landmark regulatory challenge signals continued FTC/DOJ aggression on horizontal mergers.',
    whyMatters: 'DOJ blocking a $24B retail merger reinforces the current hostile antitrust environment. M&A teams should factor in extended timelines and potential divestitures for any horizontal deal above $5B. Break fees and reverse-break structures become critical negotiation points. This chills the mega-deal pipeline for consumer/retail.',
    marketImpact: 'KR and ACI shares diverge — ACI drops on deal uncertainty, KR rallies on standalone value. Broader M&A deal spreads widen across pending mergers. Regulatory risk premium increases for horizontal consumer deals. Advisory fees at risk as mega-deal pipeline cools. Watch for divestiture buyer opportunities (C&S Wholesale).',
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
    summary: 'Investment-grade corporate bond issuance reached $45 billion in April with two weeks remaining, putting the month on pace to break the all-time record. Major issuers include Apple ($5.5B), Amazon ($4B), and Pfizer ($3.5B). Demand remains strong with average orderbook coverage at 3.2x, though new-issue concessions have widened slightly.',
    whyRead: 'Record IG issuance confirms corporates are front-loading supply before potential rate volatility.',
    whyMatters: 'Record issuance month means DCM desks are running hot — expect syndication pressure and potential spread widening if supply outpaces demand. Corporates are locking in before the June FOMC. For credit analysts: monitor orderbook coverage ratios for signs of demand fatigue at these spreads.',
    marketImpact: 'IG spreads may widen 3-5bp on supply indigestion. LQD (IG bond ETF) sees selling pressure. DCM desk revenues at banks surge — positive for Q2 earnings. Corporates front-loading supply signals concern about H2 rate volatility. Watch 5Y IG spreads for demand fatigue signals.',
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
    summary: 'Intel unveiled a $20 billion strategic partnership with TSMC and ASML to develop next-generation chip packaging technology. The multi-year deal positions Intel\'s foundry division to compete for advanced AI chip manufacturing contracts, leveraging TSMC\'s process expertise and ASML\'s EUV lithography systems.',
    whyRead: 'Reshapes the semiconductor supply chain and signals Intel\'s strategic pivot back to manufacturing.',
    whyMatters: 'A $20B capex commitment signals Intel is serious about reclaiming foundry share. Industrials and semiconductor capex teams should note the downstream demand for advanced packaging equipment. For equity research: this reprices Intel\'s sum-of-parts and directly impacts TSMC/ASML competitive dynamics.',
    marketImpact: 'INTC +6% on strategic clarity — sum-of-parts revaluation underway. ASML benefits from equipment orders ($3-4B pipeline). TSM faces new competitor but validates advanced packaging demand. Positive for SMH (semiconductor ETF) broadly. US CHIPS Act beneficiaries see renewed interest.',
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
    summary: 'Global private credit assets under management surpassed $2 trillion for the first time, with Apollo Global Management and Ares Management leading market share gains. The milestone reflects a structural shift in corporate lending away from traditional banks toward alternative credit providers, driven by tighter bank regulation and growing institutional appetite for yield.',
    whyRead: 'Private credit milestone reshapes competitive dynamics between banks and alternative lenders.',
    whyMatters: 'At $2T AUM, private credit is no longer an alternative — it\'s the primary market for midcap LBO financing. Banks lose wallet share on leveraged lending but gain advisory and structuring fees. For restructuring teams: private credit\'s growth means more complex creditor dynamics in future default cycles.',
    marketImpact: 'APO and ARES shares at all-time highs on AUM growth. Bank leveraged lending revenue under pressure — negative for C and BAC syndicated loan desks. Private credit yields compressing toward syndicated loan levels. Future default cycle will be more complex with fragmented creditor base. Watch for private credit securitization growth.',
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
    summary: 'China reported Q1 GDP growth of 5.3% year-over-year, beating the 4.8% consensus estimate, driven by a manufacturing recovery fueled by targeted fiscal stimulus and infrastructure spending. However, the property sector remains weak with new home prices declining for the 10th consecutive month, and consumer confidence stayed subdued.',
    whyRead: 'Stronger China GDP eases global recession fears but reignites commodity demand and trade tension narratives.',
    whyMatters: 'A 5.3% beat is constructive for global growth but raises commodity price pressure — watch copper, iron ore, and oil. For cross-border teams: Chinese outbound M&A may cautiously resume. For macro desks: this supports the risk-on trade and EM credit but complicates the Fed\'s inflation fight if commodity prices rise.',
    marketImpact: 'Copper and iron ore futures rally 2-3%. FXI (China large-cap ETF) up 4%. Australian dollar strengthens on commodity demand. WTI crude pushes toward $80 on demand recovery narrative. EM bond spreads tighten. Watch for trade war rhetoric re-escalation as China exports surge.',
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

// ============================================================
// TRENDING STOCKS (EQUITY RESEARCH)
// ============================================================

export const trendingStocks: TrendingStock[] = [
  {
    ticker: 'PLTR',
    name: 'Palantir Technologies',
    sector: 'AI / Defense Tech',
    price: 24.85,
    change: 1.42,
    changePct: 6.06,
    marketCap: '$54.2B',
    analystRating: 'Buy',
    priceTarget: 28.00,
    priceTargetUpside: 12.7,
    catalyst: 'Awarded $480M Army contract for AI-powered battlefield intelligence platform',
    whyWatch: 'Palantir is the leading pure-play AI/defense contractor with accelerating commercial revenue. Government AI spending is a secular growth story as DoD modernizes.',
    momentum: 'bullish',
  },
  {
    ticker: 'SMCI',
    name: 'Super Micro Computer',
    sector: 'AI Infrastructure',
    price: 812.30,
    change: -28.50,
    changePct: -3.39,
    marketCap: '$47.8B',
    analystRating: 'Strong Buy',
    priceTarget: 1050.00,
    priceTargetUpside: 29.3,
    catalyst: 'New liquid-cooled GPU server rack design cuts data center energy costs by 40%',
    whyWatch: 'SMCI is the picks-and-shovels play for the AI infrastructure buildout. Every major hyperscaler is a customer. Revenue grew 200% YoY last quarter.',
    momentum: 'bullish',
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Big Tech / AI',
    price: 158.20,
    change: 1.15,
    changePct: 0.73,
    marketCap: '$1.9T',
    analystRating: 'Strong Buy',
    priceTarget: 195.00,
    priceTargetUpside: 23.2,
    catalyst: 'Long-term compounding: Gemini integration across Workspace and Search stabilizing market share',
    whyWatch: 'A core 3-5 year portfolio anchor. Despite short-term AI search fears, Alphabet\'s underlying advertising moat and cloud growth provide exceptional long-term risk/reward.',
    momentum: 'bullish',
  },
  {
    ticker: 'CELH',
    name: 'Celsius Holdings',
    sector: 'Consumer / Beverages',
    price: 62.30,
    change: -3.15,
    changePct: -4.81,
    marketCap: '$14.8B',
    analystRating: 'Hold',
    priceTarget: 70.00,
    priceTargetUpside: 12.4,
    catalyst: '1-3 Year Horizon: International expansion taking time to scale against established rivals',
    whyWatch: 'A solid long-term hold for patient capital. The hyper-growth phase has ended, but steady 15-20% compounding over the next 5 years makes this a staple consumer allocation.',
    momentum: 'neutral',
  },
  {
    ticker: 'RKLB',
    name: 'Rocket Lab USA',
    sector: 'Space / Aerospace',
    price: 18.42,
    change: 0.95,
    changePct: 5.44,
    marketCap: '$8.7B',
    analystRating: 'Buy',
    priceTarget: 24.00,
    priceTargetUpside: 30.3,
    catalyst: 'Neutron medium-lift rocket on track for Q3 maiden flight; $2.2B backlog',
    whyWatch: 'Only credible competitor to SpaceX in the small/medium launch market. Space economy projected to reach $1.8T by 2035. Government and commercial satellite demand surging.',
    momentum: 'bullish',
  },
  {
    ticker: 'CELH',
    name: 'Celsius Holdings',
    sector: 'Consumer / Beverages',
    price: 62.30,
    change: -3.15,
    changePct: -4.81,
    marketCap: '$14.8B',
    analystRating: 'Hold',
    priceTarget: 70.00,
    priceTargetUpside: 12.4,
    catalyst: 'International expansion into UK and Germany; Pepsi distribution deal renewal in Q2',
    whyWatch: 'Energy drink market is still growing 8% annually and Celsius is taking share from Monster and Red Bull among younger demographics. Margin expansion story as scale increases.',
    momentum: 'neutral',
  },
  {
    ticker: 'IONQ',
    name: 'IonQ Inc',
    sector: 'Quantum Computing',
    price: 12.85,
    change: -0.42,
    changePct: -3.16,
    marketCap: '$2.8B',
    analystRating: 'Hold',
    priceTarget: 15.00,
    priceTargetUpside: 16.7,
    catalyst: 'Achieved 35 algorithmic qubits milestone; new enterprise quantum cloud partnerships',
    whyWatch: 'Quantum computing is a long-term bet on the next computing paradigm. IonQ has the most advanced trapped-ion system. High risk/reward with major government and pharma interest.',
    momentum: 'neutral',
  },
  {
    ticker: 'ASML',
    name: 'ASML Holding',
    sector: 'Semiconductor Equip',
    price: 945.10,
    change: -12.40,
    changePct: -1.29,
    marketCap: '$375B',
    analystRating: 'Buy',
    priceTarget: 1100.00,
    priceTargetUpside: 16.3,
    catalyst: 'Decade-long monopoly on EUV lithography essential for all advanced chip manufacturing',
    whyWatch: 'The ultimate "pick and shovel" long-term AI play. No other company can build the machines that make advanced AI chips. Buy and hold for the next semiconductor supercycle.',
    momentum: 'bullish',
  },
  {
    ticker: 'ARM',
    name: 'Arm Holdings',
    sector: 'Semiconductors',
    price: 148.50,
    change: 4.20,
    changePct: 2.91,
    marketCap: '$155.3B',
    analystRating: 'Buy',
    priceTarget: 175.00,
    priceTargetUpside: 17.8,
    catalyst: 'New v9 architecture royalty rate increase driving ASP uplift across mobile and server',
    whyWatch: 'Arm designs the chips inside nearly every smartphone and is expanding into servers, automotive, and AI edge devices. Royalty model means revenue scales with global chip production.',
    momentum: 'bullish',
  },
  {
    ticker: 'HOOD',
    name: 'Robinhood Markets',
    sector: 'Fintech',
    price: 19.75,
    change: 1.10,
    changePct: 5.90,
    marketCap: '$17.5B',
    analystRating: 'Buy',
    priceTarget: 24.00,
    priceTargetUpside: 21.5,
    catalyst: 'Launched 3% IRA match and Gold credit card; net deposits surged 40% QoQ',
    whyWatch: 'Robinhood is pivoting from a meme-stock platform to a full-service fintech. Net deposit growth and expanding product suite suggest the business model is maturing. Profitability inflection in sight.',
    momentum: 'bullish',
  },
];

// ============================================================
// GEOPOLITICS NEWS
// ============================================================

export const geopoliticsNews: GeopoliticsArticle[] = [
  {
    id: 1,
    title: 'US-China Trade Tensions Escalate as New Semiconductor Export Restrictions Take Effect',
    source: 'Reuters',
    sourceSlug: 'reuters',
    url: '#',
    publishedAt: '2025-04-19T08:00:00Z',
    timeAgo: '1h ago',
    summary: 'The Biden administration activated expanded semiconductor export controls targeting China\'s AI chip development capabilities. The new rules restrict sales of advanced packaging equipment and close loopholes that allowed indirect shipments through third countries. China\'s Commerce Ministry vowed retaliatory measures.',
    region: 'Global',
    bias: 0,
    biasLabel: 'Center',
    tags: ['Trade War', 'Semiconductors', 'US-China'],
  },
  {
    id: 2,
    title: 'NATO Allies Agree to 3% GDP Defense Spending Target Amid Russia-Ukraine Escalation',
    source: 'BBC World',
    sourceSlug: 'bbc',
    url: '#',
    publishedAt: '2025-04-19T06:30:00Z',
    timeAgo: '2h ago',
    summary: 'NATO member states reached a preliminary agreement to raise defense spending targets from 2% to 3% of GDP by 2030. The move comes as Russia intensifies attacks on Ukrainian energy infrastructure and European leaders warn of a prolonged conflict requiring sustained military support.',
    region: 'Europe',
    bias: -1,
    biasLabel: 'Center-Left',
    tags: ['NATO', 'Defense', 'Russia-Ukraine'],
  },
  {
    id: 3,
    title: 'Iran Nuclear Talks Resume in Vienna as IAEA Reports Enrichment at Near-Weapons Grade',
    source: 'Al Jazeera',
    sourceSlug: 'aljazeera',
    url: '#',
    publishedAt: '2025-04-19T05:00:00Z',
    timeAgo: '4h ago',
    summary: 'Diplomatic negotiations over Iran\'s nuclear program resumed in Vienna after a 6-month hiatus, with IAEA inspectors confirming uranium enrichment at 83.7% — just below weapons-grade levels. Oil markets responded with WTI crude rising 1.2% on supply disruption fears in the Strait of Hormuz.',
    region: 'Middle East',
    bias: -1,
    biasLabel: 'Center-Left',
    tags: ['Iran', 'Nuclear', 'Oil Markets'],
  },
  {
    id: 4,
    title: 'Congress Passes Bipartisan Bill Banning TikTok Unless ByteDance Divests Within 270 Days',
    source: 'Fox News',
    sourceSlug: 'fox',
    url: '#',
    publishedAt: '2025-04-18T22:00:00Z',
    timeAgo: '8h ago',
    summary: 'The House and Senate passed legislation requiring ByteDance to divest TikTok\'s US operations within 270 days or face a nationwide ban. The bill passed with overwhelming bipartisan support, citing national security concerns over Chinese government access to American user data.',
    region: 'US',
    bias: 2,
    biasLabel: 'Right',
    tags: ['TikTok', 'Big Tech', 'National Security'],
  },
  {
    id: 5,
    title: 'Taiwan Strait Tensions Rise as PLA Conducts Largest Naval Exercise Since 2022',
    source: 'Council on Foreign Relations',
    sourceSlug: 'cfr',
    url: '#',
    publishedAt: '2025-04-18T20:00:00Z',
    timeAgo: '10h ago',
    summary: 'China\'s People\'s Liberation Army Navy conducted its largest exercise in the Taiwan Strait since August 2022, involving 40+ warships and simulated blockade operations. The Pentagon called the exercises "destabilizing" while Taiwan activated reserve forces. Semiconductor supply chain concerns sent TSM shares down 2.3%.',
    region: 'Asia',
    bias: 0,
    biasLabel: 'Center',
    tags: ['Taiwan', 'China', 'Supply Chain'],
  },
  {
    id: 6,
    title: 'Federal Reserve Independence Under Scrutiny as Political Pressure Mounts on Rate Policy',
    source: 'The New York Times',
    sourceSlug: 'nyt',
    url: '#',
    publishedAt: '2025-04-18T18:30:00Z',
    timeAgo: '12h ago',
    summary: 'A growing chorus of Congressional leaders from both parties are publicly pressuring the Federal Reserve to cut interest rates ahead of the election cycle, raising concerns about central bank independence. Fed Chair Powell reiterated that monetary policy decisions are data-driven and free from political influence.',
    region: 'US',
    bias: -2,
    biasLabel: 'Left',
    tags: ['Federal Reserve', 'Monetary Policy', 'Elections'],
  },
  {
    id: 7,
    title: 'EU Imposes Carbon Border Tax on Steel and Aluminum Imports, Sparking Trade Disputes',
    source: 'Financial Times',
    sourceSlug: 'ft',
    url: '#',
    publishedAt: '2025-04-18T16:00:00Z',
    timeAgo: '14h ago',
    summary: 'The European Union began enforcing its Carbon Border Adjustment Mechanism (CBAM) on steel and aluminum imports, adding 20-35% tariffs on products from countries without equivalent carbon pricing. India, Turkey, and Brazil signaled potential WTO challenges.',
    region: 'Europe',
    bias: -1,
    biasLabel: 'Center-Left',
    tags: ['Climate Policy', 'Trade', 'EU'],
  },
  {
    id: 8,
    title: 'Israel-Saudi Normalization Talks Advance Despite Gaza Conflict, Sources Say',
    source: 'Associated Press',
    sourceSlug: 'ap',
    url: '#',
    publishedAt: '2025-04-18T14:00:00Z',
    timeAgo: '16h ago',
    summary: 'Backchannel diplomatic discussions between Israel and Saudi Arabia on normalization of relations have quietly advanced despite the ongoing Gaza conflict, according to three officials familiar with the talks. A deal could reshape Middle Eastern geopolitics and energy markets.',
    region: 'Middle East',
    bias: 0,
    biasLabel: 'Center',
    tags: ['Middle East', 'Diplomacy', 'Energy'],
  },
];
