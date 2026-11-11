'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  CHARACTERS,
  CHARACTER_IDS,
  UNIVERSE_PRESETS,
  type CharacterId,
  type CharacterDef,
} from './CharacterRegistry';
import CharacterCursor from './CharacterCursor';

interface AgentPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  facingLeft: boolean;
  isMoving: boolean;
  inShowdown: boolean;
  showdownTimer: number;
  burstTimer: number;
  burstActive: boolean;
  lostTimer: number;
  speechText: string | null;
  speechTimer: number;
}

export default function AnimeCursorManager() {
  const [presetKey, setPresetKey] = useState<string>('duel');
  const [activeIds, setActiveIds] = useState<CharacterId[]>(['naruto', 'sasuke']);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showdownCount, setShowdownCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const domRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const physicsRef = useRef<Record<string, AgentPhysics>>({});
  const userMouseRef = useRef({ x: -1000, y: -1000, lastMoved: 0 });
  const rafRef = useRef<number>(0);

  // Detect mobile & screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMinimized(true);
        if (presetKey === 'all') {
          setActiveIds(['naruto', 'sasuke']);
          setPresetKey('duel');
        }
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, [presetKey]);

  // Track user mouse to enable polite avoidance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      userMouseRef.current = { x: e.clientX, y: e.clientY, lastMoved: Date.now() };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize physics for characters
  const initPhysics = useCallback((ids: CharacterId[]) => {
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

    ids.forEach((id, index) => {
      const def = CHARACTERS[id];
      if (!def) return;

      const initX = (winW * def.initialPos.xPercent) / 100;
      const initY = (winH * def.initialPos.yPercent) / 100;

      physicsRef.current[id] = {
        x: initX,
        y: initY,
        vx: 0,
        vy: 0,
        targetX: initX + (Math.random() - 0.5) * 80,
        targetY: initY + (Math.random() - 0.5) * 60,
        facingLeft: id === 'sasuke',
        isMoving: false,
        inShowdown: false,
        showdownTimer: 0,
        burstTimer: 0,
        burstActive: false,
        lostTimer: 0,
        speechText: null,
        speechTimer: 0,
      };
    });
  }, []);

  // Change preset
  const handleSelectPreset = (key: string) => {
    setPresetKey(key);
    const preset = UNIVERSE_PRESETS[key];
    if (preset) {
      setActiveIds(preset.ids);
      initPhysics(preset.ids);
    }
  };

  // Trigger instant showdown
  const triggerClash = () => {
    if (!activeIds.includes('naruto') || !activeIds.includes('sasuke')) {
      handleSelectPreset('duel');
    }
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const midX = winW / 2;
    const midY = Math.min(winH / 2, 340);

    const naruto = physicsRef.current['naruto'];
    const sasuke = physicsRef.current['sasuke'];

    if (naruto && sasuke) {
      naruto.targetX = midX - 60;
      naruto.targetY = midY;
      naruto.inShowdown = true;
      naruto.showdownTimer = 220;
      naruto.speechText = 'SASUKE! RASENGAN!';
      naruto.speechTimer = 180;

      sasuke.targetX = midX + 60;
      sasuke.targetY = midY;
      sasuke.inShowdown = true;
      sasuke.showdownTimer = 220;
      sasuke.speechText = 'NARUTO! CHIDORI!';
      sasuke.speechTimer = 180;

      setShowdownCount((c) => c + 1);
    }
  };

  // Main high-performance Animation Loop
  useEffect(() => {
    initPhysics(activeIds);

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(48, time - lastTime) / 16.667; // normalized dt
      lastTime = time;

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const mouse = userMouseRef.current;
      const mouseActive = Date.now() - mouse.lastMoved < 2000;

      // Check Hero Portrait anchor in DOM for natural showdown positioning
      const heroPortraitEl = document.getElementById('hero-portrait');
      let portraitRect: DOMRect | null = null;
      if (heroPortraitEl) {
        const rect = heroPortraitEl.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < winH) {
          portraitRect = rect;
        }
      }

      // Check distance between Naruto and Sasuke for automatic dynamic showdown
      const narutoPhys = physicsRef.current['naruto'];
      const sasukePhys = physicsRef.current['sasuke'];
      if (narutoPhys && sasukePhys) {
        const dx = narutoPhys.x - sasukePhys.x;
        const dy = narutoPhys.y - sasukePhys.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && !narutoPhys.inShowdown && Math.random() < 0.015) {
          narutoPhys.inShowdown = true;
          narutoPhys.showdownTimer = 180;
          narutoPhys.speechText = 'RASENGAN! 🌀';
          narutoPhys.speechTimer = 140;

          sasukePhys.inShowdown = true;
          sasukePhys.showdownTimer = 180;
          sasukePhys.speechText = 'CHIDORI! ⚡';
          sasukePhys.speechTimer = 140;
          setShowdownCount((c) => c + 1);
        }
      }

      // Update each character physics
      activeIds.forEach((id) => {
        const phys = physicsRef.current[id];
        const def = CHARACTERS[id];
        const el = domRefs.current[id];
        if (!phys || !def || !el) return;

        if (isPaused) {
          // Keep stationary
          el.style.transform = `translate3d(${phys.x}px, ${phys.y}px, 0)`;
          return;
        }

        // Handle speech timer
        if (phys.speechTimer > 0) {
          phys.speechTimer -= 1;
          if (phys.speechTimer <= 0) phys.speechText = null;
        }

        // Handle showdown countdown
        if (phys.inShowdown) {
          phys.showdownTimer -= 1;
          if (phys.showdownTimer <= 0) {
            phys.inShowdown = false;
            // Separate after clash
            phys.targetX = id === 'naruto' ? winW * 0.2 : winW * 0.8;
            phys.targetY = winH * 0.35 + (Math.random() - 0.5) * 100;
          }
        }

        // Hero vs Villain special positioning when Hero section portrait is in view
        if (portraitRect && !phys.inShowdown) {
          if (id === 'sasuke' && Math.random() < 0.02) {
            // Sasuke hovers near villain side (left)
            phys.targetX = Math.max(30, portraitRect.left - 40);
            phys.targetY = portraitRect.top + portraitRect.height * 0.45;
          } else if (id === 'naruto' && Math.random() < 0.02) {
            // Naruto hovers near hero side (right)
            phys.targetX = Math.min(winW - 60, portraitRect.right + 40);
            phys.targetY = portraitRect.top + portraitRect.height * 0.45;
          }
        }

        // Autonomous target updates based on personality
        const distToTarget = Math.sqrt(
          Math.pow(phys.targetX - phys.x, 2) + Math.pow(phys.targetY - phys.y, 2)
        );

        if (distToTarget < 35 && !phys.inShowdown) {
          // Select new intelligent autonomous destination
          let paddingX = 60;
          let paddingY = 80;

          if (def.personality === 'burst') {
            // Zenitsu sleeps then sudden dash
            phys.burstTimer += 1;
            if (phys.burstTimer > 120) {
              phys.burstActive = true;
              phys.targetX = paddingX + Math.random() * (winW - paddingX * 2);
              phys.targetY = paddingY + Math.random() * (winH - paddingY * 2);
              phys.burstTimer = 0;
            }
          } else if (def.personality === 'deliberate') {
            // Zoro occasionally gets lost
            phys.lostTimer += 1;
            if (phys.lostTimer > 180) {
              // Wander completely off to an unexpected edge
              phys.targetX = Math.random() < 0.5 ? 40 : winW - 50;
              phys.targetY = 120 + Math.random() * (winH - 240);
              phys.speechText = 'Where are the others...?';
              phys.speechTimer = 110;
              phys.lostTimer = 0;
            } else {
              phys.targetX = paddingX + Math.random() * (winW - paddingX * 2);
              phys.targetY = paddingY + Math.random() * (winH - paddingY * 2);
            }
          } else if (def.personality === 'lightning') {
            // Killua fast zips
            phys.targetX = paddingX + Math.random() * (winW - paddingX * 2);
            phys.targetY = paddingY + Math.random() * (winH - paddingY * 2);
          } else {
            // General autonomous wander
            phys.targetX = paddingX + Math.random() * (winW - paddingX * 2);
            phys.targetY = paddingY + Math.random() * (winH - paddingY * 2);
          }
        }

        // User mouse avoidance: if cursor gets close (< 110px), steer away gently
        if (mouseActive) {
          const mdx = phys.x - mouse.x;
          const mdy = phys.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 110 && mdist > 0) {
            const pushFactor = (110 - mdist) * 0.12;
            phys.vx += (mdx / mdist) * pushFactor;
            phys.vy += (mdy / mdist) * pushFactor;
          }
        }

        // Spring / Lerp towards target
        const dx = phys.targetX - phys.x;
        const dy = phys.targetY - phys.y;

        let speedMultiplier = def.baseSpeed;
        if (phys.inShowdown) speedMultiplier = 1.6;
        if (def.personality === 'burst' && phys.burstActive) {
          speedMultiplier = 3.6;
          if (distToTarget < 40) phys.burstActive = false;
        }
        if (def.personality === 'lightning') speedMultiplier = 2.2;

        const accel = 0.035 * def.agility * speedMultiplier;
        phys.vx += dx * accel;
        phys.vy += dy * accel;

        // Damping / Friction
        const friction = 0.88;
        phys.vx *= friction;
        phys.vy *= friction;

        // Integrate position
        phys.x += phys.vx * dt;
        phys.y += phys.vy * dt;

        // Viewport boundaries
        const boundX = Math.max(30, Math.min(winW - 50, phys.x));
        const boundY = Math.max(40, Math.min(winH - 50, phys.y));
        if (boundX !== phys.x) phys.vx *= -0.5;
        if (boundY !== phys.y) phys.vy *= -0.5;
        phys.x = boundX;
        phys.y = boundY;

        // Facing direction
        if (Math.abs(phys.vx) > 0.3) {
          phys.facingLeft = phys.vx < 0;
        }

        phys.isMoving = Math.abs(phys.vx) > 0.4 || Math.abs(phys.vy) > 0.4;

        // Direct DOM update for 60fps buttery smoothness
        el.style.transform = `translate3d(${Math.round(phys.x)}px, ${Math.round(phys.y)}px, 0)`;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIds, isPaused, initPhysics]);

  return (
    <>
      {/* Anime Character Cursors Layer */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[8400] pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {activeIds.map((id) => {
          const def = CHARACTERS[id];
          if (!def) return null;
          const phys = physicsRef.current[id];

          return (
            <CharacterCursor
              key={id}
              ref={(node) => {
                domRefs.current[id] = node;
              }}
              def={def}
              isMoving={phys?.isMoving ?? false}
              facingLeft={phys?.facingLeft ?? false}
              inShowdown={phys?.inShowdown ?? false}
              statusText={def.role.split('·')[0].trim()}
              speechText={phys?.speechText ?? null}
            />
          );
        })}
      </div>

      {/* Floating Anime Control Pill & Showdown Dock */}
      <aside
        className="fixed bottom-5 right-5 z-[8900] select-none pointer-events-none"
        role="region"
        aria-label="Anime Character Cursor Controls"
      >
        <div className="pointer-events-auto">
        {isMinimized ? (
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 border border-orange-500/40 text-white font-mono text-[10px] tracking-widest shadow-2xl backdrop-blur-md hover:border-orange-500 transition-all cursor-pointer"
            aria-label="Expand Anime Character Controls"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>ANIME CURSORS ({activeIds.length})</span>
            <span className="text-white/40">↗</span>
          </button>
        ) : (
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-neutral-950/92 border border-white/12 text-white font-mono text-[10px] shadow-2xl backdrop-blur-md max-w-[320px]">
            {/* Header / Brand */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse" />
                <span className="font-bold tracking-wider text-[11px] text-white">
                  ANIME ECOSYSTEM
                </span>
                <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 text-[8px] font-semibold">
                  11 CAST
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[8px] text-white/80 cursor-pointer"
                  title={isPaused ? 'Resume wander' : 'Pause wander'}
                >
                  {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[9px] text-white/60 cursor-pointer"
                  aria-label="Minimize control dock"
                >
                  −
                </button>
              </div>
            </div>

            {/* Presets List */}
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-white/40">
                Universe Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(UNIVERSE_PRESETS).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectPreset(key)}
                    className={`px-2 py-1 text-left rounded text-[8px] transition-all cursor-pointer ${
                      presetKey === key
                        ? 'bg-orange-500/20 border border-orange-500 text-orange-200 font-bold'
                        : 'bg-white/5 border border-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero vs Villain Duel Action Button */}
            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={triggerClash}
                className="flex-1 py-1.5 px-2.5 rounded bg-gradient-to-r from-orange-600 to-indigo-600 hover:from-orange-500 hover:to-indigo-500 text-white font-bold text-[9px] tracking-wider uppercase text-center shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>⚡ HERO × VILLAIN CLASH</span>
                <span className="text-[8px] opacity-75">
                  ({showdownCount > 0 ? `${showdownCount}x` : 'DUEL'})
                </span>
              </button>
            </div>

            {/* Active Character Badges */}
            <div className="flex flex-wrap gap-1 pt-1">
              {activeIds.map((id) => {
                const c = CHARACTERS[id];
                if (!c) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-sm text-[7px] uppercase tracking-wider"
                    style={{
                      backgroundColor: `${c.color}22`,
                      color: c.color,
                      border: `1px solid ${c.color}55`,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name.split(' ')[0]}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        </div>
      </aside>
    </>
  );
}
