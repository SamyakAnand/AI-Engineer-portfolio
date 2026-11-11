'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { GitBranch, ExternalLink, Terminal, Code2, Layers, Cpu, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundFx } from '@/components/sound/AmbientSoundManager';

export default function Scene04Projects() {
  const projectList = Object.values(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="scene-projects"
      className="relative z-10 min-h-screen py-32 px-6 md:px-12 lg:px-20 bg-transparent text-white overflow-hidden border-t border-sky-950/40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] text-sky-400 uppercase mb-3">
              <Terminal className="w-3.5 h-3.5" />
              WORK
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold font-display tracking-tight">
              Selected projects<span className="text-sky-500">.</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-300 font-light max-w-2xl">
              A mix of AI, machine learning, and analytics projects. Open a repository to see the implementation.
            </p>
          </div>

          <a
            href="https://github.com/SamyakAnand"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-sky-500/30 bg-sky-950/40 hover:bg-sky-900/50 hover:border-sky-400 transition-all text-xs font-sans text-sky-200"
          >
            <GitBranch className="w-4 h-4 text-sky-400" />
            <span>VIEW ALL PROJECTS</span>
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projectList.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111d]/[.82] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-sky-200/30 hover:bg-[#07111d]/[.90]"
            >
              {project.screenshots[0] && <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                <Image src={project.screenshots[0]} alt={`${project.name} preview`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
              </div>}
              <div className="flex items-center justify-between px-6 pt-5 mb-1">
                <span className="text-[11px] text-sky-100/60 tracking-[.14em] uppercase">PROJECT 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-200/70" />
              </div>

              <div className="px-6 pb-6">
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold font-display text-white leading-snug">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-300 font-light leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Architecture Preview Box */}
                <div className="mt-5 p-3 rounded-xl bg-white/[.035] border border-white/[.07] text-xs text-white/55">
                  <span className="text-sky-100/65 uppercase tracking-widest block text-[9px] mb-1">
                    APPROACH
                  </span>
                  <p className="line-clamp-2 text-white/80">{project.architecture}</p>
                </div>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[.05] border border-white/10 text-[10px] text-white/65"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-sans text-white/40">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-sky-300 hover:text-white font-medium transition-colors"
                >
                  <span>Project details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub Repository"
                    className="p-2 rounded-lg bg-white/5 hover:bg-sky-600/40 border border-white/10 hover:border-sky-400 text-white/70 hover:text-white transition-all"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-[10px] font-sans text-white/30 uppercase">INTERNAL BUILD</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Architecture Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl border border-sky-500/40 bg-[#070514] p-6 sm:p-8 shadow-[0_0_80px_rgba(139,92,246,0.3)] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-sans text-sky-400 tracking-widest uppercase">
                  PROJECT DETAILS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Problem Statement */}
            <div className="mt-6">
              <h4 className="text-xs font-sans text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                THE PROBLEM SOLVED
              </h4>
              <p className="text-sm text-gray-300 font-light leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                {selectedProject.problem}
              </p>
            </div>

            {/* Architecture Flow */}
            <div className="mt-6">
              <h4 className="text-xs font-sans text-sky-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                END-TO-END PIPELINE ARCHITECTURE
              </h4>
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs font-sans text-sky-200 leading-relaxed">
                {selectedProject.architecture}
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-6">
              <h4 className="text-xs font-sans text-white/50 uppercase tracking-widest mb-2">
                CORE CAPABILITIES & VERIFIED SPECS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs font-sans text-gray-300 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Stack Chips */}
            <div className="mt-6">
              <h4 className="text-xs font-sans text-white/50 uppercase tracking-widest mb-2">
                DEPLOYMENT TECH STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-sans text-cyan-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-sans text-xs uppercase font-semibold hover:bg-sky-500 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>EXPLORE CODE ON GITHUB</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-sans text-xs uppercase transition-colors"
              >
                CLOSE BLUEPRINT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
