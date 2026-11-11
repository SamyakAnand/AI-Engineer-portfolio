import { education } from '@/content/experience';

export default function EducationSection() {
  return (
    <section id="education" className="scene scene-education scene-graded">
      <div className="relative z-10 max-w-3xl mx-auto px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Academics</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Foundations first.
          </span>
        </h2>

        <div className="mt-12 space-y-8">
          {education.map((entry, idx) => (
            <div key={idx} className="relative pl-6 border-l border-line/60 pb-6 glass">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <h3 className="text-lg font-semibold text-text">{entry.school}</h3>
                <span className="text-xs uppercase tracking-widest text-text-dim font-mono">{entry.period}</span>
              </div>
              <p className="mt-2 text-sm text-text-dim">{entry.items[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
