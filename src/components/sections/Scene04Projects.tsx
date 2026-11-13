'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import {
  GitBranch, Terminal, Cpu, CheckCircle, ArrowRight,
  ShieldCheck, X, ExternalLink, Layers, AlertCircle, Wrench, Sparkles
} from 'lucide-react';
import { soundFx } from '@/components/sound/AmbientSoundManager';

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ts = (size: 'sm' | 'md' | 'lg') => ({
  textShadow: {
    sm: '0 1px 6px rgba(0,0,0,1)',
    md: '0 2px 10px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)',
    lg: '0 3px 18px rgba(0,0,0,1), 0 2px 6px rgba(0,0,0,1)',
  }[size],
});

export default function Scene04Projects() {
  const projectList = Object.values(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="scene-projects"
      className="relative z-10 min-h-screen scroll-mt-24 overflow-hidden border-t border-purple-950/40 bg-transparent px-6 py-32 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 border-b border-white/[0.12] pb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]"
              style={ts('sm')}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Engineering Portfolio
            </div>
            <h2
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              style={ts('lg')}
            >
              Flagship Case Studies<span className="text-purple-400">.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base font-light text-slate-100 sm:text-lg" style={ts('md')}>
              Production-oriented AI systems, reproducible data pipelines, and evidence-oriented intelligence architectures built to solve real-world problems.
            </p>
          </div>

          <a
            href="https://github.com/SamyakAnand"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-purple-400/40 bg-purple-950/40 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-purple-200 backdrop-blur-sm transition hover:bg-purple-900/60 hover:border-purple-400/70 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <GitBranch className="h-4 w-4 text-purple-400" />
            Explore GitHub Repos
          </a>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project, idx) => (
            <motion.div
              key={project.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-black/45 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-black/55 hover:shadow-[0_16px_60px_rgba(168,85,247,0.25)]"
            >
              {/* Image Preview */}
              {project.screenshots[0] ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/[0.08]">
                  <Image
                    src={project.screenshots[0]}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center border-b border-white/[0.08] bg-gradient-to-br from-purple-950/60 to-black/60">
                  <Layers className="h-12 w-12 text-purple-400/30" />
                </div>
              )}

              {/* Number & Category Badge */}
              <div className="flex items-center justify-between px-6 pt-5">
                <span className="rounded-full border border-purple-400/30 bg-purple-950/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-purple-300">
                  {project.category || `Project 0${idx + 1}`}
                </span>
                <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6">
                {/* Title */}
                <h3
                  className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl"
                  style={ts('lg')}
                >
                  {project.name}
                </h3>

                {/* Description */}
                <p
                  className="mt-3 text-xs sm:text-sm font-normal leading-relaxed text-slate-200 line-clamp-3"
                  style={ts('md')}
                >
                  {project.description}
                </p>

                {/* Architecture Approach Box */}
                <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-950/40 p-3 backdrop-blur-sm">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-purple-300" style={ts('sm')}>
                    Pipeline Flow
                  </span>
                  <p className="text-xs leading-relaxed text-slate-100 line-clamp-2" style={ts('sm')}>
                    {project.architecture}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-purple-400/25 bg-purple-950/50 px-2.5 py-1 text-[10px] font-medium text-purple-200"
                      style={ts('sm')}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-4 mt-5">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 transition hover:text-white"
                    style={ts('sm')}
                  >
                    Inspect Case Study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View GitHub Repository"
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-purple-600/40 hover:border-purple-400 hover:text-white"
                    >
                      <GitBranch className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="text-[10px] uppercase text-white/30" style={ts('sm')}>Internal</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Detailed Engineering Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-3xl border border-purple-500/40 bg-[#060414]/98 p-6 shadow-[0_0_80px_rgba(168,85,247,0.35)] max-h-[90vh] overflow-y-auto sm:p-8"
              initial={{ scale: 0.92, y: 32, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 32, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study"
                className="absolute right-4 top-4 rounded-xl bg-white/5 p-2 text-white/60 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-white/[0.12] pb-6 pr-8">
                <span className="rounded-full border border-purple-400/30 bg-purple-950/40 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  {selectedProject.category || 'AI Case Study'}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {selectedProject.name}
                </h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Screenshot Preview */}
              {selectedProject.screenshots[0] && (
                <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                  <Image
                    src={selectedProject.screenshots[0]}
                    alt={selectedProject.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Problem Solved */}
              <div className="mt-6">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
                  <ShieldCheck className="h-4 w-4" />
                  Problem Statement
                </h4>
                <p className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-100">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Pipeline Architecture */}
              <div className="mt-6">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-300">
                  <Cpu className="h-4 w-4" />
                  Technical Architecture
                </h4>
                <div className="rounded-2xl border border-purple-400/20 bg-purple-950/40 p-4 font-mono text-xs leading-relaxed text-purple-100">
                  {selectedProject.architecture}
                </div>
              </div>

              {/* Engineering Decisions */}
              {selectedProject.decisions && (
                <div className="mt-6">
                  <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                    <Wrench className="h-4 w-4" />
                    Key Engineering Decisions
                  </h4>
                  <p className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-xs sm:text-sm leading-relaxed text-emerald-100">
                    {selectedProject.decisions}
                  </p>
                </div>
              )}

              {/* Known Limitations & Integrity Note */}
              {selectedProject.limitations && (
                <div className="mt-6">
                  <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                    <AlertCircle className="h-4 w-4" />
                    Engineering Limitations &amp; Grounding Note
                  </h4>
                  <p className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs sm:text-sm leading-relaxed text-amber-100">
                    {selectedProject.limitations}
                  </p>
                </div>
              )}

              {/* Core Capabilities */}
              <div className="mt-6">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/60">
                  Verified Core Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {selectedProject.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs text-white/95"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-purple-400" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/60">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-purple-400/25 bg-purple-950/50 px-3 py-1.5 text-xs font-medium text-purple-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.1] pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    >
                      <GitBranch className="h-4 w-4" />
                      Inspect on GitHub
                    </a>
                  )}

                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-950/40 px-5 py-2.5 text-xs font-bold uppercase text-purple-200 transition hover:bg-purple-900/60"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demonstration
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase text-white/70 transition hover:bg-white/10"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
