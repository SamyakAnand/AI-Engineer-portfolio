import { experience } from '@/content/experience';

export default function ExperienceSection() {
  return (
    <section id="experience" className="scene scene-experience scene-graded">
      <div className="relative z-10 max-w-5xl mx-auto px-5 py-20">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Professional path</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Built. Not claimed.
          </span>
        </h2>

        <div className="mt-12 space-y-10">
          {experience.map((job, idx) => (
            <div key={idx} className="relative pl-6 border-l border-line/60 pb-6">
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-mono text-sm uppercase tracking-widest text-accent">{job.role}</p>
                  <h3 className="mt-1 text-lg font-semibold text-text">{job.org}</h3>
                  <p className="text-xs text-text-dim font-mono">
                    {job.start} &ndash; {job.end}
                    {job.location ? <> &nbsp;·&nbsp; <span className="text-white/40">{job.location}</span></> : ''}
                  </p>
                </div>
                <div className="text-xs uppercase tracking-widest text-text-dim font-mono">{job.items.length} outcomes</div>
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-text-dim">
                {job.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
