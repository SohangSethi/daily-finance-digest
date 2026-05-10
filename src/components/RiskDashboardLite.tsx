import React from 'react';
import type { PortfolioSummary } from '@/lib/portfolio';

interface RiskDashboardLiteProps {
  summary: PortfolioSummary;
}

export default function RiskDashboardLite({ summary }: RiskDashboardLiteProps) {
  if (!summary) return null;

  // Simulate a 30-day drawdown based on simple daily PnL extension
  // In a real app, this would use historical prices
  const simulatedDrawdown = (summary.dailyPnLPct * 3.5).toFixed(2);
  const simulatedVol = (Math.abs(summary.dailyPnLPct) * 16).toFixed(2); // very rough annual vol approx

  return (
    <div className="bb-card p-4">
      <div className="flex items-center gap-2 border-b border-[var(--bb-border)] pb-3 mb-4">
        <span className="text-[14px] font-bold text-[var(--bb-text-primary)]">🛡️ Risk Overview</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Sector Exposure */}
        <div>
          <div className="text-[11px] font-semibold text-[var(--bb-text-secondary)] uppercase tracking-wide mb-3">
            Sector Exposure
          </div>
          <div className="flex flex-col gap-2.5">
            {Object.entries(summary.sectorWeights)
              .sort((a, b) => b[1] - a[1])
              .map(([sector, weight]) => (
                <div key={sector}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[var(--bb-text-primary)]">{sector}</span>
                    <span className="font-mono text-[var(--bb-text-secondary)]">{weight.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bb-surface-hover)] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${weight > 30 ? 'bg-[var(--bb-negative)]' : 'bg-[var(--bb-accent)]'}`}
                      style={{ width: `${weight}%` }}
                    />
                  </div>
                  {weight > 30 && (
                    <div className="text-[9px] text-[var(--bb-negative)] mt-0.5">⚠️ Concentration limit breached (&gt;30%)</div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Right Column: Simulated Risk Metrics */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-[11px] font-semibold text-[var(--bb-text-secondary)] uppercase tracking-wide mb-3">
              Stress Metrics (30D Proxy)
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--bb-surface-hover)] p-3 rounded border border-[var(--bb-border)]">
                <div className="text-[10px] text-[var(--bb-text-tertiary)] mb-1">Estimated Annual Volatility</div>
                <div className="text-[16px] font-bold text-[var(--bb-text-primary)]">{simulatedVol}%</div>
              </div>
              <div className="bg-[var(--bb-surface-hover)] p-3 rounded border border-[var(--bb-border)]">
                <div className="text-[10px] text-[var(--bb-text-tertiary)] mb-1">Est. 30D Max Drawdown</div>
                <div className="text-[16px] font-bold text-[var(--bb-negative)]">{simulatedDrawdown}%</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[var(--bb-text-secondary)] uppercase tracking-wide mb-3">
              Scenario Analysis
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-[var(--bb-surface-hover)] p-2 rounded text-[12px]">
                <span className="text-[var(--bb-text-primary)]">Tech Selloff (-10% NDX)</span>
                <span className="text-[var(--bb-negative)] font-bold">-$ {((summary.sectorWeights['Technology'] || 0) / 100 * summary.totalValue * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex items-center justify-between bg-[var(--bb-surface-hover)] p-2 rounded text-[12px]">
                <span className="text-[var(--bb-text-primary)]">Rates Spike (+50bps 10Y)</span>
                <span className="text-[var(--bb-negative)] font-bold">-$ {((summary.sectorWeights['Technology'] || 0) / 100 * summary.totalValue * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex items-center justify-between bg-[var(--bb-surface-hover)] p-2 rounded text-[12px]">
                <span className="text-[var(--bb-text-primary)]">Energy Rally (+15% Oil)</span>
                <span className="text-[var(--bb-positive)] font-bold">+$ {((summary.sectorWeights['Energy'] || 0) / 100 * summary.totalValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
