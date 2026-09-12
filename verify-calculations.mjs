import assert from 'node:assert/strict';
import { futureValue, boxTax } from './app/data.ts';
import {
  requiredMonthly,
  purchasingPower,
  netOfFees,
} from './app/calculations.ts';
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, `${a} != ${b}`);
assert.equal(futureValue(10000, 250, 0, 20), 70000);
near(futureValue(10000, 0, 6, 1), 10600);
near(futureValue(10000, 0, -10, 1), 9000);
assert.equal(boxTax(20000, 20000, 0, false).tax, 0);
near(boxTax(0, 100000, 0, false).tax, 877.8888);
assert.equal(boxTax(0, 100000, 0, true).tax, 0);
assert.equal(boxTax(1000, 1000, 100000, false).tax, 0);
near(requiredMonthly(70000, 10000, 0, 20), 250);
assert.equal(requiredMonthly(5000, 10000, 0, 20), 0);
for (const rate of [-20, 0, 6, 15])
  near(
    futureValue(10000, requiredMonthly(500000, 10000, rate, 20), rate, 20),
    500000,
  );
near(purchasingPower(12100, 10, 2), 10000);
near(purchasingPower(10000, 0, 20), 10000);
near(netOfFees(6, 0), 6);
near(netOfFees(6, 1), 4.94);
assert.ok(
  futureValue(10000, 250, netOfFees(6, 0.15), 20) >
    futureValue(10000, 250, netOfFees(6, 1), 20),
);
console.log(
  '18 financiële rekencontroles geslaagd: nul/negatief rendement, doelvermogen, kosten, inflatie en box 3',
);
