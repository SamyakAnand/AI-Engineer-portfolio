'use client';

import { profile } from '@/content/profile';

export default function AboutSection() {
  return (
    <section id="about" className="scene scene-about scene-graded">
      <div className="relative z-10 max-w-4xl mx-auto px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Introduction</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Think beyond.
          </span>
          <br />
          Engineer intelligence.
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-sm leading-relaxed text-text-dim">
          I am an AI Scientist and LLM Engineer building intelligent systems that
          reason, retrieve, and act. My work sits at the intersection of machine
          learning, data engineering, and product — turning ambiguous problems
          into reproducible, verifiable pipelines.
        </p>
        <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-text-dim">
          <span className="font-mono text-accent">THIS IS NOT A TEMPLATE.</span>{' '}
          <span className="font-mono text-accent2">EVERY PIPELINE IS BUILT.</span>
        </p>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[.2em] text-text-dim">Technical fluency</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang.name}
                className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider glass border border-line/60"
                style={{
                  color: lang.level >= 5 ? 'var(--accent)' : lang.level >= 3 ? 'var(--accent2)' : 'var(--text-dim)',
                }}
              >
                {lang.name}
                <span className="ml-1.5 text-[10px] font-mono opacity-70">{lang.level}/5</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
