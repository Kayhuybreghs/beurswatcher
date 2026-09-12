import {
  execute,
  payload,
  validEmail,
  hash,
  response,
} from '../../../db/server';
export async function POST(request: Request) {
  let data;
  try {
    data = await payload(request);
  } catch {
    return response({ error: 'Ongeldig verzoek' }, 400);
  }
  if (!validEmail(data.email) || data.consent !== true)
    return response(
      { error: 'E-mailadres en toestemming zijn verplicht' },
      400,
    );
  try {
    const email = data.email.trim().toLowerCase(),
      token = crypto.randomUUID() + crypto.randomUUID(),
      tokenHash = await hash(token);
    const result = await execute(
      'INSERT INTO subscribers (email,token_hash,created_at,consent_version) VALUES (?,?,?,?) ON CONFLICT(email) DO NOTHING',
      [email, tokenHash, Date.now(), '2026-09-07'],
    );
    return response({
      ok: true,
      unsubscribeToken: result.rowsAffected ? token : null,
    });
  } catch {
    return response({ error: 'Opslaan is tijdelijk niet beschikbaar' }, 503);
  }
}
export async function DELETE(request: Request) {
  let data;
  try {
    data = await payload(request);
  } catch {
    return response({ error: 'Ongeldig verzoek' }, 400);
  }
  if (
    !validEmail(data.email) ||
    typeof data.token !== 'string' ||
    data.token.length < 32 ||
    data.token.length > 100
  )
    return response({ error: 'Gebruik je persoonlijke afmeldlink' }, 400);
  try {
    const result = await execute(
      'DELETE FROM subscribers WHERE email = ? AND token_hash = ?',
      [data.email.trim().toLowerCase(), await hash(data.token)],
    );
    return result.rowsAffected
      ? response({ ok: true })
      : response({ error: 'Ongeldige afmeldgegevens' }, 400);
  } catch {
    return response(
      { error: 'Verwijderen is tijdelijk niet beschikbaar' },
      503,
    );
  }
}
