import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export function ogImage({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  const fontSize = title.length > 60 ? 54 : title.length > 40 ? 64 : 76;
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', background: '#16333a', color: '#fffdf8', padding: '64px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', width: 64, height: 64, alignItems: 'center', justifyContent: 'center', background: '#f6f5ed', color: '#16333a', fontSize: 44, fontWeight: 800 }}>B.</div>
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#dfbb82' }}>BRICKELL HOMES FOR SALE</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, color: '#8fc7c3' }}>{eyebrow.toUpperCase()}</div>
        <div style={{ display: 'flex', fontSize, lineHeight: 1.12, fontWeight: 700, maxWidth: 1040 }}>{title}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#b9cdca' }}>{note ?? 'Independent buyer guides • No MLS listings or prices'}</div>
    </div>,
    ogSize
  );
}
