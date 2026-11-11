import { describe, expect, it } from 'vitest';
import { findNearestLoadedFrame, getCinematicPhase, mapScrollToFrameProgress } from './cinematic';

describe('cinematic frame selection', () => {
  it('keeps the requested frame when it is loaded', () => {
    const frames = [null, { id: 1 }, null];

    expect(findNearestLoadedFrame(1, frames)).toBe(1);
  });

  it('uses the nearest decoded frame when a scrub target is still loading', () => {
    const frames = [{ id: 0 }, null, { id: 2 }, null];

    expect(findNearestLoadedFrame(1, frames)).toBe(0);
    expect(findNearestLoadedFrame(3, frames)).toBe(2);
  });

  it('returns no frame when the sequence has not decoded any image', () => {
    expect(findNearestLoadedFrame(0, [null, null])).toBe(-1);
  });
});

describe('cinematic phase thresholds', () => {
  it('maps scroll progress to the four narrative beats', () => {
    expect(getCinematicPhase(0)).toBe(0);
    expect(getCinematicPhase(0.25)).toBe(1);
    expect(getCinematicPhase(0.52)).toBe(2);
    expect(getCinematicPhase(0.78)).toBe(3);
    expect(getCinematicPhase(1)).toBe(3);
  });
});

describe('section aligned frame progress', () => {
  const anchors = [
    { scroll: 0, progress: 0 },
    { scroll: 1000, progress: 0.2 },
    { scroll: 3000, progress: 0.58 },
    { scroll: 5000, progress: 0.9 },
    { scroll: 6000, progress: 1 },
  ];
  it('lands on the intended visual beat at each section anchor', () => {
    expect(mapScrollToFrameProgress(3000, anchors)).toBeCloseTo(0.58);
  });
  it('interpolates smoothly between section anchors and clamps the ends', () => {
    expect(mapScrollToFrameProgress(2000, anchors)).toBeCloseTo(0.39);
    expect(mapScrollToFrameProgress(-10, anchors)).toBe(0);
    expect(mapScrollToFrameProgress(7000, anchors)).toBe(1);
  });
});
