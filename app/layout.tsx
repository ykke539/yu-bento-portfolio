import type { Metadata } from 'next'
import { DM_Mono, DM_Sans, Shippori_Mincho } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Cursor from '@/components/Cursor'

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

export const metadata: Metadata = {
  title: '優.bento — AI Native Product Designer × Design Engineer',
  description: 'エンジニアとして作り、デザイナーとして考え、思考する実装者として最後まで持っていく。',
  openGraph: {
    title: '優.bento',
    description: 'AI Native Product Designer × Design Engineer',
    siteName: '優.bento',
    locale: 'ja_JP',
  },
}

// iOS の input フォーカス時の自動ズームを防ぐ
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${dmSans.variable} ${dmMono.variable} ${shippori.variable}`}>
      <body>
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  )
}
