'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';

const certifications = [
  { name: 'Full Stack Data Science & AI Specialization', issuer: 'Naresh IT', year: '2024' },
  { name: 'Data Science & Machine Learning Advanced', issuer: 'Udemy', year: '2024' },
];

type Tab = 'experience' | 'education';

export default function Scene06Journey() {
  const [tab, setTab] = useState<Tab>('experience');
  useEffect(() => {
    const onSelect = (event: Event) => {
      const value = (event as CustomEvent<Tab>).detail;
      if (value === 'experience' || value === 'education') setTab(value);
    };
    window.addEventListener('portfolio:select-background-tab', onSelect);
    return () => window.removeEventListener('portfolio:select-background-tab', onSelect);
  }, []);
  return <section id="scene-journey" className="relative z-10 scroll-mt-24 border-t border-white/10 bg-transparent px-6 py-24 text-white md:px-12 lg:px-20">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-3 text-sm text-sky-100/75">Background</p><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Experience & education</h2><p className="mt-3 max-w-2xl text-base text-white/70">Choose a section to see my work history or education.</p></div>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-[#07111d]/80 px-4 py-2.5 text-sm text-white transition hover:bg-white/15">View résumé <ArrowUpRight className="h-4 w-4"/></a>
      </div>

      <div className="mt-8 inline-flex rounded-full border border-white/15 bg-[#07111d]/80 p-1" role="tablist" aria-label="Background details">
        {(['experience', 'education'] as const).map(value => <button key={value} id={`${value}-tab`} type="button" role="tab" aria-selected={tab === value} aria-controls={`${value}-panel`} onClick={() => setTab(value)} className={`rounded-full px-5 py-2.5 text-sm transition-colors ${tab === value ? 'bg-white text-[#07111d]' : 'text-white/70 hover:text-white'}`}>{value === 'experience' ? 'Experience' : 'Education'}</button>)}
      </div>

      {tab === 'experience' ? <div id="experience-panel" role="tabpanel" aria-labelledby="experience-tab" className="mt-6 grid gap-4 md:grid-cols-2">
        {profile.experience.map(exp => <article key={exp.org} className="rounded-2xl border border-white/15 bg-[#07111d]/[.84] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-lg font-semibold text-white">{exp.role}</h3><p className="mt-1 text-sm text-sky-100/80">{exp.org}</p></div><p className="text-right text-xs text-white/60">{exp.start} – {exp.end}<br/>{exp.location}</p></div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75">{exp.items.map(item => <li key={item}>{item}</li>)}</ul>
        </article>)}
      </div> : <div id="education-panel" role="tabpanel" aria-labelledby="education-tab" className="mt-6 grid gap-4 md:grid-cols-2">
        {[...profile.education.map(edu => ({ title: edu.field, place: edu.school, year: edu.year, note: edu.note })), ...certifications.map(cert => ({ title: cert.name, place: cert.issuer, year: Number(cert.year), note: undefined }))].map(item => <article key={`${item.title}-${item.place}`} className="rounded-2xl border border-white/15 bg-[#07111d]/[.84] p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-semibold text-white">{item.title}</h3><p className="mt-1 text-sm text-sky-100/80">{item.place}</p></div><span className="shrink-0 text-sm text-white/60">{item.year}</span></div>{item.note && <p className="mt-3 text-sm text-white/65">{item.note}</p>}</article>)}
      </div>}
    </div>
  </section>;
}
