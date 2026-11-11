'use client';

import React from 'react';

export default function TanjiroCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(5,150,105,0.5)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.08) rotate(3deg)' : 'scale(1)',
      }}
      aria-label="Tanjiro anime cursor"
    >
      <defs>
        <radialGradient id="waterAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#059669" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Water Breathing Crest Aura */}
      <circle cx="32" cy="32" r="28" fill="url(#waterAura)" className="animate-pulse" />

      {/* Water Breathing Wave Splash */}
      <path
        d="M12 44 Q18 36 26 40 Q34 32 44 38 Q52 30 56 36"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 45 Q20 38 28 42 Q36 34 46 40"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Checkered Green & Black Haori */}
      <g>
        <rect x="23" y="34" width="18" height="19" rx="3" fill="#09090b" />
        {/* Checkers */}
        <rect x="23" y="34" width="4.5" height="4.5" fill="#15803d" />
        <rect x="32" y="34" width="4.5" height="4.5" fill="#15803d" />
        <rect x="27.5" y="38.5" width="4.5" height="4.5" fill="#15803d" />
        <rect x="36.5" y="38.5" width="4.5" height="4.5" fill="#15803d" />
        <rect x="23" y="43" width="4.5" height="4.5" fill="#15803d" />
        <rect x="32" y="43" width="4.5" height="4.5" fill="#15803d" />
        <rect x="27.5" y="47.5" width="4.5" height="4.5" fill="#15803d" />
        <rect x="36.5" y="47.5" width="4.5" height="4.5" fill="#15803d" />
      </g>
      {/* White chest wrap / Demon Slayer Corps collar */}
      <path d="M29 34 L32 39 L35 34 Z" fill="#fed7aa" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Forehead Demon Slayer Scar */}
      <path d="M27 15 Q29 18 28 20 Q26 18 27 15" fill="#881337" />

      {/* Dark Burgundy Swept-Back Spiky Hair */}
      <path
        d="M21 20 C20 12 25 8 32 8 C39 8 44 12 43 20 C40 16 36 15 32 15 C28 15 24 16 21 20 Z"
        fill="#881337"
      />
      <path d="M22 17 L19 12 L24 14 Z" fill="#4c0519" />
      <path d="M26 12 L28 6 L32 10 Z" fill="#881337" />
      <path d="M34 10 L38 6 L39 12 Z" fill="#4c0519" />
      <path d="M41 14 L46 12 L43 17 Z" fill="#881337" />

      {/* Hanafuda Earrings */}
      <rect x="21" y="24" width="2" height="5" fill="#ffffff" stroke="#991b1b" strokeWidth="0.5" />
      <circle cx="22" cy="25.5" r="0.6" fill="#dc2626" />
      <rect x="41" y="24" width="2" height="5" fill="#ffffff" stroke="#991b1b" strokeWidth="0.5" />
      <circle cx="42" cy="25.5" r="0.6" fill="#dc2626" />

      {/* Warm reddish-brown kind eyes */}
      <circle cx="28" cy="23" r="1.5" fill="#881337" />
      <circle cx="28.3" cy="22.5" r="0.6" fill="#ffffff" />
      <circle cx="36" cy="23" r="1.5" fill="#881337" />
      <circle cx="36.3" cy="22.5" r="0.6" fill="#ffffff" />
      <path d="M29 28 Q32 29.5 35 28" fill="none" stroke="#78350f" strokeWidth="0.9" strokeLinecap="round" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#059669" className="animate-ping" opacity="0.85" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
