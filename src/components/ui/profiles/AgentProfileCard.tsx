'use client';

import { useState } from 'react';

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  tagline: string;
  accent: string;
  icon: string;
  introduction: string;
  expertise: string[];
  responsibilities: string[];
  projects: string[];
  clickLabel: string;
}

const profileConfigs: AgentProfile[] = [
  {
    id: 'ai-architect',
    name: 'AI Architect',
    role: 'System design & infrastructure',
    tagline: 'Building the platforms that run intelligent systems',
    accent: '#7c3aed',
    icon: '+',
    introduction: 'Designing LLM-driven architectures and data pipelines that scale reliably.',
    expertise: ['LLM orchestration', 'Data pipelines', 'Cloud infrastructure', 'System design'],
    responsibilities: ['System architecture', 'Pipeline design', 'Performance optimization', 'Team mentorship'],
    projects: ['NEXUS - autonomous data analysis', 'ARGUS AI - evidence-oriented analytics'],
    clickLabel: 'AI Architect details',
  },
  {
    id: 'researcher',
    name: 'Researcher',
    role: 'R&D & applied science',
    tagline: 'Turning academic rigor into production-ready algorithms.',
    accent: '#6366f1',
    icon: 'Star',
    introduction: 'Applying statistical rigor and experimental design to build verifiable ML systems.',
    expertise: ['Statistical modeling', 'Experiment design', 'NLP research', 'ML verification'],
    responsibilities: ['Research methodology', 'Model evaluation', 'Paper reproduction', 'Benchmarking'],
    projects: ['ARGUS AI - evidence verification', 'Resume Analyzer - NLP scoring'],
    clickLabel: 'Researcher details',
  },
  {
    id: 'llm-engineer',
    name: 'LLM Engineer',
    role: 'LLM applications & tooling',
    tagline: 'Shipping production LLM applications with real-world impact.',
    accent: '#3b82f6',
    icon: 'Layers',
    introduction: 'Building LLM-powered products from prototype to production with robust evaluation.',
    expertise: ['LLM APIs', 'RAG pipelines', 'Agent frameworks', 'LLM evaluation'],
    responsibilities: ['Product engineering', 'LLM integration', 'Prompt engineering', 'Evaluation setup'],
    projects: ['StudyCopilot - AI study assistant', 'NEXUS - LLM-driven analysis'],
    clickLabel: 'LLM Engineer details',
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    role: 'Analytics & modeling',
    tagline: 'Extracting insight from data through rigorous statistical analysis.',
    accent: '#22d3ee',
    icon: 'Chart',
    introduction: 'Specializing in NLP, embeddings, and data-driven decision systems.',
    expertise: ['NLP', 'Embeddings', 'Statistical analysis', 'Data visualization'],
    responsibilities: ['Data analysis', 'Model building', 'Visualization', 'Insight generation'],
    projects: ['Resume Analyzer - NLP ranking', 'ARGUS AI - analytics platform'],
    clickLabel: 'Data Scientist details',
  },
  {
    id: 'mlops',
    name: 'MLOps',
    role: 'Deployment & reliability',
    tagline: 'Making ML systems reliable, reproducible, and production-ready.',
    accent: '#f59e0b',
    icon: 'Gear',
    introduction: 'Operationalizing ML workflows with experiment tracking, CI/CD, and monitoring.',
    expertise: ['MLflow', 'Docker', 'Kubernetes', 'CI/CD'],
    responsibilities: ['Pipeline deployment', 'Monitoring', 'Reproducibility', 'CI/CD setup'],
    projects: ['NEXUS - reproducible pipeline', 'Resume Analyzer - deployment'],
    clickLabel: 'MLOps details',
  },
  {
    id: 'evaluator',
    name: 'Evaluator',
    role: 'Quality & evaluation',
    tagline: 'Rigorously assessing model performance and output quality.',
    accent: '#fbbf24',
    icon: 'Diamond',
    introduction: 'Building evaluation frameworks that measure what actually matters.',
    expertise: ['Model evaluation', 'Benchmarking', 'LLM evaluation', 'Quality assurance'],
    responsibilities: ['Evaluation design', 'Benchmarking', 'Quality metrics', 'A/B testing'],
    projects: ['ARGUS AI - evidence verification', 'StudyCopilot - quality testing'],
    clickLabel: 'Evaluator details',
  },
  {
    id: 'ai-designer',
    name: 'AI Designer',
    role: 'Interaction design & UX',
    tagline: 'Designing meaningful experiences for AI-powered products.',
    accent: '#a855f7',
    icon: 'Circle',
    introduction: 'Bridging the gap between AI capability and human needs through thoughtful design.',
    expertise: ['UX design', 'AI interaction patterns', 'Design systems', 'Prototyping'],
    responsibilities: ['User research', 'Interface design', 'AI UX patterns', 'Accessibility'],
    projects: ['StudyCopilot - user experience', 'NEXUS - interface design'],
    clickLabel: 'AI Designer details',
  },
  {
    id: 'alignment-safety',
    name: 'Alignment & Safety',
    role: 'Responsible AI & evaluation',
    tagline: 'Ensuring AI systems are safe, aligned, and trustworthy.',
    accent: '#dc2626',
    icon: 'Shield',
    introduction: 'Building safety guardrails and alignment practices into every system.',
    expertise: ['AI safety', 'Alignment', 'Red-teaming', 'Responsible AI'],
    responsibilities: ['Safety review', 'Risk assessment', 'Guardrail design', 'Ethical AI'],
    projects: ['ARGUS AI - evidence verification', 'NEXUS - safety evaluation'],
    clickLabel: 'Alignment & Safety details',
  },
  {
    id: 'nexus-runtime',
    name: 'Nexus Runtime',
    role: 'Integration & orchestration',
    tagline: 'Connecting AI systems into cohesive, working platforms.',
    accent: '#f97316',
    icon: 'Square',
    introduction: 'Orchestrating complex AI workflows into reliable, integrated systems.',
    expertise: ['System integration', 'API design', 'Orchestration', 'Microservices'],
    responsibilities: ['Integration', 'API development', 'Workflow orchestration', 'Reliability engineering'],
    projects: ['NEXUS - autonomous pipeline', 'ARGUS AI - integration layer'],
    clickLabel: 'Nexus Runtime details',
  },
  {
    id: 'system-auditor',
    name: 'System Auditor',
    role: 'Quality assurance & review',
    tagline: 'Independently reviewing systems for quality, security, and correctness.',
    accent: '#7c3aed',
    icon: 'Check',
    introduction: 'Independently reviewing systems for quality, security, and correctness.',
    expertise: ['Code review', 'Quality assurance', 'Security auditing', 'Documentation'],
    responsibilities: ['Code review', 'QA testing', 'Security audit', 'Documentation'],
    projects: ['Resume Analyzer - review', 'StudyCopilot - QA'],
    clickLabel: 'System Auditor details',
  },
];

