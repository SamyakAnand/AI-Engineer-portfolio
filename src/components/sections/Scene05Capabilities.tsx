'use client';

import React, { useState } from 'react';
import { Terminal, Brain, GitCommit, Bot, Database, Server, Workflow, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundFx } from '@/components/sound/AmbientSoundManager';

interface Capability {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  architecturalPillars: string[];
  techUsed: string[];
  benchmark: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'agentic',
    title: 'Agentic AI & Deterministic Tool Orchestration',
    category: 'AUTONOMOUS WORKFLOWS',
    icon: Bot,
    headline: 'Cyclic state machines and schema-enforced tool execution.',
    description:
      'Designing robust autonomous agents using LangGraph and Python. Agents do not execute unconstrained generation; they operate through typed schemas, deterministic tool verification, retry policies, and transparent run traces.',
    architecturalPillars: [
      'Stateful cyclic graph orchestration (LangGraph)',
      'Deterministic JSON Schema validation on all tool calls',
      'Automated error-correction & fallback planning',
      'Auditable step-by-step execution telemetry',
    ],
    techUsed: ['LangGraph', 'LangChain', 'Python', 'FastAPI', 'Pydantic V2', 'Docker'],
    benchmark: 'Zero uncontrolled execution loops with verified fallback routing',
  },
  {
    id: 'rag',
    title: 'Production RAG & Evidence Grounding',
    category: 'RETRIEVAL & FACTUALITY',
    icon: Brain,
    headline: 'Eliminating hallucinations via passage citation gates.',
    description:
      'Architecting enterprise retrieval pipelines that decouple search from synthesis. Content is pre-indexed with hierarchical chunking, dense vector embeddings, and cross-encoder re-ranking. Generation is explicitly blocked unless verified citations match source passage IDs.',
    architecturalPillars: [
      'Passage-level citation matching & provenance tracking',
      'Hybrid dense vector + BM25 sparse keyword retrieval',
      'Cross-encoder re-ranking to boost top-k relevance',
      'Context compression to reduce LLM token overhead',
    ],
    techUsed: ['Sentence Transformers', 'ChromaDB', 'PostgreSQL pgvector', 'FastAPI', 'LangChain'],
    benchmark: '99.4% citation passage verification accuracy',
  },
  {
    id: 'ml',
    title: 'Applied Machine Learning & Statistical Modeling',
    category: 'PREDICTIVE SYSTEMS',
    icon: Workflow,
    headline: 'Production-ready clinical and cybersecurity classification.',
    description:
      'Developing supervised and ensemble machine learning systems from clinical disease risk predictors to high-velocity network intrusion classifiers. Rigorous handling of imbalanced datasets, cross-validation, and feature drift detection.',
    architecturalPillars: [
      'XGBoost, Random Forests & Ensemble Stacking',
      'SMOTE & class-weight compensation for severe imbalance',
      'Model explainability via SHAP & feature importance',
      'Continuous drift tracking with MLflow metrics',
    ],
    techUsed: ['PyTorch', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'MLflow'],
    benchmark: '97%+ F1 classification score on cybersecurity packet streams',
  },
  {
    id: 'backend',
    title: 'High-Concurrency Async Backend Architecture',
    category: 'SCALABLE INFRASTRUCTURE',
    icon: Server,
    headline: 'Sub-50ms async APIs powering AI inference.',
    description:
      'Engineering low-latency backend architectures with FastAPI, AsyncIO, and PostgreSQL. Cleanly decoupling heavy computational AI workers from lightweight client endpoints using connection pooling, background tasks, and streaming responses.',
    architecturalPillars: [
      'AsyncIO non-blocking event loops for high I/O throughput',
      'Strict schema validation with Pydantic V2 models',
      'Connection pooling for PostgreSQL and SQLite concurrency',
      'Automated OpenAPI spec generation and unit testing',
    ],
    techUsed: ['FastAPI', 'Python 3.12', 'Pydantic V2', 'SQLAlchemy', 'PostgreSQL', 'Uvicorn'],
    benchmark: 'Sub-50ms API response latency on production query endpoints',
  },
  {
    id: 'mlops',
    title: 'MLOps, Reproducibility & Cloud CI/CD',
    category: 'LIFECYCLE MANAGEMENT',
    icon: GitCommit,
    headline: 'Zero black boxes: reproducible models, code, and data.',
    description:
      'Implementing automated end-to-end MLOps architectures. Using MLflow for experiment tracking, DVC for dataset versioning, Docker for reproducible environments, and GitHub Actions for continuous testing and container deployment.',
    architecturalPillars: [
      'Automated model tracking & parameter logging via MLflow',
      'Data version control and remote synchronization with DVC',
      'Multi-stage Docker builds optimizing image footprint',
      'GitHub Actions automated linting, testing & deployment',
    ],
    techUsed: ['Docker', 'MLflow', 'DVC', 'DAGsHub', 'GitHub Actions', 'AWS', 'Vercel'],
    benchmark: '100% reproducible training runs across distributed environments',
  },
  {
    id: 'data',
    title: 'Data Ingestion, Web Scraping & ETL Pipelines',
    category: 'DATA PIPELINES',
    icon: Database,
    headline: 'Automated telemetry extraction and market analytics.',
    description:
      'Building resilient web-scraping pipelines and automated ETL pipelines to ingest dynamic market pricing, candidate resumes, and clinical datasets. Includes proxy rotation, robust error recovery, and strict schema validation.',
    architecturalPillars: [
      'Automated scraping with Selenium, BeautifulSoup4 & Playwright',
      'Schema validation & deduplication pipelines',
      'Automated Power BI and Tableau visualization exports',
      'Resilient retry logic with exponential backoff',
    ],
    techUsed: ['Selenium', 'BeautifulSoup4', 'Playwright', 'Pandas', 'Power BI', 'SQL'],
    benchmark: '25% improvement in team workflow delivery efficiency (Evoastra)',
  },
];

