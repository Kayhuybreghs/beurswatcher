'use client';

import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from './site-link';

export function BrandEvents() {
  return (
    <>
      <header className="events-masthead">
        <div>
          <span className="eyebrow">BEURSWATCHER / EVENTS</span>
          <h1>
            Events van
            <br />
            <em>Beurswatcher.</em>
          </h1>
        </div>
        <p>
          Hier vind je aangekondigde bijeenkomsten over beleggen en geldzaken.
          <br />
          Met de datum, locatie en informatie over aanmelden.
        </p>
      </header>
      <section className="event-listing" aria-labelledby="events-status">
        <article className="event-list-card">
          <div className="event-list-date" aria-hidden="true">
            <CalendarDays size={32} strokeWidth={1.5} />
          </div>
          <div>
            <span className="eyebrow">AGENDA</span>
            <h2 id="events-status">Er is nog geen nieuw event aangekondigd.</h2>
            <p>
              Het eerder aangekondigde event gaat niet door. Zodra een nieuwe
              bijeenkomst is bevestigd, lees je hier wat er op het programma
              staat en hoe je kunt deelnemen.
            </p>
          </div>
          <div className="event-list-action">
            <Link href="/artikelen" className="textlink">
              Lees de artikelen <ArrowRight size={17} />
            </Link>
            <Link href="/tools" className="textlink">
              Bekijk de gratis tools <ArrowRight size={17} />
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
