import React from 'react';

interface BrandLogoProps {
  variant?: 'badge' | 'compact';
  className?: string;
}

/**
 * Circular mountain-and-river emblem + Playfair Display serif wordmark
 * for "Pahari Shad by Kakoli"
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'badge', className = '' }) => {
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#2E6B34] text-[#FFF8EC] shadow-sm shrink-0 overflow-hidden border border-[#E8A317]/40"
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <rect width="40" height="40" fill="#5FA8E8" />
            <circle cx="30" cy="10" r="4" fill="#E8A317" />
            <path d="M0 28 L13 14 L24 25 L32 16 L40 24 L40 40 L0 40 Z" fill="#2E6B34" />
            <path d="M4 30 L17 18 L28 29 L40 22 L40 40 L0 40 Z" fill="#235328" />
            <path
              d="M17 26 C21 28, 13 33, 21 37 C23 38, 26 39, 28 40 L17 40 C13 36, 9 33, 14 29 Z"
              fill="#D9EEFA"
              opacity="0.9"
            />
          </svg>
        </span>
        <span className="font-display-serif text-lg sm:text-xl font-bold tracking-tight text-[#1C241D] whitespace-nowrap">
          Pahari Shad
        </span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FFF8EC]/95 backdrop-blur-sm border-2 border-[#2E6B34]/25 shadow-xl p-2 relative overflow-hidden ${className}`}
      aria-label="Pahari Shad by Kakoli"
    >
      {/* Mountain-and-river circular illustration */}
      <svg
        viewBox="0 0 120 70"
        className="w-20 h-11 shrink-0 -mt-0.5"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6EC1F0" />
            <stop offset="100%" stopColor="#EBF6FC" />
          </linearGradient>
        </defs>
        <clipPath id="archClip">
          <ellipse cx="60" cy="52" rx="54" ry="44" />
        </clipPath>
        <g clipPath="url(#archClip)">
          <rect x="6" y="6" width="108" height="60" fill="url(#skyGrad)" />
          {/* Warm sun */}
          <circle cx="88" cy="22" r="7" fill="#E8A317" opacity="0.9" />
          {/* Distant mist peak */}
          <path d="M8 58 L36 26 L58 44 L82 22 L112 52 L112 68 L8 68 Z" fill="#46854B" />
          {/* Front deep hill */}
          <path d="M6 62 L28 38 L52 54 L76 34 L114 58 L114 70 L6 70 Z" fill="#2E6B34" />
          {/* Winding river */}
          <path
            d="M54 49 C62 52, 46 58, 60 63 C66 65, 72 67, 75 70 L50 70 C44 65, 38 60, 48 54 Z"
            fill="#88CEFA"
          />
        </g>
      </svg>

      {/* Wordmark */}
      <span className="font-display-serif text-[15px] sm:text-[17px] font-bold leading-none text-[#1C241D] tracking-tight mt-0.5">
        Pahari Shad
      </span>
      <span className="font-display-serif italic text-[11px] sm:text-xs text-[#2E6B34] font-semibold mt-0.5">
        by Kakoli
      </span>
    </div>
  );
};
