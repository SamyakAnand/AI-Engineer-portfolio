'use client';

import React from 'react';

export default function KilluaCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_14px_rgba(103,232,249,0.6)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
      }}
      aria-label="Killua anime cursor"
    >
      <defs>
        <radialGradient id="godspeedAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Godspeed Electric Aura */}
      <circle cx="32" cy="32" r="28" fill="url(#godspeedAura)" className="animate-pulse" />

      {/* Kanmuru Lightning Bolts around silhouette */}
      <polyline points="10,22 18,28 14,36 22,40" stroke="#38bdf8" strokeWidth="1.5" fill="none" className="animate-ping" opacity="0.8" />
      <polyline points="54,18 46,24 50,32 42,38" stroke="#38bdf8" strokeWidth="1.5" fill="none" className="animate-ping" opacity="0.8" />
      <polyline points="20,52 26,46 24,58 32,54" stroke="#c084fc" strokeWidth="1.2" fill="none" />

      {/* Dark Purple Turtleneck & Loose White T-Shirt */}
      <rect x="23" y="34" width="18" height="19" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
      {/* Dark sky turtleneck collar */}
      <rect x="27" y="30" width="10" height="5" rx="1.5" fill="#3b0764" />
      {/* Dark blue shorts */}
      <rect x="24" y="49" width="16" height="5" fill="#1e3a8a" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Spiky Silver/White Fluffy Hair */}
      <path
        d="M20 19 L14 12 L21 14 L23 6 L28 12 L32 4 L36 11 L41 5 L43 13 L50 11 L44 19 Z"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="0.8"
      />
      {/* Soft silver bangs */}
      <path d="M22 18 Q27 24 28 20 Q32 25 36 20 Q37 24 42 18 Z" fill="#f1f5f9" />

      {/* Sharp Dark Blue / Cat Eyes */}
      <ellipse cx="28" cy="23" rx="1.6" ry="1.8" fill="#0284c7" />
      <circle cx="28.3" cy="22.5" r="0.6" fill="#ffffff" />
      <ellipse cx="36" cy="23" rx="1.6" ry="1.8" fill="#0284c7" />
      <circle cx="36.3" cy="22.5" r="0.6" fill="#ffffff" />

      {/* Sly assassin smile */}
      <path d="M29 27.5 Q32 29 35 27.5" fill="none" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#38bdf8" className="animate-ping" opacity="0.9" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
