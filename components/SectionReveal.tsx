'use client'

import { useEffect, useRef, ReactNode, ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
  as?: ElementType
}

export default function SectionReveal({ children, delay = 0, className = '', style, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el,
      { y: 32, opacity: 0, filter: 'blur(4px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [delay])

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </Tag>
  )
}
