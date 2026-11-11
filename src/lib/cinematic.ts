export function findNearestLoadedFrame<T>(
  requestedFrame: number,
  frames: Array<T | null>
): number {
  if (frames.length === 0) return -1;

  const target = Math.max(0, Math.min(frames.length - 1, Math.round(requestedFrame)));
  if (frames[target] !== null) return target;

  for (let distance = 1; distance < frames.length; distance += 1) {
    const previous = target - distance;
    const next = target + distance;
    if (previous >= 0 && frames[previous] !== null) return previous;
    if (next < frames.length && frames[next] !== null) return next;
  }

  return -1;
}

export function getCinematicPhase(progress: number): number {
  const normalized = Math.max(0, Math.min(1, progress));
  if (normalized < 0.25) return 0;
  if (normalized < 0.52) return 1;
  if (normalized < 0.78) return 2;
  return 3;
}

export interface FrameScrollAnchor {
  scroll: number;
  progress: number;
}

export function mapScrollToFrameProgress(scroll: number, anchors: readonly FrameScrollAnchor[]): number {
  if (anchors.length === 0) return 0;
  if (scroll <= anchors[0].scroll) return anchors[0].progress;
  for (let index = 1; index < anchors.length; index += 1) {
    const current = anchors[index];
    const previous = anchors[index - 1];
    if (scroll <= current.scroll) {
      const distance = current.scroll - previous.scroll;
      if (distance <= 0) return current.progress;
      const t = (scroll - previous.scroll) / distance;
      return previous.progress + (current.progress - previous.progress) * t;
    }
  }
  return anchors[anchors.length - 1].progress;
}
