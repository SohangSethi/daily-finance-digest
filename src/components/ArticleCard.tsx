'use client';

import React, { useState } from 'react';
import ScoreBadge from './ScoreBadge';
import type { Article } from '@/lib/mockData';

interface ArticleCardProps {
  article: Article & { affectedTickers?: string[]; riskFlags?: string[] };
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

  const displayMarketImpact = article.marketImpact || '';
  const displaySummary = article.summary || '';

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

          {/* Tags & Portfolio Impact */}
          <div className="flex flex-wrap gap-1.5 mt-2 items-center">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-[var(--bb-accent-soft)] text-[var(--bb-accent)] cursor-pointer hover:opacity-80 transition-opacity"
              >
                {tag}
              </span>
            ))}
            
            {article.affectedTickers && article.affectedTickers.length > 0 && (
              <div className="flex gap-1 ml-2 pl-2 border-l border-[var(--bb-border)]">
                {article.affectedTickers.map((ticker) => (
                  <span key={ticker} className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--bb-border)] text-[var(--bb-text-primary)] bg-[var(--bb-surface)]">
                    {ticker}
                  </span>
                ))}
              </div>
            )}

            {article.riskFlags && article.riskFlags.length > 0 && (
              <div className="flex gap-1 ml-1">
                {article.riskFlags.map((flag) => (
                  <span key={flag} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    ⚠️ {flag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Summary */}
          {displaySummary && (
            <div className="mt-3 px-3 py-2.5 rounded-md bg-[var(--bb-surface-hover)] border border-[var(--bb-border-subtle)]">
              <div className="text-[10px] font-bold text-[var(--bb-text-tertiary)] uppercase tracking-wider mb-1">
                📋 Summary
              </div>
              <p className="text-[12px] text-[var(--bb-text-primary)] leading-relaxed">
                {displaySummary}
              </p>
            </div>
          )}

          {/* Why Read This */}
          <p className="text-[13px] text-[var(--bb-text-secondary)] mt-2.5 leading-relaxed">
            <span className="text-[11px] font-bold text-[var(--bb-accent)] uppercase tracking-wider mr-1.5">Why Read:</span>
            {displayWhyRead}
          </p>

          {/* Expand Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[12px] text-[var(--bb-accent)] hover:underline mt-2 flex items-center gap-1 font-medium cursor-pointer"
            aria-expanded={expanded}
          >
            <span className="transition-transform duration-200" style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
              ▸
            </span>
            {expanded ? 'Collapse Analysis' : 'Why It Matters & Market Impact'}
          </button>

          {/* Expanded: Why It Matters + Market Impact */}
          {expanded && (
            <div className="mt-2.5 space-y-2.5">
              {/* Why It Matters */}
              {displayWhyMatters && (
                <div
                  className="px-3 py-3 rounded-md border-l-2 border-[var(--bb-accent)] bg-[var(--bb-surface-hover)]"
                  role="region"
                  aria-label="Why it matters analysis"
                >
                  <div className="text-[11px] font-semibold text-[var(--bb-accent)] mb-1.5 uppercase tracking-wide">
                    {isStudent ? '📚 Explained Simply' : '🏦 Why It Matters'}
                  </div>
                  <p className="text-[12px] text-[var(--bb-text-primary)] leading-relaxed">
                    {displayWhyMatters}
                  </p>
                </div>
              )}

              {/* Market Impact */}
              {displayMarketImpact && (
                <div className="px-3 py-3 rounded-md border-l-2 border-[var(--bb-warning)] bg-[var(--bb-surface-hover)]">
                  <div className="text-[11px] font-semibold text-[var(--bb-warning)] mb-1.5 uppercase tracking-wide">
                    📊 How It Affects the Market
                  </div>
                  <p className="text-[12px] text-[var(--bb-text-primary)] leading-relaxed">
                    {displayMarketImpact}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
