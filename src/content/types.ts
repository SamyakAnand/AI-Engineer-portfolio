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

export interface Project {
  id: string;
  name: string;
  description: string;
  problem: string;
  architecture: string;
  stack: string[];
  features: string[];
  screenshots: string[];
  github: string;
  demo: string | null;
}

export interface SkillGroup {
  name: string;
  group: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillGroup[];
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
