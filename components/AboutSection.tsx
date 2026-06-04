'use client'

import Link from 'next/link'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'
import type { AboutStatItem, RichTextSpan } from '@/lib/notion-about'

const defaultRows: AboutStatItem[] = [
  { id: '1', section: 'about_stats', title: 'Role',   body: 'AI Native Product Designer\nDesign Engineer', order: 1 },
  { id: '2', section: 'about_stats', title: 'Focus',  body: 'UX設計、UI実装、AIプロトタイピング\n情報設計、管理設計', order: 2 },
  { id: '3', section: 'about_stats', title: 'Stack',  body: 'Next.js, Supabase, Vercel\nFigma, Notion, AI Tools', order: 3 },
  { id: '4', section: 'about_stats', title: 'Belief', body: 'まったり、丁寧に、本質をレジスタンス', order: 4 },
]

const defaultIntroRich: RichTextSpan[] = [
  { text: 'エンジニアとして作り、\nデザイナーとして考え、\n', color: 'default' },
  { text: '思考する実装者', color: 'gray' },
  { text: 'として\n最後まで持っていく。\n\n「ちゃんと整う」を、\n一人称で担える人間でいたい。', color: 'default' },
]

function renderRichText(spans: RichTextSpan[]) {
  return spans.map((s, i) =>
    s.color !== 'default'
      ? <em key={i} className="not-italic" style={{ color: 'var(--color-taupe)', textDecoration: 'underline', textUnderlineOffset: '6px', textDecorationColor: 'var(--color-border)' }}>{s.text}</em>
      : <span key={i}>{s.text}</span>
  )
}

interface Props {
  rows?: AboutStatItem[]
  introRich?: RichTextSpan[]
}

export default function AboutSection({ rows: propRows, introRich: propIntroRich }: Props) {
  const rows = (propRows && propRows.length > 0) ? propRows : defaultRows
  const introRich = (propIntroRich && propIntroRich.length > 0) ? propIntroRich : defaultIntroRich

  return (
    <section id="about" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="04" label="About" /></SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[120px] items-start">
        <SectionReveal>
          <div style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {renderRichText(introRich)}
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 no-underline text-[11px] tracking-[0.12em] uppercase transition-all duration-250 group"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-border)',
              padding: '12px 20px',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--color-accent)'
              el.style.color = 'var(--color-accent)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--color-border)'
              el.style.color = 'var(--color-ink)'
            }}
          >
            プロフィールを読む
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="pt-3">
            {rows.map((row, i) => (
              <div key={row.id} className="flex gap-6 py-5 text-[13px]" style={{ borderTop: i === 0 ? '1px solid var(--color-border)' : undefined, borderBottom: '1px solid var(--color-border)' }}>
                <span className="min-w-[80px] pt-0.5 text-[10px] tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}>{row.title}</span>
                <span className="leading-[1.7] whitespace-pre-line" style={{ color: 'var(--color-ink)' }}>{row.body}</span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
