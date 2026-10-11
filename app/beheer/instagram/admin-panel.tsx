'use client';

/* oxlint-disable next/no-img-element -- Instagram thumbnails come from the authenticated, validated media feed. */
import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Camera,
  Check,
  CircleCheck,
  Clock3,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Save,
  ShieldCheck,
} from 'lucide-react';
import { BrandMark } from '../../brand';
import type { Reel } from '../../reel-data';
import SetupPanel from './setup-panel';
import styles from './admin.module.css';

type Settings = {
  mode: 'automatic' | 'manual';
  selectedIds: string[];
  titles: Record<string, string>;
};

type Content = {
  configured: boolean;
  connection: {
    status: 'connected' | 'waiting' | 'needs-reconnect' | 'unavailable';
    checkedAt: string | null;
    expiresAt: string | null;
    message: string;
  };
  items: Reel[];
  settings: Settings;
  revision: string;
};

type Operation =
  | 'login'
  | 'logout'
  | 'check'
  | 'save'
  | 'connect'
  | 'setup-check'
  | 'setup-save'
  | 'reload'
  | null;
type Feedback = { kind: 'error' | 'success' | 'info'; text: string } | null;
type ConnectionResult =
  | 'connected'
  | 'cancelled'
  | 'wrong-account'
  | 'expired'
  | 'error';

const callbackMessages: Partial<Record<ConnectionResult, string>> = {
  cancelled:
    'Je hebt het verbinden bij Instagram geannuleerd. Je kunt hieronder opnieuw beginnen.',
  'wrong-account':
    'Er werd een ander Instagram-account gekozen. Verbind opnieuw en kies @beurswatcher.',
  expired:
    'De aanvraag bij Instagram is verlopen. Klik hieronder opnieuw op Instagram verbinden.',
  error:
    'De koppeling is niet gelukt. Probeer opnieuw te verbinden. Blijft het misgaan? Laat het mij weten.',
};

const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Amsterdam',
});

function formatDate(value: string | null) {
  return value && Number.isFinite(Date.parse(value))
    ? dateFormatter.format(new Date(value))
    : null;
}

function copySettings(settings: Settings): Settings {
  return {
    mode: settings.mode,
    selectedIds: [...settings.selectedIds],
    titles: { ...settings.titles },
  };
}

function isContent(value: unknown): value is Content {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Content>;
  return (
    typeof candidate.configured === 'boolean' &&
    typeof candidate.revision === 'string' &&
    Array.isArray(candidate.items) &&
    !!candidate.connection &&
    ['connected', 'waiting', 'needs-reconnect', 'unavailable'].includes(
      candidate.connection.status,
    ) &&
    !!candidate.settings &&
    ['automatic', 'manual'].includes(candidate.settings.mode) &&
    Array.isArray(candidate.settings.selectedIds) &&
    !!candidate.settings.titles
  );
}

function reelTitle(reel: Reel, settings: Settings) {
  return settings.titles[reel.id]?.trim() || reel.title;
}

async function checkInstagramReturn(
  data: Content,
  result: ConnectionResult | undefined,
  alreadyChecked: boolean,
  signal: AbortSignal,
): Promise<{ content: Content | null; feedback: Feedback; checked: boolean }> {
  if (result && result !== 'connected') {
    return {
      content: data,
      feedback: {
        kind: 'info',
        text: callbackMessages[result] || 'Controleer hieronder je verbinding.',
      },
      checked: alreadyChecked,
    };
  }
  if (result !== 'connected' || alreadyChecked)
    return { content: data, feedback: null, checked: alreadyChecked };
  const response = await fetch('/api/instagram/admin/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'check' }),
    cache: 'no-store',
    signal,
  });
  if (response.status === 401)
    return {
      content: null,
      feedback: {
        kind: 'info',
        text: 'Log opnieuw in om de verbinding te controleren.',
      },
      checked: false,
    };
  if (response.status === 429)
    return {
      content: data,
      feedback: {
        kind: 'info',
        text: 'Er is net al gecontroleerd. Hieronder zie je de laatst bekende status. Je kunt over een paar minuten opnieuw controleren.',
      },
      checked: true,
    };
  const checked: unknown = await response.json();
  if (!response.ok || !isContent(checked))
    throw new Error('Connection check unavailable');
  return {
    content: checked,
    checked: true,
    feedback: {
      kind: checked.connection.status === 'connected' ? 'success' : 'info',
      text:
        checked.connection.status === 'connected'
          ? 'Je Instagram is verbonden en de beschikbare Reels zijn opgehaald.'
          : checked.connection.message ||
            'De verbinding kon nog niet worden bevestigd. Controleer de status hieronder.',
    },
  };
}

