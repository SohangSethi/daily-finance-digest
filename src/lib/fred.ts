// ============================================================
// FRED API Integration
// Federal Reserve Economic Data — free, no key required for basic access
// ============================================================

interface FREDObservation {
  date: string;
  value: string;
}

interface FREDResponse {
  observations: FREDObservation[];
}

export interface MacroDataPoint {
  name: string;
  slug: string;
  value: number | null;
  unit: string;
  change: number | null;
  direction: 'up' | 'down' | 'flat';
  sparkline: number[];
  nextRelease: string;
  category: string;
  lastUpdated: string;
}

// FRED series IDs for our indicators
const FRED_SERIES: {
  name: string;
  slug: string;
  seriesId: string;
  unit: string;
  category: string;
  nextRelease: string; // Hardcoded for MVP — can be dynamized later
}[] = [
  { name: 'Fed Funds', slug: 'fed_funds', seriesId: 'FEDFUNDS', unit: '%', category: 'rates', nextRelease: 'Jun 12' },
  { name: 'CPI YoY', slug: 'cpi_yoy', seriesId: 'CPIAUCSL', unit: '%', category: 'inflation', nextRelease: 'May 15' },
  { name: 'Core PCE', slug: 'core_pce', seriesId: 'PCEPILFE', unit: '%', category: 'inflation', nextRelease: 'May 31' },
  { name: 'Unemployment', slug: 'unemployment', seriesId: 'UNRATE', unit: '%', category: 'employment', nextRelease: 'May 3' },
  { name: 'GDP QoQ', slug: 'gdp', seriesId: 'GDP', unit: '%', category: 'growth', nextRelease: 'Jun 27' },
  { name: 'Nonfarm Payrolls', slug: 'payrolls', seriesId: 'PAYEMS', unit: 'K', category: 'employment', nextRelease: 'May 3' },
  { name: 'Initial Claims', slug: 'claims', seriesId: 'ICSA', unit: 'K', category: 'employment', nextRelease: 'Weekly' },
  { name: 'SOFR', slug: 'sofr', seriesId: 'SOFR', unit: '%', category: 'rates', nextRelease: 'Daily' },
  { name: 'Prime Rate', slug: 'prime', seriesId: 'DPRIME', unit: '%', category: 'rates', nextRelease: '—' },
];

const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

// FRED API key — free to obtain at https://fred.stlouisfed.org/docs/api/api_key.html
// For MVP we use the demo key or env variable
const FRED_API_KEY = process.env.FRED_API_KEY || 'DEMO_KEY';

async function fetchFREDSeries(seriesId: string, limit: number = 12): Promise<FREDObservation[]> {
  try {
    const url = `${FRED_BASE_URL}?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=${limit}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

    if (!response.ok) {
      console.error(`FRED API error for ${seriesId}: ${response.status}`);
      return [];
    }

    const data: FREDResponse = await response.json();
    return data.observations || [];
  } catch (error) {
    console.error(`Failed to fetch FRED series ${seriesId}:`, error);
    return [];
  }
}

export async function fetchAllMacroIndicators(): Promise<MacroDataPoint[]> {
  const results: MacroDataPoint[] = [];

  for (const series of FRED_SERIES) {
    const observations = await fetchFREDSeries(series.seriesId, 12);

    if (observations.length === 0) {
      // Return a stale placeholder
      results.push({
        name: series.name,
        slug: series.slug,
        value: null,
        unit: series.unit,
        change: null,
        direction: 'flat',
        sparkline: [],
        nextRelease: series.nextRelease,
        category: series.category,
        lastUpdated: 'unavailable',
      });
      continue;
    }

    // Observations come in desc order; reverse for sparkline (oldest → newest)
    const values = observations
      .map(o => parseFloat(o.value))
      .filter(v => !isNaN(v))
      .reverse();

    const latestValue = values.length > 0 ? values[values.length - 1] : null;
    const priorValue = values.length > 1 ? values[values.length - 2] : null;
    const change = latestValue !== null && priorValue !== null ? latestValue - priorValue : null;
    const direction: 'up' | 'down' | 'flat' =
      change === null || Math.abs(change) < 0.001 ? 'flat' : change > 0 ? 'up' : 'down';

    results.push({
      name: series.name,
      slug: series.slug,
      value: latestValue,
      unit: series.unit,
      change: change !== null ? Math.round(change * 100) / 100 : null,
      direction,
      sparkline: values,
      nextRelease: series.nextRelease,
      category: series.category,
      lastUpdated: observations[0]?.date || 'unknown',
    });
  }

  return results;
}
