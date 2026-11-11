'use client';

import { useEffect, type ReactNode } from 'react';

export default function ScrollRevealProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(
      '[data-scroll-reveal], section[id]:not(#hero-cinematic) > div > div',
    ));
    items.forEach(item => item.dataset.scrollReveal = 'true');
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(item => item.dataset.revealed = 'true');
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.revealed = 'true';
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <>{children}</>;
}
