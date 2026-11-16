// Evidence-led professional metrics. Keep values tied to the resume and project records.
export interface ProfessionalKpi {
  id: string;
  value: number;
  suffix: string;
  label: string;
  desc: string;
  color: string;
  glow: string;
  featured?: boolean;
  evidenceCategory: string;
}

export const professionalKpis: readonly ProfessionalKpi[] = [
  {
    id: 'students-mentored',
    value: 100,
    suffix: '+',
    label: 'Learners Mentored',
    desc: 'Python, data science, machine learning, and hands-on project guidance',
    color: 'text-cyan-400',
    glow: 'bg-cyan-500/25',
    featured: true,
    evidenceCategory: 'Softgrowth Infotech · Data Science Trainer',
  },
  {
    id: 'academic-projects',
    value: 5,
    suffix: '+',
    label: 'Postgraduate Teams Guided',
    desc: 'Project planning, technical implementation, documentation, and presentations',
    color: 'text-emerald-400',
    glow: 'bg-emerald-500/20',
    featured: true,
    evidenceCategory: 'Master’s-level academic project teams · Softgrowth Infotech',
  },
  {
    id: 'ai-ml-projects',
    value: 5,
    suffix: '+',
    label: 'Featured AI & ML Projects',
    desc: 'Knowledge retrieval, code intelligence, data analysis, and supervised ML',
    color: 'text-purple-400',
    glow: 'bg-purple-500/20',
    featured: true,
    evidenceCategory: 'NEXUS, ARGUS AI, SHIRO CodeMind, Disease Predictor, Resume Analyzer',
  },
  {
    id: 'data-analytics-projects',
    value: 6,
    suffix: '+',
    label: 'BI Case Studies',
    desc: 'Financial risk, insurance, credit cards, retail, and streaming analytics',
    color: 'text-amber-400',
    glow: 'bg-amber-500/20',
    evidenceCategory: 'Power BI and SQL portfolio projects documented in the resume',
  },
  {
    id: 'datasets-analyzed',
    value: 4,
    suffix: '',
    label: 'Public Demo URLs',
    desc: 'Four deployed project links; two Vercel demos are interactive and two Render demos may need a cold start',
    color: 'text-indigo-400',
    glow: 'bg-indigo-500/20',
    evidenceCategory: 'NEXUS, ARGUS AI, Disease Predictor, Student Performance Indicator',
  },
  {
    id: 'certifications',
    value: 11,
    suffix: '',
    label: 'Courses & Credentials',
    desc: 'Data science, machine learning, Python, and internship/research completions',
    color: 'text-fuchsia-400',
    glow: 'bg-fuchsia-500/20',
    evidenceCategory: 'Naresh IT, Kaggle, Udemy, Evoastra, Gilbert Research Center, CADD',
  },
] as const;

export const professionalImpactStatement =
  'I build practical AI applications that combine retrieval, machine learning, deterministic data workflows, and reliable Python APIs—backed by hands-on projects and technical mentorship.';
