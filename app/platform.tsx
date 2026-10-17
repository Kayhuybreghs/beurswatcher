'use client';
import Link from './site-link';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Menu,
  Mail,
  MessageCircle,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Navigation } from './navigation';
import { useEditorialMotion } from './motion';
import { BrandLogo, instagramUrl } from './brand';

// Keep server-rendered content while splitting route-specific browser code.
const ArticleArchive = dynamic(() =>
  import('./editorial-pages').then((m) => m.ArticleArchive),
);
const InvestingHub = dynamic(() =>
  import('./editorial-pages').then((m) => m.InvestingHub),
);
const Article = dynamic(() => import('./sample-article'));
const GuidePage = dynamic(() =>
  import('./guide-pages').then((m) => m.GuidePage),
);
const ToolsExperience = dynamic(() =>
  import('./experience').then((m) => m.ToolsExperience),
);
const PartnersExperience = dynamic(() =>
  import('./partner-pages').then((m) => m.PartnerPages),
);
const MarketExperience = dynamic(() =>
  import('./market-experience').then((m) => m.MarketExperience),
);
const BrandHome = dynamic(() =>
  import('./brand-home').then((m) => m.BrandHome),
);
const WebsiteStory = dynamic(() =>
  import('./website-story').then((m) => m.WebsiteStory),
);
const ContactForm = dynamic(() =>
  import('./contact-form').then((m) => m.ContactForm),
);
const BusinessPage = dynamic(() =>
  import('./platform-pages').then((m) => m.BusinessPage),
);
const EventsHub = dynamic(() =>
  import('./platform-pages').then((m) => m.EventsHub),
);
const AboutPage = dynamic(() =>
  import('./platform-pages').then((m) => m.AboutPage),
);
const NewsletterPage = dynamic(() =>
  import('./platform-pages').then((m) => m.NewsletterPage),
);
const SiteSearch = dynamic(() =>
  import('./reading-paths').then((m) => m.SiteSearch),
);
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
        eyebrow="CONTACT"
        title="Een vraag over Beurswatcher?"
        text="Stuur een vraag over een artikel of tool, meld een fout of stel een onderwerp voor."
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
        eyebrow="404 · PAGINA NIET GEVONDEN"
        title="Deze pagina bestaat niet"
        text="Controleer het adres of zoek naar een artikel, onderwerp of tool."
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
  if (root === 'achter-de-website') return <WebsiteStory />;
  if (root === 'artikelen') return sub ? <Article slug={sub} /> : <Archive />;
  if (root === 'uitleg') return <GuidePage slug={sub} />;
  if (root === 'zoeken') return <SiteSearch />;
  if (root === 'verdieping') return <Investing sub={sub} />;
  if (root === 'partners') return <PartnerPage slug={sub} />;
  if (root === 'tools') return <ToolsExperience slug={sub} />;
  if (root === 'markt') return <MarketExperience sub={sub} />;
  if (root === 'nieuwsbrief') return <NewsletterPage />;
  if (root === 'events') return <EventsHub />;
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
          <h2 id="instagram">Instagram-koppeling</h2>
          <p>
            De eigenaar van het Instagram-account kan via de afgeschermde
            beheerpagina toestemming geven om profielgegevens en eigen Reels op
            te halen. De koppeling vraagt geen toegang tot privéberichten en kan
            geen berichten plaatsen. We bewaren het accountnummer, de
            gebruikersnaam, gegevens van de Reels en de selectie en titels voor
            deze website. Appgeheimen en toegangstokens worden versleuteld
            opgeslagen en zijn niet openbaar opvraagbaar.
          </p>
          <p>
            Je kunt de toestemming bij Instagram intrekken. Wil je ook de
            koppeling en opgeslagen accountgegevens laten verwijderen? Dien dan
            een verzoek in via het contactformulier en vermeld de
            gebruikersnaam. Stuur geen wachtwoord of appgeheim mee. Intrekken
            van toestemming verwijdert niet vanzelf de eerder opgeslagen
            selectie op deze website.
          </p>
          <h2>Cookies en externe diensten</h2>
          <p>
            De marktweergaven worden geladen bij TradingView wanneer ze in beeld
            komen. De Instagram-speler wordt geladen als je een Reel op deze
            website opent. Deze externe diensten ontvangen dan onder meer je
            IP-adres en browsergegevens en hanteren hun eigen
            privacyvoorwaarden. De hosting kan gegevens voor toegang en
            beveiliging verwerken.
          </p>
          <p>
            Deze privacyinformatie is nog niet compleet. De verantwoordelijke
            bedrijfsgegevens en bewaartermijnen moeten nog worden toegevoegd.
            Voor vragen over je gegevens kun je het contactformulier gebruiken.
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
            Beurswatcher biedt algemene uitleg en gratis financiële rekentools.
            De verdiepingspagina’s en tooluitleg zijn algemene informatieve
            teksten, niet Daniels persoonlijke analyses. De blogs met het label
            ‘redactioneel voorbeeld’ wachten nog op zijn inhoudelijke
            beoordeling. Het verhaal op de pagina Over mij is door Daniel
            aangeleverd. De markthub toont indicatieve indexprijzen via
            CFD-referenties en Amerikaanse marktbewegingen via officiële
            TradingView-widgets, plus ECB-referentiekoersen, een automatisch
            opgehaalde CBS- en BEA-planning, aangevuld met handmatig
            gecontroleerde momenten van BLS en de Federal Reserve. De
            voorbeeldkoers in de homepagekaart is gemarkeerd als
            voorbeeldgegeven. Bij de marktweergaven staan bron, dekking en
            periode vermeld.
          </p>
          <h2>Logo en Reels</h2>
          <p>
            Het verrekijkerlogo is door Beurswatcher aangeleverd. De Reelbeelden
            zijn afkomstig van het officiële{' '}
            <Link href="https://www.instagram.com/beurswatcher/">
              Instagram-profiel van Beurswatcher
            </Link>
            . De Reelspeler en het origineel op Instagram hebben elk een eigen
            knop. Zolang Daniels account nog niet is gekoppeld, tonen we de
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
          <h2>Samenwerkingen en commerciële links</h2>
          <p>
            De teksten over Scalable Capital, Delta, Brand New Day, Saxo en
            American Express zijn gebaseerd op de door Daniel aangeleverde
            samenwerkingsteksten. Productinformatie is gecontroleerd bij de
            aanbieder; de controledatum en bronnen staan per pagina vermeld.
            Rente, tarieven, beschikbaarheid en voorwaarden kunnen daarna
            wijzigen.
          </p>
          <p>
            Links met het label ‘Commerciële link’ zijn affiliate- of
            verwijzingslinks. Beurswatcher kan daarvoor een vergoeding
            ontvangen. Samenwerkingen worden bij de betreffende uitleg vermeld.
            Een genoemde aanbieder of een rekenvoorbeeld is geen persoonlijke
            aanbeveling om een product te kopen of een rekening te openen.
          </p>
          <p>
            De informatie houdt geen rekening met jouw volledige persoonlijke
            situatie. Voor persoonlijk financieel of fiscaal advies kun je een
            daarvoor bevoegde deskundige raadplegen.
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
    const closeOutside = (event: FocusEvent | PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !header.current?.contains(target) &&
        !document.getElementById('mobile-nav')?.contains(target)
      ) {
        // This is a non-modal navigation disclosure. Let the visitor continue
        // into the page, while removing the overlay above that focused content.
        setMobile(false);
      }
    };
    positionMenu();
    addEventListener('scroll', positionMenu, { passive: true });
    addEventListener('resize', positionMenu);
    addEventListener('keydown', closeOnEscape);
    document.addEventListener('focusin', closeOutside);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      removeEventListener('scroll', positionMenu);
      removeEventListener('resize', positionMenu);
      removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('focusin', closeOutside);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [mobile]);
  return (
    <>
      <Link className="skip" href="#inhoud">
        Naar de inhoud
      </Link>
      <header
        ref={header}
        className={'site-header' + (scrolled ? ' scrolled' : '')}
      >
        <Logo />
        <nav aria-label="Hoofdnavigatie">
          <Navigation path={path} />
        </nav>
        <Link aria-label="Zoeken" href="/zoeken">
          <Search size={20} />
        </Link>
        <Link className="button small" href="/tools">
          Gratis tools <ArrowUpRight size={16} />
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
          <Navigation path={path} mobile onNavigate={() => setMobile(false)} />
          <div className="mobile-secondary-links">
            <Link
              href="/contact"
              aria-current={path === '/contact' ? 'page' : undefined}
              onClick={() => setMobile(false)}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Contact
            </Link>
            <Link
              href="/nieuwsbrief"
              aria-current={path === '/nieuwsbrief' ? 'page' : undefined}
              onClick={() => setMobile(false)}
            >
              <Mail size={18} aria-hidden="true" />
              Nieuwsbrief
            </Link>
          </div>
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
              Het heft in eigen handen nemen.
              <br />
              Uitleg over geld en gratis rekentools.
            </p>
          </div>
          <div>
            <h3>Verdiepen</h3>
            <Link href="/artikelen#onderwerpen">Onderwerpen</Link>
            <Link href="/artikelen">Artikelen</Link>
            <Link href="/markt">Marktoverzicht</Link>
          </div>
          <div>
            <h3>Praktisch</h3>
            <Link href="/tools">Rekentools</Link>
            <Link href="/markt/macro">Macro-agenda</Link>
            <Link href="/markt/earnings">Bedrijfscijfers (voorbeeld)</Link>
            <Link href="/events">Events</Link>
          </div>
          <div>
            <h3>Beurswatcher</h3>
            <Link href="/over">Over mij</Link>
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
          <span>© 2026 Beurswatcher</span>
          <span>
            Algemene informatie, geen persoonlijk advies. Beleggen kent
            risico’s; je kunt je inleg verliezen.
          </span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/colofon">Colofon & bronnen</Link>
          <Link className="site-creator-credit" href="/achter-de-website">
            Website door <strong>Sitesnit</strong>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </>
  );
}
