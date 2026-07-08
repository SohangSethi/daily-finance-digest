// ============================================================
// /api/internships — Summer 2027 Internship Tracker
// Aggregates postings from APIs, GitHub repos, and AI web search
// Force-dynamic: always fetches fresh data, no stale cache
// ============================================================

import { NextResponse } from 'next/server';
import { fetchAllInternships } from '@/lib/internships';
import { checkAndNotify } from '@/lib/discord';

// Force this route to ALWAYS run server-side and fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const postings = await fetchAllInternships();

    // Check for new batch openings and send Discord alerts (fire-and-forget)
    checkAndNotify(postings).catch(err => console.error('[Discord] Alert check failed:', err));

    // Compute stats
    const liveCount = postings.filter(p => p.source !== 'direct').length;
    const directCount = postings.filter(p => p.source === 'direct').length;
    const aiCount = postings.filter(p => p.source === 'ai').length;
    const sectors = [...new Set(postings.map(p => p.sector))];

    return NextResponse.json({
      postings,
      stats: {
        totalPostings: postings.length,
        livePostings: liveCount,
        directLinks: directCount,
        aiDiscovered: aiCount,
        sectors,
        companiesTracked: new Set(postings.map(p => p.companySlug)).size,
      },
      lastRefreshed: new Date().toISOString(),
    }, {
      headers: {
        // Cache for 3 hours on CDN, serve stale while revalidating
        'Cache-Control': 'public, max-age=10800, s-maxage=10800, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Internships API error:', error);
    return NextResponse.json(
      {
        postings: [],
        stats: { totalPostings: 0, livePostings: 0, directLinks: 0, aiDiscovered: 0, sectors: [], companiesTracked: 0 },
        lastRefreshed: new Date().toISOString(),
        error: 'Failed to fetch internship data',
      },
      { status: 500 }
    );
  }
}
