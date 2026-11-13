'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { TalkingAvatarInstance } from '@/components/sam-avatar/AudioIntegration';
import { SamAudioService } from '@/components/sam-avatar/AudioIntegration';

const DynamicTalkingAvatar = dynamic(
  () => import('@/components/sam-avatar/TalkingAvatarWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#07111d]">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin" />
        </div>
        <p className="mt-4 font-mono text-xs text-cyan-300 tracking-widest uppercase animate-pulse">
          Initializing SAM.exe 3D Studio…
        </p>
      </div>
    ),
  }
);

const PRESET_PHRASES = [
  'Hello! I am SAM.exe, Samyak Anand’s 3D digital twin. Welcome to my interactive studio.',
  'I am built with full Oculus viseme lip sync, real-time audio detection, and neural responses.',
  'You can speak into your microphone, and I will mirror your speech in real time.',
];

export default function AvatarStudioPage() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<'listening' | 'thinking'>('listening');
  const [customText, setCustomText] = useState(PRESET_PHRASES[0]);
  const [subtitles, setSubtitles] = useState('');
  const [isMicSyncing, setIsMicSyncing] = useState(false);
  const [showIdentityReference, setShowIdentityReference] = useState(false);

  const avatarRef = useRef<TalkingAvatarInstance | null>(null);
  const audioServiceRef = useRef<SamAudioService | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const audioService = new SamAudioService({
      onStatusChange: (speaking) => {
        setIsSpeaking(speaking);
        if (!speaking) {
          setSubtitles('');
        }
      },
    });
    audioServiceRef.current = audioService;
  }, []);

  const handleAvatarReady = useCallback((avatar: TalkingAvatarInstance) => {
    avatarRef.current = avatar;
  }, []);

  // Play private authentic voice sample
  const handlePlayVoiceSample = async () => {
    if (!avatarRef.current || !audioServiceRef.current) return;
    setSubtitles('Playing authentic voice recording with real-time Oculus viseme lip sync…');
    setAvatarStatus('listening');
    await audioServiceRef.current.speak('', avatarRef.current, {
      overrideFile: '/voice/sam-reference/sam-welcome-sample.wav',
    });
  };

  // Speak custom text
  const handleSpeakText = async (text: string) => {
    if (!avatarRef.current || !audioServiceRef.current || !text.trim()) return;
    setSubtitles(text);
    setAvatarStatus('thinking');
    await audioServiceRef.current.speak(text, avatarRef.current);
    setAvatarStatus('listening');
  };

  // Toggle Live Mic Mirroring
  const handleToggleMic = async () => {
    if (!avatarRef.current) return;

    if (isMicSyncing) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      avatarRef.current.detachStream();
      setIsMicSyncing(false);
      setIsSpeaking(false);
      setSubtitles('');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        micStreamRef.current = stream;
        setIsMicSyncing(true);
        setIsSpeaking(true);
        setSubtitles('Live Microphone Active: Speak and SAM.exe will mirror your mouth shapes!');
        await avatarRef.current.attachStream(stream);
      } catch (err) {
        console.error('[Mic Sync error]', err);
        alert('Microphone permission required for live mirroring.');
      }
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050b14] text-white flex flex-col">
      {/* Top Studio Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#07111d]/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 transition"
          >
            ← Return to Portfolio
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
            <h1 className="font-mono text-base font-bold tracking-wider text-white">
              SAM.exe <span className="text-cyan-400 font-normal text-xs">/ 3D AVATAR STUDIO</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowIdentityReference((v) => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
              showIdentityReference
                ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/25'
            }`}
          >
            {showIdentityReference ? 'Hide Photo Reference' : 'Compare with My Photo'}
          </button>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left/Center: 3D Character Viewport */}
        <div className="relative flex-1 h-[55vh] md:h-full bg-black/40 flex items-center justify-center overflow-hidden">
          {/* Cyberpunk HUD Frame */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[11px] text-cyan-400/80 space-y-1">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ENGINE: TALKING AVATAR V0.3.0
            </p>
            <p className="text-white/50">RIG: OCULUS 15 VISEMES + ARKIT 9 BLENDSHAPES</p>
            <p className="text-white/50">TEXTURES: CUSTOM CYBERPUNK TECHWEAR + TILAK</p>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none font-mono text-[11px] text-right text-purple-300/80">
            <p>STATUS: {isSpeaking ? 'SPEAKING' : avatarStatus.toUpperCase()}</p>
            <p className="text-white/50">AUDIO: ZERO-LATENCY ON-DEVICE</p>
          </div>

          {/* 3D Model Canvas */}
          <DynamicTalkingAvatar
            onAvatarReady={handleAvatarReady}
            isSpeaking={isSpeaking}
            status={avatarStatus}
            className="w-full h-full"
          />

          {/* Live Subtitles Banner */}
          {subtitles && (
            <div className="absolute bottom-6 inset-x-8 md:inset-x-32 z-30 px-6 py-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-cyan-400/40 text-center shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-in fade-in slide-in-from-bottom-3">
              <p className="font-mono text-sm text-cyan-200 tracking-wide font-medium">
                {subtitles}
              </p>
            </div>
          )}

          {/* Identity Photo Comparison Popup */}
          {showIdentityReference && (
            <div className="absolute top-16 right-4 z-40 w-64 rounded-2xl overflow-hidden border border-purple-500/40 bg-[#07111d]/95 backdrop-blur-xl shadow-2xl p-3 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                  Identity Reference
                </span>
                <button
                  type="button"
                  onClick={() => setShowIdentityReference(false)}
                  className="text-white/50 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="mt-2.5 rounded-xl overflow-hidden border border-white/10 aspect-[2/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/branding/sam-avatar-preview.png"
                  alt="Original identity"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-[10px] font-mono text-white/60 text-center">
                Hair, eyebrows, beard line & tilak mapped to SAM.exe
              </p>
            </div>
          )}
        </div>

        {/* Right Studio Control Deck */}
        <aside className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 bg-[#07111d]/90 border-t md:border-t-0 md:border-l border-cyan-500/20 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                Interactive Lip-Sync Deck
              </span>
              <h2 className="text-lg font-bold font-mono text-white mt-1">Live Audio Testing</h2>
              <p className="text-xs text-slate-400 mt-1">
                Test authentic voice playback, text-to-speech, or your microphone with real-time viseme animations.
              </p>
            </div>

            {/* Quick Test Actions */}
            <div className="space-y-3">
              {/* Button 1: Authentic Voice */}
              <button
                type="button"
                onClick={handlePlayVoiceSample}
                disabled={isSpeaking}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 transition shadow-[0_0_20px_rgba(168,85,247,0.15)] disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">
                    ▶
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold text-white">Play Authentic Voice</p>
                    <p className="text-[10px] text-purple-300/70 font-mono">
                      sample: sam-welcome-sample.wav
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-400">TEST ↗</span>
              </button>

              {/* Button 2: Live Mic Mirror */}
              <button
                type="button"
                onClick={handleToggleMic}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition shadow-lg ${
                  isMicSyncing
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                    : 'border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      isMicSyncing ? 'bg-emerald-500/30 text-emerald-300 animate-pulse' : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    🎙
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold text-white">
                      {isMicSyncing ? 'Mic Mirror Active (Speaking)' : 'Live Mic Lip-Sync'}
                    </p>
                    <p className="text-[10px] font-mono text-cyan-300/70">
                      {isMicSyncing ? 'Click to stop' : 'Speak into your mic to test'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono">
                  {isMicSyncing ? '● LIVE' : 'SYNC ↗'}
                </span>
              </button>
            </div>

            {/* Custom Speech Input */}
            <div className="space-y-2.5 pt-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Custom Speech Synthesis
              </label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/60 transition resize-none font-sans"
                placeholder="Type anything for SAM.exe to speak…"
              />

              <div className="flex flex-wrap gap-1.5">
                {PRESET_PHRASES.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCustomText(phrase);
                      handleSpeakText(phrase);
                    }}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-200 transition"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSpeakText(customText)}
                disabled={isSpeaking || !customText.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-mono text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-95 transition disabled:opacity-40"
              >
                Speak Custom Text
              </button>
            </div>

            {/* Expression & Mood Controls */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Expression States
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAvatarStatus('listening');
                    avatarRef.current?.setStatus('listening');
                  }}
                  className={`p-2 rounded-xl text-xs font-mono border transition ${
                    avatarStatus === 'listening'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  Listening
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAvatarStatus('thinking');
                    avatarRef.current?.setStatus('thinking');
                  }}
                  className={`p-2 rounded-xl text-xs font-mono border transition ${
                    avatarStatus === 'thinking'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  Thinking
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-white/10 text-[10px] font-mono text-white/40 text-center">
            SAM.exe Digital Twin · Powered by Talking Avatar & Three.js
          </div>
        </aside>
      </div>
    </main>
  );
}
