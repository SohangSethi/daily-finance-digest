'use client';

import React from 'react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-md flex items-center justify-center bg-[var(--bb-surface)] border border-[var(--bb-border)] hover:border-[var(--bb-text-tertiary)] transition-colors cursor-pointer"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="text-[14px]">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
