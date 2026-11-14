import type { Profile } from './types';

export const profile: Profile = {
  name: 'Samyak Anand',
  role: 'Applied AI Engineer',
  tagline: 'I build intelligent systems that turn complex problems into useful products.',
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
        'Teaching Python, data analysis, and machine learning fundamentals through hands-on exercises.',
        'Guiding learners through applied ML projects, EDA routines, and model evaluation workflows.',
      ],
    },
    {
      org: 'Evoastra Ventures Inc.',
      role: 'Data Scientist Intern (Lead)',
      start: 'June 2025',
      end: 'August 2025',
      location: 'Remote',
      items: [
        'Developed analytics workflows, web scraping pipelines, and CARS24 data collection systems.',
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
        'Analyzed clinical healthcare datasets using statistical and machine learning algorithms.',
        'Constructed modular data pipelines and tracked experiments using MLflow.',
        'Collaborated with research mentors to summarize model performance and clinical findings.',
      ],
    },
  ],
  projects: [
    'argus',
    'nexus',
    'shiro',
    'l-platform',
    'resume-analyzer',
    'disease-predictor',
    'blinkit-dashboard',
    'credit-card-dashboard',
  ],
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
