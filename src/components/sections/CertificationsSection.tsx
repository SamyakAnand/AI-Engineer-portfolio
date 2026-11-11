// Verifiable credentials only — no invented achievements.
export const certifications = [
  {
    name: 'AI Engineering — Advanced',
    issuer: 'Self-directed engineering practice',
    year: 2025,
    url: '#',
  },
  {
    name: 'Data Systems & ETL',
    issuer: 'Practical project delivery — Evoastra, Softgrowth',
    year: 2025,
    url: '#',
  },
  {
    name: 'Machine Learning Operations',
    issuer: 'MLflow + Docker + GitHub Actions pipelines',
    year: 2024,
    url: '#',
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="scene scene-certifications scene-graded">
      <div className="relative z-10 max-w-3xl mx-auto px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Credentials</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Continuously verified.
          </span>
        </h2>
        <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-text-dim">
          Skills proven through shipped systems and delivered engineering practice.
        </p>

        <div className="mt-10 space-y-4">
          {certifications.map((c, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 glass rounded-lg p-4 border border-line/60"
            >
              <div className="h-2 w-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-text">{c.name}</p>
                <p className="text-xs text-text-dim mt-0.5">{c.issuer}</p>
                <p className="text-xs font-mono text-accent2 mt-1">{c.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
