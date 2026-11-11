import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, type ContactInput, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from '@/lib/validation';

// In-memory rate limiter (sufficient for v1; swap to Redis in production).
const limiter = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = limiter.get(ip) || [];
  const filtered = timestamps.filter((t) => t > windowStart);
  limiter.set(ip, filtered);
  if (filtered.length >= RATE_LIMIT_MAX) {
    return false;
  }
  filtered.push(now);
  limiter.set(ip, filtered);
  return true;
}

// Sanitize headers (prevent log injection).
function sanitize(value: string): string {
  return value.replace(/[\r\n]/g, '').slice(0, 200);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limit' }, { status: 429 });
  }

  const maxBodyBytes = 12 * 1024;
  if (Number(req.headers.get('content-length') || 0) > maxBodyBytes) {
    return NextResponse.json({ ok: false, error: 'request_too_large' }, { status: 413 });
  }

  let body: ContactInput;
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) {
      return NextResponse.json({ ok: false, error: 'request_too_large' }, { status: 413 });
    }
    const parsed = contactSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return NextResponse.json({ ok: false, error: 'validation_failed' }, { status: 400 });
    body = parsed.data;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Server-side sanitization of fields.
  const sanitized: ContactInput = {
    name: sanitize(body.name),
    email: sanitize(body.email),
    subject: sanitize(body.subject || 'Portfolio enquiry'),
    message: sanitize(body.message),
    company: '',
  };

  try {
    // Email delivery via Resend (configured through server env vars only).
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
      // Graceful degradation: log but do not crash.
      console.error('[contact] Missing email config — contact blocked until configured.');
      return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }

    const subject = `Portfolio: ${sanitized.subject}`;
    const textBody = `
New portfolio message

Name: ${sanitized.name}
Email: ${sanitized.email}
Subject: ${sanitized.subject}

Message:
${sanitized.message}
`.trim();

    // Basic sanity — never send to the submitter's own inbox.
    if (sanitized.email === CONTACT_TO_EMAIL) {
      return NextResponse.json({ ok: false, error: 'self_not_allowed' }, { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [CONTACT_TO_EMAIL],
        subject,
        text: textBody,
        reply_to: sanitized.email,
      }),
    });

    if (!res.ok) {
      console.error(`[contact] Resend failed: ${res.status}`);
      return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error('[contact] Unexpected error');
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
