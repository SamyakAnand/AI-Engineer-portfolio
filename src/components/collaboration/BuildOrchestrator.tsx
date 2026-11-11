'use client';

import { useEffect } from 'react';
import { AGENTS, buildSelectionFor, type AgentId, type BuildStage, type DragState, useBuild } from './BuildContext';

type TimelineStep = {
  stage: BuildStage;
  status: string;
  duration: number;
  agent: AgentId;
  targetId: string;
  action: string;
  drag?: DragState;
};

export const BUILD_TIMELINE: TimelineStep[] = [
  { stage: 'initializing', status: 'Initializing workspace', duration: 600, agent: 'design', targetId: 'workspace-status', action: 'BOOTING SYSTEM' },
  { stage: 'nav-added', status: 'Navigation installed', duration: 420, agent: 'design', targetId: 'header', action: 'MOUNTING HEADER' },
  { stage: 'typography', status: 'Hero typography placed', duration: 450, agent: 'design', targetId: 'hero-typo', action: 'PLACING TYPE' },
  { stage: 'typography-edited', status: 'Headline edited in place', duration: 450, agent: 'content', targetId: 'hero-typo', action: 'EDITING ANAND' },
  {
    stage: 'portrait-drag',
    status: 'Anime hero and villain revealed',
    duration: 540,
    agent: 'visual',
    targetId: 'hero-portrait',
    action: 'PLACING ARTWORK',
    drag: { active: true, agent: 'visual', source: 'portrait-slot', target: 'hero-portrait', kind: 'component' },
  },
  {
    stage: 'portrait-resize',
    status: 'Showdown artwork framed',
    duration: 450,
    agent: 'visual',
    targetId: 'hero-portrait',
    action: 'FRAMING DUEL',
    drag: { active: false, agent: null, source: '', target: '', kind: null },
  },
  { stage: 'supporting-added', status: 'Introduction and calls to action added', duration: 420, agent: 'content', targetId: 'hero-intro', action: 'ADDING CTA' },
  { stage: 'about-added', status: 'About section assembled', duration: 420, agent: 'design', targetId: 'about-heading', action: 'ASSEMBLING ABOUT' },
  { stage: 'projects', status: 'Selected work assembled', duration: 520, agent: 'layout', targetId: 'project-grid', action: 'LAYOUT GRID' },
  {
    stage: 'project-copied',
    status: 'Project component duplicated',
    duration: 590,
    agent: 'layout',
    targetId: 'project-card-argus',
    action: 'DUPLICATING ARGUS',
    drag: { active: true, agent: 'layout', source: 'project-card-nexus', target: 'project-card-argus', kind: 'copy' },
  },
  { stage: 'alignment', status: 'Project grid aligned', duration: 500, agent: 'layout', targetId: 'project-grid', action: 'ALIGNING AXIS' },
  { stage: 'skills', status: 'Skills organized into groups', duration: 420, agent: 'content', targetId: 'skill-group-0', action: 'GROUPING STACK' },
  { stage: 'experience', status: 'Experience section assembled', duration: 460, agent: 'content', targetId: 'experience-block-0', action: 'SYNCING ROLES' },
  { stage: 'education', status: 'Education section assembled', duration: 440, agent: 'design', targetId: 'education-card-0', action: 'LINKING DEGREES' },
  { stage: 'contact', status: 'Contact section added', duration: 460, agent: 'content', targetId: 'contact-form', action: 'BINDING FORM' },
  { stage: 'review', status: 'Checking the final composition', duration: 470, agent: 'review', targetId: 'header', action: 'VERIFYING SYSTEM' },
  { stage: 'complete', status: 'Composition complete', duration: 400, agent: 'review', targetId: 'header', action: 'SYSTEM READY' },
];

export default function BuildOrchestrator() {
  const { dispatch, skipRequested, runId } = useBuild();

  useEffect(() => {
    if (skipRequested) return;
    let cancelled = false;
    let timer: number | undefined;
    let index = 0;

    const finishForReducedMotion = () => {
      dispatch({ type: 'SET_STAGE', payload: 'complete' });
      dispatch({ type: 'SET_STATUS', payload: 'Composition complete · reduced motion' });
      dispatch({ type: 'SET_ACTIVE_AGENT', payload: 'review' });
      dispatch({ type: 'CLEAR_SELECTION' });
      dispatch({ type: 'SET_DRAG', payload: { active: false, agent: null, source: '', target: '', kind: null } });
    };

    const runNext = () => {
      if (cancelled || index >= BUILD_TIMELINE.length) return;
      const step = BUILD_TIMELINE[index++];
      dispatch({ type: 'SET_STAGE', payload: step.stage });
      dispatch({ type: 'SET_STATUS', payload: step.status });
      dispatch({ type: 'SET_ACTIVE_AGENT', payload: step.agent });

      if (step.drag) {
        dispatch({ type: 'SET_DRAG', payload: step.drag });
      } else {
        dispatch({ type: 'SET_DRAG', payload: { active: false, agent: null, source: '', target: '', kind: null } });
      }

      // Check for target element and set selection + auto-scroll to follow construction
      const targetEl = document.getElementById(step.targetId);
      if (targetEl) {
        const agentDef = AGENTS.find((a) => a.id === step.agent) || AGENTS[0];
        dispatch({ type: 'SET_SELECTION', payload: buildSelectionFor(targetEl, agentDef) });
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (step.stage === 'complete') return;
      timer = window.setTimeout(runNext, step.duration);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = window.setTimeout(finishForReducedMotion, 140);
    } else {
      timer = window.setTimeout(runNext, 240);
    }

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [dispatch, skipRequested, runId]);

  return null;
}
