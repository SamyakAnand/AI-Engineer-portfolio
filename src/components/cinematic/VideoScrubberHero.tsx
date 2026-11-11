'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function VideoScrubberHero() {
  const moveTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return <section id="hero-cinematic" className="relative z-10 flex min-h-[92svh] scroll-mt-24 items-center px-6 pb-20 pt-28 text-white md:min-h-screen md:px-12 lg:px-20">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div className="max-w-3xl">
        <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[.22em] text-sky-100/75"><span className="h-px w-8 bg-sky-100/70"/>Hyderabad, India</p>
        <h1 className="font-display text-[clamp(3.3rem,8vw,7.4rem)] font-semibold leading-[.91] tracking-[-.065em] text-white">Samyak<br/><span className="text-white/75">Anand.</span></h1>
        <p className="mt-7 max-w-2xl text-xl font-medium leading-snug tracking-[-.02em] text-white/90 sm:text-2xl">I build practical AI and data products.</p>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/65 sm:text-lg">From machine learning prototypes to clear, useful dashboards—focused on solving real problems with thoughtful engineering.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => moveTo('scene-projects')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#07111d] transition hover:bg-sky-100">View selected work <ArrowDownRight className="h-4 w-4"/></button>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[.07] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[.13]">Résumé <ArrowUpRight className="h-4 w-4"/></a>
        </div>
      </div>
    </div>
  </section>;
}
