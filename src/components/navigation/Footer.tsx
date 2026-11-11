import Link from 'next/link';
import { profile } from '@/content/profile';

export default function Footer() {
  return (
    <footer className="scene scene-footer border-t border-line/60">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="#init" aria-label="Samyak Anand — home">
            <span className="font-mono text-sm uppercase tracking-[.2em] text-accent2">
              S. A.
            </span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-5" aria-label="Footer">
            {[
              { label: 'Initializing', href: '#init' },
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Resume', href: profile.links.resume },
              { label: 'Contact', href: '#contact' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-[.16em] text-text-dim hover:text-text transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-xs text-text-dim font-mono">
          &copy; {new Date().getFullYear()} Samyak Anand. Built with Next.js, R3F, GSAP, Lenis.
        </p>
      </div>
    </footer>
  );
}
