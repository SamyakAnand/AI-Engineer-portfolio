'use client';

import React from 'react';

export default function BrandLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_0_14px_rgba(168,85,247,0.65)] transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="sa-gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="sa-gradient-core" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <filter id="sa-purple-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Hex Shield */}
        <polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          stroke="url(#sa-gradient-purple)"
          strokeWidth="3.5"
          fill="#0a0618"
          fillOpacity="0.88"
          strokeLinejoin="round"
        />

        {/* Inner Cyber Circuit Accent */}
        <polygon
          points="50,17 78,33 78,67 50,83 22,67 22,33"
          stroke="#c084fc"
          strokeWidth="1.2"
          strokeDasharray="4 2"
          fill="none"
          opacity="0.45"
        />

        {/* Stylized Interlocking Monogram 'S' & 'A' */}
        {/* 'S' Flow */}
        <path
          d="M 64 34 C 64 30 58 27 50 27 C 39 27 34 32 34 38 C 34 47 66 45 66 56 C 66 65 59 70 48 70 C 37 70 32 65 32 60"
          stroke="url(#sa-gradient-purple)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#sa-purple-glow)"
        />

        {/* 'A' Apex & Crossbar Beam */}
        <path
          d="M 50 27 L 68 73 M 50 27 L 32 73"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="39"
          y1="54"
          x2="61"
          y2="54"
          stroke="#c084fc"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#sa-purple-glow)"
        />

        {/* Center Intelligence Core Node */}
        <circle cx="50" cy="50" r="4.2" fill="#c084fc" filter="url(#sa-purple-glow)" />
        <circle cx="50" cy="50" r="1.8" fill="#ffffff" />

        {/* Vertex Tech Dots */}
        <circle cx="50" cy="6" r="2" fill="#c084fc" />
        <circle cx="88" cy="28" r="2" fill="#a855f7" />
        <circle cx="88" cy="72" r="2" fill="#818cf8" />
        <circle cx="50" cy="94" r="2" fill="#c084fc" />
        <circle cx="12" cy="72" r="2" fill="#a855f7" />
        <circle cx="12" cy="28" r="2" fill="#818cf8" />
      </svg>
    </div>
  );
}
