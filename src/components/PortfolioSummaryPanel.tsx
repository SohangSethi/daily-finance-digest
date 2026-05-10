import React from 'react';
import type { PortfolioSummary } from '@/lib/portfolio';

interface PortfolioSummaryPanelProps {
  summary: PortfolioSummary;
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

function formatPct(val: number) {
  return `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`;
}

export default function PortfolioSummaryPanel({ summary }: PortfolioSummaryPanelProps) {
  if (!summary) return null;

  return (
    <div className="bb-card p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[var(--bb-border)] pb-3">
        <div>
          <div className="text-[11px] font-semibold text-[var(--bb-text-tertiary)] uppercase tracking-wider mb-1">
            Total Portfolio Value
          </div>
          <div className="text-2xl font-bold text-[var(--bb-text-primary)]">
            {formatCurrency(summary.totalValue)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-semibold text-[var(--bb-text-tertiary)] uppercase tracking-wider mb-1">
            Unrealized P&L
          </div>
          <div className={`text-lg font-bold ${summary.unrealizedPnL >= 0 ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
            {summary.unrealizedPnL >= 0 ? '+' : ''}{formatCurrency(summary.unrealizedPnL)} ({formatPct(summary.unrealizedPnLPct)})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase tracking-wide">Daily P&L Est.</div>
          <div className={`text-[13px] font-bold ${summary.dailyPnL >= 0 ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]'}`}>
            {summary.dailyPnL >= 0 ? '+' : ''}{formatCurrency(summary.dailyPnL)} ({formatPct(summary.dailyPnLPct)})
          </div>
        </div>
        <div>
          <div className="text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase tracking-wide">Cost Basis</div>
          <div className="text-[13px] font-medium text-[var(--bb-text-secondary)]">
            {formatCurrency(summary.totalCost)}
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase tracking-wide mb-1.5">Top Movers (Est)</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[var(--bb-positive)] font-medium flex-1 truncate">
                ↑ {summary.topContributors[0]?.ticker} ({formatCurrency(summary.topContributors[0]?.dailyPnL || 0)})
              </span>
              <span className="text-[11px] text-[var(--bb-negative)] font-medium flex-1 truncate text-right">
                ↓ {summary.topDetractors[0]?.ticker} ({formatCurrency(summary.topDetractors[0]?.dailyPnL || 0)})
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="text-[11px] font-semibold text-[var(--bb-text-secondary)] mb-2">Holdings ({summary.holdingsWithData.length})</div>
        <div className="bg-[var(--bb-surface-hover)] rounded-md border border-[var(--bb-border)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--bb-border)]">
                <th className="px-3 py-2 text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase">Ticker</th>
                <th className="px-3 py-2 text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase text-right">Weight</th>
                <th className="px-3 py-2 text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase text-right">Price</th>
                <th className="px-3 py-2 text-[10px] font-medium text-[var(--bb-text-tertiary)] uppercase text-right">1D %</th>
              </tr>
            </thead>
            <tbody>
              {summary.holdingsWithData.map((h) => (
                <tr key={h.ticker} className="border-b border-[var(--bb-border)] last:border-0 hover:bg-[var(--bb-surface)] transition-colors">
                  <td className="px-3 py-2 text-[12px] font-bold text-[var(--bb-text-primary)]">{h.ticker}</td>
                  <td className="px-3 py-2 text-[12px] text-[var(--bb-text-secondary)] text-right">{h.weight.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-[12px] text-[var(--bb-text-primary)] text-right">
                    ${h.currentPrice ? h.currentPrice.toFixed(2) : h.averageCost.toFixed(2)}
                  </td>
                  <td className={`px-3 py-2 text-[12px] font-medium text-right ${h.dailyChangePct ? (h.dailyChangePct > 0 ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]') : 'text-[var(--bb-text-tertiary)]'}`}>
                    {h.dailyChangePct ? formatPct(h.dailyChangePct) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
