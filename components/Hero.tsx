'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TITLE_LINE1 = 'Build Quietly.'
const TITLE_LINE2 = 'Design Deeply.'

function splitChars(text: string, className: string) {
  return text.split('').map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
    >
      {char === ' ' ? ' ' : char}
    </span>
  ))
}

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const jpRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      // オーバーレイを消す
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // 透かし文字：巨大に現れてから定位置へ縮む
      tl.fromTo(
        watermarkRef.current,
        { scale: 2.4, opacity: 0, filter: 'blur(24px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
        '-=0.2'
      )

      // eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      )

      // タイトル行1：文字ごとにランダム位置 → 収束
      const chars1 = line1Ref.current?.querySelectorAll('span') ?? []
      tl.fromTo(
        chars1,
        (_i: number) => ({
          y: gsap.utils.random(-80, -20),
          x: gsap.utils.random(-12, 12),
          rotation: gsap.utils.random(-18, 18),
          opacity: 0,
          filter: 'blur(6px)',
          scale: gsap.utils.random(0.6, 1.2),
        }),
        {
          y: 0, x: 0, rotation: 0, opacity: 1,
          filter: 'blur(0px)', scale: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: { amount: 0.55, from: 'random' },
        },
        '-=0.5'
      )

      // タイトル行2：行1より少し遅れ、下から収束
      const chars2 = line2Ref.current?.querySelectorAll('span') ?? []
      tl.fromTo(
        chars2,
        (_i: number) => ({
          y: gsap.utils.random(20, 80),
          x: gsap.utils.random(-12, 12),
          rotation: gsap.utils.random(-18, 18),
          opacity: 0,
          filter: 'blur(6px)',
          scale: gsap.utils.random(0.6, 1.2),
        }),
        {
          y: 0, x: 0, rotation: 0, opacity: 1,
          filter: 'blur(0px)', scale: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: { amount: 0.55, from: 'random' },
        },
        '-=0.7'
      )

      // 日本語サブタイトル
      tl.fromTo(
        jpRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )

      // 説明文
      tl.fromTo(
        descRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      // スクロールインジケーター
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )
    })

    // マウスパララックス（透かし文字）
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      gsap.to(watermarkRef.current, {
        x, y,
        duration: 1.2,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-14 overflow-hidden"
      style={{ maxWidth: '100%' }}
    >
      {/* 入場オーバーレイ */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ background: 'var(--color-bg)' }}
      />

      {/* 透かし文字 */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-shippori)',
          fontSize: 'clamp(280px, 35vw, 560px)',
          fontWeight: 600,
          color: 'transparent',
          WebkitTextStroke: '1px var(--color-border)',
        }}
      >
        優
      </div>

      <div className="relative z-10 max-w-[900px]">
        {/* eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-4 mb-12 opacity-0"
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: 'var(--color-taupe)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <span className="block w-8 h-px" style={{ background: 'var(--color-taupe)' }} />
          AI Native Product Designer × Design Engineer
        </div>

        {/* タイトル行1 */}
        <h1>
          <div
            ref={line1Ref}
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: 'clamp(52px, 8vw, 108px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
            }}
          >
            {splitChars(TITLE_LINE1, 'char')}
          </div>

          {/* タイトル行2 */}
          <div
            ref={line2Ref}
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: 'clamp(52px, 8vw, 108px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
            }}
          >
            {splitChars(TITLE_LINE2, 'char')}
          </div>

          {/* 日本語 */}
          <span
            ref={jpRef}
            className="block opacity-0"
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: '42px',
              color: 'var(--color-taupe)',
              fontWeight: 400,
              paddingTop: '30px',
              letterSpacing: '0.05em',
            }}
          >
            実装する。設計する。本質に抗う。
          </span>
        </h1>

        {/* 説明 */}
        <p
          ref={descRef}
          className="mt-14 text-sm leading-[1.9] opacity-0"
          style={{
            maxWidth: '440px',
            color: 'var(--color-muted)',
            borderLeft: '1px solid var(--color-border)',
            paddingLeft: '24px',
          }}
        >
          エンジニアでありながら、UI/UXの思想を持ち、<br />
          ビジュアルの質にも責任を持つ。<br />
          その姿勢そのものを伝えるために、ここにいる。
        </p>
      </div>

      {/* スクロールインジケーター */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-14 flex items-center gap-3 opacity-0"
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '10px',
          color: 'var(--color-muted)',
          letterSpacing: '0.15em',
        }}
      >
        <span
          className="w-px h-10 animate-pulse"
          style={{ background: 'var(--color-border)' }}
        />
        Scroll
      </div>
    </section>
  )
}
