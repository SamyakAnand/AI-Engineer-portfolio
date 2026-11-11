import { NextResponse } from 'next/server';

export const revalidate = 300;
const base = (process.env.EURI_API_BASE_URL || 'https://api.euron.one/api/v1/euri').replace(/\/$/, '');
const excluded = /(embed|image|vision|audio|transcri|speech|whisper|tts|stt|moderation|guard|background-removal|upscale|nano-banana|\blive\b)/i;

export async function GET() {
  const key = process.env.EURI_API_KEY?.trim();
  if (!key) return NextResponse.json({ models: [], error: 'not_configured' }, { status: 503 });
  try {
    const response = await fetch(`${base}/models`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return NextResponse.json({ models: [], error: 'upstream_failed' }, { status: 502 });
    const payload: unknown = await response.json();
    const data = payload && typeof payload === 'object' && 'data' in payload ? (payload as { data: unknown }).data : payload;
    const models = Array.isArray(data) ? data.map(item => typeof item === 'string' ? item : item && typeof item === 'object' && 'id' in item ? (item as { id: unknown }).id : null)
      .filter((id): id is string => typeof id === 'string' && !excluded.test(id) && /^[a-zA-Z0-9._:-]+$/.test(id)) : [];
    return NextResponse.json({ models: [...new Set(models)].sort((a, b) => a.localeCompare(b)) });
  } catch {
    return NextResponse.json({ models: [], error: 'upstream_failed' }, { status: 502 });
  }
}
