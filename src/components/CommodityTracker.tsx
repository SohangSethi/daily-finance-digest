'use client';

import React, { useState } from 'react';
import Sparkline from './Sparkline';
import type { TrackedInstrument } from '@/lib/mockData';

interface CommodityTrackerProps {
  instruments: TrackedInstrument[];
}

const signalColors: Record<string, { text: string; bg: string }> = {
  'Strong Buy': { text: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  'Buy': { text: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
  'Hold': { text: '#94A3B8', bg: 'rgba(148,163,184,0.12)' },
  'Sell': { text: '#F87171', bg: 'rgba(248,113,113,0.12)' },
  'Strong Sell': { text: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
};

function RSIBadge({ rsi }: { rsi: number }) {
  let color = 'var(--bb-text-secondary)';
  let label = '';
  if (rsi >= 70) { color = 'var(--bb-negative)'; label = 'Overbought'; }
  else if (rsi <= 30) { color = 'var(--bb-positive)'; label = 'Oversold'; }
  return (
    <div className="flex items-center gap-1">
      <span className="text-[12px] font-mono font-bold" style={{ color }}>{rsi}</span>
      {label && <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color }}>{label}</span>}
    </div>
  );
}

function MomentumBar({ score }: { score: number }) {
  // score: -100 to +100, map to 0-100% for the bar
  const pct = Math.max(0, Math.min(100, (score + 100) / 2));
  const barColor = score > 20 ? 'var(--bb-positive)' : score < -20 ? 'var(--bb-negative)' : 'var(--bb-neutral)';

  return (
    <div className="w-full">
      <div className="relative h-1.5 w-full rounded-full overflow-hidden bg-[var(--bb-surface-hover)]">
        {/* Center marker */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--bb-text-tertiary)]" style={{ opacity: 0.4 }} />
        {/* Fill bar */}
        <div
          className="absolute top-0 bottom-0 rounded-full transition-all duration-500"
          style={{
            left: score >= 0 ? '50%' : `${pct}%`,
            width: score >= 0 ? `${pct - 50}%` : `${50 - pct}%`,
            background: barColor,
            opacity: 0.8,
          }}
        />
        {/* Dot marker */}
        <div
          className="absolute top-1/2 w-2 h-2 rounded-full border border-[var(--bb-surface)] transition-all duration-500"
          style={{
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            background: barColor,
            boxShadow: `0 0 4px ${barColor}60`,
          }}
        />
      </div>
    </div>
  );
}

function RangeBar52w({ low, high, current }: { low: number; high: number; current: number }) {
  const range = high - low;
  const pct = range > 0 ? Math.max(0, Math.min(100, ((current - low) / range) * 100)) : 50;
  return (
    <div className="w-full">
      <div className="relative h-1 w-full rounded-full bg-[var(--bb-surface-hover)]">
        <div
          className="absolute top-1/2 w-2 h-2 rounded-full border border-[var(--bb-surface)]"
          style={{
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            background: 'var(--bb-accent)',
            boxShadow: '0 0 4px rgba(59,130,246,0.4)',
          }}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-[9px] text-[var(--bb-text-tertiary)] font-mono">{low.toLocaleString()}</span>
        <span className="text-[9px] text-[var(--bb-text-tertiary)] font-mono">{high.toLocaleString()}</span>
      </div>
    </div>
  );
}

