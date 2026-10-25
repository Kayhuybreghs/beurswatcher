// These are website-side errors before Instagram opens. Never display an
// upstream error, credential, authorization URL or arbitrary API message.
const failures = {
  'session-expired': {
    status: 401,
    error:
      'Log opnieuw in op deze beheerpagina en klik daarna opnieuw op Instagram verbinden.',
  },
  'wrong-origin': {
    status: 403,
    error:
      'Open https://www.beurswatcher.nl/beheer/instagram in dezelfde browser en start het verbinden daar opnieuw.',
  },
  'setup-unavailable': {
    status: 503,
    error:
      'De website kan de appinstellingen nu niet gebruiken. Klik op Instellingen controleren. Ontbreken de appgegevens? Vul die bij stap 5 in en sla ze op. Zijn ze al opgeslagen? Probeer de controle later opnieuw; vul niet zonder reden andere appgegevens in.',
  },
  'start-unavailable': {
    status: 503,
    error:
      'De website kon de verbinding niet starten. Instagram is nog niet geopend. Klik opnieuw op Instagram verbinden. Blijft deze melding staan? Herlaad de beheerpagina en probeer het later nog eens. Je opgeslagen appgegevens en Reel-selectie blijven bewaard.',
  },
} as const;

export type InstagramConnectFailure = keyof typeof failures;

export function instagramConnectFailure(code: InstagramConnectFailure) {
  const { status, error } = failures[code];
  return { status, body: { code, error } };
}

export function instagramConnectErrorMessage(status: number, body: unknown) {
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const code = (body as Record<string, unknown>).code;
    if (typeof code === 'string' && Object.hasOwn(failures, code)) {
      const known = failures[code as InstagramConnectFailure];
      if (known.status === status) return known.error;
    }
  }
  return 'Instagram openen is niet gelukt. De oorzaak is nog niet vastgesteld. Start opnieuw via Instagram verbinden op deze pagina. Blijft deze melding staan? Herlaad de beheerpagina en probeer het later nog eens. Je hoeft hiervoor geen andere appgegevens in te vullen.';
}
