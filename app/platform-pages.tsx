'use client';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Users,
  Camera,
  Mail,
  BookOpen,
  Sparkles,
  MapPin,
  Clock3,
  Layers,
  Radio,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Link from './site-link';
import { BrandMark, communityEvent, instagramUrl } from './brand';
import { EventProgram, OnlineEventConcept } from './event-program';
import { MarketDashboard } from './market-dashboard';
import { BrandEvents } from './brand-events';
import { ContactForm } from './contact-form';
import { ReelRail } from './reels';
import { Newsletter } from './widgets';
export const eventSlug = 'beleggersborrel-utrecht-2026';
export function BusinessPage() {
  return (
    <>
      <section className="business-hero">
        <div>
          <span className="eyebrow">BEURSWATCHER × JOUW MERK</span>
          <h1>
            Bereik begint
            <br />
            bij aandacht.
            <br />
            <em>Impact bij inhoud.</em>
          </h1>
          <p>
            Voor merken die iets waardevols toevoegen aan de wereld van
            beleggen, vermogen en financiële keuzes.
          </p>
          <Link href="#samenwerking-bespreken" className="button yellow">
            Samenwerking bespreken <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="business-orbit">
          <div className="orbit-center">
            <BrandMark />
            <span>BEURSWATCHER</span>
          </div>
          <span className="orbit-label orbit-social">
            <Camera /> Instagram
          </span>
          <span className="orbit-label orbit-tools">
            <Layers /> Website & tools
          </span>
          <span className="orbit-label orbit-events">
            <Users /> Ontmoetingen
          </span>
          <span className="orbit-caption">EEN VERHAAL DAT VERDER GAAT</span>
        </div>
      </section>
      <section className="business-audience">
        <span className="eyebrow">DE COMMUNITY</span>
        <h2>
          Nieuwsgierig naar de beurs.
          <br />
          Bewust bezig met later.
        </h2>
        <p>
          Beurswatcher richt zich op een nieuwe generatie beleggers. Mensen die
          geldvragen willen begrijpen, hun eigen scenario’s onderzoeken en
          afwegen welke keuzes bij hen passen.
        </p>
        <div>
          <span>Beleggen</span>
          <span>Vermogen</span>
          <span>Pensioen</span>
          <span>Financiële keuzes</span>
        </div>
      </section>
      <section className="collab-formats">
        <div className="section-heading">
          <div>
            <span className="eyebrow">VORM VOLGT INHOUD</span>
            <h2>Meer dan één contactmoment.</h2>
          </div>
          <p>Van een eerste vraag in de feed tot verdieping op de website.</p>
        </div>
        {[
          [
            '01',
            'Reels & social',
            'Maak een onderwerp begrijpelijk met korte content die past bij de herkenbare stijl van Beurswatcher.',
            Camera,
          ],
          [
            '02',
            'Verdieping & tools',
            'Verbind een relevant verhaal aan uitleg, een rekentool of een transparante partnerpagina.',
            BookOpen,
          ],
          [
            '03',
            'Events & ontmoeting',
            'Verken hoe jouw expertise kan bijdragen aan een bijeenkomst of inhoudelijk gesprek.',
            Users,
          ],
          [
            '04',
            'Campagnes & maatwerk',
            'Breng meerdere kanalen samen rond een onderwerp, met heldere afspraken over inhoud en samenwerking.',
            Sparkles,
          ],
        ].map(([n, title, copy, Icon]) => {
          const I = Icon as typeof Camera;
          return (
            <article key={String(n)}>
              <span>{String(n)}</span>
              <I />
              <h3>{String(title)}</h3>
              <p>{String(copy)}</p>
            </article>
          );
        })}
      </section>
      <section className="collab-process">
        <h2>
          Eerst de match.
          <br />
          Dan het voorstel.
        </h2>
        <div>
          {[
            ['Kennismaken', 'Wie wil je bereiken en wat voeg je toe?'],
            [
              'Samen scherpstellen',
              'We verkennen onderwerp, vorm en een passende plek.',
            ],
            [
              'Heldere afspraken',
              'Inhoud, planning, commerciële vermelding en verwachtingen leggen we vooraf vast.',
            ],
          ].map(([h, p], i) => (
            <article key={h}>
              <span>0{i + 1}</span>
              <div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="business-contact">
        <div>
          <span className="eyebrow">EEN GOED BEGIN</span>
          <h2>
            Vertel ons
            <br />
            jouw idee.
          </h2>
          <p>
            Een financiële dienst, fintech, app, event of relevant merk: we
            beginnen bij wat de community eraan heeft.
          </p>
          <Link className="textlink" href="/partners">
            Bekijk de huidige samenwerkingen <ArrowRight size={17} />
          </Link>
        </div>
        <ContactForm business />
      </div>
    </>
  );
}
export function EventsHub({ slug }: { slug?: string }) {
  if (slug)
    return (
      <>
        <Link className="back-link" href="/events">
          <ArrowLeft size={17} /> Alle events
        </Link>
        <BrandEvents>
          <EventProgram />
          <section className="event-depth">
            <div>
              <span className="eyebrow">VOOR WIE?</span>
              <h2>
                Voor beleggers
                <br />
                met vragen.
              </h2>
              <p>
                Kom voor nieuwe perspectieven, een gesprek over beleggen en
                kennismaking met andere beleggers. Je neemt je eigen ervaring en
                nieuwsgierigheid mee.
              </p>
              <div className="event-organizer">
                <BrandMark />
                <span>
                  Een bijeenkomst gedeeld door
                  <br />
                  <b>Beurswatcher</b>
                </span>
              </div>
            </div>
            <div>
              <span className="eyebrow">HANDIG OM TE WETEN</span>
              <Accordion>
                {[
                  [
                    'Wat staat er op het programma?',
                    'Een ontmoeting met andere beleggers, een spreker van een grote broker en ruimte voor gesprek. Bekijk de ticketpagina voor de laatste programma-informatie.',
                  ],
                  [
                    'Wat is inbegrepen?',
                    'De officiële beschrijving noemt drankjes en borrelhapjes. Controleer de ticketvoorwaarden voor de precieze invulling.',
                  ],
                  [
                    'Waar koop ik een ticket?',
                    `Tickets worden aangeboden via de officiële Weeztix-pagina. De vermelde prijs is ${communityEvent.ticket}. Beschikbaarheid en voorwaarden vind je bij de ticketaanbieder.`,
                  ],
                  [
                    'Waar en wanneer is het?',
                    `${communityEvent.date}, ${communityEvent.time}. ${communityEvent.venue}, ${communityEvent.address}.`,
                  ],
                ].map(([q, a]) => (
                  <AccordionItem key={q}>
                    <AccordionTrigger>{q}</AccordionTrigger>
                    <AccordionContent>{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link
                className="button yellow"
                href={communityEvent.ticketUrl}
                target="_blank"
                rel="noreferrer"
              >
                Bekijk de ticketpagina <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        </BrandEvents>
      </>
    );
  return (
    <>
      <header className="events-masthead">
        <div>
          <span className="eyebrow">BEURSWATCHER / EVENTS</span>
          <h1>
            Uit je feed.
            <br />
            <em>In goed gezelschap.</em>
          </h1>
        </div>
        <p>
          Ontmoet andere beleggers. Stel je vragen.
          <br />
          Kijk samen een stukje verder.
        </p>
      </header>
      <section className="event-listing">
        <div className="section-heading">
          <h2>Op de agenda.</h2>
          <span>Beurswatcher brengt beleggers samen</span>
        </div>
        <Link className="event-list-card" href={'/events/' + eventSlug}>
          <div className="event-list-date">
            <span>OKT</span>
            <b>14</b>
            <span>2026</span>
          </div>
          <div>
            <span className="eyebrow">BELEGGERSBORREL / UTRECHT</span>
            <h2>Een avond met andere perspectieven.</h2>
            <p>
              Een spreker, beleggers, drankjes en borrelhapjes. Ruimte voor jouw
              vragen.
            </p>
            <div className="event-inline-facts">
              <span>
                <MapPin size={16} />
                Winkel van Sinkel
              </span>
              <span>
                <Clock3 size={16} />
                {communityEvent.time}
              </span>
            </div>
          </div>
          <div className="event-list-action">
            <span>{communityEvent.ticket}</span>
            <b>
              Bekijk het event <ArrowUpRight size={19} />
            </b>
            <small>Beschikbaarheid via Weeztix</small>
          </div>
        </Link>
      </section>
      <EventProgram />
      <OnlineEventConcept />
      <Newsletter context="events" variant="compact" />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <section className="personal-hero">
        <div>
          <span className="eyebrow">OVER MIJ / ACHTER BEURSWATCHER</span>
          <h1>
            Daniël.
            <br />
            <em>
              De blik achter
              <br />
              de verrekijker.
            </em>
          </h1>
          <p>
            Ik maak met Beurswatcher ruimte voor de vragen achter je geld. Over
            beleggen, vermogen en de keuzes voor later.
          </p>
          <div>
            <Link
              href="#daniel-in-je-feed"

              className="button yellow"
            >
              Bekijk mijn verhalen <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact" className="textlink">
              Stel je vraag <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="personal-brand">
          <span>BELEGGEN. VERMOGEN. JOUW TOEKOMST.</span>
          <BrandMark />
          <div>
            <b>Daniël / Beurswatcher</b>
            <span>Nieuwsgierig blijven. Verder kijken.</span>
          </div>
        </div>
      </section>
      <section className="personal-channels">
        <Link href={instagramUrl} target="_blank" rel="noreferrer">
          <Camera />
          <span>01 / INSTAGRAM</span>
          <h3>De eerste vraag.</h3>
          <p>Korte verhalen die beleggen en geldkeuzes dichtbij brengen.</p>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/tools">
          <Layers />
          <span>02 / DE WEBSITE</span>
          <h3>Jouw eigen inzicht.</h3>
          <p>Meer context, rekentools en ruimte om aannames te onderzoeken.</p>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/events">
          <Users />
          <span>03 / ONTMOETINGEN</span>
          <h3>Het goede gesprek.</h3>
          <p>
            Nieuwe perspectieven van mensen die met dezelfde vragen rondlopen.
          </p>
          <ArrowUpRight size={19} />
        </Link>
      </section>
      <section className="about-story">
        <span className="eyebrow">DE VRAAG ACHTER DE VERREKIJKER</span>
        <h2>
          Wat betekent dit
          <br />
          <em>voor jouw geld?</em>
        </h2>
        <div>
          <p>
            Een koers is snel gedeeld. Begrijpen wat erachter zit, vraagt meer
            ruimte. Daarom komen de korte inzichten van Daniël hier samen met
            uitleg en rekentools.
          </p>
          <p>
            Van je eerste belegging tot je portefeuille en pensioen:
            Beurswatcher nodigt je uit om vragen te stellen, aannames te
            onderzoeken en zelf verder te kijken.
          </p>
          <Link href="/tools" className="textlink">
            Onderzoek jouw scenario <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <div className="brand-principles">
        {[
          [
            '01',
            'Begrijp het verhaal',
            'De context achter een bedrag is minstens zo interessant als het bedrag zelf.',
          ],
          [
            '02',
            'Maak het concreet',
            'Reken met je eigen aannames. Kijk hoe een andere horizon of inleg het beeld verandert.',
          ],
          [
            '03',
            'Blijf afwegen',
            'Een dienst is pas relevant als je begrijpt waarvoor die bedoeld is en wat de voorwaarden zijn.',
          ],
        ].map(([n, h, p]) => (
          <article key={n}>
            <span>{n}</span>
            <h3>{h}</h3>
            <p>{p}</p>
          </article>
        ))}
      </div>
      <ReelRail />
      <section className="about-transparency">
        <BrandMark />
        <div>
          <span className="eyebrow">OPEN OVER SAMENWERKEN</span>
          <h2>Ook de samenwerking hoort bij het verhaal.</h2>
          <p>
            Beurswatcher werkt met commerciële partners. Je ziet bij de
            betreffende inhoud en links wanneer een samenwerking speelt. De
            context, kosten en aandachtspunten helpen je zelf afwegen.
          </p>
          <Link href="/partners" className="textlink">
            Bekijk de samenwerkingen <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Link className="business-text-link" href="/zakelijk-samenwerken">
        Als merk iets toevoegen? Ontdek zakelijk samenwerken{' '}
        <ArrowUpRight size={18} />
      </Link>
    </>
  );
}
export function NewsletterPage() {
  return (
    <>
      <section className="newsletter-hero-v3">
        <div>
          <span className="eyebrow">EEN MOMENT VOOR HET GROTERE PLAATJE</span>
          <h1>
            De beursweek.
            <br />
            <em>Zonder de ruis.</em>
          </h1>
          <p>
            De belangrijkste onderwerpen, de week vooruit en nieuwe manieren om
            je eigen geldvragen te onderzoeken.
          </p>
          <Link href="#weekbrief" className="button yellow">
            Zet mij op de lijst <ArrowRight size={18} />
          </Link>
          <div className="newsletter-channel">
            <Camera size={18} />
            Dagelijks op Instagram.
            <span />
            <Mail size={18} />
            Overzicht in je inbox.
          </div>
        </div>
        <div className="letter-preview">
          <div>
            <BrandMark />
            <span>
              BEURSWATCHER
              <br />
              DE WEEKBRIEF
            </span>
            <Mail />
          </div>
          <span className="eyebrow">ZO IS DE BRIEF OPGEBOUWD</span>
          <h2>
            Even uitzoomen.
            <br />
            Dan weer vooruit.
          </h2>
          {[
            ['01', 'Dit doet ertoe', 'De ontwikkeling achter de koers.'],
            [
              '02',
              'De week op de radar',
              'Macro, earnings en relevante momenten.',
            ],
            [
              '03',
              'Zelf verder kijken',
              'Nieuwe uitleg, tools en Beurswatcher-content.',
            ],
          ].map(([n, h, p]) => (
            <div className="letter-row" key={n}>
              <span>{n}</span>
              <div>
                <b>{h}</b>
                <p>{p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div id="weekbrief" className="newsletter-signup">
        <Newsletter />
        <p className="signup-note">
          Je meldt je aan voor de toekomstige weekbrief. E-mailverzending is nog
          niet gestart. Je aanmelding kun je verwijderen via je persoonlijke
          afmeldlink.
        </p>
      </div>
      <section className="newsletter-meanwhile">
        <h2>Tot die tijd al verder kijken?</h2>
        <Link href="/markt">
          <Radio />
          Open het marktoverzicht <ArrowRight />
        </Link>
        <Link href="/tools">
          <Layers />
          Onderzoek je eigen scenario <ArrowRight />
        </Link>
        <Link href={instagramUrl} target="_blank" rel="noreferrer">
          <Camera />
          Bekijk de dagelijkse content <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}
export function MarketHub() {
  return <MarketDashboard />;
}
