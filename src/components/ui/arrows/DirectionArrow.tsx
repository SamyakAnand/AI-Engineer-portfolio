'use client';

import { useState } from 'react';

interface DirectionArrowProps {
  /** Direction: 'up', 'right', 'down', 'left' */
  direction: 'up' | 'right' | 'down' | 'left';
  /** Optional click handler */
  onClick?: () => void;
  /** Accessible label */
  'aria-label'?: string;
  /** Hover animation variant */
  variant?: 'default' | 'hover-glow' | 'stroke-draw';
  className?: string;
  style?: React.CSSProperties;
}

const directionMap = {
  up: '↑',
  right: '→',
  down: '↓',
  left: '←',
};

export function DirectionArrow({
  direction,
  onClick,
  'aria-label': ariaLabel,
  variant = 'default',
  className = '',
  style,
}: DirectionArrowProps) {
  const [hovered, setHovered] = useState(false);
  const [drawn, setDrawn] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (variant === 'stroke-draw') {
      // Trigger stroke drawing animation
      const timer = setTimeout(() => setDrawn(true), 30);
      return () => clearTimeout(timer);
    }
  };

  if (variant === 'stroke-draw') {
    // Handle cleanup
    const cleanup = handleMouseEnter();
  }

  const handleMouseLeave = () => {
    setHovered(false);
    if (variant === 'stroke-draw') {
      setDrawn(false);
    }
  };

  const baseClasses =
    'inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]';

  const variantClasses =
    variant === 'hover-glow'
      ? 'hover:opacity-85 hover:bg-[rgba(124,58,237,.08)] rounded-lg transition-all duration-300'
      : variant === 'stroke-draw'
      ? 'group'
      : '';

  const arrow = directionMap[direction];

  if (variant === 'stroke-draw') {
    return (
      <a
        href={onClick ? '#' : undefined}
        onClick={onClick ?? undefined}
        aria-label={ariaLabel ?? `Navigate ${direction}`}
        className={`${baseClasses} ${variantClasses} ${className}`}
        style={{
          ...style,
          display: 'inline-flex',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          background: hovered ? 'rgba(124,58,237,.1)' : 'transparent',
          border: '1px solid rgba(124,58,237,.35)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{
            transform: drawn ? 'none' : 'scale(1)',
            transition: 'transform 0.3s ease, stroke-dashoffset 0.3s ease',
            stroke: 'var(--accent)',
            fill: 'none',
            strokeWidth: 2.5,
            strokeDasharray: '12px',
            strokeDashoffset: drawn ? '12px' : '0',
          }}
        >
          {arrow}
        </span>
        <span className="text-sm font-medium text-[#c8c6cc]">
          {onClick ? 'Action' : direction}
        </span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? `Move ${direction}`}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{
        ...style,
        display: 'inline-flex',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: 'var(--radius-md)',
        background: hovered ? 'rgba(124,58,237,.1)' : 'transparent',
        border: '1px solid rgba(124,58,237,.35)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="text-lg transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
        style={{
          transform: hovered ? 'translate(-2px, -2px)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        {arrow}
      </span>
      <span className="text-sm font-medium text-[#c8c6cc]">
        {onClick ? 'Action' : direction}
      </span>
    </button>
  );
}
