'use client';

import React, { useState, useEffect } from 'react';
import TickerRibbon from '@/components/TickerRibbon';
import KPICard from '@/components/KPICard';
import ArticleCard from '@/components/ArticleCard';
import EventRow from '@/components/EventRow';
import SectorTile from '@/components/SectorTile';
import FilterPills from '@/components/FilterPills';
import ChangeBadge from '@/components/ChangeBadge';
import ThemeToggle from '@/components/ThemeToggle';

// Fallback mock data (used if API fails)
import {
  tickerData as mockTicker,
  macroIndicators as mockMacro,
  marketInstruments as mockMarket,
  topReads as mockReads,
  upcomingEvents as mockEvents,
  earningsThisWeek as mockEarnings,
  sectorPulse as mockSectors,
  whatChanged as mockChanges,
  aiMarketSummary,
} from '@/lib/mockData';

interface BISPaper {
  id: number;
  title: string;
  url: string;
  publishedAt: string;
  abstract: string;
  aiSummary: string;
  marketImpact: string;
  category: string;
}

// Skeleton loader component
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-[var(--bb-border)] ${className}`}
      style={{ minHeight: '20px' }}
    />
  );
}

function KPICardSkeleton() {
  return (
    <div className="bb-card px-3 py-3 min-w-[150px] flex flex-col gap-2">
      <Skeleton className="w-16 h-3" />
      <Skeleton className="w-24 h-7" />
      <Skeleton className="w-full h-4" />
    </div>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    macro: typeof mockMacro;
    markets: typeof mockMarket;
    ticker: typeof mockTicker;
    topReads: typeof mockReads;
    upcomingEvents: typeof mockEvents;
    upcomingEarnings: typeof mockEarnings;
    sectorPulse: typeof mockSectors;
    bisPapers: BISPaper[];
    whatChanged: typeof mockChanges;
    aiMarketSummary: string;
    lastRefreshed: string;
    isLive: boolean;
  } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function fetchBriefing() {
      try {
        const res = await fetch('/api/briefing');
        const json = await res.json();

        // Adapt the API response to match our component props
        const adaptedMacro = json.macro?.length > 0
          ? json.macro.map((m: { name: string; slug: string; value: number | null; unit: string; change: number | null; direction: string; sparkline: number[]; nextRelease: string; category: string }) => ({
              name: m.name,
              slug: m.slug,
              value: m.value !== null ? String(m.value) : '—',
              unit: m.unit,
              change: m.change !== null ? (m.change > 0 ? `+${m.change}` : String(m.change)) : '—',
              direction: m.direction as 'up' | 'down' | 'flat',
              sparkline: m.sparkline,
              nextRelease: m.nextRelease,
              category: m.category,
            }))
          : mockMacro;

        const adaptedMarket = json.markets?.length > 0
          ? json.markets.map((m: { name: string; symbol: string; value: number | null; unit: string; changeAbs: number | null; changePct: number | null; direction: string; sparkline: number[]; assetClass: string; invertColor?: boolean }) => ({
              name: m.name,
              symbol: m.symbol,
              value: m.value !== null ? String(m.value) : '—',
              unit: m.unit,
              changeAbs: m.changeAbs !== null ? (m.changeAbs > 0 ? `+${m.changeAbs}` : String(m.changeAbs)) : '—',
              changePct: m.changePct !== null ? `${m.changePct > 0 ? '+' : ''}${m.changePct}%` : '—',
              direction: m.direction as 'up' | 'down' | 'flat',
              sparkline: m.sparkline,
              assetClass: m.assetClass,
              invertColor: m.invertColor,
            }))
          : mockMarket;

        const adaptedTicker = json.ticker?.length > 0
          ? json.ticker
          : mockTicker;

        const adaptedEvents = json.upcomingEvents?.length > 0
          ? json.upcomingEvents.map((e: { id: number; name: string; type: string; displayDate: string; daysUntil: number; impactLevel: string }) => ({
              id: e.id,
              name: e.name,
              type: e.type,
              date: e.displayDate,
              daysUntil: e.daysUntil,
              impactLevel: e.impactLevel,
            }))
          : mockEvents;

        const adaptedEarnings = json.upcomingEarnings?.length > 0
          ? json.upcomingEarnings.map((e: { company: string; ticker: string; displayDate: string; dayOfWeek: string; reportTime: string; epsEstimate: string }) => ({
              company: e.company,
              ticker: e.ticker,
              reportDate: e.displayDate,
              dayOfWeek: e.dayOfWeek,
              reportTime: e.reportTime,
              epsEstimate: e.epsEstimate,
            }))
          : mockEarnings;

        setData({
          macro: adaptedMacro,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          markets: adaptedMarket.every((m: any) => m.value === '—') ? mockMarket : adaptedMarket,
          ticker: adaptedTicker,
          topReads: json.topReads || mockReads,
          upcomingEvents: adaptedEvents,
          upcomingEarnings: adaptedEarnings,
          sectorPulse: json.sectorPulse || mockSectors,
          bisPapers: json.bisPapers || [],
          whatChanged: json.whatChanged || mockChanges,
          aiMarketSummary: json.marketSummary || aiMarketSummary,
          lastRefreshed: json.lastRefreshed || new Date().toISOString(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          isLive: (json.macro?.length > 0 && !adaptedMacro.every((m: any) => m.value === '—')) || (json.markets?.length > 0 && !adaptedMarket.every((m: any) => m.value === '—')),
        });
      } catch (err) {
        console.error('Failed to fetch briefing, using mock data:', err);
        setData({
          macro: mockMacro,
          markets: mockMarket,
          ticker: mockTicker,
          topReads: mockReads,
          upcomingEvents: mockEvents,
          upcomingEarnings: mockEarnings,
          sectorPulse: mockSectors,
          bisPapers: [],
          whatChanged: mockChanges,
          aiMarketSummary,
          lastRefreshed: new Date().toISOString(),
          isLive: false,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBriefing();
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const bisCategoryBg: Record<string, string> = {
    'Monetary Policy': 'bg-blue-600/20 text-blue-400',
    'Financial Stability': 'bg-red-600/20 text-red-400',
    'Banking Regulation': 'bg-purple-600/20 text-purple-400',
    'Digital Currencies': 'bg-cyan-600/20 text-cyan-400',
    'Global Trade': 'bg-green-600/20 text-green-400',
    'Risk Management': 'bg-orange-600/20 text-orange-400',
    'Research': 'bg-gray-600/20 text-gray-400',
  };

  const refreshTime = data?.lastRefreshed
    ? new Date(data.lastRefreshed).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
    : '—';

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen" style={{ background: 'var(--bb-bg)' }}>
      {/* ============================================ */}
      {/* STICKY HEADER                                */}
      {/* ============================================ */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--bb-bg)', borderBottom: '1px solid var(--bb-border)' }}>
        <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-bold tracking-tight" style={{ color: 'var(--bb-text-primary)' }}>
              Banker<span style={{ color: 'var(--bb-accent)' }}>Brief</span> (v2.0.1-test)
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--bb-accent)] text-white uppercase tracking-wider ml-1">
              Beta
            </span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles, companies, indicators..."
                className="w-full px-3 py-1.5 text-[13px] rounded-md border border-[var(--bb-border)] bg-[var(--bb-surface)] text-[var(--bb-text-primary)] placeholder:text-[var(--bb-text-tertiary)] focus:outline-none focus:border-[var(--bb-accent)] transition-colors"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--bb-text-tertiary)] text-[12px]">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {data?.isLive && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-[var(--bb-positive)]">
                <span className="pulse-live" /> Live Data
              </span>
            )}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button className="text-[13px] text-[var(--bb-text-secondary)] hover:text-[var(--bb-text-primary)] transition-colors cursor-pointer">
              ⚙ Settings
            </button>
          </div>
        </div>

        {/* Ticker Ribbon */}
        <TickerRibbon items={data?.ticker || mockTicker} />
      </header>

      {/* ============================================ */}
      {/* MAIN CONTENT AREA                            */}
      {/* ============================================ */}
      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Briefing Strip */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-[22px] font-bold" style={{ color: 'var(--bb-text-primary)' }}>
                  Daily Briefing
                </h1>
                {data?.isLive ? (
                  <>
                    <span className="pulse-live" />
                    <span className="text-[11px] text-[var(--bb-positive)] font-medium">Live</span>
                  </>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bb-warning)]/20 text-[var(--bb-warning)] font-medium">
                    Mock Data
                  </span>
                )}
              </div>
              <p className="text-[13px]" style={{ color: 'var(--bb-text-secondary)' }}>
                {todayStr}
              </p>
              {/* Daily Market Summary section */}
              <div className="mt-3 px-3 py-2 bg-[var(--bb-surface-hover)] border-l-2 border-[var(--bb-accent)] rounded-r-md max-w-3xl">
                <div className="flex items-center gap-1.5 mb-1 text-[var(--bb-accent)]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">⚡ AI Market Summary</span>
                </div>
                <p className="text-[13px] text-[var(--bb-text-primary)] leading-snug">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {loading ? <Skeleton className="w-full h-[52px]" /> : (data as any)?.aiMarketSummary || aiMarketSummary}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 self-start mt-1 md:mt-0">
              <FilterPills
                options={['All', 'IB', 'S&T', 'Corp Fin', 'Buy-Side', 'Student']}
                defaultSelected="All"
              />
            </div>
          </div>
        </section>

        {/* Macro & Markets Bar */}
        <section className="mb-6">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>📊 Macro Snapshot</span>
              <span className="text-[10px] text-[var(--bb-text-tertiary)]">
                {data?.isLive ? 'via FRED' : 'sample data'}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <KPICardSkeleton key={i} />)
                : (data?.macro || mockMacro).map((ind) => (
                    <KPICard key={ind.slug} data={ind} variant="macro" />
                  ))
              }
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>📈 Market Instruments</span>
              <span className="text-[10px] text-[var(--bb-text-tertiary)]">
                {data?.isLive ? 'delayed 15m' : 'sample data'}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <KPICardSkeleton key={i} />)
                : (data?.markets || mockMarket).map((inst) => (
                    <KPICard key={inst.symbol} data={inst} variant="market" />
                  ))
              }
            </div>
          </div>
        </section>

        {/* MAIN GRID: 8/4 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* AI Top 10 Reads */}
            <section className="bb-section">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>🏆 AI Top 10 Reads</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bb-accent-soft)] text-[var(--bb-accent)] font-medium">
                    GPT-4o curated
                  </span>
                </div>
                <a href="#" className="text-[12px] text-[var(--bb-accent)] hover:underline font-medium">
                  View All Reads →
                </a>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="py-4 border-b border-[var(--bb-border)]">
                      <Skeleton className="w-3/4 h-5 mb-2" />
                      <Skeleton className="w-1/3 h-3 mb-2" />
                      <Skeleton className="w-full h-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {(data?.topReads || mockReads).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </section>

            {/* Sector Pulse */}
            <section className="bb-section">
              <div className="flex items-center justify-between mb-4">
                <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>📊 Sector Pulse</span>
                <a href="#" className="text-[12px] text-[var(--bb-accent)] hover:underline font-medium">View Sector Details →</a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(data?.sectorPulse || mockSectors).map((sector) => (
                  <SectorTile key={sector.slug} sector={sector} />
                ))}
              </div>
            </section>

            {/* BIS Research Intelligence */}
            <section className="bb-section">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>🏛️ BIS Research Intelligence</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bb-accent-soft)] text-[var(--bb-accent)] font-medium">
                    GPT-4o analyzed
                  </span>
                </div>
                <a href="https://www.bis.org/research/index.htm" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[var(--bb-accent)] hover:underline font-medium">BIS.org →</a>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="py-4 border-b border-[var(--bb-border)]">
                      <Skeleton className="w-3/4 h-5 mb-2" />
                      <Skeleton className="w-full h-4 mb-1" />
                      <Skeleton className="w-2/3 h-4" />
                    </div>
                  ))}
                </div>
              ) : (data?.bisPapers && data.bisPapers.length > 0) ? (
                <div className="space-y-0">
                  {data.bisPapers.map((paper) => (
                    <div key={paper.id} className="py-3.5 border-b border-[var(--bb-border-subtle)] last:border-b-0">
                      <div className="flex items-start gap-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5 ${bisCategoryBg[paper.category] || bisCategoryBg['Research']}`}>
                          {paper.category}
                        </span>
                        <div className="flex-1 min-w-0">
                          <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-[var(--bb-text-primary)] hover:text-[var(--bb-accent)] transition-colors leading-snug block">
                            {paper.title}
                          </a>
                          <p className="text-[12px] text-[var(--bb-text-secondary)] mt-1.5 leading-relaxed">
                            {paper.aiSummary}
                          </p>
                          <div className="mt-2 px-2.5 py-1.5 bg-[var(--bb-surface-hover)] rounded border-l-2 border-[var(--bb-warning)]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--bb-warning)]">Market Impact </span>
                            <p className="text-[11px] text-[var(--bb-text-primary)] mt-0.5 leading-snug">{paper.marketImpact}</p>
                          </div>
                          <span className="text-[10px] text-[var(--bb-text-tertiary)] mt-1.5 block">
                            {new Date(paper.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[13px] text-[var(--bb-text-tertiary)] py-4 text-center">
                  BIS research feed loading... Papers will appear once connected.
                </div>
              )}
            </section>
          </div>

          {/* RIGHT RAIL (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bb-section lg:sticky lg:top-[100px]" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <div className="space-y-6">
                {/* Events */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>📅 Upcoming Events</span>
                    <a href="#" className="text-[11px] text-[var(--bb-accent)] hover:underline font-medium">Full Cal →</a>
                  </div>
                  {loading ? (
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="w-full h-8" />)}
                    </div>
                  ) : (
                    <div>
                      {(data?.upcomingEvents || mockEvents).slice(0, 7).map((event) => (
                        <EventRow key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="bb-divider" />

                {/* Earnings This Week */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>💰 Earnings</span>
                    <a href="#" className="text-[11px] text-[var(--bb-accent)] hover:underline font-medium">Full Cal →</a>
                  </div>
                  <div className="space-y-0">
                    {(data?.upcomingEarnings || mockEarnings).slice(0, 8).map((earning) => (
                      <div key={earning.ticker} className="flex items-center gap-3 py-2 border-b border-[var(--bb-border-subtle)] last:border-b-0">
                        <span className="text-[12px] font-mono font-bold text-[var(--bb-accent)] w-[48px]">{earning.ticker}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[12px] text-[var(--bb-text-primary)] font-medium truncate block">{earning.company}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[11px] text-[var(--bb-text-tertiary)]">
                            {earning.dayOfWeek} · {earning.reportTime === 'before_market' ? 'Pre' : 'Post'}
                          </div>
                          <div className="text-[11px] font-mono text-[var(--bb-text-secondary)]">Est: {earning.epsEstimate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bb-divider" />

                {/* What Changed */}
                <div>
                  <div className="flex items-center mb-3">
                    <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>🔄 What Changed</span>
                    <span className="ml-2 text-[10px] text-[var(--bb-text-tertiary)]">Since Yesterday</span>
                  </div>
                  <div className="space-y-2.5">
                    {(data?.whatChanged || mockChanges).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ChangeBadge change="" direction={item.direction} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-[var(--bb-text-primary)]">{item.item}</div>
                          <div className="text-[11px] text-[var(--bb-text-secondary)]">{item.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bb-divider" />

                {/* Watchlist */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>⭐ My Watchlist</span>
                    <a href="#" className="text-[11px] text-[var(--bb-accent)] hover:underline font-medium">Manage →</a>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'AAPL', newCount: 2, change: 'Earnings upcoming — 2 new articles' },
                      { name: '10Y UST', newCount: 0, change: data?.isLive ? `${(data.markets.find((m: {symbol: string}) => m.symbol === '^TNX') as {value: string} | undefined)?.value || '—'}% today` : '4.42% (+8bp today)' },
                      { name: 'FOMC', newCount: 4, change: 'Next decision upcoming — 4 articles' },
                      { name: 'AI / LLMs', newCount: 3, change: 'OpenAI funding round — 3 articles' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-2.5 py-2 px-2 -mx-2 rounded hover:bg-[var(--bb-surface-hover)] cursor-pointer transition-colors">
                        <span className="text-[12px] font-bold text-[var(--bb-accent)] w-[80px] truncate font-mono">{item.name}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] text-[var(--bb-text-secondary)] block truncate">{item.change}</span>
                        </div>
                        {item.newCount > 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--bb-accent)] text-white min-w-[18px] text-center">{item.newCount}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--bb-border)] mt-12">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-[11px] text-[var(--bb-text-tertiary)]">
            Data: FRED · Yahoo Finance · BLS · BEA · Treasury · RSS · OpenAI
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[var(--bb-text-tertiary)]">
            <span>Last refreshed: {refreshTime}</span>
            <span>·</span>
            <span>{data?.isLive ? '🟢 Live' : '🟡 Mock'}</span>
            <span>·</span>
            <span className="text-[var(--bb-text-secondary)]">© 2025 BankerBrief</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
