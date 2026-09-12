import assert from 'node:assert/strict';
import {
  inflationScenario,
  dividendScenario,
  entryScenario,
} from './app/scenario-math.ts';
import { selectReels, reels } from './app/reel-data.ts';
const near = (a, b) => assert.ok(Math.abs(a - b) < 0.0001, `${a} ≠ ${b}`);
near(inflationScenario(10000, 0, 20).at(-1).real, 10000);
near(inflationScenario(10000, 2.5, 20).at(-1).real, 10000 / 1.025 ** 20);
assert.ok(inflationScenario(10000, -2, 10).at(-1).real > 10000);
near(inflationScenario(0, 10, 20).at(-1).real, 0);
const one = dividendScenario(10000, 4, 3, 1).at(-1);
near(one.reinvested, 10700);
near(one.capital + one.cash, 10700);
const none = dividendScenario(10000, 4, 0, 20).at(-1);
near(none.reinvested, none.capital + none.cash);
const div = dividendScenario(10000, 0, 5, 2).at(-1);
near(div.reinvested, 11025);
near(div.capital + div.cash, 11000);
const negative = dividendScenario(10000, -10, 2, 10).at(-1);
assert.ok(negative.reinvested > 0 && negative.reinvested < 10000);
for (const path of ['steady', 'early-drop', 'late-drop']) {
  const single = entryScenario(10000, 6, 20, 1, 0, path).at(-1);
  near(single.lump, single.staged);
  near(single.lump, 10000 * 1.06 ** 20);
  const zero = entryScenario(0, 6, 20, 12, 2, path).at(-1);
  near(zero.lump, 0);
  near(zero.staged, 0);
}
const flat = entryScenario(10000, 0, 1, 12, 0, 'steady').at(-1);
near(flat.lump, 10000);
near(flat.staged, 10000);
const interest = entryScenario(10000, 0, 2, 12, 3, 'steady').at(-1);
assert.ok(interest.cash > 0);
near(interest.equity, 10000);
near(interest.staged, interest.equity + interest.cash);
const early = entryScenario(10000, 6, 10, 12, 0, 'early-drop').at(-1),
  late = entryScenario(10000, 6, 10, 12, 0, 'late-drop').at(-1);
near(early.lump, late.lump);
assert.ok(early.staged > late.staged);
const selected = selectReels([...reels].reverse());
assert.equal(selected.length, 6);
assert.equal(selected[0].id, 'DdA1zTEOOBH');
assert.equal(selectReels(reels, 'ETF').length, 1);
assert.equal(selectReels(reels, 'Reizen').length, 0);
assert.equal(selectReels([...reels, reels[0]]).length, 6);
assert.equal(
  selectReels([{ ...reels[0], url: 'https://example.com/reel/123' }]).length,
  0,
);
assert.equal(selectReels([{ ...reels[0], thumbnail: '' }]).length, 0);
console.log(
  'Nieuwe modellen en Reels gecontroleerd: inflatie/deflatie, dividend zonder dubbeltelling, instaptiming, cashrente, gelijke markteindwaarde, sortering, relevantie en ongeldige content.',
);
