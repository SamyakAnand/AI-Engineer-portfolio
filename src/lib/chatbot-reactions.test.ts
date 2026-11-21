import { describe, expect, it } from 'vitest';
import { getReactionAssetPath, getReplyReaction, REACTION_META, type Reaction } from './chatbot-reactions';

describe('SAM.exe reply reactions', () => {
  it('does not classify a neutral mention of an issue as an error', () => {
    expect(getReplyReaction('No issue — everything is working as expected.')).toBe('confident');
  });

  it('marks explicit failures as errors', () => {
    expect(getReplyReaction('The request failed because the service is unavailable.')).toBe('error');
  });

  it('recognizes celebratory replies', () => {
    expect(getReplyReaction('Congratulations on the successful deployment!')).toBe('celebrating');
  });

  it('recognizes clarification requests', () => {
    expect(getReplyReaction('Could you clarify which one you mean?')).toBe('confused');
  });

  it('recognizes empathetic replies', () => {
    expect(getReplyReaction('Sorry to hear that; it sounds difficult.')).toBe('sad');
  });

  it('recognizes gaming replies without matching ordinary uses of "play"', () => {
    expect(getReplyReaction('Let us play a game with the controller.')).toBe('gaming');
    expect(getReplyReaction('This tool can play an important role in the workflow.')).toBe('confident');
  });
});


describe('SAM.exe reaction GIF assets', () => {
  it('maps all ten reaction states to their own animated GIFs', () => {
    const reactions = Object.keys(REACTION_META) as Reaction[];
    expect(reactions).toHaveLength(10);
    for (const reaction of reactions) {
      expect(getReactionAssetPath(reaction)).toBe(`/portfolio/chatbot-reactions/${reaction}.gif`);
    }
  });
});
