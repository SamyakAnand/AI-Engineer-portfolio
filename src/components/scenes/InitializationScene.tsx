'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Image from 'next/image';

// Scene 01 — Initialization.
// A dark form-building field resolves into the identity mark, with a shader-like
// vignette sweep. Content is layered so text stays accessible.
export default function InitializationScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const proseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const prose = proseRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    // 1) Particle field condenses toward the centre (identity mark).
    const particleGroup = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'top 92%',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    particleGroup
      .fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.inOut' },
        0
      )
      .fromTo(
        root,
        { backgroundPosition: '0% 0%' },
        {
          backgroundPosition: '100% 100%',
          duration: 1.6,
          ease: 'none',
        },
        0
      )
      .fromTo(
        prose,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        0.35
      );

    // 2) Greeting + tagline reveal (a little delayed so it lands with the mark).
    const intro = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 92%',
        end: 'top 100%',
        scrub: 1.4,
      },
    });

    intro
      .fromTo(
        prose,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      )
      .fromTo(
        prose,
        { color: 'rgba(160,160,184,.6)' },
        { color: 'rgba(232,232,240,1)', duration: 1.2, ease: 'none' },
        0
      );

    return () => {
      particleGroup.kill();
      intro.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-bg"
      style={{
        background:
          'radial-gradient(120% 90% at 50% 50%, #12121b 0%, #0a0a0f 60%, #06060b 100%)',
      }}
    >
      {/* Ambient disc — the identity orb, forms as the page loads. */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(124,58,237,.18),rgba(99,102,241,.08) 40%,transparent 70%)]" />

      {/* Decorative floating text — editorial texture, no meaning. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {['SYSTEM', 'INTELLIGENCE', 'ENGINE', 'ANALYSIS', 'NEXT.js', 'AGENT'].map((t) => (
          <div
            key={t}
            className="absolute text-xs font-mono uppercase tracking-[.2em] text-white/6"
            style={{
              left: `${12 + Math.random() * 76}%`,
              top: `${18 + Math.random() * 60}%`,
              animation: `fadeUp 3s ease-out both`,
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Central identity reveal — the scientist's portrait in the neon city. */}
      <div
        ref={proseRef}
        className="relative z-10 flex flex-col items-center justify-center px-5 text-center"
      >
        <Image
          src="/portraits/futuristic-neon-city-portrait.png"
          alt="Samyak Anand — AI Scientist"
          fill
          sizes="(max-width: 768px) 200px, (max-width: 1200px) 256px, 384px"
          className="rounded-full object-cover border-2 border-white/10"
          style={{ boxShadow: '0 0 30px rgba(124,58,237,.25), 0 0 60px rgba(99,102,241,.12), inset 0 0 30px rgba(124,58,237,.08)' }}
        />
        <p className="mt-2 text-xs uppercase tracking-[.28em] text-white/50">
          initializing
        </p>
      </div>
    </div>
  );
}

// Minimal CSS animation for the floating hint text (defined in globals.css).
