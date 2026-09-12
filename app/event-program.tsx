'use client';
import {
  ArrowRight,
  Users,
  MessageCircle,
  Lightbulb,
  Coffee,
  Laptop,
} from 'lucide-react';
import Link from './site-link';
export function EventProgram() {
  return (
    <section className="event-program">
      <div>
        <span className="eyebrow">ZO KAN EEN AVOND ERUITZIEN</span>
        <h2>
          Neem je vragen mee.
          <br />
          <em>Ga met ideeën naar huis.</em>
        </h2>
        <p>
          Een ontspannen opbouw met inhoud, gesprek en tijd om elkaar te leren
          kennen.
        </p>
        <span className="concept-label">
          Voorbeeldprogramma · nog af te stemmen door Daniel
        </span>
      </div>
      <ol>
        {[
          [
            'Binnenkomen & kennismaken',
            'Een drankje, een eerste gesprek en de ruimte om te vertellen waar jij mee bezig bent.',
            Coffee,
          ],
          [
            'Een onderwerp, meer perspectieven',
            'Een inhoudelijke introductie over bijvoorbeeld spreiding, vermogen opbouwen of beleggingsgedrag.',
            Lightbulb,
          ],
          [
            'Jouw vragen op tafel',
            'Bespreek vooraf ingestuurde vragen en herkenbare dilemma’s uit de community.',
            MessageCircle,
          ],
          [
            'Nog even verder praten',
            'Wissel ideeën uit met andere bezoekers en neem je eigen volgende vraag mee naar huis.',
            Users,
          ],
        ].map(([h, p, I], i) => {
          const Icon = I as typeof Users;
          return (
            <li key={String(h)}>
              <span>0{i + 1}</span>
              <div>
                <Icon size={19} />
                <h3>{String(h)}</h3>
                <p>{String(p)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
export function OnlineEventConcept() {
  return (
    <section className="online-concept">
      <div className="online-concept-icon">
        <Laptop size={42} />
        <span>ONLINE / CONCEPT</span>
      </div>
      <div>
        <span className="eyebrow">EEN VOLGENDE VORM OM TE VERKENNEN</span>
        <h2>De vermogenscall.</h2>
        <p>
          Voorbeeldopzet: een uur rond één geldvraag. Een korte uitleg, twee
          rekenvoorbeelden en een open vragenronde. Denk aan je buffer, je
          beleggingshorizon en opbouwen voor later.
        </p>
        <div className="online-concept-facts">
          <span>± 60 minuten</span>
          <span>Vragen vooraf insturen</span>
          <span>Datum volgt · niet boekbaar</span>
        </div>
        <small>
          Conceptvoorstel voor Daniel; dit is nog geen aangekondigd event.
        </small>
      </div>
      <Link className="textlink" href="/contact">
        Deel een onderwerp <ArrowRight size={17} />
      </Link>
    </section>
  );
}
