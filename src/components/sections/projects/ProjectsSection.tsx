'use client';

import { tokens } from '@/lib/design-system';
import { ProjectCard } from '@/components/sections/projects/ProjectCard';

export interface Project {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  architecture: string;
  github: string;
  demo: string | null;
  accent: string;
}

const projects: Project[] = [
  {
    id: 'nexus',
    number: '01',
    name: 'NEXUS',
    subtitle: 'Autonomous Data Analyst',
    description: 'An autonomous data analyst that takes a natural-language question, retrieves and prepares the relevant data, and returns an analysis with a reproducible pipeline.',
    problem: 'Data analysis is still bottlenecked by manual ETL and ad-hoc scripting. Analysts spend more time preparing data than extracting insight.',
    solution: 'Question parsing into structured intent, schema-aware retrieval of candidate datasets, a validated preparation stage, and a deterministic execution stage that emits a report and a plan for reproducibility.',
    stack: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'FastAPI', 'PostgreSQL', 'Docker'],
    features: ['Natural-language input', 'Automated data preparation', 'Reproducible pipelines', 'Report generation'],
    architecture: 'Question parsing into structured intent, schema-aware retrieval of candidate datasets, a validated preparation stage, and a deterministic execution stage that emits a report and a plan for reproducibility.',
    github: 'https://github.com/SamyakAnand/nexus',
    demo: null,
    accent: '#7c3aed',
  },
  {
    id: 'argus',
    number: '02',
    name: 'ARGUS AI',
    subtitle: 'Evidence-Oriented Analytics',
    description: 'An evidence-oriented analytics platform that ties every conclusion back to its source data, so claims are verifiable rather than asserted.',
    problem: 'Analytics dashboards often present conclusions without exposing the evidence behind them, which breaks trust in fast-moving decisions.',
    solution: 'A query layer that captures the provenance of each metric, a verification stage that re-computes totals and distributions on demand, and a presentation layer that links every number to its source table.',
    stack: ['Python', 'SQL', 'PostgreSQL', 'Power BI', 'Tableau', 'NumPy', 'Pandas'],
    features: ['Evidence linking', 'On-demand verification', 'Metric provenance', 'Dashboard export'],
    architecture: 'A query layer that captures the provenance of each metric, a verification stage that re-computes totals and distributions on demand, and a presentation layer that links every number to its source table.',
    github: 'https://github.com/SamyakAnand/argus-ai',
    demo: null,
    accent: '#6366f1',
  },
  {
    id: 'studycopilot',
    number: '03',
    name: 'StudyCopilot',
    subtitle: 'AI Study Assistant',
    description: 'A Telegram Mini App that helps learners summarise material, build flashcards, and generate practice quizzes with Ollama and OpenRouter integration.',
    problem: 'Students reviewing large amounts of material spend hours hand-writing summaries, flashcards, and practice questions.',
    solution: 'A Telegram Mini App front end, a FastAPI service with an LLM summariser, and a generative card/quizzing engine. Local models run via Ollama; cloud models are routed through OpenRouter, keeping the deployment portable.',
    stack: ['Telegram Mini App', 'FastAPI', 'Python', 'Ollama', 'OpenRouter'],
    features: ['AI summaries', 'Flashcard generation', 'Quiz generation', 'Local inference'],
    architecture: 'A Telegram Mini App front end, a FastAPI service with an LLM summariser, and a generative card/quizzing engine. Local models run via Ollama; cloud models are routed through OpenRouter, keeping the deployment portable.',
    github: 'https://github.com/SamyakAnand/studycopilot',
    demo: null,
    accent: '#22d3ee',
  },
  {
    id: 'resume-analyzer',
    number: '04',
    name: 'Resume Analyzer',
    subtitle: 'NLP Web Application',
    description: 'A hybrid scoring web application that parses resumes and matches them against job descriptions using semantic similarity.',
    problem: 'Job seekers spend hours manually tailoring resumes, and recruiters struggle to screen high volumes of applications efficiently.',
    solution: 'Resume parsing, semantic matching against job descriptions, and hybrid scoring that ranks candidates by fit.',
    stack: ['Python', 'FastAPI', 'NLP', 'Embeddings', 'Semantic Search'],
    features: ['Resume parsing', 'Job description matching', 'Semantic scoring', 'Ranks candidates by fit'],
    architecture: 'Resume parsing, semantic matching against job descriptions, and hybrid scoring that ranks candidates by fit.',
    github: 'https://github.com/SamyakAnand/resume-analyzer',
    demo: null,
    accent: '#fbbf24',
  },
];

export function ProjectsSection() {
  return (
    <section id="work" className="editorial-section work-section" data-build-layer="Projects">
      <div className="section-shell">
        <div className="section-kicker mb-6">
          <span>02</span>
          <span className="text-[#929095] uppercase tracking-[.15em] font-mono text-xs">
            SELECTED PROJECTS
          </span>
        </div>

        <div className="display-heading mb-6 max-w-4xl" style={{ lineHeight: 1.2 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            WHAT <span className="text-[#a78bfa]">I&apos;VE BUILT.</span>
          </h2>
          <p className="text-[#929095] mt-4 max-w-xl">
            Four production systems — each solving a real problem with applied AI engineering.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
