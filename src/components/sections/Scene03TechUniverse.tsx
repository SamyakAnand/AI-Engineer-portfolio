import Image from 'next/image';
import { skills } from '@/content/skills';
import {
  siReact,
  siNextdotjs,
  siJavascript,
  siTypescript,
  siNodedotjs,
  siLangchain,
  siLanggraph,
  siHuggingface,
  siAnthropic,
  siDeepseek,
  siGooglegemini,
  siMetaai,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const brandIcons: Record<string, SimpleIcon> = {
  React: siReact,
  'Next.js': siNextdotjs,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  'Node.js': siNodedotjs,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  'Hugging Face Transformers': siHuggingface,
  'Claude 3.5 & 3.7 Sonnet (Anthropic)': siAnthropic,
  'DeepSeek V3 & R1 Reasoning': siDeepseek,
  'Google Gemini 2.0 & Flash': siGooglegemini,
  'Meta Llama 3 & 3.3': siMetaai,
};

const logos: Record<string, string> = {
  PyTorch: 'pytorch_logo.png',
  TensorFlow: 'tensorflow_logo.png',
  Keras: 'keras_logo.png',
  'Scikit-learn': 'sklearn_logo.png',
  'spaCy & NLTK': 'nltk_logo.png',
  Python: 'python.png',
  Pandas: 'pandas_logo.png',
  NumPy: 'Numpy_logo.png',
  SQL: 'sql.png',
  PostgreSQL: 'postgre.png',
  'MySQL & SQL Server': 'mysql.png',
  MongoDB: 'mongodb.png',
  'Power BI': 'PowerBI_Logo.png',
  Tableau: 'tableau_logo.png',
  FastAPI: 'fastapi_logo.png',
  Flask: 'flask_logo.png',
  Docker: 'docker_logo.png',
  MLflow: 'mlflow_logo.png',
  DAGsHub: 'dagshub_logo.png',
  'Git & GitHub': 'git.png',
  Jupyter: 'jupyter_logo.png',
};

function renderCustomModelIcon(name: string) {
  if (name.includes('ChatGPT')) {
    // OpenAI / ChatGPT icon
    return (
      <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-emerald-400/25 bg-emerald-950/30 p-1.5 text-emerald-300">
        <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
          <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76c.24-.14.39-.4.39-.68v-6.74l2.02 1.17c.02.01.04.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zm-9.66-4.13a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76c.24.14.54.14.78 0l5.85-3.37v2.33c0 .03-.01.05-.04.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.49 4.49 0 0 1 2.37-1.98v5.68c0 .28.15.54.39.68l5.81 3.35-2.02 1.17c-.02.01-.05.01-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.1 3.85-5.84-3.37 2.02-1.17c.02-.01.05-.01.07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67c0-.28-.15-.54-.4-.68zm2.01-3.02-.14-.08-4.78-2.79c-.24-.14-.54-.14-.78 0L9.41 9.23V6.9c0-.03.01-.05.03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.79 2.76c-.24.14-.39.4-.39.68zm1.1-2.36 2.6-1.5 2.61 1.5v3l-2.6 1.5-2.61-1.5z" />
        </svg>
      </span>
    );
  }
  if (name.includes('Grok')) {
    // xAI / Grok icon
    return (
      <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/20 bg-white/[0.08] p-1.5 text-white">
        <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </span>
    );
  }
  if (name.includes('Antigravity')) {
    // Google Antigravity icon
    return (
      <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-violet-400/30 bg-violet-950/40 p-1.5 text-violet-300">
        <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
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
      className="relative z-10 scroll-mt-24 border-t border-white/10 bg-transparent px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm text-sky-100/75">Skills</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Tools and areas of focus
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            A comprehensive overview across frontier foundation models, agentic frameworks, machine learning, scalable backend architectures, and data engineering.
          </p>
        </div>

        {/* Transparent grid without heavy opaque canvas containers */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group) => (
            <section
              key={group.category}
              className="rounded-2xl border border-white/[0.12] bg-slate-950/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition hover:border-sky-400/30 sm:p-6"
            >
              <h3 className="mb-4 text-base font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {group.category}
              </h3>
              <ul className="grid grid-cols-2 gap-2.5">
                {group.skills.map((skill) => {
                  const logo = logos[skill.name];
                  const brand = brandIcons[skill.name];
                  const custom = renderCustomModelIcon(skill.name);

                  return (
                    <li
                      key={skill.name}
                      className="group flex min-h-12 min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] px-2.5 py-2 text-sm text-white/95 backdrop-blur-[2px] transition hover:bg-white/[0.09] hover:border-sky-400/40 hover:scale-[1.01] sm:px-3"
                    >
                      {logo ? (
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/90 p-1 shadow-sm">
                          <Image
                            src={`/portfolio/skills/${logo}`}
                            alt=""
                            width={28}
                            height={28}
                            className="h-full w-full object-contain"
                          />
                        </span>
                      ) : brand ? (
                        <span
                          aria-hidden="true"
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/[0.08] p-1.5"
                          style={{ color: `#${brand.hex}` }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-full w-full fill-current"
                          >
                            <path d={brand.path} />
                          </svg>
                        </span>
                      ) : custom ? (
                        custom
                      ) : (
                        <span
                          aria-hidden="true"
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-sky-400/25 bg-sky-950/40 text-[9px] font-bold text-sky-200"
                        >
                          {skill.name.includes('Retrieval')
                            ? 'RAG'
                            : skill.name.includes('Large language')
                            ? 'LLM'
                            : skill.group === 'frontier'
                            ? 'FM'
                            : skill.group === 'ai'
                            ? 'AI'
                            : skill.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <span className="min-w-0 break-words text-xs sm:text-sm font-medium leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        {skill.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
