'use client';

import React from 'react';
import type { SectorPulse } from '@/lib/mockData';

interface SectorTileProps {
  sector: SectorPulse;
}

export default function SectorTile({ sector }: SectorTileProps) {
  const direction = sector.changePct > 0 ? 'up' : sector.changePct < 0 ? 'down' : 'flat';
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  const colorClass =
    direction === 'up'
      ? 'text-[var(--bb-positive)]'
      : direction === 'down'
      ? 'text-[var(--bb-negative)]'
      : 'text-[var(--bb-neutral)]';

  return (
    <div className="bb-card px-4 py-3 cursor-pointer hover:border-[var(--bb-accent)] transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[var(--bb-text-primary)]">
          {sector.name}
        </span>
        <span className={`font-mono text-[14px] font-bold ${colorClass}`}>
          {arrow}{sector.changePct > 0 ? '+' : ''}{sector.changePct.toFixed(1)}%
        </span>
      </div>
      <div className="mt-1.5">
        <span className="text-[11px] text-[var(--bb-text-tertiary)]">
          {sector.articleCount} article{sector.articleCount !== 1 ? 's' : ''} today
        </span>
      </div>
    </div>
  );
}
