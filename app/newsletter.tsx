'use client';
import Link from './site-link';
import { useState, useId } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export function Newsletter({
  context = 'general',
  variant = 'feature',
}: {
  context?: string;
  variant?: 'feature' | 'compact';
}) {
  const content: Record<string, [string, string, string]> = {
    general: [
      'NIEUWSBRIEF IN VOORBEREIDING',
      'Artikelen en tools straks per e-mail.',
      'Meld je aan voor de toekomstige nieuwsbrief over beleggen en geldzaken. Er worden nu nog geen e-mails verstuurd.',
    ],
    market: [
      'NIEUWSBRIEF IN VOORBEREIDING',
      'Meer uitleg over de economie.',
      'De toekomstige nieuwsbrief bevat uitleg en artikelen van Beurswatcher. Je kunt je alvast aanmelden; de verzending is nog niet gestart.',
    ],
    tools: [
      'NIEUWSBRIEF IN VOORBEREIDING',
      'Uitleg bij financiële berekeningen.',
      'Meld je aan voor toekomstige artikelen en tooluitleg per e-mail. Er worden nu nog geen e-mails verstuurd.',
    ],
    education: [
      'NIEUWSBRIEF IN VOORBEREIDING',
      'Artikelen over beleggen en geldzaken.',
      'Meld je alvast aan voor de toekomstige nieuwsbrief van Beurswatcher. De verzending is nog niet gestart.',
    ],
    events: [
      'NIEUWSBRIEF IN VOORBEREIDING',
      'Nieuws van Beurswatcher per e-mail.',
      'Je kunt je alvast aanmelden voor de toekomstige nieuwsbrief. Er worden nu nog geen e-mails verstuurd.',
    ],
  };
  const copy = content[context] || content.general;
  const [email, setEmail] = useState(''),
    [consent, setConsent] = useState(false),
    [state, setState] = useState('idle'),
    [message, setMessage] = useState(''),
    [unsubscribe, setUnsubscribe] = useState('');
  const uid = useId();
  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setMessage(
        'Geef toestemming om je e-mailadres voor de nieuwsbrief te bewaren.',
      );
      return;
    }
    setState('loading');
    try {
      const r = await fetch('/api/nieuwsbrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent }),
      });
      if (!r.ok) throw Error();
      const result = (await r.json()) as { unsubscribeToken?: string | null };
      if (result.unsubscribeToken)
        setUnsubscribe(
          '/afmelden?token=' + encodeURIComponent(result.unsubscribeToken),
        );
      setState('success');
      setMessage(
        'Je aanmelding is opgeslagen. Je ontvangt nog geen e-mail: de nieuwsbrief start zodra de verzending is ingericht.',
      );
    } catch {
      setState('error');
      setMessage('Opslaan is nu niet gelukt. Probeer het later opnieuw.');
    }
  }
  return (
    <section className={'newsletter newsletter-' + variant} data-reveal="clip">
      <div>
        <p className="eyebrow">{copy[0]}</p>
        <h2>{copy[1]}</h2>
        <p>{copy[2]}</p>
      </div>
      <form onSubmit={submit}>
        <label htmlFor={uid}>Jouw e-mailadres</label>
        <div className="email-row">
          <input
            id={uid}
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@voorbeeld.nl"
            disabled={state === 'success'}
          />
          <button
            className="button yellow"
            disabled={state === 'loading' || state === 'success'}
          >
            {state === 'loading'
              ? 'Opslaan…'
              : state === 'success'
                ? 'Aangemeld'
                : 'Aanmelden'}
            {state === 'success' ? (
              <Check size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </button>
        </div>
        <label className="consent" htmlFor={uid + '-consent'}>
          <Checkbox
            id={uid + '-consent'}
            aria-label="Toestemming voor de nieuwsbrief"
            checked={consent}
            onCheckedChange={(v) => setConsent(Boolean(v))}
            disabled={state === 'success'}
          />
          Ik geef toestemming om mijn e-mailadres voor de nieuwsbrief te
          bewaren.
        </label>
        <p className="subtle">
          Gratis. Je kunt je gegevens later laten verwijderen via de
          afmeldpagina. <Link href="/privacy">Privacy</Link>
        </p>
        <output className="form-status">{message}</output>
        {unsubscribe && (
          <p className="subtle">
            <Link href={unsubscribe}>Bewaar je persoonlijke afmeldlink</Link>
          </p>
        )}
      </form>
    </section>
  );
}
