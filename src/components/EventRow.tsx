'use client';

import React from 'react';
import type { CalendarEvent } from '@/lib/mockData';

interface EventRowProps {
  event: CalendarEvent;
}

const typeColorMap: Record<string, string> = {
  fomc: '#DC2626',
  cpi: '#D97706',
  pce: '#D97706',
  gdp: '#2563EB',
  payrolls: '#7C3AED',
  ism: '#64748B',
  refunding: '#0891B2',
  earnings: '#16A34A',
};

const typeIcons: Record<string, string> = {
  fomc: '🏛',
  cpi: '📊',
  pce: '📊',
  gdp: '📈',
  payrolls: '👷',
  ism: '🏭',
  refunding: '💵',
  earnings: '💰',
};

export default function EventRow({ event }: EventRowProps) {
  const color = typeColorMap[event.type] || '#64748B';
  const icon = typeIcons[event.type] || '📅';

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[var(--bb-border-subtle)] last:border-b-0 group cursor-pointer hover:bg-[var(--bb-surface-hover)] -mx-2 px-2 rounded transition-colors">
      {/* Date */}
      <div className="flex-shrink-0 w-[52px] text-right">
        <span className="text-[12px] font-mono font-medium text-[var(--bb-text-secondary)]">
          {event.date}
        </span>
      </div>

      {/* Impact Dot */}
      <div className="flex-shrink-0">
        {event.impactLevel === 'high' ? (
          <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: '#DC2626' }} />
        ) : (
          <span className="block w-2 h-2 rounded-full bg-[var(--bb-text-tertiary)] opacity-40" />
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <span className="text-[13px] text-[var(--bb-text-primary)] font-medium truncate block">
          {icon} {event.name}
        </span>
      </div>

      {/* Days Until */}
      <div className="flex-shrink-0">
        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--bb-surface)] text-[var(--bb-text-tertiary)]">
          {event.daysUntil === 0 ? 'TODAY' : `${event.daysUntil}d`}
        </span>
      </div>
    </div>
  );
}
