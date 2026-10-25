import { useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import {
  instagramHelpMessage,
  instagramHelpProblem,
  instagramHelpProblems,
  type InstagramHelpProblem,
} from '../../instagram-notice-messages';
import styles from './setup.module.css';

export function SetupHelp(props: Parameters<typeof instagramHelpMessage>[0]) {
  const [problem, setProblem] = useState<InstagramHelpProblem>('not-sure');
  const selected = instagramHelpProblem(problem);
  const text = instagramHelpMessage({ ...props, problem: selected.id });
  const field = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(
        'Gekopieerd. Plak dit in je bericht aan mij en voeg toe waar je vastloopt.',
      );
    } catch {
      field.current?.focus();
      field.current?.select();
      setCopied(
        'Het bericht is geselecteerd. Kopieer het via je toetsenbord of het selectiemenu.',
      );
    }
  }
  return (
    <aside
      className={styles.support}
      id="instagram-hulp"
      aria-labelledby="instagram-help-title"
    >
      <h3 id="instagram-help-title">Kom je niet verder? Laat mij meekijken.</h3>
      <p>
        Kies hieronder wat je ziet. Je krijgt een korte uitleg. Kom je er niet
        uit? Kopieer daarna het hulpbericht en stuur het naar mij.
      </p>
      <label htmlFor="instagram-help-problem">Waar loop je vast?</label>
      <select
        id="instagram-help-problem"
        className={styles.helpSelect}
        value={selected.id}
        aria-describedby="instagram-help-advice"
        onChange={(event) => {
          setProblem(instagramHelpProblem(event.target.value).id);
          setCopied('');
        }}
      >
        {instagramHelpProblems.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <p
        id="instagram-help-advice"
        className={styles.helpAdvice}
        aria-live="polite"
        aria-atomic="true"
      >
        {selected.advice}
      </p>
      <label htmlFor="instagram-help-message">
        Hulpbericht voor je websitebouwer
      </label>
      <textarea
        id="instagram-help-message"
        ref={field}
        readOnly
        value={text}
        rows={7}
      />
      <button type="button" onClick={() => void copy()}>
        <Copy size={17} aria-hidden="true" /> Kopieer hulpbericht
      </button>
      <output aria-live="polite">{copied}</output>
      <small>
        Er wordt niets automatisch verstuurd. Stuur geen wachtwoord, App Secret,
        toegangscode of token mee. In een screenshot van Meta moeten die
        gegevens buiten beeld blijven.
      </small>
    </aside>
  );
}
