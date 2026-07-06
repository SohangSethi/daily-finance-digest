'use client';

import React from 'react';

interface InternshipFiltersProps {
  sectors: string[];
  selectedSector: string;
  onSectorChange: (sector: string) => void;
  selectedSource: string;
  onSourceChange: (source: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: {
    totalPostings: number;
    livePostings: number;
    directLinks: number;
    companiesTracked: number;
  };
}

const SECTOR_ORDER = ['All', 'Banking', 'Tech', 'Consulting', 'Asset Management', 'Healthcare', 'Consumer', 'Industrial', 'Energy', 'Defense'];
const SOURCE_OPTIONS = ['All', 'Live Only', 'Direct Links'];

export default function InternshipFilters({
  sectors,
  selectedSector,
  onSectorChange,
  selectedSource,
  onSourceChange,
  searchQuery,
  onSearchChange,
  stats,
}: InternshipFiltersProps) {
  // Order sectors per SECTOR_ORDER, then any extras
  const orderedSectors = ['All', ...SECTOR_ORDER.filter(s => s !== 'All' && sectors.includes(s)), ...sectors.filter(s => !SECTOR_ORDER.includes(s))];

  return (
    <div className="space-y-3">
      {/* Stats bar */}
      <div className="flex items-center gap-4 text-[11px] font-medium" style={{ color: 'var(--bb-text-secondary)' }}>
        <span>{stats.companiesTracked} companies tracked</span>
        <span className="w-px h-3" style={{ background: 'var(--bb-border)' }} />
        <span style={{ color: 'var(--bb-positive)' }}>
          🟢 {stats.livePostings} live postings
        </span>
        <span className="w-px h-3" style={{ background: 'var(--bb-border)' }} />
        <span>🔗 {stats.directLinks} career pages</span>
      </div>

      {/* Search + Source filter row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2"
            width="13" height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--bb-text-tertiary)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md text-xs font-medium border outline-none transition-colors"
            style={{
              background: 'var(--bb-surface)',
              borderColor: 'var(--bb-border)',
              color: 'var(--bb-text-primary)',
            }}
          />
        </div>

        {/* Source filter pills */}
        <div className="flex items-center gap-1">
          {SOURCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => onSourceChange(opt)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md transition-all duration-150"
              style={{
                background: selectedSource === opt ? 'var(--bb-accent)' : 'transparent',
                color: selectedSource === opt ? '#fff' : 'var(--bb-text-secondary)',
                border: `1px solid ${selectedSource === opt ? 'var(--bb-accent)' : 'var(--bb-border)'}`,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Sector filter pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {orderedSectors.map((sector) => (
          <button
            key={sector}
            onClick={() => onSectorChange(sector)}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-150"
            style={{
              background: selectedSector === sector ? 'var(--bb-accent-soft)' : 'transparent',
              color: selectedSector === sector ? 'var(--bb-accent)' : 'var(--bb-text-tertiary)',
              border: `1px solid ${selectedSector === sector ? 'var(--bb-accent)' : 'var(--bb-border)'}`,
            }}
          >
            {sector}
          </button>
        ))}
      </div>
    </div>
  );
}
