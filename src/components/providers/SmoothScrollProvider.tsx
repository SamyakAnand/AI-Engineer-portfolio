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
    // Keep native touch scrolling on phones. Running a second smooth-scroll
    // loop alongside touch momentum and the frame canvas made mobile feel heavy.
    const mobile = window.matchMedia('(max-width: 767px)').matches;

    const navigate = (event: Event) => {
      const sectionId = (event as CustomEvent<{ sectionId?: string }>).detail?.sectionId;
      if (!sectionId) return;
      const target = document.getElementById(sectionId);
      if (!target) return;
      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, { offset: -96, duration: 0.9, force: true });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };
    window.addEventListener('portfolio:navigate', navigate);

    const handleScrollLock = (event: Event) => {
      const locked = (event as CustomEvent<{ locked?: boolean }>).detail?.locked;
      if (!lenisRef.current) return;
      if (locked) lenisRef.current.stop();
      else lenisRef.current.start();
    };
    window.addEventListener('portfolio:scroll-lock', handleScrollLock);

    if (reducedMotion || mobile) {
      return () => {
        window.removeEventListener('portfolio:navigate', navigate);
        window.removeEventListener('portfolio:scroll-lock', handleScrollLock);
      };
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

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('portfolio:navigate', navigate);
      window.removeEventListener('portfolio:scroll-lock', handleScrollLock);
    };
  }, []);

  return <>{children}</>;
}
