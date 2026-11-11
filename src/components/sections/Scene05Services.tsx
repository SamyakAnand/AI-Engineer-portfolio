import { ArrowUpRight, BarChart3, Braces, BrainCircuit, Workflow } from 'lucide-react';

const services = [
  {
    title: 'AI and LLM applications',
    description: 'Build focused AI features with retrieval, structured outputs, and tool use where they solve a clear problem.',
    icon: BrainCircuit,
    tools: 'LLMs · RAG · LangChain · LangGraph',
  },
  {
    title: 'Machine learning workflows',
    description: 'Prepare data, compare models, and explain results through practical, reproducible experiments.',
    icon: Workflow,
    tools: 'Python · scikit-learn · PyTorch · MLflow',
  },
  {
    title: 'Data analysis and dashboards',
    description: 'Turn structured data into clear analysis, visual reports, and useful decision support.',
    icon: BarChart3,
    tools: 'SQL · Pandas · Power BI · Tableau',
  },
  {
    title: 'APIs and data tools',
    description: 'Develop Python APIs and small web tools that connect models, data, and user-facing workflows.',
    icon: Braces,
    tools: 'FastAPI · Flask · React · TypeScript',
  },
];

export default function Scene05Services() {
  return <section id="scene-services" className="relative z-10 scroll-mt-24 border-t border-white/10 bg-[#07111d]/20 px-6 py-24 text-white md:px-12 lg:px-20">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm text-sky-100/75">Services</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Ways I can help</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">Practical support across AI, machine learning, analytics, and application development.</p>
        </div>
        <a href="#scene-contact" onClick={event => { event.preventDefault(); document.getElementById('scene-contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[.06] px-4 py-2.5 text-sm text-white transition hover:bg-white/10">Discuss a project <ArrowUpRight className="h-4 w-4"/></a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map(({ title, description, icon: Icon, tools }, index) => <article key={title} className="rounded-2xl border border-white/15 bg-[#07111d]/[.84] p-5 transition-colors hover:border-sky-100/30 sm:p-6">
          <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.06] text-sky-100"><Icon aria-hidden="true" className="h-5 w-5"/></span><span className="text-xs tabular-nums text-white/35">0{index + 1}</span></div>
          <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-white/65">{description}</p>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-sky-100/65">{tools}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
