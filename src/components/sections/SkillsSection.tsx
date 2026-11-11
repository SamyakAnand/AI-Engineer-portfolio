import { skills } from '@/content/skills';
import { profile } from '@/content/profile';

export default function SkillsSection() {
  return (
    <section id="skills" className="scene scene-skills scene-graded">
      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Capabilities</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            The stack.
          </span>
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {skills.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-xs uppercase tracking-[.2em] text-text-dim mb-4">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s.name} className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider glass border border-line/60">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-xs uppercase tracking-[.2em] text-text-dim">Languages &amp; core</div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {profile.languages.map((lang) => (
            <span key={lang.name} className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider glass border border-line/60">
              {lang.name} <span className="ml-1.5 text-[10px] font-mono opacity-70">{lang.level}/5</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
