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
  siAnthropic,
  siGooglegemini,
  siDeepseek,
  siOllama,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const brandIcons: Record<string, { icon: SimpleIcon; color?: string }> = {
  JavaScript: { icon: siJavascript, color: '#f7df1e' },
  TypeScript: { icon: siTypescript, color: '#3178c6' },
  LangChain: { icon: siLangchain, color: '#2dd4bf' },
  LangGraph: { icon: siLanggraph, color: '#a78bfa' },
  DVC: { icon: siDvc, color: '#945dd6' },
  'GitHub Actions': { icon: siGithubactions, color: '#38bdf8' },
  Claude: { icon: siAnthropic, color: '#d97757' },
  Gemini: { icon: siGooglegemini, color: '#a78bfa' },
  DeepSeek: { icon: siDeepseek, color: '#5786FE' },
  Ollama: { icon: siOllama, color: '#ffffff' },
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
  Hermes: 'hermes.png',
};

const categoryBadges: Record<string, { label: string; color: string }> = {
  'AI ENGINEERING': { label: 'LLM & Agents', color: 'border-purple-400/30 bg-purple-950/40 text-purple-300' },
  'PROGRAMMING & AI TOOLS': { label: 'Languages & AI Models', color: 'border-blue-400/30 bg-blue-950/40 text-blue-300' },
  'PROGRAMMING': { label: 'Languages & AI Models', color: 'border-blue-400/30 bg-blue-950/40 text-blue-300' },
  'MACHINE LEARNING': { label: 'Algorithms & Modeling', color: 'border-violet-400/30 bg-violet-950/40 text-violet-300' },
  'BACKEND DEVELOPMENT': { label: 'APIs & Services', color: 'border-emerald-400/30 bg-emerald-950/40 text-emerald-300' },
  'DATA SCIENCE': { label: 'Analytics & BI', color: 'border-amber-400/30 bg-amber-950/40 text-amber-300' },
  'MLOPS AND INFRASTRUCTURE': { label: 'Pipelines & Cloud', color: 'border-fuchsia-400/30 bg-fuchsia-950/40 text-fuchsia-300' },
};

function renderCustomToolIcon(name: string) {
  if (name.includes('ChatGPT')) {
    return (
      <span
        aria-hidden="true"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-emerald-400/30 bg-emerald-950/40 p-1 text-emerald-300 shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
          <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76c.24-.14.39-.4.39-.68v-6.74l2.02 1.17c.02.01.04.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zm-9.66-4.13a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76c.24.14.54.14.78 0l5.85-3.37v2.33c0 .03-.01.05-.04.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.49 4.49 0 0 1 2.37-1.98v5.68c0 .28.15.54.39.68l5.81 3.35-2.02 1.17c-.02.01-.05.01-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.1 3.85-5.84-3.37 2.02-1.17c.02-.01.05-.01.07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67c0-.28-.15-.54-.4-.68zm2.01-3.02-.14-.08-4.78-2.79c-.24-.14-.54-.14-.78 0L9.41 9.23V6.9c0-.03.01-.05.03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.79 2.76c-.24.14-.39.4-.39.68zm1.1-2.36 2.6-1.5 2.61 1.5v3l-2.6 1.5-2.61-1.5z" />
        </svg>
      </span>
    );
  }
  if (name.includes('Kimi')) {
    return (
      <span
        aria-hidden="true"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-950/40 p-1 text-cyan-300 shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A6.006 6.006 0 0 1 6.07 12H6a1 1 0 0 1 0-2h.07A6.006 6.006 0 0 1 11 5.07V5a1 1 0 0 1 2 0v.07A6.006 6.006 0 0 1 17.93 10H18a1 1 0 0 1 0 2h-.07A6.006 6.006 0 0 1 13 16.93z" />
        </svg>
      </span>
    );
  }

  if (name.includes('DeepSeek Harness')) {
    return (
      <span
        aria-hidden="true"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-indigo-400/30 bg-indigo-950/40 p-1 text-indigo-300 shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-full w-full fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17l6-6-6-6M12 19h8" stroke="#5786FE" strokeWidth="2.5" />
          <circle cx="17" cy="8" r="3" fill="#5786FE" fillOpacity="0.35" stroke="#818cf8" strokeWidth="1.5" />
        </svg>
      </span>
    );
  }
  return null;
}

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
                    const brandObj = brandIcons[skill.name];
                    const customIcon = renderCustomToolIcon(skill.name);

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
                        ) : brandObj ? (
                          <span
                            aria-hidden="true"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/[0.08] p-1.5"
                            style={{ color: brandObj.color || `#${brandObj.icon.hex}` }}
                          >
                            <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
                              <path d={brandObj.icon.path} />
                            </svg>
                          </span>
                        ) : customIcon ? (
                          customIcon
                        ) : (
                          <span
                            aria-hidden="true"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-purple-400/30 bg-purple-950/50 text-[10px] font-bold text-purple-200 shadow-sm"
                          >
                            {skill.name.includes('Large')
                              ? 'LLM'
                              : skill.name.includes('Retrieval')
                              ? 'RAG'
                              : skill.name.includes('Agents')
                              ? 'AGT'
                              : skill.name.slice(0, 2).toUpperCase()}
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
