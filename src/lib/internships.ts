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
  source: 'greenhouse' | 'lever' | 'workday' | 'direct';
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
  { name: 'Morgan Stanley', slug: 'ms', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.morganstanley.com/careers/students-graduates' },
  { name: 'Bank of America', slug: 'bac', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://campus.bankofamerica.com/' },
  { name: 'Citigroup', slug: 'c', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://jobs.citi.com/students' },
  { name: 'Barclays', slug: 'barc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://search.jobs.barclays/students-and-graduates' },
  { name: 'Deutsche Bank', slug: 'db', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://careers.db.com/students-and-graduates/' },
  { name: 'UBS', slug: 'ubs', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.ubs.com/global/en/careers/graduates.html' },

  // ===== JAPANESE / REGIONAL BANKS =====
  { name: 'SMBC', slug: 'smbc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.smbcgroup.com/careers' },
  { name: 'Mizuho', slug: 'mizuho', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.mizuhoamericas.com/careers' },
  { name: 'MUFG', slug: 'mufg', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.mufgamericas.com/careers' },
  { name: 'Nomura', slug: 'nomura', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.nomura.com/careers/' },
  { name: 'BNP Paribas', slug: 'bnp', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://group.bnpparibas/en/careers/early-careers' },
  { name: 'HSBC', slug: 'hsbc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.hsbc.com/careers/students-and-graduates' },
  { name: 'Jefferies', slug: 'jef', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.jefferies.com/careers/' },
  { name: 'RBC Capital Markets', slug: 'rbc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.rbccm.com/en/careers/students.page' },
  { name: 'Wells Fargo', slug: 'wfc', sector: 'Banking', ats: { type: 'direct' }, careerUrl: 'https://www.wellsfargojobs.com/en/university-programs/' },

  // ===== CONSULTING =====
  { name: 'McKinsey & Company', slug: 'mckinsey', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.mckinsey.com/careers/search-jobs?query=intern' },
  { name: 'BCG', slug: 'bcg', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://careers.bcg.com/students' },
  { name: 'Bain & Company', slug: 'bain', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.bain.com/careers/find-a-role/internship/' },
  { name: 'Oliver Wyman', slug: 'ow', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.oliverwyman.com/careers/students.html' },
  { name: 'Deloitte', slug: 'deloitte', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www2.deloitte.com/us/en/careers/students.html' },
  { name: 'PwC', slug: 'pwc', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.pwc.com/us/en/careers/campus.html' },
  { name: 'EY', slug: 'ey', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.ey.com/en_us/careers/students' },
  { name: 'KPMG', slug: 'kpmg', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.kpmg.us/careers/students-and-graduates.html' },
  { name: 'Accenture', slug: 'acn', sector: 'Consulting', ats: { type: 'direct' }, careerUrl: 'https://www.accenture.com/us-en/careers/local/students' },

  // ===== ASSET MANAGEMENT =====
  { name: 'BlackRock', slug: 'blk', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://careers.blackrock.com/early-careers/' },
  { name: 'PGIM', slug: 'pgim', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.pgim.com/careers/students' },
  { name: 'Prudential Financial', slug: 'pru', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://prudential.wd5.myworkdayjobs.com/PrudentialCareers' },
  { name: 'Vanguard', slug: 'vang', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.vanguardjobs.com/students-and-recent-grads/' },
  { name: 'Fidelity Investments', slug: 'fid', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://jobs.fidelity.com/students/' },
  { name: 'PIMCO', slug: 'pimco', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.pimco.com/en-us/our-firm/careers/students' },
  { name: 'T. Rowe Price', slug: 'trow', sector: 'Asset Management', ats: { type: 'direct' }, careerUrl: 'https://www.troweprice.com/corporate/us/en/careers/students-and-early-careers.html' },
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
  { name: 'Pfizer', slug: 'pfe', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://www.pfizer.com/about/careers/internships' },
  { name: 'UnitedHealth Group', slug: 'unh', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://careers.unitedhealthgroup.com/early-careers/' },
  { name: 'Abbott', slug: 'abt', sector: 'Healthcare', ats: { type: 'direct' }, careerUrl: 'https://www.abbott.com/careers/students.html' },

  // ===== CONSUMER / INDUSTRIAL =====
  { name: 'Toyota', slug: 'toyota', sector: 'Industrial', ats: { type: 'direct' }, careerUrl: 'https://www.toyota.com/usa/careers/college' },
  { name: 'Procter & Gamble', slug: 'pg', sector: 'Consumer', ats: { type: 'direct' }, careerUrl: 'https://www.pgcareers.com/students' },
  { name: 'Coca-Cola', slug: 'ko', sector: 'Consumer', ats: { type: 'direct' }, careerUrl: 'https://careers.coca-colacompany.com/early-career' },
  { name: 'PepsiCo', slug: 'pep', sector: 'Consumer', ats: { type: 'direct' }, careerUrl: 'https://www.pepsicojobs.com/internships' },
  { name: 'ExxonMobil', slug: 'xom', sector: 'Energy', ats: { type: 'direct' }, careerUrl: 'https://corporate.exxonmobil.com/careers/university-students-and-graduates' },
  { name: 'Lockheed Martin', slug: 'lmt', sector: 'Defense', ats: { type: 'direct' }, careerUrl: 'https://www.lockheedmartinjobs.com/college-students' },
  { name: 'Boeing', slug: 'ba', sector: 'Defense', ats: { type: 'direct' }, careerUrl: 'https://jobs.boeing.com/entry-level' },
];

// ============================================================
// Internship keyword matching
// ============================================================

const INTERN_KEYWORDS = [
  'intern', 'internship', 'summer analyst', 'summer associate',
  'co-op', 'coop', 'early career', 'university', 'graduate program',
  'campus', 'student', 'rotational',
];

const YEAR_KEYWORDS = ['2027', '2026'];

function isInternshipRole(title: string, description?: string): boolean {
  const text = `${title} ${description || ''}`.toLowerCase();
  return INTERN_KEYWORDS.some(kw => text.includes(kw));
}

function isSummerTarget(title: string, description?: string): boolean {
  const text = `${title} ${description || ''}`.toLowerCase();
  // If it mentions the target year, or is just an internship (no year filter needed for active postings)
  return YEAR_KEYWORDS.some(y => text.includes(y)) || isInternshipRole(title, description);
}

// ============================================================
// Greenhouse API Fetcher (free, no auth)
// ============================================================

async function fetchGreenhouseInternships(company: CompanyEntry): Promise<InternshipPosting[]> {
  const config = company.ats as GreenhouseConfig;
  try {
    const url = `https://boards-api.greenhouse.io/v1/boards/${config.boardToken}/jobs`;
    const response = await fetch(url, {
      next: { revalidate: 43200 },
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
        isInternshipRole(job.title, job.content)
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
      next: { revalidate: 43200 },
      headers: { 'User-Agent': 'BankerBrief/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`Lever API failed for ${company.name}: ${response.status}`);
      return [];
    }

    const jobs = await response.json();

    return (jobs as { id: string; text: string; categories: { location?: string; team?: string }; hostedUrl: string; createdAt: number; description?: string }[])
      .filter(job => isInternshipRole(job.text, job.description))
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
      next: { revalidate: 43200 },
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
// Main fetch function — aggregates all sources
// ============================================================

export async function fetchAllInternships(): Promise<InternshipPosting[]> {
  const allPostings: InternshipPosting[] = [];

  // Group companies by ATS type
  const greenhouseCompanies = COMPANIES.filter(c => c.ats.type === 'greenhouse');
  const leverCompanies = COMPANIES.filter(c => c.ats.type === 'lever');
  const workdayCompanies = COMPANIES.filter(c => c.ats.type === 'workday');
  const directCompanies = COMPANIES.filter(c => c.ats.type === 'direct');

  // Fetch from all API-backed sources in parallel
  const apiPromises = [
    ...greenhouseCompanies.map(c => fetchGreenhouseInternships(c)),
    ...leverCompanies.map(c => fetchLeverInternships(c)),
    ...workdayCompanies.map(c => fetchWorkdayInternships(c)),
  ];

  const results = await Promise.allSettled(apiPromises);

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.length > 0) {
      allPostings.push(...result.value);
    }
  }

  // Track which companies already have live postings
  const companiesWithLiveData = new Set(allPostings.map(p => p.companySlug));

  // Add direct link entries for companies without live data
  // This includes all "direct" ATS companies + any API companies that returned 0 results
  for (const company of directCompanies) {
    if (!companiesWithLiveData.has(company.slug)) {
      allPostings.push(generateDirectPosting(company));
    }
  }

  // Also add direct links for API companies that failed
  for (const company of [...greenhouseCompanies, ...leverCompanies, ...workdayCompanies]) {
    if (!companiesWithLiveData.has(company.slug)) {
      allPostings.push(generateDirectPosting(company));
    }
  }

  // Sort: live postings first (by date), then direct links alphabetically
  allPostings.sort((a, b) => {
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

  return allPostings;
}

// Export company list for use in UI (sector counts etc.)
export const COMPANY_LIST = COMPANIES;
export const SECTORS = [...new Set(COMPANIES.map(c => c.sector))];
