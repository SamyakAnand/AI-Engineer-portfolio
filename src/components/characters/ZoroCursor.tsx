'use client';

import React from 'react';

export default function ZoroCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(34,197,94,0.5)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
      }}
      aria-label="Zoro anime cursor"
    >
      <defs>
        <radialGradient id="zoroAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#86efac" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura green glow */}
      <circle cx="32" cy="32" r="28" fill="url(#zoroAura)" className="animate-pulse" />

      {/* 3 Swords Silhouette */}
      {/* Katana 1 (mouth/hands crosswise) */}
      <line x1="12" y1="28" x2="52" y2="28" stroke="#f8fafc" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="28" x2="16" y2="28" stroke="#e2e8f0" strokeWidth="3" />
      {/* Gold tsuba */}
      <circle cx="16" cy="28" r="2" fill="#eab308" />

      {/* Katana 2 & 3 at hip */}
      <line x1="22" y1="44" x2="12" y2="56" stroke="#94a3b8" strokeWidth="2" />
      <line x1="24" y1="42" x2="14" y2="54" stroke="#a855f7" strokeWidth="2" />

      {/* Body / Dark Green Robe */}
      <rect x="23" y="34" width="18" height="19" rx="3" fill="#14532d" />
      {/* Light green haramaki waistband */}
      <rect x="23" y="42" width="18" height="6" fill="#4ade80" />
      {/* Muscular chest peek */}
      <path d="M28 34 L32 40 L36 34 Z" fill="#fed7aa" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Green spiky hair */}
      <path d="M21 21 C21 13 26 11 32 11 C38 11 43 13 43 21 C40 18 36 17 32 17 C28 17 24 18 21 21 Z" fill="#22c55e" />
      <path d="M20 18 L18 12 L24 15 Z" fill="#16a34a" />
      <path d="M26 13 L28 8 L32 12 Z" fill="#22c55e" />
      <path d="M34 12 L38 8 L40 14 Z" fill="#16a34a" />
      <path d="M42 16 L46 12 L44 19 Z" fill="#22c55e" />

      {/* Eyes & Serious Brows */}
      <line x1="26" y1="19" x2="30" y2="21" stroke="#14532d" strokeWidth="1.2" />
      <line x1="38" y1="19" x2="34" y2="21" stroke="#14532d" strokeWidth="1.2" />
      {/* Right eye open */}
      <circle cx="28.5" cy="22" r="1.2" fill="#18181b" />
      {/* Left eye scar (closed) */}
      <line x1="34" y1="19.5" x2="37" y2="24.5" stroke="#991b1b" strokeWidth="1.4" />

      {/* Three gold earrings left ear */}
      <circle cx="42.5" cy="23" r="1" fill="#eab308" />
      <circle cx="43" cy="25" r="1" fill="#eab308" />
      <circle cx="43.5" cy="27" r="1" fill="#eab308" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#22c55e" className="animate-ping" opacity="0.8" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
