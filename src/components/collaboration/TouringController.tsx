'use client';

import { useEffect } from 'react';
import { AGENTS, buildSelectionFor, useBuild } from './BuildContext';

export default function TouringController() {
  const { stage, touring, dispatch } = useBuild();

  useEffect(() => {
    if (stage !== 'complete' || !touring) {
      if (stage === 'complete') dispatch({ type: 'CLEAR_SELECTION' });
      return;
    }

    let index = 0;
    let frame = 0;
    const isVisible = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      return rect.bottom > 92 && rect.top < window.innerHeight - 116 && rect.right > 0 && rect.left < window.innerWidth;
    };
    const visibleTargets = () => Array.from(document.querySelectorAll<HTMLElement>('[data-tour-target]')).filter((target) => target.id && isVisible(target));
    const focus = (target: HTMLElement, agentIndex: number) => {
      const agent = AGENTS[agentIndex % AGENTS.length];
      dispatch({ type: 'SET_ACTIVE_AGENT', payload: agent.id });
      dispatch({ type: 'SET_SELECTION', payload: buildSelectionFor(target, agent) });
      dispatch({ type: 'SET_STATUS', payload: `Touring · ${target.dataset.buildLayer || target.id}` });
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    const visit = () => {
      const targets = visibleTargets();
      if (targets.length === 0) return;
      focus(targets[index % targets.length], index);
      index += 1;
    };
    const keepSelectionInView = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const selectedId = document.querySelector<HTMLElement>('.selection-overlay')?.dataset.selectedElement;
        const selected = selectedId ? document.getElementById(selectedId) : null;
        if (selected && isVisible(selected)) return;
        const target = visibleTargets()[0];
        if (target) focus(target, index++);
      });
    };

    window.addEventListener('scroll', keepSelectionInView, { passive: true });
    window.addEventListener('resize', keepSelectionInView);
    const timer = window.setInterval(visit, 2800);
    keepSelectionInView();
    return () => {
      window.clearInterval(timer);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', keepSelectionInView);
      window.removeEventListener('resize', keepSelectionInView);
    };
  }, [stage, touring, dispatch]);

  return null;
}
