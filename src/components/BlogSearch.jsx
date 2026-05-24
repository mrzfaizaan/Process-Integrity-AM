import { useState } from 'react';
import InlineIcon from './InlineIcon';

export default function BlogSearch({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          className="w-4 h-4 text-steel/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search posts..."
        className={`input-field pl-11 pr-4 py-3 w-full text-sm transition-colors ${
          focused ? 'border-safety' : 'border-divider'
        }`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-steel/40 hover:text-steel/70 transition-colors"
          aria-label="Clear search"
        >
          <InlineIcon name="arrow" className="w-3.5 h-3.5 rotate-45" />
        </button>
      )}
    </div>
  );
}
