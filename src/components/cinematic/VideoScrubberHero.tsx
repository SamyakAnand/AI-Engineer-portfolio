'use client';

import { ArrowDownRight, ArrowUpRight, MapPin, Mail, Sparkles } from 'lucide-react';

export default function VideoScrubberHero() {
  const moveTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero-cinematic"
      className="relative z-10 flex min-h-[92svh] scroll-mt-24 items-center px-6 pb-20 pt-28 text-white md:min-h-screen md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          {/* ── Subtitle / Professional Role Badge ── */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-400/35 bg-purple-950/50 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-purple-200 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_16px_rgba(168,85,247,0.35)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400"></span>
            </span>
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Applied AI Engineer
          </div>

          {/* ── Main Name Heading ── */}
          <h1 className="mt-4 font-display text-[clamp(3.5rem,8.5vw,7.6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Samyak
            <br />
            <span className="text-white/90">Anand<span className="text-purple-400">.</span></span>
          </h1>

          {/* ── Core Value Pitch & Description Card ── */}
          <div className="mt-7 rounded-2xl border border-white/[0.14] bg-gradient-to-r from-[#030712]/75 via-[#030712]/50 to-transparent p-6 sm:p-7 backdrop-blur-[10px] shadow-[0_16px_45px_rgba(0,0,0,0.65)]">
            <p className="text-xl font-bold leading-snug tracking-[-0.015em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-2xl lg:text-3xl">
              &ldquo;I build intelligent systems that turn complex problems into useful products.&rdquo;
            </p>
            <p className="mt-3.5 max-w-2xl text-sm font-normal leading-relaxed text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-base">
              Specializing in AI engineering, large language models, retrieval systems, intelligent agents, machine learning and data-driven applications.
            </p>

            {/* Technology Line Pill */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono text-purple-200">
              <span className="text-purple-400 font-semibold tracking-wider uppercase text-[11px]">Core Tech:</span>
              <span>Python</span>
              <span className="text-white/30">·</span>
              <span>LLMs</span>
              <span className="text-white/30">·</span>
              <span>RAG</span>
              <span className="text-white/30">·</span>
              <span>Agentic AI</span>
              <span className="text-white/30">·</span>
              <span>Machine Learning</span>
              <span className="text-white/30">·</span>
              <span>FastAPI</span>
            </div>
          </div>

          {/* ── Primary & Secondary CTAs ── */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => moveTo('scene-projects')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_4px_24px_rgba(168,85,247,0.45)] transition hover:from-purple-400 hover:to-indigo-500 hover:scale-[1.02]"
            >
              Explore My Work <ArrowDownRight className="h-4 w-4" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-white/[0.08] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/[0.18] hover:border-purple-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              Download Résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* ── Metadata Bar: Location, Availability & Quick Socials ── */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-white/80">
            {/* Location */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm shadow-sm">
              <MapPin className="h-3 w-3 text-purple-400" />
              <span>Hyderabad, India</span>
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-emerald-200 backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>Available for AI Engagements</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/SamyakAnand"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:border-purple-400 hover:text-white"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/samyakanand/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:border-[#0a66c2] hover:text-[#0a66c2]"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:samyak.g.anand@gmail.com"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:border-purple-400 hover:text-purple-300"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
