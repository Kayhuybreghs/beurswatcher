import { createClient, type Client, type Row } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import type { Reel } from '../app/reel-data.ts';

export class InstagramStorageError extends Error {
  readonly code: string;
  constructor(code: string) {
    super('Instagram storage unavailable');
    this.code = /^[A-Z_]{1,64}$/.test(code) ? code : 'STORAGE_UNAVAILABLE';
  }
}

export function instagramStorageIssue(error: unknown): string {
  if (error instanceof InstagramStorageError) return error.code;
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof error.code === 'string' &&
    /^[A-Z_]{1,64}$/.test(error.code)
  )
    return error.code;
  return 'STORAGE_UNAVAILABLE';
}

export type InstagramEditorialSettings = {
  mode: 'automatic' | 'manual';
  selectedIds: string[];
  titles: Record<string, string>;
};
export type InstagramHealth = {
  status: 'connected' | 'waiting' | 'needs-reconnect' | 'unavailable';
  checkedAt: number | null;
  mediaCheckedAt: number | null;
  credentialKey: string;
  items: Reel[];
};

export type InstagramConnection = {
  userId: string;
  username: string;
  token: string;
  expiresAt: number;
  refreshedAt: number;
  status: string;
  revision: string;
  lease: string;
};
function storedText(value: unknown): string {
  if (typeof value !== 'string')
    throw new Error('Invalid Instagram storage record');
  return value;
}
function connection(row?: Row): InstagramConnection | null {
  return row
    ? {
        userId: storedText(row.user_id),
        username: storedText(row.username),
        token: storedText(row.token),
        expiresAt: Number(row.expires_at),
        refreshedAt: Number(row.refreshed_at),
        status: storedText(row.status),
        revision: storedText(row.revision),
        lease: storedText(row.lease ?? ''),
      }
    : null;
}

