'use client';

import { ArrowUpRight, MapPin, GraduationCap, Code2, Sparkles, Briefcase, Brain, Database, Zap } from 'lucide-react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: 'AI & ML Projects', value: 10, suffix: '+', icon: Brain, color: 'text-purple-400' },
  { label: 'Live Deployments', value: 6, suffix: '', icon: Zap, color: 'text-emerald-400' },
  { label: 'Datasets Analyzed', value: 20, suffix: '+', icon: Database, color: 'text-cyan-400' },
  { label: 'Certifications Earned', value: 6, suffix: '', icon: Sparkles, color: 'text-amber-400' },
];

const expertise = [
  { label: 'LLM Systems & RAG', level: 88, color: 'from-purple-500 to-violet-600' },
  { label: 'Machine Learning', level: 83, color: 'from-indigo-500 to-purple-600' },
  { label: 'Python & FastAPI', level: 90, color: 'from-emerald-500 to-teal-600' },
  { label: 'Data Analytics & BI', level: 85, color: 'from-amber-500 to-orange-600' },
];

function SkillBar({ label, level, color, delay }: { label: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white/90">{label}</span>
        <span className="font-mono text-white/50">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Scene02Identity() {
  return (
    <section
      id="scene-identity"
      className="relative z-10 scroll-mt-20 border-t border-white/10 bg-transparent px-4 py-24 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Top Row: Portrait + Narrative ── */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          {/* ── Left: Profile Portrait Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mx-auto w-full max-w-md lg:mx-0"
          >
            {/* Ambient Glow Aura */}
            <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-tr from-purple-600/35 via-violet-600/30 to-fuchsia-600/20 blur-2xl opacity-75 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Portrait Container */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950/45 p-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.75)] backdrop-blur-md transition-all duration-500 group-hover:border-purple-400/50">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/portfolio/profile-samyak.png"
                  alt="Samyak Anand — Applied AI Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Gradient scrim */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              </div>

              {/* Floating Location Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-full border border-purple-400/30 bg-[#060f1b]/85 px-4 py-2 backdrop-blur-xl shadow-lg">
                <span className="flex items-center gap-2 text-xs font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)] sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Samyak Anand
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-purple-200 drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  <MapPin className="h-3 w-3 text-purple-400" />
                  Hyderabad, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Narrative & Expertise Bars ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                About · Professional Identity
              </div>
              <h2
                className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
                style={{ textShadow: '0 3px 20px rgba(0,0,0,1), 0 0 20px rgba(168,85,247,0.45)' }}
              >
                From problem definition to production intelligence<span className="text-purple-400">.</span>
              </h2>
            </div>

            <div className="space-y-3.5">
              <p className="text-base leading-relaxed text-white/95" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}>
                I am <span className="font-semibold text-white">Samyak Anand</span>, a Computer Science graduate with practical experience across data science, machine learning, AI application development, and technical training.
              </p>
              <p className="text-sm leading-relaxed text-slate-100" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}>
                I enjoy taking an idea from problem definition to implementation. My hands-on work includes building machine learning applications, developing LLM-powered applications, experimenting with retrieval-augmented generation (RAG), creating local knowledge intelligence workflows, and architecting data analytics platforms.
              </p>
              <p className="text-sm leading-relaxed text-slate-100" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}>
                Alongside engineering, I teach Python, data science, and machine learning at Softgrowth Infotech — translating complex algorithmic ideas into intuitive, repeatable problem-solving frameworks.
              </p>
            </div>

            {/* Expertise Skill Bars */}
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-sm space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">Core Proficiency</span>
              {expertise.map((skill, i) => (
                <SkillBar key={skill.label} {...skill} delay={0.1 + i * 0.1} />
              ))}
            </div>

            {/* Quick Highlight Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md shadow-lg transition hover:border-purple-400/40 hover:bg-black/55">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                  <GraduationCap className="h-4 w-4 text-purple-400" />
                  Education
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  B.Tech, Computer Science &amp; Engg.
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Ballarpur Institute of Technology · 2024
                </p>
              </div>

              <a
                href="https://github.com/SamyakAnand"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md shadow-lg transition hover:border-purple-400/40 hover:bg-black/55"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                  <span className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-fuchsia-400" />
                    Technical Work
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white" />
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Selected Work on GitHub
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Inspect repositories, architectures &amp; source code
                </p>
              </a>

              <a
                href="https://www.linkedin.com/in/samyakanand/"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md shadow-lg transition hover:border-[#0a66c2]/60 hover:bg-black/55"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-300">
                  <span className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-400" />
                    Professional History
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white" />
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  LinkedIn Profile
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Experience, recommendations &amp; endorsements
                </p>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-purple-400/30 bg-purple-950/30 p-4 backdrop-blur-md shadow-lg transition hover:border-purple-400/60 hover:bg-purple-950/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-purple-300">
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-purple-400" />
                    Download Résumé
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white" />
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Full CV · PDF
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Projects, experience &amp; certifications
                </p>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Animated Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map(({ label, value, suffix, icon: Icon, color }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-2 rounded-3xl border border-white/10 bg-black/40 p-5 text-center backdrop-blur-md shadow-md transition hover:border-purple-400/30 hover:bg-black/55"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/50 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div
                className={`font-display text-3xl font-bold sm:text-4xl ${color}`}
                style={{ textShadow: '0 2px 12px rgba(0,0,0,1)' }}
              >
                <AnimatedCounter to={value} suffix={suffix} />
              </div>
              <span className="text-xs font-medium text-white/60">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
