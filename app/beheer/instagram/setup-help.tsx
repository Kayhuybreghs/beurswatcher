import { useState } from 'react';
import {
  instagramHelpProblem,
  instagramHelpProblems,
  type InstagramHelpProblem,
} from '../../instagram-notice-messages';
import styles from './setup.module.css';

export function SetupHelp() {
  const [problem, setProblem] = useState<InstagramHelpProblem>('not-sure');
  const selected = instagramHelpProblem(problem);
  return (
    <aside
      className={styles.support}
      id="instagram-hulp"
      aria-labelledby="instagram-help-title"
    >
      <h3 id="instagram-help-title">
        Lukt iets niet? Stuur mij een screenshot.
      </h3>
      <p>
        Maak een screenshot van het scherm waar je vastloopt en stuur die naar
        mij. Zet er kort bij wat je probeert te doen. Dan kijk ik met je mee.
      </p>
      <small>
        Laat je wachtwoord, App Secret, toegangscode, tokens en de adresbalk
        buiten beeld.
      </small>
      <details className={styles.help}>
        <summary>Eerst zelf kijken? Kies wat je op het scherm ziet.</summary>
        <label htmlFor="instagram-help-problem">Waar loop je vast?</label>
        <select
          id="instagram-help-problem"
          className={styles.helpSelect}
          value={selected.id}
          aria-describedby="instagram-help-advice"
          onChange={(event) => {
            setProblem(instagramHelpProblem(event.target.value).id);
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
      </details>
    </aside>
  );
}
