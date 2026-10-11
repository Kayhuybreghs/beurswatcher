'use client';

import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import styles from './setup.module.css';

type Setup = {
  available: boolean;
  configured: boolean;
  source: 'environment' | 'saved' | 'none';
  appId: string | null;
  revision: string | null;
  redirectUri: string;
  privacyUri: string;
  username: string;
  locked: boolean;
  message: string;
};
type Feedback = { kind: 'error' | 'success' | 'info'; text: string } | null;
type Props = {
  configured: boolean;
  connected: boolean;
  busy: boolean;
  hasUnsavedChanges: boolean;
  onStartSave: () => boolean;
  onFinishSave: () => void;
  onCheck: () => Promise<void>;
  onConnect: () => Promise<void>;
};

function isSetup(value: unknown): value is Setup {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Setup>;
  return (
    typeof item.available === 'boolean' &&
    typeof item.configured === 'boolean' &&
    ['environment', 'saved', 'none'].includes(item.source || '') &&
    (item.appId === null || typeof item.appId === 'string') &&
    (item.revision === null || typeof item.revision === 'string') &&
    typeof item.redirectUri === 'string' &&
    typeof item.privacyUri === 'string' &&
    item.username === 'beurswatcher' &&
    typeof item.locked === 'boolean' &&
    typeof item.message === 'string'
  );
}

const stepTitles = [
  'Open je app bij Meta',
  'Vul de website-adressen in',
  'Sla je appgegevens veilig op',
  'Geef toestemming in Instagram',
];

function CopyField({
  label,
  value,
  help,
}: {
  label: string;
  value: string;
  help: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setMessage('Gekopieerd. Plak dit adres bij Meta.');
    } catch {
      input.current?.focus();
      input.current?.select();
      setMessage(
        'Het adres is geselecteerd. Kopieer het via je toetsenbord of het selectiemenu.',
      );
    }
  }
  return (
    <div className={styles.copyField}>
      <label>
        <span>{label}</span>
        <input
          ref={input}
          value={value}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
        />
      </label>
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={`${label} kopiëren`}
      >
        <Copy size={16} aria-hidden="true" />
        <span>Kopieer</span>
      </button>
      <p>{help}</p>
      <output className={styles.copyStatus}>{message}</output>
    </div>
  );
}

