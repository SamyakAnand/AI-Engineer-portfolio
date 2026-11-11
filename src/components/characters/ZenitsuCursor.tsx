'use client';

import React from 'react';

export default function ZenitsuCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_14px_rgba(250,204,21,0.6)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.15) rotate(6deg)' : 'scale(1)',
      }}
      aria-label="Zenitsu anime cursor"
    >
      <defs>
        <radialGradient id="thunderAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#facc15" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Thunder Breathing Lightning Burst */}
      <circle cx="32" cy="32" r="28" fill="url(#thunderAura)" className="animate-pulse" />

      {/* Lightning Strike Zigzags */}
      <polyline points="8,30 16,36 12,44 20,48" stroke="#facc15" strokeWidth="1.8" fill="none" className="animate-ping" opacity="0.9" />
      <polyline points="56,26 48,34 52,42 44,46" stroke="#fef08a" strokeWidth="1.8" fill="none" className="animate-ping" opacity="0.9" />

      {/* Yellow Triangle Pattern Haori */}
      <rect x="23" y="34" width="18" height="19" rx="3" fill="#facc15" />
      {/* White Triangles */}
      <polygon points="26,38 28,35 30,38" fill="#ffffff" />
      <polygon points="34,38 36,35 38,38" fill="#ffffff" />
      <polygon points="30,44 32,41 34,44" fill="#ffffff" />
      <polygon points="26,50 28,47 30,50" fill="#ffffff" />
      <polygon points="34,50 36,47 38,50" fill="#ffffff" />
      {/* White belt */}
      <rect x="23" y="45" width="18" height="2.5" fill="#ffffff" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Jagged Yellow/Orange Hair with Square Ends */}
      <path
        d="M21 21 L17 14 L22 15 L23 8 L28 13 L32 6 L36 13 L41 7 L42 16 L47 13 L43 21 Z"
        fill="#facc15"
        stroke="#f59e0b"
        strokeWidth="0.8"
      />
      {/* Orange tips */}
      <path d="M17 14 L20 17 L22 15 Z" fill="#f97316" />
      <path d="M23 8 L26 12 L28 13 Z" fill="#f97316" />
      <path d="M32 6 L34 11 L36 13 Z" fill="#f97316" />
      <path d="M41 7 L41 12 L42 16 Z" fill="#f97316" />
      <path d="M47 13 L44 18 L43 21 Z" fill="#f97316" />

      {/* Sleeping / Focused Eyes (Slits with Lightning) */}
      <line x1="26" y1="23" x2="30" y2="23" stroke="#854d0e" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="34" y1="23" x2="38" y2="23" stroke="#854d0e" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="30" y1="27" x2="34" y2="27" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />

      {/* Thunder sparks on cheeks */}
      <circle cx="25" cy="25" r="1" fill="#f59e0b" />
      <circle cx="39" cy="25" r="1" fill="#f59e0b" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#facc15" className="animate-ping" opacity="0.9" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
