'use client';

import { tokens } from '@/lib/design-system';

export interface Experience {
  id: string;
  org: string;
  role: string;
  start: string;
  end: string;
  location: string;
  items: string[];
  accent: string;
}

const experiences: Experience[] = [
  {
    id: 'softgrowth',
    org: 'SoftGrowth Infotech',
    role: 'Data Science Trainer',
    start: 'October 2025',
    end: 'Present',
    location: 'Hyderabad, India',
    accent: '#7c3aed',
    items: [
      'Mentor engineering cohorts in advanced Python development, algorithm design, and data pipeline architecture.',
      'Architect practical lab infrastructure enforcing strict unit testing, containerization, and reproducible ML workflows.',
      'Design and deliver hands-on workshops covering machine learning fundamentals, model deployment, and data engineering best practices.',
      'Guide learners through end-to-end project lifecycles from data collection to model evaluation and production deployment.',
    ],
  },
  {
    id: 'evoastra',
    org: 'Evoastra Ventures Inc.',
    role: 'Data Scientist Intern (Lead)',
    start: 'June 2025',
    end: 'August 2025',
    location: 'Remote',
    accent: '#6366f1',
    items: [
      'Led a cross-functional engineering team of 5 interns, improving workflow delivery efficiency by 25%.',
      'Engineered an automated web-scraping telemetry pipeline for live market pricing feeds with schema validation.',
      'Built an NLP candidate ranking engine utilizing hybrid semantic similarity scoring, reducing screening effort by 60%.',
      'Set up model experiment tracking and reproducible training pipelines using MLflow.',
    ],
  },
  {
    id: 'gilbert',
    org: 'Gilbert Research Center',
    role: 'Data Science & ML Intern',
    start: 'March 2024',
    end: 'July 2024',
    location: 'Remote',
    accent: '#22d3ee',
    items: [
      'Executed statistical analysis on multi-variable clinical datasets to identify high-risk patient health factors.',
      'Engineered modular data pipelines and integrated MLflow experiment tracking for full model training reproducibility.',
      'Built data visualization dashboards to track clinical outcome metrics across patient cohorts.',
      'Collaborated with clinical researchers to define data requirements and validate analytical findings.',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="editorial-section experience-section" data-build-layer="Experience">
      <div className="section-shell">
        <div className="section-kicker mb-6">
          <span>04</span>
          <span className="text-[#929095] uppercase tracking-[.15em] font-mono text-xs">
            PROFESSIONAL EXPERIENCE
          </span>
        </div>

        <div className="display-heading mb-6 max-w-4xl" style={{ lineHeight: 1.2 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            PROFESSIONAL <span className="text-[#a78bfa]">JOURNEY.</span>
          </h2>
          <p className="text-[#929095] mt-4 max-w-xl">
            Applied data science, practical learning, and the work of bringing ideas into production.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#2a2a3e]"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />

          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 md:space-x-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row md:justify-start' : 'md:flex-row md:justify-end'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 top-2 w-4 h-4 rounded-full border-2 border-white"
                  style={{
                    borderColor: exp.accent,
                    background: exp.accent,
                    boxShadow: `0 0 12px ${exp.accent}Glow`,
                    zIndex: 2,
                  }}
                />

                {/* Experience card */}
                <div
                  className={`w-full md:w-[calc(50%-24px)] rounded-xl border border-[#2a2a3e] bg-[#171719] p-5 transition-all duration-300 hover:border-[rgba(124,58,237,.3)] ${
                    index % 2 === 0
                      ? 'md:pr-10'
                      : 'md:pl-10 md:md:justify-end md:text-right'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="text-sm font-mono font-bold uppercase tracking-widest"
                      style={{ color: 'var(--accent)', fontSize: '10px', whiteSpace: 'nowrap' }}
                    >
                      {exp.role}
                    </span>
                    <span
                      className="text-xs text-[#929095] font-mono uppercase tracking-widest"
                      style={{ fontSize: '9px', whiteSpace: 'nowrap' }}
                    >
                      {exp.start} {exp.end ? '-' + exp.end : ''}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-semibold text-white mb-1"
                    style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
                  >
                    {exp.org}
                  </h3>
                  <p
                    className="text-xs text-[#929095] mb-3"
                    style={{ fontSize: '11px' }}
                  >
                    {exp.location}
                  </p>

                  <ul className="space-y-2">
                    {exp.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[#c8c6cc] leading-relaxed flex items-start gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: exp.accent }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
