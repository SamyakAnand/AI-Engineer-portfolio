'use client';

import { ArrowDownRight, ArrowUpRight, MapPin, Mail, Sparkles, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function VideoScrubberHero() {
  const reduceMotion = useReducedMotion();
  const moveTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 25, filter: reduceMotion ? 'none' : 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.85, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 30, scale: reduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const targetRoles = [
    'Applied AI Engineer',
    'GenAI / RAG Engineer',
    'Junior ML Engineer',
    'Python Backend (AI)',
  ];

  return (
    <section
      id="hero-cinematic"
      className="relative z-10 flex min-h-[92svh] scroll-mt-24 items-center px-4 pb-16 pt-24 text-white sm:px-6 md:min-h-screen md:px-12 md:pb-20 md:pt-28 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* ── Subtitle / Professional Role Badge ── */}
          <motion.div variants={badgeVariants} className="inline-block">
            <div className="group relative inline-flex items-center gap-2.5 rounded-full border border-purple-400/40 bg-purple-950/60 px-3.5 py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-purple-200 backdrop-blur-md shadow-[0_4px_25px_rgba(168,85,247,0.35)] transition-all hover:border-purple-300 hover:shadow-[0_4px_30px_rgba(168,85,247,0.55)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
              <span>Applied AI Engineer</span>
            </div>
          </motion.div>

          {/* ── Main Name Heading with Staggered Kinetic Typography ── */}
          <motion.h1
            variants={itemVariants}
            className="mt-4 font-display text-[clamp(2.85rem,7.5vw,7.6rem)] font-bold leading-[0.92] tracking-[-0.05em] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)]"
          >
            <motion.span
              className="inline-block"
              animate={reduceMotion ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Samyak
            </motion.span>
            <br />
            <span className="text-white/90">
              Anand<span className="text-purple-400 inline-block animate-pulse">.</span>
            </span>
          </motion.h1>

          {/* ── Core Value Pitch & Description (Transparent Background, Scroll Frames Protected) ── */}
          <motion.div
            variants={cardVariants}
            className="relative mt-6 sm:mt-7 bg-transparent"
          >
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold leading-snug tracking-[-0.015em] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
              &ldquo;I build practical AI applications that combine intelligent workflows, retrieval systems, machine learning, data engineering and reliable backend infrastructure.&rdquo;
            </p>
            <p className="mt-3 max-w-2xl text-xs sm:text-base font-normal leading-relaxed text-slate-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Generative AI · Agentic AI · Python Backend · Machine Learning. Specializing in evidence-oriented knowledge retrieval, deterministic evaluation pipelines, and production-ready intelligent software.
            </p>

            {/* Target Roles Pill Strip */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2 text-xs font-mono text-purple-200">
              <span className="text-purple-400 font-semibold tracking-wider uppercase text-[10px] mr-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Targeting:
              </span>
              {targetRoles.map((role, idx) => (
                <motion.span
                  key={role}
                  initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-md border border-purple-400/30 bg-black/40 px-2 py-0.5 text-[10px] sm:text-[11px] text-purple-100 backdrop-blur-sm transition-colors hover:border-purple-300 hover:bg-black/60 shadow-sm"
                >
                  {role}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Primary & Secondary CTAs with Spring Physics ── */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-3.5"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => moveTo('scene-projects')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-600 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide text-white shadow-[0_4px_25px_rgba(168,85,247,0.45)] transition hover:from-purple-400 hover:to-indigo-500 hover:shadow-[0_4px_35px_rgba(168,85,247,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              View Projects <ArrowDownRight className="h-4 w-4" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-purple-400/40 bg-white/[0.08] px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/[0.18] hover:border-purple-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              Download Résumé <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => moveTo('scene-contact')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/35 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-cyan-200 backdrop-blur-md transition hover:bg-cyan-900/50 hover:border-cyan-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Contact Me <Send className="h-3.5 w-3.5 text-cyan-300" />
            </motion.button>
          </motion.div>

          {/* ── Metadata Bar: Location, Availability & Quick Socials ── */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-white/80"
          >
            {/* Location */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm shadow-sm">
              <MapPin className="h-3 w-3 text-purple-400" />
              <span>Hyderabad, India</span>
            </div>

            {/* Availability with pulsing live beacon */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-emerald-200 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span>Available for AI Engagements</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/SamyakAnand"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:border-purple-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -4 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/samyakanand/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:border-[#0a66c2] hover:text-[#0a66c2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:samyak.g.anand@gmail.com"
                aria-label="Direct Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:border-purple-400 hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
