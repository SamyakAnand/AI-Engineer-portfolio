import { NextRequest, NextResponse } from 'next/server';
import { buildPortfolioSystemInstruction } from '@/lib/portfolio-chat-context';
import { portfolioChatRequestSchema } from '@/lib/portfolio-chat';

export const runtime = 'nodejs';

const WINDOW_MS = 60_000;
const LIMIT = 10;
const MAX_BYTES = 24 * 1024;
const requestLog = new Map<string, number[]>();
const responseCache = new Map<string, { reply: string; expiresAt: number }>();
const CACHE_TTL_MS = 60_000;

function getCachedReply(key: string) {
  const cached = responseCache.get(key);
  if (!cached) return null;
  if (cached.expiresAt <= Date.now()) { responseCache.delete(key); return null; }
  return cached.reply;
}

function setCachedReply(key: string, reply: string) {
  if (!reply) return;
  if (responseCache.size >= 100) {
    const oldest = responseCache.keys().next().value;
    if (oldest) responseCache.delete(oldest);
  }
  responseCache.set(key, { reply, expiresAt: Date.now() + CACHE_TTL_MS });
}
const apiBase = (process.env.EURI_API_BASE_URL || 'https://api.euron.one/api/v1/euri').replace(/\/$/, '');

function limited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= LIMIT) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  if (requestLog.size > 1000) {
    const first = requestLog.keys().next().value;
    if (first) requestLog.delete(first);
  }
  return false;
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

function extractDelta(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return '';
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== 'object') return '';
  const delta = (choices[0] as { delta?: unknown }).delta;
  if (!delta || typeof delta !== 'object') return '';
  const content = (delta as { content?: unknown }).content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((part) => part && typeof part === 'object' && typeof (part as { text?: unknown }).text === 'string'
      ? (part as { text: string }).text : '').join('');
  }
  return '';
}

async function* readProviderDeltas(body: ReadableStream<Uint8Array>, onComplete?: (reply: string) => void): AsyncGenerator<string> {
  let collected = '';
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const parseLine = (line: string): string => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) return '';
    const data = trimmed.slice(5).trim();
    if (!data || data === '[DONE]') return '';
    try {
      return extractDelta(JSON.parse(data));
    } catch {
      return '';
    }
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';
      for (const line of lines) {
        const delta = parseLine(line);
        if (delta) { collected += delta; yield delta; }
      }
      if (done) {
        const finalDelta = parseLine(buffer);
        if (finalDelta) { collected += finalDelta; yield finalDelta; }
        onComplete?.(collected.trim());
        break;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip') || 'unknown';
  if (limited(ip)) return errorResponse('rate_limit', 429);

  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_BYTES) return errorResponse('request_too_large', 413);

  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BYTES) return errorResponse('request_too_large', 413);
    raw = JSON.parse(body);
  } catch {
    return errorResponse('invalid_json', 400);
  }

  const parsed = portfolioChatRequestSchema.safeParse(raw);
  if (!parsed.success) return errorResponse('invalid_request', 400);

  const key = process.env.EURI_API_KEY?.trim();
  if (!key) return errorResponse('not_configured', 503);

  const model = parsed.data.model || process.env.EURI_DEFAULT_MODEL?.trim() || 'euri-chat-fast';
  if (!/^[a-zA-Z0-9._:-]+$/.test(model) || /(embed|image|vision|audio|transcri|speech|whisper|tts|stt|moderation|guard|background-removal|upscale|nano-banana|\blive\b)/i.test(model)) {
    return errorResponse('invalid_model', 400);
  }

  const lastUserMessage = parsed.data.messages[parsed.data.messages.length - 1].content;
  const systemInstruction = buildPortfolioSystemInstruction(lastUserMessage);
  const singleQuestion = parsed.data.messages.filter((message) => message.role === 'user').length === 1;
  const cacheKey = model + ':' + lastUserMessage.trim().toLowerCase();
  const cachedReply = singleQuestion ? getCachedReply(cacheKey) : null;
  if (cachedReply) {
    return new Response(cachedReply, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-SAM-Cache': 'HIT' } });
  }

  try {
    const upstream = await fetch(apiBase + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: systemInstruction }, ...parsed.data.messages],
        temperature: 0.3,
        max_tokens: 420,
        stream: true,
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!upstream.ok) {
      console.error('[portfolio-chat] EURI returned ' + upstream.status);
      return errorResponse(upstream.status === 429 ? 'upstream_busy' : 'upstream_failed', upstream.status === 429 ? 503 : 502);
    }
    if (!upstream.body) return errorResponse('empty_stream', 502);

    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const payload: unknown = await upstream.json();
      const choices = payload && typeof payload === 'object' && 'choices' in payload ? (payload as { choices: unknown }).choices : null;
      const first = Array.isArray(choices) ? choices[0] : null;
      const message = first && typeof first === 'object' && 'message' in first ? (first as { message: unknown }).message : null;
      const content = message && typeof message === 'object' && 'content' in message ? (message as { content: unknown }).content : '';
      if (typeof content !== 'string' || !content.trim()) return errorResponse('empty_reply', 502);
      if (singleQuestion) setCachedReply(cacheKey, content.trim());
      return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-SAM-Cache': 'MISS' } });
    }

    const encoder = new TextEncoder();
    const iterator = readProviderDeltas(upstream.body, (reply) => { if (singleQuestion) setCachedReply(cacheKey, reply); });
    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        try {
          const { value, done } = await iterator.next();
          if (done) controller.close();
          else controller.enqueue(encoder.encode(value));
        } catch {
          controller.error(new Error('The upstream response stream failed.'));
        }
      },
      async cancel() {
        await iterator.return(undefined).catch(() => undefined);
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-transform',
        'X-Accel-Buffering': 'no',
        'X-SAM-Cache': 'MISS',
      },
    });
  } catch {
    console.error('[portfolio-chat] EURI request failed');
    return errorResponse('upstream_failed', 502);
  }
}
