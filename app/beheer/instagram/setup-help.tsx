import { useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import { instagramHelpMessage } from '../../instagram-notice-messages';
import styles from './setup.module.css';

export function SetupHelp(props: Parameters<typeof instagramHelpMessage>[0]) {
  const text = instagramHelpMessage(props);
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
        Kopieer dit bericht en stuur het naar mij. Het bevat alleen de status en
        de stap die je hier open hebt. Voeg zelf toe waar je bij Meta vastloopt.
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
