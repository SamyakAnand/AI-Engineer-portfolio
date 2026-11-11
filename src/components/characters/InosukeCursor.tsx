'use client';

import React from 'react';

export default function InosukeCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(2,132,199,0.55)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.12) rotate(-5deg)' : 'scale(1)',
      }}
      aria-label="Inosuke anime cursor"
    >
      <defs>
        <radialGradient id="inosukeAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#64748b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Beast Charge Aura */}
      <circle cx="32" cy="32" r="28" fill="url(#inosukeAura)" className="animate-pulse" />

      {/* Twin Serrated Blades held ready */}
      {/* Blade 1 (Left) */}
      <path d="M16 24 L22 46 L20 48 L14 26 Z" fill="#94a3b8" />
      {/* Serrated notches */}
      <polygon points="15,28 12,30 15,32" fill="#0f172a" />
      <polygon points="16,35 13,37 16,39" fill="#0f172a" />
      <line x1="22" y1="46" x2="25" y2="52" stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round" />

      {/* Blade 2 (Right) */}
      <path d="M48 24 L42 46 L44 48 L50 26 Z" fill="#94a3b8" />
      <polygon points="49,28 52,30 49,32" fill="#0f172a" />
      <polygon points="48,35 51,37 48,39" fill="#0f172a" />
      <line x1="42" y1="46" x2="39" y2="52" stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round" />

      {/* Bare Muscular Torso */}
      <rect x="24" y="34" width="16" height="19" rx="3" fill="#fed7aa" />
      {/* Pectoral & ab definition */}
      <path d="M26 38 Q32 40 38 38" fill="none" stroke="#d97706" strokeWidth="0.8" />
      <line x1="32" y1="38" x2="32" y2="46" stroke="#d97706" strokeWidth="0.8" />
      <line x1="28" y1="42" x2="36" y2="42" stroke="#d97706" strokeWidth="0.8" />
      {/* Dark fur pelt waistband */}
      <rect x="23" y="46" width="18" height="6" rx="2" fill="#475569" stroke="#334155" strokeWidth="0.8" />

      {/* Grey Wild Boar Mask */}
      <ellipse cx="32" cy="22" rx="11" ry="10" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
      {/* Boar Ears */}
      <polygon points="21,16 23,8 26,14" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />
      <polygon points="43,16 41,8 38,14" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />
      <polygon points="22.5,14 23.5,10 25,13" fill="#f43f5e" />
      <polygon points="41.5,14 40.5,10 39,13" fill="#f43f5e" />

      {/* Round Vivid Blue Boar Eyes */}
      <circle cx="27" cy="21" r="2.2" fill="#0284c7" />
      <circle cx="27" cy="21" r="1.1" fill="#082f49" />
      <circle cx="27.4" cy="20.5" r="0.6" fill="#ffffff" />

      <circle cx="37" cy="21" r="2.2" fill="#0284c7" />
      <circle cx="37" cy="21" r="1.1" fill="#082f49" />
      <circle cx="37.4" cy="20.5" r="0.6" fill="#ffffff" />

      {/* Pink Boar Snout */}
      <ellipse cx="32" cy="25" rx="3.5" ry="2.2" fill="#fda4af" stroke="#f43f5e" strokeWidth="0.6" />
      <circle cx="30.8" cy="25" r="0.7" fill="#881337" />
      <circle cx="33.2" cy="25" r="0.7" fill="#881337" />

      {/* White Tusks */}
      <polygon points="28,26 26,30 29,28" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
      <polygon points="36,26 38,30 35,28" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#0284c7" className="animate-ping" opacity="0.85" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
