// Shared type conventions for the content layer (single source of truth).

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  education: { school: string; field: string; year?: number; note?: string }[];
  experience: { org: string; role: string; start: string; end: string; location?: string; items: string[] }[];
  projects: string[];
  links: { github: string; linkedin: string; portfolio: string; resume: string };
  languages: { name: string; level: number }[];
}

export type SkillEvidence = 'project-backed' | 'hands-on' | 'course-backed' | 'learning';
export type SkillTier = 'project-verified' | 'hands-on' | 'familiar';

export interface SkillProjectRef {
  id: string;
  name: string;
}

export interface SkillGroup {
  name: string;
  group: string;
  tier?: SkillTier;
  evidence?: SkillEvidence;
  context?: string;
  projectRefs?: SkillProjectRef[];
}

export interface SkillCategory {
  category: string;
  description?: string;
  skills: SkillGroup[];
}

export type ProjectCategory = 'ai' | 'ml' | 'ds' | 'analytics' | 'portfolio' | 'systems';

export interface Project {
  id: string;
  name: string;
  tier?: 1 | 2; // Priority tier
  category: string;
  type: ProjectCategory;
  description: string;
  problem: string;
  solution?: string;
  intendedUsers?: string;
  realWorldUseCase?: string;
  architecture: string;
  pipelineSteps?: string[];
  decisions?: string;
  limitations?: string;
  evaluationResults?: string;
  securityNotes?: string;
  futureRoadmap?: string;
  stack: string[];
  features: string[];
  screenshots: string[];
  github: string;
  demo: string | null;
  isLive?: boolean;
  stats?: { label: string; value: string }[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: number;
  url?: string;
}

export interface Education {
  school: string;
  period: string;
  items: string[];
}
