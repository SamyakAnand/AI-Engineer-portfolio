'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useBuild } from './BuildContext';

const STAGE_SCROLL_TARGETS: Record<string, string> = {
  'nav-added': 'header',
  typography: 'home',
  'typography-edited': 'hero-typo',
  'portrait-drag': 'hero-portrait',
  'portrait-resize': 'hero-portrait',
  'supporting-added': 'hero-intro',
  'about-added': 'about',
  projects: 'work',
  'project-copied': 'project-card-argus',
  alignment: 'project-grid',
  skills: 'skills',
  experience: 'experience',
  education: 'education',
  contact: 'contact',
};

export default function AutoScrollTour() {
  const { stage, autoScroll, autoScrollSpeed, dispatch, skipRequested } = useBuild();
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInterrupted, setUserInterrupted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(autoScrollSpeed || 1.0);
  const userTimeoutRef = useRef<number | undefined>(undefined);
  const rafRef = useRef<number>(0);
  const isBuilding = stage !== 'complete' && !skipRequested;

  // 1. Follow construction stage down the page
  useEffect(() => {
    if (skipRequested) return;
    const targetId = STAGE_SCROLL_TARGETS[stage];
    if (!targetId) return;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [stage, skipRequested]);

  // Handle user manual scroll interruption
  const handleUserScroll = useCallback(() => {
    if (!isPlaying) return;
    setUserInterrupted(true);
    if (userTimeoutRef.current) window.clearTimeout(userTimeoutRef.current);
    // Resume auto-scroll 4 seconds after user stops scrolling
    userTimeoutRef.current = window.setTimeout(() => {
      setUserInterrupted(false);
    }, 4000);
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      if (userTimeoutRef.current) window.clearTimeout(userTimeoutRef.current);
    };
  }, [handleUserScroll]);

  // 2. Smooth Auto-Scroll loop
  useEffect(() => {
    if (!isPlaying || userInterrupted) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const step = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;

      if (current >= maxScroll - 4) {
        // Reached end of page
        setIsPlaying(false);
        return;
      }

      const pixelStep = 0.85 * currentSpeed;
      window.scrollBy({ top: pixelStep, behavior: 'instant' });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, userInterrupted, currentSpeed]);

  const toggleAutoScroll = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      dispatch({ type: 'SET_AUTO_SCROLL', payload: next });
      setUserInterrupted(false);
      return next;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSpeed = (spd: number) => {
    setCurrentSpeed(spd);
    dispatch({ type: 'SET_AUTO_SCROLL_SPEED', payload: spd });
  };

  return (
    <aside
      className="fixed bottom-5 left-5 z-[8900] select-none"
      role="region"
      aria-label="Auto-scroll cinema controls"
    >
      <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-neutral-950/90 border border-white/15 text-white font-mono text-[10px] tracking-wider shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={toggleAutoScroll}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            isPlaying
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'bg-white/10 hover:bg-white/20 text-white/80'
          }`}
          aria-label={isPlaying ? 'Pause auto-scroll' : 'Start auto-scroll'}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying
                ? userInterrupted
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-emerald-400 animate-pulse'
                : 'bg-white/40'
            }`}
          />
          <span>
            {isPlaying
              ? userInterrupted
                ? 'PAUSED (SCROLLING)'
                : 'AUTO-SCROLL: ON'
              : 'AUTO-SCROLL'}
          </span>
        </button>

        {/* Speed Toggles */}
        {isPlaying && (
          <div className="flex items-center gap-1 border-l border-white/15 pl-2">
            {[
              { label: '0.6×', val: 0.6 },
              { label: '1.0×', val: 1.0 },
              { label: '1.8×', val: 1.8 },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSpeed(s.val)}
                className={`px-1.5 py-0.5 rounded text-[8px] transition-colors cursor-pointer ${
                  currentSpeed === s.val
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={scrollToTop}
          className="px-2 py-1 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white text-[9px] transition-colors cursor-pointer"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          ⤒ TOP
        </button>
      </div>
    </aside>
  );
}
