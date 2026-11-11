import type { Profile } from './types';

export const profile: Profile = {
  name: 'Samyak Anand',
  role: 'AI & Data Science Practitioner',
  tagline: 'Building useful intelligence from data.',
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
      end: 'Present',
      location: 'Chandrapur / Hyderabad',
      items: [
        'Teach Python, data analysis, and machine learning through practical exercises.',
        'Guide learners through applied projects and common data workflows.',
      ],
    },
    {
      org: 'Evoastra Ventures Inc.',
      role: 'Data Scientist Intern (Lead)',
      start: 'June 2025',
      end: 'August 2025',
      location: 'Remote',
      items: [
        'Worked on analytics, web scraping, and NLP recruitment-scoring workflows.',
        'Contributed to a CARS24 car listing data collection project.',
        'Built a resume analysis project using NLP techniques.',
      ],
    },
    {
      org: 'Gilbert Research Center',
      role: 'Data Science & ML Intern',
      start: 'March 2024',
      end: 'July 2024',
      location: 'Remote',
      items: [
        'Analyzed clinical datasets using statistical and machine learning methods.',
        'Worked with data pipelines and MLflow experiment tracking.',
        'Summarized model results for research collaborators.',
      ],
    },
  ],
  projects: ['nexus', 'argus', 'resume-analyzer', 'disease-predictor', 'blinkit-dashboard', 'insurance-dashboard', 'financial-risk-dashboard', 'credit-card-dashboard'],
  links: {
    github: 'https://github.com/SamyakAnand',
    linkedin: 'https://www.linkedin.com/in/samyakanand/',
    portfolio: 'https://github.com/SamyakAnand',
    resume: '/resume.pdf',
  },
  languages: [
    { name: 'Python', level: 5 },
    { name: 'SQL', level: 5 },
    { name: 'TypeScript', level: 4 },
  ],
};
