'use client';

import type { MouseEvent } from 'react';
import { ArrowUpRight, BarChart3, Braces, BrainCircuit, Workflow, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    num: '01',
    title: 'Applied AI & LLM Systems',
    description: 'Design and implement production-ready LLM pipelines with retrieval-augmented generation (RAG), structured JSON outputs, semantic embeddings, and tool routing. From local Ollama to frontier cloud APIs.',
    icon: BrainCircuit,
    tools: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'FastEmbed', 'Ollama'],
    highlights: ['Passage-level citation verification', 'Agentic tool-calling pipelines', 'Dual provider routing (local + cloud)'],
    accent: { border: 'hover:border-purple-400/50', glow: 'shadow-purple-400/20', iconBg: 'border-purple-400/30 bg-purple-950/50 text-purple-300', pill: 'border-purple-400/30 bg-purple-950/50 text-purple-200' },
  },
  {
    num: '02',
    title: 'Machine Learning Pipelines',
    description: 'Construct end-to-end ML workflows covering feature engineering, cross-validation, model calibration, and experiment tracking with reproducible versioning and audit trails.',
    icon: Workflow,
    tools: ['Python', 'Scikit-learn', 'PyTorch', 'MLflow', 'DVC', 'XGBoost'],
    highlights: ['Modular ingestion / training modules', 'Zero data-leakage preprocessing', 'Multi-algorithm benchmarking'],
    accent: { border: 'hover:border-indigo-400/50', glow: 'shadow-indigo-400/20', iconBg: 'border-indigo-400/30 bg-indigo-950/50 text-indigo-300', pill: 'border-indigo-400/30 bg-indigo-950/50 text-indigo-200' },
  },
  {
    num: '03',
    title: 'Data Intelligence & BI',
    description: 'Transform complex multi-source tabular data into executive dashboards, star-schema models, DAX measures, and actionable business intelligence decision metrics.',
    icon: BarChart3,
    tools: ['SQL', 'Pandas', 'Power BI', 'DAX', 'Tableau', 'PostgreSQL'],
    highlights: ['Star-schema dimensional modeling', 'Interactive executive dashboards', 'Deterministic EDA profiling'],
    accent: { border: 'hover:border-amber-400/50', glow: 'shadow-amber-400/20', iconBg: 'border-amber-400/30 bg-amber-950/50 text-amber-300', pill: 'border-amber-400/30 bg-amber-950/50 text-amber-200' },
  },
  {
    num: '04',
    title: 'Backend & Model APIs',
    description: 'Architect scalable asynchronous Python backend services and lightweight client interfaces to bridge models, vector databases, and users at production latency.',
    icon: Braces,
    tools: ['FastAPI', 'Flask', 'PostgreSQL', 'TypeScript', 'Docker', 'REST APIs'],
    highlights: ['Async FastAPI inference pipelines', 'Vector DB integration', 'Containerized ML serving'],
    accent: { border: 'hover:border-emerald-400/50', glow: 'shadow-emerald-400/20', iconBg: 'border-emerald-400/30 bg-emerald-950/50 text-emerald-300', pill: 'border-emerald-400/30 bg-emerald-950/50 text-emerald-200' },
  },
];

export default function Scene05Services() {
  const scrollToContact = (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById('scene-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="scene-services"
      className="relative z-10 scroll-mt-24 border-t border-purple-950/40 bg-transparent px-4 py-28 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Engineering Capabilities
            </div>
            <h2
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 0 24px rgba(168,85,247,0.45)' }}
            >
              How I Deliver Value<span className="text-purple-400">.</span>
            </h2>
            <p
              className="mt-3 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
            >
              Practical engineering support across AI systems, supervised machine learning, analytical architectures, and backend APIs — from prototype to production.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href="#scene-contact"
              onClick={scrollToContact}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-[0_4px_24px_rgba(168,85,247,0.4)] transition hover:from-purple-500 hover:to-indigo-500 hover:scale-[1.02] hover:shadow-[0_4px_32px_rgba(168,85,247,0.6)]"
            >
              <Zap className="h-4 w-4" />
              Start a Collaboration
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              Available for AI &amp; ML Engagements
            </div>
          </div>
        </motion.div>

        {/* ── Capabilities Cards Grid ── */}
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map(({ num, title, description, icon: Icon, tools, highlights, accent }, idx) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group relative flex flex-col rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ${accent.border} hover:bg-black/55 hover:shadow-[0_16px_60px_rgba(0,0,0,0.65)] sm:p-7`}
            >
              {/* Number + Icon Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl border shadow-md transition-transform duration-300 group-hover:scale-110 ${accent.iconBg}`}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3
                    className="text-lg font-bold tracking-tight text-white group-hover:text-purple-100 transition-colors sm:text-xl"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}
                  >
                    {title}
                  </h3>
                </div>
                <span className="font-mono text-3xl font-bold text-white/[0.06] select-none">{num}</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-slate-200/90">
                {description}
              </p>

              {/* Key Highlights */}
              <div className="mt-5 space-y-2">
                {highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5 text-xs text-white/85">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                    {h}
                  </div>
                ))}
              </div>

              {/* Stack Pills */}
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-5">
                {tools.map((t) => (
                  <span
                    key={t}
                    className={`rounded-lg border px-2.5 py-0.5 text-[10px] font-mono font-medium ${accent.pill}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Bottom Process Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/60 via-[#070516]/80 to-black/60 p-7 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.2)] sm:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300">My Approach</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl" style={{ textShadow: '0 3px 16px rgba(0,0,0,1)' }}>
                Problem → Architecture → Implementation → Delivery
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                I approach every engagement with engineering discipline: defining the problem clearly, designing a verifiable architecture, implementing with clean tested code, and delivering measurable outcomes.
              </p>
            </div>
            <a
              href="#scene-contact"
              onClick={scrollToContact}
              className="shrink-0 inline-flex items-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-600/30 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-purple-600/60 hover:border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Discuss Your Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
