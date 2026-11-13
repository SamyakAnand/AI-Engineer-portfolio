'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, ChevronLeft, ChevronRight, ExternalLink, X,
  BookOpen, Brain, Database, BarChart3, Code2
} from 'lucide-react';

/* ─── data ───────────────────────────────────────────────────────────── */
const certs = [
  {
    id: 'naresh-fullstack-ds',
    title: 'Full Stack Data Science & AI Specialization',
    platform: 'Naresh IT',
    year: '2024',
    description:
      'Comprehensive program covering Python, data analysis, machine learning, deep learning, NLP, and production deployment of AI systems.',
    icon: Brain,
    iconColor: 'text-violet-400',
    glowColor: 'rgba(167,139,250,0.3)',
    borderHover: 'hover:border-violet-400/50',
    tags: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Power BI', 'SQL'],
    credential: null,
  },
  {
    id: 'udemy-ds-ml',
    title: 'Data Science & Machine Learning Advanced',
    platform: 'Udemy',
    year: '2024',
    description:
      'Advanced course on applied machine learning — covering feature engineering, ensemble methods, hyperparameter tuning, and model deployment pipelines.',
    icon: BarChart3,
    iconColor: 'text-sky-400',
    glowColor: 'rgba(56,189,248,0.3)',
    borderHover: 'hover:border-sky-400/50',
    tags: ['Scikit-learn', 'XGBoost', 'Feature Engineering', 'Model Pipelines', 'Pandas'],
    credential: null,
  },
  {
    id: 'python-analytics',
    title: 'Python for Data Analytics',
    platform: 'Self-Paced / Practice',
    year: '2023',
    description:
      'Hands-on Python data analytics practice across Pandas, NumPy, Matplotlib, Seaborn, and EDA workflows for real-world datasets.',
    icon: Code2,
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(52,211,153,0.3)',
    borderHover: 'hover:border-emerald-400/50',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'EDA'],
    credential: null,
  },
  {
    id: 'sql-databases',
    title: 'SQL & Database Foundations',
    platform: 'Self-Paced / Practice',
    year: '2023',
    description:
      'Structured query language mastery: joins, subqueries, window functions, indexing strategies, and integration with Python data pipelines.',
    icon: Database,
    iconColor: 'text-amber-400',
    glowColor: 'rgba(251,191,36,0.3)',
    borderHover: 'hover:border-amber-400/50',
    tags: ['SQL', 'MySQL', 'PostgreSQL', 'Window Functions', 'Query Optimization'],
    credential: null,
  },
  {
    id: 'powerbi-dashboards',
    title: 'Business Intelligence & Power BI',
    platform: 'Self-Paced / Practice',
    year: '2024',
    description:
      'End-to-end Power BI dashboard development: Power Query, DAX measures, data modeling, and publishing interactive business intelligence reports.',
    icon: BookOpen,
    iconColor: 'text-orange-400',
    glowColor: 'rgba(251,146,60,0.3)',
    borderHover: 'hover:border-orange-400/50',
    tags: ['Power BI', 'DAX', 'Power Query', 'Data Modeling', 'KPI Design'],
    credential: null,
  },
];

