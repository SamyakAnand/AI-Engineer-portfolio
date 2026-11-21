import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import type { PortfolioTarget } from './chat-navigation';

export type LocalKnowledgeResponse = {
  reply: string;
  nav?: PortfolioTarget;
};

function projectResponse(
  projectId: keyof typeof projects,
  label: string,
): LocalKnowledgeResponse {
  const project = projects[projectId];
  return {
    reply: [
      project.name + ': ' + project.description,
      project.solution,
      'Current limitations: ' + project.limitations,
    ].join(' '),
    nav: { sectionId: 'scene-projects', label },
  };
}

export function generateLocalKnowledgeResponse(query: string): LocalKnowledgeResponse {
  const q = query.toLowerCase();

  if (q.includes('argus')) return projectResponse('argus', 'ARGUS AI Project');
  if (q.includes('nexus') || q.includes('analyst')) return projectResponse('nexus', 'NEXUS Project');
  if (q.includes('shiro') || q.includes('codemind') || q.includes('codebase')) {
    return projectResponse('shiro', 'SHIRO CodeMind Project');
  }
  if (q.includes('l-platform') || q.includes('evaluation') || q.includes('evaluator') || q.includes('l intelligence') || q === 'l') {
    return projectResponse('l-platform', 'L Intelligence Platform');
  }
  if (q.includes('resume analyzer') || q.includes('ranking')) {
    return projectResponse('resume-analyzer', 'Resume Analyzer Project');
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('github')) {
    const flagshipIds = ['argus', 'nexus', 'shiro', 'l-platform'] as const;
    const summaries = flagshipIds.map((id) => {
      const project = projects[id];
      return project.name + ': ' + project.description;
    });
    return {
      reply: 'Selected portfolio projects: ' + summaries.join(' '),
      nav: { sectionId: 'scene-projects', label: 'Selected Projects' },
    };
  }

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('rag') || q.includes('agent')) {
    return {
      reply: 'The portfolio demonstrates applied AI and retrieval, Python API development, TypeScript and Next.js, machine learning, and data analytics. Ask about a specific project to see its documented stack, implementation, and limitations.',
      nav: { sectionId: 'scene-tech', label: 'Technology Universe' },
    };
  }

  if (q.includes('experience') || q.includes('job') || q.includes('career') || q.includes('intern')) {
    const [latest, ...earlier] = profile.experience;
    const conclusion = latest.items.find((item) => item.toLowerCase().includes('concluded')) ?? '';
    const earlierSummary = earlier.map((item) =>
      item.role + ' at ' + item.org + ' (' + item.start + '–' + item.end + ')'
    ).join('; ');
    return {
      reply: [
        'Samyak’s most recent engagement was ' + latest.role + ' at ' + latest.org + ' (' + latest.start + '–' + latest.end + ').',
        conclusion,
        'Earlier experience: ' + earlierSummary + '.',
      ].filter(Boolean).join(' '),
      nav: { sectionId: 'scene-journey', label: 'Professional Journey' },
    };
  }

  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('study')) {
    return {
      reply: profile.education.map((item) =>
        item.field + ' — ' + item.school + ' (' + item.year + '). ' + item.note
      ).join(' '),
      nav: { sectionId: 'scene-journey', label: 'Education' },
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone') || q.includes('reach') || q.includes('message')) {
    return {
      reply: 'You can contact Samyak at ' + profile.email + ' or ' + profile.phone + '. Location: ' + profile.location + '.',
      nav: { sectionId: 'scene-contact', label: 'Contact & Terminal' },
    };
  }

  return {
    reply: 'I’m SAM.exe, the portfolio assistant for Samyak Anand. I can answer from the current project and profile records. Ask about a project, skills, experience, education, or contact details.',
  };
}
