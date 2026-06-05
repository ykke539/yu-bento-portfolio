import type { Metadata } from 'next'
import { DM_Mono, DM_Sans, Shippori_Mincho } from 'next/font/google'
import './globals.css'
import PortfolioShell from '@/components/PortfolioShell'
import { getAboutContent } from '@/lib/notion-about'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-shippori',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getAboutContent()
  const m = Object.fromEntries(profile.map(p => [p.title, p.body]))

  const catchCopy = m['catch_copy'] || 'AI Native Product Designer × Design Engineer'
  const intro = m['intro'] || 'エンジニアとして実装し、デザイナーとして設計し、思考する実装者として着地させる。'
  const ogImage = m['og_image']  // カスタムOGP画像URL（設定されていれば優先）
  const avatar = m['avatar']     // プロフィールアバター画像URL

  const ogImages = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: '優.bento' }]
    : undefined  // 未設定ならopengraph-image.tsxの自動生成を使用

  return {
    title: `優.bento — ${catchCopy}`,
    description: intro.replace(/\n/g, ' '),
    openGraph: {
      title: '優.bento',
      description: catchCopy,
      siteName: '優.bento',
      locale: 'ja_JP',
      type: 'website',
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: '優.bento',
      description: catchCopy,
      ...(ogImages ? { images: [ogImage!] } : {}),
    },
    ...(avatar ? {
      icons: { icon: avatar, apple: avatar },
    } : {}),
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${dmSans.variable} ${dmMono.variable} ${shippori.variable}`}>
      <body>
        <PortfolioShell />
        {children}
      </body>
    </html>
  )
}
