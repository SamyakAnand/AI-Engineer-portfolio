// Smooth-scroll progress, 0 (top) -> 1 (bottom).
// One subscription per cursor keeps each cursor autonomous; budget is small.
import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const s = window.scrollY ?? 0;
      const d = document.documentElement.scrollHeight - window.innerHeight;
      const p = d > 0 ? Math.min(1, Math.max(0, s / d)) : 0;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return progress;
}
