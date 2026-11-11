import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function Scene02Identity() {
  return <section id="scene-identity" className="relative z-10 scroll-mt-20 border-t border-white/10 bg-slate-950/30 px-6 py-24 text-white md:px-12 lg:px-20">
    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
      <div className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/15 bg-white/[.045] p-2 shadow-2xl shadow-black/25">
        <Image src="/portfolio/profile-samyak.png" alt="Samyak Anand" width={900} height={1100} priority={false} className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
        <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-[#07111d]/55 px-3 py-1.5 text-xs text-white/85 backdrop-blur-md">Samyak Anand · Hyderabad, India</span>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[.2em] text-sky-100/65">About</p>
        <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Curiosity, clarity, and useful technology.</h2>
      </div>
      <div>
        <p className="text-lg leading-8 text-white/80">I’m Samyak, an AI and data science practitioner based in India. I enjoy taking a problem from raw data to a working model or product—and making the result understandable to the people who use it.</p>
        <p className="mt-5 text-base leading-7 text-white/60">My experience spans machine learning, NLP, web applications, and analytics. I also teach data science, where explaining concepts clearly is part of the work.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[.055] p-4"><p className="text-xs uppercase tracking-[.16em] text-white/45">Education</p><p className="mt-2 text-sm font-medium text-white/85">B.Tech, Computer Science & Engineering</p><p className="mt-1 text-xs text-white/55">Ballarpur Institute of Technology · 2024</p></div>
          <a href="https://github.com/SamyakAnand" target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 bg-white/[.055] p-4 transition hover:border-sky-100/30"><p className="text-xs uppercase tracking-[.16em] text-white/45">Open source</p><p className="mt-2 flex items-center gap-2 text-sm font-medium text-white/85">Selected work on GitHub <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></p><p className="mt-1 text-xs text-white/55">Browse repositories and code</p></a>
        </div>
      </div>
    </div>
  </section>;
}
