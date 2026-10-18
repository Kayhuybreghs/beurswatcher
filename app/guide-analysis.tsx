import { Download } from 'lucide-react';
import { downloadRows } from './calculations';
import type { GuideAnalysis } from './guide-analyses';
import './content-analysis.css';
// Keyboard users must be able to scroll the table when it is wider than the viewport.
/* oxlint-disable jsx-a11y/no-noninteractive-tabindex */

export function GuideAnalysisBlock({
  analysis,
  slug,
}: {
  analysis: GuideAnalysis;
  slug: string;
}) {
  return (
    <section
      className="reken-analysis"
      id="rekenanalyse"
      aria-labelledby="rekenanalyse-title"
    >
      <span className="eyebrow">BEURSWATCHER REKENT HET DOOR</span>
      <h2 id="rekenanalyse-title">{analysis.title}</h2>
      <p>{analysis.question}</p>
      <div className="analysis-assumptions">
        <h3>Dit houden we gelijk</h3>
        <ul>
          {analysis.assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      </div>
      <section
        className="analysis-table-wrap"
        aria-label="Scenariotabel, horizontaal te verschuiven op een klein scherm"
        tabIndex={0}
      >
        <table>
          <caption>
            Gekozen rekenvoorbeelden · bedragen afgerond voor weergave
          </caption>
          <thead>
            <tr>
              {analysis.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analysis.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => {
                  const value =
                    typeof cell === 'number'
                      ? cell.toLocaleString('nl-NL')
                      : cell;
                  return j === 0 ? (
                    <th key={j} scope="row">
                      {value}
                    </th>
                  ) : (
                    <td key={j}>{value}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="analysis-table-help">
        Bedragen zijn afzonderlijk afgerond; een optelsom kan € 1 afwijken. Past
        de tabel niet in beeld? Veeg binnen de tabel naar links.
      </p>
      <div className="analysis-findings">
        {analysis.findings.map(([heading, explanation]) => (
          <div key={heading}>
            <h3>{heading}</h3>
            <p>{explanation}</p>
          </div>
        ))}
      </div>
      <details className="analysis-method" open>
        <summary>Zo is dit berekend</summary>
        <p>{analysis.method}</p>
        <button
          type="button"
          className="analysis-download"
          onClick={() =>
            downloadRows('beurswatcher-' + slug, [
              ['Beurswatcher rekenanalyse', analysis.title],
              ['Website', 'https://www.beurswatcher.nl/uitleg/' + slug],
              ...analysis.assumptions.map((assumption) => [
                'Aanname',
                assumption,
              ]),
              ['Methode', analysis.method],
              ['Beperking', analysis.limitation],
              [],
              analysis.columns,
              ...analysis.rows,
            ])
          }
        >
          <Download size={17} aria-hidden="true" /> Download de tabel en
          aannames (CSV)
        </button>
      </details>
      <aside className="analysis-limit">
        <h3>Wat deze vergelijking niet bewijst</h3>
        <p>{analysis.limitation}</p>
      </aside>
      <p className="analysis-next">{analysis.nextStep}</p>
    </section>
  );
}
