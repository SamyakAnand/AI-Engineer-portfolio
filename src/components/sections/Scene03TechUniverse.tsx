'use client';

import Image from 'next/image';
import { skills } from '@/content/skills';
import { Sparkles } from 'lucide-react';
import {
  siJavascript,
  siTypescript,
  siLangchain,
  siLanggraph,
  siDvc,
  siGithubactions,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const brandIcons: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  DVC: siDvc,
  'GitHub Actions': siGithubactions,
};

const logos: Record<string, string> = {
  Python: 'python.png',
  SQL: 'sql.png',
  PyTorch: 'pytorch_logo.png',
  TensorFlow: 'tensorflow_logo.png',
  'Scikit-learn': 'sklearn_logo.png',
  FastAPI: 'fastapi_logo.png',
  Flask: 'flask_logo.png',
  PostgreSQL: 'postgre.png',
  MongoDB: 'mongodb.png',
  Pandas: 'pandas_logo.png',
  NumPy: 'Numpy_logo.png',
  'Power BI': 'PowerBI_Logo.png',
  Tableau: 'tableau_logo.png',
  Docker: 'docker_logo.png',
  MLflow: 'mlflow_logo.png',
  'Git & GitHub': 'git.png',
  AWS: 'aws_logo.png',
};

const categoryBadges: Record<string, { label: string; color: string }> = {
  'AI ENGINEERING': { label: 'LLM & Agents', color: 'border-purple-400/30 bg-purple-950/40 text-purple-300' },
  'PROGRAMMING': { label: 'Languages', color: 'border-blue-400/30 bg-blue-950/40 text-blue-300' },
  'MACHINE LEARNING': { label: 'Algorithms & Modeling', color: 'border-violet-400/30 bg-violet-950/40 text-violet-300' },
  'BACKEND DEVELOPMENT': { label: 'APIs & Services', color: 'border-emerald-400/30 bg-emerald-950/40 text-emerald-300' },
  'DATA SCIENCE': { label: 'Analytics & BI', color: 'border-amber-400/30 bg-amber-950/40 text-amber-300' },
  'MLOPS AND INFRASTRUCTURE': { label: 'Pipelines & Cloud', color: 'border-fuchsia-400/30 bg-fuchsia-950/40 text-fuchsia-300' },
};

export default function Scene03TechUniverse() {
  return (
    <section
      id="scene-tech"
      className="relative z-10 scroll-mt-24 border-t border-white/10 bg-transparent px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Technical Capabilities
          </div>
          <h2
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 0 24px rgba(168,85,247,0.45)' }}
          >
            Engineered for Intelligent Systems<span className="text-purple-400">.</span>
          </h2>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
          >
            A disciplined, production-oriented technical stack spanning foundation models, agentic workflows, machine learning, scalable backend services, and MLOps.
          </p>
        </div>

        {/* 6 Structured Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group) => {
            const badge = categoryBadges[group.category] || { label: 'Capability', color: 'border-purple-400/30 bg-purple-950/40 text-purple-300' };

            return (
              <section
                key={group.category}
                className="group rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-purple-400/40 hover:bg-black/55 sm:p-7"
              >
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <h3
                    className="text-base font-bold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                  >
                    {group.category}
                  </h3>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {group.skills.map((skill) => {
                    const logo = logos[skill.name];
                    const brand = brandIcons[skill.name];

                    return (
                      <li
                        key={skill.name}
                        className="group/item flex min-h-12 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-purple-400/40 hover:bg-white/[0.08] hover:text-white"
                      >
                        {logo ? (
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/95 p-1 shadow-sm">
                            <Image
                              src={`/portfolio/skills/${logo}`}
                              alt={skill.name}
                              width={24}
                              height={24}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        ) : brand ? (
                          <span
                            aria-hidden="true"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/[0.08] p-1.5"
                            style={{ color: `#${brand.hex}` }}
                          >
                            <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
                              <path d={brand.path} />
                            </svg>
                          </span>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-purple-400/30 bg-purple-950/50 text-[10px] font-bold text-purple-200 shadow-sm"
                          >
                            {skill.name.includes('Large') ? 'LLM' : skill.name.includes('Retrieval') ? 'RAG' : skill.name.includes('Agents') ? 'AGT' : skill.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}

                        <span
                          className="min-w-0 font-medium leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,1)]"
                          style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
                        >
                          {skill.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
