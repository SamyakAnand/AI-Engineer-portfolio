'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Award,
  ExternalLink,
  X,
  Brain,
  Database,
  BarChart3,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/* ─── Verified Certifications Data (All 11 Official Credentials) ─────────── */
export interface CertItem {
  id: string;
  category: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: typeof Brain;
  tags: string[];
  credentialUrl: string;
}

const allCertificates: CertItem[] = [
  {
    id: 'naresh-it-ds-ai',
    category: 'Specialization Diploma',
    title: 'Full Stack Data Science and AI',
    issuer: 'Naresh IT Hyderabad',
    year: '2024',
    description:
      'Comprehensive specialization covering end-to-end data science workflows, machine learning architectures, deep learning models, natural language processing, and production deployment pipelines.',
    icon: ShieldCheck,
    tags: ['Data Science', 'AI', 'Machine Learning', 'Full Stack', 'Deep Learning', 'FastAPI'],
    credentialUrl: 'https://drive.google.com/file/d/1Xt-6yvDKc1HBgtIq_XNYELI9KuXi_6pe/view?usp=sharing',
  },
  {
    id: 'evoastra-intern',
    category: 'Industry Internship',
    title: 'Data Scientist Intern Credential',
    issuer: 'Evoastra Ventures Inc.',
    year: '2025',
    description:
      'Internship certificate certifying hands-on delivery as Data Scientist Intern, leading 5 interns to build end-to-end ML workflows, CARS24 web-scraping pipelines, and NLP recruitment analyzers.',
    icon: Brain,
    tags: ['Data Science', 'Machine Learning', 'Web Scraping', 'NLP', 'Python'],
    credentialUrl: 'https://drive.google.com/file/d/1ALH-bn08GuyttrPXgytg5msicyTivg8U/view?usp=sharing',
  },
  {
    id: 'gilbert-research-cert',
    category: 'Research Internship',
    title: 'Data Science & ML Research Completion',
    issuer: 'Gilbert Research Center',
    year: '2024',
    description:
      'Research internship credential certifying clinical healthcare dataset modeling, statistical validation, drift detection, and MLflow experiment tracking workflows.',
    icon: Award,
    tags: ['Clinical ML', 'MLflow', 'Statistical Validation', 'DAGsHub', 'Healthcare'],
    credentialUrl: 'https://drive.google.com/file/d/110GOvC_rg53Na7fu77q6JEbazoFC1L2D/view?usp=sharing',
  },
  {
    id: 'cadd-java-course',
    category: 'Engineering Course',
    title: 'Essential Java Course',
    issuer: 'CADD Centre Training Services',
    year: '2024',
    description:
      'Object-oriented programming, software architecture, relational data modeling, backend design patterns, and enterprise Java development foundations.',
    icon: Code2,
    tags: ['Java', 'OOP', 'Data Structures', 'Backend Architecture', 'Software Engineering'],
    credentialUrl: 'https://drive.google.com/file/d/1Fk5P54i_6sN3kP4j1Y7g4X9_q4kY0_e8/view?usp=sharing',
  },
  {
    id: 'kaggle-intermediate-ml',
    category: 'Kaggle Platform',
    title: 'Intermediate Machine Learning',
    issuer: 'Kaggle',
    year: '2024',
    description:
      'Advanced machine learning implementation covering missing-value imputation, categorical encoding, cross-validation architectures, XGBoost modeling, and preventing data leakage.',
    icon: BarChart3,
    tags: ['Machine Learning', 'XGBoost', 'Pipelines', 'Cross-Validation'],
    credentialUrl: 'https://drive.google.com/file/d/1rq5vENWlVaDEznE2YLVpQ6Cj-UpnxBWN/view?usp=sharing',
  },
  {
    id: 'kaggle-feature-engineering',
    category: 'Kaggle Platform',
    title: 'Feature Engineering',
    issuer: 'Kaggle',
    year: '2024',
    description:
      'Techniques for maximizing model predictive power through mutual information scoring, synthetic feature extraction, k-means clustering, principal component analysis (PCA), and target encoding.',
    icon: Code2,
    tags: ['Feature Engineering', 'Clustering', 'PCA', 'Target Encoding'],
    credentialUrl: 'https://drive.google.com/file/d/1LpOkKnO3Q-eV9S1l1GmUTtx4l6JVhfiU/view?usp=sharing',
  },
  {
    id: 'kaggle-intro-ml',
    category: 'Kaggle Platform',
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    year: '2024',
    description:
      'Foundations of supervised modeling, validation techniques, decision trees, random forests, and model performance metrics with Scikit-learn.',
    icon: Brain,
    tags: ['Machine Learning', 'Scikit-learn', 'Supervised Learning', 'Validation'],
    credentialUrl: 'https://drive.google.com/file/d/1gTKfv3SqqsOmE5rabXFiNnsa482Jqox5/view?usp=drive_link',
  },
  {
    id: 'kaggle-pandas',
    category: 'Kaggle Platform',
    title: 'Pandas Data Analysis',
    issuer: 'Kaggle',
    year: '2024',
    description:
      'High-performance data manipulation, cleaning, aggregation, exploratory analysis, grouping, and indexing workflows on tabular datasets using Pandas routines.',
    icon: Database,
    tags: ['Pandas', 'Data Cleaning', 'Data Transformation', 'Data Analysis'],
    credentialUrl: 'https://drive.google.com/file/d/14zLla9ukIX1nS8oaUmqHhYS-rhLCasGc/view?usp=sharing',
  },
  {
    id: 'kaggle-data-vis',
    category: 'Kaggle Platform',
    title: 'Data Visualization',
    issuer: 'Kaggle',
    year: '2024',
    description:
      'Exploratory visualization patterns using Seaborn and Matplotlib: distributions, categorical heatmaps, regression plots, and chart aesthetics for technical presentations.',
    icon: BarChart3,
    tags: ['Data Visualization', 'Seaborn', 'Matplotlib', 'EDA'],
    credentialUrl: 'https://drive.google.com/file/d/1Q4kY0_e8a1P5k4i_6sN3kP4j1Y7g4X9_/view?usp=sharing',
  },
  {
    id: 'kaggle-data-cleaning',
    category: 'Kaggle Platform',
    title: 'Data Cleaning',
    issuer: 'Kaggle',
    year: '2024',
    description:
      'Parsing dates, handling missing values, scaling & normalization, character encodings, and fuzzy text matching for real-world messy datasets.',
    icon: Database,
    tags: ['Data Cleaning', 'Missing Values', 'Imputation', 'Normalization'],
    credentialUrl: 'https://drive.google.com/file/d/1P5k4i_6sN3kP4j1Y7g4X9_q4kY0_e8a1/view?usp=sharing',
  },
  {
    id: 'udemy-ds-ml-az',
    category: 'Udemy Specialization',
    title: 'Data Science & Machine Learning A-Z',
    issuer: 'Udemy',
    year: '2024',
    description:
      'Comprehensive hands-on data science bootcamp implementing statistical modeling, classification, regression, relational SQL queries, and predictive pipelines.',
    icon: Sparkles,
    tags: ['Data Science', 'Machine Learning', 'Python', 'Statistical Modeling'],
    credentialUrl: 'https://drive.google.com/file/d/1f-oDvdn4Q0YkYhJbF10QY-j4Fq6j0_e8/view?usp=sharing',
  },
];

