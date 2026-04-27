'use client';

import React from 'react';
import type { TickerItem } from '@/lib/mockData';

interface TickerRibbonProps {
  items: TickerItem[];
}

export default function TickerRibbon({ items }: TickerRibbonProps) {
  // Duplicate for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden" style={{ background: 'var(--bb-ribbon-bg)' }}>
      <div className="ticker-ribbon flex items-center gap-6 py-1.5 px-4 whitespace-nowrap">
        {doubled.map((item, i) => {
          const colorClass =
            item.direction === 'up'
              ? 'text-[#22C55E]'
              : item.direction === 'down'
              ? 'text-[#EF4444]'
              : 'text-[#94A3B8]';

          return (
            <span key={`${item.name}-${i}`} className="inline-flex items-center gap-1.5 text-ticker" style={{ color: 'var(--bb-ribbon-text)' }}>
              <span className="font-medium opacity-70">{item.name}</span>
              <span className="font-bold">{item.value}</span>
              <span className={`text-[12px] font-semibold ${colorClass}`}>{item.change}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
