'use client';

import {
  ArrowUpRight,
  MapPin,
  GraduationCap,
  Code2,
  Sparkles,
  Briefcase,
  Brain,
  BarChart3,
  Users,
  ShieldCheck,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState, type ComponentType } from 'react';
import { professionalKpis, professionalImpactStatement } from '@/content/kpis';

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect prefers-reduced-motion for accessibility
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(to);
      return;
    }

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

  const formatted = to >= 1000 ? count.toLocaleString() : count;
  return <span ref={ref}>{formatted}{suffix}</span>;
}

const kpiIcons: Record<string, ComponentType<{ className?: string }>> = {
  'students-mentored': Users,
  'data-analytics-projects': BarChart3,
  'ai-ml-projects': Brain,
  'datasets-analyzed': Globe,
  'academic-projects': GraduationCap,
  'certifications': ShieldCheck,
};

const verifiedCompetencies = [
  {
    domain: 'LLM Applications & Retrieval Workflows',
    badge: 'Project-Verified',
    context: 'Lexical passage retrieval and exact source offsets in ARGUS; parser-derived imports and source references in SHIRO',
    border: 'border-purple-400/35 bg-purple-950/40 text-purple-200',
    dot: 'bg-purple-400',
  },
  {
    domain: 'Supervised ML & Data Pipelines',
    badge: 'Project-Verified',
    context: 'Five-category Disease Predictor and modular Network Security ML pipeline',
    border: 'border-indigo-400/35 bg-indigo-950/40 text-indigo-200',
    dot: 'bg-indigo-400',
  },
  {
    domain: 'Python & FastAPI Backend Architecture',
    badge: 'Project-Backed',
    context: 'FastAPI / Flask endpoints, request validation, and deterministic evaluation workflows',
    border: 'border-emerald-400/35 bg-emerald-950/40 text-emerald-200',
    dot: 'bg-emerald-400',
  },
  {
    domain: 'Data Analytics & Business Intelligence',
    badge: 'BI Case Studies',
    context: 'Power BI case studies across Financial Risk, Credit Cards, Insurance, Retail & Streaming',
    border: 'border-amber-400/35 bg-amber-950/40 text-amber-200',
    dot: 'bg-amber-400',
  },
];

