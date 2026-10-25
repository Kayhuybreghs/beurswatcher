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
import { SetupHelp } from './setup-help';
import { SetupWalkthrough } from './setup-walkthrough';
import type { InstagramNotice } from '../../../lib/instagram-security';

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
  result?: InstagramNotice;
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
  'Begin met je browser en accounts',
  'Maak of open de Instagram-app bij Meta',
  'Voeg @beurswatcher toe aan de app',
  'Vul de website-adressen bij Meta in',
  'Sla je Instagram-appgegevens hier op',
  'Geef toestemming en controleer je Reels',
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
      setMessage('Gekopieerd. Plak dit bij Meta.');
    } catch {
      input.current?.focus();
      input.current?.select();
      setMessage(
        'De tekst is geselecteerd. Kopieer deze via je toetsenbord of het selectiemenu.',
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
  result,
}: Props) {
  const [expanded, setExpanded] = useState(
    !configured || (!!result && result !== 'connected'),
  );
  const [step, setStep] = useState(
    result === 'app-configuration'
      ? 3
      : result === 'permission-required'
        ? 2
        : configured
          ? 5
          : 0,
  );
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
    requestAnimationFrame(() => {
      const heading = document.getElementById(`instagram-setup-step-${next}`);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start', behavior: 'auto' });
    });
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
      chooseStep(5);
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
          <h2 id="setup-heading">Je Instagram aansluiten, stap voor stap.</h2>
          <p>
            Eerst stel je de verbinding bij Meta in. Daarna log je in met
            @beurswatcher en geef je toestemming. Gebruik bij voorkeur een
            laptop en houd deze pagina naast Meta open.
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
        {setup && (
          <ol className={styles.checklist} aria-label="Wat is al geregeld?">
            <li data-ready={setup.available}>
              <span aria-hidden="true">{setup.available ? '✓' : '–'}</span>
              <div>
                <strong>Website-instellingen bereikbaar</strong>
                <small>
                  {setup.available
                    ? 'De beveiligde opslag en de website-adressen zijn beschikbaar.'
                    : 'De website-instellingen moeten eerst worden hersteld.'}
                </small>
              </div>
            </li>
            <li data-ready={ready}>
              <span aria-hidden="true">{ready ? '✓' : '–'}</span>
              <div>
                <strong>
                  {ready
                    ? 'Appgegevens opgeslagen'
                    : 'Meta-appgegevens ontbreken of zijn niet bruikbaar'}
                </strong>
                <small>
                  {ready
                    ? connected
                      ? 'Deze gegevens zijn gebruikt voor de bevestigde verbinding.'
                      : 'De toestemming bij Instagram moet nog bevestigen of de gegevens werken.'
                    : 'Maak de Meta-app aan en sla de appgegevens op. Hoe dat werkt, staat hieronder in stap 1 tot en met 5.'}
                </small>
              </div>
            </li>
            <li data-ready={connected}>
              <span aria-hidden="true">{connected ? '✓' : '–'}</span>
              <div>
                <strong>
                  {connected
                    ? 'Accountverbinding bevestigd'
                    : 'Account nog niet verbonden'}
                </strong>
                <small>
                  {connected
                    ? 'De website heeft de verbinding met @beurswatcher gecontroleerd.'
                    : 'Nieuwe Reels worden pas automatisch opgehaald na een geslaagde verbinding.'}
                </small>
              </div>
            </li>
          </ol>
        )}
        {!ready && !connected && (
          <div className={styles.startChoice}>
            <p>
              <strong>Begin bij stap 1.</strong> Heb je de Instagram App ID en
              App Secret al? Ga dan direct naar stap 5.
            </p>
            <div>
              <button type="button" onClick={() => chooseStep(0)}>
                Begin bij de voorbereiding
              </button>
              <button type="button" onClick={() => chooseStep(4)}>
                Ik heb al appgegevens
              </button>
            </div>
          </div>
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
                  onClick={() => chooseStep(index)}
                  aria-expanded={step === index}
                  aria-controls={`setup-stap-${index}`}
                >
                  <span className={styles.number}>
                    {(index === 4 && setup?.configured) ||
                    (index === 5 && connected) ? (
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
                {index < 3 && (
                  <SetupWalkthrough
                    stage={index}
                    onNext={() => chooseStep(index + 1)}
                  />
                )}
                {index === 3 && (
                  <>
                    <p>
                      Het terugkeeradres brengt je na het inloggen bij Instagram
                      terug naar deze website. Stel dat eerst in bij Meta:
                    </p>
                    <ol className={styles.instructions}>
                      <li>
                        Open{' '}
                        <strong>
                          Instagram → API setup with Instagram login
                        </strong>{' '}
                        in je Meta-app.
                      </li>
                      <li>
                        Zoek <strong>Set up Instagram business login</strong> en
                        klik op <strong>Set up</strong>.
                      </li>
                      <li>
                        Kopieer het terugkeeradres hieronder. Plak het in het
                        venster bij <strong>Redirect URL</strong> en klik op{' '}
                        <strong>Save</strong>.
                      </li>
                      <li>
                        Heb je dit al ingesteld? Open{' '}
                        <strong>Business login settings</strong> en controleer
                        hetzelfde adres bij <strong>OAuth Redirect URIs</strong>
                        .
                      </li>
                    </ol>
                    <p className={styles.notice}>
                      Vraagt een scherm om{' '}
                      <strong>Webhooks Callback URL en Verify token</strong>?
                      Dat is een ander onderdeel. Deze Reel-koppeling gebruikt
                      geen webhooks. Plak het terugkeeradres alleen bij{' '}
                      <strong>OAuth Redirect URI</strong> onder Instagram
                      Business Login. Het hoort ook niet bij Deauthorize
                      Callback.
                    </p>
                    {setup ? (
                      <>
                        <CopyField
                          label="Valid OAuth Redirect URIs"
                          value={setup.redirectUri}
                          help="Bij de eerste inrichting heet het veld Redirect URL. In Business login settings vind je het bij OAuth Redirect URIs. Neem het hele adres over, zonder extra spatie of slash."
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
                      onClick={() => chooseStep(4)}
                    >
                      Adressen opgeslagen? Door naar je appgegevens{' '}
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </>
                )}
                {index === 4 && (
                  <>
                    <p>
                      Open bij Meta{' '}
                      <strong>
                        Instagram → API setup with Instagram login → Set up
                        Instagram business login → Business login settings
                      </strong>
                      . Kopieer daar de <strong>Instagram App ID</strong> en{' '}
                      <strong>Instagram App Secret</strong> naar de twee velden
                      hieronder. Klik daarna op{' '}
                      <strong>Appgegevens veilig opslaan</strong>.
                    </p>
                    <p className={styles.notice}>
                      Dit zijn de gegevens van de Instagram-app, niet je
                      Instagram-wachtwoord, een toegangstoken of het algemene
                      Facebook App ID. Deel de geheime sleutel alleen via het
                      beveiligde veld hieronder.
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
                              setAppId(event.target.value.trim());
                            }}
                            required
                            maxLength={32}
                            onPaste={(event) => {
                              event.preventDefault();
                              edited.current = true;
                              setAppId(
                                event.clipboardData.getData('text').trim(),
                              );
                            }}
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
                              setAppSecret(event.target.value.trim());
                            }}
                            required
                            minLength={32}
                            maxLength={256}
                            onPaste={(event) => {
                              event.preventDefault();
                              edited.current = true;
                              setAppSecret(
                                event.clipboardData.getData('text').trim(),
                              );
                            }}
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
                      Vul beide velden in om te kunnen opslaan. Daarna verbind
                      je Instagram in stap 6; pas dan blijkt of Meta de gegevens
                      accepteert.
                    </p>
                    {setup?.configured && (
                      <button
                        className={styles.next}
                        type="button"
                        onClick={() => chooseStep(5)}
                      >
                        Verder met de opgeslagen app{' '}
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    )}
                  </>
                )}
                {index === 5 && (
                  <>
                    <p>
                      {connected
                        ? 'Instagram is verbonden. Je kunt hieronder bepalen welke Reels op de website staan.'
                        : 'Open Instagram, kies @beurswatcher en geef toegang tot je profiel en video’s. Je logt rechtstreeks bij Instagram in.'}
                    </p>
                    {!connected && (
                      <ol className={styles.instructions}>
                        <li>
                          Klik hieronder op <strong>Instagram verbinden</strong>
                          . De website opent de toestemmingspagina bij
                          Instagram.
                        </li>
                        <li>
                          Log in als <strong>@beurswatcher</strong> en geef de
                          gevraagde toegang tot profiel en media. Gebruik
                          dezelfde browser; kopieer deze tijdelijke link niet
                          naar een andere browser of telefoon.
                        </li>
                        <li>
                          Na toestemming keer je vanzelf hier terug. Controleer
                          of er <strong>Verbonden</strong> staat bij het juiste
                          account en of je echte Reels verschijnen.
                        </li>
                        <li>
                          Kies daarna hieronder welke video’s zichtbaar zijn, of
                          gebruik de automatische selectie. Sla wijzigingen aan
                          de selectie op. Bezoekers bekijken de video’s op de
                          website.
                        </li>
                      </ol>
                    )}
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
                            ? 'Sla eerst je appgegevens op bij stap 5. Heb je dat al gedaan? Controleer dan de instellingen hierboven.'
                            : 'Alleen toegang tot profiel en video’s. Geen toegang tot privéberichten. De website bevestigt de verbinding nadat je terug bent.'}
                    </p>
                    <details className={styles.help}>
                      <summary>
                        Ik kom terug zonder verbinding, of de aanvraag is
                        verlopen
                      </summary>
                      <p>
                        Begin opnieuw met de knop op deze pagina. De
                        toestemmingsaanvraag is tien minuten geldig en hoort bij
                        de browser waarin je begon. Gebruik geen oude
                        terugkeerlink. Bij ‘Meldingen tijdens het koppelen’
                        onderaan vind je per melding wat je moet controleren.
                      </p>
                    </details>
                    {!ready && (
                      <button
                        className={styles.next}
                        type="button"
                        onClick={() => chooseStep(4)}
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
        <SetupHelp />
      </div>
    </section>
  );
}
