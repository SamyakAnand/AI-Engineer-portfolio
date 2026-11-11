'use client';

import React from 'react';

export default function LuffyCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.08) rotate(3deg)' : 'scale(1)',
      }}
      aria-label="Luffy anime cursor"
    >
      <defs>
        <radialGradient id="luffyAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura bounce ring */}
      <circle cx="32" cy="32" r="28" fill="url(#luffyAura)" className="animate-pulse" />

      {/* Body & Arms */}
      <rect x="24" y="34" width="16" height="18" rx="4" fill="#ef4444" />
      {/* Open chest */}
      <path d="M28 34 L32 44 L36 34 Z" fill="#fed7aa" />
      {/* Blue sash & shorts */}
      <rect x="25" y="48" width="14" height="6" fill="#0284c7" rx="2" />
      <rect x="23" y="46" width="18" height="3" fill="#eab308" />

      {/* Head */}
      <circle cx="32" cy="24" r="11" fill="#fed7aa" />
      {/* Black spiky hair */}
      <path d="M21 24 C20 17 26 14 32 14 C38 14 44 17 43 24 C40 22 36 21 32 21 C28 21 24 22 21 24 Z" fill="#18181b" />
      <path d="M20 22 L17 26 L22 25 Z" fill="#18181b" />
      <path d="M44 22 L47 26 L42 25 Z" fill="#18181b" />

      {/* Eyes & Big Grin */}
      <circle cx="28" cy="23" r="1.5" fill="#18181b" />
      <circle cx="36" cy="23" r="1.5" fill="#18181b" />
      <path d="M26 27 Q32 33 38 27 Z" fill="#ffffff" stroke="#18181b" strokeWidth="0.8" />
      {/* Left eye scar */}
      <path d="M27 25.5 L29 27.5 M26.5 27 L28.5 26" stroke="#991b1b" strokeWidth="0.8" />

      {/* Straw Hat */}
      <ellipse cx="32" cy="14" rx="22" ry="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <ellipse cx="32" cy="12" rx="12" ry="7" fill="#eab308" />
      <path d="M20 13 Q32 15 44 13 L43 11 Q32 13 21 11 Z" fill="#dc2626" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#ef4444" className="animate-ping" opacity="0.8" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
