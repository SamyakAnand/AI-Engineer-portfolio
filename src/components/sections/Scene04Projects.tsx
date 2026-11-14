'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import {
  GitBranch, Cpu, CheckCircle, ArrowRight,
  ShieldCheck, X, ExternalLink, Layers, AlertCircle, Wrench, Sparkles, Play,
  Workflow, Database, ArrowUpRight, ChevronLeft, ChevronRight, ArrowLeft
} from 'lucide-react';
import { soundFx } from '@/components/sound/AmbientSoundManager';

const ts = (size: 'sm' | 'md' | 'lg') => ({
  textShadow: {
    sm: '0 1px 6px rgba(0,0,0,1)',
    md: '0 2px 10px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)',
    lg: '0 3px 18px rgba(0,0,0,1), 0 2px 6px rgba(0,0,0,1)',
  }[size],
});

type FilterType = 'all' | 'ai' | 'ml' | 'analytics';

function ProjectCard({
  project,
  idx = 0,
  onSelect,
}: {
  project: Project;
  idx?: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.div
      layout
      key={project.id}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
      onMouseEnter={() => soundFx.playHover()}
      onClick={() => {
        soundFx.playClick();
        onSelect(project);
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#080718]/65 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/60 hover:bg-[#0c0924]/85 hover:shadow-[0_16px_60px_rgba(168,85,247,0.3)] cursor-pointer"
    >
      {/* Image Preview & Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/[0.08] bg-black/40">
        {project.screenshots[0] ? (
          <Image
            src={project.screenshots[0]}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-950/60 to-black/60">
            <Layers className="h-12 w-12 text-purple-400/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080718] via-black/40 to-transparent" />

        {/* Top Left: Category Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-full border border-purple-400/40 bg-black/75 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-purple-200 backdrop-blur-md shadow-md">
            {project.category || 'Architecture'}
          </span>
        </div>

        {/* Top Right: Floating Live Badge if available */}
        {project.demo && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/85 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
            Live
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-xl font-bold leading-snug text-white group-hover:text-purple-200 transition-colors sm:text-2xl"
            style={ts('lg')}
          >
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p
          className="mt-2.5 text-xs sm:text-sm font-normal leading-relaxed text-slate-200 line-clamp-2"
          style={ts('md')}
        >
          {project.description}
        </p>

        {/* Architecture Flow Micro-Preview */}
        <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-950/40 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-300" style={ts('sm')}>
            <Workflow className="h-3 w-3 text-purple-400" />
            Pipeline Architecture
          </div>
          <p className="mt-1 text-xs font-mono leading-relaxed text-slate-100 line-clamp-2" style={ts('sm')}>
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

        {/* Direct Action Bar */}
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-4 mt-5">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 transition group-hover:text-white"
            style={ts('sm')}
          >
            Inspect Case Study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>

          <div className="flex items-center gap-1.5">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Live Application"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-2 py-1 text-[11px] font-semibold text-emerald-300 transition hover:bg-emerald-900/50 hover:border-emerald-400"
              >
                <Play className="h-3 w-3 fill-current" />
                <span className="hidden sm:inline">Demo</span>
              </a>
            )}

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Repository"
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/70 transition hover:bg-purple-600/40 hover:border-purple-400 hover:text-white"
              >
                <GitBranch className="h-4 w-4" />
              </a>
            ) : (
              <span className="text-[10px] uppercase text-white/30" style={ts('sm')}>Internal</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Scene04Projects() {
  const projectList = Object.values(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showAllInGrid, setShowAllInGrid] = useState(false);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === 'all'
    ? projectList
    : projectList.filter((p) => p.type === activeFilter);

  const displayedGridProjects = showAllInGrid ? filteredProjects : filteredProjects.slice(0, 6);
  const remainingProjects = filteredProjects.slice(6);

  const scrollDeck = (direction: 'left' | 'right') => {
    if (!deckRef.current) return;
    const scrollAmount = 380;
    deckRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const prevProject = currentIndex > 0
    ? filteredProjects[currentIndex - 1]
    : filteredProjects[filteredProjects.length - 1];

  const nextProject = currentIndex >= 0 && currentIndex < filteredProjects.length - 1
    ? filteredProjects[currentIndex + 1]
    : filteredProjects[0];

  const goToPrev = () => {
    if (filteredProjects.length === 0) return;
    soundFx.playClick();
    setSelectedProject(prevProject);
    scrollBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNext = () => {
    if (filteredProjects.length === 0) return;
    soundFx.playClick();
    setSelectedProject(nextProject);
    scrollBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Lock body scroll, pause Lenis, and listen for Escape & Arrow navigation keys */
  useEffect(() => {
    if (selectedProject) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Tell Lenis to pause smooth scrolling
      window.dispatchEvent(new CustomEvent('portfolio:scroll-lock', { detail: { locked: true } }));

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        } else if (e.key === 'ArrowLeft') {
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          goToNext();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.dispatchEvent(new CustomEvent('portfolio:scroll-lock', { detail: { locked: false } }));
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject, currentIndex, filteredProjects]);

  /* Native wheel event listener on the scroll container to ensure 100% fluid scrolling */
  useEffect(() => {
    const el = scrollBodyRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Direct scroll inside modal body
      e.stopPropagation();
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [selectedProject]);

  return (
    <section
      id="scene-projects"
      className="relative z-10 min-h-screen scroll-mt-24 overflow-hidden border-t border-purple-950/40 bg-transparent px-4 py-28 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 border-b border-white/[0.12] pb-12 md:flex-row md:items-end md:justify-between"
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
            Explore All Repositories
          </a>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
          {[
            { id: 'all' as FilterType, label: 'All Architectures', count: projectList.length },
            { id: 'ai' as FilterType, label: 'AI & LLM Agents', count: projectList.filter((p) => p.type === 'ai').length },
            { id: 'ml' as FilterType, label: 'Machine Learning Pipelines', count: projectList.filter((p) => p.type === 'ml').length },
            { id: 'analytics' as FilterType, label: 'Enterprise Analytics', count: projectList.filter((p) => p.type === 'analytics').length },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(tab.id);
                }}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'border border-purple-400 bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'border border-white/10 bg-black/40 text-slate-300 hover:border-purple-400/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Cards Grid (Top 6 Featured or All) ── */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {displayedGridProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Extended Architecture Deck: Swipe & Scroll Track ── */}
        {filteredProjects.length > 6 && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  <h3 className="text-sm font-mono uppercase tracking-widest text-purple-300">
                    Extended Architecture Deck · Swipe / Scroll Deck
                  </h3>
                </div>
                <p className="mt-1 text-xs text-white/60">
                  Swipe or scroll horizontally to inspect deep learning models, anomaly pipelines &amp; live web applications
                </p>
              </div>

              {/* Deck Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowAllInGrid(!showAllInGrid);
                  }}
                  className="rounded-full border border-purple-400/40 bg-purple-950/50 px-4 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/60 hover:border-purple-400 hover:text-white shadow-sm"
                >
                  {showAllInGrid ? 'Show Top 6 Only' : `View All in Grid (${filteredProjects.length})`}
                </button>

                <button
                  onClick={() => scrollDeck('left')}
                  aria-label="Scroll left"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:border-purple-400 hover:bg-white/15 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollDeck('right')}
                  aria-label="Scroll right"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:border-purple-400 hover:bg-white/15 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Swipeable & Scrollable Deck */}
            <div
              ref={deckRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:rgba(168,85,247,0.4)_transparent]"
            >
              {(showAllInGrid ? filteredProjects : remainingProjects).map((project, idx) => (
                <div
                  key={`deck-${project.id}`}
                  className="w-[320px] shrink-0 sm:w-[380px] snap-start"
                >
                  <ProjectCard
                    project={project}
                    idx={idx}
                    onSelect={setSelectedProject}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── High-UX Scroll-Isolated Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-2 sm:p-6 backdrop-blur-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            data-lenis-prevent="true"
          >
            {/* ── Always-Visible Floating Close Pill Button ── */}
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close Case Study"
              className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[130] flex items-center gap-2 rounded-full border border-rose-400/50 bg-black/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] backdrop-blur-2xl transition hover:scale-105 hover:bg-rose-600 hover:border-rose-300"
            >
              <X className="h-4 w-4 text-rose-300" />
              <span>Close (ESC)</span>
            </button>

            {/* ── Floating Side Navigation Chevrons (Desktop) ── */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              title={`Previous: ${prevProject?.name || 'Project'} (Arrow Left)`}
              aria-label="Previous Case Study"
              className="fixed left-2 sm:left-5 top-1/2 -translate-y-1/2 z-[125] hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/40 bg-black/90 text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-2xl transition hover:scale-110 hover:bg-purple-600 hover:text-white group"
            >
              <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              title={`Next: ${nextProject?.name || 'Project'} (Arrow Right)`}
              aria-label="Next Case Study"
              className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-[125] hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/40 bg-black/90 text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-2xl transition hover:scale-110 hover:bg-purple-600 hover:text-white group"
            >
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
            </button>

            <motion.div
              className="relative flex flex-col w-full max-w-4xl h-[92vh] max-h-[92vh] rounded-3xl border border-purple-500/40 bg-[#070516] shadow-[0_0_100px_rgba(168,85,247,0.4)] overflow-hidden"
              initial={{ scale: 0.94, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 24, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              {/* ── Sticky Top Header with Full Navigation Deck & Actions ── */}
              <div className="sticky top-0 z-30 shrink-0 flex items-center justify-between border-b border-white/10 bg-[#070516]/95 px-4 py-3 sm:px-8 sm:py-3.5 backdrop-blur-xl">
                {/* Category & Verified Badge */}
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full border border-purple-400/40 bg-purple-950/70 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                    {selectedProject.category || 'AI Case Study'}
                  </span>
                  {selectedProject.demo && (
                    <span className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                      Live Verified
                    </span>
                  )}
                </div>

                {/* Center: Interactive Project Deck Navigation */}
                <div className="flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-black/60 p-1 shadow-inner backdrop-blur-md">
                  <button
                    onClick={goToPrev}
                    title="Previous Project (Arrow Left)"
                    className="flex h-7 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold text-slate-300 hover:bg-purple-600/40 hover:text-white transition-all"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <span className="px-2 text-[11px] font-mono text-purple-300">
                    {currentIndex + 1} / {filteredProjects.length}
                  </span>
                  <button
                    onClick={goToNext}
                    title="Next Project (Arrow Right)"
                    className="flex h-7 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold text-slate-300 hover:bg-purple-600/40 hover:text-white transition-all"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Right Actions & Prominent Close Button */}
                <div className="flex items-center gap-2">
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/50 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-900/70"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Demo</span>
                    </a>
                  )}

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-purple-400/40 bg-purple-950/50 px-3 py-1.5 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/70"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close Case Study"
                    className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-950/50 px-3 py-1.5 text-xs font-bold text-rose-200 transition hover:bg-rose-600 hover:text-white shadow-sm"
                  >
                    <X className="h-4 w-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* ── Smooth Scrollable Modal Body (Isolated from Lenis, min-h-0 enforced) ── */}
              <div
                ref={scrollBodyRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8 space-y-7 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/30 [&::-webkit-scrollbar-thumb]:bg-purple-600/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-500 [&::-webkit-scrollbar-thumb]:rounded-full"
                data-lenis-prevent="true"
              >
                {/* Title & One-Liner */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-4xl" style={ts('lg')}>
                    {selectedProject.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base font-light" style={ts('md')}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Architecture Specs Grid */}
                {selectedProject.stats && selectedProject.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {selectedProject.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-purple-400/25 bg-purple-950/30 p-3.5 backdrop-blur-sm"
                      >
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">
                          {stat.label}
                        </span>
                        <span className="mt-1 block text-sm font-bold text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Screenshot Visual Preview */}
                {selectedProject.screenshots[0] && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black/60">
                    <Image
                      src={selectedProject.screenshots[0]}
                      alt={selectedProject.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                {/* Step-by-Step Architecture Pipeline */}
                {selectedProject.pipelineSteps && selectedProject.pipelineSteps.length > 0 && (
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-300">
                      <Workflow className="h-4 w-4 text-purple-400" />
                      Execution &amp; Data Pipeline Architecture
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
                      {selectedProject.pipelineSteps.map((step, sIdx) => (
                        <div
                          key={step}
                          className="relative flex flex-col justify-between rounded-xl border border-purple-400/20 bg-purple-950/40 p-3"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                            <span>Stage 0{sIdx + 1}</span>
                            {sIdx < selectedProject.pipelineSteps!.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-purple-400/50 hidden sm:block" />
                            )}
                          </div>
                          <p className="mt-2 text-xs font-semibold text-slate-100">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Problem vs Solution Split */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Problem */}
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-950/15 p-4 sm:p-5">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
                      <AlertCircle className="h-4 w-4" />
                      The Engineering Challenge
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-rose-100/90">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-4 sm:p-5">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
                      <Cpu className="h-4 w-4" />
                      Architectural Solution
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-cyan-100/90">
                      {selectedProject.solution || selectedProject.architecture}
                    </p>
                  </div>
                </div>

                {/* Engineering Decisions & Trade-offs */}
                {selectedProject.decisions && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                      <Wrench className="h-4 w-4" />
                      Key Engineering Decisions &amp; Trade-offs
                    </h4>
                    <p className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-xs sm:text-sm leading-relaxed text-emerald-100">
                      {selectedProject.decisions}
                    </p>
                  </div>
                )}

                {/* Known Limitations & Grounding */}
                {selectedProject.limitations && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                      <ShieldCheck className="h-4 w-4" />
                      Engineering Limitations &amp; Verification Grounding
                    </h4>
                    <p className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs sm:text-sm leading-relaxed text-amber-100">
                      {selectedProject.limitations}
                    </p>
                  </div>
                )}

                {/* Core Verified Features */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/70">
                    Verified Capabilities &amp; Features
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
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/70">
                    Production Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-xl border border-purple-400/25 bg-purple-950/50 px-3 py-1.5 text-xs font-medium text-purple-200 shadow-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Fixed Footer Controls with Forward & Backward Buttons ── */}
              <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#070516] px-5 py-4 sm:px-8">
                {/* Left: Previous & Next Project Navigation Workflow */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrev}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition hover:border-purple-400 hover:bg-purple-950/50 hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 text-purple-400" />
                    <span>Prev Project</span>
                  </button>

                  <button
                    onClick={goToNext}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition hover:border-purple-400 hover:bg-purple-950/50 hover:text-white"
                  >
                    <span>Next Project</span>
                    <ArrowRight className="h-3.5 w-3.5 text-purple-400" />
                  </button>
                </div>

                {/* Center/Right: Live Link + GitHub + Close Button */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(52,211,153,0.35)] transition hover:from-emerald-400 hover:to-teal-500"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Launch App
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition hover:bg-purple-500"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      GitHub Repo
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-200 transition hover:bg-rose-600 hover:text-white"
                  >
                    Close (ESC)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