export default function Scene02Identity() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="scene-identity"
      className="relative z-10 scroll-mt-20 border-t border-white/10 bg-transparent px-4 py-20 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Top Row: Portrait + Narrative ── */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
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
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950/45 p-2 sm:p-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.75)] backdrop-blur-md transition-all duration-500 group-hover:border-purple-400/50">
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
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between rounded-full border border-purple-400/30 bg-[#060f1b]/85 px-3.5 sm:px-4 py-2 backdrop-blur-xl shadow-lg">
                <span className="flex items-center gap-2 text-xs font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)] sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
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

          {/* ── Right: Narrative & Evidence Badges ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-transparent px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                About · Professional Identity
              </div>
              <h2
                className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ textShadow: '0 3px 20px rgba(0,0,0,1), 0 0 20px rgba(168,85,247,0.45)' }}
              >
                From problem definition to production intelligence<span className="text-purple-400">.</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-sm sm:text-base leading-relaxed text-white/95" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}>
                I am <span className="font-semibold text-white">Samyak Anand</span>, an Applied AI Engineer with a strong Computer Science foundation and practical experience across Generative AI, retrieval systems, machine learning engineering, and technical training.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-100" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}>
                I focus on building practical AI applications that couple intelligent workflows with verifiable evidence. My hands-on projects include deterministic data profiling engines (<span className="text-purple-300 font-medium">NEXUS</span>), passage-grounded knowledge retrieval with offset citations (<span className="text-purple-300 font-medium">ARGUS AI</span>), AST-driven codebase intelligence (<span className="text-purple-300 font-medium">SHIRO CodeMind</span>), and reproducible model evaluation workspaces (<span className="text-purple-300 font-medium">L Platform</span>).
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-100" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}>
                Alongside engineering, I served as <span className="text-white font-semibold">Data Science Trainer at Softgrowth Infotech</span> (October 2025 – November 2026, concluded 9 November 2026) in Hyderabad, India — mentoring over 100+ learners across Python, exploratory data analysis, and machine learning pipelines, while guiding 5+ Master&apos;s-level academic capstone teams through end-to-end system architectures, documentation, and technical defense presentations.
              </p>
            </motion.div>

            {/* Evidence-Based Competency Deck */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/15 bg-transparent p-4 sm:p-5 shadow-none space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">
                  Evidence-Based Technical Competencies
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  Project Verified · Zero Vanity Percentages
                </span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {verifiedCompetencies.map((comp) => (
                  <motion.div
                    key={comp.domain}
                    whileHover={reduceMotion ? {} : { scale: 1.01 }}
                    className="flex flex-col justify-between rounded-xl border border-white/15 bg-transparent p-3 transition hover:border-purple-400/40 hover:bg-transparent"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white leading-tight">
                        {comp.domain}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider shrink-0 ${comp.border}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${comp.dot}`} />
                        {comp.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-300 leading-relaxed font-light">
                      {comp.context}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Highlight Cards */}
            <motion.div variants={itemVariants} className="grid gap-3 sm:grid-cols-2">
              <motion.div
                whileHover={reduceMotion ? {} : { y: -2 }}
                className="rounded-2xl border border-white/20 bg-transparent p-4 shadow-none transition hover:border-purple-400/50 hover:bg-transparent"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                  <GraduationCap className="h-4 w-4 text-purple-400" />
                  Formal Education
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  B.Tech, Computer Science &amp; Engg. (2024)
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  Ballarpur Institute of Technology, Maharashtra
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-purple-200">
                  <span>Diploma, Computer Science (2021)</span>
                  <span className="font-mono text-white/60">84.25%</span>
                </div>
              </motion.div>

              <motion.a
                whileHover={reduceMotion ? {} : { y: -2 }}
                href="https://github.com/SamyakAnand"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md shadow-lg transition hover:border-purple-400/40 hover:bg-black/55"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                  <span className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-fuchsia-400" />
                    Verified Repositories
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white" />
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Inspect Code on GitHub
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Architectures, test fixtures, notebooks &amp; source
                </p>
              </motion.a>

              <motion.a
                whileHover={reduceMotion ? {} : { y: -2 }}
                href="https://www.linkedin.com/in/samyakanand/"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/20 bg-transparent p-4 shadow-none transition hover:border-[#0a66c2]/60 hover:bg-transparent"
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
                  Verified roles, recommendations &amp; career updates
                </p>
              </motion.a>

              <motion.a
                whileHover={reduceMotion ? {} : { y: -2 }}
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-purple-400/35 bg-transparent p-4 shadow-none transition hover:border-purple-400/60 hover:bg-transparent"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-purple-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    Download Résumé
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white" />
                </div>
                <p className="mt-2 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Curriculum Vitae (PDF)
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Full project architectures, career history &amp; contacts
                </p>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Animated Stats Strip: Expanded Verified Track Record ── */}
        <div className="mt-16">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                Professional Impact · Stated Achievements &amp; Track Record
              </span>
            </div>
            <span className="text-[11px] font-mono text-white/50">
              Technical Mentorship · Analytics · AI Engineering · Capstone Leadership
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3 sm:gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {professionalKpis.map((kpi) => {
              const Icon = kpiIcons[kpi.id] || Sparkles;
              return (
                <motion.div
                  key={kpi.id}
                  whileHover={reduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-3.5 sm:p-5 text-left shadow-none transition-colors ${
                    kpi.featured
                      ? 'border-cyan-400/40 bg-transparent shadow-none ring-1 ring-cyan-400/20 hover:border-cyan-400/60 hover:bg-transparent'
                      : 'border-white/20 bg-transparent hover:border-purple-400/40 hover:bg-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/20 bg-transparent ${kpi.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    </div>
                    {kpi.featured ? (
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-950/60 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                        Key
                      </span>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white/40">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div
                      className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${kpi.color}`}
                      style={{ textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}
                    >
                      <AnimatedCounter to={kpi.value} suffix={kpi.suffix} />
                    </div>
                    <h3 className="mt-1 text-xs sm:text-sm font-bold text-white/95 group-hover:text-white leading-snug">
                      {kpi.label}
                    </h3>
                    <p className="mt-1 text-[10px] sm:text-[11px] font-normal text-white/60 leading-relaxed line-clamp-2">
                      {kpi.desc}
                    </p>
                  </div>

                  {/* Ambient bottom glow accent */}
                  <div
                    className={`pointer-events-none absolute -bottom-6 -right-6 h-16 w-16 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 ${kpi.glow}`}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Compact Professional Impact Statement ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 rounded-2xl border border-purple-500/30 bg-transparent p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 shadow-sm"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-950/50 text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-200 text-center sm:text-left">
              <span className="font-semibold text-white">Professional Impact: </span>
              {professionalImpactStatement}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
