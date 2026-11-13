'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { profile } from '@/content/profile';

/* ─── logo maps ──────────────────────────────────────────────────────── */
const expLogoMap: Record<string, string> = {
  'Softgrowth Infotech': '/portfolio/journey/softgrowth.webp',
  'Evoastra Ventures Inc.': '/portfolio/journey/evoastra.png',
  'Gilbert Research Center': '/portfolio/journey/gilbert.png',
};

const eduLogoMap: Record<string, string> = {
  'Ballarpur Institute of Technology, Maharashtra': '/portfolio/journey/bsa.png',
  'Bajaj College of Polytechnic, Maharashtra': '/portfolio/journey/gla.png',
};

const expTags: Record<string, string[]> = {
  'Softgrowth Infotech': ['Python', 'Machine Learning', 'Data Analysis', 'Technical Training'],
  'Evoastra Ventures Inc.': ['NLP', 'Web Scraping', 'CARS24 Analytics', 'Resume AI'],
  'Gilbert Research Center': ['Clinical ML', 'MLflow', 'Statistical Analysis', 'Healthcare Pipelines'],
};

const expAccent: Record<string, { dot: string; border: string; glow: string }> = {
  'Softgrowth Infotech':     { dot: 'bg-emerald-400', border: 'hover:border-emerald-400/50', glow: 'shadow-emerald-400/25' },
  'Evoastra Ventures Inc.':  { dot: 'bg-purple-400',  border: 'hover:border-purple-400/50',  glow: 'shadow-purple-400/25'  },
  'Gilbert Research Center': { dot: 'bg-violet-400',  border: 'hover:border-violet-400/50',  glow: 'shadow-violet-400/25'  },
};

/* ─── card component ─────────────────────────────────────────────────── */
interface CardProps {
  idx: number;
  logo?: string | null;
  logoAlt?: string;
  logoBg?: string;
  title: string;
  sub: string;
  dateBadge: string;
  location?: string;
  bullets?: string[];
  tags?: string[];
  note?: string;
  accentDot?: string;
  accentBorder?: string;
  accentGlow?: string;
}

function TimelineCard({
  idx,
  logo,
  logoAlt = '',
  logoBg = 'bg-white',
  title,
  sub,
  dateBadge,
  location,
  bullets,
  tags,
  note,
  accentDot = 'bg-purple-400',
  accentBorder = 'hover:border-purple-400/50',
  accentGlow = 'shadow-purple-400/25',
}: CardProps) {
  const isLeft = idx % 2 === 0;

  return (
    <div className="relative grid md:grid-cols-2 md:gap-8">
      {/* ── spine dot (centered on the spine) ── */}
      <div
        className={`
          absolute left-[1.0625rem] top-8 z-20 h-4 w-4 rounded-full border-[3px] border-[#060414]
          md:left-1/2 md:-translate-x-1/2
          ${accentDot}
          shadow-[0_0_16px_6px_rgba(168,85,247,0.4)]
        `}
      />

      {/* ── LEFT column (desktop: even cards) ── */}
      <div
        className={`
          hidden md:flex md:items-start
          ${isLeft ? 'md:justify-end md:pr-10' : ''}
        `}
      >
        {isLeft && (
          <CardBody
            idx={idx}
            logo={logo}
            logoAlt={logoAlt}
            logoBg={logoBg}
            title={title}
            sub={sub}
            dateBadge={dateBadge}
            location={location}
            bullets={bullets}
            tags={tags}
            note={note}
            accentBorder={accentBorder}
            accentGlow={accentGlow}
            slideFrom="left"
          />
        )}
      </div>

      {/* ── RIGHT column (desktop: odd cards) ── */}
      <div
        className={`
          hidden md:flex md:items-start
          ${!isLeft ? 'md:pl-10' : ''}
        `}
      >
        {!isLeft && (
          <CardBody
            idx={idx}
            logo={logo}
            logoAlt={logoAlt}
            logoBg={logoBg}
            title={title}
            sub={sub}
            dateBadge={dateBadge}
            location={location}
            bullets={bullets}
            tags={tags}
            note={note}
            accentBorder={accentBorder}
            accentGlow={accentGlow}
            slideFrom="right"
          />
        )}
      </div>

      {/* ── MOBILE: always render card offset from left spine ── */}
      <div className="pl-10 md:hidden">
        <CardBody
          idx={idx}
          logo={logo}
          logoAlt={logoAlt}
          logoBg={logoBg}
          title={title}
          sub={sub}
          dateBadge={dateBadge}
          location={location}
          bullets={bullets}
          tags={tags}
          note={note}
          accentBorder={accentBorder}
          accentGlow={accentGlow}
          slideFrom="right"
        />
      </div>
    </div>
  );
}

