/* Local editorial images use explicit layout dimensions; no image optimization service is configured. */
/* oxlint-disable next/no-img-element */
'use client';
import Link from './site-link';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Menu,
  X,
  Check,
  Share2,
} from 'lucide-react';
import {
  ArticleArchive,
  InvestingHub,
  KnowledgeFigure,
} from './editorial-pages';
import { articles } from './data';
import { SectionTitle, ArticleCard, Newsletter } from './widgets';
import {
  MarketTicker,
  ToolsExperience,
  PartnersExperience,
  MarketExperience,
} from './experience';
import { NextSteps } from './journeys';
import { useEditorialMotion } from './motion';
import { BrandLogo, instagramUrl } from './brand';
import { BrandHome } from './brand-home';
import { ContactForm } from './contact-form';
import {
  BusinessPage,
  EventsHub,
  AboutPage,
  NewsletterPage,
} from './platform-pages';
import { ArticleProgress, SiteSearch } from './reading-paths';
const navItems = [
  'Beleggen',
  'Markt',
  'Tools',
  'Verdieping',
  'Partners',
  'Events',
  'Over mij',
];
const navPath = (title: string) =>
  title === 'Over mij'
    ? 'over'
    : title === 'Verdieping'
      ? 'artikelen'
      : title.toLowerCase();
function Logo() {
  return <BrandLogo />;
}
function Home() {
  return <BrandHome />;
}

function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        {!/[.!?]$/.test(title) && <span className="dot">.</span>}
      </h1>
      {text && <p>{text}</p>}
    </div>
  );
}
function Archive(props: { topic?: string; search?: boolean }) {
  return <ArticleArchive {...props} />;
}

