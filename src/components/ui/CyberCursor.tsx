'use client';

import React, { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable for non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Core Dot */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovering ? 0 : 1})`,
        }}
      />

      {/* Cyber Reticle Follower */}
      <div
        className={`fixed w-8 h-8 -ml-4 -mt-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
          isHovering
            ? 'border-sky-400 scale-150 bg-sky-500/10 shadow-[0_0_20px_rgba(139,92,246,0.6)]'
            : 'border-white/30 scale-100'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {/* Reticle tick marks */}
        <div className="absolute top-0 w-1 h-0.5 bg-sky-400" />
        <div className="absolute bottom-0 w-1 h-0.5 bg-sky-400" />
        <div className="absolute left-0 w-0.5 h-1 bg-sky-400" />
        <div className="absolute right-0 w-0.5 h-1 bg-sky-400" />
      </div>
    </div>
  );
}
