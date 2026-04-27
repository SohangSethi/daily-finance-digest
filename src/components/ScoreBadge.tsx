'use client';

import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const tier = score >= 80 ? 'high' : score >= 50 ? 'mid' : 'low';

  const bgMap = {
    high: 'bg-[var(--bb-score-high)]',
    mid: 'bg-[var(--bb-score-mid)]',
    low: 'bg-[var(--bb-score-low)]',
  };

  const sizeMap = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-[11px] px-2 py-0.5',
    lg: 'text-[12px] px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded font-mono font-bold text-white ${bgMap[tier]} ${sizeMap[size]}`}
      aria-label={`Relevance score: ${score} out of 100`}
    >
      <span className="text-[9px]">⚡</span>
      {score}
    </span>
  );
}