const defaultConfig = profileConfigs[0];

function getConfig(id: string): AgentProfile {
  return profileConfigs.find((p) => p.id === id) || defaultConfig;
}

export function AgentProfileCard({
  profile,
  isExpanded,
  onToggle,
}: {
  profile: AgentProfile;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isOpen, setIsOpen] = useState(isExpanded);
  const profileData = getConfig(profile.id);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    onToggle();
  };

  return (
    <div
      className="profile-card group relative"
      style={{
        borderTop: `2px solid ${profileData.accent}`,
        background: isOpen ? `rgba(124,58,237,.04)` : 'transparent',
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`profile-panel-${profileData.id}`}
        className={`w-full flex items-center justify-between p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg ${
          isOpen ? 'bg-[rgba(124,58,237,.06)]' : 'bg-[rgba(124,58,237,.03)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{
              background: `${profileData.accent}`,
              boxShadow: `0 0 12px ${profileData.accent}Glow`,
            }}
          >
            {profileData.icon}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{profileData.name}</h4>
            <p className="text-xs text-[#929095]">{profileData.role}</p>
          </div>
        </div>
        <span
          className="text-lg transition-transform duration-300 group-hover:rotate-45"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          {'>'}
        </span>
      </button>

      {isOpen && (
        <div
          id={`profile-panel-${profileData.id}`}
          className="pb-4 pl-4 border-l border-[rgba(124,58,237,.3)] animate-[fadeIn_0.3s_ease-out]"
        >
          <p
            className="text-xs font-medium text-[#a78bfa] mb-1"
            style={{ letterSpacing: '.08em' }}
          >
            {profileData.role}
          </p>
          <p className="text-sm text-[#e8e8f0] leading-relaxed mb-3">
            {profileData.introduction}
          </p>

          <div className="grid gap-2 mb-3">
            <p className="text-xs font-medium text-[#929095] uppercase tracking-wider">
              Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {profileData.expertise.map(skill => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{
                    background: `rgba(124,58,237,.12)`,
                    color: 'var(--text-dim)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-[#929095] uppercase tracking-wider">
              Responsibilities
            </p>
            <ul className="list-disc list-inside text-sm text-[#929095] space-y-0.5">
              {profileData.responsibilities.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {profileData.projects.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-[#929095] uppercase tracking-wider mb-2">
                Related work
              </p>
              <div className="flex flex-wrap gap-2">
                {profileData.projects.map(proj => (
                  <span
                    key={proj}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: `rgba(124,58,237,.08)`,
                      color: 'var(--text-dim)',
                    }}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AgentProfileGrid({
  columns = 2,
}: {
  columns?: 2 | 3;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {profileConfigs.map((profile) => (
        <AgentProfileCard
          key={profile.id}
          profile={profile}
          isExpanded={false}
          onToggle={() => {}}
        />
      ))}
    </div>
  );
}
