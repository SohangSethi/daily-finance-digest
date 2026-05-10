export interface PortfolioHolding {
  ticker: string;
  name: string;
  shares: number;
  averageCost: number;
  sector: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  unrealizedPnL: number;
  unrealizedPnLPct: number;
  dailyPnL: number;
  dailyPnLPct: number;
  topContributors: { ticker: string; dailyPnL: number }[];
  topDetractors: { ticker: string; dailyPnL: number }[];
  sectorWeights: Record<string, number>;
  holdingsWithData: (PortfolioHolding & {
    currentPrice: number | null;
    dailyChange: number | null;
    dailyChangePct: number | null;
    currentValue: number;
    unrealizedPnL: number;
    weight: number;
  })[];
}

// Mock portfolio based on standard large cap allocations
export const mockPortfolio: PortfolioHolding[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', shares: 150, averageCost: 165.50, sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 100, averageCost: 310.20, sector: 'Technology' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', shares: 50, averageCost: 450.00, sector: 'Technology' },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', shares: 200, averageCost: 145.00, sector: 'Financials' },
  { ticker: 'XOM', name: 'Exxon Mobil Corp.', shares: 120, averageCost: 105.00, sector: 'Energy' },
  { ticker: 'UNH', name: 'UnitedHealth Group', shares: 40, averageCost: 480.00, sector: 'Healthcare' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', shares: 100, averageCost: 155.00, sector: 'Healthcare' },
  { ticker: 'PG', name: 'Procter & Gamble', shares: 80, averageCost: 145.00, sector: 'Consumer Defensive' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', shares: 120, averageCost: 130.00, sector: 'Consumer Cyclical' },
];

export function calculatePortfolioSummary(
  holdings: PortfolioHolding[],
  liveQuotes: Record<string, { price: number | null; change: number | null; changePct: number | null }>
): PortfolioSummary {
  let totalValue = 0;
  let totalCost = 0;
  let dailyPnL = 0;

  const holdingsWithData = holdings.map((h) => {
    const quote = liveQuotes[h.ticker] || { price: null, change: null, changePct: null };
    const currentPrice = quote.price ?? h.averageCost; // fallback to cost if no live data
    const currentValue = h.shares * currentPrice;
    const holdingCost = h.shares * h.averageCost;
    const unrealizedPnL = currentValue - holdingCost;
    const holdingDailyPnL = quote.change ? h.shares * quote.change : 0;

    totalValue += currentValue;
    totalCost += holdingCost;
    dailyPnL += holdingDailyPnL;

    return {
      ...h,
      currentPrice: quote.price,
      dailyChange: quote.change,
      dailyChangePct: quote.changePct,
      currentValue,
      unrealizedPnL,
      weight: 0, // will calculate after totalValue is known
    };
  });

  const unrealizedPnL = totalValue - totalCost;
  const unrealizedPnLPct = totalCost > 0 ? (unrealizedPnL / totalCost) * 100 : 0;
  // Calculate a generic daily PnL pct based on prev close value
  const prevValue = totalValue - dailyPnL;
  const dailyPnLPct = prevValue > 0 ? (dailyPnL / prevValue) * 100 : 0;

  const sectorValues: Record<string, number> = {};

  holdingsWithData.forEach((h) => {
    h.weight = totalValue > 0 ? (h.currentValue / totalValue) * 100 : 0;
    sectorValues[h.sector] = (sectorValues[h.sector] || 0) + h.currentValue;
  });

  const sectorWeights: Record<string, number> = {};
  for (const [sector, val] of Object.entries(sectorValues)) {
    sectorWeights[sector] = totalValue > 0 ? (val / totalValue) * 100 : 0;
  }

  // Sort for contributors/detractors
  const sortedByDaily = [...holdingsWithData]
    .filter((h) => h.dailyChange !== null)
    .sort((a, b) => (b.shares * (b.dailyChange || 0)) - (a.shares * (a.dailyChange || 0)));

  return {
    totalValue,
    totalCost,
    unrealizedPnL,
    unrealizedPnLPct,
    dailyPnL,
    dailyPnLPct,
    topContributors: sortedByDaily.slice(0, 3).map((h) => ({ ticker: h.ticker, dailyPnL: h.shares * (h.dailyChange || 0) })),
    topDetractors: sortedByDaily.slice(-3).reverse().map((h) => ({ ticker: h.ticker, dailyPnL: h.shares * (h.dailyChange || 0) })),
    sectorWeights,
    holdingsWithData: holdingsWithData.sort((a, b) => b.weight - a.weight), // sort by weight desc
  };
}
