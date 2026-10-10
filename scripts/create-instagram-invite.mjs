import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  readInstagramConfig,
  createInvite,
} from '../lib/instagram-security.ts';

try {
  const config = readInstagramConfig();
  if (!process.env.CRON_SECRET || process.env.CRON_SECRET.length < 32)
    throw new Error();
  const url = new URL('/koppelen/instagram', config.origin);
  url.hash = new URLSearchParams({
    invite: createInvite(config.connectSecret),
  }).toString();
  const path = resolve('outputs/instagram-connection/persoonlijke-link.txt');
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${url.href}\n`, { mode: 0o600 });
  console.log(
    'Persoonlijke link opgeslagen in outputs/instagram-connection/persoonlijke-link.txt.',
  );
  console.log(
    'Geldig voor één geslaagde koppeling, maximaal zeven dagen. Alleen met Daniel delen.',
  );
} catch {
  console.error(
    'Nog niet gereed: controleer de Instagram-instellingen in het beveiligde env-bestand.',
  );
  process.exitCode = 1;
}
