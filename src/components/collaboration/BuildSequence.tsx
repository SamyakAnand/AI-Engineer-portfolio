'use client';

import { useBuild, AGENTS, type AgentId, type BuildStage } from './BuildContext';
import BuildCanvas from './BuildCanvas';
import AnimatedCursor from './AnimatedCursor';
import SelectionOverlay from './SelectionOverlay';
import AlignmentGuides from './AlignmentGuides';
import CollaborationToolbar from './CollaborationToolbar';
import TouringController from './TouringController';
import AutoScrollTour from './AutoScrollTour';

const STAGE_TARGETS: Record<BuildStage, Record<string, { targetId: string; action: string }>> = {
  idle: {
    architect: { targetId: 'workspace-status', action: 'TOPOLOGY' },
    researcher: { targetId: 'workspace-status', action: 'CITATIONS' },
    llm: { targetId: 'workspace-status', action: 'RAG PIPELINE' },
    datascientist: { targetId: 'workspace-status', action: 'DATA MATRIX' },
    mlops: { targetId: 'workspace-status', action: 'SERVING' },
    evaluator: { targetId: 'workspace-status', action: 'BENCHMARK' },
    designer: { targetId: 'workspace-status', action: 'AESTHETIC' },
    security: { targetId: 'workspace-status', action: 'GUARDRAILS' },
    nexus: { targetId: 'workspace-status', action: 'ORCHESTRATION' },
    review: { targetId: 'workspace-status', action: 'HEALTH CHECK' },
  },
  initializing: {
    architect: { targetId: 'workspace-status', action: 'INITIALIZING' },
    researcher: { targetId: 'workspace-status', action: 'INDEXING PAPERS' },
    llm: { targetId: 'workspace-status', action: 'EMBEDDING STORE' },
    datascientist: { targetId: 'workspace-status', action: 'SCHEMA RESOLVE' },
    mlops: { targetId: 'workspace-status', action: 'DOCKER DAEMON' },
    evaluator: { targetId: 'workspace-status', action: 'HARNESS READY' },
    designer: { targetId: 'workspace-status', action: 'DESIGN TOKENS' },
    security: { targetId: 'workspace-status', action: 'SAFETY BOUNDS' },
    nexus: { targetId: 'workspace-status', action: 'AUTONOMOUS RUNNER' },
    review: { targetId: 'workspace-status', action: 'MONITORING' },
  },
  'nav-added': {
    architect: { targetId: 'header', action: 'WORDMARK ANCHOR' },
    researcher: { targetId: 'header', action: 'IDENTITY CITATION' },
    llm: { targetId: 'header', action: 'NAVIGATION ROUTES' },
    datascientist: { targetId: 'header', action: 'TELEMETRY' },
    mlops: { targetId: 'header', action: 'ROUTING LATENCY' },
    evaluator: { targetId: 'header', action: 'LINK ACCESSIBILITY' },
    designer: { targetId: 'header', action: 'FROSTED BLUR' },
    security: { targetId: 'header', action: 'HEADER SANITIZE' },
    nexus: { targetId: 'header', action: 'INTERACTION DISPATCH' },
    review: { targetId: 'header', action: 'NAV PASS' },
  },
  typography: {
    designer: { targetId: 'hero-typo', action: 'HERO TYPOGRAPHY' },
    architect: { targetId: 'hero-section', action: 'GRID COLUMNS' },
    llm: { targetId: 'hero-intro', action: 'POSITION STATEMENT' },
    evaluator: { targetId: 'hero-typo', action: 'CONTRAST AUDIT' },
    datascientist: { targetId: 'hero-typo', action: 'KERNING METRICS' },
    researcher: { targetId: 'hero-section', action: 'BIO ANCHOR' },
    mlops: { targetId: 'hero-section', action: 'GPU DRAW' },
    security: { targetId: 'hero-intro', action: 'CLAIM VERIFY' },
    nexus: { targetId: 'hero-portrait', action: 'FRAME ALLOCATE' },
    review: { targetId: 'hero-typo', action: 'TYPE AUDIT' },
  },
  'typography-edited': {
    designer: { targetId: 'hero-typo', action: 'TRACKING -0.04em' },
    llm: { targetId: 'hero-typo', action: 'TYPING ANAND' },
    architect: { targetId: 'hero-section', action: 'MARGIN SYNC' },
    evaluator: { targetId: 'hero-typo', action: 'WCAG 2.2 AAA' },
    datascientist: { targetId: 'hero-typo', action: 'HERO VECTOR' },
    researcher: { targetId: 'hero-intro', action: 'AFFILIATION' },
    mlops: { targetId: 'hero-portrait', action: 'TEXTURE PREFETCH' },
    security: { targetId: 'hero-intro', action: 'IDENTITY LOCK' },
    nexus: { targetId: 'hero-portrait', action: 'SLOT READY' },
    review: { targetId: 'hero-typo', action: 'RENDER COMPLETE' },
  },
  'portrait-drag': {
    designer: { targetId: 'hero-portrait', action: 'PLACING ARTWORK' },
    architect: { targetId: 'hero-portrait', action: 'ASPECT 16:9' },
    llm: { targetId: 'hero-intro', action: 'CAPTION TEXT' },
    evaluator: { targetId: 'hero-portrait', action: 'ALT TEXT AUDIT' },
    datascientist: { targetId: 'hero-portrait', action: 'RESOLUTION' },
    researcher: { targetId: 'hero-portrait', action: 'VISUAL STUDY' },
    mlops: { targetId: 'hero-portrait', action: 'WEBP COMPRESSION' },
    security: { targetId: 'hero-portrait', action: 'SAFE ASSET' },
    nexus: { targetId: 'hero-portrait', action: 'SHOWDOWN COMPONENT' },
    review: { targetId: 'hero-portrait', action: 'BOUNDS PASS' },
  },
  'portrait-resize': {
    designer: { targetId: 'hero-portrait', action: 'DUAL FRAME' },
    architect: { targetId: 'hero-portrait', action: 'RESPONSIVE FIT' },
    llm: { targetId: 'hero-intro', action: 'CTA STAGING' },
    evaluator: { targetId: 'hero-portrait', action: 'FRAME RATE 60FPS' },
    datascientist: { targetId: 'hero-portrait', action: 'COLOR GRADING' },
    researcher: { targetId: 'hero-section', action: 'SECTION RHYTHM' },
    mlops: { targetId: 'hero-portrait', action: 'CACHE HEADER' },
    security: { targetId: 'hero-portrait', action: 'ISOLATION' },
    nexus: { targetId: 'hero-portrait', action: 'DUAL OPPOSITION' },
    review: { targetId: 'hero-portrait', action: 'FRAME PASS' },
  },
  'supporting-added': {
    llm: { targetId: 'hero-intro', action: 'LEAD COPY' },
    designer: { targetId: 'hero-cta', action: 'BUTTON SHADOW' },
    architect: { targetId: 'hero-section', action: 'SUBGRID' },
    evaluator: { targetId: 'hero-cta', action: 'TABINDEX CHECK' },
    datascientist: { targetId: 'hero-intro', action: 'IMPACT METRIC' },
    researcher: { targetId: 'hero-cta', action: 'RESUME LINK' },
    mlops: { targetId: 'hero-section', action: 'LAYOUT SHIFT 0.0' },
    security: { targetId: 'hero-cta', action: 'REL NOOPENER' },
    nexus: { targetId: 'hero-intro', action: 'INTENT CLASSIFY' },
    review: { targetId: 'hero-cta', action: 'INTERACTIONS READY' },
  },
  'about-added': {
    architect: { targetId: 'about-heading', action: 'EDITORIAL SPREAD' },
    researcher: { targetId: 'about', action: 'ACADEMIC STORY' },
    llm: { targetId: 'about-heading', action: 'SYSTEM INTENT' },
    designer: { targetId: 'about-heading', action: 'SIGNATURE MARK' },
    datascientist: { targetId: 'about', action: 'DATA PHILOSOPHY' },
    evaluator: { targetId: 'about', action: 'READABILITY PASS' },
    mlops: { targetId: 'about', action: 'COMPONENT MOUNT' },
    security: { targetId: 'about', action: 'PROVENANCE' },
    nexus: { targetId: 'about', action: 'MISSION VECTOR' },
    review: { targetId: 'about', action: 'ABOUT PASS' },
  },
  projects: {
    architect: { targetId: 'project-grid', action: 'ASSEMBLING WORK' },
    nexus: { targetId: 'project-card-nexus', action: 'NEXUS ANALYST' },
    evaluator: { targetId: 'project-card-nexus', action: 'VERIFIABILITY' },
    llm: { targetId: 'project-card-nexus', action: 'LLM REPORT PIPELINE' },
    datascientist: { targetId: 'project-grid', action: 'DATA TOPOLOGY' },
    researcher: { targetId: 'project-card-nexus', action: 'EVIDENCE TRACE' },
    mlops: { targetId: 'project-grid', action: 'PIPELINE CONTAINER' },
    security: { targetId: 'project-card-nexus', action: 'REPRODUCIBLE CODE' },
    designer: { targetId: 'project-card-nexus', action: 'DIAGRAM RENDER' },
    review: { targetId: 'project-grid', action: 'PROJECTS PASS' },
  },
  'project-copied': {
    architect: { targetId: 'project-card-argus', action: 'DUPLICATING ARGUS' },
    nexus: { targetId: 'project-card-argus', action: 'GROUNDED REASONING' },
    evaluator: { targetId: 'project-card-argus', action: 'HALLUCINATION 0%' },
    llm: { targetId: 'project-card-argus', action: 'CITATION ENGINE' },
    datascientist: { targetId: 'project-card-argus', action: 'CLAIM AUDIT' },
    researcher: { targetId: 'project-card-argus', action: 'FACT GROUNDING' },
    mlops: { targetId: 'project-card-argus', action: 'MODEL LATENCY' },
    security: { targetId: 'project-card-argus', action: 'PROVENANCE CHAIN' },
    designer: { targetId: 'project-card-argus', action: 'BOX TOPOLOGY' },
    review: { targetId: 'project-grid', action: 'DUPLICATION COMPLETE' },
  },
  alignment: {
    designer: { targetId: 'project-grid', action: 'ALIGNING 2-COL' },
    architect: { targetId: 'project-grid', action: 'GUIDE SNAP' },
    llm: { targetId: 'project-card-studycopilot', action: 'MINI APP INTERFACE' },
    datascientist: { targetId: 'project-card-resume-analyzer', action: 'HYBRID SCORING' },
    evaluator: { targetId: 'project-grid', action: 'GRID BALANCE' },
    researcher: { targetId: 'project-card-studycopilot', action: 'STUDY COPILOT' },
    mlops: { targetId: 'project-card-resume-analyzer', action: 'FASTAPI SERVE' },
    security: { targetId: 'project-grid', action: 'INPUT SANITIZE' },
    nexus: { targetId: 'project-card-studycopilot', action: 'STUDY PLANNER' },
    review: { targetId: 'project-grid', action: 'ALIGNMENT PASS' },
  },
  skills: {
    mlops: { targetId: 'skills', action: 'MLOPS & SERVING' },
    llm: { targetId: 'skill-group-0', action: 'LANGCHAIN & RAG' },
    datascientist: { targetId: 'skills', action: 'PANDAS & SQL' },
    architect: { targetId: 'skills', action: 'FASTAPI & NODES' },
    evaluator: { targetId: 'skill-group-0', action: 'PYTORCH CORE' },
    researcher: { targetId: 'skills', action: 'TRANSFORMERS' },
    designer: { targetId: 'skills', action: 'CHIP HOVER' },
    security: { targetId: 'skills', action: 'CONTAINER SEC' },
    nexus: { targetId: 'skill-group-0', action: 'AGENTIC STACK' },
    review: { targetId: 'skills', action: 'STACK VERIFIED' },
  },
  experience: {
    datascientist: { targetId: 'experience-block-0', action: 'DATA TRAINER' },
    nexus: { targetId: 'experience-block-1', action: 'INTERN TEAM LEAD' },
    architect: { targetId: 'experience', action: 'EXPERIENCE FLOW' },
    evaluator: { targetId: 'experience-block-0', action: 'MENTORING METRICS' },
    llm: { targetId: 'experience-block-1', action: 'SCRAPING PIPELINE' },
    researcher: { targetId: 'experience-block-0', action: 'ML DEMONSTRATIONS' },
    mlops: { targetId: 'experience-block-1', action: 'AUTOMATION' },
    security: { targetId: 'experience', action: 'CHRONOLOGY AUDIT' },
    designer: { targetId: 'experience', action: 'DATE TOKENS' },
    review: { targetId: 'experience', action: 'ROLES VERIFIED' },
  },
  education: {
    architect: { targetId: 'education-card-0', action: 'B.TECH CSE' },
    researcher: { targetId: 'education-card-1', action: 'POLYTECHNIC CS' },
    evaluator: { targetId: 'education', action: 'ACADEMIC MERIT' },
    datascientist: { targetId: 'education-card-0', action: 'ALGORITHMS' },
    llm: { targetId: 'education-card-1', action: 'FOUNDATIONS' },
    mlops: { targetId: 'education-card-0', action: 'SYSTEMS' },
    designer: { targetId: 'education', action: 'DUAL CARDS' },
    security: { targetId: 'education', action: 'VERIFIED' },
    nexus: { targetId: 'education-card-0', action: 'DEGREE' },
    review: { targetId: 'education', action: 'CREDENTIALS PASS' },
  },
  contact: {
    llm: { targetId: 'contact-form', action: 'FORM BINDING' },
    designer: { targetId: 'contact-heading', action: 'CALL TO BUILD' },
    architect: { targetId: 'contact', action: 'SYSTEM INPUTS' },
    evaluator: { targetId: 'contact-form', action: 'EMAIL VALIDATION' },
    datascientist: { targetId: 'contact-form', action: 'MESSAGE PARSE' },
    researcher: { targetId: 'contact', action: 'SOCIAL LINKS' },
    mlops: { targetId: 'contact-form', action: 'MAILTO PROTOCOL' },
    security: { targetId: 'contact-form', action: 'XSS FILTER' },
    nexus: { targetId: 'contact-form', action: 'START CONVERSATION' },
    review: { targetId: 'contact-form', action: 'FORM PASS' },
  },
  review: {
    review: { targetId: 'header', action: 'SYSTEM AUDIT PASS' },
    architect: { targetId: 'hero-section', action: 'ARCHITECTURE VERIFIED' },
    designer: { targetId: 'hero-typo', action: 'AESTHETIC VERIFIED' },
    llm: { targetId: 'project-grid', action: 'LLM SYSTEMS LIVE' },
    datascientist: { targetId: 'skills', action: 'CAPABILITIES LIVE' },
    mlops: { targetId: 'header', action: 'LATENCY NOMINAL' },
    evaluator: { targetId: 'project-grid', action: 'BENCHMARKS PASSED' },
    researcher: { targetId: 'about', action: 'CITATIONS VERIFIED' },
    security: { targetId: 'contact-form', action: 'GUARDRAILS ARMED' },
    nexus: { targetId: 'hero-portrait', action: 'ALL SYSTEMS GO' },
  },
  complete: {
    review: { targetId: 'header', action: 'PORTFOLIO READY' },
    architect: { targetId: 'hero-typo', action: 'ONLINE' },
    designer: { targetId: 'about-heading', action: 'ONLINE' },
    llm: { targetId: 'project-card-nexus', action: 'ONLINE' },
    datascientist: { targetId: 'skill-group-0', action: 'ONLINE' },
    mlops: { targetId: 'experience-block-0', action: 'ONLINE' },
    evaluator: { targetId: 'project-card-argus', action: 'ONLINE' },
    researcher: { targetId: 'education-card-0', action: 'ONLINE' },
    security: { targetId: 'contact-form', action: 'ONLINE' },
    nexus: { targetId: 'hero-portrait', action: 'ONLINE' },
  },
};

export default function BuildSequence() {
  const { stage, activeAgent, skipRequested } = useBuild();
  const showCanvas = (stage === 'idle' || stage === 'initializing' || stage === 'nav-added') && !skipRequested;
  const currentConfig = STAGE_TARGETS[stage] || STAGE_TARGETS.complete;

  return (
    <>
      {showCanvas && <BuildCanvas />}

      {/* 9-10 Sleek Professional Collaborative AI Cursors */}
      <div className="collaborator-layer" aria-hidden="true">
        <SelectionOverlay />
        <AlignmentGuides />

        {AGENTS.map((agent, index) => {
          const cfg = currentConfig[agent.id] || { targetId: 'header', action: 'STANDBY' };
          const isActive = activeAgent === agent.id;
          return (
            <AnimatedCursor
              key={agent.id}
              def={agent}
              index={index}
              targetId={cfg.targetId}
              action={cfg.action}
              isActive={isActive}
              hideWhenOffscreen={false}
            />
          );
        })}
      </div>

      {/* Auto-Scroll Touring Controller */}
      <AutoScrollTour />

      <TouringController />
      <CollaborationToolbar />
    </>
  );
}
