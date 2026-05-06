'use client';

import React, { useState } from 'react';
import ScoreBadge from './ScoreBadge';
import type { Article } from '@/lib/mockData';

interface ArticleCardProps {
  article: Article;
  viewMode?: 'normal' | 'student';
}

export default function ArticleCard({ article, viewMode = 'normal' }: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false);

  const isStudent = viewMode === 'student';

  const sourceColorMap: Record<string, string> = {
    reuters: '#FF6600',
    wsj: '#0274B6',
    bloomberg: '#472991',
    ft: '#FCD0B1',
    cnbc: '#005594',
    treasury: '#002868',
  };

  const sourceColor = sourceColorMap[article.sourceSlug] || 'var(--bb-text-tertiary)';

  const displayWhyRead = isStudent
    ? (article.studentWhyRead || article.whyRead)
    : article.whyRead;

  const displayWhyMatters = isStudent
    ? (article.studentWhyMatters || article.whyMatters)
    : article.whyMatters;

  return (
    <article className="group py-4 border-b border-[var(--bb-border)] last:border-b-0">
      {/* Top Row: Rank + Headline + Score */}
      <div className="flex items-start gap-3">
        {/* Rank Number */}
        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-[var(--bb-surface-hover)] flex items-center justify-center">
          <span className="text-[13px] font-bold text-[var(--bb-text-secondary)] font-mono">
            {article.rank}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Headline */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-article-headline text-[var(--bb-text-primary)] hover:text-[var(--bb-accent)] transition-colors block leading-snug"
          >
            {article.title}
          </a>

          {/* Meta Row: Source · Time · Score · Tags · Cluster count */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span
              className="text-[12px] font-semibold"
              style={{ color: sourceColor }}
            >
              {article.source}
            </span>
            <span className="text-[11px] text-[var(--bb-text-tertiary)]">·</span>
            <span className="text-[12px] text-[var(--bb-text-tertiary)]">{article.timeAgo}</span>
            <ScoreBadge score={article.compositeScore} size="sm" />
            {article.clusterSize && (
              <span className="text-[10px] text-[var(--bb-text-tertiary)] bg-[var(--bb-surface-hover)] px-1.5 py-0.5 rounded">
                {article.clusterSize} sources
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-[var(--bb-accent-soft)] text-[var(--bb-accent)] cursor-pointer hover:opacity-80 transition-opacity"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Why Read This */}
          <p className="text-[13px] text-[var(--bb-text-secondary)] mt-2 leading-relaxed">
            {displayWhyRead}
          </p>

          {/* Expand Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[12px] text-[var(--bb-accent)] hover:underline mt-1.5 flex items-center gap-1 font-medium cursor-pointer"
            aria-expanded={expanded}
          >
            <span className="transition-transform" style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              ▸
            </span>
            {expanded ? 'Hide' : 'Why It Matters'}
          </button>

          {/* Why It Matters Panel */}
          {expanded && (
            <div
              className="mt-2 px-3 py-3 rounded-md border-l-2 border-[var(--bb-accent)] bg-[var(--bb-surface-hover)]"
              role="region"
              aria-label="Why it matters analysis"
            >
              <div className="text-[11px] font-semibold text-[var(--bb-accent)] mb-1.5 uppercase tracking-wide">
                {isStudent ? '📚 Explained Simply' : '🏦 Banker Take'}
              </div>
              <p className="text-[13px] text-[var(--bb-text-primary)] leading-relaxed">
                {displayWhyMatters}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
