'use client'

import Link from 'next/link'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'

const rows = [
  { key: 'Role', val: 'AI Native Product Designer\nDesign Engineer' },
  { key: 'Focus', val: 'UX設計、UI実装、AIプロトタイピング\n情報設計、管理設計' },
  { key: 'Stack', val: 'Next.js, Supabase, Vercel\nFigma, Notion, AI Tools' },
  { key: 'Belief', val: 'まったり、丁寧に、本質をレジスタンス' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-36 px-14 max-w-[1200px] mx-auto">
      <SectionReveal>
        <SectionLabel num="04" label="About" />
      </SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[120px] items-start">
        <SectionReveal>
          <div
            className="leading-[1.7]"
            style={{
              fontFamily: 'var(--font-shippori)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              color: 'var(--color-ink)',
            }}
          >
            エンジニアとして作り、<br />
            デザイナーとして考え、<br />
            <em
              className="not-italic"
              style={{
                color: 'var(--color-taupe)',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
                textDecorationColor: 'var(--color-border)',
              }}
            >
              思考する実装者
            </em>として<br />
            最後まで持っていく。<br /><br />
            「ちゃんと整う」を、<br />
            一人称で担える人間でいたい。
          </div>
          <Link
            href="/about"
            className="inline-block mt-10 no-underline text-[11px] tracking-[0.12em] uppercase transition-colors duration-200"
            style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-taupe)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-ink)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-taupe)' }}
          >
            Read more →
          </Link>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="pt-3">
            {rows.map((row, i) => (
              <div
                key={i}
                className="flex gap-6 py-5 text-[13px]"
                style={{
                  borderTop: i === 0 ? '1px solid var(--color-border)' : undefined,
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="min-w-[80px] pt-0.5 text-[10px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}
                >
                  {row.key}
                </span>
                <span
                  className="leading-[1.7] whitespace-pre-line"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {row.val}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
