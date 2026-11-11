// Independent simulated agents that construct the page as the user scrolls.
// All motion is deterministic, timeline-driven (GSAP), and tied to scroll progress.
// No real users are implied.

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export type CursorId = 'designer' | 'architect' | 'engineer' | 'ai';

export interface CursorDef {
  id: CursorId;
  label: string;
  color: string;
  accent: string;
  cap: string; // envelope, relative 0..1
}

const CURSORS: CursorDef[] = [
  {
    id: 'designer',
    label: 'Designer',
    color: '#7c3aed',
    accent: '#7c3aed',
    cap: 'M6 0 C4 0 2 4 2 8 C2 12 6 12 6 12 C10 12 12 8 12 4 C12 1 6 1 6 0 Z',
  },
  {
    id: 'architect',
    label: 'Architect',
    color: '#6366f1',
    accent: '#6366f1',
    cap: 'M0 0 L12 0 L6 12 Z',
  },
  {
    id: 'engineer',
    label: 'Engineer',
    color: '#3b82f6',
    accent: '#3b82f6',
    cap: 'M0 4 L12 4 L6 14 Z',
  },
  {
    id: 'ai',
    label: 'AI Agent',
    color: '#f59e0b',
    accent: '#f59e0b',
    cap: 'M6 0 C3 0 0 4 0 8 C0 13 4 13 6 13 C8 13 12 9 12 5 C12 1 6 1 6 0 Z',
  },
];

interface CursorProps {
  def: CursorDef;
  progress: number;
}

function CursorCap({ d, color }: { d: string; color: string }) {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 12 12"
      fill="none"
      style={{ color }}
      aria-hidden="true"
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

export default function CursorSystem() {
  const progress = useScrollProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    // Ensure GSAP has the ScrollTrigger plugin available.
    if (process.env.NODE_ENV !== 'production') {
      // noop
    }
  }, []);

  if (!ready) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      aria-hidden="true"
    >
      {CURSORS.map((def) => (
        <Cursor key={def.id} def={def} progress={progress} />
      ))}
    </div>
  );
}

function Cursor({ def, progress }: CursorProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Auto-seed from the cursor id so each agent has its own autonomous rhythm.
    const seed = def.id.charCodeAt(0);
    let raf = 0;

    const loop = (now: number) => {
      const p = progress;

      // Autonomous sway + bob, independent of scroll.
      const sway = Math.sin(now * 0.008 + seed) * 4;
      const bob = Math.sin(now * 0.011 + seed * 2) * 2.5;

      // Scroll-driven posture: more expressive toward the end of the page.
      const posture = p * 0.08;

      gsap.set(el, {
        y: bob + (p - 0.5) * 6,
        rotation: sway * 0.4 + p * 2 - 1,
        scale: 0.96 + posture + Math.abs(Math.sin(now * 0.012)) * 0.03,
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [def, progress]);

  return (
    <div
      ref={elRef}
      className="pointer-events-none absolute rounded-full border border-white/10"
      style={{
        left: '50%',
        top: '50%',
        width: 22,
        height: 22,
        transform: 'translate(-50%, -50%)',
        cursor: 'none',
        zIndex: 9999,
      }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-black/30">
        <CursorCap d={def.cap} color={def.color} />
      </div>
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap">
        <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/80">
          {def.label}
        </span>
      </div>
    </div>
  );
}
