'use client';

import { ArrowUpRight, BarChart3, Braces, BrainCircuit, Workflow, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Applied AI & LLM Systems',
    description: 'Design and implement production-ready LLM pipelines with retrieval-augmented generation (RAG), structured JSON outputs, semantic embeddings, and tool routing.',
    icon: BrainCircuit,
    tools: 'LLMs · RAG · LangChain · LangGraph · FastEmbed',
  },
  {
    title: 'Machine Learning Pipelines',
    description: 'Construct end-to-end ML workflows: feature engineering, cross-validation, model calibration, and experiment tracking with reproducible versioning.',
    icon: Workflow,
    tools: 'Python · Scikit-learn · PyTorch · MLflow · DVC',
  },
  {
    title: 'Data Intelligence & BI',
    description: 'Transform complex multi-source tabular data into executive dashboards, star-schema models, DAX measures, and actionable decision metrics.',
    icon: BarChart3,
    tools: 'SQL · Pandas · Power BI · DAX · Tableau',
  },
  {
    title: 'Fast Backend & Model APIs',
    description: 'Architect scalable asynchronous Python backend services and lightweight client interfaces to bridge models, databases, and users.',
    icon: Braces,
    tools: 'FastAPI · Flask · PostgreSQL · TypeScript · Docker',
  },
];

export default function Scene05Services() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('scene-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="scene-services"
      className="relative z-10 scroll-mt-24 border-t border-purple-950/40 bg-transparent px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Engineering Services
            </div>
            <h2
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 0 24px rgba(168,85,247,0.45)' }}
            >
              How I Deliver Value<span className="text-purple-400">.</span>
            </h2>
            <p
              className="mt-3 max-w-2xl text-base leading-relaxed text-slate-100"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
            >
              Practical engineering support across AI systems, supervised machine learning, analytical architectures, and backend APIs.
            </p>
          </div>

          <a
            href="#scene-contact"
            onClick={scrollToContact}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/40 bg-purple-950/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-sm transition hover:bg-purple-900/60 hover:border-purple-400/70 shadow-[0_0_16px_rgba(168,85,247,0.2)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, description, icon: Icon, tools }, index) => (
            <article
              key={title}
              className="group rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-black/55 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-400/30 bg-purple-950/50 text-purple-300 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="font-mono text-xs text-purple-400/60">0{index + 1}</span>
              </div>

              <h3
                className="mt-6 text-lg font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}
              >
                {title}
              </h3>
              <p className="mt-2.5 min-h-[4.5rem] text-xs sm:text-sm leading-relaxed text-slate-200">
                {description}
              </p>
              <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[11px] leading-relaxed text-purple-300/80">
                {tools}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
