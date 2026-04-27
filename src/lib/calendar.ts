// ============================================================
// SEEDED CALENDAR DATA
// Official 2025 dates for FOMC, CPI, PCE, GDP, Payrolls, ISM
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
// FOMC 2025 Meeting Dates (official Fed schedule)
// ============================================================
const fomcDates: EconomicEvent[] = [
  { id: 101, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-01-29', impactLevel: 'high' },
  { id: 102, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-03-19', impactLevel: 'high' },
  { id: 103, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-05-07', impactLevel: 'high' },
  { id: 104, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-06-18', impactLevel: 'high' },
  { id: 105, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-07-30', impactLevel: 'high' },
  { id: 106, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-09-17', impactLevel: 'high' },
  { id: 107, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-10-29', impactLevel: 'high' },
  { id: 108, name: 'FOMC Rate Decision', type: 'fomc', date: '2025-12-17', impactLevel: 'high' },
  // Minutes releases (~3 weeks after decision)
  { id: 111, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-02-19', impactLevel: 'medium' },
  { id: 112, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-04-09', impactLevel: 'medium' },
  { id: 113, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-05-28', impactLevel: 'medium' },
  { id: 114, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-07-09', impactLevel: 'medium' },
  { id: 115, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-08-20', impactLevel: 'medium' },
  { id: 116, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-10-08', impactLevel: 'medium' },
  { id: 117, name: 'FOMC Minutes Release', type: 'fomc', date: '2025-11-26', impactLevel: 'medium' },
];

// ============================================================
// CPI Release Dates 2025 (BLS schedule)
// ============================================================
const cpiDates: EconomicEvent[] = [
  { id: 201, name: 'CPI Release (Jan)', type: 'cpi', date: '2025-02-12', impactLevel: 'high' },
  { id: 202, name: 'CPI Release (Feb)', type: 'cpi', date: '2025-03-12', impactLevel: 'high' },
  { id: 203, name: 'CPI Release (Mar)', type: 'cpi', date: '2025-04-10', impactLevel: 'high' },
  { id: 204, name: 'CPI Release (Apr)', type: 'cpi', date: '2025-05-13', impactLevel: 'high' },
  { id: 205, name: 'CPI Release (May)', type: 'cpi', date: '2025-06-11', impactLevel: 'high' },
  { id: 206, name: 'CPI Release (Jun)', type: 'cpi', date: '2025-07-11', impactLevel: 'high' },
  { id: 207, name: 'CPI Release (Jul)', type: 'cpi', date: '2025-08-12', impactLevel: 'high' },
  { id: 208, name: 'CPI Release (Aug)', type: 'cpi', date: '2025-09-10', impactLevel: 'high' },
  { id: 209, name: 'CPI Release (Sep)', type: 'cpi', date: '2025-10-14', impactLevel: 'high' },
  { id: 210, name: 'CPI Release (Oct)', type: 'cpi', date: '2025-11-12', impactLevel: 'high' },
  { id: 211, name: 'CPI Release (Nov)', type: 'cpi', date: '2025-12-10', impactLevel: 'high' },
];

// ============================================================
// PCE Release Dates 2025 (BEA schedule, ~last Fri of month)
// ============================================================
const pceDates: EconomicEvent[] = [
  { id: 301, name: 'Core PCE Release', type: 'pce', date: '2025-01-31', impactLevel: 'high' },
  { id: 302, name: 'Core PCE Release', type: 'pce', date: '2025-02-28', impactLevel: 'high' },
  { id: 303, name: 'Core PCE Release', type: 'pce', date: '2025-03-28', impactLevel: 'high' },
  { id: 304, name: 'Core PCE Release', type: 'pce', date: '2025-04-30', impactLevel: 'high' },
  { id: 305, name: 'Core PCE Release', type: 'pce', date: '2025-05-30', impactLevel: 'high' },
  { id: 306, name: 'Core PCE Release', type: 'pce', date: '2025-06-27', impactLevel: 'high' },
  { id: 307, name: 'Core PCE Release', type: 'pce', date: '2025-07-31', impactLevel: 'high' },
  { id: 308, name: 'Core PCE Release', type: 'pce', date: '2025-08-29', impactLevel: 'high' },
  { id: 309, name: 'Core PCE Release', type: 'pce', date: '2025-09-26', impactLevel: 'high' },
  { id: 310, name: 'Core PCE Release', type: 'pce', date: '2025-10-31', impactLevel: 'high' },
  { id: 311, name: 'Core PCE Release', type: 'pce', date: '2025-11-26', impactLevel: 'high' },
];

// ============================================================
// Jobs Report / Nonfarm Payrolls 2025 (BLS, first Fri of month)
// ============================================================
const payrollDates: EconomicEvent[] = [
  { id: 401, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-01-10', impactLevel: 'high' },
  { id: 402, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-02-07', impactLevel: 'high' },
  { id: 403, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-03-07', impactLevel: 'high' },
  { id: 404, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-04-04', impactLevel: 'high' },
  { id: 405, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-05-02', impactLevel: 'high' },
  { id: 406, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-06-06', impactLevel: 'high' },
  { id: 407, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-07-03', impactLevel: 'high' },
  { id: 408, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-08-01', impactLevel: 'high' },
  { id: 409, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-09-05', impactLevel: 'high' },
  { id: 410, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-10-03', impactLevel: 'high' },
  { id: 411, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-11-07', impactLevel: 'high' },
  { id: 412, name: 'Nonfarm Payrolls', type: 'payrolls', date: '2025-12-05', impactLevel: 'high' },
];

// ============================================================
// GDP Release Dates 2025 (BEA)
// ============================================================
const gdpDates: EconomicEvent[] = [
  { id: 501, name: 'GDP Q4 2024 Advance', type: 'gdp', date: '2025-01-30', impactLevel: 'high' },
  { id: 502, name: 'GDP Q4 2024 Second', type: 'gdp', date: '2025-02-27', impactLevel: 'medium' },
  { id: 503, name: 'GDP Q4 2024 Third', type: 'gdp', date: '2025-03-27', impactLevel: 'medium' },
  { id: 504, name: 'GDP Q1 2025 Advance', type: 'gdp', date: '2025-04-30', impactLevel: 'high' },
  { id: 505, name: 'GDP Q1 2025 Second', type: 'gdp', date: '2025-05-29', impactLevel: 'medium' },
  { id: 506, name: 'GDP Q1 2025 Third', type: 'gdp', date: '2025-06-26', impactLevel: 'medium' },
  { id: 507, name: 'GDP Q2 2025 Advance', type: 'gdp', date: '2025-07-30', impactLevel: 'high' },
  { id: 508, name: 'GDP Q3 2025 Advance', type: 'gdp', date: '2025-10-29', impactLevel: 'high' },
];

// ============================================================
// ISM Manufacturing Dates (first business day of month)
// ============================================================
const ismDates: EconomicEvent[] = [
  { id: 601, name: 'ISM Manufacturing', type: 'ism', date: '2025-05-01', impactLevel: 'medium' },
  { id: 602, name: 'ISM Manufacturing', type: 'ism', date: '2025-06-02', impactLevel: 'medium' },
  { id: 603, name: 'ISM Manufacturing', type: 'ism', date: '2025-07-01', impactLevel: 'medium' },
  { id: 604, name: 'ISM Manufacturing', type: 'ism', date: '2025-08-01', impactLevel: 'medium' },
  { id: 605, name: 'ISM Manufacturing', type: 'ism', date: '2025-09-02', impactLevel: 'medium' },
  { id: 606, name: 'ISM Manufacturing', type: 'ism', date: '2025-10-01', impactLevel: 'medium' },
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
// Q1 2025 Earnings Season (Apr/May reporting season)
// ============================================================
export const earningsCalendar: EarningsEvent[] = ([
  // Big Tech
  { company: 'Tesla', ticker: 'TSLA', reportDate: '2025-04-22', reportTime: 'after_close' as const, epsEstimate: '$0.52', sector: 'Technology' },
  { company: 'Alphabet', ticker: 'GOOGL', reportDate: '2025-04-29', reportTime: 'after_close' as const, epsEstimate: '$1.89', sector: 'Technology' },
  { company: 'Microsoft', ticker: 'MSFT', reportDate: '2025-04-30', reportTime: 'after_close' as const, epsEstimate: '$2.83', sector: 'Technology' },
  { company: 'Meta Platforms', ticker: 'META', reportDate: '2025-04-30', reportTime: 'after_close' as const, epsEstimate: '$4.32', sector: 'Technology' },
  { company: 'Amazon', ticker: 'AMZN', reportDate: '2025-05-01', reportTime: 'after_close' as const, epsEstimate: '$0.98', sector: 'Technology' },
  { company: 'Apple', ticker: 'AAPL', reportDate: '2025-05-01', reportTime: 'after_close' as const, epsEstimate: '$1.50', sector: 'Technology' },
  { company: 'NVIDIA', ticker: 'NVDA', reportDate: '2025-05-28', reportTime: 'after_close' as const, epsEstimate: '$0.73', sector: 'Technology' },

  // Financials
  { company: 'JPMorgan Chase', ticker: 'JPM', reportDate: '2025-04-11', reportTime: 'before_market' as const, epsEstimate: '$4.17', sector: 'Financials' },
  { company: 'Goldman Sachs', ticker: 'GS', reportDate: '2025-04-14', reportTime: 'before_market' as const, epsEstimate: '$12.35', sector: 'Financials' },
  { company: 'Morgan Stanley', ticker: 'MS', reportDate: '2025-04-16', reportTime: 'before_market' as const, epsEstimate: '$1.92', sector: 'Financials' },
  { company: 'Bank of America', ticker: 'BAC', reportDate: '2025-04-15', reportTime: 'before_market' as const, epsEstimate: '$0.82', sector: 'Financials' },
  { company: 'Citigroup', ticker: 'C', reportDate: '2025-04-15', reportTime: 'before_market' as const, epsEstimate: '$1.85', sector: 'Financials' },

  // Healthcare
  { company: 'Johnson & Johnson', ticker: 'JNJ', reportDate: '2025-04-15', reportTime: 'before_market' as const, epsEstimate: '$2.57', sector: 'Healthcare' },
  { company: 'UnitedHealth', ticker: 'UNH', reportDate: '2025-04-17', reportTime: 'before_market' as const, epsEstimate: '$7.29', sector: 'Healthcare' },

  // Consumer
  { company: 'Procter & Gamble', ticker: 'PG', reportDate: '2025-04-23', reportTime: 'before_market' as const, epsEstimate: '$1.37', sector: 'Consumer' },
  { company: 'Coca-Cola', ticker: 'KO', reportDate: '2025-04-29', reportTime: 'before_market' as const, epsEstimate: '$0.72', sector: 'Consumer' },

  // Industrials / Other
  { company: 'ExxonMobil', ticker: 'XOM', reportDate: '2025-05-02', reportTime: 'before_market' as const, epsEstimate: '$2.01', sector: 'Energy' },
  { company: 'Visa', ticker: 'V', reportDate: '2025-04-29', reportTime: 'after_close' as const, epsEstimate: '$2.68', sector: 'Financials' },
] as EarningsEvent[]).sort((a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime());

// Get earnings within a date range
export function getUpcomingEarnings(daysAhead: number = 14): (EarningsEvent & { displayDate: string; dayOfWeek: string; daysUntil: number })[] {
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
