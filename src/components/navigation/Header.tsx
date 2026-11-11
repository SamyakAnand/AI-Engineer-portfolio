'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Initializing', href: '#init' },
    { label: 'Creation Studio', href: '#studio' },
    { label: 'Intelligence Architecture', href: '#future' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="flex items-center justify-between px-5 py-3 max-w-6xl mx-auto">
        <Link href="#init" aria-label="Samyak Anand — home">
          <span className="font-mono text-sm uppercase tracking-[.2em] text-accent2">
            S. A.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[.16em] text-text-dim hover:text-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-xs uppercase tracking-widest text-text-dim"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[.16em] text-text-dim hover:text-text"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
