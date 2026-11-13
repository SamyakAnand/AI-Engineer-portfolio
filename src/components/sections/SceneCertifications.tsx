'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, ExternalLink, X, Brain, Database, BarChart3, Code2,
  CheckCircle2, Sparkles, ShieldCheck
} from 'lucide-react';

/* ─── Verified Certifications Data ─────────────────────────────────────── */
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
    title: 'Full Stack Data Science & AI Specialization',
    issuer: 'Naresh IT Hyderabad',
    year: '2024',
    description: 'Comprehensive specialization covering end-to-end data science workflows, machine learning architectures, deep learning models, natural language processing, and production deployment pipelines.',
    icon: Brain,
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Python', 'FastAPI', 'SQL'],
    credentialUrl: 'https://drive.google.com/file/d/1Xt-6yvDKc1HBgtIq_XNYELI9KuXi_6pe/view?usp=sharing',
  },
  {
    id: 'kaggle-intermediate-ml',
    category: 'Machine Learning',
    title: 'Intermediate Machine Learning',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Advanced machine learning implementation covering missing-value imputation, categorical encoding, cross-validation architectures, XGBoost modeling, and preventing data leakage.',
    icon: BarChart3,
    tags: ['XGBoost', 'Cross-Validation', 'Data Leakage Prevention', 'Pipelines'],
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
    tags: ['PCA', 'Clustering', 'Mutual Information', 'Target Encoding'],
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
    tags: ['Scikit-learn', 'Random Forest', 'Decision Trees', 'Validation'],
    credentialUrl: 'https://drive.google.com/file/d/1gTKfv3SqqsOmE5rabXFiNnsa482Jqox5/view?usp=drive_link',
  },
  {
    id: 'kaggle-pandas',
    category: 'Data Science',
    title: 'Pandas Data Analysis',
    issuer: 'Kaggle',
    year: '2024',
    description: 'Data manipulation, aggregation, exploratory analysis, grouping, and indexing workflows on tabular datasets using high-performance Pandas routines.',
    icon: Database,
    tags: ['Pandas', 'Data Transformation', 'Indexing', 'Aggregation'],
    credentialUrl: 'https://drive.google.com/file/d/14zLla9ukIX1nS8oaUmqHhYS-rhLCasGc/view?usp=sharing',
  },
  {
    id: 'gilbert-research-cert',
    category: 'Industry',
    title: 'Data Science & ML Research Completion',
    issuer: 'Gilbert Research Center',
    year: '2024',
    description: 'Research internship credential certifying clinical dataset modeling, statistical validation, and MLflow experiment tracking workflows.',
    icon: ShieldCheck,
    tags: ['Clinical ML', 'MLflow', 'Research Validation', 'Pipelines'],
    credentialUrl: 'https://drive.google.com/file/d/110GOvC_rg53Na7fu77q6JEbazoFC1L2D/view?usp=sharing',
  },
];

export default function SceneCertifications() {
  const [activeCert, setActiveCert] = useState<CertItem | null>(null);

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
            Verified Credentials
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

        {/* ── Certifications Grid ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {verifiedCerts.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-black/55 sm:p-7"
              >
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
                    onClick={() => setActiveCert(cert)}
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
              </motion.div>
            );
          })}
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
