'use client'

import Link from 'next/link'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'

const works = [
  { num: '001', name: 'Perzona', tags: ['UX Design', 'Frontend', 'Next.js'], desc: '着想からロゴ・全デザイン・実装まで一人称で担当。決済統合を含むフルスタックサービス。' },
  { num: '002', name: 'annonline.jp', tags: ['WordPress', 'PHP', 'Full Stack'], desc: 'WordPressオリジナルテーマをゼロから設計・構築。テンプレート依存なし。' },
  { num: '003', name: 'AG Logo', tags: ['Logo Design', 'Illustrator'], desc: 'パフォーマー「AG」さんのロゴ。文字に人格を持たせる設計。' },
  { num: '004', name: 'Automation', tags: ['VBA', 'GAS', 'Next.js'], desc: '複数の業務自動化ツール群。道具は課題に合わせて選ぶ。' },
  { num: '005', name: 'Chrome Extension', tags: ['Product Design', 'Extension'], desc: 'ブラウザ上の作業フローに溶け込む設計。ノイズを入れずに機能を届ける。' },
  { num: '006', name: 'UI Systems', tags: ['Design System', 'Component'], desc: '一貫性は判断のブレを減らすためのシステム。見た目の話ではない。' },
]

export default function WorksPreview() {
  return (
    <section id="works" className="py-36 px-14 max-w-[1200px] mx-auto">
      <SectionReveal>
        <SectionLabel num="02" label="Works" />
      </SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {works.map((w, i) => (
          <SectionReveal key={i} delay={(i % 3) * 0.1}>
            <div
              className="py-12 group cursor-default transition-colors duration-300 hover:bg-[rgba(0,0,0,0.015)]"
              style={{
                paddingRight: (i % 3) !== 2 ? '48px' : 0,
                paddingLeft: (i % 3) !== 0 ? '24px' : 0,
                borderTop: '1px solid var(--color-border)',
                borderRight: (i % 3) !== 2 ? '1px solid var(--color-border)' : undefined,
              }}
            >
              <div
                className="mb-6 text-[10px] tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}
              >
                {w.num}
              </div>
              <div
                className="mb-3 text-[22px] font-medium"
                style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-ink)' }}
              >
                {w.name}
              </div>
              <div className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>
                {w.desc}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {w.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 tracking-[0.08em]"
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      color: 'var(--color-taupe)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
      <SectionReveal>
        <div className="mt-16 flex justify-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-4 no-underline transition-all duration-250"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-ink)',
              padding: '16px 32px',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--color-ink)'
              el.style.color = 'var(--color-bg)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = ''
              el.style.color = 'var(--color-ink)'
            }}
          >
            View All Works →
          </Link>
        </div>
      </SectionReveal>
    </section>
  )
}
