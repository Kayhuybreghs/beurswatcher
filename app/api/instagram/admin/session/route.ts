import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  getAdminConfig,
  issueAdminSession,
  readAdminSession,
  verifyAdminCode,
  type InstagramAdminConfig,
} from '../../../../../lib/instagram-admin-auth';
import { getInstagramStore } from '../../../../../lib/instagram-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
};
const unavailable = () =>
  NextResponse.json(
    { error: 'Het beheer wordt nog klaargezet. Laat het mij even weten.' },
    { status: 503, headers },
  );
const invalid = () =>
  NextResponse.json(
    { error: 'Controleer je aanvraag en probeer opnieuw.' },
    { status: 400, headers },
  );

function cookieOptions(config: InstagramAdminConfig) {
  return {
    httpOnly: true,
    secure: config.origin.startsWith('https:'),
    sameSite: 'lax' as const,
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}

function loginBucket(request: Request, secret: string): string {
  // Vercel sets this header at its edge. Outside Vercel, never trust a supplied IP.
  // https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
  const value =
    process.env.VERCEL === '1'
      ? request.headers.get('x-vercel-forwarded-for') ||
        request.headers.get('x-forwarded-for') ||
        ''
      : '';
  const address =
    value.length <= 64 && isIP(value.trim()) ? value.trim() : 'unknown';
  return createHmac('sha256', secret)
    .update(`instagram:admin-login:v1:${address}`)
    .digest('hex');
}

async function readBody(request: Request): Promise<string | null> {
  const advertised = request.headers.get('content-length');
  if (advertised && (!/^\d+$/.test(advertised) || Number(advertised) > 2048))
    return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > 2048) {
        await reader.cancel();
        return null;
      }
      chunks.push(part.value);
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(
      Buffer.concat(chunks),
    );
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function GET(request: Request) {
  try {
    getAdminConfig();
    return NextResponse.json(
      { authenticated: readAdminSession(request) },
      { headers },
    );
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  try {
    const config = getAdminConfig();
    if (
      request.headers.get('origin') !== config.origin ||
      request.headers
        .get('content-type')
        ?.split(';')[0]
        .trim()
        .toLowerCase() !== 'application/json'
    )
      return invalid();
    const body = await readBody(request);
    if (body === null) return invalid();
    let input: unknown;
    try {
      input = JSON.parse(body);
    } catch {
      return invalid();
    }
    if (
      !input ||
      typeof input !== 'object' ||
      Array.isArray(input) ||
      !('code' in input) ||
      typeof input.code !== 'string' ||
      input.code.length > 128
    )
      return invalid();
    const bucket = loginBucket(request, config.secret);
    const store = getInstagramStore();
    const attempt = await store.loginAttempt(bucket);
    if (!attempt.allowed) {
      const retryAfter = Math.max(1, Math.ceil(attempt.retryAfter));
      return NextResponse.json(
        { error: 'Te veel pogingen. Probeer het later opnieuw.', retryAfter },
        {
          status: 429,
          headers: { ...headers, 'Retry-After': String(retryAfter) },
        },
      );
    }
    if (!(await verifyAdminCode(input.code, config.codeHash)))
      return NextResponse.json(
        { error: 'Ongeldige toegangscode.' },
        { status: 401, headers },
      );
    await store.clearLoginAttempts(bucket);
    const response = NextResponse.json({ ok: true }, { headers });
    response.cookies.set(
      ADMIN_COOKIE,
      issueAdminSession(config.secret, config.codeHash),
      cookieOptions(config),
    );
    return response;
  } catch {
    return unavailable();
  }
}

export async function DELETE(request: Request) {
  try {
    const config = getAdminConfig();
    if (request.headers.get('origin') !== config.origin) return invalid();
    const response = NextResponse.json({ ok: true }, { headers });
    response.cookies.set(ADMIN_COOKIE, '', {
      ...cookieOptions(config),
      maxAge: 0,
    });
    return response;
  } catch {
    return unavailable();
  }
}
