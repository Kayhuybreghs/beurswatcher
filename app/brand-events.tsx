'use client';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Clock3,
  CalendarDays,
  Users,
  MessageCircle,
  Mic2,
} from 'lucide-react';
import Link from './site-link';
import { BrandMark, communityEvent, InstagramCTA } from './brand';
import { Newsletter } from './widgets';
import type { ReactNode } from 'react';

export function EventTeaser() {
  return (
    <section className="event-invite">
      <div className="invite-date">
        <span>OKT</span>
        <strong>14</strong>
        <span>UTRECHT / 2026</span>
      </div>
      <div>
        <span className="section-kicker">
          EVEN UIT JE FEED. SAMEN AAN TAFEL.
        </span>
        <h2>
          Beleggen doe je zelf.
          <br />
          Verder kijken doen we samen.
        </h2>
        <p>
          Ontmoet andere beleggers bij de Beleggersborrel in de Winkel van
          Sinkel.
        </p>
      </div>
      <Link className="button yellow" href="/events">
        Ontdek de borrel <ArrowUpRight size={20} />
      </Link>
    </section>
  );
}

export function BrandEvents({ children }: { children?: ReactNode }) {
  return (
    <>
      <section className="borrel-hero">
        <div className="borrel-poster">
          <div>
            <BrandMark />
            <span>
              BEURSWATCHER
              <br />
              BRENGT BELEGGERS SAMEN
            </span>
          </div>
          <span className="borrel-date">14 / 10 / 2026</span>
          <h1>
            Goede vragen.
            <br />
            Nieuwe gezichten.
            <br />
            <span>Meer perspectief.</span>
          </h1>
          <div className="poster-bottom">
            <span>
              BELEGGERSBORREL
              <br />
              UTRECHT
            </span>
            <Users size={58} strokeWidth={1.4} />
          </div>
        </div>
        <div className="borrel-info">
          <span className="brand-kicker">
            <span /> EEN AVOND OM VERDER TE KIJKEN
          </span>
          <h2>
            Van je portfolio
            <br />
            naar de borreltafel.
          </h2>
          <p>
            Een gezellige avond met andere beleggers, een spreker van een grote
            broker en ruimte voor vragen en nieuwe inzichten. Met drankjes en
            borrelhapjes.
          </p>
          <div className="borrel-facts">
            <span>
              <CalendarDays size={21} />
              <div>
                <small>WANNEER</small>
                <b>{communityEvent.date}</b>
              </div>
            </span>
            <span>
              <Clock3 size={21} />
              <div>
                <small>TIJD</small>
                <b>{communityEvent.time}</b>
              </div>
            </span>
            <span>
              <MapPin size={21} />
              <div>
                <small>WAAR</small>
                <b>{communityEvent.venue}</b>
                <span>{communityEvent.address}</span>
              </div>
            </span>
          </div>
          <Link
            className="button yellow"
            href={communityEvent.ticketUrl}
            target="_blank"
            rel="noreferrer"
          >
            Bekijk tickets bij Weeztix <ArrowUpRight size={19} />
          </Link>
          <p className="event-ticket-note">
            {communityEvent.ticket}. Bekijk de actuele beschikbaarheid en
            voorwaarden bij Weeztix.
          </p>
          <Link href="#borrel-programma" className="textlink">
            Wat kun je verwachten? <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="borrel-programma" id="borrel-programma">
        <div>
          <span className="section-kicker">GEEN SCHERM ERTUSSEN</span>
          <h2>
            Een andere manier
            <br />
            om kennis te delen.
          </h2>
        </div>
        <article>
          <Users />
          <h3>Andere perspectieven</h3>
          <p>Ontmoet beleggers met hun eigen vragen, ervaringen en plannen.</p>
        </article>
        <article>
          <Mic2 />
          <h3>Nieuwe inzichten</h3>
          <p>
            Een spreker van een grote broker deelt zijn perspectief op beleggen.
          </p>
        </article>
        <article>
          <MessageCircle />
          <h3>Ruimte voor gesprek</h3>
          <p>
            Praat verder met een drankje en borrelhapjes. De vragen neem je zelf
            mee.
          </p>
        </article>
      </section>
      <div className="event-before">
        <p>Alvast iets om over na te denken?</p>
        <Link href="/tools/doelvermogen">
          Wat vraagt jouw vermogensdoel? <ArrowRight size={17} />
        </Link>
        <Link href="/artikelen/een-plan-voor-onrust">
          Wat staat er in jouw beleggingsplan? <ArrowRight size={17} />
        </Link>
      </div>
      {children}
      <InstagramCTA />
      <Newsletter context="events" variant="compact" />
      <p className="event-source">
        Evenementgegevens:{' '}
        <Link href={communityEvent.ticketUrl} target="_blank" rel="noreferrer">
          officiële Weeztix-ticketpagina
        </Link>
        , gecontroleerd op {communityEvent.checked}.
      </p>
    </>
  );
}
