'use client';

import React from 'react';

interface ChangeBadgeProps {
  change: string;
  direction: 'up' | 'down' | 'flat' | 'new';
  invertColor?: boolean;
  size?: 'sm' | 'md';
}

export default function ChangeBadge({ change, direction, invertColor = false, size = 'md' }: ChangeBadgeProps) {
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : direction === 'new' ? '●' : '→';

  let colorClass = '';
  if (direction === 'new') {
    colorClass = 'text-[var(--bb-accent)]';
  } else if (direction === 'flat') {
    colorClass = 'text-[var(--bb-neutral)]';
  } else if (direction === 'up') {
    colorClass = invertColor ? 'text-[var(--bb-negative)]' : 'text-[var(--bb-positive)]';
  } else {
    colorClass = invertColor ? 'text-[var(--bb-positive)]' : 'text-[var(--bb-negative)]';
  }

  const sizeClass = size === 'sm' ? 'text-[11px]' : 'text-[13px]';

  return (
    <span className={`inline-flex items-center gap-0.5 font-mono font-medium ${colorClass} ${sizeClass}`}>
      <span>{arrow}</span>
      <span>{change}</span>
    </span>
  );
}
