'use client';

import React from 'react';
import Sparkline from './Sparkline';
import type { MacroIndicator, MarketInstrument } from '@/lib/mockData';

interface KPICardProps {
  data: MacroIndicator | MarketInstrument;
  variant?: 'macro' | 'market';
}

// Map Yahoo Finance symbols → Google Finance URL paths
const GOOGLE_FINANCE_MAP: Record<string, string> = {
  '^GSPC': '.INX:INDEXSP',
  '^IXIC': '.IXIC:INDEXNASDAQ',
  '^DJI': '.DJI:INDEXDJX',
  '^TNX': 'TNX:INDEXCBOE',
  '^IRX': 'IRX:INDEXCBOE',
  '^VIX': 'VIX:INDEXCBOE',
  'DX-Y.NYB': 'DX-Y.NYB:NYBOARD',
  'CL=F': 'CL%3DF:NYMEX',
  'BZ=F': 'BZ%3DF:NYMEX',
  'GC=F': 'GC%3DF:COMEX',
  // Credit spreads and custom symbols don't have a Google Finance page
  'IG': '',
  'HY': '',
  '2s10s': '',
};

function getGoogleFinanceUrl(symbol: string): string | null {
  const mapped = GOOGLE_FINANCE_MAP[symbol];
  if (mapped === undefined || mapped === '') return null;
  return `https://www.google.com/finance/quote/${mapped}`;
}

export default function KPICard({ data, variant = 'macro' }: KPICardProps) {
  const isMacro = variant === 'macro';
  const macroData = data as MacroIndicator;
  const marketData = data as MarketInstrument;

  const changeText = isMacro ? macroData.change : marketData.changeAbs;
  const invertColor = 'invertColor' in data && data.invertColor;

  const directionColor =
    data.direction === 'flat'
      ? 'text-[var(--bb-neutral)]'
      : data.direction === 'up'
      ? invertColor
        ? 'text-[var(--bb-negative)]'
        : 'text-[var(--bb-positive)]'
      : invertColor
      ? 'text-[var(--bb-positive)]'
      : 'text-[var(--bb-negative)]';

  const arrow = data.direction === 'up' ? '↑' : data.direction === 'down' ? '↓' : '';

  // For market instruments, link to Google Finance
  const googleFinanceUrl = !isMacro ? getGoogleFinanceUrl(marketData.symbol) : null;

  const cardContent = (
    <>
      <div className="text-kpi-label truncate">{data.name}</div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-kpi-value text-[var(--bb-text-primary)]">
          {data.value}
          {data.unit && <span className="text-[14px] font-normal text-[var(--bb-text-secondary)] ml-0.5">{data.unit}</span>}
        </span>
        <span className={`font-mono text-[12px] font-semibold ${directionColor}`}>
          {arrow}{changeText}
        </span>
      </div>

      <div className="flex items-center justify-between mt-1">
        <Sparkline data={data.sparkline} width={70} height={20} direction={data.direction} />
        {isMacro && macroData.nextRelease && (
          <span className="text-[10px] text-[var(--bb-text-tertiary)] font-medium">
            Next: {macroData.nextRelease}
          </span>
        )}
        {googleFinanceUrl && (
          <span className="text-[10px] text-[var(--bb-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">
            ↗ View
          </span>
        )}
      </div>
    </>
  );

  if (googleFinanceUrl) {
    return (
      <a
        href={googleFinanceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group bb-card px-3 py-3 min-w-[150px] flex flex-col gap-1.5 no-underline cursor-pointer"
        title={`View ${data.name} on Google Finance`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="bb-card px-3 py-3 min-w-[150px] flex flex-col gap-1.5">
      {cardContent}
    </div>
  );
}
