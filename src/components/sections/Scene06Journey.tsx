'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
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
  'Softgrowth Infotech': ['Python', 'Machine Learning', 'Data Analysis', 'Teaching'],
  'Evoastra Ventures Inc.': ['NLP', 'Web Scraping', 'Analytics', 'Resume AI'],
  'Gilbert Research Center': ['Clinical ML', 'MLflow', 'Statistics', 'Pipelines'],
};

const expAccent: Record<string, { dot: string; border: string; glow: string }> = {
  'Softgrowth Infotech':     { dot: 'bg-emerald-400', border: 'hover:border-emerald-400/40', glow: 'shadow-emerald-400/20' },
  'Evoastra Ventures Inc.':  { dot: 'bg-violet-400',  border: 'hover:border-violet-400/40',  glow: 'shadow-violet-400/20'  },
  'Gilbert Research Center': { dot: 'bg-sky-400',     border: 'hover:border-sky-400/40',     glow: 'shadow-sky-400/20'     },
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
  accentDot = 'bg-sky-400',
  accentBorder = 'hover:border-sky-400/40',
  accentGlow = 'shadow-sky-400/20',
}: CardProps) {
  const isLeft = idx % 2 === 0;

  return (
    <div className="relative grid md:grid-cols-2 md:gap-8">
      {/* ── spine dot (centered on the spine) ── */}
      <div
        className={`
          absolute left-[1.0625rem] top-8 z-20 h-4 w-4 rounded-full border-[3px] border-[#07111d]
          md:left-1/2 md:-translate-x-1/2
          ${accentDot}
          shadow-[0_0_16px_6px_rgba(56,189,248,0.3)]
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
        w-full rounded-2xl border border-white/[0.12] bg-black/30
        p-5 sm:p-6 backdrop-blur-[8px]
        shadow-[0_8px_40px_rgba(0,0,0,0.6)]
        transition-all duration-300
        ${accentBorder}
        hover:bg-black/40
        hover:shadow-[0_12px_60px_rgba(0,0,0,0.5)]
      `}
    >
      {/* header */}
      <div className="flex items-start gap-4">
        {logo ? (
          <div className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ${logoBg} p-1 shadow-md`}>
            <Image src={logo} alt={logoAlt} fill className="object-contain" />
          </div>
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-sky-950/60 border border-sky-400/20 text-lg font-bold text-sky-300 shadow-md">
            {sub.split(' ').slice(0, 2).map(w => w[0]).join('')}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3
            className="text-lg font-bold leading-snug text-white"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,1)' }}
          >
            {title}
          </h3>
          <p
            className="mt-0.5 text-sm font-semibold text-sky-200"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}
          >
            {sub}
          </p>
        </div>
      </div>

      {/* meta */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-950/60 px-3 py-1 text-xs font-medium text-sky-200"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}>
          <Calendar className="h-3 w-3" />
          {dateBadge}
        </span>
        {location && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/80"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}>
            <MapPin className="h-3 w-3" />
            {location}
          </span>
        )}
      </div>

      {/* bullets */}
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/90"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* note */}
      {note && (
        <p className="mt-3 text-sm italic text-white/80" style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
          {note}
        </p>
      )}

      {/* tags */}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-sky-400/20 bg-sky-950/50 px-2.5 py-1 text-xs font-medium text-sky-200"
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

/* ─── main ───────────────────────────────────────────────────────────── */
type Tab = 'experience' | 'education';

export default function Scene06Journey() {
  const [tab, setTab] = useState<Tab>('experience');

  return (
    <section
      id="scene-journey"
      className="relative z-10 scroll-mt-24 bg-transparent px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sky-400"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
              Background
            </p>
            <h2
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1)' }}
            >
              Experience &amp; Education
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/85"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
              A cinematic journey through my professional and academic milestones.
            </p>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/40 bg-black/50 px-5 py-2.5 text-sm font-medium text-sky-200 backdrop-blur-sm transition hover:bg-sky-900/60 hover:border-sky-400/70"
          >
            View résumé <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 inline-flex rounded-full border border-white/20 bg-black/50 p-1 backdrop-blur-md"
          role="tablist"
        >
          {(['experience', 'education'] as const).map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                tab === value ? 'text-[#07111d]' : 'text-white/80 hover:text-white'
              }`}
              style={{ textShadow: tab === value ? 'none' : '0 1px 6px rgba(0,0,0,1)' }}
            >
              {tab === value && (
                <motion.span
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full bg-sky-300"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {value === 'experience' ? <Briefcase className="h-3.5 w-3.5" /> : <GraduationCap className="h-3.5 w-3.5" />}
                {value === 'experience' ? 'Experience' : 'Education'}
              </span>
            </button>
          ))}
        </motion.div>

        {/* timeline */}
        <AnimatePresence mode="wait">
          {tab === 'experience' ? (
            <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="relative">
                {/* spine */}
                <div className="pointer-events-none absolute left-[1.0625rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400/80 via-violet-400/60 to-transparent md:left-1/2 md:-translate-x-px" />
                <div className="flex flex-col gap-16">
                  {profile.experience.map((exp, i) => {
                    const acc = expAccent[exp.org] ?? { dot: 'bg-sky-400', border: 'hover:border-sky-400/40', glow: 'shadow-sky-400/20' };
                    return (
                      <TimelineCard
                        key={exp.org}
                        idx={i}
                        logo={expLogoMap[exp.org] ?? null}
                        logoAlt={exp.org}
                        logoBg={exp.org === 'Gilbert Research Center' ? 'bg-slate-200' : 'bg-white'}
                        title={exp.role}
                        sub={exp.org}
                        dateBadge={`${exp.start} – ${exp.end}`}
                        location={exp.location}
                        bullets={exp.items}
                        tags={expTags[exp.org]}
                        accentDot={acc.dot}
                        accentBorder={acc.border}
                        accentGlow={acc.glow}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="edu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="relative">
                {/* spine */}
                <div className="pointer-events-none absolute left-[1.0625rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400/80 via-pink-400/60 to-transparent md:left-1/2 md:-translate-x-px" />
                <div className="flex flex-col gap-16">
                  {profile.education.map((edu, i) => (
                    <TimelineCard
                      key={edu.school}
                      idx={i}
                      logo={eduLogoMap[edu.school] ?? null}
                      logoAlt={edu.school}
                      logoBg="bg-white"
                      title={edu.field}
                      sub={edu.school}
                      dateBadge={String(edu.year)}
                      note={edu.note}
                      tags={i === 0
                        ? ['B.Tech', 'CSE', 'ML', 'Cloud Computing', 'Algorithms']
                        : ['Diploma', 'CSE', 'Programming', 'Databases', '84.25%']
                      }
                      accentDot={i === 0 ? 'bg-amber-400' : 'bg-pink-400'}
                      accentBorder={i === 0 ? 'hover:border-amber-400/40' : 'hover:border-pink-400/40'}
                      accentGlow={i === 0 ? 'shadow-amber-400/20' : 'shadow-pink-400/20'}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