function CardBody({
  idx,
  logo,
  logoAlt = '',
  logoBg = 'bg-white',
  title,
  sub,
  dateBadge,
  location,
  bullets,
  tags,
  note,
  accentBorder,
  accentGlow,
  slideFrom,
}: CardProps & { slideFrom: 'left' | 'right' }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: slideFrom === 'left' ? -56 : 56, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (idx ?? 0) * 0.08 }}
      className={`
        w-full max-w-xl rounded-3xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl
        shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300
        hover:-translate-y-1 hover:bg-black/55 ${accentBorder}
        ${accentGlow ? `hover:${accentGlow}` : ''}
        sm:p-7
      `}
    >
      {/* Header: Logo + Date Badge */}
      <div className="flex items-center justify-between gap-3">
        {logo ? (
          <div
            className={`
              relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/20
              p-1.5 shadow-md ${logoBg}
            `}
          >
            <Image
              src={logo}
              alt={logoAlt || title}
              fill
              className="object-contain p-1"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-950/50 shadow-md">
            <GraduationCap className="h-6 w-6 text-purple-400" />
          </div>
        )}

        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-950/40 px-3 py-1 text-xs font-mono font-medium text-purple-200"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
        >
          <Calendar className="h-3 w-3 text-purple-400" />
          {dateBadge}
        </span>
      </div>

      {/* Role / School Title */}
      <h3
        className="mt-4 text-xl font-bold leading-snug text-white sm:text-2xl"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
      >
        {title}
      </h3>

      {/* Organization / Degree Subtitle */}
      <p
        className="mt-1 text-sm font-semibold text-purple-300/90"
        style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}
      >
        {sub}
      </p>

      {/* Location */}
      {location && (
        <p
          className="mt-1 flex items-center gap-1.5 text-xs text-white/60"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
        >
          <MapPin className="h-3 w-3 text-purple-400/80" />
          {location}
        </p>
      )}

      {/* Bullets */}
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs sm:text-sm font-normal leading-relaxed text-slate-100"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Note */}
      {note && (
        <p className="mt-3 text-xs sm:text-sm italic text-slate-200" style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
          {note}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-purple-400/25 bg-purple-950/50 px-2.5 py-1 text-[11px] font-medium text-purple-200"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,1)' }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

/* ─── Main Journey Component ─────────────────────────────────────────── */
type Tab = 'experience' | 'education';

export default function Scene06Journey() {
  const [tab, setTab] = useState<Tab>('experience');

  return (
    <section
      id="scene-journey"
      className="relative z-10 scroll-mt-24 bg-transparent px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-purple-300 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Career Timeline
            </div>
            <h2
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 0 24px rgba(168,85,247,0.45)' }}
            >
              Experience &amp; Education<span className="text-purple-400">.</span>
            </h2>
            <p
              className="mt-3 max-w-xl text-base text-slate-100"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
            >
              Verified industry experience, research internships, and academic foundations.
            </p>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/40 bg-purple-950/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-sm transition hover:bg-purple-900/60 hover:border-purple-400/70 shadow-[0_0_16px_rgba(168,85,247,0.25)]"
          >
            Inspect Résumé <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 inline-flex rounded-full border border-white/20 bg-black/50 p-1.5 backdrop-blur-md shadow-lg"
          role="tablist"
        >
          {(['experience', 'education'] as const).map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={`relative rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                tab === value ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}
            >
              {tab === value && (
                <motion.span
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.45)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {value === 'experience' ? <Briefcase className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                {value === 'experience' ? 'Industry Experience' : 'Formal Education'}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Timeline Content */}
        <div className="relative">
          {/* Central Vertical Spine Line */}
          <div
            aria-hidden="true"
            className="
              absolute bottom-4 left-[1.5rem] top-4 w-[2px]
              bg-gradient-to-b from-purple-500/80 via-violet-500/50 to-transparent
              md:left-1/2 md:-translate-x-1/2
            "
          />

          <AnimatePresence mode="wait">
            {tab === 'experience' && (
              <motion.div
                key="exp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 sm:space-y-16"
              >
                {profile.experience.map((exp, idx) => {
                  const accent = expAccent[exp.org] || {
                    dot: 'bg-purple-400',
                    border: 'hover:border-purple-400/50',
                    glow: 'shadow-purple-400/25',
                  };
                  return (
                    <TimelineCard
                      key={`${exp.org}-${idx}`}
                      idx={idx}
                      logo={expLogoMap[exp.org]}
                      logoAlt={exp.org}
                      logoBg={exp.org === 'Softgrowth Infotech' ? 'bg-[#0f141c]' : 'bg-white'}
                      title={exp.role}
                      sub={exp.org}
                      dateBadge={`${exp.start} — ${exp.end}`}
                      location={exp.location}
                      bullets={exp.items}
                      tags={expTags[exp.org]}
                      accentDot={accent.dot}
                      accentBorder={accent.border}
                      accentGlow={accent.glow}
                    />
                  );
                })}
              </motion.div>
            )}

            {tab === 'education' && (
              <motion.div
                key="edu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 sm:space-y-16"
              >
                {profile.education.map((edu, idx) => (
                  <TimelineCard
                    key={`${edu.school}-${idx}`}
                    idx={idx}
                    logo={eduLogoMap[edu.school] || null}
                    logoAlt={edu.school}
                    logoBg="bg-white"
                    title={edu.field}
                    sub={edu.school}
                    dateBadge={edu.year ? String(edu.year) : ''}
                    note={edu.note}
                    accentDot="bg-purple-400"
                    accentBorder="hover:border-purple-400/50"
                    accentGlow="shadow-purple-400/25"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
