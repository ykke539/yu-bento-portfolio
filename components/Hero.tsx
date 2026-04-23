'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TITLE_LINE1 = 'Build Quietly.'
const TITLE_LINE2 = 'Design Deeply.'

const DOTS = [
  { top: '18%',  left: '7%',   size: 5, opacity: 0.55 },
  { top: '72%',  left: '5%',   size: 3, opacity: 0.35 },
  { top: '42%',  left: '3%',   size: 7, opacity: 0.25 },
  { top: '88%',  left: '22%',  size: 4, opacity: 0.45 },
  { top: '12%',  right: '28%', size: 6, opacity: 0.30 },
  { top: '55%',  right: '8%',  size: 4, opacity: 0.40 },
  { top: '82%',  right: '12%', size: 8, opacity: 0.20 },
  { top: '30%',  right: '5%',  size: 3, opacity: 0.50 },
]

function splitChars(text: string) {
  return text.split('').map((char, i) => (
    <span key={i} style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}>
      {char === ' ' ? ' ' : char}
    </span>
  ))
}

export default function Hero() {
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const line1Ref    = useRef<HTMLDivElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const jpRef       = useRef<HTMLSpanElement>(null)
  const descRef     = useRef<HTMLParagraphElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' })

      tl.fromTo(watermarkRef.current,
        { scale: 2.4, opacity: 0, filter: 'blur(24px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
        '-=0.2'
      )

      tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      )

      const chars1 = line1Ref.current?.querySelectorAll('span') ?? []
      tl.fromTo(chars1,
        (_i: number) => ({
          y: gsap.utils.random(-80, -20),
          x: gsap.utils.random(-12, 12),
          rotation: gsap.utils.random(-18, 18),
          opacity: 0, filter: 'blur(6px)',
          scale: gsap.utils.random(0.6, 1.2),
        }),
        { y: 0, x: 0, rotation: 0, opacity: 1, filter: 'blur(0px)', scale: 1,
          duration: 0.9, ease: 'expo.out', stagger: { amount: 0.55, from: 'random' } },
        '-=0.5'
      )

      const chars2 = line2Ref.current?.querySelectorAll('span') ?? []
      tl.fromTo(chars2,
        (_i: number) => ({
          y: gsap.utils.random(20, 80),
          x: gsap.utils.random(-12, 12),
          rotation: gsap.utils.random(-18, 18),
          opacity: 0, filter: 'blur(6px)',
          scale: gsap.utils.random(0.6, 1.2),
        }),
        { y: 0, x: 0, rotation: 0, opacity: 1, filter: 'blur(0px)', scale: 1,
          duration: 0.9, ease: 'expo.out', stagger: { amount: 0.55, from: 'random' } },
        '-=0.7'
      )

      tl.fromTo(jpRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      tl.fromTo(descRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
    })

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      gsap.to(watermarkRef.current, { x, y, duration: 1.2, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => { ctx.revert(); window.removeEventListener('mousemove', onMouseMove) }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 overflow-hidden"
    >
      {/* 入場オーバーレイ */}
      <div ref={overlayRef} className="fixed inset-0 z-50 pointer-events-none" style={{ background: 'var(--color-bg)' }} />

      {/* 装飾ドット */}
      {DOTS.map((dot, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none select-none hidden md:block"
          style={{
            top: dot.top,
            left: 'left' in dot ? (dot as any).left : undefined,
            right: 'right' in dot ? (dot as any).right : undefined,
            width: dot.size,
            height: dot.size,
            background: 'var(--color-taupe)',
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* ウォーターマーク（抜き文字） */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none whitespace-nowrap hidden md:block"
        style={{
          fontFamily: 'var(--font-shippori)',
          fontSize: 'clamp(280px, 35vw, 560px)',
          fontWeight: 600,
          color: 'transparent',
          WebkitTextStroke: '1px var(--color-border)',
          opacity: 0,
        }}
      >
        優
      </div>

      <div className="relative z-10 max-w-[900px]">
        {/* eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-4 mb-10 md:mb-12 opacity-0"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          <span className="block w-8 h-px" style={{ background: 'var(--color-taupe)' }} />
          AI Native Product Designer × Design Engineer
        </div>

        <h1>
          <div
            ref={line1Ref}
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: 'clamp(40px, 8vw, 108px)',
              fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--color-ink)',
            }}
          >
            {splitChars(TITLE_LINE1)}
          </div>
          <div
            ref={line2Ref}
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: 'clamp(40px, 8vw, 108px)',
              fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--color-ink)',
            }}
          >
            {splitChars(TITLE_LINE2)}
          </div>
          <span
            ref={jpRef}
            className="block opacity-0"
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: 'clamp(16px, 3vw, 42px)',
              color: 'var(--color-taupe)', fontWeight: 400,
              paddingTop: 'clamp(16px, 2vw, 30px)', letterSpacing: '0.05em',
            }}
          >
            実装する。設計する。本質に抗う。
          </span>
        </h1>

        <p
          ref={descRef}
          className="mt-10 md:mt-14 text-sm leading-[1.9] opacity-0"
          style={{ maxWidth: '440px', color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', paddingLeft: '24px' }}
        >
          エンジニアでありながら、UI/UXの思想を持ち、<br />
          ビジュアルの質にも責任を持つ。<br />
          その姿勢そのものを伝えるために、ここにいる。
        </p>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-6 md:left-14 flex items-center gap-3 opacity-0"
        style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '0.15em' }}
      >
        <span className="w-px h-10 animate-pulse" style={{ background: 'var(--color-border)' }} />
        Scroll
      </div>
    </section>
  )
}
