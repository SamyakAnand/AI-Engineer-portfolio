'use client';

import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';

export default function VideoScrubberHero() {
  const moveTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero-cinematic"
      className="relative z-10 flex min-h-[92svh] scroll-mt-24 items-center px-6 pb-20 pt-28 text-white md:min-h-screen md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="font-display text-[clamp(3.5rem,8.5vw,7.6rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Samyak
            <br />
            <span className="text-white/85">Anand.</span>
          </h1>

          {/* Address / Location placed BELOW the name as requested */}
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.22em] text-purple-200 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_12px_rgba(168,85,247,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400"></span>
            </span>
            <MapPin className="h-3 w-3 text-purple-400" />
            Hyderabad, India
          </div>

          {/* High-visibility transparent glass card that keeps background video fully visible while ensuring sharp text contrast */}
          <div className="mt-8 rounded-2xl border border-white/[0.12] bg-gradient-to-r from-[#030712]/60 via-[#030712]/35 to-transparent p-6 sm:p-7 backdrop-blur-[8px] shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            <p className="text-xl font-semibold leading-snug tracking-[-0.015em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-2xl">
              I build practical AI and data products.
            </p>
            <p className="mt-3.5 max-w-xl text-base font-normal leading-relaxed text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-lg">
              From machine learning prototypes to clear, useful dashboards—focused on solving real problems with thoughtful engineering.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap gap-3.5">
            <button
              onClick={() => moveTo('scene-projects')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#07111d] shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition hover:bg-sky-100 hover:scale-[1.02]"
            >
              View selected work <ArrowDownRight className="h-4 w-4" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.08] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/[0.18] hover:border-white/50"
            >
              Résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
