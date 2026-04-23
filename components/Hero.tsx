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
    <span key={i} data-char style={{ display: 'inline-block' }}>
      {char === ' ' ? ' ' : char}
    </span>
  ))
}

export default function Hero() {
  const eyebrowRef   = useRef<HTMLDivElement>(null)
  const line1Ref     = useRef<HTMLDivElement>(null)
  const line2Ref     = useRef<HTMLDivElement>(null)
  const jpRef        = useRef<HTMLSpanElement>(null)
  const descRef      = useRef<HTMLParagraphElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = Array.from(line1Ref.current?.querySelectorAll('[data-char]') ?? [])
      const chars2 = Array.from(line2Ref.current?.querySelectorAll('[data-char]') ?? [])

      // 初期状態をランダム位置にセット
      gsap.set(chars1, {
        y: () => gsap.utils.random(-80, -20),
        x: () => gsap.utils.random(-10, 10),
        rotation: () => gsap.utils.random(-18, 18),
        scale: () => gsap.utils.random(0.6, 1.2),
        opacity: 0,
        filter: 'blur(6px)',
      })
      gsap.set(chars2, {
        y: () => gsap.utils.random(20, 80),
        x: () => gsap.utils.random(-10, 10),
        rotation: () => gsap.utils.random(-18, 18),
        scale: () => gsap.utils.random(0.6, 1.2),
        opacity: 0,
        filter: 'blur(6px)',
      })

      const tl = gsap.timeline({ delay: 0.15 })

      // オーバーレイを消す
      tl.to(overlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' })

      // ウォーターマーク登場
      tl.fromTo(watermarkRef.current,
        { scale: 2.2, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.3, ease: 'expo.out' },
        '-=0.2'
      )

      // eyebrow
      tl.fromTo(eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.9'
      )

      // タイトル行1：ランダム位置から収束
      tl.to(chars1, {
        y: 0, x: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
        duration: 0.9, ease: 'expo.out',
        stagger: { amount: 0.5, from: 'random' },
      }, '-=0.4')

      // タイトル行2
      tl.to(chars2, {
        y: 0, x: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
        duration: 0.9, ease: 'expo.out',
        stagger: { amount: 0.5, from: 'random' },
      }, '-=0.6')

      // 日本語サブタイトル
      tl.fromTo(jpRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')

      // 説明文
      tl.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.35')

      // スクロールインジケーター
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
    })

    // マウスパララックス
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(watermarkRef.current, {
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
        duration: 1.2, ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => { ctx.revert(); window.removeEventListener('mousemove', onMouseMove) }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 overflow-hidden">
      {/* 入場オーバーレイ */}
      <div ref={overlayRef} className="fixed inset-0 z-50 pointer-events-none" style={{ background: 'var(--color-bg)' }} />

      {/* 装飾ドット */}
      {DOTS.map((dot, i) => (
        <span key={i} aria-hidden="true" className="absolute rounded-full pointer-events-none select-none"
          style={{
            top: dot.top,
            left: 'left' in dot ? (dot as any).left : undefined,
            right: 'right' in dot ? (dot as any).right : undefined,
            width: dot.size, height: dot.size,
            background: 'var(--color-taupe)',
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* ウォーターマーク（SVG抜き文字） */}
      <div ref={watermarkRef} aria-hidden="true" className="absolute select-none pointer-events-none"
        style={{
          right: 'clamp(-60px, -3vw, -20px)',
          top: '50%', transform: 'translateY(-50%)',
          width: 'clamp(180px, 55vw, 580px)',
          opacity: 0,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 643.19 588.23"
          fill="none" stroke="var(--color-border)" strokeWidth="2"
          style={{ width: '100%', height: 'auto' }}
        >
          <path d="M588.24,218.18l-276.82-.03c-2.42,3.6-4.36,8.37-4.63,12.22l-1.57,22.33c-5.92,8.59-13.98,14.99-25.14,18.8l-.23-64.08,51.98-.12.05-129.96,78.52-.13,11.97-45.04-117.17-.09,4.99-11.01,306.71.1-7.11,10.95-156-.02-22.04,45.1h129.38s0,129.95,0,129.95l65.39.32-20.42,32.07-17.27,25.21c-1.63.61-7.16-2.39-7.8-4.6l7.21-41.98ZM532.68,163.08l-.05-32.36-152.62-.05,1.09-10.3,151.62-.07-.4-32.28-172.95.03-.07,119.34,173.32-.06.06-33.98-153-.06,2.1-10.18,150.91-.02Z"/>
          <path d="M166.72,501.47l147.92-72.87,29.72-30.96c18.94-19.73,34.34-40.83,47.8-64.69l32.59,2.13c-16.97,27.74-38.27,46.95-61.64,69.7l169.35-81.35-103.92-1.36c-22.34-.29-42.57-12.03-42.54-33.26l.05-38.44,22.8-.47,1.46,38.83c.4,10.58,13.63,19.04,24.67,19.08l130.78.42,71.72-34.04,3.34-1.58c.91-.43,3.01,2.57,2.17,3.11l-3.79,2.4-439.92,216.26L.68,588.23l-.68-3.54,166.72-83.23Z"/>
          <path d="M228.61,118.37c-41.25,72.69-85.01,142.6-141.58,205.14,52.65-84.76,100.46-166.93,136.64-257.87L248.02.06l36.33-.06c-16.77,41.14-33.61,79.36-55.74,118.37Z"/>
          <polygon points="226.41 412.68 197.72 427.23 197.61 198.78 226.35 198.62 226.41 412.68"/>
          <path d="M438.36,447.57l-28.24-27.97c-.93-.92-3.28-3.15-2.79-4.15l1.9-3.88c12.62,11.84,26.31,19.76,42.24,25.33,25.77-23.81,49.03-46.69,71.03-73.43l40.86.32c-28.09,30.62-56.53,57.03-89.97,80.74-40.36,28.61-81.95,55.84-128.46,74.67,31.38-26.3,64.44-43.37,93.43-71.63Z"/>
          <path d="M308.56,334.2l-13.09-13.96c20.96-18.8,35.49-37.84,46.31-64.09l15.73,7.07c-10.31,28.55-26.42,50.85-48.94,70.99Z"/>
          <path d="M468.65,281.39c-11.7-15.27-21.18-27.31-37.37-39.02l7.2-10.35,46.29,32.48-16.12,16.88Z"/>
          <path d="M508.77,288.57c-1.67,2.74-6.84,3.56-9.43,1.85l22.21-40.9,8.87,3.43-21.65,35.62Z"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-[900px]">
        {/* eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-10 md:mb-12"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0 }}
        >
          <span className="block w-8 h-px flex-shrink-0" style={{ background: 'var(--color-taupe)' }} />
          AI Native Product Designer × Design Engineer
        </div>

        <h1 style={{ margin: 0 }}>
          <div ref={line1Ref} style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(40px, 8vw, 108px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>
            {splitChars(TITLE_LINE1)}
          </div>
          <div ref={line2Ref} style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(40px, 8vw, 108px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>
            {splitChars(TITLE_LINE2)}
          </div>
          <span ref={jpRef} className="block" style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(16px, 3vw, 42px)', color: 'var(--color-taupe)', fontWeight: 400, paddingTop: 'clamp(16px, 2vw, 30px)', letterSpacing: '0.05em', opacity: 0 }}>
            実装する。設計する。本質に抗う。
          </span>
        </h1>

        <p ref={descRef} className="mt-10 md:mt-14 text-sm leading-[1.9]"
          style={{ maxWidth: '440px', color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', paddingLeft: '24px', opacity: 0 }}
        >
          エンジニアでありながら、UI/UXの思想を持ち、<br />
          ビジュアルの質にも責任を持つ。<br />
          その姿勢そのものを伝えるために、ここにいる。
        </p>
      </div>

      <div ref={scrollRef} className="absolute bottom-10 left-6 md:left-14 flex items-center gap-3"
        style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '0.15em', opacity: 0 }}
      >
        <span className="w-px h-10 animate-pulse" style={{ background: 'var(--color-border)' }} />
        Scroll
      </div>
    </section>
  )
}
