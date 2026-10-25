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
    'Meta accepteert de appinstellingen niet. Controleer het exacte terugkeeradres bij de website-adressen en de Instagram App ID en App Secret bij je appgegevens. Zie je niet wat afwijkt? Stuur mij een screenshot zonder geheime gegevens of adresbalk.',
  'permission-required':
    'De benodigde toegang ontbreekt. Controleer of @beurswatcher aan de Meta-app is toegevoegd en accepteer een eventuele testeruitnodiging. Geef daarna opnieuw toestemming voor profiel en media.',
  'provider-unavailable':
    'Instagram is tijdelijk niet bereikbaar of beperkt het aantal aanvragen. Probeer later opnieuw. Je appgegevens en Reel-selectie hoef je niet opnieuw in te vullen.',
  'provider-error':
    'Meta heeft de koppeling niet afgerond. De oorzaak is niet vastgesteld. Stuur mij een screenshot van de melding, zonder geheime gegevens of adresbalk.',
  error:
    'De website kon de koppeling niet afronden. De oorzaak is nog niet vastgesteld. Stuur mij een screenshot zonder geheime gegevens of adresbalk; verander je appgegevens niet op goed geluk.',
};

export const instagramHelpProblems = [
  {
    id: 'not-sure',
    label: 'Ik weet niet waar het misgaat',
    advice:
      'Begin bij de status bovenaan. Staat er dat appgegevens ontbreken? Doorloop eerst de instellingen bij Meta. Zijn de appgegevens opgeslagen? Ga naar Instagram verbinden. Weet je niet welk scherm je ziet? Stuur mij een screenshot zonder geheime gegevens of adresbalk.',
  },
  {
    id: 'meta-login',
    label: 'Inloggen of registreren bij Meta lukt niet',
    advice:
      'Open Meta for Developers in een gewone browser. Meta kan registratie, verificatie of tweestapsverificatie vragen. Rond dat bij Meta af met je eigen account. De toegangscode voor deze beheerpagina werkt niet bij Meta. Houdt Meta je tegen? Stuur mij een screenshot zonder geheime gegevens of adresbalk.',
  },
  {
    id: 'wrong-login',
    label: 'Ik zie alleen Facebook Login of Unified Login',
    advice:
      'Controleer welke toepassing je hebt geopend. Deze website gebruikt Instagram API with Instagram Login. De gegevens van Facebook Login of Unified Login kun je hier niet zomaar invullen. Vind je de Instagram-route niet? Stuur mij een screenshot zonder geheime gegevens of adresbalk voordat je andere instellingen kiest.',
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
      'Lees de tekst direct onder de knop. Sla eerst je appgegevens op en klik zo nodig op Instellingen controleren. Ook een nog ingevulde geheime sleutel of niet-opgeslagen Reel-selectie kan het openen tegenhouden. Sla die wijziging eerst bewust op of zet haar terug. Blijft de knop grijs? Stuur mij een screenshot zonder geheime gegevens of adresbalk.',
  },
  {
    id: 'oauth-error',
    label: 'Instagram toont een fout tijdens het verbinden',
    advice:
      'Begin opnieuw via Instagram verbinden op deze beheerpagina, in dezelfde browser. Gebruik geen oude terugkeerlink. Kies @beurswatcher en geef toegang tot profiel en media. De foutmelding bepaalt wat er misgaat; verander geen sleutels op goed geluk. Maak een screenshot van de foutmelding en stuur die naar mij. Laat geheime gegevens en de adresbalk buiten beeld.',
  },
  {
    id: 'no-reels',
    label: 'Er staat verbonden, maar ik zie geen nieuwe Reels',
    advice:
      'Klik op Verbinding controleren en bekijk de controledatum. Kies Nieuwste Reels automatisch als nieuwe video’s vanzelf moeten verschijnen; bij Zelf kiezen moet je ze selecteren en opslaan. Alleen beschikbare video’s worden opgehaald. Blijven recente Reels ontbreken? Stuur mij een screenshot zonder geheime gegevens of adresbalk. Je hoeft niet opnieuw appgegevens in te vullen.',
  },
] as const;

export type InstagramHelpProblem = (typeof instagramHelpProblems)[number]['id'];

export function instagramHelpProblem(value: unknown) {
  return (
    instagramHelpProblems.find((problem) => problem.id === value) ||
    instagramHelpProblems[0]
  );
}
