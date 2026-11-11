'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navigate = (event: Event) => {
      const sectionId = (event as CustomEvent<{ sectionId?: string }>).detail?.sectionId;
      if (!sectionId) return;
      const target = document.getElementById(sectionId);
      if (!target) return;
      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, { offset: -96, duration: 0.9, force: true });
      } else {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };
    window.addEventListener('portfolio:navigate', navigate);

    // Respect user reduced motion preference
    if (reducedMotion) {
      return () => window.removeEventListener('portfolio:navigate', navigate);
    }

    const lenis = new Lenis({
      duration: 0.78,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.removeEventListener('portfolio:navigate', navigate);
    };
  }, []);

  return <>{children}</>;
}
