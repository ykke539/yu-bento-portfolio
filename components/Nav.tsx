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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-14 py-5 transition-colors duration-500"
      style={{
        background: 'rgba(249,248,246,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <Link href="/" className="flex items-center no-underline">
        <Image
          src="/logo.png"
          alt="優.bento"
          width={200}
          height={200}
          className="object-contain"
          style={{
            height: '52px',
            width: 'auto',
            // 白背景ロゴを周囲と馴染ませる
            mixBlendMode: 'multiply',
          }}
          priority
        />
      </Link>

      <ul className="hidden md:flex gap-10 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="no-underline transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:
                  pathname === href.split('#')[0] &&
                  href !== '/#philosophy' &&
                  href !== '/#process' &&
                  href !== '/#contact'
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
