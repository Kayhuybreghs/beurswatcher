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
      <h3 id="instagram-help-title">Meldingen tijdens het koppelen</h3>
      <details className={styles.help}>
        <summary>Bekijk wat je bij een melding moet controleren</summary>
        <label htmlFor="instagram-help-problem">
          Wat zie je op het scherm?
        </label>
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
