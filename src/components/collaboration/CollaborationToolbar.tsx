'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { AGENTS, buildSelectionFor, type AgentId, useBuild } from './BuildContext';

const AGENT_TARGETS: Partial<Record<AgentId, string[]>> = {
  architect: ['hero-section', 'project-grid', 'about-heading'],
  researcher: ['about', 'hero-intro', 'education-card-0'],
  llm: ['hero-intro', 'project-card-nexus', 'project-card-studycopilot'],
  datascientist: ['project-grid', 'skill-group-0', 'experience-block-0'],
  mlops: ['project-card-resume-analyzer', 'skills', 'experience-block-1'],
  evaluator: ['project-card-argus', 'hero-typo', 'project-grid'],
  designer: ['hero-typo', 'about-heading', 'contact-heading'],
  security: ['contact-form', 'hero-intro', 'skills'],
  nexus: ['project-card-nexus', 'hero-portrait', 'header'],
  review: ['header', 'contact-form', 'hero-portrait'],
  design: ['hero-typo', 'project-card-nexus', 'about-heading'],
  layout: ['project-card-nexus', 'skill-group-0', 'education-card-0'],
  content: ['hero-intro', 'experience-block-0', 'contact-form'],
  visual: ['hero-portrait', 'project-card-argus', 'project-card-resume-analyzer'],
};

const SECTIONS = [
  { id: 'home', target: 'hero-typo', label: 'Hero', short: '01' },
  { id: 'about', target: 'about-heading', label: 'About', short: '02' },
  { id: 'work', target: 'project-card-nexus', label: 'Selected work', short: '03' },
  { id: 'skills', target: 'skill-group-0', label: 'Skills', short: '04' },
  { id: 'experience', target: 'experience-block-0', label: 'Experience', short: '05' },
  { id: 'education', target: 'education-card-0', label: 'Education', short: '06' },
  { id: 'contact', target: 'contact-heading', label: 'Contact', short: '07' },
];

function prettyLayer(id: string) {
  return id.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CollaborationToolbar() {
  const {
    agents, stage, activeAgent, completedAt, skipRequested, status,
    touring, showHidden, layers, copied, dispatch, skip,
  } = useBuild();
  const [layersOpen, setLayersOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const isBuilding = stage !== 'complete' && !skipRequested;

  useEffect(() => {
    if (!completedAt) return;
    const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - completedAt) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [completedAt]);

  const focusElement = (id: string, agentId: AgentId) => {
    const target = document.getElementById(id);
    if (!target) return;
    const agent = AGENTS.find((candidate) => candidate.id === agentId) || AGENTS[0];
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dispatch({ type: 'SET_ACTIVE_AGENT', payload: agent.id });
    dispatch({ type: 'SET_SELECTION', payload: buildSelectionFor(target, agent) });
    dispatch({ type: 'SET_STATUS', payload: `${agent.label} · focused ${target.dataset.buildLayer || id}` });
  };

  const focusAgent = (agentId: AgentId) => {
    const candidates = AGENT_TARGETS[agentId] || [];
    const id = candidates.find((candidate) => document.getElementById(candidate)) || '';
    if (id) focusElement(id, agentId);
    else dispatch({ type: 'SET_ACTIVE_AGENT', payload: agentId });
  };

  const activeSections = SECTIONS.filter((section) => layers.includes(section.id));

  return (
    <div className="collab-toolbar-position">
      {(layersOpen || showHidden) && (
        <div className="collab-toolbar-panel" role="region" aria-label={showHidden ? 'Hidden navigation icons' : 'DOM layer list'}>
          {showHidden ? (
            <div className="hidden-icon-dock">
              <span className="hidden-icon-dock__title">QUICK SELECT</span>
              {activeSections.map((section) => (
                <button key={section.id} type="button" className="hidden-icon-dock__item" onClick={() => focusElement(section.target, activeAgent || 'layout')} aria-label={`Go to ${section.label}`}>
                  <span className="hidden-icon-dock__glyph">{section.short}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="layer-panel">
              <div className="layer-panel__heading"><span>LIVE DOM LAYERS</span><span>{layers.length} ACTIVE</span></div>
              <div className="layer-panel__list">
                {layers.map((id, index) => (
                  <button key={id} type="button" className="layer-panel__item" onClick={() => focusElement(id, activeAgent || 'layout')}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{prettyLayer(id)}</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="collab-toolbar" role="toolbar" aria-label="Live collaboration controls">
        <div className="collab-toolbar__people" aria-label={`${agents.length} simulated collaborators`}>
          {agents.map((agent) => (
            <button
              key={agent.id}
              type="button"
              className={`collab-person${activeAgent === agent.id ? ' is-active' : ''}`}
              style={{ '--agent-color': agent.color } as CSSProperties}
              onClick={() => focusAgent(agent.id)}
              aria-label={`${agent.label}: focus collaborator`}
              aria-pressed={activeAgent === agent.id}
              title={`${agent.label} — ${agent.task}`}
            >
              <span />
            </button>
          ))}
          <span className="collab-toolbar__agent-count">{agents.length} agents</span>
        </div>

        <span className="collab-toolbar__divider" />
        <div className="collab-toolbar__status" title={status}>
          <span className={`collab-status-dot${stage === 'complete' ? ' is-done' : ''}`} />
          <span>{stage === 'complete' ? 'Composition complete' : status}</span>
        </div>
        {completedAt && <span className="collab-toolbar__elapsed">{elapsed}s</span>}

        <span className="collab-toolbar__divider" />
        <button type="button" className={`collab-tool-button${touring ? ' is-on' : ''}`} onClick={() => dispatch({ type: 'SET_TOURING', payload: !touring })} aria-pressed={touring}>
          <span className="collab-tool-dot" />Touring
        </button>
        <button type="button" className={`collab-tool-button${layersOpen ? ' is-on' : ''}`} onClick={() => { setLayersOpen((open) => !open); if (showHidden) dispatch({ type: 'SET_SHOW_HIDDEN', payload: false }); }} aria-expanded={layersOpen}>
          <span className="collab-tool-icon" aria-hidden="true">▤</span>Layers <span className="collab-tool-count">{layers.length}</span>
        </button>
        <button type="button" className={`collab-tool-button${showHidden ? ' is-on' : ''}`} onClick={() => { dispatch({ type: 'SET_SHOW_HIDDEN', payload: !showHidden }); setLayersOpen(false); }} aria-pressed={showHidden}>
          <span className="collab-tool-icon" aria-hidden="true">⌖</span>{showHidden ? 'Hide icons' : 'Show hidden icons'}
        </button>
        {copied && <span className="collab-toolbar__copied" title={`Last copied: ${copied}`}>Copied · {copied}</span>}
        {isBuilding && (
          <button type="button" className="collab-tool-button collab-tool-button--skip" onClick={skip}>
            Skip build
          </button>
        )}
      </div>
    </div>
  );
}
