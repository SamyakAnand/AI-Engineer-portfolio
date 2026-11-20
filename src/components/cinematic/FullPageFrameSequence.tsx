'use client';

import { useCallback, useEffect, useRef } from 'react';
import { findNearestLoadedFrame, mapScrollToFrameProgress, type FrameScrollAnchor } from '@/lib/cinematic';

const TOTAL_FRAMES = 300;
const MOBILE_FRAME_STRIDE = 3;
const MOBILE_CACHE_RADIUS = MOBILE_FRAME_STRIDE * 4;

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

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const index = findNearestLoadedFrame(requested, images);
    const image = index >= 0 ? images[index] : null;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = mobile ? 'medium' : 'high';
    ctx.fillStyle = '#07111d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image?.complete && image.naturalWidth) {
      // On phones, use a softened cover scale: noticeably wider framing than
      // full-bleed cover, but large enough to avoid the tiny letterboxed frame.
      // Desktop keeps the original immersive cover treatment.
      const coverScale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const fitScale = mobile ? coverScale * 0.78 : coverScale;
      const width = image.naturalWidth * fitScale;
      const height = image.naturalHeight * fitScale;
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

    const loadFrame = (index: number, priority: 'high' | 'low' = 'low') => new Promise<void>((resolve) => {
      if (index < 0 || index >= TOTAL_FRAMES || requested[index]) {
        resolve();
        return;
      }
      requested[index] = true;
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = priority;
      image.onload = () => {
        if (!cancelled) {
          imagesRef.current[index] = image;
          const mobile = window.matchMedia('(max-width: 767px)').matches;
          if (Math.abs(index - frameRef.current) <= (mobile ? MOBILE_FRAME_STRIDE * 2 + 1 : 5)) {
            render(frameRef.current);
          }
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
        mobile ? 1.25 : 2,
        (mobile ? 1280 : 2560) / window.innerWidth,
        (mobile ? 1600 : 2160) / window.innerHeight,
      );
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      render(frameRef.current);
    };

    const update = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const sectionBeats = [
        ['hero-cinematic', 0],
        ['scene-identity', 0.16],
        ['scene-tech', 0.32],
        ['scene-projects', 0.48],
        ['scene-journey', 0.64],
        ['scene-certifications', 0.76],
        ['scene-services', 0.86],
        ['scene-contact', 0.94],
      ] as const;
      const anchors: FrameScrollAnchor[] = sectionBeats.flatMap(([id, progress]) => {
        const section = document.getElementById(id);
        return section ? [{ scroll: section.offsetTop, progress }] : [];
      });
      anchors.push({ scroll: maxScroll, progress: 1 });

      progressRef.current = reducedMotion ? 0 : mapScrollToFrameProgress(window.scrollY, anchors);
      const rawFrame = progressRef.current * (TOTAL_FRAMES - 1);
      const stride = mobile ? MOBILE_FRAME_STRIDE : 1;
      const frame = mobile ? Math.round(rawFrame / stride) * stride : Math.round(rawFrame);
      frameRef.current = Math.min(TOTAL_FRAMES - 1, frame);

      if (!reducedMotion) {
        void loadFrame(frameRef.current, 'high');
        for (const offset of [-stride, stride, -stride * 2, stride * 2]) {
          void loadFrame(frameRef.current + offset, 'low');
        }

        if (mobile) {
          imagesRef.current.forEach((image, index) => {
            if (image && Math.abs(index - frameRef.current) > MOBILE_CACHE_RADIUS) {
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
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
    update();

    const preload = async () => {
      await loadFrame(0, 'high');
      if (reducedMotion || cancelled) return;
      if (window.matchMedia('(max-width: 767px)').matches) {
        // Sample every third source frame on phones; scroll still maps across
        // the complete sequence while avoiding hundreds of eager image loads.
        await Promise.all(Array.from({ length: 5 }, (_, index) => loadFrame((index + 1) * MOBILE_FRAME_STRIDE)));
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

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
