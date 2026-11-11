'use client';

import { useCallback, useEffect, useRef } from 'react';
import { findNearestLoadedFrame, mapScrollToFrameProgress, type FrameScrollAnchor } from '@/lib/cinematic';

const TOTAL_FRAMES = 300;

export default function FullPageFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const progressRef = useRef(0);

  const render = useCallback((requested: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas) return;
    const index = findNearestLoadedFrame(requested, images);
    const image = index >= 0 ? images[index] : null;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#07111d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (image?.complete && image.naturalWidth) {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      // The source sequence is widescreen. On phones, `cover` cuts away most
      // of the authored scene; contain keeps every frame intact.
      const scale = mobile
        ? Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
        : Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    const requested = new Array<boolean>(TOTAL_FRAMES).fill(false);
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    const loadFrame = (index: number, priority: 'high' | 'low' = 'low') => new Promise<void>(resolve => {
      if (requested[index]) { resolve(); return; }
      requested[index] = true;
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = priority;
      image.onload = () => {
        if (!cancelled) {
          imagesRef.current[index] = image;
          if (Math.abs(index - frameRef.current) < 5) render(frameRef.current);
        }
        resolve();
      };
      image.onerror = () => resolve();
      image.src = `/frames/frame_${String(index + 1).padStart(3, '0')}.webp`;
    });
    const resize = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1.5 : 3,
        (mobile ? 1920 : 3840) / window.innerWidth,
        2160 / window.innerHeight,
      );
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      render(frameRef.current);
    };
    const update = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const sectionBeats = [
        ['hero-cinematic', 0],
        ['scene-identity', 0.18],
        ['scene-tech', 0.34],
        ['scene-projects', 0.52],
        ['scene-journey', 0.70],
        ['scene-services', 0.84],
        ['scene-contact', 0.93],
      ] as const;
      const anchors: FrameScrollAnchor[] = sectionBeats.flatMap(([id, progress]) => {
        const section = document.getElementById(id);
        return section ? [{ scroll: section.offsetTop, progress }] : [];
      });
      anchors.push({ scroll: maxScroll, progress: 1 });
      progressRef.current = reducedMotion ? 0 : mapScrollToFrameProgress(window.scrollY, anchors);
      frameRef.current = progressRef.current * (TOTAL_FRAMES - 1);
      if (!reducedMotion) {
        const frame = Math.round(frameRef.current);
        void loadFrame(frame, 'high');
        for (const neighbor of [frame - 1, frame + 1, frame - 2, frame + 2]) {
          if (neighbor >= 0 && neighbor < TOTAL_FRAMES) void loadFrame(neighbor, 'low');
        }
        if (window.matchMedia('(max-width: 767px)').matches) {
          imagesRef.current.forEach((image, index) => {
            if (image && Math.abs(index - frame) > 12) {
              imagesRef.current[index] = null;
              requested[index] = false;
            }
          });
        }
      }
      render(frameRef.current);
      window.dispatchEvent(new CustomEvent('sam:hero-progress', { detail: { progress: progressRef.current } }));
    };
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = 0; update(); });
    };
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    resize(); update();
    const preload = async () => {
      await loadFrame(0, 'high');
      if (reducedMotion) return;
      if (window.matchMedia('(max-width: 767px)').matches) {
        await Promise.all(Array.from({ length: 6 }, (_, index) => loadFrame(index + 1)));
        return;
      }
      for (let start = 1; start < TOTAL_FRAMES && !cancelled; start += 16) {
        await Promise.all(Array.from({ length: Math.min(16, TOTAL_FRAMES - start) }, (_, offset) => loadFrame(start + offset)));
      }
    };
    void preload();
    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  return <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
  </div>;
}
