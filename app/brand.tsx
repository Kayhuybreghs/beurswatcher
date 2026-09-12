'use client';
/* oxlint-disable next/no-img-element -- Supplied local brand artwork is rendered at its original proportions. */
import Link from './site-link';
import { Camera as Instagram, ArrowUpRight } from 'lucide-react';

export const instagramUrl = 'https://www.instagram.com/beurswatcher/';
export const communityEvent = {
  name: 'Beleggersborrel',
  date: '14 oktober 2026',
  time: '19.15–22.30',
  venue: 'Winkel van Sinkel',
  address: 'Oudegracht 158, Utrecht',
  ticketUrl: 'https://weeztix.shop/95kumuq5',
  ticket: '€ 20 + € 1 servicekosten',
  checked: '8 september 2026',
};
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={'brand-mark ' + className} aria-hidden="true">
      <img src="/beurswatcher-logo.jpeg" alt="" width={1080} height={1350} />
    </span>
  );
}
export function BrandLogo() {
  return (
    <Link
      className="logo brand-logo"
      href="/"
      aria-label="Beurswatcher, naar de voorpagina"
    >
      <BrandMark />
      <span>
        beurs
        <span>
          watcher<span className="dot">.</span>
        </span>
      </span>
    </Link>
  );
}
export function InstagramCTA({
  context = 'general',
}: {
  context?: 'general' | 'market' | 'article' | 'about';
}) {
  const copy = {
    general: ['Dagelijks op Instagram.', 'Verder kijken doe je hier.'],
    market: [
      'De beurs stopt niet na dit overzicht.',
      'Volg de korte updates van Daniel op Instagram.',
    ],
    article: [
      'Een inzicht voor nu. Meer voor morgen.',
      'Volg Beurswatcher voor korte uitleg en nieuwe geldvragen.',
    ],
    about: [
      'Zie wat Daniel dagelijks deelt.',
      'Van je eerste belegging tot opbouwen voor later.',
    ],
  }[context];
  return (
    <aside className="instagram-bridge">
      <span className="instagram-symbol">
        <Instagram size={26} />
      </span>
      <div>
        <strong>{copy[0]}</strong>
        <p>{copy[1]}</p>
      </div>
      <Link href={instagramUrl} target="_blank" rel="noreferrer">
        Volg @beurswatcher <ArrowUpRight size={19} />
      </Link>
    </aside>
  );
}

export function AboutBeurswatcher({ full = false }: { full?: boolean }) {
  const Heading = full ? 'h1' : 'h2';
  return (
    <section
      className={'about-beurs ' + (full ? 'about-full' : '')}
      id="over-beurswatcher"
    >
      <div className="about-brand-card">
        <span className="about-card-tag">ACHTER DE VERREKIJKER</span>
        <BrandMark />
        <div>
          <strong>Daniel / Beurswatcher</strong>
          <span>Beleggen. Vermogen. Jouw toekomst.</span>
        </div>
        <Link href={instagramUrl} target="_blank" rel="noreferrer">
          <Instagram size={19} /> @beurswatcher <ArrowUpRight size={19} />
        </Link>
      </div>
      <div className="about-beurs-copy">
        <span className="section-kicker">DIT IS BEURSWATCHER</span>
        <Heading>
          Van je dagelijkse feed
          <br />
          naar <span>je eigen plan.</span>
        </Heading>
        <p>
          Beurswatcher is het platform van Daniel voor een nieuwe generatie
          beleggers. Hij deelt praktische inzichten over beleggen, sparen, je
          portefeuille en opbouwen voor later.
        </p>
        <p>
          Het idee is eenvoudig: geldvragen begrijpelijk maken, zodat je zelf
          verder kunt. Op Instagram krijg je de korte inzichten. Hier vind je de
          ruimte om te begrijpen, te vergelijken en met jouw bedragen te
          rekenen.
        </p>
        <div className="channel-compare">
          <div>
            <Instagram size={20} />
            <b>Op Instagram</b>
            <span>
              Dagelijkse updates.
              <br />
              Korte uitleg. Nieuwe vragen.
            </span>
          </div>
          <div>
            <ArrowUpRight size={21} />
            <b>Hier op de website</b>
            <span>
              Meer context. Gratis tools.
              <br />
              Je volgende stap.
            </span>
          </div>
        </div>
        <div className="about-actions">
          {!full && (
            <Link className="button" href="/over">
              Meer over Beurswatcher <ArrowRightIcon />
            </Link>
          )}
          <Link
            className="textlink"
            href={full ? '/contact' : instagramUrl}
            target={full ? undefined : '_blank'}
            rel={full ? undefined : 'noreferrer'}
          >
            {full ? 'Een vraag voor Daniel?' : 'Volg op Instagram'}{' '}
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
function ArrowRightIcon() {
  return <ArrowUpRight size={18} />;
}
