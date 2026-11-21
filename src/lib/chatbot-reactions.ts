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

export const REACTION_META: Record<Reaction, { label: string }> = {
  greeting: { label: 'Greeting' },
  thinking: { label: 'Thinking' },
  typing: { label: 'Typing' },
  confident: { label: 'Confident' },
  celebrating: { label: 'Celebrating' },
  confused: { label: 'Confused' },
  gaming: { label: 'Gaming' },
  sad: { label: 'Empathetic' },
  error: { label: 'Error' },
  idle: { label: 'Idle' },
};

export const REACTION_ASSET_PATHS: Record<Reaction, string> = {
  greeting: '/portfolio/chatbot-reactions/greeting.gif',
  thinking: '/portfolio/chatbot-reactions/thinking.gif',
  typing: '/portfolio/chatbot-reactions/typing.gif',
  confident: '/portfolio/chatbot-reactions/confident.gif',
  celebrating: '/portfolio/chatbot-reactions/celebrating.gif',
  confused: '/portfolio/chatbot-reactions/confused.gif',
  gaming: '/portfolio/chatbot-reactions/gaming.gif',
  sad: '/portfolio/chatbot-reactions/sad.gif',
  error: '/portfolio/chatbot-reactions/error.gif',
  idle: '/portfolio/chatbot-reactions/idle.gif',
};

export function getReactionAssetPath(reaction: Reaction): string {
  return REACTION_ASSET_PATHS[reaction];
}

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
