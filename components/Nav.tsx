'use client'

import Link from 'next/link'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-14 py-7 transition-colors duration-400"
      style={{
        background: 'rgba(249,248,246,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <Link href="/" className="flex items-baseline gap-0.5 no-underline text-[var(--color-ink)]">
        <span className="font-[family-name:var(--font-shippori)] text-xl font-semibold leading-none">優</span>
        <span className="font-[family-name:var(--font-dm-mono)] text-xs font-light text-[var(--color-taupe)] tracking-[0.04em]">.bento</span>
      </Link>

      <ul className="hidden md:flex gap-10 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="no-underline font-[family-name:var(--font-dm-mono)] text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
              style={{
                color: pathname === href.split('#')[0] && href !== '/#philosophy' && href !== '/#process' && href !== '/#contact'
                  ? 'var(--color-ink)'
                  : 'var(--color-muted)',
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
