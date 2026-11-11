import { describe, expect, it } from 'vitest';
import { getPortfolioNavigationTarget } from './chat-navigation';

describe('portfolio chat navigation intents', () => {
  it('routes skill questions to skills', () => {
    expect(getPortfolioNavigationTarget('What AI and React skills does Samyak have?')?.sectionId).toBe('scene-tech');
  });
  it('selects the education tab for education questions', () => {
    expect(getPortfolioNavigationTarget('Where did Samyak study?')).toMatchObject({ sectionId: 'scene-journey', backgroundTab: 'education' });
  });
  it('routes services, projects, and hiring questions to their sections', () => {
    expect(getPortfolioNavigationTarget('What services are available?')?.sectionId).toBe('scene-services');
    expect(getPortfolioNavigationTarget('Show me projects')?.sectionId).toBe('scene-projects');
    expect(getPortfolioNavigationTarget('How can I hire Samyak?')?.sectionId).toBe('scene-contact');
  });
  it('does not navigate on general questions', () => {
    expect(getPortfolioNavigationTarget('Tell me something interesting')).toBeNull();
  });
});
