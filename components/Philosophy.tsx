import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'
import { getAboutContent, type PhilosophyItem, type RichTextSpan } from '@/lib/notion-about'

// Notionのcolor annotationをCSSカラーに変換
function renderRichText(spans: RichTextSpan[]) {
  return spans.map((s, i) => {
    const colored = s.color !== 'default'
    return colored
      ? <em key={i} className="not-italic" style={{ color: 'var(--color-taupe)' }}>{s.text}</em>
      : <span key={i}>{s.text}</span>
  })
}

// フォールバック用のデフォルトデータ
const defaultItems: PhilosophyItem[] = [
  { id: '1', section: 'philosophy', title: 'なぜAIを使うのか', body: '速さのためではない。\n本質に集中するため。', bodyRich: [{ text: '速さのため', color: 'default' }, { text: 'ではない。', color: 'gray' }, { text: '\n本質に集中するため。', color: 'default' }], sub_label: 'AIは実装の道具ではなく、判断の量を増やすための媒介。速度よりも、思考の密度を上げることが目的。', order: 1 },
  { id: '2', section: 'philosophy', title: 'なぜUI/UXなのか', body: '見た目ではなく、判断の設計だから。', bodyRich: [{ text: '見た目ではなく、', color: 'default' }, { text: '判断の設計', color: 'gray' }, { text: 'だから。', color: 'default' }], sub_label: 'UIは装飾ではない。ユーザーの次の行動を決める構造。その責任を持って触れる人が少なすぎると思っている。', order: 2 },
  { id: '3', section: 'philosophy', title: 'なぜ丁寧なのか', body: '違和感は、すでに答えだ。', bodyRich: [{ text: '違和感は、', color: 'default' }, { text: 'すでに答えだ。', color: 'gray' }], sub_label: '小さな引っかかりを放置しない。それは問いであり、改善のタネであり、最終的にはユーザーの信頼に直結する。', order: 3 },
  { id: '4', section: 'philosophy', title: 'なぜ一人で持っていくのか', body: '設計から実装まで、文脈が途切れない。', bodyRich: [{ text: '設計から実装まで、', color: 'default' }, { text: '文脈が途切れない。', color: 'gray' }], sub_label: '思想を知っている人間が実装する。これだけで、品質の劣化が大幅に減る。分業の限界を、一人称で越える。', order: 4 },
]

export default async function Philosophy() {
  const { philosophy } = await getAboutContent()
  const items = philosophy.length > 0 ? philosophy : defaultItems

  return (
    <section id="philosophy" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="01" label="Philosophy" /></SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.1}>
            <div
              className={[
                'py-10 md:py-12 border-t',
                i % 2 === 0 ? 'md:pr-16 md:border-r' : 'md:pl-16',
              ].join(' ')}
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="mb-5 text-sm tracking-[0.05em]" style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-taupe)' }}>{item.title}</div>
              <div className="leading-[1.5] mb-5 whitespace-pre-line" style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(20px, 3vw, 34px)', fontWeight: 500, color: 'var(--color-ink)' }}>
                {renderRichText(item.bodyRich)}
              </div>
              <div className="text-[13px] leading-[1.8]" style={{ color: 'var(--color-muted)', maxWidth: '340px' }}>{item.sub_label}</div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
