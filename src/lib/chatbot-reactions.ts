export type Reaction =
  | 'greeting'
  | 'thinking'
  | 'typing'
  | 'confident'
  | 'celebrating'
  | 'confused'
  | 'gaming'
  | 'sad'
  | 'error'
  | 'idle';

export const REACTION_META: Record<Reaction, { emoji: string; label: string }> = {
  greeting: { emoji: '👋', label: 'Greeting' },
  thinking: { emoji: '🤔', label: 'Thinking' },
  typing: { emoji: '⌨️', label: 'Typing' },
  confident: { emoji: '😎', label: 'Confident' },
  celebrating: { emoji: '🎉', label: 'Celebrating' },
  confused: { emoji: '😵‍💫', label: 'Confused' },
  gaming: { emoji: '🎮', label: 'Gaming' },
  sad: { emoji: '🥺', label: 'Empathetic' },
  error: { emoji: '⚠️', label: 'Error' },
  idle: { emoji: '✨', label: 'Idle' },
};

export function getReplyReaction(reply: string): Reaction {
  const value = reply.toLowerCase();

  // Avoid treating neutral phrases such as "no issue" as an error state.
  if (/\b(error|failed|failure|unavailable|unable|cannot|can't|couldn't|something went wrong)\b/.test(value)) {
    return 'error';
  }
  if (/\b(congratulations|congrats|great job|well done|success|milestone|achievement)\b/.test(value)) {
    return 'celebrating';
  }
  if (/\b(game|gaming|controller|quest)\b/.test(value)) return 'gaming';
  if (/\b(not sure|unclear|could you clarify|what do you mean|which one)\b/.test(value)) {
    return 'confused';
  }
  if (/\b(sorry to hear|that sounds|understand how|tough|difficult)\b/.test(value)) {
    return 'sad';
  }
  return 'confident';
}
