'use client';

import React, { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import type { Project } from '@/content/types';
import {
  GitBranch, Cpu, CheckCircle, ArrowRight,
  ShieldCheck, X, Layers, AlertCircle, Wrench, Sparkles, Play,
  Workflow, ArrowUpRight, ChevronLeft, ChevronRight, ArrowLeft,
  Search, Users, Award, Lock, Milestone, Radio, Globe, FolderGit2
} from 'lucide-react';
import { soundFx } from '@/components/sound/AmbientSoundManager';

const ts = (size: 'sm' | 'md' | 'lg') => ({
  textShadow: {
    sm: '0 1px 6px rgba(0,0,0,1)',
    md: '0 2px 10px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)',
    lg: '0 3px 18px rgba(0,0,0,1), 0 2px 6px rgba(0,0,0,1)',
  }[size],
});

export type FilterType = 'all' | 'ai' | 'ml' | 'ds' | 'analytics' | 'live' | 'portfolio';

interface ProjectCardProps {
  project: Project;
  idx?: number;
  onSelect: (project: Project, e: React.MouseEvent<HTMLElement>) => void;
}

const ProjectCard = React.forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, idx = 0, onSelect },
  ref
) {
  return (
    <motion.article
      ref={ref}
      id={`project-${project.id}`}
      key={project.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: Math.min((idx % 3) * 0.05, 0.15) }}
      onMouseEnter={() => soundFx.playHover()}
      onClick={(e) => {
        soundFx.playClick();
        onSelect(project, e);
      }}
      tabIndex={0}
      role="button"
      aria-label={`Inspect case study for ${project.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          soundFx.playClick();
          onSelect(project, e as unknown as React.MouseEvent<HTMLElement>);
        }
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#080718]/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/60 hover:bg-[#0c0924]/85 hover:shadow-[0_16px_60px_rgba(168,85,247,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111d]"
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
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="rounded-full border border-purple-400/40 bg-black/80 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-purple-200 backdrop-blur-md shadow-md">
            {project.category || 'Engineering'}
          </span>
          {project.tier === 1 && (
            <span className="rounded-full border border-cyan-400/40 bg-cyan-950/80 px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md shadow-md">
              Tier 1
            </span>
          )}
        </div>

        {/* Top Right: Verified Live Beacon */}
        {project.isLive && project.demo && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/85 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
            Live
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold leading-snug text-white group-hover:text-purple-200 transition-colors"
          style={ts('md')}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="mt-2 text-xs font-normal leading-relaxed text-slate-200 line-clamp-2"
          style={ts('sm')}
        >
          {project.description}
        </p>

        {/* Architecture Flow Micro-Preview */}
        {project.architecture && (
          <div className="mt-3 rounded-xl border border-purple-400/20 bg-purple-950/40 p-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-purple-300" style={ts('sm')}>
              <Workflow className="h-3 w-3 text-purple-400" />
              Architecture Flow
            </div>
            <p className="mt-1 text-[11px] font-mono leading-relaxed text-slate-100 line-clamp-2" style={ts('sm')}>
              {project.architecture}
            </p>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-purple-400/25 bg-purple-950/50 px-2 py-0.5 text-[9px] font-medium text-purple-200"
              style={ts('sm')}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-lg border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Direct Action Bar */}
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-3.5 mt-4">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 transition group-hover:text-white"
            style={ts('sm')}
          >
            Case Study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>

          <div className="flex items-center gap-1.5">
            {project.isLive && project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Live Application"
                onClick={(e) => e.stopPropagation()}
                className="flex min-h-[34px] items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 transition hover:bg-emerald-900/60 hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Live Demo</span>
              </a>
            )}

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Repository"
                onClick={(e) => e.stopPropagation()}
                className="flex min-h-[34px] min-w-[34px] items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/70 transition hover:bg-purple-600/40 hover:border-purple-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <GitBranch className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-[10px] uppercase text-white/30" style={ts('sm')}>Internal</span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});
ProjectCard.displayName = 'ProjectCard';

export default function Scene04Projects() {
  const projectList = profile.projects
    .map((id) => projects[id as keyof typeof projects])
    .filter((project): project is Project => Boolean(project));
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalPanelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef<number>(0);
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  // Filter projects by category and search term
  const filteredProjects = projectList.filter((p) => {
    let categoryMatch = true;
    if (activeFilter === 'ai') categoryMatch = p.type === 'ai';
    else if (activeFilter === 'ml') categoryMatch = p.type === 'ml';
    else if (activeFilter === 'ds') categoryMatch = p.type === 'ds';
    else if (activeFilter === 'analytics') categoryMatch = p.type === 'analytics';
    else if (activeFilter === 'portfolio') categoryMatch = p.type === 'portfolio';
    else if (activeFilter === 'live') categoryMatch = Boolean(p.isLive && p.demo);
    else categoryMatch = true; // 'all'

    const query = searchQuery.trim().toLowerCase();
    if (!query) return categoryMatch;

    return (
      categoryMatch &&
      (p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        p.stack.some((s) => s.toLowerCase().includes(query)))
    );
  });

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(8);
  }, [activeFilter, searchQuery]);

  // Listen for custom project select event from Skills section
  useEffect(() => {
    const handleCustomSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string }>;
      const targetId = customEvent.detail?.projectId;
      if (targetId && projects[targetId]) {
        setSelectedProject(projects[targetId]);
      }
    };
    window.addEventListener('portfolio:select-project', handleCustomSelect);
    return () => window.removeEventListener('portfolio:select-project', handleCustomSelect);
  }, []);

  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const prevProject =
    currentIndex > 0 ? filteredProjects[currentIndex - 1] : filteredProjects[filteredProjects.length - 1];
  const nextProject =
    currentIndex < filteredProjects.length - 1 ? filteredProjects[currentIndex + 1] : filteredProjects[0];

  const closeModal = useCallback(() => {
    soundFx.playClick();
    setSelectedProject(null);
  }, []);

  const goToPrev = useCallback(() => {
    if (prevProject) {
      soundFx.playClick();
      setSelectedProject(prevProject);
    }
  }, [prevProject]);

  const goToNext = useCallback(() => {
    if (nextProject) {
      soundFx.playClick();
      setSelectedProject(nextProject);
    }
  }, [nextProject]);

  const handleSelectProject = (project: Project, e: React.MouseEvent<HTMLElement>) => {
    triggerElementRef.current = e.currentTarget;
    scrollYRef.current = window.scrollY;
    setSelectedProject(project);
  };

  // Scroll lock and modal focus trap
  useEffect(() => {
    if (selectedProject) {
      const currentScroll = scrollYRef.current || window.scrollY;
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      window.dispatchEvent(new CustomEvent('portfolio:scroll-lock', { detail: { locked: true } }));
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Hide the navbar while modal is open
      document.documentElement.setAttribute('data-modal-open', 'true');

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeModal();
          return;
        }

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
          return;
        }

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
          return;
        }

        if (e.key === 'Tab' && modalPanelRef.current) {
          const focusable = modalPanelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        // Restore navbar visibility
        document.documentElement.removeAttribute('data-modal-open');
        window.dispatchEvent(new CustomEvent('portfolio:scroll-lock', { detail: { locked: false } }));
        window.removeEventListener('keydown', handleKeyDown);
        window.scrollTo({ top: currentScroll, behavior: 'instant' as ScrollBehavior });

        if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
          triggerElementRef.current.focus();
        }
      };
    }
  }, [selectedProject, closeModal, goToPrev, goToNext]);

  const filterTabs: { id: FilterType; label: string; count: number; icon: typeof Sparkles }[] = [
    { id: 'all', label: 'All Projects', count: projectList.length, icon: Layers },
    { id: 'ai', label: 'AI & LLM Agents', count: projectList.filter((p) => p.type === 'ai').length, icon: Sparkles },
    { id: 'ml', label: 'Machine Learning', count: projectList.filter((p) => p.type === 'ml').length, icon: Cpu },
    { id: 'ds', label: 'Data Science', count: projectList.filter((p) => p.type === 'ds').length, icon: Workflow },
    { id: 'analytics', label: 'Data Analytics', count: projectList.filter((p) => p.type === 'analytics').length, icon: Award },
    { id: 'live', label: 'Live', count: projectList.filter((p) => p.isLive && p.demo).length, icon: Globe },
    { id: 'portfolio', label: 'Portfolio', count: projectList.filter((p) => p.type === 'portfolio').length, icon: FolderGit2 },
  ];

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section
      id="scene-projects"
      className="relative z-10 min-h-screen scroll-mt-24 overflow-hidden border-t border-purple-950/40 bg-transparent px-4 py-20 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <div className="mb-6">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]"
            style={ts('sm')}
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Complete Project Directory
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={ts('lg')}
              >
                Engineering Projects<span className="text-purple-400">.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-xs sm:text-sm font-light text-slate-100 leading-relaxed" style={ts('md')}>
                From autonomous AI agents and verifiable RAG workspaces to production ML pipelines, enterprise Power BI analytics, and full-stack web platforms.
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400/60" />
              <input
                type="text"
                placeholder="Search stack, title, topic…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[40px] rounded-full border border-white/15 bg-black/50 py-2 pl-10 pr-9 text-xs font-mono text-white placeholder-slate-400 backdrop-blur-md transition hover:border-purple-400/40 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Compact Horizontal Filter Toolbar (All 7 Filters in One Row) ── */}
        <div className="mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveFilter(tab.id);
                  }}
                  className={`inline-flex items-center gap-2 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 whitespace-nowrap min-h-[38px] ${
                    isActive
                      ? 'border border-purple-400 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(168,85,247,0.45)]'
                      : 'border border-white/10 bg-black/40 text-slate-300 hover:border-purple-400/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-purple-300" />
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Count and Active Filter Status */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>
              Showing <strong className="text-purple-300">{Math.min(visibleCount, filteredProjects.length)}</strong> of <strong className="text-white">{filteredProjects.length}</strong> projects
            </span>
            <a
              href="https://github.com/SamyakAnand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition-colors"
            >
              <GitBranch className="h-3 w-3 text-purple-400" />
              <span>@SamyakAnand on GitHub</span>
            </a>
          </div>
        </div>

        {/* ── Project Cards Responsive Grid (Full Width, 3-Columns on Desktop) ── */}
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                onSelect={handleSelectProject}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-8 text-center text-slate-400">
              <AlertCircle className="mx-auto h-8 w-8 text-purple-400 mb-2 opacity-70" />
              <p className="font-semibold text-white">No projects found</p>
              <p className="mt-1 text-xs">
                No projects match &ldquo;{searchQuery}&rdquo; in this category. Try another keyword or switch category.
              </p>
            </div>
          )}

          {/* Load More Pagination Controls */}
          {filteredProjects.length > visibleCount && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-white/10 pt-8">
              <button
                onClick={() => {
                  soundFx.playClick();
                  startTransition(() => {
                    setVisibleCount((prev) => prev + 9);
                  });
                }}
                className="min-h-[44px] rounded-full border border-purple-400/50 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:scale-105 hover:from-purple-500 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                Load More Projects (+9)
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  startTransition(() => {
                    setVisibleCount(filteredProjects.length);
                  });
                }}
                className="min-h-[44px] rounded-full border border-white/15 bg-black/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-purple-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                View All ({filteredProjects.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── High-UX Scroll-Isolated Case Study Modal (Portaled to document.body) ── */}
      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {selectedProject && (
                <div
                  id="case-study-modal-overlay"
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-2.5 sm:p-6 backdrop-blur-2xl"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      closeModal();
                    }
                  }}
                >
                  {/* ── Top Floating Close Pill (Top-Right on Mobile/Desktop) ── */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                    aria-label="Close Case Study"
                    className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[10001] flex min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] items-center justify-center gap-2 rounded-full border border-rose-400/50 bg-black/95 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] backdrop-blur-2xl transition hover:scale-105 hover:bg-rose-600 hover:border-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <X className="h-4 w-4 text-rose-300" />
                    <span className="hidden sm:inline">Close (ESC)</span>
                  </button>

                  {/* ── Floating Side Navigation Chevrons (Desktop) ── */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    title={`Previous: ${prevProject?.name || 'Project'} (Arrow Left)`}
                    aria-label="Previous Case Study"
                    className="fixed left-2 sm:left-5 top-1/2 -translate-y-1/2 z-[10000] hidden md:flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-purple-400/40 bg-black/90 text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-2xl transition hover:scale-110 hover:bg-purple-600 hover:text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
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
                    className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-[10000] hidden md:flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-purple-400/40 bg-black/90 text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-2xl transition hover:scale-110 hover:bg-purple-600 hover:text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {/* ── Modal Dialog Panel ── */}
                  <motion.div
                    ref={modalPanelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="case-study-title"
                    tabIndex={-1}
                    className="relative flex flex-col w-full max-w-4xl h-[92vh] max-h-[92vh] sm:h-[88vh] rounded-2xl sm:rounded-3xl border border-purple-500/40 bg-[#070516] shadow-[0_0_120px_rgba(168,85,247,0.45)] overflow-hidden focus-visible:outline-none"
                    initial={{ scale: 0.94, y: 24, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.94, y: 24, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    data-lenis-prevent="true"
                  >
                    {/* ── Sticky Top Header with Navigation Deck, Actions & Close Button ── */}
                    <div className="sticky top-0 z-30 shrink-0 flex items-center justify-between border-b border-white/10 bg-[#070516]/95 px-3 py-2.5 sm:px-6 sm:py-3.5 backdrop-blur-xl gap-2">
                      {/* Category & Verified Badge */}
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-purple-400/40 bg-purple-950/70 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-purple-300">
                          {selectedProject.category || 'AI Case Study'}
                        </span>
                        {selectedProject.isLive && selectedProject.demo && (
                          <span className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                            Live Verified
                          </span>
                        )}
                      </div>

                      {/* Center: Interactive Project Deck Navigation */}
                      <div className="flex items-center gap-1 rounded-full border border-purple-400/30 bg-black/60 p-0.5 sm:p-1 shadow-inner backdrop-blur-md">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPrev();
                          }}
                          aria-label="Previous project in deck"
                          title="Previous Project (Arrow Left)"
                          className="flex min-h-[32px] sm:min-h-[36px] items-center gap-1 rounded-full px-2 sm:px-2.5 text-[11px] font-semibold text-slate-300 hover:bg-purple-600/40 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Prev</span>
                        </button>
                        <span className="px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-mono text-purple-300">
                          {currentIndex + 1} / {filteredProjects.length}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                          }}
                          aria-label="Next project in deck"
                          title="Next Project (Arrow Right)"
                          className="flex min-h-[32px] sm:min-h-[36px] items-center gap-1 rounded-full px-2 sm:px-2.5 text-[11px] font-semibold text-slate-300 hover:bg-purple-600/40 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Right: Direct External Actions & Integrated Close Button */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {selectedProject.isLive && selectedProject.demo && (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[34px] sm:min-h-[36px] items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-white shadow-md transition hover:from-emerald-400 hover:to-teal-500 focus-visible:outline-none"
                          >
                            <Play className="h-3.5 w-3.5 fill-current" />
                            <span className="hidden md:inline">Live Demo</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}

                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[34px] sm:min-h-[36px] items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none"
                          >
                            <GitBranch className="h-3.5 w-3.5 text-purple-300" />
                            <span className="hidden md:inline">GitHub</span>
                          </a>
                        )}

                        {/* Integrated Prominent Close Button */}
                        <button
                          ref={closeButtonRef}
                          onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                          }}
                          aria-label="Close Case Study"
                          title="Close (Escape)"
                          className="inline-flex min-h-[34px] sm:min-h-[36px] items-center gap-1.5 rounded-xl border border-rose-400/50 bg-rose-950/70 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold text-rose-200 shadow-md transition-all hover:bg-rose-600 hover:text-white hover:border-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                        >
                          <X className="h-4 w-4" />
                          <span>Close</span>
                          <kbd className="hidden lg:inline-block rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-mono text-rose-300">ESC</kbd>
                        </button>
                      </div>
                    </div>

              {/* ── Independently Scrollable Modal Content Body ── */}
              <div
                ref={scrollBodyRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-10 space-y-8 [scrollbar-width:thin] [scrollbar-color:rgba(168,85,247,0.4)_transparent]"
              >
                {/* Hero Title & Description */}
                <div>
                  <h2
                    id="case-study-title"
                    className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl"
                    style={ts('lg')}
                  >
                    {selectedProject.name}
                  </h2>
                  <p
                    className="mt-3 text-sm sm:text-base leading-relaxed text-slate-100"
                    style={ts('md')}
                  >
                    {selectedProject.description}
                  </p>
                </div>

                {/* Primary Screenshot / Visual Artifact */}
                {selectedProject.screenshots[0] && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                    <Image
                      src={selectedProject.screenshots[0]}
                      alt={`${selectedProject.name} architecture overview`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Key Metrics Strip if available */}
                {selectedProject.stats && selectedProject.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {selectedProject.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-purple-400/20 bg-purple-950/30 p-3 text-center backdrop-blur-sm"
                      >
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">
                          {stat.label}
                        </span>
                        <span className="mt-1 block text-sm sm:text-base font-bold text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Problem & Solution Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                      <AlertCircle className="h-4 w-4 text-rose-400" />
                      Problem Statement
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {selectedProject.solution && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        Engineered Solution
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}
                </div>

                {/* System Architecture Flow */}
                {selectedProject.architecture && (
                  <div className="rounded-2xl border border-purple-400/25 bg-black/60 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                      <Workflow className="h-4 w-4 text-purple-400" />
                      System Architecture &amp; Data Pipeline
                    </div>
                    <p className="mt-3 text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
                      {selectedProject.architecture}
                    </p>

                    {selectedProject.pipelineSteps && selectedProject.pipelineSteps.length > 0 && (
                      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                          Execution Pipeline Stages:
                        </span>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {selectedProject.pipelineSteps.map((step, sIdx) => (
                            <div
                              key={step}
                              className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-xs text-slate-200"
                            >
                              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-purple-950 text-[10px] font-mono font-bold text-purple-300">
                                0{sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Evaluation Benchmark & Known Limitations */}
                {(selectedProject.evaluationResults || selectedProject.limitations) && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {selectedProject.evaluationResults && (
                      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                          <Award className="h-4 w-4 text-cyan-400" />
                          Evaluation &amp; Benchmarks
                        </div>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                          {selectedProject.evaluationResults}
                        </p>
                      </div>
                    )}

                    {selectedProject.limitations && (
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                          <Wrench className="h-4 w-4 text-amber-400" />
                          Documented Limitations
                        </div>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                          {selectedProject.limitations}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Notes & Future Roadmap */}
                {(selectedProject.securityNotes || selectedProject.futureRoadmap) && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {selectedProject.securityNotes && (
                      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
                          <Lock className="h-4 w-4 text-indigo-400" />
                          Security &amp; Privacy Considerations
                        </div>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                          {selectedProject.securityNotes}
                        </p>
                      </div>
                    )}

                    {selectedProject.futureRoadmap && (
                      <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-950/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300">
                          <Milestone className="h-4 w-4 text-fuchsia-400" />
                          Engineering Roadmap
                        </div>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                          {selectedProject.futureRoadmap}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Technical Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm">
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                      Key Technical Features
                    </span>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {selectedProject.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                          <CheckCircle className="h-4 w-4 shrink-0 text-purple-400 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Complete Tech Stack Tags */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                    Technology Stack
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {selectedProject.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-xl border border-purple-400/30 bg-purple-950/40 px-3 py-1 text-xs font-mono text-purple-200 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary Screenshot if available */}
                {selectedProject.screenshots[1] && (
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                      Additional Architecture View
                    </span>
                    <div className="relative mt-2.5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-lg">
                      <Image
                        src={selectedProject.screenshots[1]}
                        alt={`${selectedProject.name} secondary view`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Bottom Footer Actions inside Modal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrev}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/15 hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Previous Project</span>
                    </button>
                    <button
                      onClick={goToNext}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/15 hover:text-white"
                    >
                      <span>Next Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {selectedProject.isLive && selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition hover:from-emerald-400 hover:to-teal-500"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Launch Live Application</span>
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-950/60 px-5 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/80 hover:text-white"
                      >
                        <GitBranch className="h-3.5 w-3.5 text-purple-300" />
                        <span>Inspect Repository</span>
                      </a>
                    )}
                    <button
                      onClick={closeModal}
                      aria-label="Close Case Study"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-rose-400/50 bg-rose-950/70 px-5 py-2 text-xs font-bold text-rose-200 transition-all hover:bg-rose-600 hover:text-white hover:border-rose-300 shadow-md"
                    >
                      <X className="h-4 w-4" />
                      <span>Close Case Study</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )
  : null}
    </section>
  );
}
