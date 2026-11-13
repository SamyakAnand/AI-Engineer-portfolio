'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { TalkingAvatarInstance } from './AudioIntegration';

interface TalkingAvatarWrapperProps {
  onAvatarReady?: (avatar: TalkingAvatarInstance) => void;
  avatarUrl?: string;
  modelUrl?: string;
  className?: string;
  isSpeaking?: boolean;
  status?: 'listening' | 'thinking';
}

export default function TalkingAvatarWrapper({
  onAvatarReady,
  avatarUrl = '/models/sam-avatar.glb',
  modelUrl = '/models/viseme-model.bin',
  className = '',
  isSpeaking = false,
  status = 'listening',
}: TalkingAvatarWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarInstanceRef = useRef<TalkingAvatarInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isDisposed = false;
    let avatar: any = null;

    async function initAvatar() {
      if (!containerRef.current) return;
      setIsLoading(true);
      setLoadError(null);

      try {
        // @ts-expect-error dynamic optional package
        const { TalkingAvatar } = await import('@interviewflowai/talking-avatar');
        if (isDisposed || !containerRef.current) return;

        avatar = new TalkingAvatar({
          container: containerRef.current,
          avatarUrl,
          modelUrl,
          streamDelayMs: 150,
          onError: (err: Error) => {
            console.warn('[TalkingAvatar warning]', err);
          },
        });

        await avatar.ready;

        if (isDisposed) {
          avatar.dispose();
          return;
        }

        avatarInstanceRef.current = avatar;
        setIsLoading(false);
        onAvatarReady?.(avatar);
      } catch (err: unknown) {
        if (!isDisposed) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error('[TalkingAvatar] Failed to load avatar:', msg);
          setLoadError('Failed to load 3D avatar');
          setIsLoading(false);
        }
      }
    }

    initAvatar();

    return () => {
      isDisposed = true;
      if (avatar) {
        try {
          avatar.dispose();
        } catch {
          // ignore
        }
      }
      avatarInstanceRef.current = null;
    };
  }, [avatarUrl, modelUrl, onAvatarReady]);

  // Synchronize status updates
  useEffect(() => {
    if (avatarInstanceRef.current && !isLoading) {
      try {
        avatarInstanceRef.current.setStatus(status);
      } catch {
        // ignore
      }
    }
  }, [status, isLoading]);

  return (
    <div
      className={`relative overflow-hidden select-none bg-gradient-to-b from-[#0a1120] via-[#090d19] to-[#040711] ${className}`}
    >
      {/* Cyberpunk ambient lighting behind avatar */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft violet key glow */}
        <div className="absolute top-1/4 -left-12 w-48 h-48 rounded-full bg-purple-600/15 blur-3xl" />
        {/* Cyan rim glow */}
        <div className="absolute top-1/3 -right-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"
        />
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Cyberpunk HUD Frame & Crosshairs */}
      <div className="absolute inset-0 z-20 pointer-events-none p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSpeaking
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                  : status === 'thinking'
                  ? 'bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse'
                  : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
              }`}
            />
            {isSpeaking ? 'SPEAKING' : status === 'thinking' ? 'NEURAL COMPUTE' : 'STANDBY'}
          </span>
          <span className="text-white/40">SAM.exe v2.4</span>
        </div>

        {/* Bottom edge audio activity waves */}
        {isSpeaking && (
          <div className="flex items-end justify-center gap-1 h-3 mb-1">
            <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_100ms] h-full" />
            <span className="w-1 bg-purple-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_200ms] h-4/5" />
            <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_150ms] h-full" />
            <span className="w-1 bg-sky-400 rounded-full animate-[bounce_0.4s_ease-in-out_infinite_250ms] h-3/5" />
            <span className="w-1 bg-purple-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_300ms] h-full" />
          </div>
        )}
      </div>

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#07111d]/90 backdrop-blur-sm">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin" />
            <span className="text-cyan-400 text-xs font-mono font-bold tracking-tighter">SAM</span>
          </div>
          <p className="mt-3 text-xs font-mono text-cyan-200/70 tracking-wider animate-pulse">
            INITIALIZING 3D TWIN…
          </p>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#07111d]/95 p-4 text-center">
          <p className="text-rose-400 text-xs font-mono mb-2">{loadError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-[11px] font-mono px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
