import Link from 'next/link'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'
import { getAboutContent, type WorksCapabilityItem } from '@/lib/notion-about'

const defaultCapabilities: WorksCapabilityItem[] = [
  { id: '1', section: 'works_capability', title: 'Web Application',  sub_label: 'UX Design, Frontend, Next.js',          body: '設計から実装まで一貫して担当。UXフローの再構築と情報アーキテクチャの整理から入る。', order: 1 },
  { id: '2', section: 'works_capability', title: 'Chrome Extension', sub_label: 'Product Design, Extension',              body: 'ブラウザ上の作業フローに溶け込む設計。ノイズを入れずに機能を届ける。', order: 2 },
  { id: '3', section: 'works_capability', title: 'Internal Tools',   sub_label: 'UI Systems, Workflow',                   body: '使う人が特定できるからこそ、本当に必要なものだけを作れる。業務の文脈を読む設計。', order: 3 },
  { id: '4', section: 'works_capability', title: 'CMS / WordPress',  sub_label: 'CMS, Information Architecture',          body: 'コンテンツ編集者の視点で構造を設計。管理のしやすさをUXとして考える。', order: 4 },
  { id: '5', section: 'works_capability', title: 'Automation',       sub_label: 'Workflow Design, API',                   body: '人が判断すべきことと、機械に任せるべきことを切り分ける。自動化の前に、整理がある。', order: 5 },
  { id: '6', section: 'works_capability', title: 'UI Systems',       sub_label: 'Design System, Component',               body: '一貫性は見た目の話ではない。判断のブレを減らすためのシステムを設計する。', order: 6 },
]

export default async function WorksPreview() {
  const { worksCapability } = await getAboutContent()
  const capabilities = worksCapability.length > 0 ? worksCapability : defaultCapabilities

  return (
    <section id="works" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="02" label="Works" /></SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {capabilities.map((w, i) => {
          const col = i % 3
          const tags = w.sub_label.split(',').map(t => t.trim()).filter(Boolean)
          return (
            <SectionReveal key={w.id} delay={col * 0.1}>
              <div
                className={[
                  'py-10 md:py-12 border-t',
                  col === 0 ? 'md:pr-12 md:border-r' : '',
                  col === 1 ? 'md:px-6 md:border-r' : '',
                  col === 2 ? 'md:pl-6' : '',
                ].join(' ')}
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="mb-5 text-[10px] tracking-[0.1em]" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}>
                  {String(w.order).padStart(3, '0')}
                </div>
                <div className="mb-3 text-[20px] md:text-[22px] font-medium" style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-ink)' }}>{w.title}</div>
                <div className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>{w.body}</div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 tracking-[0.08em]" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </SectionReveal>
          )
        })}
      </div>

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
