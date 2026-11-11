'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getPortfolioNavigationTarget, type PortfolioTarget } from '@/lib/chat-navigation';
import { navigateToPortfolioSection } from '@/lib/portfolio-navigation';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  navigation?: PortfolioTarget;
};

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi, I’m SAM.exe. Ask me about Samyak’s projects, skills, or experience.',
};

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

function failureMessage(code: unknown) {
  if (code === 'not_configured') {
    return 'The AI assistant is not connected yet. You can still reach Samyak at samyak.g.anand@gmail.com.';
  }
  if (code === 'rate_limit' || code === 'upstream_busy') {
    return 'The assistant is busy right now. Please wait a moment and try again.';
  }
  return 'I could not reach the assistant just now. Please try again or email Samyak directly.';
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
  const [model, setModel] = useState('euri-chat-fast');
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' });
  }, [open, messages, pending]);

  useEffect(() => {
    if (!open) return;
  }, [open]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || pending) return;
    const navigation = getPortfolioNavigationTarget(content) ?? undefined;

    const nextMessages = [...messages, { id: makeId(), role: 'user' as const, content }];
    setMessages(nextMessages);
    setDraft('');
    setPending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(-10).map(({ role, content: text }) => ({ role, content: text })),
          model,
        }),
      });
      const data = await response.json().catch(() => ({}));
      const answer = response.ok && typeof data.reply === 'string' ? plainText(data.reply) : '';
      const reply = answer || failureMessage(data.error);
      setMessages([...nextMessages, { id: makeId(), role: 'assistant', content: reply, navigation }]);
    } catch {
      setMessages([...nextMessages, {
        id: makeId(),
        role: 'assistant',
        content: 'I could not reach the assistant just now. Please try again or email Samyak directly.',
      }]);
    } finally {
      setPending(false);
      if (navigation) {
        window.setTimeout(() => requestAnimationFrame(() => goToPortfolioTarget(navigation)), 120);
      }
    }
  };

  return (
    <div className="portfolio-chat">
      {open && (
        <section className="portfolio-chat__panel" id="portfolio-chat-panel" role="dialog" aria-modal="false" aria-labelledby="portfolio-chat-title">
          <header className="portfolio-chat__header">
            <div>
              <span className="portfolio-chat__eyebrow">SAMYAK ANAND · AI ASSISTANT</span>
              <h2 id="portfolio-chat-title">SAM.exe</h2>
            </div>
            <button className="portfolio-chat__close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <p className="portfolio-chat__model-label">AI assistant · ready to help</p>
          <div className="portfolio-chat__messages" ref={messageListRef} aria-live="polite" aria-busy={pending}>
            {messages.map((message) => (
              <div key={message.id} className={`portfolio-chat__message portfolio-chat__message--${message.role}`}>
                <p>{message.content}</p>
                {message.role === 'assistant' && message.navigation && <button type="button" onClick={() => goToPortfolioTarget(message.navigation!)} className="mt-3 rounded-full border border-white/15 px-3 py-1.5 text-xs text-sky-100 transition hover:bg-white/10">Go to {message.navigation.label} ↗</button>}
              </div>
            ))}
            {pending && <p className="portfolio-chat__typing" role="status">Thinking…</p>}
          </div>
          <form className="portfolio-chat__form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="portfolio-chat-input">Your message</label>
            <input
              ref={inputRef}
              id="portfolio-chat-input"
              className="portfolio-chat__input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={1000}
              placeholder="Ask about a project…"
              autoComplete="off"
              disabled={pending}
            />
            <button type="submit" disabled={!draft.trim() || pending} aria-label="Send message">↗</button>
          </form>
          <p className="portfolio-chat__privacy">Chats are not stored by this site. Messages are sent to EURI to generate replies. Please don’t share sensitive or confidential information.</p>
        </section>
      )}
      <button
        className="portfolio-chat__launcher"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close SAM.exe assistant' : 'Open SAM.exe assistant'}
      >
        <span className="portfolio-chat__launcher-mark" aria-hidden="true">✦</span>
        {open ? 'Close' : 'Ask SAM.exe'}
      </button>
    </div>
  );
}
