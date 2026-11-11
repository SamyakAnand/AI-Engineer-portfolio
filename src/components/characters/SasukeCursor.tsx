'use client';

import React from 'react';

export default function SasukeCursor({ isMoving = false, inShowdown = false }: { isMoving?: boolean; inShowdown?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-13 h-13 drop-shadow-[0_4px_14px_rgba(129,140,248,0.6)] transition-transform duration-200"
      style={{
        transform: inShowdown
          ? 'scale(1.22) rotate(-6deg)'
          : isMoving
          ? 'scale(1.1) rotate(-4deg)'
          : 'scale(1)',
      }}
      aria-label="Sasuke villain anime cursor"
    >
      <defs>
        <radialGradient id="sasukeAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#4338ca" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="chidoriGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#c084fc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Villain Susanoo / Dark Lightning Aura */}
      <circle cx="32" cy="32" r="29" fill="url(#sasukeAura)" className="animate-pulse" />

      {/* Chidori Lightning Blade in hand */}
      <g transform="translate(18, 38)">
        <circle cx="0" cy="0" r="8" fill="url(#chidoriGlow)" className="animate-spin" />
        {/* Crackling lightning sparks */}
        <polyline points="-8,-4 -3,0 -6,5 2,-2 0,6 6,-1" stroke="#e0e7ff" strokeWidth="1.4" fill="none" />
        <polyline points="-4,-6 1,-1 -2,4 5,1" stroke="#c084fc" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
      </g>

      {/* High-Collar Uchiha Robe */}
      <rect x="23" y="34" width="18" height="19" rx="3" fill="#1e1b4b" />
      {/* High popped collar */}
      <path d="M21 28 L25 36 L39 36 L43 28 Z" fill="#312e81" stroke="#4338ca" strokeWidth="0.8" />
      {/* Purple rope belt (shimenawa) */}
      <rect x="22" y="44" width="20" height="3.5" rx="1" fill="#7c3aed" />

      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="#fed7aa" />

      {/* Spiky Jet-Black Hair with long bangs framing face */}
      {/* Back hair spikes */}
      <path
        d="M20 18 L15 10 L22 12 L24 5 L30 10 L34 4 L38 9 L45 6 L43 14 L49 11 L44 19 Z"
        fill="#09090b"
      />
      {/* Front long bangs framing cheeks */}
      <path d="M22 17 Q24 25 25 29 Q27 25 28 20 Z" fill="#18181b" />
      <path d="M42 17 Q40 25 39 29 Q37 25 36 20 Z" fill="#18181b" />
      <path d="M27 16 Q32 19 37 16 Q32 17 27 16 Z" fill="#18181b" />

      {/* EYES: DUAL DO-JUTSU */}
      {/* Right Eye: Crimson Sharingan (with Tomoe) */}
      <circle cx="28" cy="23" r="1.8" fill="#dc2626" />
      <circle cx="28" cy="23" r="0.7" fill="#000000" />
      <circle cx="27.4" cy="22.2" r="0.35" fill="#000000" />
      <circle cx="28.6" cy="22.5" r="0.35" fill="#000000" />

      {/* Left Eye: Violet Rinnegan (Concentric Rings) */}
      <circle cx="36" cy="23" r="1.8" fill="#a855f7" />
      <circle cx="36" cy="23" r="1.2" fill="none" stroke="#4c1d95" strokeWidth="0.4" />
      <circle cx="36" cy="23" r="0.6" fill="#4c1d95" />

      {/* Stoic mouth */}
      <line x1="30" y1="28" x2="34" y2="28" stroke="#312e81" strokeWidth="0.9" strokeLinecap="round" />

      {/* Villain Badge Flag */}
      <g transform="translate(34, 48)">
        <rect x="0" y="0" width="14" height="4.5" rx="1.5" fill="#6366f1" />
        <text x="7" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="3" fontWeight="900" letterSpacing="0.05em">
          VILLAIN
        </text>
      </g>

      {/* Pointer anchor mark */}
      <circle cx="54" cy="10" r="3.5" fill="#c084fc" className="animate-ping" opacity="0.9" />
      <circle cx="54" cy="10" r="2.2" fill="#ffffff" />
    </svg>
  );
}
