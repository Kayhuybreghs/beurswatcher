# Beurswatcher op je telefoon

Na deployment op Vercel kun je de HTTPS-link rechtstreeks delen via WhatsApp en openen op je telefoon. Je laptop hoeft dan niet aan te blijven.

## Tijdelijk via je eigen wifi

1. Bouw lokaal met `pnpm build` en start met `pnpm start` (poort 5186).
2. Zoek het wifi-adres van de computer via `ipconfig`.
3. Start in een tweede terminal `node phone-preview.mjs <wifi-adres>`.
4. Open de `PHONE_PREVIEW`-link uit de terminal op je telefoon.

Beide apparaten moeten op hetzelfde netwerk zitten. De tijdelijke toegangscode verloopt na 12 uur; houd beide processen en de computer aan. De link bevat een persoonlijke toegangscode: zet hem niet in GitHub. Stop de brug met Ctrl+C.
