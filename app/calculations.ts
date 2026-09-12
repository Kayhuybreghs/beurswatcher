export const taxConfig = {
  year: 2026,
  savingsRate: 0.0128,
  investmentRate: 0.06,
  debtRate: 0.027,
  debtThreshold: 3800,
  exemption: 59357,
  taxRate: 0.36,
  status: 'Voorlopige aanslag',
  checked: '7 september 2026',
};
export function purchasingPower(
  amount: number,
  inflation: number,
  years: number,
) {
  return amount / Math.pow(1 + inflation / 100, years);
}
export function requiredMonthly(
  target: number,
  initial: number,
  annual: number,
  years: number,
) {
  const r = Math.pow(1 + annual / 100, 1 / 12) - 1,
    n = years * 12,
    growth = Math.pow(1 + r, n),
    factor = Math.abs(r) < 1e-10 ? n : (growth - 1) / r;
  return Math.max(0, (target - initial * growth) / factor);
}
export function netOfFees(annual: number, fee: number) {
  return ((1 + annual / 100) * (1 - fee / 100) - 1) * 100;
}
export function downloadRows(name: string, rows: (string | number)[][]) {
  const content = rows
    .map((row) =>
      row.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(';'),
    )
    .join('\r\n');
  const url = URL.createObjectURL(
    new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = name + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}
