'use client';
import Image from 'next/image';
import Link from './site-link';
import { Camera as Instagram, ArrowUpRight } from 'lucide-react';

export const instagramUrl = 'https://www.instagram.com/beurswatcher/';
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={'brand-mark ' + className} aria-hidden="true">
      <Image src="/beurswatcher-logo.jpeg" alt="" width={1080} height={1350} sizes="280px" />
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
    general: [
      'Beurswatcher op Instagram.',
      'Korte uitleg over beleggen en geldzaken.',
    ],
    market: [
      'Ook uitleg op Instagram.',
      'Bekijk korte video’s over de beurs, beleggen en vermogen.',
    ],
    article: [
      'Liever een korte video?',
      'Op Instagram legt Beurswatcher financiële begrippen en geldvragen uit.',
    ],
    about: [
      'Bekijk Beurswatcher op Instagram.',
      'Daniel deelt er uitleg over beleggen en geldzaken.',
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
          <strong>Beurswatcher</strong>
          <span>Beleggen. Vermogen. Jouw toekomst.</span>
        </div>
        <Link href={instagramUrl} target="_blank" rel="noreferrer">
          <Instagram size={19} /> @beurswatcher <ArrowUpRight size={19} />
        </Link>
      </div>
      <div className="about-beurs-copy">
        <span className="section-kicker">DIT IS BEURSWATCHER</span>
        <Heading>
          Uitleg over beleggen.
          <br />
          <span>Tools om zelf te rekenen.</span>
        </Heading>
        <p>
          Beurswatcher legt uit hoe beleggen, vermogen en pensioen werken. Met
          artikelen en gratis rekentools kun je financiële begrippen leren en
          bedragen vergelijken.
        </p>
        <p>
          Het heft in eigen handen nemen begint met weten wat je doet. Op
          Instagram vind je korte video’s. Hier lees je de uitgebreidere uitleg
          en bereken je bijvoorbeeld hoeveel inleg nodig is voor een doelbedrag.
        </p>
        <div className="channel-compare">
          <div>
            <Instagram size={20} />
            <b>Op Instagram</b>
            <span>
              Korte video’s.
              <br />
              Uitleg over beleggen en geld.
            </span>
          </div>
          <div>
            <ArrowUpRight size={21} />
            <b>Hier op de website</b>
            <span>
              Artikelen en rekenvoorbeelden.
              <br />
              Gratis financiële tools.
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
            {full ? 'Een vraag voor Beurswatcher?' : 'Volg op Instagram'}{' '}
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
