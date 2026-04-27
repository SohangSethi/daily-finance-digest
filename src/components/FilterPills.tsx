'use client';

import React, { useState } from 'react';

interface FilterPillsProps {
  options: string[];
  defaultSelected?: string;
  onChange?: (selected: string) => void;
}

export default function FilterPills({ options, defaultSelected, onChange }: FilterPillsProps) {
  const [selected, setSelected] = useState(defaultSelected || options[0]);

  const handleClick = (option: string) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Filter options">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          role="radio"
          aria-checked={selected === option}
          className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer border ${
            selected === option
              ? 'bg-[var(--bb-accent)] text-white border-[var(--bb-accent)]'
              : 'bg-transparent text-[var(--bb-text-secondary)] border-[var(--bb-border)] hover:border-[var(--bb-text-tertiary)] hover:text-[var(--bb-text-primary)]'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
