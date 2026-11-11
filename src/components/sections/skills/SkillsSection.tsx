'use client';

import { tokens } from '@/lib/design-system';

export interface SkillCategory {
  name: string;
  groups: SkillGroup[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

const categories: SkillCategory[] = [
  {
    name: 'AI & MACHINE LEARNING',
    groups: [
      {
        name: 'Deep Learning',
        items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras'],
      },
      {
        name: 'LLMs & NLP',
        items: ['Hugging Face Transformers', 'NLP', 'Embeddings', 'Sentence Transformers'],
      },
      {
        name: 'Knowledge & Retrieval',
        items: ['RAG', 'Vector Databases', 'LangChain', 'LlamaIndex'],
      },
    ],
  },
  {
    name: 'LLM & GENERATIVE AI',
    groups: [
      {
        name: 'Application Engineering',
        items: ['FastAPI', 'OpenRouter', 'Ollama', 'LiteLLM'],
      },
      {
        name: 'Agentic Systems',
        items: ['LangGraph', 'AutoGen', 'Multi-Agent Systems', 'Workflow Orchestration'],
      },
      {
        name: 'Evaluation',
        items: ['LLM-as-Judge', 'Benchmarking', 'RAGAS', 'Human Evaluation'],
      },
    ],
  },
  {
    name: 'DATA SCIENCE & ANALYTICS',
    groups: [
      {
        name: 'Data Engineering',
        items: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'ETL', 'Data Profiling'],
      },
      {
        name: 'Analytics & Visualization',
        items: ['Power Query', 'Power BI', 'Pandas', 'NumPy', 'Polars'],
      },
      {
        name: 'Applied ML',
        items: ['Scikit-learn', 'Model Evaluation', 'Feature Engineering', 'Time Series'],
      },
    ],
  },
  {
    name: 'BACKEND ENGINEERING',
    groups: [
      {
        name: 'APIs & Services',
        items: ['REST', 'AsyncIO', 'FastAPI', 'Pydantic', 'GraphQL'],
      },
      {
        name: 'Systems & Infrastructure',
        items: ['TypeScript', 'JavaScript', 'Node.js', 'C/C++', 'Bash', 'Git'],
      },
      {
        name: 'Application Architecture',
        items: ['System Design', 'API Design', 'Microservices', 'Docker'],
      },
    ],
  },
  {
    name: 'MLOPS & DEPLOYMENT',
    groups: [
      {
        name: 'ML Operations',
        items: ['MLflow', 'DVC', 'Model Registry', 'Experiment Tracking'],
      },
      {
        name: 'Cloud & Infrastructure',
        items: ['AWS Basics', 'Vercel', 'Docker', 'Kubernetes', 'CI/CD'],
      },
      {
        name: 'Database & Storage',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'S3', 'Vector Stores'],
      },
    ],
  },
  {
    name: 'PROJECTS',
    groups: [
      {
        name: 'AI Products',
        items: ['NEXUS', 'ARGUS AI', 'StudyCopilot', 'Resume Analyzer'],
      },
      {
        name: 'Tools & Utilities',
        items: ['Document Analyzer', 'Resume Matcher', 'Data Pipeline Builder', 'Demo Generator'],
      },
      {
        name: 'Open Source',
        items: ['Nexus Repository', 'Argus Repository', 'Resume Analyzer Repo'],
      },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="editorial-section skills-section" data-build-layer="Technical capabilities">
      <div className="section-shell">
        <div className="section-kicker mb-6">
          <span>03</span>
          <span className="text-[#929095] uppercase tracking-[.15em] font-mono text-xs">
            TECHNICAL CAPABILITIES
          </span>
        </div>

        <div className="display-heading mb-6 max-w-4xl" style={{ lineHeight: 1.2 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            TOOLS FOR<span className="text-[#a78bfa]"> THE WORK.</span>
          </h2>
          <p className="text-[#929095] mt-4 max-w-xl">
            Honest, working knowledge across the stack — from data and models to the systems around them.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category, catIndex) => (
            <article
              key={catIndex}
              className="group rounded-xl border border-[#2a2a3e] bg-[#171719] overflow-hidden transition-all duration-300 hover:border-[#3a3a4e] hover:shadow-lg hover:shadow-[rgba(124,58,237,.06)]"
            >
              {/* Category header */}
              <div
                className="px-5 py-4 flex items-center justify-between cursor-pointer group/head"
                style={{ borderBottom: '1px solid var(--line)' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm font-mono font-bold uppercase tracking-widest"
                    style={{ color: 'var(--accent)', fontSize: '10px' }}
                  >
                    {catIndex + 1}
                  </span>
                  <span className="text-sm font-semibold text-white uppercase tracking-wider">
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-[#66636a] group-hover/head:text-[#a78bfa] transition-colors">
                  {category.groups.reduce((acc, g) => acc + g.items.length, 0)}
                </span>
              </div>

              {/* Technology chips */}
              <div className="p-5 grid gap-3">
                {category.groups.map((group) => (
                  <div key={group.name}>
                    <p
                      className="text-xs font-semibold text-[#a78bfa] mb-2 uppercase tracking-wider"
                      style={{ fontSize: '10px', letterSpacing: '0.05em' }}
                    >
                      {group.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-md"
                          style={{
                            background: 'rgba(124,58,237,.07)',
                            color: '#c8c6cc',
                            border: '1px solid rgba(124,58,237,.12)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
