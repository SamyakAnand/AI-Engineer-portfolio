'use client';

import React from 'react';

export default function NarutoCursor({ isMoving = false, inShowdown = false }: { isMoving?: boolean; inShowdown?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-13 h-13 drop-shadow-[0_4px_14px_rgba(249,115,22,0.6)] transition-transform duration-200"
      style={{
        transform: inShowdown
          ? 'scale(1.22) rotate(6deg)'
          : isMoving
          ? 'scale(1.1) rotate(4deg)'
          : 'scale(1)',
      }}
      aria-label="Naruto hero anime cursor"
    >
      <defs>
        <radialGradient id="narutoAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rasenganGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Hero Nine-Tails / Sage Chakra Aura */}
      <circle cx="32" cy="32" r="29" fill="url(#narutoAura)" className="animate-pulse" />

      {/* Rasengan Sphere in hand */}
      <g transform="translate(44, 38)">
        <circle cx="0" cy="0" r="9" fill="url(#rasenganGlow)" className="animate-spin" />
        {/* Spiral Chakra filaments */}
        <path d="M-6 0 C-4 -5 4 -5 6 0 C4 5 -4 5 -6 0" fill="none" stroke="#e0f2fe" strokeWidth="1.2" />
        <path d="M0 -6 C5 -4 5 4 0 6 C-5 4 -5 -4 0 -6" fill="none" stroke="#bae6fd" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
      </g>

      {/* Body / Orange & Black Jumpsuit */}
      <rect x="23" y="34" width="18" height="19" rx="3" fill="#f97316" />
      {/* Black shoulders and collar */}
      <path d="M23 34 L28 42 L36 42 L41 34 Z" fill="#18181b" />
      {/* White neck fur collar */}
      <ellipse cx="32" cy="34" rx="8" ry="2.5" fill="#f1f5f9" />
      {/* Uzumaki red swirl seal */}
      <circle cx="32" cy="46" r="3" fill="none" stroke="#dc2626" strokeWidth="1.2" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Whisker marks (3 on each cheek) */}
      <line x1="24" y1="23" x2="27" y2="22.5" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="24" y1="25" x2="27" y2="25" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="24.5" y1="27" x2="27.5" y2="27.5" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />

      <line x1="40" y1="23" x2="37" y2="22.5" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="40" y1="25" x2="37" y2="25" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="39.5" y1="27" x2="36.5" y2="27.5" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />

      {/* Blue determined eyes & mouth */}
      <circle cx="28" cy="23" r="1.5" fill="#0284c7" />
      <circle cx="28.2" cy="22.8" r="0.6" fill="#ffffff" />
      <circle cx="36" cy="23" r="1.5" fill="#0284c7" />
      <circle cx="36.2" cy="22.8" r="0.6" fill="#ffffff" />
      <path d="M29 28 Q32 30 35 28" fill="none" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />

      {/* Headband - Navy fabric with Silver leaf plate */}
      <rect x="22" y="16" width="20" height="4.5" rx="1.5" fill="#1e3a8a" />
      <rect x="26.5" y="16.5" width="11" height="3.5" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
      {/* Konoha leaf spiral mark */}
      <circle cx="32" cy="18.2" r="0.9" fill="#1e293b" />
      <path d="M32 17.5 Q33.5 17 34 18.2" fill="none" stroke="#1e293b" strokeWidth="0.6" />

      {/* Spiky Bright Yellow Hair */}
      <path
        d="M21 16 L17 11 L23 13 L24 7 L29 11 L32 5 L35 11 L40 7 L41 13 L47 11 L43 16 Z"
        fill="#facc15"
        stroke="#eab308"
        strokeWidth="0.6"
      />

      {/* Hero Badge Flag */}
      <g transform="translate(18, 48)">
        <rect x="0" y="0" width="12" height="4.5" rx="1.5" fill="#f97316" />
        <text x="6" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="3" fontWeight="900" letterSpacing="0.05em">
          HERO
        </text>
      </g>

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3.5" fill="#38bdf8" className="animate-ping" opacity="0.9" />
      <circle cx="10" cy="10" r="2.2" fill="#ffffff" />
    </svg>
  );
}
