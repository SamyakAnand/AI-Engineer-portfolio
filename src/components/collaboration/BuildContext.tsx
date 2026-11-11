'use client';

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';

export type BuildStage =
  | 'idle' | 'initializing' | 'nav-added' | 'typography' | 'typography-edited'
  | 'portrait-drag' | 'portrait-resize' | 'supporting-added' | 'about-added'
  | 'projects' | 'project-copied' | 'alignment' | 'skills' | 'experience'
  | 'education' | 'contact' | 'review' | 'complete';

export const BUILD_STAGES: BuildStage[] = [
  'idle', 'initializing', 'nav-added', 'typography', 'typography-edited',
  'portrait-drag', 'portrait-resize', 'supporting-added', 'about-added',
  'projects', 'project-copied', 'alignment', 'skills', 'experience',
  'education', 'contact', 'review', 'complete',
];

export type AgentId =
  | 'architect'
  | 'researcher'
  | 'llm'
  | 'datascientist'
  | 'mlops'
  | 'evaluator'
  | 'designer'
  | 'security'
  | 'nexus'
  | 'review'
  | 'design'
  | 'layout'
  | 'content'
  | 'visual';

export interface AgentDef {
  id: AgentId;
  label: string;
  color: string;
  cap: string;
  task: string;
}

export interface Selection {
  id: string;
  element: string;
  label: string;
  agent: AgentId;
  color: string;
}

export interface DragState {
  active: boolean;
  agent: AgentId | null;
  source: string;
  target: string;
  kind: 'component' | 'copy' | 'align' | null;
}

export interface BuildState {
  stage: BuildStage;
  progress: number;
  agents: AgentDef[];
  activeAgent: AgentId | null;
  selections: Selection[];
  selection: Selection | null;
  drag: DragState;
  copied: string | null;
  copying: boolean;
  status: string;
  completedAt: number | null;
  skipRequested: boolean;
  touring: boolean;
  autoScroll: boolean;
  autoScrollSpeed: number; // 0.6 to 2.0
  showHidden: boolean;
  layers: string[];
  runId: number;
}

export type BuildAction =
  | { type: 'SET_STAGE'; payload: BuildStage }
  | { type: 'SET_ACTIVE_AGENT'; payload: AgentId }
  | { type: 'SET_SELECTION'; payload: Selection | null }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_DRAG'; payload: DragState }
  | { type: 'SET_COPY'; payload: string }
  | { type: 'DONE_COPY'; payload: string }
  | { type: 'SET_STATUS'; payload: string }
  | { type: 'SET_COMPLETED_AT'; payload: number }
  | { type: 'SET_TOURING'; payload: boolean }
  | { type: 'SET_AUTO_SCROLL'; payload: boolean }
  | { type: 'SET_AUTO_SCROLL_SPEED'; payload: number }
  | { type: 'SET_SHOW_HIDDEN'; payload: boolean }
  | { type: 'SET_LAYERS'; payload: string[] }
  | { type: 'SKIP' }
  | { type: 'RESET' };

// 9 Highly Distinct Professional Collaborative AI / Engineering Agents
export const AGENTS: AgentDef[] = [
  {
    id: 'architect',
    label: 'AI ARCHITECT',
    color: '#6366f1', // Indigo
    cap: 'M2 1 L14 13 L8 12 L5 18 Z',
    task: 'System topology & distributed neural pipelines',
  },
  {
    id: 'researcher',
    label: 'RESEARCHER',
    color: '#06b6d4', // Cyan
    cap: 'M2 2 H15 L8 17 Z',
    task: 'ArXiv papers & mathematical formulations',
  },
  {
    id: 'llm',
    label: 'LLM ENGINEER',
    color: '#f59e0b', // Amber
    cap: 'M2 1 L13 13 L8 13 L5 18 Z',
    task: 'RAG context engineering & agent chains',
  },
  {
    id: 'datascientist',
    label: 'DATA SCIENTIST',
    color: '#8b5cf6', // Violet
    cap: 'M8 1 C4 1 1 5 1 10 C1 15 5 18 9 16 C13 14 16 9 14 5 C13 2 10 1 8 1 Z',
    task: 'Feature stores & exploratory pipelines',
  },
  {
    id: 'mlops',
    label: 'MLOPS',
    color: '#10b981', // Emerald
    cap: 'M3 9 L7 13 L15 3',
    task: 'Docker packaging, Kubernetes & low-latency serving',
  },
  {
    id: 'evaluator',
    label: 'EVALUATOR',
    color: '#3b82f6', // Sky Blue
    cap: 'M2 1 L14 13 L8 12 L5 18 Z',
    task: 'Benchmark scoring & grounded hallucinations check',
  },
  {
    id: 'designer',
    label: 'AI DESIGNER',
    color: '#f43f5e', // Rose
    cap: 'M2 1 L14 13 L8 12 L5 18 Z',
    task: 'Editorial aesthetic & UI construction',
  },
  {
    id: 'security',
    label: 'ALIGNMENT & SAFETY',
    color: '#ea580c', // Orange
    cap: 'M2 2 H15 L8 17 Z',
    task: 'Guardrails & safe output verification',
  },
  {
    id: 'nexus',
    label: 'NEXUS RUNTIME',
    color: '#a855f7', // Purple
    cap: 'M8 1 C4 1 1 5 1 10 C1 15 5 18 9 16 C13 14 16 9 14 5 C13 2 10 1 8 1 Z',
    task: 'Autonomous data agent orchestration',
  },
  {
    id: 'review',
    label: 'SYSTEM AUDITOR',
    color: '#14b8a6', // Teal
    cap: 'M3 9 L7 13 L15 3',
    task: 'Final production build and latency gates',
  },
];

