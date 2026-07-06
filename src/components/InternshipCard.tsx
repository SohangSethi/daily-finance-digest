'use client';

import React from 'react';

interface InternshipPosting {
  id: string;
  company: string;
  companySlug: string;
  sector: string;
  title: string;
  location: string;
  url: string;
  postedDate: string | null;
  deadline: string | null;
  source: 'greenhouse' | 'lever' | 'workday' | 'direct';
  status: 'open' | 'coming_soon';
}

const SECTOR_COLORS: Record<string, string> = {
  Banking: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
  Consulting: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
  'Asset Management': 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
  Tech: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
  Healthcare: 'bg-rose-600/20 text-rose-400 border-rose-500/30',
  Consumer: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
  Industrial: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
  Energy: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
  Defense: 'bg-slate-600/20 text-slate-400 border-slate-500/30',
};

const SOURCE_LABELS: Record<string, string> = {
  greenhouse: '🟢 Live — Greenhouse',
  lever: '🟢 Live — Lever',
  workday: '🟢 Live — Workday',
  direct: '🔗 Career Page',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  } catch {
    return '';
  }
}

export default function InternshipCard({ posting }: { posting: InternshipPosting }) {
  const sectorClass = SECTOR_COLORS[posting.sector] || 'bg-gray-600/20 text-gray-400 border-gray-500/30';
  const isLive = posting.source !== 'direct';

  return (
    <a
      href={posting.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bb-card block px-4 py-3.5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg group"
      style={{ borderLeft: isLive ? '3px solid var(--bb-positive)' : '3px solid var(--bb-border)' }}
    >
      {/* Top row: Company + Sector badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="font-semibold text-sm truncate"
            style={{ color: 'var(--bb-text-primary)' }}
          >
            {posting.company}
          </span>
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border whitespace-nowrap ${sectorClass}`}
          >
            {posting.sector}
          </span>
        </div>

        {/* Source badge */}
        <span
          className="text-[10px] font-medium whitespace-nowrap"
          style={{ color: isLive ? 'var(--bb-positive)' : 'var(--bb-text-tertiary)' }}
        >
          {SOURCE_LABELS[posting.source]}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-sm font-medium leading-snug mb-2 group-hover:underline"
        style={{ color: 'var(--bb-text-primary)' }}
      >
        {posting.title}
      </h3>

      {/* Bottom row: Location + Date + Apply */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--bb-text-secondary)' }}>
          {/* Location */}
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {posting.location}
          </span>

          {/* Posted date */}
          {posting.postedDate && (
            <span className="flex items-center gap-1" title={formatDate(posting.postedDate)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {timeAgo(posting.postedDate)}
            </span>
          )}
        </div>

        {/* Apply button */}
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors"
          style={{
            background: 'var(--bb-accent)',
            color: '#fff',
          }}
        >
          {isLive ? 'Apply →' : 'View →'}
        </span>
      </div>

      {/* Deadline */}
      {posting.deadline && (
        <div
          className="mt-2 text-[10px] font-medium px-2 py-1 rounded"
          style={{ background: 'var(--bb-warning)', color: '#000' }}
        >
          ⏰ Deadline: {formatDate(posting.deadline)}
        </div>
      )}
    </a>
  );
}
