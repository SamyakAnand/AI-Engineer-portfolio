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
    id: 'ai-ml-projects',
    value: 10,
    suffix: '+',
    label: 'AI & ML Systems Built',
    desc: 'Autonomous agents, RAG retrieval architectures, supervised pipelines & deep learning',
    color: 'text-purple-400',
    glow: 'bg-purple-500/20',
    featured: true,
    evidenceCategory: 'NEXUS, ARGUS AI, SHIRO, L Platform, Resume Matcher, NetworkSecurity',
  },
  {
    id: 'students-mentored',
    value: 100,
    suffix: '+',
    label: 'Learners Mentored',
    desc: 'Python programming, exploratory data analysis, machine learning pipelines & capstones',
    color: 'text-cyan-400',
    glow: 'bg-cyan-500/25',
    featured: true,
    evidenceCategory: 'Technical Mentorship · Softgrowth Infotech (Oct 2025 – Nov 2026)',
  },
  {
    id: 'data-analytics-projects',
    value: 50,
    suffix: '+',
    label: 'Data Analytics Deliverables',
    desc: 'Power BI executive dashboards, DAX modeling, SQL transformations & business intelligence',
    color: 'text-amber-400',
    glow: 'bg-amber-500/20',
    evidenceCategory: 'Financial Risk, Credit Card Delinquency, Blinkit, Insurance & Sales BI',
  },
  {
    id: 'datasets-analyzed',
    value: 40,
    suffix: '+',
    label: 'Datasets Analyzed',
    desc: 'Data profiling, anomaly checks, distributional metrics, statistical modeling & feature engineering',
    color: 'text-indigo-400',
    glow: 'bg-indigo-500/20',
    evidenceCategory: 'Clinical, Financial, E-commerce, Automobile & Network Telemetry',
  },
  {
    id: 'academic-projects',
    value: 5,
    suffix: '+',
    label: "Master's Capstones Guided",
    desc: 'Technical project architecture, documentation, defense decks & execution mentoring',
    color: 'text-emerald-400',
    glow: 'bg-emerald-500/20',
    evidenceCategory: 'End-to-End Capstones, Technical Specs & Defense Presentations',
  },
  {
    id: 'certifications',
    value: 9,
    suffix: '+',
    label: 'Verified Credentials',
    desc: 'Data Science, Machine Learning, Deep Learning, Cloud & Python engineering',
    color: 'text-fuchsia-400',
    glow: 'bg-fuchsia-500/20',
    evidenceCategory: 'Naresh IT, Kaggle, Evoastra, Gilbert, Udemy, CADD',
  },
] as const;

export const professionalImpactStatement =
  'I build practical AI applications that combine intelligent workflows, retrieval systems, machine learning, data engineering and reliable backend infrastructure — backed by hands-on engineering, technical training, and verifiable project codebases.';
