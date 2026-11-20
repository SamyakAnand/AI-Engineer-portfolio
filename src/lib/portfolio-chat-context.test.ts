import { describe, expect, it } from 'vitest';
import { buildPortfolioSystemInstruction } from './portfolio-chat-context';

describe('portfolio chat context selection', () => {
  it('includes the requested flagship project without injecting the full project catalogue', () => {
    const context = buildPortfolioSystemInstruction('Explain ARGUS AI');
    expect(context).toContain('ARGUS AI');
    expect(context.toLowerCase()).toContain('citation');
    expect(context).not.toContain('Blinkit Sales & Inventory Dashboard');
  });

  it('uses a small flagship fallback context for broad questions', () => {
    const context = buildPortfolioSystemInstruction('Tell me about the portfolio');
    expect(context).toContain('ARGUS AI');
    expect(context.length).toBeLessThan(12000);
  });
});
