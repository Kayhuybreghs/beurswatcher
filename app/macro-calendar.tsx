'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from './site-link';
import { macroCheckedAt, selectMacroEvents } from './macro-data';

export function MacroCalendar({ compact = false }: { compact?: boolean }) {
  const [today, setToday] = useState(macroCheckedAt);
  const [country, setCountry] = useState('all'),
    [topic, setTopic] = useState('all');
  const [from, setFrom] = useState(''),
    [until, setUntil] = useState('');
  useEffect(() => {
    const update = () =>
      setToday(
        new Intl.DateTimeFormat('sv-SE', {
          timeZone: 'Europe/Amsterdam',
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  const invalidRange = Boolean(until && until < (from || today));
  const events = invalidRange
    ? []
    : selectMacroEvents({ country, topic, from: from || today, until });
  return (
    <section className={'macro-calendar' + (compact ? ' macro-compact' : '')}>
      <div className="macro-title">
        <span className="eyebrow">NEDERLAND & VERENIGDE STATEN</span>
        <h2>{compact ? 'Wat komt eraan?' : 'Kies wat je wilt volgen.'}</h2>
        <p>
          {compact
            ? 'De eerstvolgende geselecteerde publicatiemomenten.'
            : 'Filter de planning. Open een moment voor uitleg en de officiële bron.'}
        </p>
      </div>
      {!compact && (
        <div className="macro-filters">
          <label>
            Land
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="all">Nederland & VS</option>
              <option value="NL">Nederland</option>
              <option value="US">Verenigde Staten</option>
            </select>
          </label>
          <label>
            Onderwerp
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="all">Alle onderwerpen</option>
              {['Inflatie', 'Arbeidsmarkt', 'Economie', 'Rente'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Vanaf
            <input
              type="date"
              value={from || today}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label>
            Tot en met
            <input
              type="date"
              value={until}
              min={from || today}
              onChange={(e) => setUntil(e.target.value)}
            />
          </label>
          <button
            className="textlink"
            onClick={() => {
              setCountry('all');
              setTopic('all');
              setFrom('');
              setUntil('');
            }}
          >
            Filters wissen
          </button>
        </div>
      )}
      {!compact && (
        <p className="macro-count" aria-live="polite">
          {invalidRange
            ? 'De einddatum moet op of na de begindatum liggen.'
            : `${events.length} geplande momenten · tijden in Nederland`}
        </p>
      )}
      <div className="macro-events">
        {events.slice(0, compact ? 3 : undefined).map((e) => (
          <details key={e.id} className="macro-event">
            <summary>
              <time dateTime={e.at}>
                <b>{e.at.slice(8, 10)}</b>
                {new Intl.DateTimeFormat('nl-NL', {
                  month: 'short',
                  timeZone: 'Europe/Amsterdam',
                }).format(new Date(e.at))}
              </time>
              <span className="macro-event-copy">
                <small>
                  {e.country === 'NL' ? 'Nederland' : 'Verenigde Staten'} ·{' '}
                  {e.topic}
                </small>
                <strong>{e.title}</strong>
                <span>
                  {e.at.includes('T')
                    ? new Intl.DateTimeFormat('nl-NL', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Europe/Amsterdam',
                      }).format(new Date(e.at)) + ' uur'
                    : 'Tijd: zie bron'}{' '}
                  · {e.source}
                </span>
              </span>
              <ChevronDown size={18} />
            </summary>
            <div className="macro-event-detail">
              <p>{e.explanation}</p>
              <p>
                Gepland publicatiemoment. De planning kan wijzigen; bekijk de
                bron voor de laatste informatie en gepubliceerde cijfers.
              </p>
              <a href={e.url} target="_blank" rel="noreferrer">
                Bekijk bij {e.source} <ArrowUpRight size={16} />
              </a>
            </div>
          </details>
        ))}
      </div>
      {!events.length && !invalidRange && (
        <p className="macro-empty">
          Geen momenten in deze selectie. Kies een andere periode of bekijk de
          officiële bronkalenders hieronder.
        </p>
      )}
      <p className="macro-source-note">
        Handmatig geselecteerde planning · gecontroleerd op 26 september 2026.
        Geen live uitslagen of verwachtingen.
      </p>
      {compact ? (
        <Link className="textlink" href="/markt/macro">
          Open de macro-agenda <ArrowRight size={16} />
        </Link>
      ) : (
        <div className="macro-sources">
          <a
            href="https://www.cbs.nl/nl-nl/publicatieplanning"
            target="_blank"
            rel="noreferrer"
          >
            CBS ↗
          </a>
          <a
            href="https://www.bls.gov/schedule/"
            target="_blank"
            rel="noreferrer"
          >
            BLS ↗
          </a>
          <a
            href="https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"
            target="_blank"
            rel="noreferrer"
          >
            Federal Reserve ↗
          </a>
          <a
            href="https://tradingeconomics.com/calendar"
            target="_blank"
            rel="noreferrer"
          >
            Uitgebreide kalender bij Trading Economics ↗
          </a>
        </div>
      )}
    </section>
  );
}
export function MacroPage() {
  return (
    <>
      <header className="journal-masthead">
        <div>
          <Link className="textlink" href="/markt">
            ← De markthub
          </Link>
          <span className="eyebrow">BEURSWATCHER / MACRO-AGENDA</span>
          <h1>
            Weet wat
            <br />
            <em>eraan komt.</em>
          </h1>
        </div>
        <p>
          Van inflatie tot de arbeidsmarkt.
          <br />
          De economische momenten achter het nieuws.
        </p>
      </header>
      <MacroCalendar />
      <section className="macro-next">
        <span className="eyebrow">VAN CIJFER NAAR INZICHT</span>
        <h2>Een publicatie is het begin van een vraag.</h2>
        <p>
          Beurswatcher helpt je de context begrijpen en zelf afwegen wat een
          ontwikkeling betekent voor je plan.
        </p>
        <Link className="button" href="/artikelen">
          Bekijk de verdieping <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
