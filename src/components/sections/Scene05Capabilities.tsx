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
  evidence: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'agentic',
    title: 'Agentic AI & Deterministic Tool Orchestration',
    category: 'AUTONOMOUS WORKFLOWS',
    icon: Bot,
    headline: 'Stateful workflows with typed inputs, explicit boundaries, and inspectable run history.',
    description:
      'Exploring agent-style workflows through Python projects that model state, typed handoffs, bounded routines, and inspectable execution history. The current portfolio prototypes do not claim a production agent sandbox.',
    architecturalPillars: [
      'Stateful workflow concepts and typed handoffs',
      'Typed task boundaries and explicit completion states',
      'Explicit failure boundaries and bounded execution',
      'Persisted workflow state and inspectable artifacts',
    ],
    techUsed: ['LangGraph', 'LangChain', 'Python', 'FastAPI', 'Pydantic V2', 'Docker'],
    evidence: 'AKATSUKI documents four deterministic routines and one fixed verification path',
  },
  {
    id: 'rag',
    title: 'Retrieval Workflows & Evidence Traceability',
    category: 'RETRIEVAL & FACTUALITY',
    icon: Brain,
    headline: 'Preserving source context with passage offsets and reference checks.',
    description:
      'Building local document workflows that separate passage retrieval from optional answer synthesis. ARGUS indexes Markdown and UTF-8 text, retrieves passages lexically, tracks source offsets, and validates citation IDs.',
    architecturalPillars: [
      'Passage-level citation matching & provenance tracking',
      'Lexical passage retrieval over indexed text',
      'Exact source-offset mapping for traceability',
      'Optional synthesis is disabled by default',
    ],
    techUsed: ['Python', 'FastAPI', 'SQLite', 'Next.js', 'TypeScript'],
    evidence: 'ARGUS: lexical retrieval, source offsets, and citation-ID checks; no semantic entailment claim',
  },
  {
    id: 'ml',
    title: 'Applied Machine Learning & Statistical Modeling',
    category: 'PREDICTIVE SYSTEMS',
    icon: Workflow,
    headline: 'Modular supervised learning workflows and evaluation.',
    description:
      'Building and studying supervised ML workflows, including a five-category disease predictor and a network-security pipeline. Project work covers data validation, transformation, training, and drift reporting.',
    architecturalPillars: [
      'Regression and classification workflows',
      'Feature engineering and preprocessing',
      'Model evaluation and validation',
      'Drift reporting in modular ML pipelines',
    ],
    techUsed: ['Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'Pandas', 'MLflow'],
    evidence: 'Disease Predictor: modular pipelines for five disease categories; Network Security: ML workflow documented in repository',
  },
  {
    id: 'backend',
    title: 'Python Backend & API Engineering',
    category: 'PYTHON API DEVELOPMENT',
    icon: Server,
    headline: 'Practical APIs with validation, clear contracts, and useful integrations.',
    description:
      'Developing Python APIs with FastAPI and Flask, REST endpoints, Pydantic validation, and data-store integrations for AI and analytics applications.',
    architecturalPillars: [
      'REST API design with FastAPI and Flask',
      'Strict schema validation with Pydantic V2 models',
      'Pydantic request and response validation',
      'Integration with SQLite, PostgreSQL, and MongoDB',
    ],
    techUsed: ['Python', 'FastAPI', 'Flask', 'Pydantic', 'SQLite', 'PostgreSQL'],
    evidence: 'FastAPI and Flask REST API development with request validation and documented endpoints',
  },
  {
    id: 'mlops',
    title: 'MLOps, Experiment Tracking & Delivery',
    category: 'REPRODUCIBLE WORKFLOWS',
    icon: GitCommit,
    headline: 'Track experiments and organize repeatable project workflows.',
    description:
      'Using MLflow and DagsHub for experiment tracking in ML projects, alongside DVC, Docker, and GitHub Actions in the broader development toolkit. The portfolio does not claim a fully automated production MLOps platform.',
    architecturalPillars: [
      'Experiment tracking and metric logging with MLflow',
      'Dataset versioning workflows with DVC',
      'Containerized development and reproducible environments with Docker',
      'CI workflows and repository checks with GitHub Actions',
    ],
    techUsed: ['Docker', 'MLflow', 'DVC', 'DAGsHub', 'GitHub Actions', 'AWS', 'Vercel'],
    evidence: 'MLflow and DagsHub used in ML projects; DVC, Docker and GitHub Actions in the toolkit',
  },
  {
    id: 'data',
    title: 'Data Ingestion, Web Scraping & ETL Pipelines',
    category: 'DATA PIPELINES',
    icon: Database,
    headline: 'Automated telemetry extraction and market analytics.',
    description:
      'Building data collection and preparation workflows, including CARS24 listing scraping, resume text processing, clinical dataset preparation, and analytical reporting.',
    architecturalPillars: [
      'Web scraping and HTML parsing with Python tools',
      'Schema validation & deduplication pipelines',
      'Data preparation for Power BI and Tableau reporting',
      'Schema checks, cleaning, and deduplication',
    ],
    techUsed: ['Python', 'BeautifulSoup', 'Pandas', 'SQL', 'Power BI', 'Tableau'],
    evidence: 'Evoastra: CARS24 data collection and NLP resume-analysis workflow',
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
              Practical engineering across retrieval, analytics, model workflows, APIs, and reproducible development.
            </p>
          </div>

          <span className="text-xs font-mono text-white/40 uppercase">
            6 PROJECT-BACKED COMPETENCY AREAS
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

              {/* Bottom Project Evidence Callout */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                    PROJECT EVIDENCE
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300">
                    {selectedCap.evidence}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DOCUMENTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
