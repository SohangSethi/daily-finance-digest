// ============================================================
// Yahoo Finance Integration
// Uses yahoo-finance2 for market data
// ============================================================

import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

export interface MarketDataPoint {
  name: string;
  symbol: string;
  value: number | null;
  unit: string;
  changeAbs: number | null;
  changePct: number | null;
  direction: 'up' | 'down' | 'flat';
  sparkline: number[];
  assetClass: string;
  invertColor?: boolean;
  lastUpdated: string;
}

const MARKET_INSTRUMENTS: {
  name: string;
  symbol: string;
  unit: string;
  assetClass: string;
  invertColor?: boolean;
  isBps?: boolean; // Display changes in basis points
}[] = [
  { name: 'S&P 500', symbol: '^GSPC', unit: '', assetClass: 'equities' },
  { name: 'Nasdaq', symbol: '^IXIC', unit: '', assetClass: 'equities' },
  { name: 'Dow Jones', symbol: '^DJI', unit: '', assetClass: 'equities' },
  { name: '10Y UST', symbol: '^TNX', unit: '%', assetClass: 'rates', isBps: true },
  { name: '2Y UST', symbol: '^IRX', unit: '%', assetClass: 'rates', isBps: true },
  { name: 'VIX', symbol: '^VIX', unit: '', assetClass: 'vol', invertColor: true },
  { name: 'DXY', symbol: 'DX-Y.NYB', unit: '', assetClass: 'fx' },
  { name: 'WTI Crude', symbol: 'CL=F', unit: '$', assetClass: 'commodities' },
  { name: 'Brent Crude', symbol: 'BZ=F', unit: '$', assetClass: 'commodities' },
  { name: 'Gold', symbol: 'GC=F', unit: '$', assetClass: 'commodities' },
];

async function fetchQuote(symbol: string): Promise<{
  price: number | null;
  change: number | null;
  changePct: number | null;
  prevClose: number | null;
}> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await yahooFinance.quote(symbol);
    return {
      price: result.regularMarketPrice ?? null,
      change: result.regularMarketChange ?? null,
      changePct: result.regularMarketChangePercent ?? null,
      prevClose: result.regularMarketPreviousClose ?? null,
    };
  } catch (error) {
    console.error(`Yahoo Finance error for ${symbol}:`, error);
    return { price: null, change: null, changePct: null, prevClose: null };
  }
}

async function fetchSparkline(symbol: string): Promise<number[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await yahooFinance.chart(symbol, {
      period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      period2: new Date().toISOString().split('T')[0],
      interval: '1d',
    });

    if (result.quotes && result.quotes.length > 0) {
      return result.quotes
        .map((q: { close?: number | null }) => q.close)
        .filter((v: number | null | undefined): v is number => v != null)
        .slice(-12); // Last 12 data points for sparkline
    }
    return [];
  } catch (error) {
    console.error(`Yahoo Finance chart error for ${symbol}:`, error);
    return [];
  }
}

export async function fetchAllMarketData(): Promise<MarketDataPoint[]> {
  const results: MarketDataPoint[] = [];

  // Fetch all quotes and sparklines in parallel for speed
  const quotePromises = MARKET_INSTRUMENTS.map(inst => fetchQuote(inst.symbol));
  const sparklinePromises = MARKET_INSTRUMENTS.map(inst => fetchSparkline(inst.symbol));

  const quotes = await Promise.all(quotePromises);
  const sparklines = await Promise.all(sparklinePromises);

  for (let i = 0; i < MARKET_INSTRUMENTS.length; i++) {
    const inst = MARKET_INSTRUMENTS[i];
    const quote = quotes[i];
    const sparkline = sparklines[i];

    const direction: 'up' | 'down' | 'flat' =
      quote.change === null || Math.abs(quote.change) < 0.001
        ? 'flat'
        : quote.change > 0
        ? 'up'
        : 'down';

    results.push({
      name: inst.name,
      symbol: inst.symbol,
      value: quote.price !== null ? Math.round(quote.price * 100) / 100 : null,
      unit: inst.unit,
      changeAbs: quote.change !== null ? Math.round(quote.change * 100) / 100 : null,
      changePct: quote.changePct !== null ? Math.round(quote.changePct * 100) / 100 : null,
      direction,
      sparkline,
      assetClass: inst.assetClass,
      invertColor: inst.invertColor,
      lastUpdated: new Date().toISOString(),
    });
  }

  return results;
}

// Fetch just ticker ribbon data (lighter / faster)
export async function fetchTickerData(): Promise<{
  name: string;
  value: string;
  change: string;
  direction: 'up' | 'down' | 'flat';
}[]> {
  const symbols = ['^GSPC', '^IXIC', '^DJI', '^TNX', '^IRX', '^VIX', 'DX-Y.NYB', 'CL=F', 'GC=F'];
  const names = ['S&P 500', 'NDX', 'DJI', '10Y', '2Y', 'VIX', 'DXY', 'WTI', 'Gold'];

  try {
    const quotePromises = symbols.map(s => fetchQuote(s));
    const quotes = await Promise.all(quotePromises);

    return quotes.map((q, i) => {
      const direction: 'up' | 'down' | 'flat' =
        q.change === null || Math.abs(q.change) < 0.001 ? 'flat' : q.change > 0 ? 'up' : 'down';

      const isRate = symbols[i] === '^TNX' || symbols[i] === '^IRX';
      let valueStr = q.price !== null ? q.price.toLocaleString('en-US', { minimumFractionDigits: isRate ? 2 : 1 }) : '—';
      if (isRate && q.price !== null) valueStr += '%';
      if (symbols[i] === 'CL=F' || symbols[i] === 'GC=F') valueStr = '$' + valueStr;

      const changeStr = q.changePct !== null
        ? `${q.changePct > 0 ? '+' : ''}${q.changePct.toFixed(2)}%`
        : '—';

      return { name: names[i], value: valueStr, change: changeStr, direction };
    });
  } catch {
    return names.map(n => ({ name: n, value: '—', change: '—', direction: 'flat' as const }));
  }
}
