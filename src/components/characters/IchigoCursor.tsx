'use client';

import React from 'react';

export default function IchigoCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(234,88,12,0.55)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.08) rotate(3deg)' : 'scale(1)',
      }}
      aria-label="Ichigo anime cursor"
    >
      <defs>
        <radialGradient id="ichigoAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#dc2626" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Getsuga Tensho Spiritual Pressure Aura */}
      <circle cx="32" cy="32" r="28" fill="url(#ichigoAura)" className="animate-pulse" />

      {/* Giant Cleaver Blade (Zangetsu) on back */}
      <path d="M42 12 L50 46 L45 48 L39 16 Z" fill="#09090b" stroke="#cbd5e1" strokeWidth="1" />
      {/* Blade edge silver shine */}
      <line x1="48" y1="18" x2="44" y2="46" stroke="#f8fafc" strokeWidth="1.2" />
      {/* Cloth wrap bandage on hilt */}
      <line x1="42" y1="12" x2="46" y2="8" stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round" />

      {/* Black Shihakusho Shinigami Robe */}
      <rect x="23" y="33" width="18" height="20" rx="3" fill="#09090b" />
      {/* White inner lining */}
      <path d="M28 33 L32 42 L36 33 Z" fill="#f8fafc" />
      <path d="M30 35 L32 40 L34 35 Z" fill="#fed7aa" />
      {/* White cloth belt */}
      <rect x="23" y="44" width="18" height="3" fill="#f8fafc" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Vivid Spiky Bright Orange Hair */}
      <path
        d="M20 19 L15 13 L22 14 L24 7 L29 12 L33 5 L37 10 L43 7 L42 15 L48 13 L43 20 Z"
        fill="#ea580c"
      />
      <path d="M23 18 Q32 21 41 18 Q32 17 23 18 Z" fill="#c2410c" />

      {/* Sharp brown eyes and scowl */}
      <circle cx="28" cy="23" r="1.3" fill="#78350f" />
      <circle cx="36" cy="23" r="1.3" fill="#78350f" />
      <line x1="26" y1="20" x2="29" y2="21.5" stroke="#431407" strokeWidth="1.1" />
      <line x1="38" y1="20" x2="35" y2="21.5" stroke="#431407" strokeWidth="1.1" />
      <line x1="30" y1="28" x2="34" y2="28" stroke="#431407" strokeWidth="0.9" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#ea580c" className="animate-ping" opacity="0.85" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
