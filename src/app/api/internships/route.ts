// ============================================================
// /api/internships — Summer 2027 Internship Tracker
// Aggregates internship postings from company career sites
// Revalidates every 12 hours (twice daily)
// ============================================================

import { NextResponse } from 'next/server';
import { fetchAllInternships } from '@/lib/internships';

export const revalidate = 43200; // Revalidate every 12 hours

export async function GET() {
  try {
    const postings = await fetchAllInternships();

    // Compute stats
    const liveCount = postings.filter(p => p.source !== 'direct').length;
    const directCount = postings.filter(p => p.source === 'direct').length;
    const sectors = [...new Set(postings.map(p => p.sector))];

    return NextResponse.json({
      postings,
      stats: {
        totalPostings: postings.length,
        livePostings: liveCount,
        directLinks: directCount,
        sectors,
        companiesTracked: new Set(postings.map(p => p.companySlug)).size,
      },
      lastRefreshed: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Internships API error:', error);
    return NextResponse.json(
      {
        postings: [],
        stats: { totalPostings: 0, livePostings: 0, directLinks: 0, sectors: [], companiesTracked: 0 },
        lastRefreshed: new Date().toISOString(),
        error: 'Failed to fetch internship data',
      },
      { status: 500 }
    );
  }
}
