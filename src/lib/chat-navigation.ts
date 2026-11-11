export type PortfolioTarget = {
  sectionId: string;
  label: string;
  backgroundTab?: 'experience' | 'education';
};

const intents: Array<{ pattern: RegExp; target: PortfolioTarget }> = [
  { pattern: /\b(skill|skills|technology|technologies|framework|react|llm|rag|tool|stack)\b/i, target: { sectionId: 'scene-tech', label: 'Skills' } },
  { pattern: /\b(service|services|offer|offering)\b/i, target: { sectionId: 'scene-services', label: 'Services' } },
  { pattern: /\b(education|degree|college|certification|certifications|study|studied|school|academic)\b/i, target: { sectionId: 'scene-journey', label: 'Education', backgroundTab: 'education' } },
  { pattern: /\b(experience|work history|employment|employer|career)\b/i, target: { sectionId: 'scene-journey', label: 'Experience', backgroundTab: 'experience' } },
  { pattern: /\b(project|projects|repository|repositories|github)\b/i, target: { sectionId: 'scene-projects', label: 'Projects' } },
  { pattern: /\b(contact|email|hire|reach out|linkedin)\b/i, target: { sectionId: 'scene-contact', label: 'Contact' } },
  { pattern: /\b(about|profile|who is samyak)\b/i, target: { sectionId: 'scene-identity', label: 'About' } },
];

export function getPortfolioNavigationTarget(query: string): PortfolioTarget | null {
  return intents.find(intent => intent.pattern.test(query))?.target ?? null;
}
