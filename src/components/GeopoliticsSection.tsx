'use client';

import React from 'react';
import type { GeopoliticsArticle } from '@/lib/mockData';

interface GeopoliticsSectionProps {
  articles: GeopoliticsArticle[];
}

const regionColors: Record<string, { bg: string; text: string }> = {
  'US': { bg: 'rgba(37,99,235,0.15)', text: '#3B82F6' },
  'Europe': { bg: 'rgba(139,92,246,0.15)', text: '#8B5CF6' },
  'Asia': { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  'Middle East': { bg: 'rgba(249,115,22,0.15)', text: '#F97316' },
  'Global': { bg: 'rgba(148,163,184,0.15)', text: '#94A3B8' },
};

const biasColorMap: Record<string, string> = {
  'Far Left': '#1D4ED8',
  'Left': '#3B82F6',
  'Center-Left': '#60A5FA',
  'Center': '#94A3B8',
  'Center-Right': '#F87171',
  'Right': '#EF4444',
  'Far Right': '#B91C1C',
};

function BiasBar({ bias, biasLabel }: { bias: number; biasLabel: string }) {
  // bias: -3 (far left) to +3 (far right), 0 = center
  // Map to percentage: -3 → 5%, 0 → 50%, +3 → 95%
  const position = Math.max(5, Math.min(95, ((bias + 3) / 6) * 90 + 5));
  const dotColor = biasColorMap[biasLabel] || '#94A3B8';

  return (
    <div className="mt-2.5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] text-[var(--bb-text-tertiary)] uppercase tracking-wider font-medium">Media Bias</span>
        <span className="text-[10px] font-bold" style={{ color: dotColor }}>{biasLabel}</span>
      </div>
      <div className="relative h-2 w-full max-w-[220px] rounded-full overflow-hidden">
        {/* Gradient bar */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(to right, #3B82F6 0%, #60A5FA 25%, #94A3B8 50%, #F87171 75%, #EF4444 100%)',
          opacity: 0.35,
        }} />
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--bb-text-tertiary)]" style={{ opacity: 0.3 }} />
        {/* Marker dot */}
        <div
          className="absolute top-1/2 w-3 h-3 rounded-full border-2 shadow-lg transition-all duration-300"
          style={{
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            background: dotColor,
            borderColor: 'var(--bb-surface)',
            boxShadow: `0 0 8px ${dotColor}50`,
          }}
        />
      </div>
      <div className="flex justify-between max-w-[220px] mt-0.5">
        <span className="text-[8px] text-[#3B82F6] font-medium">← Left</span>
        <span className="text-[8px] text-[var(--bb-text-tertiary)]">Center</span>
        <span className="text-[8px] text-[#EF4444] font-medium">Right →</span>
      </div>
      <span className="text-[8px] text-[var(--bb-text-tertiary)] block mt-0.5 opacity-60">
        Source: AllSides / Ad Fontes Media Bias Ratings
      </span>
    </div>
  );
}

export default function GeopoliticsSection({ articles }: GeopoliticsSectionProps) {
  return (
    <section className="bb-section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-section-header" style={{ color: 'var(--bb-text-primary)' }}>🌍 Geopolitics Intelligence</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
            style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>
            Bias-Aware
          </span>
        </div>
        <span className="text-[11px] text-[var(--bb-text-tertiary)]">US &amp; Global Coverage</span>
      </div>

      <div className="space-y-0">
        {articles.map((article) => {
          const regionStyle = regionColors[article.region] || regionColors['Global'];
          return (
            <div
              key={article.id}
              className="py-4 border-b border-[var(--bb-border-subtle)] last:border-b-0 group"
            >
              <div className="flex items-start gap-3">
                {/* Region badge */}
                <div
                  className="flex-shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5"
                  style={{ background: regionStyle.bg, color: regionStyle.text }}
                >
                  {article.region}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-semibold text-[var(--bb-text-primary)] hover:text-[var(--bb-accent)] transition-colors block leading-snug"
                  >
                    {article.title}
                  </a>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="text-[12px] font-semibold text-[var(--bb-text-secondary)]">{article.source}</span>
                    <span className="text-[11px] text-[var(--bb-text-tertiary)]">·</span>
                    <span className="text-[11px] text-[var(--bb-text-tertiary)]">{article.timeAgo}</span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--bb-surface-hover)] text-[var(--bb-text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-[12px] text-[var(--bb-text-secondary)] mt-2 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Bias Bar */}
                  <BiasBar bias={article.bias} biasLabel={article.biasLabel} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
