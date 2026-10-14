import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt =
  'Beurswatcher: begrijpelijke uitleg over geld en gratis rekentools.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Local brand fonts keep image generation independent of external services.
const fonts = Promise.all([
  readFile(join(process.cwd(), 'public/inter-400.ttf')),
  readFile(join(process.cwd(), 'public/inter-700.ttf')),
]);

export default async function Image() {
  const [regular, bold] = await fonts;
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0d3261',
        color: '#fff',
        padding: '60px 72px',
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', fontSize: 35, fontWeight: 700 }}>
          beurswatcher<span style={{ color: '#e6bd00' }}>.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: '#c8d7e9' }}>
          www.beurswatcher.nl
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          width: 80,
          height: 6,
          background: '#e6bd00',
          marginTop: 53,
          marginBottom: 30,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 68,
          lineHeight: 1.08,
          letterSpacing: -2,
          fontWeight: 700,
        }}
      >
        <div style={{ display: 'flex' }}>Beleggen begrijpen.</div>
        <div style={{ display: 'flex', color: '#f1cd25' }}>Zelf berekenen.</div>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 27,
          lineHeight: 1.5,
          color: '#d8e3f0',
          marginTop: 29,
          maxWidth: 900,
        }}
      >
        Uitleg over beleggen, vermogen en pensioen. Gratis tools voor je inleg,
        rendement en kosten.
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 'auto',
          gap: 24,
          fontSize: 18,
          color: '#c8d7e9',
        }}
      >
        <span>ARTIKELEN</span>
        <span>REKENTOOLS</span>
        <span>MARKTINFORMATIE</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Inter', data: regular, style: 'normal', weight: 400 },
        { name: 'Inter', data: bold, style: 'normal', weight: 700 },
      ],
    },
  );
}
