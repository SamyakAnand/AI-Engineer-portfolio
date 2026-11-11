'use client';

import { useState } from 'react';
import { tokens } from '@/lib/design-system';

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

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="project-card group relative overflow-hidden rounded-xl border border-[#2a2a3e] bg-[#171719] transition-all duration-500 hover:border-[#3a3a4e] hover:shadow-xl hover:shadow-[rgba(124,58,237,.08)]">
      {/* Number badge */}
      <div
        className="absolute top-4 left-4 text-xl font-mono font-bold text-[#a78bfa]"
        style={{ fontWeight: 700, letterSpacing: '0.05em' }}
      >
        {project.number}
      </div>

      {/* Accent mark */}
      <div
        className="absolute top-4 right-4 text-2xl opacity-30"
        style={{ color: project.accent }}
      >
        {project.number === '01' ? '■' : project.number === '02' ? '▣' : project.number === '03' ? '▢' : '▤'}
      </div>

      {/* Copy stamp */}
      {copied && (
        <div
          className="absolute top-4 right-12 z-10 px-2.5 py-1 rounded-md text-white text-[8px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(124,58,237,.85)' }}
        >
          Copied
        </div>
      )}

      {/* Card header */}
      <div className="p-6">
        <h3
          className="text-xl font-display font-bold text-white mb-3 uppercase tracking-wider"
          style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}
        >
          {project.name}
        </h3>
        <p className="text-xs text-[#929095] mb-4 font-medium uppercase tracking-wider">
          {project.subtitle}
        </p>
        <p>{project.description}</p>
      </div>

      {/* Problem / Solution */}
      <div className="px-6 pb-6 grid gap-3">
        <div className="flex gap-3">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: project.accent }}
          />
          <p className="text-xs text-[#929095] leading-relaxed">
            <strong>Problem:</strong> {project.problem}
          </p>
        </div>
        <div className="flex gap-3" style={{ marginTop: '8px' }}>
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: 'rgba(59,130,246,.6)' }}
          />
          <p className="text-xs text-[#929095] leading-relaxed">
            <strong>Solution:</strong> {project.solution}
          </p>
        </div>
      </div>

      {/* Tech stack */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md"
              style={{
                background: 'rgba(124,58,237,.08)',
                color: 'var(--text-dim)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-6 pb-6 pt-3 border-t border-[#2a2a3e] flex justify-between items-center gap-4"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#a78bfa] hover:text-white transition-colors"
            >
              <span className="w-3 h-3 rounded-full bg-[#f7971b] flex items-center justify-center text-white text-xs">
                {'</>'}
              </span>
              Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#3b82f6] hover:text-white transition-colors"
            >
              <span className="w-3 h-3 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
              Live Demo
            </a>
          )}
        </div>
        <button
          onClick={() => handleCopy(project.github || '')}
          className="text-[10px] font-medium text-[#66636a] hover:text-white transition-colors flex items-center gap-1"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </article>
  );
}
