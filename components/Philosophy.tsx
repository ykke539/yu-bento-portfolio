import Link from 'next/link'
import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'
import { getAboutContent, type RichTextSpan } from '@/lib/notion-about'

// Notionのcolor annotationをCSSカラーに変換
function renderRichText(spans: RichTextSpan[]) {
  return spans.map((s, i) => {
    const colored = s.color !== 'default'
    return colored
      ? <em key={i} className="not-italic" style={{ color: 'var(--color-taupe)' }}>{s.text}</em>
      : <span key={i}>{s.text}</span>
  })
}

const defaultCatch = '判断は、最後まで自分で持ち切る。'
const defaultLeadRich: RichTextSpan[] = [
  { text: 'AIは速さのためではなく、', color: 'gray' },
  { text: '判断の密度を上げるための道具。', color: 'default' },
  { text: '\n見た目ではなく、', color: 'gray' },
  { text: '次の行動を決める設計として、UIに向き合う。', color: 'default' },
  { text: '\n小さな違和感も放置せず、', color: 'gray' },
  { text: '設計から実装まで、ひとりで通す。', color: 'default' },
]

export default async function Philosophy() {
  const { profile } = await getAboutContent()
  const catchItem = profile.find(p => p.title === 'philosophy_catch')
  const leadItem = profile.find(p => p.title === 'philosophy_lead')
  const catchCopy = catchItem?.body || defaultCatch
  const leadRich = leadItem?.bodyRich.length ? leadItem.bodyRich : defaultLeadRich

  return (
    <section id="philosophy" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="01" label="Philosophy" /></SectionReveal>
      <SectionReveal>
        <div
          className="leading-[1.4] mb-8 whitespace-pre-line"
          style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 500, color: 'var(--color-ink)' }}
        >
          {catchCopy}
        </div>
        <div
          className="leading-[1.9] whitespace-pre-line"
          style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '640px' }}
        >
          {renderRichText(leadRich)}
        </div>
        <Link
          href="/about#philosophy"
          className="inline-flex items-center gap-2 mt-10 no-underline"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-taupe)' }}
        >
          詳しく見る →
        </Link>
      </SectionReveal>
    </section>
  )
}
