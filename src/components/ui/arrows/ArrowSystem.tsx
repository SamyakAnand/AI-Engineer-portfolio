'use client';

import { useState } from 'react';

interface DirectionArrowProps {
  direction: 'up' | 'right' | 'down' | 'left';
  onClick?: () => void;
  'aria-label'?: string;
  variant?: 'default' | 'hover-glow' | 'stroke-draw';
  className?: string;
  children?: React.ReactNode;
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
  children,
}: DirectionArrowProps) {
  const [hovered, setHovered] = useState(false);

  const baseClasses =
    'inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]';

  const variantClasses =
    variant === 'hover-glow'
      ? 'hover:opacity-85 hover:bg-[rgba(124,58,237,.08)] rounded-lg transition-all duration-300'
      : '';

  const arrow = directionMap[direction];

  if (variant === 'stroke-draw') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? `Navigate ${direction}`}
        className={`${baseClasses} ${variantClasses} ${className}`}
        style={{
          display: 'inline-flex',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          background: hovered ? 'rgba(124,58,237,.12)' : 'transparent',
          border: '1px solid rgba(124,58,237,.4)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className="text-xl transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
          style={{
            transform: hovered ? 'translate(-1px, -1px)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          {arrow}
        </span>
        {children ?? (
          <span className="text-sm font-medium text-[#c8c6cc]">
            {onClick ? 'Action' : direction}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? `Move ${direction}`}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{
        display: 'inline-flex',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: 'var(--radius-md)',
        background: hovered ? 'rgba(124,58,237,.12)' : 'transparent',
        border: '1px solid rgba(124,58,237,.4)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="text-lg transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
        style={{
          transform: hovered ? 'translate(-1px, -1px)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        {arrow}
      </span>
      {children ?? (
        <span className="text-sm font-medium text-[#c8c6cc]">
          {onClick ? 'Action' : direction}
        </span>
      )}
    </button>
  );
}

export function ArrowUp({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <DirectionArrow direction="up" onClick={onClick} variant="hover-glow" className={className}>
      {children}
    </DirectionArrow>
  );
}

export function ArrowRight({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <DirectionArrow direction="right" onClick={onClick} variant="hover-glow" className={className}>
      {children}
    </DirectionArrow>
  );
}
