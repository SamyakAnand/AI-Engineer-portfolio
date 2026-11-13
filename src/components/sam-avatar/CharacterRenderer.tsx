'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { TalkingAvatarInstance } from './AudioIntegration';

// Dynamically import TalkingAvatarWrapper with SSR disabled to prevent Node WebGL/DOM errors
const DynamicAvatar = dynamic(() => import('./TalkingAvatarWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#07111d] min-h-[260px]">
      <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
      <span className="mt-3 text-xs font-mono text-cyan-400/80 tracking-widest">LOADING AVATAR ENGINE…</span>
    </div>
  ),
});

interface CharacterRendererProps {
  onAvatarReady?: (avatar: TalkingAvatarInstance) => void;
  className?: string;
  isSpeaking?: boolean;
  status?: 'listening' | 'thinking';
}

export default function CharacterRenderer({
  onAvatarReady,
  className = '',
  isSpeaking = false,
  status = 'listening',
}: CharacterRendererProps) {
  return (
    <div className={`w-full h-full overflow-hidden rounded-2xl border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.15)] ${className}`}>
      <DynamicAvatar
        onAvatarReady={onAvatarReady}
        isSpeaking={isSpeaking}
        status={status}
        className="w-full h-full"
      />
    </div>
  );
}
