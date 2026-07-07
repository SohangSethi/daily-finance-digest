// ============================================================
// Summer 2027 Internship Tracker
// Aggregates internship postings from company career sites
// Sources: Greenhouse API, Lever API, Workday CXS API, Direct links
// ============================================================

export interface InternshipPosting {
  id: string;
  company: string;
  companySlug: string;
  sector: string;
  title: string;
  location: string;
  url: string;
  postedDate: string | null;
  deadline: string | null;
  source: 'greenhouse' | 'lever' | 'workday' | 'github' | 'direct';
  status: 'open' | 'coming_soon';
}

// ============================================================
// Company Registry — 50+ companies organized by sector & ATS
// ============================================================

interface GreenhouseConfig { type: 'greenhouse'; boardToken: string }
interface LeverConfig { type: 'lever'; companySlug: string }
interface WorkdayConfig { type: 'workday'; tenant: string; wdVersion: string; site: string }
interface DirectConfig { type: 'direct' }

type ATSConfig = GreenhouseConfig | LeverConfig | WorkdayConfig | DirectConfig;

interface CompanyEntry {
  name: string;
  slug: string;
  sector: string;
  ats: ATSConfig;
  careerUrl: string; // Always available as fallback / direct link
}

const COMPANIES: CompanyEntry[] = [
  // ===== BULGE BRACKET BANKS =====
  { name: 'Goldman Sachs', slug: 'gs', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.goldmansachs.com/careers/students/' },
  { name: 'JPMorgan Chase', slug: 'jpm', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://careers.jpmorgan.com/us/en/students/programs' },
  { name: 'Morgan Stanley', slug: 'ms', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.morganstanley.com/people/students-graduates' },
  { name: 'Bank of America', slug: 'bac', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://campus.bankofamerica.com/' },
  { name: 'Citigroup', slug: 'c', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://jobs.citi.com/early-careers' },
  { name: 'Barclays', slug: 'barc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://home.barclays/careers/' },
  { name: 'Deutsche Bank', slug: 'db', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://careers.db.com/' },
  { name: 'UBS', slug: 'ubs', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.ubs.com/global/en/careers.html' },

  // ===== JAPANESE / REGIONAL BANKS =====
  { name: 'SMBC', slug: 'smbc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.smbcgroup.com/careers' },
  { name: 'Mizuho', slug: 'mizuho', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.mizuhoamericas.com/careers' },
  { name: 'MUFG', slug: 'mufg', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.mufgamericas.com/careers' },
  { name: 'Nomura', slug: 'nomura', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.nomura.com/careers/' },
  { name: 'BNP Paribas', slug: 'bnp', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://group.bnpparibas/en/careers' },
  { name: 'HSBC', slug: 'hsbc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.hsbc.com/careers/students-and-graduates' },
  { name: 'Jefferies', slug: 'jef', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.jefferies.com/careers/' },
  { name: 'RBC Capital Markets', slug: 'rbc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://jobs.rbc.com/' },
  { name: 'Wells Fargo', slug: 'wfc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.wellsfargojobs.com/en/university-programs/' },

  // ===== CONSULTING =====
  { name: 'McKinsey & Company', slug: 'mckinsey', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.mckinsey.com/careers/search-jobs?query=intern' },
  { name: 'BCG', slug: 'bcg', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://careers.bcg.com/students' },
  { name: 'Bain & Company', slug: 'bain', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.bain.com/careers/' },
  { name: 'Oliver Wyman', slug: 'ow', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.oliverwyman.com/careers/students.html' },
  { name: 'Deloitte', slug: 'deloitte', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www2.deloitte.com/us/en/careers/students.html' },
  { name: 'PwC', slug: 'pwc', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.pwc.com/us/en/careers/campus.html' },
  { name: 'EY', slug: 'ey', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://careers.ey.com/' },
  { name: 'KPMG', slug: 'kpmg', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://kpmg.com/us/en/home/careers.html' },
  { name: 'Accenture', slug: 'acn', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.accenture.com/us-en/careers/local/students' },

  // ===== ASSET MANAGEMENT =====
  { name: 'BlackRock', slug: 'blk', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://careers.blackrock.com/early-careers/' },
  { name: 'PGIM', slug: 'pgim', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://jobs.prudential.com/pgim/' },
  { name: 'Prudential Financial', slug: 'pru', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://jobs.prudential.com/' },
  { name: 'Vanguard', slug: 'vang', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.vanguardjobs.com/' },
  { name: 'Fidelity Investments', slug: 'fid', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://jobs.fidelity.com/students/' },
  { name: 'PIMCO', slug: 'pimco', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.pimco.com/en-us/our-firm/careers/students' },
  { name: 'T. Rowe Price', slug: 'trow', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://careers.troweprice.com/' },
  { name: 'State Street', slug: 'stt', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://careers.statestreet.com/students/' },
  { name: 'Citadel', slug: 'citadel', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.citadel.com/careers/open-opportunities/' },
  { name: 'Two Sigma', slug: 'twosigma', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.twosigma.com/careers/' },

  // ===== TECH =====
  { name: 'NVIDIA', slug: 'nvidia', sector: 'Tech', ats: { type: 'workday', tenant: 'nvidia', wdVersion: 'wd5', site: 'NVIDIAExternalCareerSite' }, careerUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite' },
  { name: 'Apple', slug: 'apple', sector: 'Tech', ats: { type: 'direct' }, careerUrl: 'https://jobs.apple.com/en-us/search?search=intern' },
  { name: 'Google', slug: 'google', sector: 'Tech', ats: { type: 'direct' }, careerUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=intern&employment_type=INTERN' },
  { name: 'Microsoft', slug: 'msft', sector: 'Tech', ats: { type: 'direct' }, careerUrl: 'https://careers.microsoft.com/v2/global/en/programs/students.html' },
  { name: 'Amazon', slug: 'amzn', sector: 'Tech', ats: { type: 'direct' }, careerUrl: 'https://www.amazon.jobs/en/teams/internships-for-students' },
  { name: 'Meta', slug: 'meta', sector: 'Tech', ats: { type: 'direct' }, careerUrl: 'https://www.metacareers.com/jobs?q=intern' },
  { name: 'Stripe', slug: 'stripe', sector: 'Tech', ats: { type: 'greenhouse', boardToken: 'stripe' }, careerUrl: 'https://stripe.com/jobs/search?query=intern' },
  { name: 'Coinbase', slug: 'coinbase', sector: 'Tech', ats: { type: 'greenhouse', boardToken: 'coinbase' }, careerUrl: 'https://www.coinbase.com/careers' },
  { name: 'Anthropic', slug: 'anthropic', sector: 'Tech', ats: { type: 'greenhouse', boardToken: 'anthropic' }, careerUrl: 'https://www.anthropic.com/careers' },
  { name: 'Cloudflare', slug: 'cloudflare', sector: 'Tech', ats: { type: 'greenhouse', boardToken: 'cloudflare' }, careerUrl: 'https://www.cloudflare.com/careers/' },
  { name: 'Databricks', slug: 'databricks', sector: 'Tech', ats: { type: 'greenhouse', boardToken: 'databricks' }, careerUrl: 'https://www.databricks.com/company/careers' },
  { name: 'Figma', slug: 'figma', sector: 'Tech', ats: { type: 'greenhouse', boardToken: 'figma' }, careerUrl: 'https://www.figma.com/careers/' },
  { name: 'SpaceX', slug: 'spacex', sector: 'Tech', ats: { type: 'direct' }, careerUrl: 'https://www.spacex.com/careers/' },

  // ===== HEALTHCARE =====
  { name: 'Johnson & Johnson', slug: 'jnj', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://www.careers.jnj.com/students' },
  { name: 'Pfizer', slug: 'pfe', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://careers.pfizer.com/' },
  { name: 'UnitedHealth Group', slug: 'unh', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://careers.unitedhealthgroup.com/' },
  { name: 'Abbott', slug: 'abt', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://www.abbott.com/careers/students.html' },

  // ===== CONSUMER / INDUSTRIAL =====
  { name: 'Toyota', slug: 'toyota', sector: 'Industrial', ats: { type: 'direct' }, careerUrl: 'https://careers.toyota.com/us/en' },
  { name: 'Procter & Gamble', slug: 'pg', sector: 'Consumer', ats: { type: 'direct' }, careerUrl: 'https://www.pgcareers.com/students' },
  { name: 'Coca-Cola', slug: 'ko', sector: 'Consumer', ats: { type: 'direct' }, careerUrl: 'https://careers.coca-colacompany.com/early-career' },
  { name: 'PepsiCo', slug: 'pep', sector: 'Consumer', ats: { type: 'direct' }, careerUrl: 'https://www.pepsicojobs.com/internships' },
  { name: 'ExxonMobil', slug: 'xom', sector: 'Energy', ats: { type: 'direct' }, careerUrl: 'https://corporate.exxonmobil.com/careers' },
  { name: 'Lockheed Martin', slug: 'lmt', sector: 'Defense', ats: { type: 'direct' }, careerUrl: 'https://www.lockheedmartinjobs.com/college-students' },
  { name: 'Boeing', slug: 'ba', sector: 'Defense', ats: { type: 'direct' }, careerUrl: 'https://jobs.boeing.com/entry-level' },
];

// ============================================================
// Internship keyword matching — STRICT, title-only
// Only matches roles that are clearly internships / co-ops
// ============================================================

// These patterns match on the job TITLE only — must be unambiguously intern roles
const INTERN_TITLE_PATTERNS = [
  /\bintern\b/i,
  /\binternship\b/i,
  /\bsummer\s+analyst\b/i,
  /\bsummer\s+associate\b/i,
  /\bsummer\s+\d{4}\b/i,          // "Summer 2027"
  /\bco-?op\b/i,                   // "co-op" or "coop"
  /\brotational\s+analyst\b/i,
  /\bsummer\s+program\b/i,
];

// Negative patterns — roles to EXCLUDE even if they match above
const EXCLUDE_PATTERNS = [
  /\bsenior\b/i,
  /\bstaff\b/i,
  /\bprincipal\b/i,
  /\bdirector\b/i,
  /\bmanager\b/i,
  /\bvp\b/i,
  /\blead\b/i,
  /\bhead\s+of\b/i,
];

function isInternshipRole(title: string): boolean {
  // Must match at least one intern pattern
  const matchesIntern = INTERN_TITLE_PATTERNS.some(p => p.test(title));
  if (!matchesIntern) return false;

  // Must NOT match any exclusion pattern
  const matchesExclude = EXCLUDE_PATTERNS.some(p => p.test(title));
  return !matchesExclude;
}

// ============================================================
// Greenhouse API Fetcher (free, no auth)
// ============================================================

async function fetchGreenhouseInternships(company: CompanyEntry): Promise<InternshipPosting[]> {
  const config = company.ats as GreenhouseConfig;
  try {
    const url = `https://boards-api.greenhouse.io/v1/boards/${config.boardToken}/jobs`;
    const response = await fetch(url, {
      next: { revalidate: 10800 },
      headers: { 'User-Agent': 'BankerBrief/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`Greenhouse API failed for ${company.name}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || [];

    return jobs
      .filter((job: { title: string; content?: string }) =>
        isInternshipRole(job.title)
      )
      .slice(0, 20)
      .map((job: { id: number; title: string; location: { name: string }; absolute_url: string; updated_at: string; content?: string }) => ({
        id: `gh-${company.slug}-${job.id}`,
        company: company.name,
        companySlug: company.slug,
        sector: company.sector,
        title: job.title,
        location: job.location?.name || 'Multiple Locations',
        url: job.absolute_url,
        postedDate: job.updated_at ? new Date(job.updated_at).toISOString() : null,
        deadline: null,
        source: 'greenhouse' as const,
        status: 'open' as const,
      }));
  } catch (error) {
    console.warn(`Greenhouse fetch error for ${company.name}:`, error);
    return [];
  }
}

// ============================================================
// Lever API Fetcher (free, no auth)
// ============================================================

async function fetchLeverInternships(company: CompanyEntry): Promise<InternshipPosting[]> {
  const config = company.ats as LeverConfig;
  try {
    const url = `https://api.lever.co/v0/postings/${config.companySlug}?mode=json`;
    const response = await fetch(url, {
      next: { revalidate: 10800 },
      headers: { 'User-Agent': 'BankerBrief/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`Lever API failed for ${company.name}: ${response.status}`);
      return [];
    }

    const jobs = await response.json();

    return (jobs as { id: string; text: string; categories: { location?: string; team?: string }; hostedUrl: string; createdAt: number; description?: string }[])
      .filter(job => isInternshipRole(job.text))
      .slice(0, 20)
      .map(job => ({
        id: `lv-${company.slug}-${job.id}`,
        company: company.name,
        companySlug: company.slug,
        sector: company.sector,
        title: job.text,
        location: job.categories?.location || 'Multiple Locations',
        url: job.hostedUrl,
        postedDate: job.createdAt ? new Date(job.createdAt).toISOString() : null,
        deadline: null,
        source: 'lever' as const,
        status: 'open' as const,
      }));
  } catch (error) {
    console.warn(`Lever fetch error for ${company.name}:`, error);
    return [];
  }
}

// ============================================================
// Workday CXS API Fetcher (undocumented, may break)
// ============================================================

async function fetchWorkdayInternships(company: CompanyEntry): Promise<InternshipPosting[]> {
  const config = company.ats as WorkdayConfig;
  try {
    const baseUrl = `https://${config.tenant}.${config.wdVersion}.myworkdayjobs.com`;
    const apiUrl = `${baseUrl}/wday/cxs/${config.tenant}/${config.site}/jobs`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      next: { revalidate: 10800 },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'BankerBrief/1.0',
      },
      body: JSON.stringify({
        appliedFacets: {},
        limit: 20,
        offset: 0,
        searchText: 'intern summer 2027',
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`Workday API failed for ${company.name}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const postings = data.jobPostings || [];

    return postings
      .filter((job: { title: string }) => isInternshipRole(job.title))
      .slice(0, 20)
      .map((job: { bulletFields: string[]; title: string; locationsText?: string; externalPath: string; postedOn?: string }) => ({
        id: `wd-${company.slug}-${job.bulletFields?.[0] || Math.random().toString(36).slice(2)}`,
        company: company.name,
        companySlug: company.slug,
        sector: company.sector,
        title: job.title,
        location: job.locationsText || 'Multiple Locations',
        url: `${baseUrl}${job.externalPath}`,
        postedDate: job.postedOn ? new Date(job.postedOn).toISOString() : null,
        deadline: null,
        source: 'workday' as const,
        status: 'open' as const,
      }));
  } catch (error) {
    console.warn(`Workday fetch error for ${company.name}:`, error);
    return [];
  }
}


// ============================================================
// Direct link generator (for companies with custom ATS)
// ============================================================

function generateDirectPosting(company: CompanyEntry): InternshipPosting {
  return {
    id: `direct-${company.slug}`,
    company: company.name,
    companySlug: company.slug,
    sector: company.sector,
    title: `Summer 2027 Internship Programs — ${company.name}`,
    location: 'See career page',
    url: company.careerUrl,
    postedDate: null,
    deadline: null,
    source: 'direct',
    status: 'open',
  };
}

// ============================================================
// GitHub Repo Parsers — Community-maintained internship lists
// These repos are updated daily and contain banking, quant,
// consulting, and tech roles with direct apply links.
// ============================================================

interface GitHubRepoSource {
  name: string;
  url: string;  // Raw GitHub URL for the markdown file
  sourceLabel: string;
}

const GITHUB_REPOS: GitHubRepoSource[] = [
  {
    name: 'sndsh404/summer-2027-internships',
    url: 'https://raw.githubusercontent.com/sndsh404/summer-2027-internships/main/README.md',
    sourceLabel: 'sndsh404',
  },
  {
    name: 'speedyapply/2027-SWE-College-Jobs',
    url: 'https://raw.githubusercontent.com/speedyapply/2027-SWE-College-Jobs/main/README.md',
    sourceLabel: 'speedyapply',
  },
];

// Sector detection for GitHub-sourced postings based on company name + role
const SECTOR_RULES: { pattern: RegExp; sector: string }[] = [
  // Banks
  { pattern: /\b(Goldman\s*Sachs|JPMorgan|JP\s*Morgan|Morgan\s*Stanley|Bank\s*of\s*America|Citigroup|Citi\b|Barclays|Deutsche\s*Bank|UBS|HSBC|BNP|Credit\s*Suisse|Wells\s*Fargo|SMBC|Mizuho|MUFG|Nomura|Jefferies|RBC|Lazard|Evercore|Moelis|PJT|Greenhill|Centerview|Perella|Houlihan|Piper\s*Sandler|Stifel|Raymond\s*James|Truist|KeyBanc|Cowen|TD\s*Securities|Scotiabank|BMO|CIBC)/i, sector: 'Banking' },
  // Quant / HFT / Hedge Funds
  { pattern: /\b(Citadel|Two\s*Sigma|Jane\s*Street|DE\s*Shaw|D\.E\.\s*Shaw|Renaissance|Point72|Bridgewater|AQR|Millennium|Balyasny|Hudson\s*River|Jump\s*Trading|Tower\s*Research|Virtu|Optiver|IMC\s*Trading|Akuna|DRW|Susquehanna|SIG\b|Five\s*Rings|HRT|Old\s*Mission|Voleon|Voloridge|Arrowstreet|Man\s*Group|Winton|Squarepoint|Cubist|WorldQuant|Aquatic|Radix|Flow\s*Traders|Maven|XTX)/i, sector: 'Quant / HFT' },
  // Consulting
  { pattern: /\b(McKinsey|BCG|Bain\b|Deloitte|PwC|EY\b|KPMG|Accenture|Oliver\s*Wyman|Booz|Roland\s*Berger|A\.T\.\s*Kearney|Strategy&|LEK|Simon-Kucher|ZS\s*Associates|Alvarez)/i, sector: 'Consulting' },
  // Asset Management / PE / VC
  { pattern: /\b(BlackRock|PGIM|Prudential|Vanguard|Fidelity|PIMCO|T\.\s*Rowe|State\s*Street|Capital\s*Group|Wellington|Invesco|Franklin\s*Templeton|KKR|Blackstone|Apollo|Carlyle|TPG|Warburg|Bain\s*Capital|Advent|Ares|StepStone|Affinius)/i, sector: 'Asset Management' },
  // Tech
  { pattern: /\b(Google|Microsoft|Amazon|Meta|Apple|NVIDIA|Netflix|Stripe|Coinbase|Anthropic|OpenAI|Cloudflare|Databricks|Figma|SpaceX|Tesla|Uber|Lyft|Airbnb|DoorDash|Snap|Pinterest|Salesforce|Adobe|Oracle|SAP|IBM|Intel|AMD|Qualcomm|Broadcom|Palantir|Snowflake|Datadog|MongoDB|Elastic|Twilio|Block|Square|Robinhood|Plaid|Ramp|Brex|Rippling|ByteDance|TikTok)/i, sector: 'Tech' },
  // Healthcare / Pharma
  { pattern: /\b(Johnson\s*&\s*Johnson|J&J|Pfizer|UnitedHealth|Abbott|Merck|AbbVie|Amgen|Gilead|Bristol-Myers|Eli\s*Lilly|Medtronic|Stryker|Baxter|Medpace)/i, sector: 'Healthcare' },
  // Defense / Aero
  { pattern: /\b(Lockheed|Boeing|Raytheon|Northrop|General\s*Dynamics|L3Harris|BAE|Blue\s*Origin|SpaceX|GE\s*Aerospace|GE\s*Aviation)/i, sector: 'Defense' },
  // Energy
  { pattern: /\b(ExxonMobil|Chevron|Shell|BP\b|ConocoPhillips|Schlumberger|Halliburton|Baker\s*Hughes|Solar\s*Turbines)/i, sector: 'Energy' },
  // Consumer
  { pattern: /\b(Procter|P&G|Coca-Cola|PepsiCo|Unilever|Nike|Walmart|Target|Costco|Home\s*Depot|Mars|Nestle|Colgate)/i, sector: 'Consumer' },
  // Industrial
  { pattern: /\b(Toyota|Ford|GM\b|General\s*Motors|Caterpillar|John\s*Deere|3M|Honeywell|Siemens|GE\s*Appliances|TSMC|Delta\s*Air)/i, sector: 'Industrial' },
];

function detectSector(company: string, role: string): string {
  const text = `${company} ${role}`;
  for (const rule of SECTOR_RULES) {
    if (rule.pattern.test(text)) return rule.sector;
  }
  // Fallback: check role keywords
  if (/\b(quant|trading|trader)\b/i.test(role)) return 'Quant / HFT';
  if (/\b(investment\s*bank|IBD|M&A|capital\s*markets|S&T|sales\s*&\s*trading)\b/i.test(role)) return 'Banking';
  if (/\b(consult)/i.test(role)) return 'Consulting';
  return 'Tech'; // default
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Parse a markdown table from a GitHub repo README into InternshipPostings.
 * Expects format: | Company | Role | Location | Apply | Added |
 */
function parseMarkdownTable(markdown: string, sourceLabel: string): InternshipPosting[] {
  const postings: InternshipPosting[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    // Skip non-table lines and header/separator rows
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map(c => c.trim()).filter(c => c.length > 0);
    if (cells.length < 4) continue;
    // Skip header rows
    if (cells[0] === 'Company' || cells[0].startsWith('---')) continue;
    if (cells[1]?.startsWith('---')) continue;

    const company = cells[0].replace(/🔒|🛂|🇺🇸/g, '').trim();
    const role = cells[1]?.replace(/🔒|🛂|🇺🇸/g, '').trim() || '';
    const location = cells[2]?.trim() || 'See listing';

    // Extract URL from markdown link [text](url) in the Apply column
    const applyCell = cells[3] || '';
    const urlMatch = applyCell.match(/\[.*?\]\((https?:\/\/[^)]+)\)/);
    const url = urlMatch ? urlMatch[1] : '';

    // Skip closed roles (🔒 in the apply column means closed)
    if (applyCell.includes('🔒') || !url) continue;

    const addedDate = cells[4]?.trim() || null;

    const sector = detectSector(company, role);
    const slug = slugify(company);

    postings.push({
      id: `gh-${sourceLabel}-${slug}-${slugify(role)}`,
      company,
      companySlug: slug,
      sector,
      title: role,
      location,
      url,
      postedDate: addedDate && /^\d{4}-\d{2}-\d{2}$/.test(addedDate) ? new Date(addedDate).toISOString() : null,
      deadline: null,
      source: 'github' as InternshipPosting['source'],
      status: 'open',
    });
  }

  return postings;
}

/**
 * Fetch and parse a GitHub repo's markdown internship list
 */
async function fetchGitHubRepoInternships(repo: GitHubRepoSource): Promise<InternshipPosting[]> {
  try {
    const response = await fetch(repo.url, {
      next: { revalidate: 10800 },
      headers: { 'User-Agent': 'BankerBrief/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`GitHub repo fetch failed for ${repo.name}: ${response.status}`);
      return [];
    }

    const markdown = await response.text();
    const postings = parseMarkdownTable(markdown, repo.sourceLabel);
    console.log(`[GitHub] Parsed ${postings.length} postings from ${repo.name}`);
    return postings;
  } catch (error) {
    console.warn(`GitHub repo error for ${repo.name}:`, error);
    return [];
  }
}

// ============================================================
// Main fetch function — aggregates all sources
// ============================================================

export async function fetchAllInternships(): Promise<InternshipPosting[]> {
  const allPostings: InternshipPosting[] = [];

  // Group companies by ATS type
  const greenhouseCompanies = COMPANIES.filter(c => c.ats.type === 'greenhouse');
  const leverCompanies = COMPANIES.filter(c => c.ats.type === 'lever');
  const workdayCompanies = COMPANIES.filter(c => c.ats.type === 'workday');
  const directCompanies = COMPANIES.filter(c => c.ats.type === 'direct');

  // Fetch from all API-backed sources + GitHub repos in parallel
  const apiPromises = [
    ...greenhouseCompanies.map(c => fetchGreenhouseInternships(c)),
    ...leverCompanies.map(c => fetchLeverInternships(c)),
    ...workdayCompanies.map(c => fetchWorkdayInternships(c)),
    ...GITHUB_REPOS.map(r => fetchGitHubRepoInternships(r)),
  ];

  const results = await Promise.allSettled(apiPromises);

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.length > 0) {
      allPostings.push(...result.value);
    }
  }

  // Deduplicate: if a company has both GitHub-sourced and ATS-sourced postings,
  // keep both but dedupe by URL
  const seenUrls = new Set<string>();
  const deduped: InternshipPosting[] = [];
  for (const posting of allPostings) {
    if (!seenUrls.has(posting.url)) {
      seenUrls.add(posting.url);
      deduped.push(posting);
    }
  }

  // Track which companies already have live postings
  const companiesWithLiveData = new Set(deduped.map(p => p.companySlug));

  // Add direct link entries for companies without live data
  for (const company of directCompanies) {
    if (!companiesWithLiveData.has(company.slug)) {
      deduped.push(generateDirectPosting(company));
    }
  }

  // Also add direct links for API companies that failed
  for (const company of [...greenhouseCompanies, ...leverCompanies, ...workdayCompanies]) {
    if (!companiesWithLiveData.has(company.slug)) {
      deduped.push(generateDirectPosting(company));
    }
  }

  // Sort: live postings first (by date), then direct links alphabetically
  deduped.sort((a, b) => {
    // Live postings before direct links
    if (a.source !== 'direct' && b.source === 'direct') return -1;
    if (a.source === 'direct' && b.source !== 'direct') return 1;

    // Among live postings, sort by date (newest first)
    if (a.source !== 'direct' && b.source !== 'direct') {
      const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
      return dateB - dateA;
    }

    // Among direct links, sort by company name
    return a.company.localeCompare(b.company);
  });

  return deduped;
}

// Export company list for use in UI (sector counts etc.)
export const COMPANY_LIST = COMPANIES;
export const SECTORS = [...new Set(COMPANIES.map(c => c.sector))];
