import { NextRequest, NextResponse } from 'next/server';
import { getAiReply, type ChatMessage } from '@/lib/chatClient';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_MESSAGES = 20;
const MAX_CONTENT_CHARS = 2_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function json(
  body: Record<string, unknown>,
  status: number,
  extraHeaders: Record<string, string> = {}
) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function isOriginAllowed(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
  if (configured.includes(origin)) return true;

  const host =
    request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) return false;

  const proto = request.headers.get('x-forwarded-proto') || 'https';
  return origin === `${proto}://${host}`;
}

function checkRateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return { ok: false, retryAfter };
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return { ok: true };
}

function parseMessages(payload: unknown): ChatMessage[] {
  if (!payload || typeof payload !== 'object') {
    throw new Error('INVALID_PAYLOAD');
  }

  const raw = (payload as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) {
    throw new Error('INVALID_MESSAGES_FORMAT');
  }
  if (raw.length === 0 || raw.length > MAX_MESSAGES) {
    throw new Error('INVALID_MESSAGE_COUNT');
  }

  const parsed: ChatMessage[] = [];
  for (const message of raw) {
    if (!message || typeof message !== 'object') {
      throw new Error('INVALID_MESSAGE');
    }
    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') {
      throw new Error('INVALID_MESSAGE');
    }
    const normalized = content.trim();
    if (!normalized || normalized.length > MAX_CONTENT_CHARS) {
      throw new Error('INVALID_MESSAGE_CONTENT');
    }
    parsed.push({ role, content: normalized });
  }

  return parsed;
}

export async function POST(request: NextRequest) {
  if (!isOriginAllowed(request)) {
    return json({ error: 'Forbidden' }, 403);
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.ok) {
    return json(
      { error: 'Too many requests' },
      429,
      { 'Retry-After': String(rateLimit.retryAfter) }
    );
  }

  try {
    const body = (await request.json()) as unknown;
    const messages = parseMessages(body);
    const reply = await getAiReply(messages);
    return json({ reply }, 200);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('INVALID_')) {
      return json({ error: 'Invalid request body' }, 400);
    }
    if (error instanceof Error && error.message === 'Server configuration error') {
      return json({ error: 'GROK_API_KEY is not configured on the server' }, 500);
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('xAI API Error:', message);
    return json({ error: 'Internal server error' }, 500);
  }
}