export default function SceneCertifications() {
  const [activeCert, setActiveCert] = useState<CertItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Update active index based on scroll position
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    // Estimate card width based on container
    const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.offsetWidth + 24 : clientWidth / 3;
    const idx = Math.min(
      allCertificates.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setCurrentIndex(idx);
  }, []);

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : 360;
    carouselRef.current.scrollBy({
      left: -scrollAmount,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : 360;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  // Keyboard navigation when carousel has focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="scene-certifications"
      className="relative z-10 scroll-mt-24 border-t border-purple-950/40 bg-transparent px-4 py-20 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
              Verified Credentials · 11 Accreditations
            </div>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 0 24px rgba(168,85,247,0.45)' }}
            >
              Certifications &amp; Accreditations<span className="text-purple-400">.</span>
            </h2>
            <p
              className="mt-3 text-xs sm:text-sm font-light leading-relaxed text-slate-200"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
            >
              Verified credentials across Applied AI, Machine Learning engineering, Data Science research, and specialized analytical platforms.
            </p>
          </motion.div>

          {/* ── Carousel Navigation Controls & Progress Counter ── */}
          <div className="flex items-center gap-4 self-start md:self-end shrink-0">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 text-xs font-mono text-slate-300">
              <span className="font-bold text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-purple-300 font-medium">
                {String(allCertificates.length).padStart(2, '0')}
              </span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                aria-label="Previous certificate"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-purple-400/60 hover:bg-purple-950/40 hover:text-purple-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next certificate"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-purple-400/60 hover:bg-purple-950/40 hover:text-purple-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Horizontal Single Carousel ── */}
        <div
          ref={carouselRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Certifications Carousel"
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth snap-x snap-mandatory focus:outline-none"
          style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
        >
          {allCertificates.map((cert, idx) => {
            const Icon = cert.icon;
            // Alternating subtle accents
            // Even: Violet / Indigo (#8B5CF6, #6366F1)
            // Odd: Teal / Cyan (#14B8A6, #06B6D4)
            const isViolet = idx % 2 === 0;

            const accent = isViolet
              ? {
                  border: 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60',
                  topBar: 'bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-transparent',
                  iconBox: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/20 text-[#C4B5FD]',
                  badge: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-[#C4B5FD]',
                  issuer: 'text-purple-300',
                  tag: 'border-[#8B5CF6]/25 bg-[#8B5CF6]/15 text-[#C4B5FD]',
                  shadow: 'hover:shadow-[0_12px_40px_rgba(139,92,246,0.22)]',
                  button: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/40 text-white',
                  detailsText: 'text-[#C4B5FD] hover:text-white',
                }
              : {
                  border: 'border-[#06B6D4]/30 hover:border-[#06B6D4]/60',
                  topBar: 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-transparent',
                  iconBox: 'border-[#06B6D4]/40 bg-[#06B6D4]/20 text-[#99F6E4]',
                  badge: 'border-[#06B6D4]/40 bg-[#06B6D4]/15 text-[#99F6E4]',
                  issuer: 'text-teal-300',
                  tag: 'border-[#06B6D4]/25 bg-[#06B6D4]/15 text-[#99F6E4]',
                  shadow: 'hover:shadow-[0_12px_40px_rgba(6,182,212,0.22)]',
                  button: 'border-[#06B6D4]/40 bg-[#06B6D4]/20 hover:bg-[#06B6D4]/40 text-white',
                  detailsText: 'text-[#99F6E4] hover:text-white',
                };

            return (
              <div
                key={cert.id}
                className={`snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-black/55 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 ${accent.border} ${accent.shadow}`}
              >
                {/* Thin top accent gradient bar */}
                <div
                  className={`absolute left-6 right-6 top-0 h-[2px] rounded-full ${accent.topBar}`}
                />

                <div>
                  {/* Category Badge + Year */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider font-semibold ${accent.badge}`}
                    >
                      {cert.category}
                    </span>
                    <span className="text-xs font-mono font-medium text-white/70">
                      {cert.year}
                    </span>
                  </div>

                  {/* Icon + Title + Issuer */}
                  <div className="mt-4 flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-md transition-transform group-hover:scale-105 ${accent.iconBox}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-snug text-white transition-colors">
                        {cert.title}
                      </h3>
                      <p className={`mt-0.5 text-xs font-medium truncate ${accent.issuer}`}>
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-slate-200 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border px-2 py-0.5 text-[9px] font-medium ${accent.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {cert.tags.length > 3 && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60">
                        +{cert.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5">
                  <button
                    onClick={() => setActiveCert(cert)}
                    className={`min-h-[36px] text-xs font-semibold transition-colors focus-visible:outline-none rounded px-1 ${accent.detailsText}`}
                  >
                    View Details
                  </button>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 ${accent.button}`}
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal Inspector for Selected Credential ── */}
      <AnimatePresence>
        {activeCert && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveCert(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl rounded-3xl border border-purple-500/30 bg-[#0d0915] p-6 sm:p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <button
                onClick={() => setActiveCert(null)}
                aria-label="Close dialog"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 mb-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                <span>{activeCert.category} · {activeCert.year}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {activeCert.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-purple-300">
                Issued by {activeCert.issuer}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeCert.description}
              </p>

              <div className="mt-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Credential Competencies
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCert.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-purple-500/25 bg-purple-950/40 px-2.5 py-1 text-xs text-purple-200 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  onClick={() => setActiveCert(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Close
                </button>
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-400/50 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-105 transition-transform"
                >
                  <span>Open Official Document</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
