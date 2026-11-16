import type { Profile } from './types';

export const profile: Profile = {
  name: 'Samyak Anand',
  role: 'Applied AI Engineer',
  tagline: 'I build practical AI applications: source-grounded knowledge tools, deterministic data workflows, Python APIs, and machine-learning systems—designed around traceability, evaluation, and useful outcomes.',
  location: 'Hyderabad, India',
  phone: '+91 96237 19948',
  email: 'samyak.g.anand@gmail.com',
  education: [
    {
      school: 'Ballarpur Institute of Technology, Maharashtra',
      field: 'B.Tech, Computer Science & Engineering',
      year: 2024,
      note: 'Focus: Machine Learning, Data Science, Algorithms, Cloud Computing.',
    },
    {
      school: 'Bajaj College of Polytechnic, Maharashtra',
      field: 'Polytechnic Diploma, Computer Science',
      year: 2021,
      note: 'Diploma percentage: 84.25%. Foundations in programming, databases & systems.',
    },
  ],
  experience: [
    {
      org: 'Softgrowth Infotech',
      role: 'Data Science Trainer',
      start: 'October 2025',
      end: 'November 2026',
      location: 'Hyderabad, India',
      items: [
        'Mentored 100+ learners in Python programming, Data Science, Machine Learning, and practical analytics through hands-on training.',
        'Delivered practical instruction in data preprocessing, exploratory data analysis, statistical analysis, machine learning algorithms, and technical problem-solving.',
        'Guided 5+ postgraduate academic project teams through problem definition, technical architecture, implementation, documentation, and presentations.',
        'Commission-based / performance-based engagement; concluded 9 November 2026.',
        'Engagement concluded 9 November 2026.',
      ],
    },
    {
      org: 'Evoastra Ventures Inc.',
      role: 'Data Scientist Intern (Team Lead)',
      start: 'June 2025',
      end: 'August 2025',
      location: 'Remote',
      items: [
        'Led a collaborative team of five interns working on applied Data Science and Machine Learning projects. Developed CARS24 listing data-collection workflows for automotive market analysis.',
        'Contributed to an NLP-based recruitment and resume-analysis solution, including text processing, skill matching, feature engineering, and analytical reporting.',
      ],
    },
    {
      org: 'Gilbert Research Center',
      role: 'Data Science & ML Intern',
      start: 'March 2024',
      end: 'July 2024',
      location: 'Remote',
      items: [
        'Analyzed clinical healthcare datasets using statistical techniques and machine learning algorithms.',
        'Developed modular workflows involving data ingestion, validation, transformation, and model training.',
        'Used MLflow and DagsHub for experiment tracking and artifact management, and supported model evaluation and technical documentation.',
      ],
    },
  ],
  projects: [
    'nexus',
    'argus',
    'shiro',
    'l-platform',
    'akatsuki',
    'disease-predictor',
    'network-security',
    'resume-analyzer',
    'student-performance',
    'financial-risk',
    'credit-card',
    'blinkit',
    'insurance-analytics',
  ],
  links: {
    github: 'https://github.com/SamyakAnand',
    linkedin: 'https://www.linkedin.com/in/samyakanand/',
    portfolio: 'https://samyak-anand-ai-scientist-portfolio.vercel.app/',
    resume: '/resume.pdf',
  },
  languages: [
    { name: 'Python', level: 5 },
    { name: 'SQL', level: 5 },
    { name: 'TypeScript', level: 4 },
  ],
};
