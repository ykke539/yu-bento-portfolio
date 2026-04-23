'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '— 01', en: 'Observe', jp: '観察する', desc: '何を作るかより先に、何が起きているかを見る。課題の定義が間違っていれば、どんな実装も無駄になる。ユーザーの行動と違和感を丁寧に拾う。' },
  { num: '— 02', en: 'Organize', jp: '整理する', desc: '情報を構造化する。何が本質で、何が枝葉か。捨てる判断と残す判断の両方に責任を持つ。' },
  { num: '— 03', en: 'Hypothesize', jp: '仮説を立てる', desc: '「こうすれば良くなる」という根拠のある仮説を持って、設計に入る。直感と論理の両方を使う。' },
  { num: '— 04', en: 'Build', jp: '作る', desc: '設計の意図を壊さずに実装する。コードは仕様書ではなく、UIの最後の翻訳者だと思っている。' },
  { num: '— 05', en: 'Refine', jp: '改善する', desc: '出して終わりではない。使われてからが設計の始まり。小さな違和感を積み重ねて、丁寧に精度を上げる。' },
]

export default function Process() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          delay: i * 0.06,
        }
      )
    })
  }, [])

  return (
    <section id="process" className="py-36 px-14 max-w-[1200px] mx-auto">
      <SectionReveal>
        <SectionLabel num="03" label="Process" />
      </SectionReveal>
      <div>
        {steps.map((step, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el }}
            className="grid gap-12 py-12 opacity-0"
            style={{
              gridTemplateColumns: '80px 1fr 320px',
              borderTop: '1px solid var(--color-border)',
              borderBottom: i === steps.length - 1 ? '1px solid var(--color-border)' : undefined,
            }}
          >
            <div
              className="pt-1.5 text-[11px] tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}
            >
              {step.num}
            </div>
            <div>
              <div
                className="leading-[1.2]"
                style={{
                  fontFamily: 'var(--font-shippori)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                }}
              >
                {step.en}
              </div>
              <span
                className="block mt-2 text-[13px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-taupe)' }}
              >
                {step.jp}
              </span>
            </div>
            <div
              className="text-[13px] leading-[1.9] pt-2 hidden md:block"
              style={{ color: 'var(--color-muted)' }}
            >
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