/* ─── modal ──────────────────────────────────────────────────────────── */
function CertModal({
  cert,
  onClose,
  onPrev,
  onNext,
}: {
  cert: (typeof certs)[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const Icon = cert.icon;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#07111d]/95 p-8 shadow-[0_0_80px_rgba(139,92,246,0.25)] max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* prev / next */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex rounded-full bg-white/5 p-2.5 text-white/60 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex rounded-full bg-white/5 p-2.5 text-white/60 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* icon */}
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            style={{ boxShadow: `0 0 40px ${cert.glowColor}` }}
          >
            <Icon className={`h-10 w-10 ${cert.iconColor}`} />
          </div>

          <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 12px rgba(0,0,0,1)' }}>
            {cert.title}
          </h3>
          <span className="mt-2 rounded-full border border-violet-400/30 bg-violet-950/50 px-4 py-1 text-sm text-violet-200">
            {cert.platform} · {cert.year}
          </span>

          {/* tags */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {cert.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-sky-400/20 bg-sky-950/50 px-3 py-1 text-xs font-medium text-sky-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* description */}
          <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <h4 className="mb-2 text-sm font-semibold text-white/80">What I Learned</h4>
            <p className="text-sm leading-relaxed text-white/75">{cert.description}</p>
          </div>

          {cert.credential && (
            <a
              href={cert.credential}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-pink-600"
            >
              View Certificate <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── main section ───────────────────────────────────────────────────── */
export default function SceneCertifications() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selected, setSelected] = useState<(typeof certs)[0] | null>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((p) => (p + 1) % certs.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((p) => (p - 1 + certs.length) % certs.length);
  }, []);

  /* auto-rotate */
  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext]);

  /* modal nav */
  const openModal = (cert: (typeof certs)[0]) => setSelected(cert);
  const closeModal = () => setSelected(null);
  const modalPrev = () => {
    if (!selected) return;
    const i = certs.findIndex((c) => c.id === selected.id);
    setSelected(certs[(i - 1 + certs.length) % certs.length]);
  };
  const modalNext = () => {
    if (!selected) return;
    const i = certs.findIndex((c) => c.id === selected.id);
    setSelected(certs[(i + 1) % certs.length]);
  };

  /* 3 visible cards */
  const visible = [0, 1, 2].map((offset) => certs[(activeIdx + offset) % certs.length]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d < 0 ? 120 : -120, opacity: 0, scale: 0.9 }),
  };

  return (
    <section
      id="scene-certifications"
      className="relative z-10 scroll-mt-24 bg-transparent px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300">
            <Award className="h-3.5 w-3.5" />
            Certifications
          </div>
          <h2
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1)' }}
          >
            Credentials &amp; Learning
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base text-white/85"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
          >
            Industry-recognized certifications validating expertise in data science, ML, and AI.
          </p>
          {/* gradient bar */}
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
        </motion.div>

        {/* carousel controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={goPrev}
            className="rounded-full border border-white/15 bg-black/40 p-3 text-white/70 backdrop-blur-sm transition hover:bg-violet-900/50 hover:text-white hover:border-violet-400/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* dots */}
          <div className="flex gap-2">
            {certs.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-6 bg-violet-400' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="rounded-full border border-white/15 bg-black/40 p-3 text-white/70 backdrop-blur-sm transition hover:bg-violet-900/50 hover:text-white hover:border-violet-400/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* cards */}
        <div className="mt-8 grid min-h-[340px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            {visible.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={`${cert.id}-${activeIdx}-${i}`}
                  layout
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openModal(cert)}
                  className={`
                    group flex h-full cursor-pointer flex-col rounded-2xl border border-white/[0.12]
                    bg-black/35 p-6 backdrop-blur-[8px] shadow-[0_8px_40px_rgba(0,0,0,0.5)]
                    transition-all duration-300
                    ${cert.borderHover}
                    hover:-translate-y-2 hover:bg-black/45
                  `}
                >
                  {/* icon */}
                  <div className="mb-5 flex justify-center">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                      style={{ boxShadow: `0 0 24px ${cert.glowColor}` }}
                    >
                      <Icon className={`h-8 w-8 ${cert.iconColor}`} />
                    </div>
                  </div>

                  {/* title */}
                  <h3
                    className="mb-1 text-center text-base font-bold text-white leading-snug"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                  >
                    {cert.title}
                  </h3>

                  {/* platform */}
                  <p
                    className="mb-4 text-center text-xs font-semibold text-sky-200/90"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
                  >
                    {cert.platform} · {cert.year}
                  </p>

                  {/* description */}
                  <p
                    className="mb-4 flex-1 text-center text-xs leading-relaxed text-white/80 line-clamp-3"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
                  >
                    {cert.description}
                  </p>

                  {/* tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {cert.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-violet-400/20 bg-violet-950/50 px-2.5 py-0.5 text-[10px] font-medium text-violet-200"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,1)' }}
                      >
                        {t}
                      </span>
                    ))}
                    {cert.tags.length > 3 && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                        +{cert.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* view details */}
                  <p className="mt-auto text-center text-xs font-semibold text-violet-400 transition group-hover:text-violet-300">
                    View Details →
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={closeModal} onPrev={modalPrev} onNext={modalNext} />
        )}
      </AnimatePresence>
    </section>
  );
}
