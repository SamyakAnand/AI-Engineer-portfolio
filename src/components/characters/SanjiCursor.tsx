'use client';

import React from 'react';

export default function SanjiCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(234,179,8,0.5)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.08) rotate(4deg)' : 'scale(1)',
      }}
      aria-label="Sanji anime cursor"
    >
      <defs>
        <radialGradient id="sanjiFlame" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#eab308" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Diable Jambe Fire Glow behind kicking leg */}
      <circle cx="24" cy="48" r="16" fill="url(#sanjiFlame)" className="animate-pulse" />

      {/* Black Suit Body */}
      <rect x="25" y="32" width="16" height="19" rx="3" fill="#0f172a" />
      {/* Blue shirt collar & black tie */}
      <path d="M30 32 L33 38 L36 32 Z" fill="#38bdf8" />
      <polygon points="32.5,33 33.5,33 34,39 33,42 32,39" fill="#020617" />

      {/* Diable Jambe Flame Leg (bent kick stance) */}
      <path d="M26 48 L18 54 L24 58" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      {/* Flame sparks */}
      <circle cx="16" cy="52" r="2.5" fill="#facc15" className="animate-ping" />
      <circle cx="14" cy="56" r="1.5" fill="#ef4444" />

      {/* Head */}
      <circle cx="33" cy="21" r="10" fill="#fed7aa" />

      {/* Blonde hair sweeping over right side */}
      <path
        d="M23 18 C25 10 33 10 41 12 C44 14 45 20 43 26 C41 27 38 28 35 25 C30 20 25 21 23 18 Z"
        fill="#facc15"
      />
      {/* Front bangs covering right eye */}
      <path d="M30 14 Q37 20 38 27 Q33 24 29 20 Z" fill="#eab308" />

      {/* Visible Left Eye & Curled Eyebrow */}
      <circle cx="28" cy="22" r="1.2" fill="#0f172a" />
      {/* Curled spiral eyebrow */}
      <path d="M25 19 C26 17 29 18 30 19" fill="none" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />
      <circle cx="25.2" cy="18.8" r="0.8" fill="#ca8a04" />

      {/* Cigarette with smoke trail */}
      <line x1="28" y1="26" x2="22" y2="28" stroke="#ffffff" strokeWidth="1.2" />
      <circle cx="21.5" cy="28.2" r="0.9" fill="#f97316" />
      <path d="M20 28 Q18 25 19 22 Q21 19 18 16" fill="none" stroke="rgba(241,245,249,0.7)" strokeWidth="0.9" strokeLinecap="round" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#eab308" className="animate-ping" opacity="0.8" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