function ChangeCell({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const isPositive = value >= 0;
  const color = value === 0 ? 'var(--bb-neutral)' : isPositive ? 'var(--bb-positive)' : 'var(--bb-negative)';
  return (
    <span className="text-[12px] font-mono font-semibold" style={{ color }}>
      {isPositive ? '+' : ''}{value.toFixed(1)}{suffix}
    </span>
  );
}

function InstrumentRow({ inst }: { inst: TrackedInstrument }) {
  const [noteOpen, setNoteOpen] = useState(false);
  const isPositive = inst.dailyChange >= 0;
  const signal = signalColors[inst.strategySignal] || signalColors['Hold'];
  const direction: 'up' | 'down' | 'flat' = isPositive ? 'up' : 'down';

  return (
    <div className="border-b border-[var(--bb-border-subtle)] last:border-b-0">
      {/* Main Row */}
      <div className="grid grid-cols-12 items-center gap-2 py-3 px-2 hover:bg-[var(--bb-surface-hover)] transition-colors">
        {/* Symbol + Name (col 1-2) */}
        <div className="col-span-2">
          <div className="text-[14px] font-bold font-mono text-[var(--bb-accent)]">{inst.symbol}</div>
          <div className="text-[11px] text-[var(--bb-text-secondary)] truncate">{inst.name}</div>
        </div>

        {/* Price + Daily Change (col 3-4) */}
        <div className="col-span-2">
          <div className="text-[15px] font-bold font-mono text-[var(--bb-text-primary)]">
            {inst.category === 'commodity' && inst.symbol !== 'NG' ? '$' : ''}{inst.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className={`text-[11px] font-mono font-semibold ${isPositive ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
            {isPositive ? '+' : ''}{inst.dailyChange.toFixed(2)} ({isPositive ? '+' : ''}{inst.dailyChangePct.toFixed(2)}%)
          </span>
        </div>

        {/* Time Period Changes (col 5-7) */}
        <div className="col-span-1 text-center hidden md:block">
          <div className="text-[9px] text-[var(--bb-text-tertiary)] uppercase mb-0.5">1W</div>
          <ChangeCell value={inst.weeklyChange} />
        </div>
        <div className="col-span-1 text-center hidden md:block">
          <div className="text-[9px] text-[var(--bb-text-tertiary)] uppercase mb-0.5">1M</div>
          <ChangeCell value={inst.monthlyChange} />
        </div>
        <div className="col-span-1 text-center hidden lg:block">
          <div className="text-[9px] text-[var(--bb-text-tertiary)] uppercase mb-0.5">YTD</div>
          <ChangeCell value={inst.ytdChange} />
        </div>

        {/* Sparkline (col 8) */}
        <div className="col-span-1 hidden md:flex justify-center">
          <Sparkline data={inst.sparkline30d} width={80} height={24} direction={direction} />
        </div>

        {/* RSI + Momentum (col 9-10) */}
        <div className="col-span-2 hidden lg:block">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase w-6">RSI</span>
            <RSIBadge rsi={inst.rsi14} />
          </div>
          <MomentumBar score={inst.momentumScore} />
        </div>

        {/* Strategy Signal + Note toggle (col 11-12) */}
        <div className="col-span-2 flex items-center gap-2 justify-end">
          {inst.strategyType !== 'none' && (
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--bb-surface-hover)] text-[var(--bb-text-tertiary)] hidden lg:inline-block">
              {inst.strategyType === 'momentum' ? '📈 Mom' : '🔄 MR'}
            </span>
          )}
          <span
            className="text-[11px] font-bold px-2 py-1 rounded"
            style={{ color: signal.text, background: signal.bg }}
          >
            {inst.strategySignal}
          </span>
          <button
            onClick={() => setNoteOpen(!noteOpen)}
            className="text-[11px] text-[var(--bb-accent)] hover:underline cursor-pointer flex-shrink-0"
            aria-expanded={noteOpen}
          >
            {noteOpen ? '▾' : '▸'} Note
          </button>
        </div>
      </div>

      {/* Mobile-friendly price changes row */}
      <div className="md:hidden px-2 pb-2 flex gap-4">
        <div>
          <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase">1W </span>
          <ChangeCell value={inst.weeklyChange} />
        </div>
        <div>
          <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase">1M </span>
          <ChangeCell value={inst.monthlyChange} />
        </div>
        <div>
          <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase">YTD </span>
          <ChangeCell value={inst.ytdChange} />
        </div>
      </div>

      {/* Expanded Market Note */}
      {noteOpen && (
        <div className="px-4 pb-4">
          <div className="bg-[var(--bb-surface-hover)] rounded-md px-3 py-2.5 border border-[var(--bb-border-subtle)]">
            {/* 52-week range */}
            <div className="mb-2.5">
              <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase tracking-wider font-medium">52-Week Range</span>
              <RangeBar52w low={inst.low52w} high={inst.high52w} current={inst.price} />
            </div>

            {/* Technical levels */}
            <div className="flex gap-4 mb-2.5 flex-wrap">
              <div>
                <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase block">SMA 20</span>
                <span className="text-[12px] font-mono text-[var(--bb-text-primary)]">{inst.sma20.toLocaleString()}</span>
                <span className={`text-[9px] ml-1 ${inst.price > inst.sma20 ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
                  {inst.price > inst.sma20 ? 'Above ✓' : 'Below ✗'}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[var(--bb-text-tertiary)] uppercase block">SMA 50</span>
                <span className="text-[12px] font-mono text-[var(--bb-text-primary)]">{inst.sma50.toLocaleString()}</span>
                <span className={`text-[9px] ml-1 ${inst.price > inst.sma50 ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
                  {inst.price > inst.sma50 ? 'Above ✓' : 'Below ✗'}
                </span>
              </div>
            </div>

            {/* Catalyst */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-bold text-[var(--bb-warning)] uppercase tracking-wider">⚡ {inst.noteCatalyst}</span>
            </div>

            {/* Market Note */}
            <p className="text-[12px] text-[var(--bb-text-primary)] leading-relaxed">{inst.marketNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommodityTracker({ instruments }: CommodityTrackerProps) {
  const indices = instruments.filter(i => i.category === 'equity-index');
  const commodities = instruments.filter(i => i.category === 'commodity');

  return (
    <section className="bb-section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>📊 Markets & Commodities Tracker</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
            style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>
            Strategy Signals
          </span>
        </div>
        <span className="text-[11px] text-[var(--bb-text-tertiary)]">Momentum · Mean-Reversion</span>
      </div>

      {/* Equity Indices */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2 px-2">
          <span className="text-[12px] font-bold text-[var(--bb-text-secondary)] uppercase tracking-wider">Equity Indices</span>
          <div className="flex-1 h-px bg-[var(--bb-border)]" />
        </div>
        <div>
          {indices.map((inst) => (
            <InstrumentRow key={inst.symbol} inst={inst} />
          ))}
        </div>
      </div>

      {/* Commodities */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-2">
          <span className="text-[12px] font-bold text-[var(--bb-text-secondary)] uppercase tracking-wider">Commodities</span>
          <div className="flex-1 h-px bg-[var(--bb-border)]" />
        </div>
        <div>
          {commodities.map((inst) => (
            <InstrumentRow key={inst.symbol} inst={inst} />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-[var(--bb-border-subtle)] flex flex-wrap gap-4 items-center px-2">
        <span className="text-[10px] text-[var(--bb-text-tertiary)] font-medium">Signal Types:</span>
        <span className="text-[10px] text-[var(--bb-text-tertiary)]">📈 <strong>Mom</strong> = Momentum (trend-following)</span>
        <span className="text-[10px] text-[var(--bb-text-tertiary)]">🔄 <strong>MR</strong> = Mean-Reversion (contrarian)</span>
        <span className="text-[10px] text-[var(--bb-text-tertiary)]">RSI &gt;70 = Overbought · &lt;30 = Oversold</span>
      </div>
    </section>
  );
}
