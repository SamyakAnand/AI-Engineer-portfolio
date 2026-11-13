/**
 * ExpressionController.ts
 *
 * Controls SAM.exe facial expressions, mood states, and reactive animations.
 * Maps high-level conversational sentiment to TalkingAvatar states and morph targets.
 */

import { TalkingAvatarInstance } from './AudioIntegration';

export type ExpressionMood = 'idle' | 'listening' | 'thinking' | 'speaking' | 'pleased' | 'curious';

export class ExpressionController {
  private avatar: TalkingAvatarInstance | null = null;
  private currentMood: ExpressionMood = 'idle';

  constructor(avatar?: TalkingAvatarInstance | null) {
    if (avatar) {
      this.avatar = avatar;
    }
  }

  public setAvatar(avatar: TalkingAvatarInstance | null) {
    this.avatar = avatar;
  }

  public setMood(mood: ExpressionMood) {
    this.currentMood = mood;
    if (!this.avatar) return;

    switch (mood) {
      case 'thinking':
        this.avatar.setStatus('thinking');
        break;

      case 'listening':
      case 'idle':
        this.avatar.setStatus('listening');
        break;

      case 'pleased':
      case 'curious':
      case 'speaking':
        // avatar internally manages brow/blink dynamics during speech
        this.avatar.setStatus('listening');
        break;
    }
  }

  public getMood(): ExpressionMood {
    return this.currentMood;
  }

  /**
   * Evaluates message text and returns an appropriate mood reaction.
   */
  public analyzeSentiment(text: string): ExpressionMood {
    const lower = text.toLowerCase();

    if (/\b(thanks|thank you|awesome|great|amazing|love|cool|perfect|congrats)\b/.test(lower)) {
      return 'pleased';
    }
    if (/\b(how|what|why|who|where|explain|architecture|tell me|deep dive)\b/.test(lower)) {
      return 'curious';
    }
    if (/\b(wait|calculating|processing|analyzing)\b/.test(lower)) {
      return 'thinking';
    }
    return 'listening';
  }
}