export default function SetupPanel({
  configured,
  connected,
  busy,
  hasUnsavedChanges,
  onStartSave,
  onFinishSave,
  onCheck,
  onConnect,
}: Props) {
  const [expanded, setExpanded] = useState(!configured);
  const [step, setStep] = useState(configured ? 3 : 0);
  const [setup, setSetup] = useState<Setup | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [confirmChange, setConfirmChange] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const edited = useRef(false);
  const pending = useRef(false);

  function chooseStep(next: number) {
    setStep(next);
    requestAnimationFrame(() =>
      document.getElementById(`instagram-setup-step-${next}`)?.focus(),
    );
  }

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/api/instagram/admin/setup', {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(20000),
          ]),
        });
        if (response.status === 401) {
          setSessionExpired(true);
          setFeedback({
            kind: 'error',
            text: 'Je sessie is verlopen. Log opnieuw in via een ander tabblad en controleer daarna de instellingen. Je invoer op deze pagina blijft staan.',
          });
          return;
        }
        const value: unknown = await response.json();
        if (!response.ok || !isSetup(value))
          throw new Error('Setup unavailable');
        setSetup(value);
        if (!edited.current) setAppId(value.appId || '');
      } catch {
        if (!controller.signal.aborted)
          setFeedback({
            kind: 'error',
            text: 'De instellingen konden niet worden geladen. Probeer hieronder opnieuw. Je Reel-selectie is niet veranderd.',
          });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!appSecret && (!setup || appId === (setup.appId || ''))) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [appId, appSecret, setup]);

  async function reload() {
    if (pending.current || busy) return;
    pending.current = true;
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch('/api/instagram/admin/setup', {
        cache: 'no-store',
        credentials: 'same-origin',
        signal: AbortSignal.timeout(20000),
      });
      if (response.status === 401) {
        setSessionExpired(true);
        setFeedback({
          kind: 'error',
          text: 'Je sessie is verlopen. Log opnieuw in via een ander tabblad. Je invoer, Reel-selectie en titels blijven hier staan.',
        });
        return;
      }
      const value: unknown = await response.json();
      if (!response.ok || !isSetup(value)) throw new Error('Setup unavailable');
      setSetup(value);
      setSessionExpired(false);
      setConfirmChange(false);
      if (!edited.current) setAppId(value.appId || '');
      setFeedback({
        kind: 'info',
        text: value.configured
          ? 'Er zijn appgegevens opgeslagen. Verbinden met Instagram bevestigt of ze werken.'
          : value.message,
      });
      await onCheck();
    } catch {
      setFeedback({
        kind: 'error',
        text: 'Controleren is niet gelukt. Probeer het opnieuw. Je ingevulde gegevens en Reel-selectie zijn niet veranderd.',
      });
    } finally {
      setLoading(false);
      pending.current = false;
    }
  }

  async function save(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{1,32}$/.test(appId) || !/^[\x21-\x7e]{32,256}$/.test(appSecret)) {
      setFeedback({
        kind: 'error',
        text: 'Gebruik een App ID van maximaal 32 cijfers en een App Secret van 32 tot 256 tekens, zonder spaties. Kopieer de Instagram-appgegevens opnieuw bij Meta.',
      });
      return;
    }
    if (
      !setup ||
      setup.locked ||
      !setup.available ||
      connected ||
      pending.current ||
      !onStartSave()
    )
      return;
    pending.current = true;
    setSaving(true);
    setFeedback(null);
    let saved = false;
    try {
      const response = await fetch('/api/instagram/admin/setup', {
        method: 'PUT',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId,
          appSecret,
          revision: setup.revision,
          ...(confirmChange ? { confirmChange: true } : {}),
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (response.status === 401) {
        setSessionExpired(true);
        setFeedback({
          kind: 'error',
          text: 'Je sessie is verlopen. De appgegevens zijn niet opgeslagen. Log opnieuw in via een ander tabblad; je invoer blijft hier staan.',
        });
        return;
      }
      const value: unknown = await response.json();
      if (!response.ok) {
        const code =
          value && typeof value === 'object' && 'code' in value
            ? value.code
            : '';
        const message =
          code === 'active-connection'
            ? 'Er is een actieve Instagram-koppeling. De appgegevens kunnen daarom niet worden vervangen.'
            : code === 'environment-managed'
              ? 'Deze app is al via de website-instellingen ingesteld en kan hier niet worden vervangen.'
              : code === 'confirmation-required'
                ? 'Bevestig eerst dat je de bestaande appgegevens wilt vervangen.'
                : response.status === 409
                  ? 'De instellingen zijn intussen gewijzigd. Controleer ze opnieuw en bevestig daarna je wijziging. Je invoer blijft staan.'
                  : response.status === 400
                    ? 'Controleer de Instagram App ID en Instagram App Secret. Kopieer beide uit de Instagram-instellingen van je Meta-app.'
                    : 'Opslaan lukt nu niet. Je gegevens staan hier nog. Probeer het opnieuw.';
        setFeedback({ kind: 'error', text: message });
        return;
      }
      if (!isSetup(value)) throw new Error('Invalid setup response');
      setSetup(value);
      setAppId(value.appId || '');
      setAppSecret('');
      edited.current = false;
      setConfirmChange(false);
      setSessionExpired(false);
      chooseStep(3);
      setFeedback({
        kind: 'success',
        text: 'Je appgegevens zijn opgeslagen en het geheime veld is leeggemaakt. Geef nu toestemming in Instagram. Pas daarna kan de verbinding worden bevestigd.',
      });
      saved = true;
    } catch {
      setFeedback({
        kind: 'error',
        text: 'De bevestiging van het opslaan is niet ontvangen. Controleer eerst de instellingen voordat je opnieuw opslaat. Je invoer blijft hier staan.',
      });
    } finally {
      pending.current = false;
      setSaving(false);
      onFinishSave();
    }
    if (saved) await onCheck();
  }

  const canEdit = !!setup?.available && !setup.locked && !connected;
  const ready = configured && !!setup?.configured;
  return (
    <section
      className={styles.panel}
      id="instagram-setup"
      aria-labelledby="setup-heading"
    >
      <div className={styles.heading}>
        <div>
          <span className={styles.kicker}>Eenmalige instelling</span>
          <h2 id="setup-heading">Zelf je Instagram koppelen.</h2>
          <p>
            Open je Meta-app, vul de gegevens hieronder in en geef Instagram
            toestemming. De stappen bij Meta doe je in een apart tabblad.
          </p>
        </div>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls="setup-stappen"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Stappen sluiten' : 'Bekijk de instellingen'}
          <ChevronDown size={17} aria-hidden="true" />
        </button>
      </div>
      <div id="setup-stappen" className={styles.body} hidden={!expanded}>
        <div className={styles.statusRow}>
          <span>
            <ShieldCheck size={15} aria-hidden="true" /> Alleen zichtbaar na
            inloggen
          </span>
          <button
            type="button"
            onClick={() => void reload()}
            disabled={busy || loading || saving}
          >
            <RefreshCw
              size={14}
              className={loading ? styles.spinner : ''}
              aria-hidden="true"
            />
            {loading ? 'Laden…' : 'Instellingen controleren'}
          </button>
        </div>
        {feedback && (
          <div
            className={`${styles.feedback} ${styles[feedback.kind]}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <p>{feedback.text}</p>
            {sessionExpired && (
              <a
                href="/beheer/instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                Opnieuw inloggen in een ander tabblad{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
        {setup && (!setup.available || setup.locked) && (
          <p className={styles.notice}>{setup.message}</p>
        )}
        <div className={styles.steps}>
          {stepTitles.map((title, index) => (
            <section
              key={title}
              className={`${styles.step} ${step === index ? styles.active : ''}`}
            >
              <h3>
                <button
                  type="button"
                  id={`instagram-setup-step-${index}`}
                  onClick={() => setStep(index)}
                  aria-expanded={step === index}
                  aria-controls={`setup-stap-${index}`}
                >
                  <span className={styles.number}>
                    {(index === 2 && setup?.configured) ||
                    (index === 3 && connected) ? (
                      <Check size={16} aria-label="Gereed" />
                    ) : (
                      String(index + 1).padStart(2, '0')
                    )}
                  </span>
                  <span>{title}</span>
                  <ChevronDown size={17} aria-hidden="true" />
                </button>
              </h3>
              <div
                className={styles.stepBody}
                id={`setup-stap-${index}`}
                hidden={step !== index}
              >
                {index === 0 && (
                  <>
                    <p>
                      Gebruik het Meta-account waarmee je de Beurswatcher-app
                      beheert. Maak een app aan of open de bestaande app en voeg{' '}
                      <strong>Instagram API met Instagram Login</strong> toe.
                    </p>
                    <ul>
                      <li>
                        @beurswatcher moet een professioneel Instagram-account
                        zijn: <strong>Creator of Business</strong>.
                      </li>
                      <li>
                        Gebruik de instellingen voor{' '}
                        <strong>Instagram Login</strong>. Voor deze koppeling
                        hoeft geen Facebook-pagina aan Instagram gekoppeld te
                        zijn.
                      </li>
                    </ul>
                    <a
                      className={styles.primaryButton}
                      href="https://developers.facebook.com/apps/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Meta for Developers{' '}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                    <details className={styles.help}>
                      <summary>
                        Als Meta om een tester of beoordeling vraagt
                      </summary>
                      <p>
                        Bij een app in ontwikkelmodus kan een beheerder-,
                        ontwikkelaar- of testerrol nodig zijn. Voeg het juiste
                        account toe en accepteer een eventuele
                        Instagram-testeruitnodiging. Meta kan extra verificatie
                        of een appbeoordeling vragen; deze website kan die niet
                        voor je afronden.
                      </p>
                    </details>
                    <button
                      type="button"
                      className={styles.next}
                      onClick={() => chooseStep(1)}
                    >
                      Door naar de website-adressen{' '}
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </>
                )}
                {index === 1 && (
                  <>
                    <p>
                      Neem de onderstaande adressen exact over en sla de
                      instellingen bij Meta op. Het terugkeeradres brengt je na
                      toestemming terug naar deze website.
                    </p>
                    {setup ? (
                      <>
                        <CopyField
                          label="Valid OAuth Redirect URIs"
                          value={setup.redirectUri}
                          help="Plak dit bij de instellingen voor Instagram Login / Business login. Dit is geen webhook-adres."
                        />
                        <CopyField
                          label="Privacy Policy URL"
                          value={setup.privacyUri}
                          help="Plak dit bij de basisinstellingen van de Meta-app, in het veld voor het privacybeleid."
                        />
                        <CopyField
                          label="User data deletion · instructions URL"
                          value={`${setup.privacyUri}#instagram`}
                          help="Kies bij User data deletion voor een URL met verwijderinstructies en plak dit adres. Dit is een uitlegpagina voor een verwijderverzoek, geen automatische callback."
                        />
                      </>
                    ) : (
                      <p className={styles.notice}>
                        De exacte website-adressen verschijnen zodra de
                        instellingen zijn geladen. Gebruik de controleknop
                        hierboven.
                      </p>
                    )}
                    <button
                      type="button"
                      className={styles.next}
                      onClick={() => chooseStep(2)}
                    >
                      Door naar je appgegevens{' '}
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </>
                )}
                {index === 2 && (
                  <>
                    <p>
                      Open bij Meta de instellingen voor{' '}
                      <strong>Instagram API met Instagram Login</strong>.
                      Kopieer daar de <strong>Instagram App ID</strong> en{' '}
                      <strong>Instagram App Secret</strong>. Gebruik het App ID
                      uit het Instagram-product, niet het algemene Facebook App
                      ID uit de basisinstellingen.
                    </p>
                    <p className={styles.notice}>
                      Dit zijn de gegevens van de Instagram-app, niet je
                      Instagram-wachtwoord of een toegangstoken.
                    </p>
                    {connected ? (
                      <p className={styles.notice}>
                        Je account is verbonden. De appgegevens zijn daarom
                        beveiligd tegen vervangen.
                      </p>
                    ) : null}
                    <form onSubmit={save} autoComplete="off">
                      <fieldset
                        disabled={!canEdit || busy || loading || saving}
                        className={styles.fields}
                      >
                        <label htmlFor="instagram-app-id">
                          Instagram App ID
                          <input
                            id="instagram-app-id"
                            name="instagramAppId"
                            inputMode="numeric"
                            type="text"
                            autoComplete="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            value={appId}
                            onChange={(event) => {
                              edited.current = true;
                              setAppId(event.target.value);
                            }}
                            required
                            maxLength={32}
                            pattern="[0-9]{1,32}"
                          />
                        </label>
                        <label htmlFor="instagram-app-secret">
                          Instagram App Secret
                          <input
                            id="instagram-app-secret"
                            name="instagramAppSecret"
                            type="password"
                            autoComplete="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            value={appSecret}
                            onChange={(event) => {
                              edited.current = true;
                              setAppSecret(event.target.value);
                            }}
                            required
                            minLength={32}
                            maxLength={256}
                            aria-describedby="secret-help"
                          />
                        </label>
                        <p id="secret-help" className={styles.fieldHelp}>
                          <LockKeyhole size={14} aria-hidden="true" /> De
                          sleutel wordt versleuteld opgeslagen en daarna niet
                          meer getoond. Deel hem niet per mail of WhatsApp.
                        </p>
                        {setup?.revision && (
                          <label className={styles.confirm}>
                            <input
                              type="checkbox"
                              checked={confirmChange}
                              onChange={(event) =>
                                setConfirmChange(event.target.checked)
                              }
                              required
                            />
                            <span>
                              Ik wil de bestaande appgegevens vervangen door
                              deze nieuwe gegevens.
                            </span>
                          </label>
                        )}
                        <button
                          className={styles.primaryButton}
                          type="submit"
                          disabled={
                            !appId.trim() ||
                            !appSecret.trim() ||
                            (!!setup?.revision && !confirmChange)
                          }
                        >
                          {saving ? (
                            <LoaderCircle
                              size={17}
                              className={styles.spinner}
                              aria-hidden="true"
                            />
                          ) : (
                            <KeyRound size={17} aria-hidden="true" />
                          )}
                          {saving
                            ? 'Veilig opslaan…'
                            : 'Appgegevens veilig opslaan'}
                        </button>
                      </fieldset>
                    </form>
                    <p className={styles.fieldHelp}>
                      Opslaan controleert het formaat. Of de gegevens werken,
                      blijkt bij het verbinden in de volgende stap.
                    </p>
                    {setup?.configured && (
                      <button
                        className={styles.next}
                        type="button"
                        onClick={() => chooseStep(3)}
                      >
                        Verder met de opgeslagen app{' '}
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    )}
                  </>
                )}
                {index === 3 && (
                  <>
                    <p>
                      {connected
                        ? 'Instagram is verbonden. Je kunt hieronder bepalen welke Reels op de website staan.'
                        : 'Open Instagram, kies @beurswatcher en geef toegang tot je profiel en video’s. Je logt rechtstreeks bij Instagram in.'}
                    </p>
                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={() => void onConnect()}
                      disabled={
                        !ready ||
                        busy ||
                        saving ||
                        hasUnsavedChanges ||
                        !!appSecret
                      }
                    >
                      {busy ? (
                        <LoaderCircle
                          size={17}
                          className={styles.spinner}
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpRight size={17} aria-hidden="true" />
                      )}
                      {connected
                        ? 'Instagram opnieuw verbinden'
                        : 'Instagram verbinden'}
                    </button>
                    <p className={styles.fieldHelp}>
                      {hasUnsavedChanges
                        ? 'Sla eerst je gewijzigde Reel-selectie en titels op voordat je Instagram opent.'
                        : appSecret
                          ? 'Je hebt nog appgegevens ingevuld. Sla ze eerst op voordat je Instagram opent.'
                          : !ready
                            ? 'Sla eerst je appgegevens op bij stap 3. Heb je dat al gedaan? Controleer dan de instellingen hierboven.'
                            : 'Alleen toegang tot profiel en video’s. Geen toegang tot privéberichten. De website bevestigt de verbinding nadat je terug bent.'}
                    </p>
                    {!ready && (
                      <button
                        className={styles.next}
                        type="button"
                        onClick={() => chooseStep(2)}
                      >
                        Naar de appgegevens{' '}
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
