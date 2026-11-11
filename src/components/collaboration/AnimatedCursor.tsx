'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useBuild, type AgentDef } from './BuildContext';

interface AnimatedCursorProps {
  def: AgentDef;
  index: number;
  targetId: string;
  action: string;
  isActive: boolean;
  hideWhenOffscreen?: boolean;
}

// Staggered natural offsets so the 9-10 cursors don't stack on top of each other
const OFFSETS = [
  { x: -14, y: -20 },
  { x: 32, y: -16 },
  { x: -36, y: 22 },
  { x: 44, y: 28 },
  { x: -28, y: -36 },
  { x: 26, y: 44 },
  { x: -48, y: 12 },
  { x: 50, y: -28 },
  { x: 0, y: 38 },
  { x: -18, y: 46 },
];

export default function AnimatedCursor({
  def,
  index,
  targetId,
  action,
  isActive,
  hideWhenOffscreen = false,
}: AnimatedCursorProps) {
  const { drag } = useBuild();
  const [position, setPosition] = useState({
    x: 60 + (index % 5) * 160,
    y: 120 + Math.floor(index / 5) * 140,
  });
  const [arrived, setArrived] = useState(false);
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    const offset = OFFSETS[index % OFFSETS.length];

    const updatePosition = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        // Fallback default coordinates distributed along header/workspace
        const fallbackX = Math.round(80 + ((index * 140) % (window.innerWidth - 220)));
        const fallbackY = Math.round(140 + (index % 4) * 60);
        setPosition((old) =>
          Math.abs(old.x - fallbackX) < 2 && Math.abs(old.y - fallbackY) < 2
            ? old
            : { x: fallbackX, y: fallbackY }
        );
        setArrived(true);
        return;
      }

      const rect = target.getBoundingClientRect();
      const visible =
        rect.bottom > 20 &&
        rect.top < window.innerHeight - 20 &&
        rect.right > 0 &&
        rect.left < window.innerWidth;

      setInViewport(visible);

      const x = Math.min(
        window.innerWidth - 30,
        Math.max(16, rect.left + rect.width / 2 + offset.x)
      );
      const y = Math.min(
        window.innerHeight - 48,
        Math.max(20, rect.top + Math.min(rect.height / 2, 70) + offset.y)
      );

      setPosition((old) =>
        Math.abs(old.x - x) < 2 && Math.abs(old.y - y) < 2 ? old : { x, y }
      );
      setArrived(true);
    };

    updatePosition();
    const timer = window.setInterval(updatePosition, 100);
    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', updatePosition, { passive: true });

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [def.id, index, targetId]);

  const carriesGhost = drag.active && drag.agent === def.id;
  const ghostText =
    drag.kind === 'component'
      ? 'PORTRAIT COMPONENT'
      : drag.kind === 'copy'
      ? 'NEXUS → ARGUS COMPONENT'
      : 'SECTION ALIGNMENT';

  return (
    <div
      className={`collab-cursor${arrived ? ' is-arrived' : ''}${isActive ? ' is-active' : ''}`}
      style={
        {
          left: `${position.x}px`,
          top: `${position.y}px`,
          '--cursor-color': def.color,
          transitionDelay: `${(index % 4) * 20}ms`,
          visibility: hideWhenOffscreen && !inViewport ? 'hidden' : 'visible',
          pointerEvents: 'none',
        } as CSSProperties
      }
      data-agent={def.id}
      data-target={targetId}
    >
      {/* High-Precision SVG Pointer Arrow */}
      <span className="collab-cursor__pointer" aria-hidden="true">
        <svg viewBox="0 0 16 20" aria-hidden="true" className="w-[18px] h-[21px]">
          <path
            d="M0 0 L0 16 L4.2 12 L7.8 19.5 L10.8 18 L7.2 11 L12.8 11 Z"
            fill={def.color}
            stroke="#ffffff"
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Sleek Agent Label & Action */}
      <span
        className="collab-cursor__label"
        style={{
          borderLeftColor: def.color,
          borderLeftWidth: '2.5px',
        }}
      >
        {def.label}
      </span>
      {action && <span className="collab-cursor__action">{action}</span>}
      {carriesGhost && <span className="collab-cursor__ghost">{ghostText}</span>}
    </div>
  );
}
