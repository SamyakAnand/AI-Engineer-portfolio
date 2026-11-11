'use client';

import { tokens } from '@/lib/design-system';

export interface Education {
  id: string;
  school: string;
  period: string;
  items: string[];
  accent: string;
}

const education: Education[] = [
  {
    id: 'btech',
    school: 'B.Tech, Computer Science & Engineering',
    period: '2024',
    accent: '#7c3aed',
    items: [
      'Core computing foundations — data structures, algorithms, operating systems, and computer networks.',
      'Applied AI engineering focus with projects spanning machine learning, natural language processing, and data systems.',
      'Capstone project: autonomous data analysis pipeline with LLM integration and evaluation framework.',
      'Graduated with a focus on applied AI engineering and production system development.',
    ],
  },
  {
    id: 'polytechnic',
    school: 'Polytechnic Diploma, Computer Science',
    period: '2020',
    accent: '#6366f1',
    items: [
      'Diploma percentage: 84.25%.',
      'Foundation in programming, mathematics, and computer fundamentals.',
      'Practical coursework in C programming, data structures, and introductory database systems.',
      'Developed strong problem-solving skills through systematic algorithm design and implementation.',
    ],
  },
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="editorial-section education-section"
      data-build-layer="Education"
    >
      <div className="section-shell">
        <div className="section-kicker mb-6">
          <span>05</span>
          <span className="text-[#929095] uppercase tracking-[.15em] font-mono text-xs">
            EDUCATION
          </span>
        </div>

        <div className="display-heading mb-6 max-w-4xl" style={{ lineHeight: 1.2 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            ACADEMIC <span className="text-[#a78bfa]">BACKGROUND.</span>
          </h2>
          <p className="text-[#929095] mt-4 max-w-xl">
            A foundation in computer science, applied AI engineering, and systematic problem-solving.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((edu, index) => (
            <article
              key={edu.id}
              className="rounded-xl border border-[#2a2a3e] bg-[#171719] p-6 transition-all duration-300 hover:border-[rgba(124,58,237,.3)] hover:shadow-lg hover:shadow-[rgba(124,58,237,.06)]"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: edu.accent,
                    boxShadow: `0 0 12px ${edu.accent}Glow`,
                  }}
                >
                  <span className="text-sm">{'</>'}</span>
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold text-white uppercase tracking-wider"
                    style={{ fontSize: '11px', letterSpacing: '0.08em' }}
                  >
                    {edu.school}
                  </h3>
                  <p
                    className="text-xs text-[#929095] font-mono"
                    style={{ fontSize: '9px', letterSpacing: '0.1em' }}
                  >
                    {edu.period}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {edu.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[#c8c6cc] leading-relaxed flex items-start gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: edu.accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
