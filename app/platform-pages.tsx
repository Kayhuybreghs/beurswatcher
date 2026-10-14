'use client';
import { aboutParagraphs } from './about-copy';
const aboutAccents =
  /((?:begrijpelijke en nuchtere manier)|(?:verder dan alleen rendement)|(?:duidelijke uitleg waar je zelf iets mee kunt)|(?:zelf betere financiële keuzes)|(?:vermogensgroei voor de lange termijn))/g;
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  Camera,
  Mail,
  BookOpen,
  Sparkles,
  Layers,
  Radio,
} from 'lucide-react';
import Link from './site-link';
import { BrandMark, instagramUrl } from './brand';
import { MarketDashboard } from './market-dashboard';
import { BrandEvents } from './brand-events';
import { ContactForm } from './contact-form';
import { ReelRail } from './reels';
import { Newsletter } from './widgets';
export function BusinessPage() {
  return (
    <>
      <section className="business-hero">
        <div>
          <span className="eyebrow">BEURSWATCHER × JOUW MERK</span>
          <h1>
            Samenwerken met
            <br />
            <em>Beurswatcher.</em>
          </h1>
          <p>
            Wil je als bedrijf uitleg geven over een financiële dienst of een
            onderwerp rond beleggen, vermogen of pensioen? Bespreek je voorstel
            met Beurswatcher.
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
          <span className="orbit-caption">UITLEG VIA SOCIAL EN DE WEBSITE</span>
        </div>
      </section>
      <section className="business-audience">
        <span className="eyebrow">DE COMMUNITY</span>
        <h2>
          Voor lezers met vragen
          <br />
          over beleggen en geld.
        </h2>
        <p>
          Bezoekers lezen hier over beleggen, vermogen en pensioen. Met de
          gratis tools rekenen zij zelf uit wat bijvoorbeeld inleg, looptijd en
          kosten voor een financieel scenario betekenen.
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
            <span className="eyebrow">MOGELIJKE VORMEN</span>
            <h2>Waarover kunnen we samenwerken?</h2>
          </div>
          <p>Inhoud, vorm en publicatie spreken we per voorstel af.</p>
        </div>
        {[
          [
            '01',
            'Reels & social',
            'Korte video’s die een financieel begrip of de werking van een dienst uitleggen.',
            Camera,
          ],
          [
            '02',
            'Verdieping & tools',
            'Een informatieartikel of rekenvoorbeeld waarmee lezers een onderwerp beter kunnen begrijpen.',
            BookOpen,
          ],
          [
            '03',
            'Productuitleg',
            'Uitleg over functies, kosten en beperkingen van een dienst, met herkenbare vermelding van de samenwerking.',
            Users,
          ],
          [
            '04',
            'Campagnes & maatwerk',
            'Een combinatie van publicaties op de website en Instagram, met vooraf afgesproken inhoud en planning.',
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
          Zo bespreken we
          <br />
          een samenwerking.
        </h2>
        <div>
          {[
            [
              'Je voorstel',
              'Welke dienst of welk onderwerp wil je toelichten, en voor welke lezers?',
            ],
            [
              'Inhoud afstemmen',
              'We bespreken welke uitleg nodig is en waar die op de website of Instagram past.',
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
          <span className="eyebrow">EEN VOORSTEL INDIENEN</span>
          <h2>
            Beschrijf je bedrijf
            <br />
            en je voorstel.
          </h2>
          <p>
            Vermeld welk onderwerp je wilt uitleggen, voor wie het bedoeld is en
            aan welke vorm je denkt.
          </p>
          <Link className="textlink" href="/partners">
            Bekijk de informatie over aanbieders <ArrowRight size={17} />
          </Link>
        </div>
        <ContactForm business />
      </div>
    </>
  );
}
export function EventsHub() {
  return <BrandEvents />;
}
export function AboutPage() {
  return (
    <>
      <section className="personal-hero">
        <div>
          <span className="eyebrow">OVER MIJ / ACHTER BEURSWATCHER</span>
          <h1>
            Daniel.
            <br />
            <em>
              De maker van
              <br />
              Beurswatcher.
            </em>
          </h1>
          <p>
            Ik ben Daniel van der Roest. Met Beurswatcher leg ik beleggen,
            vermogensgroei en financiële onderwerpen begrijpelijk en nuchter
            uit.
          </p>
          <div>
            <Link href="#verhaal" className="button yellow">
              Lees mijn verhaal <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact" className="textlink">
              Neem contact op <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="personal-brand">
          <span>BELEGGEN. VERMOGEN. JOUW TOEKOMST.</span>
          <BrandMark />
          <div>
            <b>Daniel / Beurswatcher</b>
            <span>Het heft in eigen handen nemen.</span>
          </div>
        </div>
      </section>
      <section className="personal-channels">
        <Link href={instagramUrl} target="_blank" rel="noreferrer">
          <Camera />
          <span>01 / INSTAGRAM</span>
          <h2>Korte uitleg op Instagram.</h2>
          <p>Video’s over beleggen, vermogen en geldzaken.</p>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/tools">
          <Layers />
          <span>02 / GRATIS TOOLS</span>
          <h2>Zelf bedragen berekenen.</h2>
          <p>Bereken wat inleg, looptijd, rendement en kosten veranderen.</p>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/artikelen">
          <BookOpen />
          <span>03 / VERDIEPING</span>
          <h2>Lees de uitleg per onderwerp.</h2>
          <p>Artikelen over onder meer ETF’s, pensioen, spreiding en kosten.</p>
          <ArrowUpRight size={19} />
        </Link>
      </section>
      <section className="about-story" id="verhaal">
        <div className="about-story-heading">
          <span className="eyebrow">WAAROM IK BEURSWATCHER BEGON</span>
          <h2>
            Het heft in
            <br />
            <em>eigen handen.</em>
          </h2>
          <span className="about-story-rule" aria-hidden="true" />
        </div>
        <div className="about-story-copy">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph
                .split(aboutAccents)
                .map((part, i) =>
                  i % 2 ? <strong key={i}>{part}</strong> : part,
                )}
            </p>
          ))}
          <Link href="/tools" className="textlink">
            Bekijk de gratis rekentools <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <div className="brand-principles">
        {[
          [
            '01',
            'Lees de uitleg',
            'Lees hoe financiële begrippen werken, met voorbeelden en uitleg over risico’s.',
          ],
          [
            '02',
            'Bereken je scenario',
            'Vul bedragen en een looptijd in. Vergelijk wat een andere inleg of ander rendement doet.',
          ],
          [
            '03',
            'Vergelijk kosten en voorwaarden',
            'Lees wat een dienst biedt, welke kosten je betaalt en welke beperkingen gelden.',
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
          <span className="eyebrow">UITLEG OVER AANBIEDERS</span>
          <h2>Wat doen de diensten onder Partners?</h2>
          <p>
            Op de partnerpagina’s lees je welke functies een dienst biedt en
            welke kosten en voorwaarden gelden. De bronnen staan erbij. Een
            commerciële link herken je aan een vermelding bij de link.
          </p>
          <Link href="/partners" className="textlink">
            Bekijk de aanbieders en hun diensten <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Link className="business-text-link" href="/zakelijk-samenwerken">
        Voor bedrijven: samenwerken met Beurswatcher <ArrowUpRight size={18} />
      </Link>
    </>
  );
}
export function NewsletterPage() {
  return (
    <>
      <section className="newsletter-hero-v3">
        <div>
          <span className="eyebrow">BEURSWATCHER / NIEUWSBRIEF</span>
          <h1>
            De nieuwsbrief.
            <br />
            <em>Nog niet gestart.</em>
          </h1>
          <p>
            Je kunt je e-mailadres achterlaten voor de toekomstige nieuwsbrief
            van Beurswatcher. Er worden nu nog geen nieuwsbrieven verstuurd. Een
            startdatum is nog niet bekend.
          </p>
          <Link href="#weekbrief" className="button yellow">
            Aanmelden voor de toekomstige nieuwsbrief <ArrowRight size={18} />
          </Link>
          <div className="newsletter-channel">
            <Camera size={18} />
            Uitleg op Instagram.
            <span />
            <Mail size={18} />
            Nieuwsbrief in voorbereiding.
          </div>
        </div>
        <div className="letter-preview">
          <div>
            <BrandMark />
            <span>
              BEURSWATCHER
              <br />
              DE NIEUWSBRIEF
            </span>
            <Mail />
          </div>
          <span className="eyebrow">BEOOGDE ONDERWERPEN</span>
          <h2>
            Artikelen en tools,
            <br />
            bij elkaar in je inbox.
          </h2>
          {[
            ['01', 'Artikelen', 'Uitleg over beleggen, vermogen en pensioen.'],
            [
              '02',
              'Marktinformatie',
              'Economische cijfers en toelichting op beursbewegingen.',
            ],
            [
              '03',
              'Gratis tools',
              'Berekeningen en uitleg over de gebruikte aannames.',
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
          Je meldt je aan voor de toekomstige nieuwsbrief. E-mailverzending is
          nog niet gestart. Je aanmelding kun je verwijderen via je persoonlijke
          afmeldlink.
        </p>
      </div>
      <section className="newsletter-meanwhile">
        <h2>Deze onderdelen kun je nu al gebruiken.</h2>
        <Link href="/markt">
          <Radio />
          Open het marktoverzicht <ArrowRight />
        </Link>
        <Link href="/tools">
          <Layers />
          Bekijk de gratis tools <ArrowRight />
        </Link>
        <Link href={instagramUrl} target="_blank" rel="noreferrer">
          <Camera />
          Bekijk Beurswatcher op Instagram <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}
export function MarketHub() {
  return <MarketDashboard />;
}