export function createInitialBuildState(): BuildState {
  return {
    stage: 'idle',
    progress: 0,
    agents: AGENTS,
    activeAgent: null,
    selections: [],
    selection: null,
    drag: { active: false, agent: null, source: '', target: '', kind: null },
    copied: null,
    copying: false,
    status: 'Initializing workspace',
    completedAt: null,
    skipRequested: false,
    touring: false,
    autoScroll: true,
    autoScrollSpeed: 1.0,
    showHidden: false,
    layers: [],
    runId: 0,
  };
}

export function buildSelectionFor(element: HTMLElement, agent: AgentDef): Selection {
  return {
    id: `${agent.id}:${element.id}`,
    element: element.id,
    label: element.dataset.buildLayer || element.getAttribute('aria-label') || element.id,
    agent: agent.id,
    color: agent.color,
  };
}

export function buildReducer(state: BuildState, action: BuildAction): BuildState {
  switch (action.type) {
    case 'SET_STAGE': {
      const stage = action.payload;
      const progress = BUILD_STAGES.indexOf(stage) / (BUILD_STAGES.length - 1);
      const justCompleted = stage === 'complete' && state.stage !== 'complete';
      return {
        ...state,
        stage,
        progress: Math.max(state.progress, progress),
        completedAt: justCompleted ? Date.now() : state.completedAt,
        touring: justCompleted ? true : state.touring,
        status: stage === 'complete' ? 'Composition complete' : state.status,
      };
    }
    case 'SET_ACTIVE_AGENT':
      return { ...state, activeAgent: action.payload };
    case 'SET_SELECTION': {
      const selection = action.payload;
      if (!selection) return { ...state, selection: null };
      const selections = [...state.selections.filter((item) => item.id !== selection.id), selection].slice(-16);
      return { ...state, selection, selections };
    }
    case 'CLEAR_SELECTION':
      return { ...state, selection: null };
    case 'SET_DRAG':
      return { ...state, drag: action.payload };
    case 'SET_COPY':
      return { ...state, copying: true, copied: action.payload };
    case 'DONE_COPY':
      return { ...state, copying: false, copied: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_COMPLETED_AT':
      return { ...state, completedAt: action.payload };
    case 'SET_TOURING':
      return { ...state, touring: action.payload };
    case 'SET_AUTO_SCROLL':
      return { ...state, autoScroll: action.payload };
    case 'SET_AUTO_SCROLL_SPEED':
      return { ...state, autoScrollSpeed: action.payload };
    case 'SET_SHOW_HIDDEN':
      return { ...state, showHidden: action.payload };
    case 'SET_LAYERS':
      return { ...state, layers: [...new Set(action.payload)] };
    case 'SKIP':
      return {
        ...state,
        stage: 'complete',
        progress: 1,
        completedAt: Date.now(),
        skipRequested: true,
        activeAgent: 'review',
        touring: true,
        status: 'Composition complete · build skipped',
        drag: { active: false, agent: null, source: '', target: '', kind: null },
      };
    case 'RESET':
      return { ...createInitialBuildState(), runId: state.runId + 1 };
    default:
      return state;
  }
}

interface BuildContextValue extends BuildState {
  dispatch: Dispatch<BuildAction>;
  skip: () => void;
  reset: () => void;
}

const BuildContext = createContext<BuildContextValue | null>(null);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(buildReducer, undefined, createInitialBuildState);

  const skip = () => dispatch({ type: 'SKIP' });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <BuildContext.Provider value={{ ...state, dispatch, skip, reset }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild(): BuildContextValue {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
}
