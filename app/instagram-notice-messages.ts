import type { InstagramNotice } from '../lib/instagram-security';

// Only controlled categories reach the client. Never display raw Meta errors,
// OAuth URLs, authorization codes, tokens or app credentials in help messages.
export const instagramCallbackMessages: Partial<
  Record<InstagramNotice, string>
> = {
  cancelled:
    'Je hebt geen toestemming gegeven bij Instagram. Open Instagram opnieuw om de koppeling af te maken.',
  'wrong-account':
    'Er werd een ander Instagram-account gekozen. Verbind opnieuw en kies @beurswatcher.',
  expired:
    'De aanvraag is verlopen. Start opnieuw vanaf deze beheerpagina; gebruik geen oude terugkeerlink.',
  'app-configuration':
    'Meta accepteert de appinstellingen niet. Controleer de Instagram App ID, App Secret en het exacte terugkeeradres bij stap 2 en 3. Kopieer het hulpbericht als je niet ziet wat afwijkt.',
  'permission-required':
    'De benodigde toegang ontbreekt. Controleer of @beurswatcher aan de Meta-app is toegevoegd en accepteer een eventuele testeruitnodiging. Geef daarna opnieuw toestemming voor profiel en media.',
  'provider-unavailable':
    'Instagram is tijdelijk niet bereikbaar of beperkt het aantal aanvragen. Probeer later opnieuw. Je appgegevens en Reel-selectie hoef je niet opnieuw in te vullen.',
  'provider-error':
    'Meta heeft de koppeling niet afgerond. De oorzaak is niet vastgesteld. Kopieer het hulpbericht hieronder en voeg toe welke melding je bij Meta ziet.',
  error:
    'De website kon de koppeling niet afronden. De oorzaak is nog niet vastgesteld. Kopieer het hulpbericht hieronder; verander je appgegevens niet op goed geluk.',
};

export function instagramHelpMessage({
  step,
  configured,
  connected,
  setupAvailable,
  result,
}: {
  step: string;
  configured: boolean;
  connected: boolean;
  setupAvailable: boolean | null;
  result?: InstagramNotice;
}) {
  const status = connected
    ? 'De accountverbinding is bevestigd.'
    : configured
      ? 'De appgegevens zijn opgeslagen, maar de accountverbinding is nog niet bevestigd.'
      : setupAvailable === true
        ? 'De website-instellingen zijn bereikbaar. Bruikbare Meta-appgegevens ontbreken nog.'
        : 'De website-instellingen zijn nog niet beschikbaar of niet geladen.';
  return [
    'Hoi, ik kom niet verder met Instagram koppelen aan Beurswatcher.',
    'Pagina: https://www.beurswatcher.nl/beheer/instagram',
    `Status: ${status}`,
    `Geopende stap: ${step}.`,
    ...(!connected && result && result !== 'connected'
      ? [`Melding: ${instagramCallbackMessages[result]}`]
      : []),
    '',
    'Ik zie bij Meta: [vul hier zelf de melding of stap in].',
  ].join('\n');
}
