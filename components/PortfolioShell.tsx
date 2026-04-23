'use client'

import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import Cursor from '@/components/Cursor'

export default function PortfolioShell() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return (
    <>
      <Cursor />
      <Nav />
    </>
  )
}
