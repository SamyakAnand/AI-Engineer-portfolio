import { ArrowUpRight, Mail, ExternalLink } from 'lucide-react';

const links = [
  { label: 'Email', href: 'mailto:samyak.g.anand@gmail.com', value: 'samyak.g.anand@gmail.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com/SamyakAnand', value: 'Projects and code', icon: ExternalLink },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samyakanand/', value: 'Connect professionally', icon: ExternalLink },
];

export default function Scene07Contact() {
  return <section id="scene-contact" className="relative z-10 scroll-mt-20 border-t border-white/10 bg-transparent px-6 py-24 text-white md:px-12 lg:px-20">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.8fr] lg:gap-20">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[.2em] text-sky-100/65">Contact</p>
        <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-6xl">Let’s make something useful.</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/65">I’m open to conversations about AI, machine learning, data work, and thoughtful software. The best way to reach me is by email.</p>
        <a href="mailto:samyak.g.anand@gmail.com" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#07111d] transition hover:bg-sky-100">Get in touch <ArrowUpRight className="h-4 w-4"/></a>
      </div>
      <div className="grid content-center gap-3">
        {links.map(({ label, href, value, icon: Icon }) => <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'} className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#07111d]/[.78] p-5 transition hover:border-white/25 hover:bg-[#07111d]/[.88]">
          <span className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.06] text-sky-100/85"><Icon className="h-5 w-5"/></span><span><span className="block text-xs text-white/45">{label}</span><span className="mt-1 block text-sm font-medium text-white/85">{value}</span></span></span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"/>
        </a>)}
      </div>
    </div>
    <footer className="mx-auto mt-20 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Samyak Anand</span><span>Built with curiosity and care.</span></footer>
  </section>;
}
