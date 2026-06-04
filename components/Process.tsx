'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'
import type { ProcessItem } from '@/lib/notion-about'

gsap.registerPlugin(ScrollTrigger)

const defaultSteps: ProcessItem[] = [
  { id: '1', section: 'process', title: 'Observe',     sub_label: '観察する',     body: '何を作るかより先に、何が起きているかを見る。課題の定義が間違っていれば、どんな実装も無駄になる。ユーザーの行動と違和感を丁寧に拾う。', order: 1 },
  { id: '2', section: 'process', title: 'Organize',    sub_label: '整理する',     body: '情報を構造化する。何が本質で、何が枝葉か。捨てる判断と残す判断の両方に責任を持つ。', order: 2 },
  { id: '3', section: 'process', title: 'Hypothesize', sub_label: '仮説を立てる', body: '「こうすれば良くなる」という根拠のある仮説を持って、設計に入る。直感と論理の両方を使う。', order: 3 },
  { id: '4', section: 'process', title: 'Build',       sub_label: '作る',         body: '設計の意図を壊さずに実装する。コードは仕様書ではなく、UIの最後の翻訳者だと思っている。', order: 4 },
  { id: '5', section: 'process', title: 'Refine',      sub_label: '改善する',     body: '出して終わりではない。使われてからが設計の始まり。小さな違和感を積み重ねて、丁寧に精度を上げる。', order: 5 },
]

interface Props {
  steps?: ProcessItem[]
}

export default function Process({ steps: propSteps }: Props) {
  const steps = (propSteps && propSteps.length > 0) ? propSteps : defaultSteps
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' } }
      )
    })
  }, [])

  return (
    <section id="process" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="03" label="Process" /></SectionReveal>
      <div>
        {steps.map((step, i) => (
          <div
            key={step.id}
            ref={el => { itemsRef.current[i] = el }}
            className="py-8 md:py-12 opacity-0"
            style={{
              borderTop: '1px solid var(--color-border)',
              borderBottom: i === steps.length - 1 ? '1px solid var(--color-border)' : undefined,
            }}
          >
            <div className="flex gap-4 md:gap-0 md:grid md:items-start" style={{ gridTemplateColumns: '80px 1fr 320px' }}>
              <div className="pt-1 text-[11px] tracking-[0.1em] shrink-0 md:shrink" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}>
                — {String(step.order).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.2 }}>
                  {step.title}
                </div>
                <span className="block mt-2 text-[13px] tracking-[0.1em]" style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-taupe)' }}>
                  {step.sub_label}
                </span>
              </div>
              <div className="hidden md:block text-[13px] leading-[1.9] pt-2" style={{ color: 'var(--color-muted)' }}>
                {step.body}
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-[1.9] md:hidden" style={{ color: 'var(--color-muted)' }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
