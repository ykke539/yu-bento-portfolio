import { ImageResponse } from 'next/og'
import { getAboutContent } from '@/lib/notion-about'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const { profile } = await getAboutContent()
  const m = Object.fromEntries(profile.map(p => [p.title, p.body]))

  const catchCopy = m['catch_copy'] || 'AI Native Product Designer × Design Engineer'
  const name = '優.bento'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#eae7e3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 装飾ライン */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#8B2E2E' }} />

        {/* ロゴ */}
        <div style={{ fontSize: '15px', color: '#9e9088', letterSpacing: '0.2em', marginBottom: '28px' }}>
          {name}
        </div>

        {/* キャッチコピー */}
        <div style={{ fontSize: '52px', fontWeight: 500, color: '#111110', lineHeight: 1.3, maxWidth: '900px' }}>
          {catchCopy}
        </div>

        {/* URL */}
        <div style={{ fontSize: '14px', color: '#b5afa9', marginTop: '32px', letterSpacing: '0.05em' }}>
          yu-bento-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
