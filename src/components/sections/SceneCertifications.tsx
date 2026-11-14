'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, ExternalLink, X, Brain, Database, BarChart3, Code2,
  CheckCircle2, Sparkles, ShieldCheck, ChevronLeft, ChevronRight
} from 'lucide-react';

/* ─── Verified Certifications Data (All 11 Official Credentials) ─────────── */
interface CertItem {
  id: string;
  category: 'Specialization' | 'Machine Learning' | 'Data Science' | 'Industry';
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: typeof Brain;
  tags: string[];
  credentialUrl: string;
}

const verifiedCerts: CertItem[] = [
  {
    id: 'naresh-it-ds-ai',
    category: 'Specialization',
    title: 'Full Stack Data Science and AI',
    issuer: 'Naresh IT Hyderabad',
    year: '2024',
    description: 'Comprehensive specialization covering end-to-end data science workflows, machine learning architectures, deep learning models, natural language processing, and production deployment pipelines.',
    icon: ShieldCheck,
    tags: ['Data Science', 'AI', 'Machine Learning', 'Full Stack', 'Deep Learning', 'FastAPI'],
    credentialUrl: 'https://drive.google.com/file/d/1Xt-6yvDKc1HBgtIq_XNYELI9KuXi_6pe/view?usp=sharing',
  },
  {
    id: 'evoastra-intern',
    category: 'Industry',
    title: 'Data Scientist Intern Credential',
    issuer: 'Evoastra Ventures Inc.',
    year: '2025',
    description: 'Internship certificate certifying hands-on delivery as Data Scientist Intern, leading 5 interns to build end-to-end ML workflows, CARS24 web-scraping pipelines, and NLP recruitment analyzers.',
    icon: Brain,
    tags: ['Data Science', 'Machine Learning', 'Web Scraping', 'NLP', 'Python'],
    credentialUrl: 'https://drive.google.com/file/d/1ALH-bn08GuyttrPXgytg5msicyTivg8U/view?usp=sharing',
  },
  {
    id: 'gilbert-research-cert',
    category: 'Industry',
    title: 'Data Science & ML Research Completion',
    issuer: 'Gilbert Research Center',
    year: '2024',
    description: 'Research internship credential certifying clinical healthcare dataset modeling, statistical validation, drift detection, and MLflow experiment tracking workflows.',
    icon: Award,
    tags: ['Clinical ML', 'MLflow', 'Statistical Validation', 'DAGsHub', 'Healthcare'],
    credentialUrl: 'https://drive.google.com/file/d/110GOvC_rg53Na7fu77q6JEbazoFC1L2D/view?usp=sharing',
  },
  {
    id: 'kaggle-intermediate-ml',
    category: 'Machine Learning',
    title: 'Intermediate Machine Learning',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Advanced machine learning implementation covering missing-value imputation, categorical encoding, cross-validation architectures, XGBoost modeling, and preventing data leakage.',
    icon: BarChart3,
    tags: ['Machine Learning', 'XGBoost', 'Pipelines', 'Cross-Validation'],
    credentialUrl: 'https://drive.google.com/file/d/1rq5vENWlVaDEznE2YLVpQ6Cj-UpnxBWN/view?usp=sharing',
  },
  {
    id: 'kaggle-feature-engineering',
    category: 'Machine Learning',
    title: 'Feature Engineering',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Techniques for maximizing model predictive power through mutual information scoring, synthetic feature extraction, k-means clustering, principal component analysis (PCA), and target encoding.',
    icon: Code2,
    tags: ['Feature Engineering', 'Clustering', 'PCA', 'Target Encoding'],
    credentialUrl: 'https://drive.google.com/file/d/1LpOkKnO3Q-eV9S1l1GmUTtx4l6JVhfiU/view?usp=sharing',
  },
  {
    id: 'kaggle-intro-ml',
    category: 'Machine Learning',
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Foundations of supervised modeling, validation techniques, decision trees, random forests, and model performance metrics with Scikit-learn.',
    icon: Brain,
    tags: ['Machine Learning', 'Scikit-learn', 'Supervised Learning', 'Validation'],
    credentialUrl: 'https://drive.google.com/file/d/1gTKfv3SqqsOmE5rabXFiNnsa482Jqox5/view?usp=drive_link',
  },
  {
    id: 'kaggle-pandas',
    category: 'Data Science',
    title: 'Pandas Data Analysis',
    issuer: 'Kaggle',
    year: '2024',
    description: 'High-performance data manipulation, cleaning, aggregation, exploratory analysis, grouping, and indexing workflows on tabular datasets using Pandas routines.',
    icon: Database,
    tags: ['Pandas', 'Data Cleaning', 'Data Transformation', 'Data Analysis'],
    credentialUrl: 'https://drive.google.com/file/d/14zLla9ukIX1nS8oaUmqHhYS-rhLCasGc/view?usp=sharing',
  },
  {
    id: 'kaggle-data-visualization',
    category: 'Data Science',
    title: 'Data Visualization',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Creating high-impact statistical visualizations using Python libraries including Seaborn, Matplotlib, and Plotly to discover distributions and communicate insights.',
    icon: BarChart3,
    tags: ['Data Visualization', 'Seaborn', 'Plotly', 'Matplotlib'],
    credentialUrl: 'https://drive.google.com/file/d/1YEzVPfDuYO91Rzg5sViJGELBOs2zyW1K/view?usp=sharing',
  },
  {
    id: 'kaggle-data-cleaning',
    category: 'Data Science',
    title: 'Data Cleaning',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Mastered production data cleaning techniques including missing-value handling, scaling and normalization, parsing date stamps, character encoding, and deduplication.',
    icon: Database,
    tags: ['Data Cleaning', 'Missing Values', 'Normalization', 'Parsing Dates'],
    credentialUrl: 'https://drive.google.com/file/d/1ZSfo0eqpAkly7LFK2jvEwYBJwvHsNtG6/view?usp=sharing',
  },
  {
    id: 'udemy-ds-ml',
    category: 'Specialization',
    title: 'Data Science & Machine Learning A-Z',
    issuer: 'Udemy',
    year: '2024',
    description: 'Comprehensive curriculum covering data science and machine learning from fundamentals to advanced algorithmic implementation, statistics, and predictive modeling.',
    icon: Brain,
    tags: ['Data Science', 'Machine Learning', 'Python', 'Statistics'],
    credentialUrl: 'https://drive.google.com/file/d/1u5E4sWX2bVP207NKi6GZ6e5yOXeex82B/view?usp=sharing',
  },
  {
    id: 'cadd-java',
    category: 'Industry',
    title: 'Essential Java Course',
    issuer: 'CADD',
    year: '2024',
    description: 'Core Java programming fundamentals, object-oriented software engineering principles, memory management, and backend application development.',
    icon: Code2,
    tags: ['Java', 'Programming', 'OOP', 'Application Development'],
    credentialUrl: 'https://drive.google.com/file/d/1qfKmLL8z1Rfxo3X24diN5WPIeg4jxeVW/view?usp=sharing',
  },
];

