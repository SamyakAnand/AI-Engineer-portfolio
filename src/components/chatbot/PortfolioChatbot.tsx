'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getPortfolioNavigationTarget, type PortfolioTarget } from '@/lib/chat-navigation';
import { navigateToPortfolioSection } from '@/lib/portfolio-navigation';
import { readTextStream } from '@/lib/read-text-stream';
import { getReplyReaction, REACTION_META, type Reaction } from '@/lib/chatbot-reactions';
import { generateLocalKnowledgeResponse } from '@/lib/chatbot-fallback';

const Chatbot3DBackground = dynamic(
  () => import('@/components/3d/Chatbot3DBackground'),
  { ssr: false }
);

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  navigation?: PortfolioTarget;
  emailDraft?: string;
};

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi, I’m SAM.exe — Samyak Anand’s AI intelligence assistant. I can walk you through his flagship projects (ARGUS AI, NEXUS, SHIRO CodeMind, L Intelligence Platform), his technical stack, or connect you directly with him. What would you like to explore?',
};

function ReactionAvatar({ reaction, className }: { reaction: Reaction; className: string }) {
  const meta = REACTION_META[reaction];
  return (
    <div className={'relative inline-flex flex-none overflow-visible ' + className} role="img" aria-label={'SAM.exe reaction: ' + meta.label}>
      <Image src="/portfolio/chatbot-avatar.png" alt="" fill sizes="48px" className="rounded-full object-cover object-top" />
      <span key={reaction} className="absolute -bottom-1 -right-1 z-10 grid h-5 w-5 place-items-center rounded-full border border-sky-300/80 bg-[#030c19] text-[11px] shadow-[0_0_12px_rgba(56,189,248,0.4)]" aria-hidden="true">{meta.emoji}</span>
    </div>
  );
}
const suggestedQuestions = [
  'Walk me through ARGUS AI',
  'What is NEXUS Autonomous Analyst?',
  'Which AI & LLM stack does Samyak use?',
  'How can I contact Samyak directly?',
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function plainText(value: string) {
  return value
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function goToPortfolioTarget(target: PortfolioTarget) {
  if (target.backgroundTab) {
    window.dispatchEvent(new CustomEvent('portfolio:select-background-tab', { detail: target.backgroundTab }));
  }
  navigateToPortfolioSection(target.sectionId);
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [pending, setPending] = useState(false);
  const [reaction, setReaction] = useState<Reaction>('greeting');
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' });
  }, [open, messages, pending]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || pending) return;

    let navigation = getPortfolioNavigationTarget(content) ?? undefined;
    const nextMessages = [...messages, { id: makeId(), role: 'user' as const, content }];
    setMessages(nextMessages);
    setDraft('');
    setPending(true);
    setReaction('thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(-6).map(({ role, content: text }) => ({ role, content: text })),
        }),
      });

      let reply = '';
      let apiFailed = false;
      const assistantId = makeId();
      if (response.ok && response.body) {
        const placeholder: ChatMessage = { id: assistantId, role: 'assistant', content: '', navigation };
        setMessages([...nextMessages, placeholder]);
        reply = await readTextStream(response, (_chunk, accumulated) => {
          setReaction('typing');
          setMessages([...nextMessages, { ...placeholder, content: plainText(accumulated) }]);
        });
        reply = plainText(reply);
      } else {
        apiFailed = true;
        const data = await response.json().catch(() => ({}));
        console.warn('[SAM.exe] Chat request failed:', data.error || response.status);
      }

      if (!reply) {
        const fallback = generateLocalKnowledgeResponse(content);
        reply = fallback.reply;
        if (!navigation && fallback.nav) navigation = fallback.nav;
      }

      const wantsEmail = /\b(email|mail|contact|reach out|send.*message)\b/i.test(content);
      setReaction(apiFailed ? 'error' : getReplyReaction(reply));
      setMessages([
        ...nextMessages,
        {
          id: assistantId,
          role: 'assistant',
          content: reply,
          navigation,
          emailDraft: wantsEmail ? content : undefined,
        },
      ]);
    } catch {
      setReaction('error');
      const fallback = generateLocalKnowledgeResponse(content);
      setMessages([
        ...nextMessages,
        {
          id: makeId(),
          role: 'assistant',
          content: fallback.reply,
          navigation: navigation || fallback.nav,
        },
      ]);
    } finally {
      setPending(false);
      if (navigation) {
        window.setTimeout(() => requestAnimationFrame(() => goToPortfolioTarget(navigation!)), 120);
      }
    }
  };

  return (
    <div className="portfolio-chat">
      {open && (
        <section
          className="portfolio-chat__panel relative overflow-hidden"
          id="portfolio-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="portfolio-chat-title"
          data-lenis-prevent="true"
        >
          {/* ── 3D Neural Intelligence Universe Background ──────── */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
            <Chatbot3DBackground />
          </div>
          <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#060f1b]/25 via-[#060f1b]/45 to-[#060f1b]/75" />

          <header className="portfolio-chat__header relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <ReactionAvatar reaction={reaction} className="h-12 w-12 rounded-full border-2 border-sky-400 bg-[#060f1b] shadow-[0_0_16px_rgba(56,189,248,0.5)]" />
              <div>
                <span className="portfolio-chat__eyebrow text-[10px] font-mono tracking-widest text-sky-400">
                  SAMYAK ANAND · AI ASSISTANT
                </span>
                <h2 id="portfolio-chat-title" className="text-base font-bold text-white flex items-center gap-2">
                  SAM.exe
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-mono text-emerald-300 border border-emerald-500/30">ONLINE</span>
                </h2>
              </div>
            </div>
            <button
              className="portfolio-chat__close rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <p className="portfolio-chat__model-label relative z-10">Interactive Neural Agent · Ready</p>

          <div
            className="portfolio-chat__messages relative z-10 overscroll-contain"
            ref={messageListRef}
            aria-live="polite"
            aria-busy={pending}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`portfolio-chat__message portfolio-chat__message--${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="relative mb-1.5 flex items-center gap-2">
                    <ReactionAvatar reaction={message.content ? getReplyReaction(message.content) : 'typing'} className="h-6 w-6 rounded-full border border-sky-400/50 shadow-[0_0_8px_rgba(56,189,248,0.3)]" />
                    <span className="text-[11px] font-mono font-semibold text-sky-300">SAM.exe</span>
                  </div>
                )}
                <p>{message.content}</p>
                {message.role === 'assistant' && message.navigation && (
                  <button
                    type="button"
                    onClick={() => goToPortfolioTarget(message.navigation!)}
                    className="mt-3 rounded-full border border-violet-500/30 bg-violet-950/40 px-3 py-1.5 text-xs text-violet-200 transition hover:bg-violet-900/50 hover:border-violet-400"
                  >
                    Go to {message.navigation.label} ↗
                  </button>
                )}
                {message.role === 'assistant' && message.emailDraft && (
                  <a
                    className="mt-3 inline-flex rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs text-cyan-200 transition hover:bg-cyan-900/50 hover:border-cyan-400"
                    href={`mailto:samyak.g.anand@gmail.com?subject=${encodeURIComponent(
                      'Portfolio inquiry'
                    )}&body=${encodeURIComponent(
                      `Hi Samyak,\n\nI spoke with SAM.exe about: ${message.emailDraft}\n\n`
                    )}`}
                  >
                    Draft email to Samyak ↗
                  </a>
                )}
              </div>
            ))}
            {pending && <p className="portfolio-chat__typing flex items-center gap-2" role="status"><span aria-hidden="true">{REACTION_META[reaction].emoji}</span>{reaction === 'typing' ? 'SAM.exe is typing…' : 'SAM.exe is thinking…'}</p>}
          </div>

          {messages.length === 1 && !pending && (
            <div className="portfolio-chat__suggestions relative z-10" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setDraft(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="portfolio-chat__form relative z-10" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="portfolio-chat-input">
              Your message
            </label>
            <input
              ref={inputRef}
              id="portfolio-chat-input"
              className="portfolio-chat__input"
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                if (!pending) setReaction(event.target.value ? 'typing' : (open ? 'idle' : 'greeting'));
              }}
              maxLength={1000}
              placeholder="Ask about ARGUS AI, NEXUS, skills..."
              autoComplete="off"
              disabled={pending}
            />
            <button
              type="submit"
              disabled={!draft.trim() || pending}
              aria-label="Send message"
            >
              ↗
            </button>
          </form>

          <p className="portfolio-chat__privacy relative z-10">
            Ask anything about Samyak Anand&apos;s verified AI projects, architecture, or contact details.
          </p>
        </section>
      )}

      {/* ── Floating Chatbot Launcher ── */}
      <button
        className="portfolio-chat__launcher group relative flex items-center gap-3 rounded-full border border-sky-400/50 bg-[#060f1b]/95 p-1.5 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-sky-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(56,189,248,0.55)] active:scale-95"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close SAM.exe assistant' : 'Open SAM.exe assistant'}
      >
        <ReactionAvatar reaction={reaction} className="h-10 w-10 rounded-full border-2 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-tight text-white group-hover:text-sky-200">
            {open ? 'Close Assistant' : 'Ask SAM.exe'}
          </span>
          <span className="text-[10px] font-mono text-sky-400/80">
            {open ? 'Tap to minimize' : 'AI Digital Twin'}
          </span>
        </div>
      </button>
    </div>
  );
}
