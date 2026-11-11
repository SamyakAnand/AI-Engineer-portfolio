'use client';

import React from 'react';

export default function GonCursor({ isMoving = false }: { isMoving?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(22,163,74,0.5)] transition-transform duration-200"
      style={{
        transform: isMoving ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
      }}
      aria-label="Gon anime cursor"
    >
      <defs>
        <radialGradient id="gonNen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Jajanken Golden Nen Aura on Fist */}
      <circle cx="44" cy="42" r="14" fill="url(#gonNen)" className="animate-pulse" />
      <circle cx="44" cy="42" r="6" fill="#facc15" className="animate-ping" opacity="0.75" />

      {/* Body / Green Adventure Jacket with Red Trim */}
      <rect x="24" y="34" width="16" height="19" rx="3" fill="#15803d" />
      {/* Red collar and center trim */}
      <rect x="31" y="34" width="2" height="19" fill="#dc2626" />
      <polygon points="27,34 32,38 37,34" fill="#fed7aa" />
      {/* White undershirt */}
      <rect x="29.5" y="36" width="5" height="3" fill="#ffffff" />

      {/* Head */}
      <circle cx="32" cy="24" r="10" fill="#fed7aa" />

      {/* Tall Upright Spiky Dark Green/Black Hair */}
      <path
        d="M22 22 L20 12 L24 16 L27 8 L31 15 L32 4 L35 14 L39 7 L41 16 L44 11 L42 22 Z"
        fill="#052e16"
        stroke="#15803d"
        strokeWidth="0.8"
      />

      {/* Big Bright Hazel Eyes & Confident Grin */}
      <ellipse cx="28" cy="24" rx="2" ry="2.5" fill="#78350f" />
      <circle cx="28.5" cy="23.2" r="0.8" fill="#ffffff" />
      <ellipse cx="36" rx="2" ry="2.5" cy="24" fill="#78350f" />
      <circle cx="36.5" cy="23.2" r="0.8" fill="#ffffff" />

      <path d="M29 28 Q32 31 35 28" fill="none" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />

      {/* Jajanken Charged Fist */}
      <circle cx="44" cy="42" r="4.5" fill="#fed7aa" stroke="#ca8a04" strokeWidth="1" />

      {/* Pointer anchor mark */}
      <circle cx="10" cy="10" r="3" fill="#16a34a" className="animate-ping" opacity="0.85" />
      <circle cx="10" cy="10" r="2" fill="#ffffff" />
    </svg>
  );
}
