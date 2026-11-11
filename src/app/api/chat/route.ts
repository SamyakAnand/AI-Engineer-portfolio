import { NextRequest, NextResponse } from 'next/server';
import { PORTFOLIO_SYSTEM_INSTRUCTION, portfolioChatRequestSchema } from '@/lib/portfolio-chat';

const WINDOW_MS = 60_000;
const LIMIT = 10;
const MAX_BYTES = 48 * 1024;
const requestLog = new Map<string, number[]>();
const apiBase = (process.env.EURI_API_BASE_URL || 'https://api.euron.one/api/v1/euri').replace(/\/$/, '');

function limited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter(timestamp => now - timestamp < WINDOW_MS);
  if (recent.length >= LIMIT) { requestLog.set(ip, recent); return true; }
  recent.push(now); requestLog.set(ip, recent);
  if (requestLog.size > 1000) { const first = requestLog.keys().next().value; if (first) requestLog.delete(first); }
  return false;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_BYTES) return NextResponse.json({ error: 'request_too_large' }, { status: 413 });
  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BYTES) return NextResponse.json({ error: 'request_too_large' }, { status: 413 });
    raw = JSON.parse(body);
  } catch { return NextResponse.json({ error: 'invalid_json' }, { status: 400 }); }
  const parsed = portfolioChatRequestSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });

  const key = process.env.EURI_API_KEY?.trim();
  if (!key) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  const requested = raw && typeof raw === 'object' && 'model' in raw && typeof raw.model === 'string' ? raw.model : '';
  const model = requested || process.env.EURI_DEFAULT_MODEL?.trim() || 'euri-chat-fast';
  if (!/^[a-zA-Z0-9._:-]+$/.test(model) || /(embed|image|vision|audio|transcri|speech|whisper|tts|stt|moderation|guard|background-removal|upscale|nano-banana|\blive\b)/i.test(model)) {
    return NextResponse.json({ error: 'invalid_model' }, { status: 400 });
  }
  try {
    const upstream = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: PORTFOLIO_SYSTEM_INSTRUCTION }, ...parsed.data.messages], temperature: 0.4, max_tokens: 512 }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!upstream.ok) {
      console.error(`[portfolio-chat] EURI returned ${upstream.status}`);
      return NextResponse.json({ error: upstream.status === 429 ? 'upstream_busy' : 'upstream_failed' }, { status: upstream.status === 429 ? 503 : 502 });
    }
    const payload: unknown = await upstream.json();
    const choices = payload && typeof payload === 'object' && 'choices' in payload ? (payload as { choices: unknown }).choices : null;
    const first = Array.isArray(choices) ? choices[0] : null;
    const message = first && typeof first === 'object' && 'message' in first ? (first as { message: unknown }).message : null;
    const replyValue = message && typeof message === 'object' && 'content' in message ? (message as { content: unknown }).content : null;
    const reply = typeof replyValue === 'string' ? replyValue.trim() : '';
    if (!reply) return NextResponse.json({ error: 'empty_reply' }, { status: 502 });
    return NextResponse.json({ reply });
  } catch {
    console.error('[portfolio-chat] EURI request failed');
    return NextResponse.json({ error: 'upstream_failed' }, { status: 502 });
  }
}
