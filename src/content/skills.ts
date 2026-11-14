import type { SkillCategory } from './types';

export const skills: readonly SkillCategory[] = [
  {
    category: 'AI ENGINEERING',
    skills: [
      { name: 'Large Language Models', group: 'ai' },
      { name: 'Retrieval-Augmented Generation (RAG)', group: 'ai' },
      { name: 'AI Agents & Tool Calling', group: 'ai' },
      { name: 'LangChain', group: 'ai' },
      { name: 'LangGraph', group: 'ai' },
      { name: 'Prompt Engineering', group: 'ai' },
      { name: 'Embeddings & Semantic Search', group: 'ai' },
      { name: 'Model Evaluation', group: 'ai' },
    ],
  },
  {
    category: 'PROGRAMMING & AI TOOLS',
    skills: [
      { name: 'Python', group: 'programming' },
      { name: 'SQL', group: 'programming' },
      { name: 'JavaScript', group: 'programming' },
      { name: 'TypeScript', group: 'programming' },
      { name: 'ChatGPT', group: 'ai-tools' },
      { name: 'Claude', group: 'ai-tools' },
      { name: 'Gemini', group: 'ai-tools' },
      { name: 'DeepSeek', group: 'ai-tools' },
      { name: 'Kimi', group: 'ai-tools' },
      { name: 'Ollama', group: 'ai-tools' },
      { name: 'Hermes', group: 'ai-tools' },
      { name: 'DeepSeek Harness', group: 'ai-tools' },
    ],
  },
  {
    category: 'MACHINE LEARNING',
    skills: [
      { name: 'PyTorch', group: 'ml' },
      { name: 'TensorFlow', group: 'ml' },
      { name: 'Scikit-learn', group: 'ml' },
      { name: 'Natural Language Processing (NLP)', group: 'ml' },
      { name: 'Feature Engineering', group: 'ml' },
      { name: 'Model Evaluation', group: 'ml' },
    ],
  },
  {
    category: 'BACKEND DEVELOPMENT',
    skills: [
      { name: 'FastAPI', group: 'backend' },
      { name: 'Flask', group: 'backend' },
      { name: 'REST APIs', group: 'backend' },
      { name: 'PostgreSQL', group: 'backend' },
      { name: 'MongoDB', group: 'backend' },
    ],
  },
  {
    category: 'DATA SCIENCE',
    skills: [
      { name: 'Pandas', group: 'data' },
      { name: 'NumPy', group: 'data' },
      { name: 'Matplotlib & Seaborn', group: 'data' },
      { name: 'Power BI', group: 'data' },
      { name: 'Tableau', group: 'data' },
      { name: 'Data Analysis & EDA', group: 'data' },
    ],
  },
  {
    category: 'MLOPS AND INFRASTRUCTURE',
    skills: [
      { name: 'Docker', group: 'mlops' },
      { name: 'MLflow', group: 'mlops' },
      { name: 'DVC', group: 'mlops' },
      { name: 'Git & GitHub', group: 'mlops' },
      { name: 'GitHub Actions', group: 'mlops' },
      { name: 'AWS', group: 'mlops' },
    ],
  },
];
