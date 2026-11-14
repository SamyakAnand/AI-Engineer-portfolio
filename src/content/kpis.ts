// Single source of truth for Samyak Anand's Professional Impact KPIs & Track Record metrics.

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
    label: 'Students Mentored',
    desc: 'Python, Data Science, Machine Learning and practical technical training',
    color: 'text-cyan-400',
    glow: 'bg-cyan-500/25',
    featured: true,
    evidenceCategory: 'Technical Mentorship · Softgrowth Infotech',
  },
  {
    id: 'data-analytics-projects',
    value: 50,
    suffix: '+',
    label: 'Data Analytics Projects',
    desc: 'Excel, SQL, Power BI, Tableau, dashboards and business intelligence',
    color: 'text-amber-400',
    glow: 'bg-amber-500/20',
    evidenceCategory: 'Business Intelligence, DAX & Executive Dashboards',
  },
  {
    id: 'ai-ml-projects',
    value: 10,
    suffix: '+',
    label: 'AI & ML Projects',
    desc: 'Machine Learning, Deep Learning, NLP and intelligent applications',
    color: 'text-purple-400',
    glow: 'bg-purple-500/20',
    evidenceCategory: 'Autonomous Agents, RAG & Deep Learning Systems',
  },
  {
    id: 'datasets-analyzed',
    value: 40,
    suffix: '+',
    label: 'Datasets Analyzed',
    desc: 'Data cleaning, EDA, statistical analysis and predictive modelling',
    color: 'text-indigo-400',
    glow: 'bg-indigo-500/20',
    evidenceCategory: 'Clinical, Financial, Retail & Web Scraped Tabular Data',
  },
  {
    id: 'academic-projects',
    value: 5,
    suffix: '+',
    label: "Master's-Level Academic Projects",
    desc: 'Academic project development, implementation and technical guidance',
    color: 'text-emerald-400',
    glow: 'bg-emerald-500/20',
    evidenceCategory: 'End-to-End Capstones, Documentation & Defense PPTs',
  },
  {
    id: 'certifications',
    value: 9,
    suffix: '+',
    label: 'Certifications & Credentials',
    desc: 'Data Science, AI, Machine Learning and technical specializations',
    color: 'text-fuchsia-400',
    glow: 'bg-fuchsia-500/20',
    evidenceCategory: 'Naresh IT, Kaggle, Evoastra, Gilbert, Udemy, CADD',
  },
  {
    id: 'websites-applications',
    value: 10,
    suffix: '+',
    label: 'Websites & Applications Built',
    desc: 'Personal portfolios, client websites, collaborative products and AI applications',
    color: 'text-blue-400',
    glow: 'bg-blue-500/20',
    evidenceCategory: 'Next.js, React, Flask, Streamlit & Edge Deployments',
  },
  {
    id: 'team-leadership',
    value: 5,
    suffix: '+',
    label: 'Member Project Teams',
    desc: 'Collaborative project execution and technical team leadership',
    color: 'text-rose-400',
    glow: 'bg-rose-500/20',
    evidenceCategory: 'Evoastra Intern Team Lead & Collaborative Capstones',
  },
] as const;

export const professionalImpactStatement =
  'I build, analyze, mentor and deliver — from developing AI-powered applications and business intelligence solutions to guiding academic teams through complete technical projects, documentation and presentations.';
