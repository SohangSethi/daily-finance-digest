'use client';

import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  direction?: 'up' | 'down' | 'flat';
  className?: string;
}

export default function Sparkline({ data, width = 80, height = 24, direction = 'flat', className = '' }: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const padding = 2;
  const effectiveHeight = height - padding * 2;
  const stepX = width / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = padding + effectiveHeight - ((val - min) / range) * effectiveHeight;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = direction === 'up'
    ? 'var(--bb-positive)'
    : direction === 'down'
    ? 'var(--bb-negative)'
    : 'var(--bb-text-tertiary)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={`Trend: ${direction}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