// Factory accepts an isolated SQLite client in tests. Production uses the existing Turso database.
export function createInstagramStore(client: Client) {
  let initialized: Promise<unknown> | undefined;
  async function ready() {
    initialized ??= client
      .batch(
        [
          `CREATE TABLE IF NOT EXISTS instagram_connection (
        id INTEGER PRIMARY KEY CHECK(id = 1), user_id TEXT NOT NULL, username TEXT NOT NULL,
        token TEXT NOT NULL, expires_at INTEGER NOT NULL, refreshed_at INTEGER NOT NULL,
        status TEXT NOT NULL, revision TEXT NOT NULL, lease TEXT, lease_until INTEGER NOT NULL DEFAULT 0,
        last_attempt INTEGER NOT NULL DEFAULT 0)`,
          'CREATE TABLE IF NOT EXISTS instagram_used_invites (nonce_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)',
          'CREATE TABLE IF NOT EXISTS instagram_used_flows (nonce_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)',
          `CREATE TABLE IF NOT EXISTS instagram_editorial (
            id INTEGER PRIMARY KEY CHECK(id = 1), settings TEXT NOT NULL, revision TEXT NOT NULL)`,
          {
            sql: 'INSERT OR IGNORE INTO instagram_editorial VALUES (1,?,?)',
            args: [
              JSON.stringify({
                mode: 'automatic',
                selectedIds: [],
                titles: {},
              }),
              randomUUID(),
            ],
          },
          `CREATE TABLE IF NOT EXISTS instagram_health (
            id INTEGER PRIMARY KEY CHECK(id = 1), status TEXT NOT NULL DEFAULT 'waiting',
            checked_at INTEGER, media_checked_at INTEGER, credential_key TEXT NOT NULL DEFAULT '',
            items TEXT NOT NULL DEFAULT '[]', last_attempt INTEGER NOT NULL DEFAULT 0, check_lease TEXT)`,
          'INSERT OR IGNORE INTO instagram_health (id) VALUES (1)',
          `CREATE TABLE IF NOT EXISTS instagram_login_attempts (
            bucket TEXT PRIMARY KEY, attempts INTEGER NOT NULL, reset_at INTEGER NOT NULL)`,
        ],
        'write',
      )
      .catch((error: unknown) => {
        initialized = undefined;
        // Preserve only a bounded provider error code, never URLs/tokens or SQL.
        throw new InstagramStorageError(instagramStorageIssue(error));
      });
    await initialized;
  }
  return {
    async get() {
      await ready();
      return connection(
        (
          await client.execute(
            'SELECT * FROM instagram_connection WHERE id = 1',
          )
        ).rows[0],
      );
    },
    async inviteUsed(nonceHash: string) {
      await ready();
      return (
        (
          await client.execute({
            sql: 'SELECT 1 FROM instagram_used_invites WHERE nonce_hash = ?',
            args: [nonceHash],
          })
        ).rows.length > 0
      );
    },
    async consumeFlow(nonceHash: string, now = Date.now()) {
      await ready();
      return (
        (
          await client.execute({
            sql: 'INSERT OR IGNORE INTO instagram_used_flows VALUES (?, ?)',
            args: [nonceHash, now + 15 * 60000],
          })
        ).rowsAffected === 1
      );
    },
    async save(
      record: Omit<InstagramConnection, 'status' | 'revision' | 'lease'>,
      inviteHash: string,
      now = Date.now(),
    ) {
      await ready();
      // One transaction: an invitation can connect only once, including across Vercel instances.
      await client.batch(
        [
          {
            sql: 'INSERT INTO instagram_used_invites VALUES (?, ?)',
            args: [inviteHash, now + 8 * 86400000],
          },
          {
            sql: `INSERT INTO instagram_connection (id,user_id,username,token,expires_at,refreshed_at,status,revision)
          VALUES (1,?,?,?,?,?,'connected',?) ON CONFLICT(id) DO UPDATE SET
          user_id=excluded.user_id,username=excluded.username,token=excluded.token,expires_at=excluded.expires_at,
          refreshed_at=excluded.refreshed_at,status='connected',revision=excluded.revision,lease=NULL,lease_until=0,last_attempt=0`,
            args: [
              record.userId,
              record.username,
              record.token,
              record.expiresAt,
              record.refreshedAt,
              randomUUID(),
            ],
          },
          // An old account check must not mark a newly connected account healthy.
          {
            sql: "UPDATE instagram_health SET status='waiting',checked_at=NULL,credential_key='',last_attempt=0,check_lease=NULL WHERE id=1",
            args: [],
          },
        ],
        'write',
      );
    },
    async claimRefresh(now = Date.now()) {
      await ready();
      await client.execute({
        sql: "UPDATE instagram_connection SET status='needs-reconnect' WHERE expires_at <= ?",
        args: [now],
      });
      const result = await client.execute({
        sql: `UPDATE instagram_connection SET lease=?,lease_until=?,last_attempt=?
        WHERE id=1 AND status='connected' AND expires_at>? AND expires_at<=? AND refreshed_at<=?
        AND lease_until<? AND last_attempt<? RETURNING *`,
        args: [
          randomUUID(),
          now + 5 * 60000,
          now,
          now,
          now + 30 * 86400000,
          now - 86400000,
          now,
          now - 6 * 3600000,
        ],
      });
      return connection(result.rows[0]);
    },
    async finishRefresh(
      previous: InstagramConnection,
      token: string,
      expiresAt: number,
      now = Date.now(),
    ) {
      await ready();
      await client.execute({
        sql: `UPDATE instagram_connection SET token=?,expires_at=?,refreshed_at=?,lease=NULL,lease_until=0
        WHERE id=1 AND revision=? AND lease=?`,
        args: [token, expiresAt, now, previous.revision, previous.lease],
      });
    },
    async failRefresh(previous: InstagramConnection, reconnect: boolean) {
      await ready();
      await client.execute({
        sql: `UPDATE instagram_connection SET status=?,lease=NULL,lease_until=0
        WHERE id=1 AND revision=? AND lease=?`,
        args: [
          reconnect ? 'needs-reconnect' : 'connected',
          previous.revision,
          previous.lease,
        ],
      });
    },
    async editorial() {
      await ready();
      const row = (
        await client.execute(
          'SELECT settings,revision FROM instagram_editorial WHERE id=1',
        )
      ).rows[0];
      return {
        settings: JSON.parse(
          storedText(row.settings),
        ) as InstagramEditorialSettings,
        revision: storedText(row.revision),
      };
    },
    async saveEditorial(
      settings: InstagramEditorialSettings,
      expectedRevision: string,
    ) {
      await ready();
      const revision = randomUUID();
      const result = await client.execute({
        sql: 'UPDATE instagram_editorial SET settings=?,revision=? WHERE id=1 AND revision=? RETURNING revision',
        args: [JSON.stringify(settings), revision, expectedRevision],
      });
      return result.rows.length ? revision : null;
    },
    async health(): Promise<InstagramHealth> {
      await ready();
      const row = (
        await client.execute('SELECT * FROM instagram_health WHERE id=1')
      ).rows[0];
      const items: unknown = JSON.parse(storedText(row.items));
      if (!Array.isArray(items))
        throw new Error('Invalid Instagram storage record');
      return {
        status: storedText(row.status) as InstagramHealth['status'],
        checkedAt: row.checked_at === null ? null : Number(row.checked_at),
        mediaCheckedAt:
          row.media_checked_at === null ? null : Number(row.media_checked_at),
        credentialKey: storedText(row.credential_key),
        items: items as Reel[],
      };
    },
    async claimCheck(now = Date.now()) {
      await ready();
      const lease = randomUUID();
      const result = await client.execute({
        sql: 'UPDATE instagram_health SET last_attempt=?,check_lease=? WHERE id=1 AND last_attempt<=? RETURNING id',
        args: [now, lease, now - 60000],
      });
      if (result.rows.length) return { allowed: true, lease, retryAfter: 0 };
      const row = (
        await client.execute(
          'SELECT last_attempt FROM instagram_health WHERE id=1',
        )
      ).rows[0];
      return {
        allowed: false,
        lease: '',
        retryAfter: Math.max(
          1,
          Math.ceil((Number(row.last_attempt) + 60000 - now) / 1000),
        ),
      };
    },
    async saveCheck(
      lease: string,
      result: Omit<InstagramHealth, 'mediaCheckedAt' | 'items'> & {
        items?: Reel[];
      },
    ) {
      await ready();
      const items =
        result.items === undefined ? null : JSON.stringify(result.items);
      return (
        (
          await client.execute({
            sql: `UPDATE instagram_health SET status=?,checked_at=?,credential_key=?,
          items=COALESCE(?,items),media_checked_at=CASE WHEN ? IS NULL THEN media_checked_at ELSE ? END,
          check_lease=NULL WHERE id=1 AND check_lease=?`,
            args: [
              result.status,
              result.checkedAt,
              result.credentialKey,
              items,
              items,
              result.checkedAt,
              lease,
            ],
          })
        ).rowsAffected === 1
      );
    },
    async loginAttempt(bucket: string, now = Date.now()) {
      await ready();
      if (!bucket || bucket.length > 128)
        throw new Error('Invalid login bucket');
      const row = (
        await client.execute({
          sql: `INSERT INTO instagram_login_attempts (bucket,attempts,reset_at) VALUES (?,1,?)
          ON CONFLICT(bucket) DO UPDATE SET
          attempts=CASE WHEN reset_at<=? THEN 1 ELSE MIN(attempts+1,6) END,
          reset_at=CASE WHEN reset_at<=? THEN excluded.reset_at ELSE reset_at END
          RETURNING attempts,reset_at`,
          args: [bucket, now + 15 * 60000, now, now],
        })
      ).rows[0];
      const allowed = Number(row.attempts) <= 5;
      return {
        allowed,
        retryAfter: allowed
          ? 0
          : Math.max(1, Math.ceil((Number(row.reset_at) - now) / 1000)),
      };
    },
    async clearLoginAttempts(bucket: string) {
      await ready();
      await client.execute({
        sql: 'DELETE FROM instagram_login_attempts WHERE bucket=?',
        args: [bucket],
      });
    },
    async cleanup(now = Date.now()) {
      await ready();
      await client.batch(
        [
          {
            sql: 'DELETE FROM instagram_used_invites WHERE expires_at < ?',
            args: [now],
          },
          {
            sql: 'DELETE FROM instagram_used_flows WHERE expires_at < ?',
            args: [now],
          },
          {
            sql: 'DELETE FROM instagram_login_attempts WHERE reset_at < ?',
            args: [now],
          },
        ],
        'write',
      );
    },
  };
}

let store: ReturnType<typeof createInstagramStore> | undefined;
export function getInstagramStore() {
  if (store) return store;
  const url = process.env.TURSO_DATABASE_URL;
  if (process.env.VERCEL) {
    if (!url) throw new InstagramStorageError('MISSING_DATABASE_URL');
    if (!url.startsWith('libsql://'))
      throw new InstagramStorageError('INVALID_DATABASE_URL_SCHEME');
    if (!process.env.TURSO_AUTH_TOKEN)
      throw new InstagramStorageError('MISSING_DATABASE_TOKEN');
  }
  if (!url) mkdirSync('.data', { recursive: true });
  store = createInstagramStore(
    createClient({
      url: url || 'file:.data/instagram.db',
      authToken: process.env.TURSO_AUTH_TOKEN,
    }),
  );
  return store;
}
