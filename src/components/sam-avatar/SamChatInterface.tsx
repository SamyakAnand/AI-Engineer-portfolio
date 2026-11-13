'use client';

import React, { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import CharacterRenderer from './CharacterRenderer';
import MicrophoneController from './MicrophoneController';
import { SamAudioService, VoiceMode, VoiceReferenceFile, type TalkingAvatarInstance } from './AudioIntegration';
import { ExpressionController } from './ExpressionController';
import { getPortfolioNavigationTarget, type PortfolioTarget } from '@/lib/chat-navigation';
import { navigateToPortfolioSection } from '@/lib/portfolio-navigation';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  navigation?: PortfolioTarget;
  emailDraft?: string;
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi, I’m SAM.exe — Samyak Anand’s 3D digital twin. I can walk you through his neural network projects, explain AI architectures, or guide you through any section of this portfolio. Ask me anything or click the voice buttons to hear me speak!',
  timestamp: 'Just now',
};

const SUGGESTED_QUESTIONS = [
  'Walk me through ARGUS AI',
  'Which AI and LLM skills does Samyak use?',
  'How can I discuss a project?',
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function cleanText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function failureMessage(code: unknown) {
  if (code === 'not_configured') {
    return 'The AI assistant is not connected yet. You can still reach Samyak at samyak.g.anand@gmail.com.';
  }
  if (code === 'rate_limit' || code === 'upstream_busy') {
    return 'The assistant is currently busy processing requests. Please wait a moment and try again.';
  }
  return 'I could not reach the server just now. Please try again or email Samyak directly.';
}

function goToPortfolioTarget(target: PortfolioTarget) {
  if (target.backgroundTab) {
    window.dispatchEvent(new CustomEvent('portfolio:select-background-tab', { detail: target.backgroundTab }));
  }
  navigateToPortfolioSection(target.sectionId);
}

export default function SamChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [draft, setDraft] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<'listening' | 'thinking'>('listening');
  const [subtitles, setSubtitles] = useState<string>('');
  const [voiceMode, setVoiceMode] = useState<VoiceMode>('ai_tts');
  const [voiceReferences, setVoiceReferences] = useState<VoiceReferenceFile[]>([]);
  const [selectedReference, setSelectedReference] = useState<string>('');
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const avatarRef = useRef<TalkingAvatarInstance | null>(null);
  const audioServiceRef = useRef<SamAudioService | null>(null);
  const expressionCtrlRef = useRef<ExpressionController | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Audio & Expression controllers
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
    expressionCtrlRef.current = new ExpressionController();

    // Fetch voice reference files
    audioService.fetchVoiceReferences().then((refs) => {
      setVoiceReferences(refs);
      if (refs.length > 0) {
        setSelectedReference(refs[0].filename);
        audioService.setSelectedReference(refs[0].filename);
      }
    });
  }, []);

  // Sync mode changes to AudioService
  useEffect(() => {
    if (audioServiceRef.current) {
      audioServiceRef.current.setMode(voiceMode);
    }
  }, [voiceMode]);

  // Handle avatar readiness callback
  const handleAvatarReady = useCallback((avatar: TalkingAvatarInstance) => {
    avatarRef.current = avatar;
    expressionCtrlRef.current?.setAvatar(avatar);
  }, []);

  // Focus & autoscroll on message updates
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [isOpen, messages, isPending]);

  // Speak text through SAM.exe
  const speakAvatarResponse = async (text: string) => {
    if (isMuted || !avatarRef.current || !audioServiceRef.current) return;
    setSubtitles(text);
    setAvatarStatus('thinking');
    await audioServiceRef.current.speak(text, avatarRef.current);
    setAvatarStatus('listening');
  };

  // Test authentic recorded voice sample
  const handlePlayReferenceSample = async (filename?: string) => {
    if (!avatarRef.current || !audioServiceRef.current) return;
    const targetFile = filename || selectedReference || 'sam-welcome-sample.wav';
    const sampleUrl = `/voice/sam-reference/${encodeURIComponent(targetFile)}`;
    setSubtitles('Playing authentic voice recording with real-time lip sync…');
    setAvatarStatus('listening');
    await audioServiceRef.current.speak('', avatarRef.current, {
      overrideFile: sampleUrl,
    });
  };

  // Live mic mirroring: pipe user mic into avatar
  const handleLiveMicStream = async (stream: MediaStream | null) => {
    if (!avatarRef.current) return;
    if (stream) {
      setSubtitles('Microphone live mirroring active: speak to test lip-sync');
      setIsSpeaking(true);
      await avatarRef.current.attachStream(stream);
    } else {
      avatarRef.current.detachStream();
      setIsSpeaking(false);
      setSubtitles('');
    }
  };

  // Send message to LLM & speak response
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend ?? draft).trim();
    if (!content || isPending) return;

    const navigation = getPortfolioNavigationTarget(content) ?? undefined;
    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        id: makeId(),
        role: 'user',
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    setMessages(nextMessages);
    setDraft('');
    setIsPending(true);
    setAvatarStatus('thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(-10).map(({ role, content: msgContent }) => ({
            role,
            content: msgContent,
          })),
          model: 'euri-chat-fast',
        }),
      });

      const data = await response.json().catch(() => ({}));
      const reply = response.ok && typeof data.reply === 'string' ? cleanText(data.reply) : failureMessage(data.error);

      const wantsEmail = /\b(email|mail|contact|reach out|send.*message)\b/i.test(content);
      const assistantMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: reply,
        navigation,
        emailDraft: wantsEmail ? content : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...nextMessages, assistantMsg]);
      setIsPending(false);

      // Trigger avatar speech & lip-sync
      if (!isMuted) {
        speakAvatarResponse(reply);
      }

      if (navigation) {
        window.setTimeout(() => requestAnimationFrame(() => goToPortfolioTarget(navigation)), 150);
      }
    } catch {
      const errMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: 'I could not reach the assistant server just now. You can email Samyak directly at samyak.g.anand@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...nextMessages, errMsg]);
      setIsPending(false);
      setAvatarStatus('listening');
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Cinematic Chatbot Window */}
      {isOpen && (
        <section
          className="relative mb-4 w-[92vw] sm:w-[440px] h-[82vh] max-h-[720px] min-h-[520px] rounded-3xl flex flex-col overflow-hidden border border-cyan-500/25 bg-[#07111d]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.18)] transition-all animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-labelledby="sam-avatar-title"
        >
          {/* Header Bar */}
          <header className="relative z-30 flex items-center justify-between px-4 py-3 bg-[#0a1424]/90 border-b border-cyan-500/15">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/branding/sam-chatbot-icon.png"
                  alt="SAM.exe avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="sam-avatar-title" className="text-sm font-bold font-mono text-white tracking-wider">
                    SAM.exe
                  </h2>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    3D Twin
                  </span>
                </div>
                <p className="text-[10px] font-mono text-cyan-300/60">
                  {isSpeaking ? '● Speaking…' : isPending ? '● Thinking…' : '● Ready to chat'}
                </p>
              </div>
            </div>

            {/* Quick Action Header Controls */}
            <div className="flex items-center gap-1">
              {/* Voice Settings Toggle */}
              <button
                type="button"
                onClick={() => setShowVoiceSettings((prev) => !prev)}
                title="Voice configuration & source selection"
                className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
                  showVoiceSettings
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Mute Button */}
              <button
                type="button"
                onClick={() => {
                  if (!isMuted && avatarRef.current) {
                    audioServiceRef.current?.stop(avatarRef.current);
                  }
                  setIsMuted((prev) => !prev);
                }}
                title={isMuted ? 'Unmute voice' : 'Mute voice'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Close assistant"
              >
                ✕
              </button>
            </div>
          </header>

          {/* Voice Settings Overlay Panel */}
          {showVoiceSettings && (
            <div className="relative z-30 p-3 bg-[#0d1b30] border-b border-cyan-500/20 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>VOICE & SPEECH CONFIGURATION</span>
                <button
                  type="button"
                  onClick={() => setShowVoiceSettings(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Voice Mode Selector */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">Voice Source</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVoiceMode('ai_tts')}
                    className={`p-2 rounded-lg text-center border transition ${
                      voiceMode === 'ai_tts'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    AI Voice (TTS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceMode('reference')}
                    className={`p-2 rounded-lg text-center border transition ${
                      voiceMode === 'reference'
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    Voice Reference
                  </button>
                </div>
              </div>

              {/* Reference Audio Picker */}
              {voiceReferences.length > 0 && (
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Select Reference Recording
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedReference}
                      onChange={(e) => {
                        setSelectedReference(e.target.value);
                        audioServiceRef.current?.setSelectedReference(e.target.value);
                      }}
                      className="flex-1 bg-black/40 border border-white/15 rounded px-2 py-1 text-slate-300 text-xs"
                    >
                      {voiceReferences.map((ref) => (
                        <option key={ref.filename} value={ref.filename}>
                          {ref.filename}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handlePlayReferenceSample()}
                      className="px-2 py-1 rounded bg-purple-500/20 hover:bg-purple-500/40 text-purple-200 border border-purple-500/40"
                    >
                      ▶ Test
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upper Half: Interactive 3D Avatar Viewport */}
          <div className="relative w-full h-[240px] sm:h-[260px] flex-shrink-0 bg-black/60">
            <CharacterRenderer
              onAvatarReady={handleAvatarReady}
              isSpeaking={isSpeaking}
              status={avatarStatus}
              className="w-full h-full"
            />

            {/* Subtitles Overlay Bar */}
            {subtitles && (
              <div className="absolute bottom-2 inset-x-3 z-30 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-center animate-in fade-in slide-in-from-bottom-2">
                <p className="text-xs font-mono text-cyan-200 tracking-wide line-clamp-2">
                  {subtitles}
                </p>
              </div>
            )}

            {/* Quick Demo Voice Pill */}
            {!isSpeaking && !subtitles && (
              <div className="absolute bottom-2 right-2 z-20 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePlayReferenceSample()}
                  className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-cyan-950/70 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                >
                  ▶ Hear My Voice
                </button>
              </div>
            )}
          </div>

          {/* Lower Half: Conversation Stream */}
          <div
            ref={messageListRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 font-sans text-xs scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none shadow-inner'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Assistant Navigation Action */}
                  {msg.role === 'assistant' && msg.navigation && (
                    <button
                      type="button"
                      onClick={() => goToPortfolioTarget(msg.navigation!)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-mono text-cyan-300 transition hover:bg-cyan-500/25"
                    >
                      <span>Go to {msg.navigation.label}</span>
                      <span>↗</span>
                    </button>
                  )}

                  {/* Assistant Email Draft Action */}
                  {msg.role === 'assistant' && msg.emailDraft && (
                    <a
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-[11px] font-mono text-purple-300 transition hover:bg-purple-500/25"
                      href={`mailto:samyak.g.anand@gmail.com?subject=${encodeURIComponent(
                        'Portfolio inquiry'
                      )}&body=${encodeURIComponent(
                        `Hi Samyak,\n\nI spoke with SAM.exe about:\n${msg.emailDraft}\n\n`
                      )}`}
                    >
                      <span>Draft email to Samyak</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
                <span className="text-[9px] font-mono text-white/30 px-1 mt-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isPending && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs py-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Computing neural response…</span>
              </div>
            )}
          </div>

          {/* Suggested Quick Questions */}
          {messages.length === 1 && !isPending && (
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="rounded-full border border-cyan-500/20 bg-white/5 px-2.5 py-1 text-[10px] text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-400/40"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Bottom Chat Input Form & Microphone */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-[#0a1424] border-t border-cyan-500/15 flex items-center gap-2"
          >
            {/* Microphone Controller */}
            <MicrophoneController
              onTranscript={(transcript) => {
                setDraft(transcript);
                handleSendMessage(transcript);
              }}
              onLiveStream={handleLiveMicStream}
              isProcessing={isPending}
            />

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask SAM.exe about projects, code, skills…"
              disabled={isPending}
              maxLength={1000}
              className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400/60 rounded-full px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none transition"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!draft.trim() || isPending}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </section>
      )}

      {/* Floating Minimized Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close SAM.exe' : 'Open SAM.exe 3D avatar assistant'}
        className="group relative flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-cyan-400/40 bg-[#07111d]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-105"
      >
        {/* Glowing Avatar Thumbnail Badge */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_12px_#22d3ee]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/sam-chatbot-icon.png"
            alt="SAM.exe"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-full" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-mono font-bold tracking-wider text-white group-hover:text-cyan-300 transition">
            {isOpen ? 'Close SAM.exe' : 'Talk with SAM.exe'}
          </span>
          <span className="text-[10px] font-mono text-cyan-400/70">
            {isOpen ? 'Minimize window' : '3D Avatar · Voice Lip-Sync'}
          </span>
        </div>

        {/* Ambient Ring Pulse */}
        <span className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-pulse pointer-events-none" />
      </button>
    </div>
  );
}
