import { createClient, type Client, type InValue } from '@libsql/client';
import { mkdirSync } from 'node:fs';

let client: Client | undefined;
let initialized: Promise<unknown> | undefined;

// Remote libSQL/Turso persists across serverless invocations. Local previews use SQLite.
export async function execute(sql: string, args: InValue[]) {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    if (process.env.VERCEL && (!url || !url.startsWith('libsql://'))) {
      throw new Error(
        'Configure a remote database before accepting submissions',
      );
    }
    if (!url) mkdirSync('.data', { recursive: true });
    client = createClient({
      url: url || 'file:.data/beurswatcher.db',
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  initialized ??= client
    .batch(
      [
        'CREATE TABLE IF NOT EXISTS subscribers (email TEXT PRIMARY KEY NOT NULL, token_hash TEXT NOT NULL, created_at INTEGER NOT NULL, consent_version TEXT NOT NULL)',
        'CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at INTEGER NOT NULL)',
      ],
      'write',
    )
    .catch((error) => {
      initialized = undefined;
      throw error;
    });
  await initialized;
  return client.execute({ sql, args });
}
export async function payload(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    throw new Error('Invalid origin');
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    throw new Error('Invalid content type');
  const text = await request.text();
  if (text.length > 8000) throw new Error('Payload too large');
  const data = JSON.parse(text);
  if (!data || typeof data !== 'object' || Array.isArray(data))
    throw new Error('Invalid payload');
  return data;
}
export const validEmail = (s: unknown): s is string =>
  typeof s === 'string' &&
  s.length <= 254 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export async function hash(token: string) {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(token),
  );
  return Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('');
}
export function response(value: unknown, status = 200) {
  return Response.json(value, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}
