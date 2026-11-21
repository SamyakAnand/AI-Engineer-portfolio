import { describe, expect, it } from 'vitest';
import { generateLocalKnowledgeResponse } from './chatbot-fallback';

describe('SAM.exe local knowledge fallback', () => {
  it('reports the latest engagement as concluded rather than current', () => {
    const reply = generateLocalKnowledgeResponse('Tell me about Samyak’s experience').reply;
    expect(reply).toContain('Data Science Trainer at Softgrowth Infotech');
    expect(reply).toContain('concluded 9 November 2026');
    expect(reply).not.toMatch(/\bcurrently\b/i);
  });

  it('uses ARGUS implementation boundaries instead of claiming hallucinations are eliminated', () => {
    const reply = generateLocalKnowledgeResponse('Explain ARGUS AI').reply;
    expect(reply).toContain('lexical retrieval');
    expect(reply).toContain('citation checks validate referenced passage IDs');
    expect(reply).not.toContain('eliminating hallucinations');
  });

  it('describes NEXUS as deterministic and discloses unimplemented LLM synthesis', () => {
    const reply = generateLocalKnowledgeResponse('What is NEXUS?').reply;
    expect(reply).toContain('deterministic workflow');
    expect(reply).toContain('LLM synthesis');
    expect(reply).toContain('not implemented');
  });

  it('uses the project record for SHIRO and discloses public-repository scope', () => {
    const reply = generateLocalKnowledgeResponse('What is SHIRO CodeMind?').reply;
    expect(reply).toContain('public GitHub repositories');
    expect(reply).toContain('Private GitHub source access');
  });

  it('keeps L platform maturity and provider limitations explicit', () => {
    const reply = generateLocalKnowledgeResponse('Explain L Intelligence Platform').reply;
    expect(reply).toContain('early-stage');
    expect(reply).toContain('Provider-backed benchmarking is not yet available');
  });

  it('returns a bounded, non-claiming answer for unknown questions', () => {
    const reply = generateLocalKnowledgeResponse('Tell me a random fact').reply;
    expect(reply).toContain('current project and profile records');
    expect(reply).not.toContain('trained on verified');
  });
});
