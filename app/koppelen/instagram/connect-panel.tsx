'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CircleCheck,
  Camera,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';
import { BrandMark } from '../../brand';
import styles from './connect.module.css';

type ConnectionResult =
  | 'connected'
  | 'cancelled'
  | 'wrong-account'
  | 'expired'
  | 'error';

type Props = {
  configured: boolean;
  username: string;
  result?: ConnectionResult;
};

const requestMessages = {
  expired: 'Deze persoonlijke link is verlopen. Vraag mij om een nieuwe link.',
  invalid:
    'Deze link is niet geldig. Open de persoonlijke link die je van mij hebt gekregen.',
  unavailable:
    'Verbinden lukt nu niet. Probeer het later opnieuw of laat het mij weten.',
};

function resultMessage(result: ConnectionResult | undefined, username: string) {
  switch (result) {
    case 'cancelled':
      return 'Je hebt de koppeling geannuleerd. Open je oorspronkelijke persoonlijke link om het opnieuw te proberen.';
    case 'wrong-account':
      return `Dit is niet het juiste account. Open je oorspronkelijke persoonlijke link en kies @${username} bij Instagram.`;
    case 'expired':
      return 'De aanvraag is verlopen. Open je oorspronkelijke persoonlijke link om opnieuw te beginnen. Werkt die niet meer? Vraag mij om een nieuwe link.';
    case 'error':
      return 'De koppeling is niet gelukt. Open je oorspronkelijke persoonlijke link en probeer het opnieuw. Laat het mij weten als dit blijft gebeuren.';
    default:
      return null;
  }
}

