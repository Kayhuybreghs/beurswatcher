import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { hashAdminCode } from '../lib/instagram-admin-auth.ts';

// Run locally with Node 22.18+. The output directory is ignored by Git.
// Refuse to overwrite an existing handoff or silently rotate a working code.
const directory = resolve('outputs/instagram-admin');
await mkdir(directory, { recursive: true });
const code = randomBytes(18).toString('base64url');
const values = {
  INSTAGRAM_ADMIN_CODE_HASH: await hashAdminCode(code),
  INSTAGRAM_ADMIN_SESSION_SECRET: randomBytes(48).toString('base64url'),
};
await writeFile(
  resolve(directory, 'production-secrets.json'),
  JSON.stringify(values, null, 2),
  { flag: 'wx', mode: 0o600 },
);
await writeFile(
  resolve(directory, 'toegang-voor-daniel.txt'),
  [
    'Hi Daniel,',
    '',
    'Ik heb een afgeschermde pagina gemaakt voor de Instagram-video’s op je website:',
    'https://www.beurswatcher.nl/beheer/instagram',
    '',
    `Je toegangscode: ${code}`,
    '',
    'Hier kun je kiezen welke Reels je wilt tonen, de volgorde veranderen en de titels op de website aanpassen. Je Instagram-posts zelf blijven hetzelfde.',
    '',
    'De automatische koppeling met Instagram moet ik nog afronden. Tot die tijd kun je alvast werken met de video’s die nu op de website staan. Zodra de koppeling klaarstaat, kun je via dezelfde pagina Instagram verbinden en controleren of alles nog werkt.',
    '',
    'Lukt er iets niet? Laat het mij even weten.',
    '',
  ].join('\n'),
  { flag: 'wx', mode: 0o600 },
);
console.log(
  'Toegang aangemaakt in outputs/instagram-admin. Geheimen en code zijn niet gelogd.',
);
