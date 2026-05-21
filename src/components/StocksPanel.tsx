'use client';

import React from 'react';
import type { TrendingStock } from '@/lib/mockData';

interface StocksPanelProps {
  stocks: TrendingStock[];
}

const ratingConfig: Record<string, { color: string; bg: string; position: number }> = {
  'Strong Buy': { color: '#22C55E', bg: 'rgba(34,197,94,0.15)', position: 95 },
  'Buy': { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', position: 75 },
  'Hold': { color: '#94A3B8', bg: 'rgba(148,163,184,0.12)', position: 50 },
  'Sell': { color: '#F87171', bg: 'rgba(248,113,113,0.12)', position: 25 },
  'Strong Sell': { color: '#EF4444', bg: 'rgba(239,68,68,0.15)', position: 5 },
};

function RatingGauge({ rating }: { rating: string }) {
  const config = ratingConfig[rating] || ratingConfig['Hold'];
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-[var(--bb-text-tertiary)] uppercase tracking-wider font-medium">Analyst Consensus</span>
        <span className="text-[11px] font-bold" style={{ color: config.color }}>{rating}</span>
      </div>
      <div className="relative h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--bb-surface-hover)' }}>
        {/* Gradient background */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(to right, #EF4444, #F87171, #94A3B8, #4ADE80, #22C55E)',
          opacity: 0.3,
        }} />
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white shadow-md transition-all duration-500"
          style={{
            left: `${config.position}%`,
            transform: 'translate(-50%, -50%)',
            background: config.color,
            boxShadow: `0 0 6px ${config.color}60`,
          }}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-[8px] text-[var(--bb-text-tertiary)]">Sell</span>
        <span className="text-[8px] text-[var(--bb-text-tertiary)]">Buy</span>
      </div>
    </div>
  );
}

function MomentumIndicator({ momentum }: { momentum: 'bullish' | 'bearish' | 'neutral' }) {
  const cfg = {
    bullish: { icon: '▲', color: 'var(--bb-positive)', label: 'Bullish' },
    bearish: { icon: '▼', color: 'var(--bb-negative)', label: 'Bearish' },
    neutral: { icon: '—', color: 'var(--bb-text-tertiary)', label: 'Neutral' },
  }[momentum];

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{
      color: cfg.color,
      background: `color-mix(in srgb, ${cfg.color} 12%, transparent)`,
    }}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

export default function StocksPanel({ stocks }: StocksPanelProps) {
  return (
    <section className="bb-section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>📈 Equity Research — Trending Stocks</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bb-accent-soft)] text-[var(--bb-accent)] font-medium">
            Market Watch
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const upsidePositive = stock.priceTargetUpside >= 0;
          return (
            <div
              key={stock.ticker}
              className="bb-card px-4 py-4 flex flex-col gap-3 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
            >
              {/* Header: Ticker + Price */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold text-[var(--bb-accent)] font-mono tracking-tight">{stock.ticker}</span>
                    <MomentumIndicator momentum={stock.momentum} />
                  </div>
                  <span className="text-[12px] text-[var(--bb-text-secondary)] block mt-0.5">{stock.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[16px] font-bold font-mono text-[var(--bb-text-primary)]">
                    ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`block text-[12px] font-mono font-medium ${isPositive ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
                    {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePct.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Sector + Market Cap */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--bb-accent-soft)] text-[var(--bb-accent)]">
                  {stock.sector}
                </span>
                <span className="text-[10px] text-[var(--bb-text-tertiary)]">MCap: {stock.marketCap}</span>
              </div>

              {/* Price Target */}
              <div className="flex items-center justify-between px-2.5 py-2 rounded bg-[var(--bb-surface-hover)] border border-[var(--bb-border-subtle)]">
                <div>
                  <span className="text-[10px] text-[var(--bb-text-tertiary)] uppercase tracking-wider block">Price Target</span>
                  <span className="text-[14px] font-bold font-mono text-[var(--bb-text-primary)]">${stock.priceTarget.toFixed(2)}</span>
                </div>
                <span className={`text-[13px] font-bold ${upsidePositive ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
                  {upsidePositive ? '↑' : '↓'} {Math.abs(stock.priceTargetUpside).toFixed(1)}%
                </span>
              </div>

              {/* Rating Gauge */}
              <RatingGauge rating={stock.analystRating} />

              {/* Catalyst */}
              <div className="mt-1">
                <span className="text-[10px] font-bold text-[var(--bb-warning)] uppercase tracking-wider">⚡ Catalyst</span>
                <p className="text-[11px] text-[var(--bb-text-primary)] mt-0.5 leading-snug">{stock.catalyst}</p>
              </div>

              {/* Why Watch */}
              <p className="text-[11px] text-[var(--bb-text-secondary)] leading-relaxed">{stock.whyWatch}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