function Article({ slug }: { slug: string }) {
  const a = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  if (!a) return <Missing />;
  return (
    <>
      <ArticleProgress />
      <div className="article-heading">
        <Link href="/artikelen" className="textlink">
          ← Alle artikelen
        </Link>
        <p className="eyebrow">{a.category} · REDACTIONEEL VOORBEELD</p>
        <h1>{a.title}</h1>
        <p className="dek">{a.intro}</p>
        <div className="article-meta">
          <span className="mini-logo">BW.</span>Beurs Watcher{' '}
          <span>{a.read} min lezen</span>
          <button
            className="textlink"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}{' '}
            {copied ? 'Link gekopieerd' : 'Deel artikel'}
          </button>
        </div>
      </div>
      <div className="article-diagram">
        <KnowledgeFigure topic={a.category} />
        <div>
          <span className="eyebrow">JE LEEST OVER</span>
          {a.sections.map(([h], i) => (
            <a href={'#onderdeel-' + i} key={h}>
              <span>0{i + 1}</span>
              {h}
              <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="article-layout">
        <aside>
          <p className="eyebrow">IN DIT ARTIKEL</p>
          {a.sections.map(([h], i) => (
            <Link href={'#onderdeel-' + i} key={h}>
              {h}
            </Link>
          ))}
        </aside>
        <article className="reading">
          <div className="takeaway">
            <p className="eyebrow">OM TE ONTHOUDEN</p>
            <p>
              {a.category === 'ETF'
                ? 'Bekijk de index, de spreiding en alle kosten samen. Een wereldwijde naam zegt nog niet hoe je geld verdeeld is.'
                : a.sections[0][1]}
            </p>
          </div>
          {a.sections.map(([h, p], i) => (
            <section id={'onderdeel-' + i} key={h}>
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
          <NextSteps topic={a.category} from="article" />
          <p className="subtle">
            Algemene educatieve voorbeeldinhoud. Geen persoonlijk
            beleggingsadvies. Rendement is onzeker en je kunt je inleg
            verliezen.
          </p>
        </article>
      </div>
      <section className="section">
        <SectionTitle eyebrow="VERDER KIJKEN" title="Meer perspectief" />
        <div className="three-grid">
          {articles
            .filter((b) => b.slug !== slug)
            .sort(
              (b, c) =>
                Number(c.category === a.category) -
                Number(b.category === a.category),
            )
            .slice(0, 3)
            .map((b) => (
              <ArticleCard key={b.slug} article={b} />
            ))}
        </div>
      </section>
      <Newsletter context="education" variant="compact" />
    </>
  );
}
function Investing({ sub }: { sub?: string }) {
  return <InvestingHub sub={sub} />;
}

function PartnerPage({ slug }: { slug?: string }) {
  return <PartnersExperience slug={slug} />;
}
function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="IN GESPREK"
        title="Een vraag of een ander perspectief?"
        text="Voor redactionele vragen, suggesties en gastbijdragen."
      />
      <ContactForm />
      <Link href="/zakelijk-samenwerken" className="business-text-link">
        Een voorstel namens een merk? Bespreek een samenwerking{' '}
        <ArrowRight size={18} />
      </Link>
    </>
  );
}
function Unsubscribe() {
  const [email, setEmail] = useState(''),
    [state, setState] = useState('');
  return (
    <>
      <PageIntro
        eyebrow="NIEUWSBRIEF"
        title="Je aanmelding verwijderen"
        text="Verwijder je e-mailadres uit de aanmeldlijst."
      />
      <form
        className="contact-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const r = await fetch('/api/nieuwsbrief', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                token: new URLSearchParams(location.search).get('token'),
              }),
            });
            if (!r.ok) throw Error();
            setState('Je aanmelding is verwijderd.');
          } catch {
            setState(
              'Verwijderen is niet gelukt. Gebruik je persoonlijke afmeldlink of stuur een verzoek via Contact.',
            );
          }
        }}
      >
        <label>
          E-mailadres
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button className="button">Aanmelding verwijderen</button>
        <output className="form-status">{state}</output>
        <Link className="textlink" href="/contact">
          Contact opnemen <ArrowRight size={17} />
        </Link>
      </form>
    </>
  );
}
function Missing() {
  return (
    <>
      <PageIntro
        eyebrow="404 · EVEN UIT KOERS"
        title="Deze pagina bestaat niet"
        text="We helpen je weer op weg naar een nieuw inzicht."
      />
      <div className="actions">
        <Link href="/" className="button">
          Naar de voorpagina <ArrowRight size={18} />
        </Link>
        <Link href="/zoeken" className="textlink">
          Zoeken <Search size={16} />
        </Link>
      </div>
    </>
  );
}
function Content({ path }: { path: string }) {
  const parts = path.split('/').filter(Boolean),
    root = parts[0],
    sub = parts[1];
  if (!root) return <Home />;
  if (root === 'artikelen') return sub ? <Article slug={sub} /> : <Archive />;
  if (root === 'zoeken') return <SiteSearch />;
  if (root === 'beleggen') return <Investing sub={sub} />;
  if (root === 'partners') return <PartnerPage slug={sub} />;
  if (root === 'tools') return <ToolsExperience slug={sub} />;
  if (root === 'markt') return <MarketExperience sub={sub} />;
  if (root === 'nieuwsbrief') return <NewsletterPage />;
  if (root === 'events') return <EventsHub slug={sub} />;
  if (root === 'over') return <AboutPage />;
  if (root === 'zakelijk-samenwerken') return <BusinessPage />;
  if (root === 'contact') return <Contact />;
  if (root === 'afmelden') return <Unsubscribe />;
  if (root === 'privacy')
    return (
      <>
        <PageIntro eyebrow="PRIVACY" title="Zorgvuldig met je gegevens" />
        <div className="reading">
          <h2>Wat deze website bewaart</h2>
          <p>
            Bij een nieuwsbriefaanmelding bewaren we je e-mailadres en het
            moment van toestemming. Bij een contactbericht bewaren we je naam,
            e-mailadres, bericht en de verzenddatum. Bij een zakelijk voorstel
            bewaren we ook je bedrijfsnaam en het gekozen onderwerp. Deze
            gegevens worden opgeslagen bij de hosting van deze website en zijn
            niet openbaar opvraagbaar.
          </p>
          <h2>Waarvoor</h2>
          <p>
            De aanmeldlijst is bedoeld voor de toekomstige nieuwsbrief.
            Automatische e-mailverzending is nog niet aangesloten.
            Contactgegevens worden gebruikt om je verzoek te behandelen.
          </p>
          <h2>Verwijderen</h2>
          <p>
            Gebruik de persoonlijke afmeldlink die na je aanmelding verschijnt,
            of dien een verwijderverzoek in via het contactformulier. Deel je
            afmeldlink niet met anderen.
          </p>
          <h2>Cookies en externe diensten</h2>
          <p>
            De marktweergaven worden geladen bij TradingView wanneer ze in beeld
            komen. De Instagram-speler wordt geladen als je een Reel op deze
            website opent. Deze externe diensten ontvangen dan onder meer je
            IP-adres en browsergegevens en hanteren hun eigen
            privacyvoorwaarden. De private hosting kan gegevens voor toegang en
            beveiliging verwerken.
          </p>
          <p>
            Dit is een besloten concept. De verantwoordelijke bedrijfsgegevens,
            definitieve bewaartermijnen en contactinformatie moeten vóór
            publieke ingebruikname worden aangevuld.
          </p>
          <Link href="/contact" className="textlink">
            Privacyverzoek sturen <ArrowRight size={17} />
          </Link>
        </div>
      </>
    );
  if (root === 'colofon')
    return (
      <>
        <PageIntro eyebrow="BRONNEN & TRANSPARANTIE" title="Colofon" />
        <div className="reading">
          <h2>Redactie</h2>
          <p>
            Beurs Watcher is het beleggingsplatform van Daniël. De artikelen in
            deze conceptversie zijn educatieve voorbeeldteksten. De markthub
            toont dagelijkse indexreeksen en Amerikaanse marktbewegingen via
            officiële TradingView-widgets, plus ECB-referentiekoersen,
            ECB-kalenderdata en een gedateerde nieuwsselectie van AP en Reuters.
            De ticker, radarkaart en aparte macro- en earningsvoorbeelden
            bevatten herkenbaar gemarkeerde demonstratiegegevens. Bij de
            marktweergaven staan bron, dekking en periode vermeld.
          </p>
          <h2>Logo en Reels</h2>
          <p>
            Het verrekijkerlogo is door Beurswatcher aangeleverd. De Reelbeelden
            zijn afkomstig van het officiële{' '}
            <Link href="https://www.instagram.com/beurswatcher/">
              Instagram-profiel van Beurswatcher
            </Link>
            . De Reelspeler en het origineel op Instagram hebben elk een eigen
            knop. Zolang Daniëls account nog niet is gekoppeld, tonen we de
            opgeslagen selectie. De status bij de Reels geeft aan of nieuwe
            video’s automatisch worden opgehaald.
          </p>
          <h2>Fotografie</h2>
          <p>
            Amsterdam:{' '}
            <Link href="https://commons.wikimedia.org/wiki/File:Amsterdam_-_canal_houses_(3415391411).jpg">
              Ernest McGray, Jr.
            </Link>{' '}
            ·{' '}
            <Link href="https://creativecommons.org/licenses/by-sa/2.0/">
              CC BY-SA 2.0
            </Link>
            . De foto wordt als uitsnede weergegeven; de aangepaste weergave
            valt onder dezelfde licentie.
          </p>
          <p>
            Siliciumwafer:{' '}
            <Link href="https://commons.wikimedia.org/wiki/File:Silicon_wafer_close_view.jpg">
              Le hollandais volant
            </Link>{' '}
            ·{' '}
            <Link href="https://creativecommons.org/licenses/by/4.0/">
              CC BY 4.0
            </Link>
            . Uitsnede voor het artikel.
          </p>
          <h2>Rekentools</h2>
          <p>
            De aannames en beperkingen staan bij iedere tool. De Box 3-tool
            verwijst naar de gebruikte gegevens van de Belastingdienst. Beleggen
            brengt risico’s met zich mee; de inhoud is geen persoonlijk
            beleggingsadvies.
          </p>
        </div>
      </>
    );
  return <Missing />;
}
export default function Platform({ path }: { path: string }) {
  useEditorialMotion(path);
  const [mobile, setMobile] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [menuTop, setMenuTop] = useState(114);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => setScrolled(scrollY > 60);
    update();
    addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const positionMenu = () => {
      if (innerWidth > 1100) setMobile(false);
      else setMenuTop(header.current?.getBoundingClientRect().bottom || 76);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobile(false);
        header.current
          ?.querySelector<HTMLButtonElement>('.menu-button')
          ?.focus();
      }
    };
    positionMenu();
    addEventListener('scroll', positionMenu, { passive: true });
    addEventListener('resize', positionMenu);
    addEventListener('keydown', closeOnEscape);
    return () => {
      removeEventListener('scroll', positionMenu);
      removeEventListener('resize', positionMenu);
      removeEventListener('keydown', closeOnEscape);
    };
  }, [mobile]);
  return (
    <>
      <Link className="skip" href="#inhoud">
        Naar de inhoud
      </Link>
      <MarketTicker />
      <header
        ref={header}
        className={'site-header' + (scrolled ? ' scrolled' : '')}
      >
        <Logo />
        <nav aria-label="Hoofdnavigatie">
          {navItems.map((t) => (
            <Link
              key={t}
              href={'/' + navPath(t)}
              aria-current={
                path.startsWith('/' + navPath(t)) ? 'page' : undefined
              }
            >
              {t}
            </Link>
          ))}
        </nav>
        <Link aria-label="Zoeken" href="/zoeken">
          <Search size={20} />
        </Link>
        <Link className="button small" href="/nieuwsbrief">
          Nieuwsbrief <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-button"
          aria-label={mobile ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={mobile}
          aria-controls="mobile-nav"
          onClick={() => {
            setMenuTop(header.current?.getBoundingClientRect().bottom || 76);
            setMobile(!mobile);
          }}
        >
          {mobile ? <X /> : <Menu />}
        </button>
      </header>
      {mobile && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobiele navigatie"
          style={{ top: menuTop, maxHeight: `calc(100dvh - ${menuTop}px)` }}
        >
          {[...navItems, 'Contact', 'Nieuwsbrief'].map((t) => (
            <Link
              href={'/' + navPath(t)}
              key={t}
              onClick={() => setMobile(false)}
            >
              {t}
              <ArrowUpRight size={19} />
            </Link>
          ))}
          <Link
            className="mobile-business"
            href="/zakelijk-samenwerken"
            onClick={() => setMobile(false)}
          >
            Zakelijk samenwerken <ArrowUpRight size={19} />
          </Link>
        </nav>
      )}
      <main
        id="inhoud"
        className="page-surface"
        data-area={path.split('/')[1] || 'home'}
      >
        <Content path={path} />
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              Investeren zonder ruis.
              <br />
              Korte inzichten op Instagram. Meer verdieping hier.
            </p>
          </div>
          <div>
            <h3>Verdiepen</h3>
            <Link href="/beleggen">Beleggen</Link>
            <Link href="/artikelen">Artikelen</Link>
            <Link href="/markt">Marktoverzicht</Link>
          </div>
          <div>
            <h3>Praktisch</h3>
            <Link href="/tools">Rekentools</Link>
            <Link href="/markt/macro">Macro-agenda</Link>
            <Link href="/markt/earnings">Earnings</Link>
          </div>
          <div>
            <h3>Beurs Watcher</h3>
            <Link href="/over">Over Daniël</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/zakelijk-samenwerken">Zakelijk samenwerken</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/nieuwsbrief">Nieuwsbrief</Link>
            <Link href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram ↗
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Beurs Watcher</span>
          <span>Beleggen kent risico’s. Je kunt je inleg verliezen.</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/colofon">Colofon & bronnen</Link>
        </div>
      </footer>
    </>
  );
}