export default function ConnectPanel({ configured, username, result }: Props) {
  const [invite, setInvite] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const readInvitation = useRef(false);
  const connected = ready && result === 'connected' && !invite;
  const notice = requestError || resultMessage(result, username);

  useEffect(() => {
    if (readInvitation.current) return;
    readInvitation.current = true;

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const value = fragment.get('invite');

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + window.location.search,
      );
    }

    setInvite(value || null);
    setReady(true);
  }, []);

  async function connect() {
    if (!invite || !configured || busy || connected) return;
    setBusy(true);
    setRequestError(null);

    try {
      const response = await fetch('/api/instagram/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invite }),
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      });
      const data: unknown = await response.json();

      if (!data || typeof data !== 'object')
        throw new Error('Invalid response');

      if (!response.ok) {
        const code = 'error' in data ? data.error : undefined;
        const knownCode =
          code === 'expired' || code === 'invalid' ? code : 'unavailable';
        setRequestError(requestMessages[knownCode]);
        if (knownCode !== 'unavailable') setInvite(null);
        setBusy(false);
        return;
      }

      if (!('url' in data) || typeof data.url !== 'string') {
        throw new Error('Invalid response');
      }

      const destination = new URL(data.url);
      if (
        destination.origin !== 'https://www.instagram.com' ||
        destination.pathname.replace(/\/$/, '') !== '/oauth/authorize' ||
        destination.username ||
        destination.password
      ) {
        throw new Error('Invalid destination');
      }

      window.location.assign(destination.href);
    } catch {
      setRequestError(requestMessages.unavailable);
      setBusy(false);
    }
  }

  return (
    <main className={styles.page} id="inhoud">
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Naar Beurswatcher"
          >
            <BrandMark />
            <span>
              beurs
              <span>
                watcher<span className={styles.dot}>.</span>
              </span>
            </span>
          </Link>
          <span className={styles.privateLabel}>
            <LockKeyhole size={14} aria-hidden="true" />
            Persoonlijke koppeling
          </span>
        </header>

        <div className={styles.card}>
          <section className={styles.intro} aria-labelledby="connect-title">
            <div className={styles.account}>
              <span className={styles.accountIcon}>
                <Camera size={22} aria-hidden="true" />
              </span>
              <span>
                <span className={styles.eyebrow}>
                  Instagram voor je website
                </span>
                <strong>@{username}</strong>
              </span>
            </div>

            <h1 id="connect-title">
              {connected
                ? 'Je Instagram is gekoppeld.'
                : 'Je Reels automatisch op Beurswatcher.'}
            </h1>
            <p className={styles.lead}>
              {connected
                ? 'Nieuwe Reels verschijnen automatisch op de website. Je hoeft hier geen video’s te uploaden.'
                : 'Verbind je Instagram-account één keer. Daarna haalt de website je nieuwe Reels automatisch op.'}
            </p>

            <div className={styles.actionArea}>
              {connected ? (
                <>
                  <p className={styles.success}>
                    <CircleCheck size={21} aria-hidden="true" />
                    De verbinding is bevestigd.
                  </p>
                  <Link
                    href="/#daniel-in-je-feed"
                    className={styles.connectButton}
                  >
                    Bekijk de website
                    <ArrowRight size={19} aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className={styles.status}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {notice ? (
                      <p className={styles.notice}>{notice}</p>
                    ) : !configured ? (
                      <p>
                        <strong>Ik zet de koppeling klaar.</strong> Ik laat je
                        weten wanneer je kunt verbinden.
                      </p>
                    ) : ready && !invite ? (
                      <p>
                        Open de persoonlijke link die je van mij hebt gekregen.
                      </p>
                    ) : (
                      <p>
                        {ready
                          ? `Log bij Instagram in met @${username}.`
                          : 'Je persoonlijke link wordt gecontroleerd…'}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className={styles.connectButton}
                    onClick={connect}
                    disabled={!configured || !invite || !ready || busy}
                    aria-busy={busy}
                    aria-describedby="instagram-permissions"
                  >
                    {busy ? (
                      <LoaderCircle
                        className={styles.spinner}
                        size={19}
                        aria-hidden="true"
                      />
                    ) : (
                      <Camera size={19} aria-hidden="true" />
                    )}
                    {busy ? 'Instagram openen…' : 'Instagram verbinden'}
                    {!busy && <ArrowRight size={19} aria-hidden="true" />}
                  </button>
                  <p className={styles.passwordNote}>
                    <LockKeyhole size={15} aria-hidden="true" />
                    Je logt in bij Instagram. Deel je wachtwoord niet met mij.
                  </p>
                </>
              )}
            </div>
          </section>

          <aside
            className={styles.explanation}
            aria-label="Zo werkt de koppeling"
          >
            <span className={styles.smallLabel}>
              {connected ? 'Wat gebeurt er nu?' : 'Zo werkt het'}
            </span>
            <h2>
              {connected
                ? 'Je publiceert gewoon op Instagram.'
                : 'Drie stappen. Eén keer instellen.'}
            </h2>

            {connected ? (
              <div className={styles.afterConnection}>
                <p>
                  De website controleert bij bezoek op nieuwe Reels. Op een
                  geopende pagina wordt de selectie ongeveer iedere 15 minuten
                  bijgewerkt.
                </p>
                <p>
                  Je video staat dus niet altijd direct na het publiceren op de
                  website. Je hoeft verder niets te doen.
                </p>
              </div>
            ) : (
              <ol className={styles.steps}>
                <li>
                  <span className={styles.stepNumber}>01</span>
                  <div>
                    <h3>Open Instagram</h3>
                    <p>
                      Klik op de knop. Je gaat naar de officiële inlogpagina van
                      Instagram.
                    </p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNumber}>02</span>
                  <div>
                    <h3>Geef toestemming</h3>
                    <p>
                      Log in met @{username} en geef toegang tot je profiel en
                      video’s.
                    </p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNumber}>03</span>
                  <div>
                    <h3>Klaar</h3>
                    <p>
                      Je komt hier terug. Je ziet meteen of je account goed is
                      gekoppeld.
                    </p>
                  </div>
                </li>
              </ol>
            )}

            <div className={styles.permissions} id="instagram-permissions">
              <ShieldCheck size={23} aria-hidden="true" />
              <div>
                <h3>Alleen wat de website nodig heeft</h3>
                <p>
                  De koppeling leest je profiel en video’s. Ze kan niets op je
                  account plaatsen en heeft geen toegang tot je privéberichten.
                </p>
              </div>
            </div>

            {!connected && (
              <p className={styles.requirement}>
                <KeyRound size={16} aria-hidden="true" />
                Je account moet een Creator- of Business-account zijn. Vraag mij
                om hulp als je twijfelt.
              </p>
            )}
            {connected && (
              <p className={styles.requirement}>
                <Check size={17} aria-hidden="true" />
                Je kunt de toegang later via Instagram intrekken.
              </p>
            )}
          </aside>
        </div>

        <p className={styles.footer}>
          Deze pagina is alleen bedoeld om het Instagram-account van
          Beurswatcher te koppelen.
        </p>
      </div>
    </main>
  );
}
