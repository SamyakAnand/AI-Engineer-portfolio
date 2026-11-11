'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CursorSystem from '@/components/cursor/CursorSystem';

// Scene 02 — Creation Studio.
// Four simulated agents each assemble a floating control panel and draw
// selection/connection arrows while the page scrolls.
export default function CreationStudioScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    // Cursor stage — the four agents become the main action as the user scrolls
    // past the initialization disc into the studio.
    const cursorTrigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 88%',
      end: 'top 100%',
      scrub: 1.2,
    });

    // Panel assembly — a single base panel slides down and typographic elements
    // stack into position, then the four cursors animate in around it.
    const panels = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 94%',
        end: 'top 100%',
        scrub: 1.3,
      },
    });

    panels
      .fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.inOut' },
        0
      )
      .fromTo(
        root,
        { y: 24 },
        { y: 0, duration: 1.2, ease: 'power2.out' },
        0
      )
      .fromTo(
        root,
        { background: '#0a0a0f' },
        { background: '#0e0e1a', duration: 1.2, ease: 'none' },
        0
      );

    return () => {
      cursorTrigger.kill();
      panels.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-[86vh] overflow-hidden bg-bg"
      style={{
        background:
          'radial-gradient(110% 90% at 50% 50%, #10101c 0%, #0a0a0f 55%, #06060b 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Six floating control nodes in the corners — selection points. */}
        {[
          { top: 12, right: 14 },
          { top: 30, right: 12 },
          { top: 14, right: 30 },
          { top: 12, right: 46 },
          { top: 30, right: 46 },
          { top: 44, right: 30 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full border border-white/10"
            style={{ ...p, backgroundColor: '#7c3aed', boxShadow: '0 0 8px rgba(124,58,237,.4)' }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-5 py-12 text-center">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">
          Creation studio
        </p>
        <h2 className="mt-2 font-sans text-2xl sm:text-3xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Four agents
          </span>
          <br />
          construct this page.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-text-dim">
          Designer, architect, engineer, and an AI agent — each on its own timeline,
          synchronized to the scroll.
        </p>
      </div>

      {/* Live cursor system */}
      <CursorSystem />
    </div>
  );
}