function CertCard({
  cert,
  onSelect,
}: {
  cert: CertItem;
  onSelect: (cert: CertItem) => void;
}) {
  const Icon = cert.icon;
  return (
    <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-black/55 sm:p-7">
      <div>
        {/* Category & Year Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="rounded-full border border-purple-400/30 bg-purple-950/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-purple-300">
            {cert.category}
          </span>
          <span className="text-xs font-mono font-medium text-white/60">
            {cert.year}
          </span>
        </div>

        {/* Title & Issuer */}
        <div className="mt-4 flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-950/50 shadow-md">
            <Icon className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3
              className="text-lg font-bold leading-snug text-white group-hover:text-purple-200 transition-colors"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}
            >
              {cert.title}
            </h3>
            <p className="text-xs font-semibold text-purple-300/80">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3.5 text-xs sm:text-sm font-normal leading-relaxed text-slate-200 line-clamp-3">
          {cert.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-purple-400/20 bg-purple-950/40 px-2 py-0.5 text-[10px] font-medium text-purple-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <button
          onClick={() => onSelect(cert)}
          className="text-xs font-semibold text-purple-300 hover:text-white transition-colors"
        >
          View Details
        </button>

        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-purple-400/30 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/60 hover:border-purple-400/60"
        >
          <span>Verify Credential</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function SceneCertifications() {
  const [activeCert, setActiveCert] = useState<CertItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const top3Certs = verifiedCerts.slice(0, 3);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 360;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="scene-certifications"
      className="relative z-10 scroll-mt-24 border-t border-purple-950/40 bg-transparent px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Verified Credentials · 11 Accreditations
          </div>
          <h2
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 0 24px rgba(168,85,247,0.45)' }}
          >
            Certifications &amp; Accreditations<span className="text-purple-400">.</span>
          </h2>
          <p
            className="mt-4 max-w-2xl text-base font-light text-slate-100 sm:text-lg"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
          >
            Formally earned industry specializations, competitive machine learning accreditations, and research completion certificates with direct verification links.
          </p>
        </motion.div>

        {/* ── Top 3 Featured Certifications Grid ── */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Featured Credentials (Top 3)
            </div>
            <span className="text-[11px] font-mono text-white/50">
              Naresh IT · Evoastra · Gilbert Research
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {top3Certs.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <CertCard cert={cert} onSelect={setActiveCert} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── All 11 Accreditations: Horizontal Scroll / Swipe Track ── */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-purple-300">
                  All 11 Verified Accreditations · Horizontal Scroll Track
                </h3>
              </div>
              <p className="mt-1 text-xs text-white/60">
                Swipe or scroll horizontally to inspect Kaggle, Naresh IT, Evoastra, Gilbert Research, Udemy &amp; CADD credentials
              </p>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:border-purple-400 hover:bg-white/15 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll right"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:border-purple-400 hover:bg-white/15 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Swipeable & Scrollable Deck */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:rgba(168,85,247,0.4)_transparent]"
          >
            {verifiedCerts.map((cert) => (
              <div
                key={`deck-${cert.id}`}
                className="w-[310px] shrink-0 sm:w-[360px] snap-start"
              >
                <CertCard cert={cert} onSelect={setActiveCert} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certificate Inspection Modal ── */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              className="relative w-full max-w-xl rounded-3xl border border-purple-500/40 bg-[#060414]/98 p-6 shadow-[0_0_80px_rgba(168,85,247,0.35)] sm:p-8"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-xl bg-white/5 p-2 text-white/60 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-950/50 shadow-lg">
                  <Award className="h-8 w-8 text-purple-400" />
                </div>

                <span className="rounded-full border border-purple-400/30 bg-purple-950/40 px-3 py-1 text-xs font-mono uppercase tracking-wider text-purple-300">
                  {activeCert.category} · {activeCert.year}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {activeCert.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-purple-300">
                  {activeCert.issuer}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-200">
                  {activeCert.description}
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                  {activeCert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-purple-400/25 bg-purple-950/50 px-2.5 py-1 text-xs font-medium text-purple-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-6">
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition hover:from-purple-500 hover:to-violet-500"
                  >
                    <span>Open Verified Certificate</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <button
                    onClick={() => setActiveCert(null)}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase text-white/70 transition hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