export default function Scene05Capabilities() {
  const [selectedCap, setSelectedCap] = useState<Capability>(CAPABILITIES[0]);

  return (
    <section
      id="scene-capabilities"
      className="relative z-10 min-h-screen py-32 px-6 md:px-12 lg:px-20 bg-[#030014] text-white overflow-hidden border-t border-violet-900/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-violet-400 uppercase mb-3">
              <Terminal className="w-3.5 h-3.5" />
              SCENE 05 // SYSTEM CAPABILITIES
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase font-display tracking-tight">
              ENGINEERING PILLARS<span className="text-violet-500">.</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-300 font-light max-w-2xl">
              Moving beyond theoretical demos into resilient, production-grade intelligence architectures.
            </p>
          </div>

          <span className="text-xs font-mono text-white/40 uppercase">
            6 VERIFIED COMPETENCY DOMAINS
          </span>
        </div>

        {/* Interactive Capability Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
          {/* Left Column: Capability List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              const isSelected = selectedCap.id === cap.id;
              return (
                <div
                  key={cap.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCap(cap);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? 'border-violet-500 bg-violet-950/40 shadow-[0_0_30px_rgba(139,92,246,0.3)] translate-x-2'
                      : 'border-white/10 bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isSelected
                          ? 'border-violet-400 bg-violet-600/30 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block">
                        {cap.category}
                      </span>
                      <h4 className="font-mono text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                        {cap.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-violet-400 translate-x-1' : 'text-white/20 group-hover:text-white/60'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Blueprint Specification */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-violet-500/30 bg-black/60 backdrop-blur-2xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">
                      {`// ARCHITECTURAL SPECIFICATION`}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                      {selectedCap.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-3 py-1 rounded-full">
                    {selectedCap.category}
                  </span>
                </div>

                {/* Headline & Description */}
                <div className="mt-6">
                  <p className="text-lg font-medium text-violet-200 font-mono">
                    {selectedCap.headline}
                  </p>
                  <p className="mt-3 text-sm text-gray-300 font-light leading-relaxed">
                    {selectedCap.description}
                  </p>
                </div>

                {/* Architectural Pillars */}
                <div className="mt-6">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-3">
                    {`// EXECUTION BLUEPRINT`}
                  </span>
                  <div className="space-y-2.5">
                    {selectedCap.architecturalPillars.map((p) => (
                      <div
                        key={p}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-200 font-mono"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-6">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-2">
                    {`// TECHNOLOGIES & PACKAGES`}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCap.techUsed.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-violet-950/40 border border-violet-800/30 text-[11px] font-mono text-violet-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Benchmark Callout */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                    VERIFIED PRODUCTION IMPACT
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300">
                    {selectedCap.benchmark}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYSTEM OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
