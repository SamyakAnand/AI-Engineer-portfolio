import { projects } from '@/content/projects';

export default function ProjectsSection() {
  return (
    <section id="projects" className="scene scene-projects scene-graded">
      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Work</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Engineer intelligence.
          </span>
        </h2>
        <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-text-dim">
          Four systems built end-to-end — from a natural-language data analyst to an
          evidence-oriented analytics platform, an LLM Telegram copilot, and a
          resume-evaluation tool.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(projects).map((p) => (
            <div
              key={p.id}
              className="glass rounded-xl p-6 border border-line/60 hover:border-accent/40 transition-colors group"
            >
              <p className="text-xs uppercase tracking-[.2em] text-accent2 font-mono">{p.id}</p>
              <h3 className="mt-2 text-xl font-semibold text-text">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 5).map((s) => (
                  <span key={s} className="text-[10px] uppercase tracking-wider text-text-dim font-mono">{s}</span>
                ))}
                {p.stack.length > 5 && (
                  <span className="text-[10px] font-mono text-text-dim">+{p.stack.length - 5}</span>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg glass border border-line text-xs uppercase tracking-wider text-text-dim hover:text-text hover:border-accent transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg glass border border-line text-xs uppercase tracking-wider text-text-dim hover:text-text hover:border-accent transition-colors"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
