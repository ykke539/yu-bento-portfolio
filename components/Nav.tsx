'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/#philosophy', label: 'Philosophy' },
  { href: '/works', label: 'Works' },
  { href: '/#process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // メニューを開いたらスクロール禁止
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-14 py-5 transition-colors duration-500"
        style={{
          background: 'rgba(249,248,246,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <Link href="/" className="flex items-center no-underline overflow-hidden" style={{ height: '48px' }} onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="優.bento"
            width={1000}
            height={1000}
            style={{ height: '160px', width: 'auto', marginTop: '-48px', marginBottom: '-64px', mixBlendMode: 'multiply' }}
            priority
          />
        </Link>

        {/* デスクトップメニュー */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: pathname === href.split('#')[0] && !href.includes('#') ? 'var(--color-ink)' : 'var(--color-muted)',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ハンバーガーボタン */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          onClick={() => setOpen(v => !v)}
          aria-label="メニュー"
        >
          <span
            className="block h-px w-full transition-all duration-300 origin-center"
            style={{
              background: 'var(--color-ink)',
              transform: open ? 'translateY(6px) rotate(45deg)' : '',
            }}
          />
          <span
            className="block h-px w-full transition-all duration-300"
            style={{
              background: 'var(--color-ink)',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-full transition-all duration-300 origin-center"
            style={{
              background: 'var(--color-ink)',
              transform: open ? 'translateY(-6px) rotate(-45deg)' : '',
            }}
          />
        </button>
      </nav>

      {/* モバイルメニューパネル */}
      <div
        className="fixed inset-0 z-[99] md:hidden flex flex-col justify-center px-8 transition-all duration-400"
        style={{
          background: 'var(--color-bg)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <ul className="list-none flex flex-col gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-shippori)',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="mt-16 text-xs tracking-widest"
          style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}
        >
          優.bento — Tokyo, Japan
        </div>
      </div>
    </>
  )
}
