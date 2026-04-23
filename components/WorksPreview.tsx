'use client'

import Link from 'next/link'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'

const capabilities = [
  { num: '001', name: 'Web Application',  tags: ['UX Design', 'Frontend', 'Next.js'],          desc: '設計から実装まで一貫して担当。UXフローの再構築と情報アーキテクチャの整理から入る。' },
  { num: '002', name: 'Chrome Extension', tags: ['Product Design', 'Extension'],                desc: 'ブラウザ上の作業フローに溶け込む設計。ノイズを入れずに機能を届ける。' },
  { num: '003', name: 'Internal Tools',   tags: ['UI Systems', 'Workflow'],                     desc: '使う人が特定できるからこそ、本当に必要なものだけを作れる。業務の文脈を読む設計。' },
  { num: '004', name: 'CMS / WordPress',  tags: ['CMS', 'Information Architecture'],           desc: 'コンテンツ編集者の視点で構造を設計。管理のしやすさをUXとして考える。' },
  { num: '005', name: 'Automation',       tags: ['Workflow Design', 'API'],                     desc: '人が判断すべきことと、機械に任せるべきことを切り分ける。自動化の前に、整理がある。' },
  { num: '006', name: 'UI Systems',       tags: ['Design System', 'Component'],                 desc: '一貫性は見た目の話ではない。判断のブレを減らすためのシステムを設計する。' },
]

export default function WorksPreview() {
  return (
    <section id="works" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="02" label="Works" /></SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {capabilities.map((w, i) => {
          const col = i % 3
          return (
            <SectionReveal key={i} delay={col * 0.1}>
              <div
                className={[
                  'py-10 md:py-12 border-t',
                  col === 0 ? 'md:pr-12 md:border-r' : '',
                  col === 1 ? 'md:px-6 md:border-r' : '',
                  col === 2 ? 'md:pl-6' : '',
                ].join(' ')}
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="mb-5 text-[10px] tracking-[0.1em]" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}>{w.num}</div>
                <div className="mb-3 text-[20px] md:text-[22px] font-medium" style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-ink)' }}>{w.name}</div>
                <div className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>{w.desc}</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {w.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 tracking-[0.08em]" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )
        })}
      </div>

      {/* 実績を見る — 明確なCTAボタン */}
      <SectionReveal>
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/works"
            className="group inline-flex items-center gap-3 no-underline transition-all duration-300"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-bg)',
              background: 'var(--color-ink)',
              padding: '18px 40px',
            }}
          >
            実績を見る
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </SectionReveal>
    </section>
  )
}
