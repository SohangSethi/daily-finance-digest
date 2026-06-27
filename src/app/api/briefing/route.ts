// ============================================================
// /api/briefing — Assembled homepage data
// Combines: macro (FRED) + markets (Yahoo) + events + earnings
//         + live finance news (GPT-4o) + BIS research
// ============================================================

import { NextResponse } from 'next/server';
import { fetchAllMacroIndicators } from '@/lib/fred';
import { fetchAllMarketData, fetchTickerData } from '@/lib/yahoo';
import { getUpcomingEvents, getUpcomingEarnings } from '@/lib/calendar';
import { fetchAllFinanceNews, curateFinanceNews, generateMarketSummary } from '@/lib/newsFeeds';
import { fetchBISPapers, summarizeBISPapers } from '@/lib/bis';

// Keep mock data as fallbacks
import {
  sectorPulse,
  whatChanged,
  topReads as mockReads,
  aiMarketSummary,
  bisPapersMock,
  trendingStocks,
  geopoliticsNews,
  trackedInstruments,
} from '@/lib/mockData';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Fetch all data in parallel
    const [macroData, marketData, tickerItems, rawNewsArticles, rawBISPapers] = await Promise.all([
      fetchAllMacroIndicators(),
      fetchAllMarketData(),
      fetchTickerData(),
      fetchAllFinanceNews(),
      fetchBISPapers(),
    ]);

    // Get calendar data (no API call, just date math)
    const upcomingEvents = getUpcomingEvents(10);
    const upcomingEarnings = getUpcomingEarnings(14);

    // AI-curated finance news + market summary + BIS summaries (sequential to manage API rate)
    const [curatedNews, marketSummary, bisPapers] = await Promise.all([
      curateFinanceNews(rawNewsArticles),
      generateMarketSummary(rawNewsArticles),
      summarizeBISPapers(rawBISPapers),
    ]);

    // Transform curated news to match the existing ArticleCard component format
    const topReads = curatedNews.map((article) => ({
      id: article.id,
      rank: article.rank,
      title: article.title,
      summary: article.summary || article.snippet,
      source: article.source,
      sourceSlug: article.sourceSlug,
      timeAgo: formatTimeAgo(article.publishedAt),
      compositeScore: article.score,
      tags: [article.primaryTopic],
      whyMatters: article.whyMatters,
      whyRead: article.whyRead,
      marketImpact: article.marketImpact || '',
      studentWhyRead: article.studentWhyRead || article.whyRead,
      studentWhyMatters: article.studentWhyMatters || article.whyMatters,
      url: article.url,
      affectedTickers: article.affectedTickers || [],
      riskFlags: article.riskFlags || [],
    }));

    // Compute "what changed" from market data
    const liveChanges = marketData
      .filter(m => m.changeAbs !== null && Math.abs(m.changeAbs!) > 0)
      .map(m => ({
        item: m.name,
        type: 'market' as const,
        change: `${m.value} (${m.changeAbs! > 0 ? '+' : ''}${m.changeAbs}${m.unit === '%' ? 'bp' : ''})`,
        direction: m.direction,
      }))
      .slice(0, 5);

    // Assemble the briefing
    const briefing = {
      date: new Date().toISOString(),
      macro: macroData,
      markets: marketData,
      ticker: tickerItems,
      upcomingEvents,
      upcomingEarnings,
      topReads: topReads.length > 0 ? topReads : mockReads,
      sectorPulse,
      bisPapers: bisPapers.length > 0 ? bisPapers : bisPapersMock,
      whatChanged: liveChanges.length > 0 ? liveChanges : whatChanged,
      marketSummary: marketSummary || aiMarketSummary,
      trendingStocks,
      geopoliticsNews,
      trackedInstruments,
      lastRefreshed: new Date().toISOString(),
    };

    return NextResponse.json(briefing, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Briefing API error:', error);

    // Graceful fallback: return what we can
    return NextResponse.json(
      {
        error: 'Partial data available',
        macro: [],
        markets: [],
        ticker: [],
        upcomingEvents: getUpcomingEvents(10),
        upcomingEarnings: getUpcomingEarnings(14),
        topReads: mockReads,
        sectorPulse,
        bisPapers: bisPapersMock,
        whatChanged,
        marketSummary: aiMarketSummary,
        trendingStocks,
        geopoliticsNews,
        trackedInstruments,
        lastRefreshed: new Date().toISOString(),
      },
      { status: 206 } // Partial Content
    );
  }
}

function formatTimeAgo(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  } catch {
    return 'Recently';
  }
}
