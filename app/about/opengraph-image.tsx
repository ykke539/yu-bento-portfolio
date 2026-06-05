import { ImageResponse } from 'next/og'
import { getAboutContent } from '@/lib/notion-about'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const { profile } = await getAboutContent()
  const m = Object.fromEntries(profile.map(p => [p.title, p.body]))

  const catchCopy = m['catch_copy'] || 'AI Native Product Designer × Design Engineer'
  const intro = (m['intro'] || '').replace(/\n/g, ' ')

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
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#8B2E2E', display: 'flex' }} />
        <div style={{ display: 'flex', fontSize: '13px', color: '#9e9088', letterSpacing: '0.2em', marginBottom: '16px' }}>
          優.bento — About
        </div>
        <div style={{ display: 'flex', fontSize: '48px', fontWeight: 500, color: '#111110', lineHeight: 1.3, maxWidth: '900px', marginBottom: '24px' }}>
          {catchCopy}
        </div>
        <div style={{ display: 'flex', fontSize: '18px', color: '#7a6f64', maxWidth: '800px', lineHeight: 1.7 }}>
          {intro.slice(0, 80)}{intro.length > 80 ? '...' : ''}
        </div>
      </div>
    ),
    { ...size }
  )
}
