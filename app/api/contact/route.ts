import { execute, payload, validEmail, response } from '../../../db/server';
export async function POST(request: Request) {
  let data;
  try {
    data = await payload(request);
  } catch {
    return response({ error: 'Ongeldig verzoek' }, 400);
  }
  if (
    !validEmail(data.email) ||
    typeof data.name !== 'string' ||
    data.name.trim().length < 1 ||
    data.name.length > 100 ||
    typeof data.message !== 'string' ||
    data.message.trim().length < 10 ||
    data.message.length > 4000 ||
    (data.type !== undefined && !['business', 'general'].includes(data.type)) ||
    (data.type === 'business' &&
      (typeof data.company !== 'string' ||
        !data.company.trim() ||
        data.company.length > 150 ||
        typeof data.interest !== 'string' ||
        ![
          'Kennismaken',
          'Reels & social',
          'Inhoudelijke campagne',
          'Website & affiliate',
          'Event',
          'Maatwerk',
        ].includes(data.interest)))
  )
    return response({ error: 'Controleer je gegevens' }, 400);
  try {
    await execute(
      'INSERT INTO messages (id,name,email,message,created_at) VALUES (?,?,?,?,?)',
      [
        crypto.randomUUID(),
        data.name.trim(),
        data.email.trim().toLowerCase(),
        data.type === 'business'
          ? `[ZAKELIJKE SAMENWERKING]\nBedrijf: ${data.company.trim()}\nInteresse: ${data.interest}\n\n${data.message.trim()}`
          : data.message.trim(),
        Date.now(),
      ],
    );
    return response({ ok: true });
  } catch {
    return response({ error: 'Opslaan is tijdelijk niet beschikbaar' }, 503);
  }
}
