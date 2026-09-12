'use client';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import Link from './site-link';
export function ContactForm({ business = false }: { business?: boolean }) {
  const [state, setState] = useState<'idle' | 'busy' | 'success' | 'error'>(
    'idle',
  );
  return (
    <form
      className="contact-form proposal-form"
      id="samenwerking-bespreken"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        setState('busy');
        try {
          const r = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...data,
              type: business ? 'business' : 'general',
            }),
          });
          if (!r.ok) throw Error();
          form.reset();
          setState('success');
        } catch {
          setState('error');
        }
      }}
    >
      <div className="form-heading">
        <span className="eyebrow">
          {business ? 'LATEN WE KENNISMAKEN' : 'IN GESPREK'}
        </span>
        <h2>{business ? 'Wat heb je in gedachten?' : 'Vertel het ons.'}</h2>
        <p>
          {business
            ? 'Een eerste idee is genoeg. Vertel over je merk, je doelgroep en wat je wilt bereiken.'
            : 'Een vraag, suggestie of ander perspectief is welkom.'}
        </p>
      </div>
      <div className="form-pair">
        <label>
          Jouw naam
          <input autoComplete="name" name="name" required maxLength={100} />
        </label>
        <label>
          E-mailadres
          <input
            autoComplete="email"
            name="email"
            type="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      {business && (
        <div className="form-pair">
          <label>
            Bedrijf of merk
            <input
              autoComplete="organization"
              name="company"
              required
              maxLength={150}
            />
          </label>
          <label>
            Waar denk je aan?
            <NativeSelect name="interest" defaultValue="Kennismaken">
              <NativeSelectOption>Kennismaken</NativeSelectOption>
              {[
                'Reels & social',
                'Inhoudelijke campagne',
                'Website & affiliate',
                'Event',
                'Maatwerk',
              ].map((x) => (
                <NativeSelectOption key={x}>{x}</NativeSelectOption>
              ))}
            </NativeSelect>
          </label>
        </div>
      )}
      <label>
        {business ? 'Jouw idee' : 'Jouw bericht'}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder={
            business
              ? 'Wat maakt jouw merk relevant voor de Beurswatcher-community?'
              : 'Waar wil je het over hebben?'
          }
        />
      </label>
      <p className="subtle">
        We bewaren je gegevens om je verzoek te behandelen.{' '}
        <Link href="/privacy">Privacy-informatie</Link>.
      </p>
      <button className="button yellow" disabled={state === 'busy'}>
        {state === 'busy'
          ? 'Opslaan…'
          : business
            ? 'Verstuur je voorstel'
            : 'Verstuur je bericht'}
        <ArrowUpRight size={18} />
      </button>
      <output className={'form-status state-' + state}>
        {state === 'success' ? (
          <>
            <CheckCircle2 size={20} /> Je {business ? 'voorstel' : 'bericht'} is
            opgeslagen. Bedankt! Beurswatcher kan je aanvraag nu behandelen.
          </>
        ) : state === 'error' ? (
          'Opslaan is niet gelukt. Je invoer blijft staan; probeer het opnieuw.'
        ) : (
          ''
        )}
      </output>
    </form>
  );
}