export default function AdminPanel({ result }: { result?: ConnectionResult }) {
  const [session, setSession] = useState<
    'checking' | 'signed-out' | 'signed-in'
  >('checking');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const [draft, setDraft] = useState<Settings | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [conflict, setConflict] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const operationRef = useRef(false);
  const callbackChecked = useRef(false);
  const unsaved =
    !!content &&
    !!draft &&
    JSON.stringify(content.settings) !== JSON.stringify(draft);

  useEffect(() => {
    const controller = new AbortController();

    async function checkSession() {
      try {
        const response = await fetch('/api/instagram/admin/session', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Session unavailable');
        const sessionResult: unknown = await response.json();
        const authenticated =
          !!sessionResult &&
          typeof sessionResult === 'object' &&
          'authenticated' in sessionResult &&
          sessionResult.authenticated === true;
        setSession(authenticated ? 'signed-in' : 'signed-out');
        if (!authenticated) return;
        const feed = await fetch('/api/instagram/admin/content', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (feed.status === 401) {
          setSession('signed-out');
          return;
        }
        const data: unknown = await feed.json();
        if (!feed.ok || !isContent(data))
          throw new Error('Content unavailable');
        const returned = await checkInstagramReturn(
          data,
          result,
          callbackChecked.current,
          controller.signal,
        );
        callbackChecked.current = returned.checked;
        if (returned.feedback) setFeedback(returned.feedback);
        if (!returned.content) {
          setSession('signed-out');
          return;
        }
        setContent(returned.content);
        setDraft(copySettings(returned.content.settings));
      } catch {
        if (controller.signal.aborted) return;
        setSession((current) =>
          current === 'checking' ? 'signed-out' : current,
        );
        setFeedback({
          kind: 'error',
          text: 'De pagina kon niet alles laden. Probeer het nog een keer. Lukt het niet? Laat het mij weten.',
        });
      }
    }

    void checkSession();
    return () => controller.abort();
  }, [result]);

  useEffect(() => {
    if (!unsaved) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [unsaved]);

  function signedOut(message?: string) {
    setSession('signed-out');
    setContent(null);
    setDraft(null);
    setCode('');
    setShowCode(false);
    setConfirmLogout(false);
    setConflict(false);
    setFeedback(message ? { kind: 'info', text: message } : null);
  }

  function begin(next: Operation) {
    if (operationRef.current) return false;
    operationRef.current = true;
    setOperation(next);
    setFeedback(null);
    return true;
  }

  function finish() {
    operationRef.current = false;
    setOperation(null);
  }

  async function authenticatedRequest(path: string, init?: RequestInit) {
    const response = await fetch(path, {
      ...init,
      cache: 'no-store',
      signal: AbortSignal.timeout(20000),
    });
    if (response.status === 401) {
      signedOut(
        'Je sessie is verlopen. Log opnieuw in. Wijzigingen die je nog niet had opgeslagen, zijn niet bewaard.',
      );
      return null;
    }
    return response;
  }

  async function loadContent(replaceDraft: boolean) {
    const response = await authenticatedRequest('/api/instagram/admin/content');
    if (!response) return false;
    const data: unknown = await response.json();
    if (!response.ok || !isContent(data))
      throw new Error('Content unavailable');
    const returned = await checkInstagramReturn(
      data,
      result,
      callbackChecked.current,
      AbortSignal.timeout(20000),
    );
    callbackChecked.current = returned.checked;
    if (returned.feedback) setFeedback(returned.feedback);
    if (!returned.content) {
      signedOut(returned.feedback?.text);
      return false;
    }
    const latest = returned.content;
    setContent((current) =>
      !replaceDraft && current
        ? { ...latest, settings: current.settings, revision: current.revision }
        : latest,
    );
    if (replaceDraft) setDraft(copySettings(latest.settings));
    setConflict(false);
    return true;
  }

  async function login(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim() || !begin('login')) return;
    try {
      const response = await fetch('/api/instagram/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        setFeedback({
          kind: 'error',
          text:
            response.status === 429
              ? 'Er zijn te veel pogingen gedaan. Wacht even voordat je opnieuw inlogt.'
              : response.status === 401 || response.status === 403
                ? 'Deze toegangscode klopt niet. Controleer de code die ik je heb gestuurd.'
                : 'Inloggen lukt nu niet. Probeer het later opnieuw of laat het mij weten.',
        });
        return;
      }
      setCode('');
      setShowCode(false);
      setSession('signed-in');
      await loadContent(true);
    } catch {
      setFeedback({
        kind: 'error',
        text: 'De verbinding werd onderbroken. Probeer het opnieuw.',
      });
    } finally {
      finish();
    }
  }

  async function logout(force = false) {
    if (unsaved && !force) {
      setConfirmLogout(true);
      return;
    }
    if (!begin('logout')) return;
    try {
      const response = await fetch('/api/instagram/admin/session', {
        method: 'DELETE',
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Logout unavailable');
      signedOut('Je bent uitgelogd.');
    } catch {
      setFeedback({
        kind: 'error',
        text: 'Uitloggen is niet gelukt. Probeer het nog een keer.',
      });
    } finally {
      finish();
    }
  }

  async function reload() {
    if (!begin('reload')) return;
    try {
      if (await loadContent(true))
        setFeedback({
          kind: 'info',
          text: 'De opgeslagen selectie is opnieuw geladen.',
        });
    } catch {
      setFeedback({
        kind: 'error',
        text: 'De selectie kon niet worden geladen. Probeer het opnieuw.',
      });
    } finally {
      finish();
    }
  }

  async function checkSetup() {
    if (!begin('setup-check')) return;
    try {
      // Read only setup status. Do not reload editable settings or clear a
      // conflict, including when the session has expired during editing.
      const response = await fetch('/api/instagram/admin/content', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        signal: AbortSignal.timeout(20000),
      });
      if (response.status === 401) {
        setFeedback({
          kind: 'error',
          text: 'Je sessie is verlopen. Je wijzigingen staan hier nog. Kopieer eventuele nieuwe titels en noteer je selectie voordat je opnieuw inlogt.',
        });
        return;
      }
      const data: unknown = await response.json();
      if (!response.ok || !isContent(data))
        throw new Error('Setup check unavailable');
      setContent((current) =>
        current
          ? {
              ...current,
              configured: data.configured,
              connection: data.connection,
            }
          : current,
      );
      setFeedback({
        kind: 'info',
        text: data.configured
          ? 'De instellingen zijn beschikbaar. Je kunt het verbinden nu starten en daarna toestemming geven in Instagram.'
          : 'Instagram verbinden is nog niet beschikbaar. De verbinding met Meta moet eerst worden ingesteld. Je selectie en titels zijn niet veranderd.',
      });
    } catch {
      setFeedback({
        kind: 'error',
        text: 'De instellingen konden niet worden gecontroleerd. Probeer het later opnieuw. Je selectie en titels zijn niet veranderd.',
      });
    } finally {
      finish();
    }
  }

  async function checkNow() {
    if (!begin('check')) return;
    try {
      const response = await authenticatedRequest(
        '/api/instagram/admin/content',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'check' }),
        },
      );
      if (!response) return;
      if (response.status === 429) {
        setFeedback({
          kind: 'info',
          text: 'Er is net al gecontroleerd. Wacht een paar minuten voordat je nog eens op nieuwe Reels controleert.',
        });
        return;
      }
      const data: unknown = await response.json();
      if (!response.ok || !isContent(data))
        throw new Error('Check unavailable');
      setContent((current) =>
        unsaved && current
          ? { ...data, settings: current.settings, revision: current.revision }
          : data,
      );
      if (!unsaved) setDraft(copySettings(data.settings));
      setFeedback({
        kind: 'info',
        text:
          data.connection.status === 'connected'
            ? 'De beschikbare Reels zijn gecontroleerd. Je eventuele wijzigingen hieronder blijven staan.'
            : data.connection.message ||
              'Instagram is nog niet verbonden. Je kunt de bestaande selectie wel aanpassen.',
      });
    } catch {
      setFeedback({
        kind: 'error',
        text: 'Controleren lukt nu niet. Je selectie is niet veranderd. Probeer het later opnieuw.',
      });
    } finally {
      finish();
    }
  }

  async function save() {
    if (!content || !draft || !unsaved || !begin('save')) return;
    try {
      const settings = {
        ...draft,
        titles: Object.fromEntries(
          Object.entries(draft.titles)
            .map(([id, title]) => [id, title.trim()])
            .filter(([, title]) => !!title),
        ),
      };
      const response = await authenticatedRequest(
        '/api/instagram/admin/content',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ settings, revision: content.revision }),
        },
      );
      if (!response) return;
      if (response.status === 409) {
        setConflict(true);
        setFeedback({
          kind: 'error',
          text: 'De selectie is intussen ergens anders aangepast. Je wijzigingen zijn nog niet opgeslagen. Laad eerst de nieuwste selectie en pas die opnieuw aan.',
        });
        return;
      }
      const data: unknown = await response.json();
      if (!response.ok || !isContent(data)) throw new Error('Save unavailable');
      setContent(data);
      setDraft(copySettings(data.settings));
      setConflict(false);
      setFeedback({
        kind: 'success',
        text: 'Opgeslagen. Je selectie en titels worden op de website gebruikt. Een al geopende website kan nog even de vorige selectie tonen.',
      });
    } catch {
      setFeedback({
        kind: 'error',
        text: 'Opslaan is niet gelukt. Je wijzigingen staan hier nog. Probeer opnieuw op te slaan.',
      });
    } finally {
      finish();
    }
  }

  async function connect() {
    if (!content?.configured || !begin('connect')) return;
    try {
      const response = await authenticatedRequest(
        '/api/instagram/admin/connect',
        { method: 'POST' },
      );
      if (!response) return;
      const data: unknown = await response.json();
      if (
        !response.ok ||
        !data ||
        typeof data !== 'object' ||
        !('url' in data) ||
        typeof data.url !== 'string'
      )
        throw new Error('Connection unavailable');
      const destination = new URL(data.url);
      if (
        destination.origin !== 'https://www.instagram.com' ||
        destination.pathname.replace(/\/$/, '') !== '/oauth/authorize' ||
        destination.username ||
        destination.password
      )
        throw new Error('Invalid destination');
      window.location.assign(destination.href);
    } catch {
      setFeedback({
        kind: 'error',
        text: 'Instagram openen lukt nu niet. Probeer het later opnieuw of laat het mij weten.',
      });
    } finally {
      finish();
    }
  }

  function setMode(mode: Settings['mode']) {
    setDraft((current) => (current ? { ...current, mode } : current));
    setFeedback(null);
  }

  function selectReel(id: string, checked: boolean) {
    setDraft((current) => {
      if (!current) return current;
      if (checked && current.selectedIds.length >= 6) return current;
      return {
        ...current,
        selectedIds: checked
          ? [...current.selectedIds, id]
          : current.selectedIds.filter((selected) => selected !== id),
      };
    });
    setFeedback(null);
  }

  function reorder(id: string, direction: -1 | 1) {
    setDraft((current) => {
      if (!current) return current;
      const index = current.selectedIds.indexOf(id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.selectedIds.length)
        return current;
      const selectedIds = [...current.selectedIds];
      [selectedIds[index], selectedIds[target]] = [
        selectedIds[target],
        selectedIds[index],
      ];
      return { ...current, selectedIds };
    });
    setFeedback(null);
  }

  const chosen =
    content && draft
      ? draft.mode === 'automatic'
        ? content.items.slice(0, 6)
        : draft.selectedIds
            .map((id) => content.items.find((item) => item.id === id))
            .filter((item): item is Reel => !!item)
      : [];
  const connectionStatus = content?.connection.status;
  const connected = connectionStatus === 'connected';
  const checkedAt = formatDate(content?.connection.checkedAt || null);
  const expiresAt = formatDate(content?.connection.expiresAt || null);

  return (
    <main className={styles.page} id="inhoud">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <BrandMark />
            <span>
              beurs
              <span>
                watcher<span className={styles.dot}>.</span>
              </span>
            </span>
          </div>
          <div className={styles.headerActions}>
            <a
              href="/#daniel-in-je-feed"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.websiteLink}
            >
              Bekijk website
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {session === 'signed-in' && (
              <button
                type="button"
                className={styles.logout}
                aria-label="Uitloggen"
                onClick={() => void logout()}
                disabled={!!operation}
              >
                <LogOut size={16} aria-hidden="true" />
                <span>Uitloggen</span>
              </button>
            )}
          </div>
        </header>

        {session !== 'signed-in' ? (
          <section className={styles.loginCard} aria-labelledby="login-heading">
            <div className={styles.loginIntro}>
              <span className={styles.kicker}>Alleen voor Beurswatcher</span>
              <h1 id="login-heading">
                Jouw Reels.
                <br />
                Op je website.
              </h1>
              <p>
                Hier verbind je Instagram en kies je welke video’s op de website
                staan. Je kunt ook de tekst onder een video aanpassen.
              </p>
              <p className={styles.loginAssurance}>
                <ShieldCheck size={21} aria-hidden="true" />
                Je past hier alleen de website aan. Je berichten op Instagram
                blijven zoals ze zijn.
              </p>
            </div>
            <div className={styles.loginFormArea}>
              <span className={styles.lockCircle}>
                <LockKeyhole size={24} aria-hidden="true" />
              </span>
              <h2>Even inloggen</h2>
              <p>
                Gebruik de persoonlijke toegangscode die ik met je heb gedeeld.
              </p>
              <form onSubmit={login}>
                <label htmlFor="access-code">Persoonlijke toegangscode</label>
                <div className={styles.codeInput}>
                  <input
                    id="access-code"
                    name="code"
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    autoComplete="current-password"
                    autoCapitalize="none"
                    spellCheck={false}
                    maxLength={256}
                    required
                    disabled={session === 'checking' || !!operation}
                    aria-describedby="code-help"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode((value) => !value)}
                    aria-label={
                      showCode ? 'Toegangscode verbergen' : 'Toegangscode tonen'
                    }
                  >
                    {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className={styles.helper} id="code-help">
                  Dit is niet je Instagram-wachtwoord.
                </p>
                <button
                  className={styles.primaryButton}
                  type="submit"
                  disabled={
                    session === 'checking' || !!operation || !code.trim()
                  }
                  aria-busy={operation === 'login'}
                >
                  {operation === 'login' || session === 'checking' ? (
                    <LoaderCircle
                      className={styles.spinner}
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight size={18} aria-hidden="true" />
                  )}
                  {session === 'checking'
                    ? 'Toegang controleren…'
                    : operation === 'login'
                      ? 'Inloggen…'
                      : 'Naar mijn Reels'}
                </button>
              </form>
              {feedback && (
                <p
                  className={`${styles.feedback} ${styles[feedback.kind]}`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {feedback.text}
                </p>
              )}
              <p className={styles.loginHelp}>
                Geen code ontvangen of lukt het niet? Laat het mij weten, dan
                help ik je.
              </p>
            </div>
          </section>
        ) : (
          <>
            <div className={styles.pageIntro}>
              <span className={styles.kicker}>Instagram · @beurswatcher</span>
              <h1>Je Reels op de website.</h1>
              <p>
                Koppel je account, kies je video’s en pas de titels aan. Je
                Instagram-berichten zelf verander je hier niet.
              </p>
            </div>

            {confirmLogout && (
              <div className={`${styles.feedback} ${styles.info}`} role="alert">
                <p>
                  Je wijzigingen zijn nog niet opgeslagen. Wil je toch
                  uitloggen?
                </p>
                <div className={styles.inlineActions}>
                  <button
                    type="button"
                    onClick={() => setConfirmLogout(false)}
                    className={styles.secondaryButton}
                  >
                    Terug naar mijn wijzigingen
                  </button>
                  <button
                    type="button"
                    onClick={() => void logout(true)}
                    className={styles.textButton}
                    disabled={!!operation}
                  >
                    Uitloggen zonder opslaan
                  </button>
                </div>
              </div>
            )}
            {feedback && (
              <div
                className={`${styles.feedback} ${styles[feedback.kind]}`}
                aria-live="polite"
                aria-atomic="true"
              >
                <p>{feedback.text}</p>
                {conflict && (
                  <button
                    className={styles.secondaryButton}
                    onClick={() => void reload()}
                    disabled={!!operation}
                    type="button"
                  >
                    Nieuwste selectie laden · wist mijn wijzigingen
                  </button>
                )}
              </div>
            )}

            {!content || !draft ? (
              <section className={styles.loadingCard}>
                <LoaderCircle
                  size={23}
                  className={styles.spinner}
                  aria-hidden="true"
                />
                <p>
                  {feedback?.kind === 'error'
                    ? 'Je selectie is nog niet geladen.'
                    : 'Je selectie wordt geladen…'}
                </p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => void reload()}
                  disabled={!!operation}
                >
                  Opnieuw laden
                </button>
              </section>
            ) : (
              <>
                <section
                  className={styles.connectionCard}
                  aria-labelledby="connection-heading"
                >
                  <div>
                    <span
                      className={`${styles.statusBadge} ${content.configured && connected ? styles.connected : styles.waiting}`}
                    >
                      <span />
                      {!content.configured
                        ? 'Koppeling nog niet ingesteld'
                        : connected
                          ? 'Instagram verbonden'
                          : connectionStatus === 'needs-reconnect'
                            ? 'Opnieuw verbinden nodig'
                            : connectionStatus === 'unavailable'
                              ? 'Verbinding controleren'
                              : 'Nog niet verbonden'}
                    </span>
                    <h2 id="connection-heading">
                      {!content.configured
                        ? 'Stel je Instagram-koppeling in.'
                        : connected
                          ? 'Je account is gekoppeld.'
                          : 'Verbind Instagram één keer.'}
                    </h2>
                    <p>
                      {!content.configured
                        ? 'Volg hieronder de vier stappen om je Meta-app in te stellen en @beurswatcher te verbinden. Je kunt intussen ook je Reel-selectie en titels aanpassen.'
                        : content.connection.message ||
                          (connected
                            ? 'De website kan nieuwe Reels van @beurswatcher ophalen.'
                            : 'Log in bij Instagram en geef toegang tot je profiel en video’s. Je hoeft je wachtwoord niet met mij te delen.')}
                    </p>
                    <div className={styles.connectionDates}>
                      {checkedAt && (
                        <span>
                          <Clock3 size={14} aria-hidden="true" />
                          Laatst gecontroleerd: {checkedAt}
                        </span>
                      )}
                      {expiresAt && <span>Toegang geldig t/m {expiresAt}</span>}
                    </div>
                  </div>
                  <div className={styles.connectionActions}>
                    {!content.configured ? (
                      <>
                        <a
                          href="#instagram-setup"
                          className={styles.primaryButton}
                        >
                          Begin met instellen
                          <ArrowDown size={16} aria-hidden="true" />
                        </a>
                        <p>
                          Je selectie en titels blijven behouden, ook als je
                          wijzigingen nog niet hebt opgeslagen.
                        </p>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={styles.primaryButton}
                          disabled={
                            !content.configured || !!operation || unsaved
                          }
                          onClick={() => void connect()}
                          aria-busy={operation === 'connect'}
                        >
                          {operation === 'connect' ? (
                            <LoaderCircle
                              className={styles.spinner}
                              size={18}
                              aria-hidden="true"
                            />
                          ) : (
                            <Camera size={18} aria-hidden="true" />
                          )}
                          {operation === 'connect'
                            ? 'Instagram openen…'
                            : connected
                              ? 'Account opnieuw verbinden'
                              : 'Instagram verbinden'}
                        </button>
                        <button
                          type="button"
                          className={styles.secondaryButton}
                          disabled={!!operation || !content.configured}
                          onClick={() => void checkNow()}
                          aria-busy={operation === 'check'}
                        >
                          <RefreshCw
                            size={16}
                            className={
                              operation === 'check' ? styles.spinner : ''
                            }
                            aria-hidden="true"
                          />
                          {operation === 'check'
                            ? 'Verbinding controleren…'
                            : 'Verbinding controleren'}
                        </button>
                        <p>
                          {unsaved
                            ? 'Sla je wijzigingen eerst op voordat je Instagram opent.'
                            : 'Alleen toegang tot je profiel en video’s. Geen toegang tot je privéberichten.'}
                        </p>
                      </>
                    )}
                  </div>
                </section>

                <SetupPanel
                  configured={content.configured}
                  connected={connected}
                  busy={!!operation}
                  hasUnsavedChanges={unsaved}
                  onStartSave={() => begin('setup-save')}
                  onFinishSave={finish}
                  onCheck={checkSetup}
                  onConnect={connect}
                />

                <section
                  className={styles.selectionSection}
                  aria-labelledby="selection-heading"
                >
                  <div className={styles.sectionHeading}>
                    <div>
                      <span className={styles.smallLabel}>
                        01 · Kies de weergave
                      </span>
                      <h2 id="selection-heading">Wat komt er op de website?</h2>
                    </div>
                    <span className={styles.selectionCount}>
                      {chosen.length} van 6 video’s
                    </span>
                  </div>
                  <fieldset
                    className={styles.modeChoices}
                    disabled={!!operation}
                  >
                    <legend className={styles.srOnly}>
                      Manier om Reels op de website te tonen
                    </legend>
                    <label
                      htmlFor="mode-automatic"
                      aria-label="Nieuwste Reels automatisch"
                      className={
                        draft.mode === 'automatic' ? styles.modeSelected : ''
                      }
                    >
                      <input
                        id="mode-automatic"
                        type="radio"
                        name="mode"
                        value="automatic"
                        checked={draft.mode === 'automatic'}
                        onChange={() => setMode('automatic')}
                      />
                      <span>
                        <strong>Nieuwste Reels automatisch</strong>
                        <small>
                          De zes nieuwste beschikbare video’s. Nieuwe Reels
                          komen er vanzelf bij zodra Instagram verbonden is.
                        </small>
                      </span>
                    </label>
                    <label
                      htmlFor="mode-manual"
                      aria-label="Zelf kiezen"
                      className={
                        draft.mode === 'manual' ? styles.modeSelected : ''
                      }
                    >
                      <input
                        id="mode-manual"
                        type="radio"
                        name="mode"
                        value="manual"
                        checked={draft.mode === 'manual'}
                        onChange={() => setMode('manual')}
                      />
                      <span>
                        <strong>Zelf kiezen</strong>
                        <small>
                          Selecteer maximaal zes video’s en bepaal de volgorde.
                          Nieuwe Reels worden niet vanzelf toegevoegd.
                        </small>
                      </span>
                    </label>
                  </fieldset>
                  {!connected && (
                    <p className={styles.fallbackNote}>
                      <Clock3 size={17} aria-hidden="true" />
                      Je ziet hieronder de bestaande selectie. Zolang Instagram
                      niet verbonden is, komen er geen nieuwe Reels automatisch
                      bij.
                    </p>
                  )}

                  <div className={styles.orderBox}>
                    <div className={styles.orderHeading}>
                      <h3>
                        {draft.mode === 'manual'
                          ? 'Deze volgorde ziet je bezoeker'
                          : 'Deze Reels worden getoond'}
                      </h3>
                      <span>
                        {unsaved
                          ? 'Voorbeeld · nog niet opgeslagen'
                          : 'Opgeslagen instelling'}
                      </span>
                    </div>
                    {chosen.length ? (
                      <ol className={styles.orderList}>
                        {chosen.map((reel, index) => (
                          <li key={reel.id}>
                            <span className={styles.orderNumber}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className={styles.orderTitle}>
                              {reelTitle(reel, draft)}
                            </span>
                            {draft.mode === 'manual' && (
                              <div className={styles.orderButtons}>
                                <button
                                  type="button"
                                  disabled={index === 0 || !!operation}
                                  onClick={() => reorder(reel.id, -1)}
                                  aria-label={`Verplaats ${reelTitle(reel, draft)} omhoog`}
                                >
                                  <ArrowUp size={16} aria-hidden="true" />
                                </button>
                                <button
                                  type="button"
                                  disabled={
                                    index === chosen.length - 1 || !!operation
                                  }
                                  onClick={() => reorder(reel.id, 1)}
                                  aria-label={`Verplaats ${reelTitle(reel, draft)} omlaag`}
                                >
                                  <ArrowDown size={16} aria-hidden="true" />
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className={styles.emptySelection}>
                        {draft.mode === 'manual'
                          ? 'Je hebt geen video’s geselecteerd. Na opslaan worden er geen Reels op de website getoond.'
                          : 'Er zijn op dit moment geen beschikbare Reels om te tonen.'}
                      </p>
                    )}
                  </div>
                </section>

                <section
                  className={styles.reelsSection}
                  aria-labelledby="reels-heading"
                >
                  <div className={styles.sectionHeading}>
                    <div>
                      <span className={styles.smallLabel}>
                        02 · Video’s en titels
                      </span>
                      <h2 id="reels-heading">Je beschikbare Reels</h2>
                      <p>
                        {draft.mode === 'manual'
                          ? 'Vink aan welke video’s je wilt tonen. De titels kun je hieronder aanpassen.'
                          : 'Pas de titels voor de website aan. De automatische selectie toont steeds de zes nieuwste video’s.'}
                      </p>
                    </div>
                  </div>
                  {content.items.length ? (
                    <div className={styles.reelGrid}>
                      {content.items.map((reel) => {
                        const selected = draft.selectedIds.includes(reel.id);
                        const title = draft.titles[reel.id] ?? reel.title;
                        const shown = chosen.some(
                          (item) => item.id === reel.id,
                        );
                        return (
                          <article
                            className={`${styles.reelCard} ${shown ? styles.reelSelected : ''}`}
                            key={reel.id}
                          >
                            <div className={styles.reelImage}>
                              <Camera
                                className={styles.imageFallback}
                                size={30}
                                aria-hidden="true"
                              />
                              <img
                                src={reel.thumbnail}
                                alt=""
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.hidden = true;
                                }}
                              />
                              {shown && (
                                <span className={styles.shownBadge}>
                                  <Check size={13} aria-hidden="true" />
                                  {unsaved
                                    ? 'In je voorbeeld'
                                    : 'Op de website'}
                                </span>
                              )}
                              <a
                                href={reel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.instagramLink}
                                aria-label={`Bekijk ${reel.title} op Instagram`}
                              >
                                <ArrowUpRight size={18} aria-hidden="true" />
                              </a>
                            </div>
                            <div className={styles.reelBody}>
                              {draft.mode === 'manual' && (
                                <label className={styles.selectReel}>
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={(event) =>
                                      selectReel(reel.id, event.target.checked)
                                    }
                                    disabled={
                                      !!operation ||
                                      (!selected &&
                                        draft.selectedIds.length >= 6)
                                    }
                                  />
                                  <span>
                                    {selected
                                      ? 'Geselecteerd voor de website'
                                      : 'Toon deze video'}
                                  </span>
                                </label>
                              )}
                              <label
                                className={styles.titleLabel}
                                htmlFor={`title-${reel.id}`}
                              >
                                Titel op de website
                              </label>
                              <textarea
                                id={`title-${reel.id}`}
                                value={title}
                                placeholder={reel.title}
                                maxLength={120}
                                rows={3}
                                disabled={!!operation}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setDraft((current) =>
                                    current
                                      ? {
                                          ...current,
                                          titles: {
                                            ...current.titles,
                                            [reel.id]: value,
                                          },
                                        }
                                      : current,
                                  );
                                  setFeedback(null);
                                }}
                              />
                              <div className={styles.titleHelp}>
                                <span>Leeg laten = oorspronkelijke titel</span>
                                <span>{title.length}/120</span>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <p className={styles.emptySelection}>
                      Er zijn nog geen video’s beschikbaar. Verbind Instagram en
                      controleer daarna op nieuwe Reels.
                    </p>
                  )}
                </section>

                <div className={styles.saveBar}>
                  <div className={styles.saveStatus}>
                    {unsaved ? (
                      <>
                        <span className={styles.unsavedDot} />
                        <div>
                          <strong>Je hebt wijzigingen</strong>
                          <span>
                            Ze staan pas op de website nadat je opslaat.
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <CircleCheck size={22} aria-hidden="true" />
                        <div>
                          <strong>Alles is opgeslagen</strong>
                          <span>Je kunt deze pagina veilig sluiten.</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.saveActions}>
                    {unsaved && (
                      <button
                        type="button"
                        className={styles.textButton}
                        disabled={!!operation}
                        onClick={() => {
                          setDraft(copySettings(content.settings));
                          setFeedback(null);
                          setConflict(false);
                        }}
                      >
                        Wijzigingen terugzetten
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={() => void save()}
                      disabled={!unsaved || !!operation || conflict}
                      aria-busy={operation === 'save'}
                    >
                      {operation === 'save' ? (
                        <LoaderCircle
                          className={styles.spinner}
                          size={17}
                          aria-hidden="true"
                        />
                      ) : (
                        <Save size={17} aria-hidden="true" />
                      )}
                      {operation === 'save'
                        ? 'Opslaan…'
                        : 'Wijzigingen opslaan'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <p className={styles.footer}>
          <LockKeyhole size={13} aria-hidden="true" />
          Privépagina · Alleen voor de Instagram-video’s op Beurswatcher.
        </p>
      </div>
    </main>
  );
}
