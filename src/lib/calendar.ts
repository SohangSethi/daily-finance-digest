// ============================================================
// SEEDED CALENDAR DATA
// Official 2026 dates for FOMC, CPI, PCE, GDP, Payrolls, ISM
// + Big Tech / Fortune 100 earnings
// ============================================================

export interface EconomicEvent {
  id: number;
  name: string;
  type: 'fomc' | 'cpi' | 'pce' | 'gdp' | 'payrolls' | 'ism' | 'refunding';
  date: string; // ISO date
  impactLevel: 'high' | 'medium' | 'low';
  description?: string;
}

export interface EarningsEvent {
  company: string;
  ticker: string;
  reportDate: string; // ISO date
  reportTime: 'before_market' | 'after_close';
  epsEstimate: string;
  sector: string;
}

// Calculate days until a date from today
export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Format date for display
export function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ============================================================
// FOMC 2026 Meeting Dates (projected Fed schedule)
// ============================================================
const fomcDates: EconomicEvent[] = [
  { id: 101, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-01-28', impactLevel: 'high' },
  { id: 102, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-03-18', impactLevel: 'high' },
  { id: 103, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-05-06', impactLevel: 'high' },
  { id: 104, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-06-17', impactLevel: 'high' },
  { id: 105, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-07-29', impactLevel: 'high' },
  { id: 106, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-09-16', impactLevel: 'high' },
  { id: 107, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-10-28', impactLevel: 'high' },
  { id: 108, name: 'FOMC Rate Decision', type: 'fomc', date: '2026-12-16', impactLevel: 'high' },
  // Minutes releases (~3 weeks after decision)
  { id: 111, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-02-18', impactLevel: 'medium' },
  { id: 112, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-04-08', impactLevel: 'medium' },
  { id: 113, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-05-27', impactLevel: 'medium' },
  { id: 114, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-07-08', impactLevel: 'medium' },
  { id: 115, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-08-19', impactLevel: 'medium' },
  { id: 116, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-10-07', impactLevel: 'medium' },
  { id: 117, name: 'FOMC Minutes Release', type: 'fomc', date: '2026-11-25', impactLevel: 'medium' },
];

// ============================================================
// CPI Release Dates 2026 (BLS schedule)
// ============================================================
const cpiDates: EconomicEvent[] = [
  { id: 201, name: 'CPI Release (Jan)', type: 'cpi', date: '2026-02-11', impactLevel: 'high' },
  { id: 202, name: 'CPI Release (Feb)', type: 'cpi', date: '2026-03-11', impactLevel: 'high' },
  { id: 203, name: 'CPI Release (Mar)', type: 'cpi', date: '2026-04-14', impactLevel: 'high' },
  { id: 204, name: 'CPI Release (Apr)', type: 'cpi', date: '2026-05-12', impactLevel: 'high' },
  { id: 205, name: 'CPI Release (May)', type: 'cpi', date: '2026-06-10', impactLevel: 'high' },
  { id: 206, name: 'CPI Release (Jun)', type: 'cpi', date: '2026-07-14', impactLevel: 'high' },
  { id: 207, name: 'CPI Release (Jul)', type: 'cpi', date: '2026-08-12', impactLevel: 'high' },
  { id: 208, name: 'CPI Release (Aug)', type: 'cpi', date: '2026-09-15', impactLevel: 'high' },
  { id: 209, name: 'CPI Release (Sep)', type: 'cpi', date: '2026-10-13', impactLevel: 'high' },
  { id: 210, name: 'CPI Release (Oct)', type: 'cpi', date: '2026-11-12', impactLevel: 'high' },
  { id: 211, name: 'CPI Release (Nov)', type: 'cpi', date: '2026-12-10', impactLevel: 'high' },
];

// ============================================================
// PCE Release Dates 2026 (BEA schedule, ~last Fri of month)
// ============================================================
const pceDates: EconomicEvent[] = [
  { id: 301, name: 'Core PCE Release', type: 'pce', date: '2026-01-30', impactLevel: 'high' },
  { id: 302, name: 'Core PCE Release', type: 'pce', date: '2026-02-27', impactLevel: 'high' },
  { id: 303, name: 'Core PCE Release', type: 'pce', date: '2026-03-27', impactLevel: 'high' },
  { id: 304, name: 'Core PCE Release', type: 'pce', date: '2026-04-30', impactLevel: 'high' },
  { id: 305, name: 'Core PCE Release', type: 'pce', date: '2026-05-29', impactLevel: 'high' },
  { id: 306, name: 'Core PCE Release', type: 'pce', date: '2026-06-26', impactLevel: 'high' },
  { id: 307, name: 'Core PCE Release', type: 'pce', date: '2026-07-31', impactLevel: 'high' },
  { id: 308, name: 'Core PCE Release', type: 'pce', date: '2026-08-28', impactLevel: 'high' },
  { id: 309, name: 'Core PCE Release', type: 'pce', date: '2026-09-25', impactLevel: 'high' },
  { id: 310, name: 'Core PCE Release', type: 'pce', date: '2026-10-30', impactLevel: 'high' },
  { id: 311, name: 'Core PCE Release', type: 'pce', date: '2026-11-25', impactLevel: 'high' },
];

// ============================================================
// Jobs Report / Nonfarm Payrolls 2026 (BLS, first Fri of month)
// ============================================================
const payrollDates: EconomicEvent[] = [
  { id: 401, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-01-09', impactLevel: 'high' },
  { id: 402, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-02-06', impactLevel: 'high' },
  { id: 403, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-03-06', impactLevel: 'high' },
  { id: 404, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-04-03', impactLevel: 'high' },
  { id: 405, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-05-08', impactLevel: 'high' },
  { id: 406, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-06-05', impactLevel: 'high' },
  { id: 407, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-07-02', impactLevel: 'high' },
  { id: 408, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-08-07', impactLevel: 'high' },
  { id: 409, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-09-04', impactLevel: 'high' },
  { id: 410, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-10-02', impactLevel: 'high' },
  { id: 411, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-11-06', impactLevel: 'high' },
  { id: 412, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2026-12-04', impactLevel: 'high' },
];

// ============================================================
// GDP Release Dates 2026 (BEA)
// ============================================================
const gdpDates: EconomicEvent[] = [
  { id: 501, name: 'GDP Q4 2025 Advance', type: 'gdp', date: '2026-01-29', impactLevel: 'high' },
  { id: 502, name: 'GDP Q4 2025 Second', type: 'gdp', date: '2026-02-26', impactLevel: 'medium' },
  { id: 503, name: 'GDP Q4 2025 Third', type: 'gdp', date: '2026-03-26', impactLevel: 'medium' },
  { id: 504, name: 'GDP Q1 2026 Advance', type: 'gdp', date: '2026-04-29', impactLevel: 'high' },
  { id: 505, name: 'GDP Q1 2026 Second', type: 'gdp', date: '2026-05-28', impactLevel: 'medium' },
  { id: 506, name: 'GDP Q1 2026 Third', type: 'gdp', date: '2026-06-25', impactLevel: 'medium' },
  { id: 507, name: 'GDP Q2 2026 Advance', type: 'gdp', date: '2026-07-29', impactLevel: 'high' },
  { id: 508, name: 'GDP Q3 2026 Advance', type: 'gdp', date: '2026-10-28', impactLevel: 'high' },
];

// ============================================================
// ISM Manufacturing Dates (first business day of month)
// ============================================================
const ismDates: EconomicEvent[] = [
  { id: 601, name: 'ISM Manufacturing', type: 'ism', date: '2026-05-01', impactLevel: 'medium' },
  { id: 602, name: 'ISM Manufacturing', type: 'ism', date: '2026-06-01', impactLevel: 'medium' },
  { id: 603, name: 'ISM Manufacturing', type: 'ism', date: '2026-07-01', impactLevel: 'medium' },
  { id: 604, name: 'ISM Manufacturing', type: 'ism', date: '2026-08-03', impactLevel: 'medium' },
  { id: 605, name: 'ISM Manufacturing', type: 'ism', date: '2026-09-01', impactLevel: 'medium' },
  { id: 606, name: 'ISM Manufacturing', type: 'ism', date: '2026-10-01', impactLevel: 'medium' },
  { id: 607, name: 'ISM Manufacturing', type: 'ism', date: '2026-11-02', impactLevel: 'medium' },
  { id: 608, name: 'ISM Manufacturing', type: 'ism', date: '2026-12-01', impactLevel: 'medium' },
];

// ============================================================
// Treasury Refunding Dates 2026
// ============================================================
const refundingDates: EconomicEvent[] = [
  { id: 701, name: 'Treasury Refunding Announcement', type: 'refunding', date: '2026-07-29', impactLevel: 'medium' },
  { id: 702, name: 'Treasury Refunding Announcement', type: 'refunding', date: '2026-10-28', impactLevel: 'medium' },
];

// ============================================================
// ALL ECONOMIC EVENTS
// ============================================================
export const allEconomicEvents: EconomicEvent[] = [
  ...fomcDates,
  ...cpiDates,
  ...pceDates,
  ...payrollDates,
  ...gdpDates,
  ...ismDates,
  ...refundingDates,
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// Get upcoming events (future only)
export function getUpcomingEvents(limit: number = 10): (EconomicEvent & { daysUntil: number; displayDate: string })[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return allEconomicEvents
    .filter(e => new Date(e.date) >= today)
    .slice(0, limit)
    .map(e => ({
      ...e,
      daysUntil: daysUntil(e.date),
      displayDate: formatEventDate(e.date),
    }));
}

// ============================================================
// EARNINGS CALENDAR — Big Tech + Key Fortune 100
// Q1 2026 Earnings Season (Apr/May reporting season)
// ============================================================
export const earningsCalendar: EarningsEvent[] = ([
  // ===== Q1 2026 Earnings Season (Apr/May reporting) =====
  // Big Tech
  { company: 'Tesla', ticker: 'TSLA', reportDate: '2026-04-22', reportTime: 'after_close' as const, epsEstimate: '$0.68', sector: 'Technology' },
  { company: 'Alphabet', ticker: 'GOOGL', reportDate: '2026-04-28', reportTime: 'after_close' as const, epsEstimate: '$2.12', sector: 'Technology' },
  { company: 'Microsoft', ticker: 'MSFT', reportDate: '2026-04-29', reportTime: 'after_close' as const, epsEstimate: '$3.15', sector: 'Technology' },
  { company: 'Meta Platforms', ticker: 'META', reportDate: '2026-04-29', reportTime: 'after_close' as const, epsEstimate: '$5.10', sector: 'Technology' },
  { company: 'Amazon', ticker: 'AMZN', reportDate: '2026-05-07', reportTime: 'after_close' as const, epsEstimate: '$1.22', sector: 'Technology' },
  { company: 'Apple', ticker: 'AAPL', reportDate: '2026-05-07', reportTime: 'after_close' as const, epsEstimate: '$1.65', sector: 'Technology' },
  { company: 'NVIDIA', ticker: 'NVDA', reportDate: '2026-05-27', reportTime: 'after_close' as const, epsEstimate: '$0.92', sector: 'Technology' },
  // Financials
  { company: 'JPMorgan Chase', ticker: 'JPM', reportDate: '2026-04-14', reportTime: 'before_market' as const, epsEstimate: '$4.55', sector: 'Financials' },
  { company: 'Goldman Sachs', ticker: 'GS', reportDate: '2026-04-15', reportTime: 'before_market' as const, epsEstimate: '$13.10', sector: 'Financials' },
  { company: 'Morgan Stanley', ticker: 'MS', reportDate: '2026-04-16', reportTime: 'before_market' as const, epsEstimate: '$2.15', sector: 'Financials' },
  { company: 'Bank of America', ticker: 'BAC', reportDate: '2026-04-15', reportTime: 'before_market' as const, epsEstimate: '$0.91', sector: 'Financials' },
  { company: 'Citigroup', ticker: 'C', reportDate: '2026-04-16', reportTime: 'before_market' as const, epsEstimate: '$2.05', sector: 'Financials' },
  // Healthcare
  { company: 'Johnson & Johnson', ticker: 'JNJ', reportDate: '2026-04-21', reportTime: 'before_market' as const, epsEstimate: '$2.72', sector: 'Healthcare' },
  { company: 'UnitedHealth', ticker: 'UNH', reportDate: '2026-04-16', reportTime: 'before_market' as const, epsEstimate: '$7.65', sector: 'Healthcare' },
  // Consumer
  { company: 'Procter & Gamble', ticker: 'PG', reportDate: '2026-04-22', reportTime: 'before_market' as const, epsEstimate: '$1.45', sector: 'Consumer' },
  { company: 'Coca-Cola', ticker: 'KO', reportDate: '2026-04-28', reportTime: 'before_market' as const, epsEstimate: '$0.78', sector: 'Consumer' },
  // Other
  { company: 'ExxonMobil', ticker: 'XOM', reportDate: '2026-05-01', reportTime: 'before_market' as const, epsEstimate: '$2.18', sector: 'Energy' },
  { company: 'Visa', ticker: 'V', reportDate: '2026-04-28', reportTime: 'after_close' as const, epsEstimate: '$2.85', sector: 'Financials' },

  // ===== Q2 2026 Earnings Season (Jul/Aug reporting) =====
  // Financials
  { company: 'JPMorgan Chase', ticker: 'JPM', reportDate: '2026-07-14', reportTime: 'before_market' as const, epsEstimate: '$4.80', sector: 'Financials' },
  { company: 'Goldman Sachs', ticker: 'GS', reportDate: '2026-07-14', reportTime: 'before_market' as const, epsEstimate: '$13.50', sector: 'Financials' },
  { company: 'Bank of America', ticker: 'BAC', reportDate: '2026-07-15', reportTime: 'before_market' as const, epsEstimate: '$0.95', sector: 'Financials' },
  { company: 'Morgan Stanley', ticker: 'MS', reportDate: '2026-07-15', reportTime: 'before_market' as const, epsEstimate: '$2.25', sector: 'Financials' },
  { company: 'Citigroup', ticker: 'C', reportDate: '2026-07-15', reportTime: 'before_market' as const, epsEstimate: '$2.15', sector: 'Financials' },
  // Healthcare
  { company: 'UnitedHealth', ticker: 'UNH', reportDate: '2026-07-15', reportTime: 'before_market' as const, epsEstimate: '$7.85', sector: 'Healthcare' },
  { company: 'Johnson & Johnson', ticker: 'JNJ', reportDate: '2026-07-21', reportTime: 'before_market' as const, epsEstimate: '$2.80', sector: 'Healthcare' },
  // Consumer
  { company: 'Coca-Cola', ticker: 'KO', reportDate: '2026-07-21', reportTime: 'before_market' as const, epsEstimate: '$0.82', sector: 'Consumer' },
  { company: 'Procter & Gamble', ticker: 'PG', reportDate: '2026-07-22', reportTime: 'before_market' as const, epsEstimate: '$1.50', sector: 'Consumer' },
  // Big Tech
  { company: 'Tesla', ticker: 'TSLA', reportDate: '2026-07-22', reportTime: 'after_close' as const, epsEstimate: '$0.75', sector: 'Technology' },
  { company: 'Alphabet', ticker: 'GOOGL', reportDate: '2026-07-22', reportTime: 'after_close' as const, epsEstimate: '$2.25', sector: 'Technology' },
  { company: 'Visa', ticker: 'V', reportDate: '2026-07-28', reportTime: 'after_close' as const, epsEstimate: '$2.95', sector: 'Financials' },
  { company: 'Microsoft', ticker: 'MSFT', reportDate: '2026-07-29', reportTime: 'after_close' as const, epsEstimate: '$3.35', sector: 'Technology' },
  { company: 'Meta Platforms', ticker: 'META', reportDate: '2026-07-29', reportTime: 'after_close' as const, epsEstimate: '$5.40', sector: 'Technology' },
  { company: 'Apple', ticker: 'AAPL', reportDate: '2026-07-30', reportTime: 'after_close' as const, epsEstimate: '$1.45', sector: 'Technology' },
  { company: 'Amazon', ticker: 'AMZN', reportDate: '2026-07-30', reportTime: 'after_close' as const, epsEstimate: '$1.35', sector: 'Technology' },
  { company: 'ExxonMobil', ticker: 'XOM', reportDate: '2026-07-31', reportTime: 'before_market' as const, epsEstimate: '$2.25', sector: 'Energy' },
  { company: 'NVIDIA', ticker: 'NVDA', reportDate: '2026-08-26', reportTime: 'after_close' as const, epsEstimate: '$1.05', sector: 'Technology' },

  // ===== Q3 2026 Earnings Season (Oct/Nov reporting) =====
  // Financials
  { company: 'JPMorgan Chase', ticker: 'JPM', reportDate: '2026-10-13', reportTime: 'before_market' as const, epsEstimate: '$4.90', sector: 'Financials' },
  { company: 'Goldman Sachs', ticker: 'GS', reportDate: '2026-10-14', reportTime: 'before_market' as const, epsEstimate: '$13.75', sector: 'Financials' },
  { company: 'Bank of America', ticker: 'BAC', reportDate: '2026-10-14', reportTime: 'before_market' as const, epsEstimate: '$0.98', sector: 'Financials' },
  { company: 'Morgan Stanley', ticker: 'MS', reportDate: '2026-10-15', reportTime: 'before_market' as const, epsEstimate: '$2.30', sector: 'Financials' },
  { company: 'Citigroup', ticker: 'C', reportDate: '2026-10-15', reportTime: 'before_market' as const, epsEstimate: '$2.20', sector: 'Financials' },
  // Healthcare
  { company: 'UnitedHealth', ticker: 'UNH', reportDate: '2026-10-15', reportTime: 'before_market' as const, epsEstimate: '$8.00', sector: 'Healthcare' },
  { company: 'Johnson & Johnson', ticker: 'JNJ', reportDate: '2026-10-20', reportTime: 'before_market' as const, epsEstimate: '$2.85', sector: 'Healthcare' },
  // Consumer
  { company: 'Coca-Cola', ticker: 'KO', reportDate: '2026-10-21', reportTime: 'before_market' as const, epsEstimate: '$0.80', sector: 'Consumer' },
  { company: 'Procter & Gamble', ticker: 'PG', reportDate: '2026-10-21', reportTime: 'before_market' as const, epsEstimate: '$1.52', sector: 'Consumer' },
  // Big Tech
  { company: 'Tesla', ticker: 'TSLA', reportDate: '2026-10-21', reportTime: 'after_close' as const, epsEstimate: '$0.80', sector: 'Technology' },
  { company: 'Alphabet', ticker: 'GOOGL', reportDate: '2026-10-27', reportTime: 'after_close' as const, epsEstimate: '$2.35', sector: 'Technology' },
  { company: 'Visa', ticker: 'V', reportDate: '2026-10-27', reportTime: 'after_close' as const, epsEstimate: '$3.05', sector: 'Financials' },
  { company: 'Microsoft', ticker: 'MSFT', reportDate: '2026-10-28', reportTime: 'after_close' as const, epsEstimate: '$3.45', sector: 'Technology' },
  { company: 'Meta Platforms', ticker: 'META', reportDate: '2026-10-28', reportTime: 'after_close' as const, epsEstimate: '$5.60', sector: 'Technology' },
  { company: 'Amazon', ticker: 'AMZN', reportDate: '2026-10-29', reportTime: 'after_close' as const, epsEstimate: '$1.42', sector: 'Technology' },
  { company: 'Apple', ticker: 'AAPL', reportDate: '2026-10-29', reportTime: 'after_close' as const, epsEstimate: '$1.70', sector: 'Technology' },
  { company: 'ExxonMobil', ticker: 'XOM', reportDate: '2026-10-30', reportTime: 'before_market' as const, epsEstimate: '$2.30', sector: 'Energy' },
  { company: 'NVIDIA', ticker: 'NVDA', reportDate: '2026-11-25', reportTime: 'after_close' as const, epsEstimate: '$1.15', sector: 'Technology' },
] as EarningsEvent[]).sort((a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime());

// Get earnings within a date range
export function getUpcomingEarnings(daysAhead: number = 60): (EarningsEvent & { displayDate: string; dayOfWeek: string; daysUntil: number })[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return earningsCalendar
    .filter(e => {
      const d = new Date(e.reportDate);
      return d >= today && d <= cutoff;
    })
    .map(e => ({
      ...e,
      displayDate: formatEventDate(e.reportDate),
      dayOfWeek: new Date(e.reportDate).toLocaleDateString('en-US', { weekday: 'short' }),
      daysUntil: daysUntil(e.reportDate),
    }));
}
