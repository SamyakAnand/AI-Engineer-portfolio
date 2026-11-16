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
        'Conducted technical training in Python programming, NumPy, Pandas, and exploratory data analysis.',
        'Delivered hands-on instruction in machine learning algorithms, Scikit-learn pipelines, and model evaluation metrics.',
        'Mentored 100+ learners through real-world capstone projects, code reviews, and technical problem-solving sessions.',
        'Guided academic project teams through end-to-end architecture design, documentation, and technical defense presentations.',
        'Engagement concluded 9 November 2026.',
      ],
    },
    {
      org: 'Evoastra Ventures Inc.',
      role: 'Data Scientist Intern (Lead)',
      start: 'June 2025',
      end: 'August 2025',
      location: 'Remote',
      items: [
        'Developed analytics workflows, automated web scraping pipelines, and CARS24 data collection systems.',
        'Engineered NLP recruitment-scoring workflows and automated resume analysis prototypes.',
      ],
    },
    {
      org: 'Gilbert Research Center',
      role: 'Data Science & ML Intern',
      start: 'March 2024',
      end: 'July 2024',
      location: 'Remote',
      items: [
        'Analyzed clinical healthcare datasets using statistical methods and supervised machine learning algorithms.',
        'Constructed modular data pipelines and tracked model experiments using MLflow.',
        'Collaborated with research mentors to summarize model performance metrics and clinical findings.',
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
