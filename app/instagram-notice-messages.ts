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
    'Meta accepteert de appinstellingen niet. Vergelijk het terugkeeradres in Meta met het adres bij stap 4. Controleer bij stap 5 of de Instagram App ID en App Secret uit dezelfde Meta-app komen. Sla een correctie op en probeer daarna opnieuw te verbinden.',
  'permission-required':
    'De benodigde toegang ontbreekt. Controleer of @beurswatcher aan de Meta-app is toegevoegd en accepteer een eventuele testeruitnodiging. Geef daarna opnieuw toestemming voor profiel en media.',
  'provider-unavailable':
    'Instagram is tijdelijk niet bereikbaar of beperkt het aantal aanvragen. Probeer later opnieuw. Je appgegevens en Reel-selectie hoef je niet opnieuw in te vullen.',
  'provider-error':
    'Meta heeft de koppeling niet afgerond. De oorzaak is niet vastgesteld. Start opnieuw via Instagram verbinden op deze pagina, kies @beurswatcher en controleer de gevraagde toegang tot profiel en media.',
  error:
    'De website kon de koppeling niet afronden. De oorzaak is nog niet vastgesteld. Klik op Instellingen controleren en start daarna opnieuw via Instagram verbinden. Gebruik dezelfde browser en geen oude terugkeerlink.',
};

export const instagramHelpProblems = [
  {
    id: 'not-sure',
    label: 'Ik weet niet waar het misgaat',
    advice:
      'Lees de status bovenaan. Ontbreken de appgegevens? Doorloop stap 1 tot en met 5. Zijn ze opgeslagen? Open stap 6 en klik op Instagram verbinden. Staat er Verbonden? Controleer de opgehaalde Reels en kies welke op de website mogen staan.',
  },
  {
    id: 'meta-login',
    label: 'Inloggen of registreren bij Meta lukt niet',
    advice:
      'Open Meta for Developers in Chrome, Safari of Edge en log in met je eigen Facebook-account. Rond de registratie en eventuele telefoon-, e-mail- of tweestapsverificatie bij Meta af. Gebruik je Facebook-wachtwoord; de toegangscode voor deze beheerpagina hoort alleen bij Beurswatcher.',
  },
  {
    id: 'wrong-login',
    label: 'Ik zie alleen Facebook Login of Unified Login',
    advice:
      'Ga terug naar het overzicht van je Meta-app en open Instagram → API setup with Instagram login. Deze website gebruikt die route. Facebook Login en Unified Login gebruiken andere instellingen. Controleer de app-inrichting uit stap 2 voordat je appgegevens invult.',
  },
  {
    id: 'account-missing',
    label: 'Mijn account of testeruitnodiging ontbreekt',
    advice:
      'Controleer of je bent ingelogd bij @beurswatcher en of dit een Creator- of Business-account is. Voeg dit account toe aan de Instagram-instellingen van de Meta-app. Vraagt Meta om een testeruitnodiging? Die moet ook in het juiste Instagram-account worden geaccepteerd; versturen alleen is niet genoeg.',
  },
  {
    id: 'webhooks',
    label: 'Meta vraagt om Callback URL en Verify token',
    advice:
      'De combinatie Callback URL en Verify token hoort bij Webhooks. Voor het ophalen van je Reels stel je hier geen webhook in. Ga naar de Instagram business-logininstellingen en zoek Valid OAuth Redirect URIs. Daar plak je het terugkeeradres uit de stap met website-adressen. Verzin geen Verify token.',
  },
  {
    id: 'app-credentials',
    label: 'Ik vind de Instagram App ID of App Secret niet',
    advice:
      'Open in je Meta-app: Instagram → API setup with Instagram login → Set up Instagram business login → Business login settings. Zoek de Instagram App ID en Instagram App Secret. Het algemene Facebook App ID en een gegenereerd access token zijn andere gegevens. Deel de geheime sleutel alleen via het beveiligde veld op deze pagina.',
  },
  {
    id: 'connect-disabled',
    label: 'De knop Instagram verbinden is grijs',
    advice:
      'Lees de tekst direct onder de knop. Sla eerst je appgegevens op en klik op Instellingen controleren. Staat er nog een geheime sleutel in het invulveld of heb je de Reel-selectie gewijzigd? Sla die wijziging op of zet haar terug. Controleer daarna opnieuw de tekst onder Instagram verbinden.',
  },
  {
    id: 'oauth-error',
    label: 'Instagram toont een fout tijdens het verbinden',
    advice:
      'Begin opnieuw via Instagram verbinden op deze beheerpagina, in dezelfde browser. Kies @beurswatcher en geef toegang tot profiel en media. Gaat de melding over een terugkeeradres? Controleer stap 4. Gaat ze over accounttoegang? Controleer bij stap 3 of het account is toegevoegd en de uitnodiging is geaccepteerd.',
  },
  {
    id: 'no-reels',
    label: 'Er staat verbonden, maar ik zie geen nieuwe Reels',
    advice:
      'Klik op Verbinding controleren en bekijk de controledatum en gebruikersnaam. Kies Nieuwste Reels automatisch als nieuwe video’s vanzelf moeten verschijnen. Bij Zelf kiezen selecteer je de video’s en sla je ze op. Herlaad daarna de website. Alleen beschikbare video’s worden opgehaald; je appgegevens hoef je hiervoor niet opnieuw in te vullen.',
  },
] as const;

export type InstagramHelpProblem = (typeof instagramHelpProblems)[number]['id'];

export function instagramHelpProblem(value: unknown) {
  return (
    instagramHelpProblems.find((problem) => problem.id === value) ||
    instagramHelpProblems[0]
  );
}
