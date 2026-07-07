// ============================================================
// Discord Webhook Notifications
// Sends alerts when companies open Summer 2027 recruiting
// ============================================================

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1495548705028177970/fzHa9_FRZEYPcYmJALAjTO6hEM2wf5wsgG5eNR_nRaBWB0PbELma-ukt4p1W72RmiACp';

interface InternshipPosting {
  id: string;
  company: string;
  companySlug: string;
  sector: string;
  title: string;
  location: string;
  url: string;
  postedDate: string | null;
  source: 'greenhouse' | 'lever' | 'workday' | 'github' | 'direct';
  status: 'open' | 'coming_soon';
}

// In-memory store of last known posting counts per company
// Persists across requests within the same server process
const lastKnownCounts: Map<string, number> = new Map();
const notifiedCompanies: Set<string> = new Set();

// Minimum number of NEW postings to trigger a notification
const ALERT_THRESHOLD = 2;

/**
 * Detect companies that just opened recruiting (large batch of new postings)
 * and send Discord alerts for each one.
 */
export async function checkAndNotify(postings: InternshipPosting[]): Promise<{ alerted: string[]; skipped: string[] }> {
  const alerted: string[] = [];
  const skipped: string[] = [];

  // Only look at live postings (not direct links)
  const livePostings = postings.filter(p => p.source !== 'direct');

  // Group by company
  const postingsByCompany = new Map<string, InternshipPosting[]>();
  for (const posting of livePostings) {
    const existing = postingsByCompany.get(posting.companySlug) || [];
    existing.push(posting);
    postingsByCompany.set(posting.companySlug, existing);
  }

  for (const [companySlug, companyPostings] of postingsByCompany) {
    const currentCount = companyPostings.length;
    const previousCount = lastKnownCounts.get(companySlug) || 0;
    const newCount = currentCount - previousCount;

    // Update stored count
    lastKnownCounts.set(companySlug, currentCount);

    // Skip if we already notified for this company in this process lifecycle
    // (prevents re-alerting on every check)
    const notifKey = `${companySlug}-${currentCount}`;
    if (notifiedCompanies.has(notifKey)) {
      skipped.push(companySlug);
      continue;
    }

    // Alert if:
    // 1. This is the first time we see this company with live postings (previousCount === 0 and currentCount >= threshold)
    // 2. OR the company just added a batch of new roles (newCount >= threshold)
    const isNewOpening = previousCount === 0 && currentCount >= ALERT_THRESHOLD;
    const isBatchDrop = newCount >= ALERT_THRESHOLD;

    if (isNewOpening || isBatchDrop) {
      const companyName = companyPostings[0].company;
      const sector = companyPostings[0].sector;

      // Build the notification
      const sampleRoles = companyPostings
        .slice(0, 5)
        .map(p => `• [${p.title}](${p.url})`)
        .join('\n');

      const moreText = currentCount > 5 ? `\n*...and ${currentCount - 5} more roles*` : '';

      const embed = {
        title: `🚨 ${companyName} Just Opened Summer 2027 Recruiting!`,
        description: [
          `**${currentCount} internship${currentCount > 1 ? 's' : ''}** just dropped${isNewOpening ? '' : ` (${newCount} new)`}`,
          '',
          sampleRoles,
          moreText,
        ].join('\n'),
        color: getColorForSector(sector),
        fields: [
          { name: 'Sector', value: sector, inline: true },
          { name: 'Source', value: companyPostings[0].source.charAt(0).toUpperCase() + companyPostings[0].source.slice(1), inline: true },
          { name: 'Total Roles', value: `${currentCount}`, inline: true },
        ],
        footer: { text: 'BankerBrief Internship Tracker' },
        timestamp: new Date().toISOString(),
      };

      try {
        await sendDiscordWebhook({
          content: '@everyone',
          username: 'BankerBrief Alerts',
          avatar_url: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
          allowed_mentions: { parse: ['everyone'] },
          embeds: [embed],
        });

        notifiedCompanies.add(notifKey);
        alerted.push(companyName);
        console.log(`[Discord] Alerted for ${companyName}: ${currentCount} postings`);
      } catch (err) {
        console.error(`[Discord] Failed to send alert for ${companyName}:`, err);
      }

      // Rate limit: Discord allows 30 requests per minute per webhook
      await sleep(500);
    } else {
      skipped.push(companySlug);
    }
  }

  return { alerted, skipped };
}

/**
 * Send a raw message to Discord webhook
 */
async function sendDiscordWebhook(payload: Record<string, unknown>): Promise<void> {
  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Discord webhook failed (${response.status}): ${text}`);
  }
}

/**
 * Send a simple text message to Discord
 */
export async function sendDiscordMessage(content: string): Promise<void> {
  await sendDiscordWebhook({
    username: 'BankerBrief Alerts',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
    content,
  });
}

function getColorForSector(sector: string): number {
  const colors: Record<string, number> = {
    Banking: 0x3B82F6,       // blue
    'Quant / HFT': 0x6366F1,  // indigo
    Consulting: 0xA855F7,    // purple
    'Asset Management': 0x10B981, // emerald
    Tech: 0x06B6D4,          // cyan
    Healthcare: 0xF43F5E,    // rose
    Consumer: 0xF59E0B,      // amber
    Industrial: 0xF97316,    // orange
    Energy: 0xEAB308,        // yellow
    Defense: 0x64748B,       // slate
  };
  return colors[sector] || 0x6B7280;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
