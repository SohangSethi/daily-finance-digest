// ============================================================
// /api/internships/check — Cron endpoint
// Fetches internships, detects new batch openings,
// and sends Discord alerts when companies open recruiting.
// Runs every 12 hours via Vercel/Railway cron or external cron.
// ============================================================

import { NextResponse } from 'next/server';
import { fetchAllInternships } from '@/lib/internships';
import { checkAndNotify, sendDiscordMessage } from '@/lib/discord';

// This endpoint should be called by a cron job every 12 hours
export const dynamic = 'force-dynamic'; // Never cache this endpoint

export async function GET(request: Request) {
  // Optional: protect with a secret key
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  const expectedKey = process.env.CRON_SECRET || 'bankerbrief-cron-2027';

  if (key !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[Cron] Starting internship check...');
    const postings = await fetchAllInternships();

    const liveCount = postings.filter(p => p.source !== 'direct').length;
    console.log(`[Cron] Fetched ${postings.length} total postings (${liveCount} live)`);

    // Check for new batch openings and send Discord alerts
    const result = await checkAndNotify(postings);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      totalPostings: postings.length,
      livePostings: liveCount,
      alertsSent: result.alerted.length,
      alertedCompanies: result.alerted,
    };

    console.log(`[Cron] Done. Alerts sent: ${result.alerted.length}`, result.alerted);

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Cron] Error:', error);

    // Try to notify about the error
    try {
      await sendDiscordMessage(`⚠️ **BankerBrief Internship Check Failed**\n\`\`\`\n${error}\n\`\`\``);
    } catch {
      // Ignore notification failure
    }

    return NextResponse.json(
      { error: 'Check failed', message: String(error) },
      { status: 500 }
    );
  }
}
