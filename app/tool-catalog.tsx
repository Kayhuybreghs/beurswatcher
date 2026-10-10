'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from './site-link';
import { toolItems, futureValue } from './data';
import { ToolVisual, useVisualDeck } from './tool-visual';
import { AnimatedNumber } from './motion';
const groups: Record<string, string> = {
  rendement: 'Opbouwen',
  'compound-interest': 'Opbouwen',
  doelvermogen: 'Opbouwen',
  'etf-kosten': 'Kosten & koopkracht',
  'box-3': 'Kosten & koopkracht',
  inflatie: 'Kosten & koopkracht',
  'aflossen-of-beleggen': 'Keuzes afwegen',
  'lump-sum-dca': 'Keuzes afwegen',
  dividend: 'Opbouwen',
};
export function ToolCatalog() {
  const [filter, setFilter] = useState('Alle tools'),
    [years, setYears] = useState(20);
  const { root, active, events } = useVisualDeck(filter);
  return (
    <>
      <section className="workshop-hero">
        <div className="workshop-copy">
          <span className="eyebrow">
            <SlidersHorizontal size={16} /> GRATIS FINANCIËLE REKENTOOLS
          </span>
          <h1>
            Wat levert je inleg op?
            <br />
            <em>Reken het zelf uit.</em>
          </h1>
          <p>
            Bereken mogelijke vermogensgroei, vergelijk kosten of onderzoek
            hoeveel je per maand moet inleggen. Jij kiest de bedragen en
            aannames.
          </p>
          <Link href="#rekentools" className="button yellow">
            Bekijk alle rekentools <ArrowRight size={18} />
          </Link>
          <span className="workshop-note">
            9 tools · Gratis · Zonder account
          </span>
        </div>
        <div className="workshop-demo">
          <span className="eyebrow">HOEVEEL VERSCHIL MAAKT DE LOOPTIJD?</span>
          <p>€ 250 per maand, vanaf nul</p>
          <strong>
            <AnimatedNumber
              value={futureValue(0, 250, 6, years)}
              format={(n) =>
                new Intl.NumberFormat('nl-NL', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0,
                }).format(n)
              }
            />
          </strong>
          <div className="hero-growth-bars" aria-hidden="true">
            {[4, 8, 12, 16, 20, 24, 28, 32].map((y, i) => (
              <i
                key={y}
                style={{
                  height:
                    15 +
                    (futureValue(0, 250, 6, (years * (i + 1)) / 8) /
                      futureValue(0, 250, 6, 30)) *
                      115 +
                    'px',
                }}
              />
            ))}
          </div>
          <Tabs
            value={String(years)}
            onValueChange={(v) => setYears(Number(v))}
          >
            <TabsList aria-label="Kies je voorbeeldhorizon">
              {[10, 20, 30].map((y) => (
                <TabsTrigger key={y} value={String(y)}>
                  {y} jaar
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <small>
            Rekenvoorbeeld bij 6% rendement. Zonder kosten, inflatie of
            belasting. Rendement is onzeker.
          </small>
        </div>
      </section>
      <div className="catalog-heading" id="rekentools">
        <div>
          <span className="eyebrow">KIES JE BEREKENING</span>
          <h2>Wat wil je berekenen?</h2>
        </div>
        <span>Open een tool en vul je eigen bedragen in.</span>
      </div>
      <Tabs
        className="catalog-filters"
        value={filter}
        onValueChange={(v) => setFilter(String(v))}
      >
        <TabsList aria-label="Filter rekentools">
          {[
            'Alle tools',
            'Opbouwen',
            'Kosten & koopkracht',
            'Keuzes afwegen',
          ].map((x) => (
            <TabsTrigger value={x} key={x}>
              {x}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="tool-catalog" ref={root}>
        {toolItems
          .filter((t) => filter === 'Alle tools' || groups[t.slug] === filter)
          .map((t) => (
            <Link
              className={'tool-product product-' + t.slug}
              key={t.slug}
              href={'/tools/' + t.slug}
              {...events(t.slug)}
            >
              <div className="tool-product-top">
                <span>{groups[t.slug]}</span>
                <ArrowUpRight size={23} />
              </div>
              <ToolVisual slug={t.slug} active={active === t.slug} />
              <h2>{t.title}</h2>
              <p>{t.text}</p>
              <span className="textlink">
                Open de tool <ArrowRight size={17} />
              </span>
            </Link>
          ))}
      </div>
      <p className="catalog-note">
        De afbeeldingen tonen rekenvoorbeelden. Elke tool legt uit welke
        aannames en beperkingen bij de uitkomst horen.
      </p>
    </>
  );
}
