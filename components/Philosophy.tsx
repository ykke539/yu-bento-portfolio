import SectionLabel from './SectionLabel'
import SectionReveal from './SectionReveal'

const items = [
  { q: 'なぜAIを使うのか', a: <>速さのため<em className="not-italic" style={{ color: 'var(--color-taupe)' }}>ではない。</em><br />本質に集中するため。</>, sub: 'AIは実装の道具ではなく、判断の量を増やすための媒介。速度よりも、思考の密度を上げることが目的。' },
  { q: 'なぜUI/UXなのか', a: <>見た目ではなく、<em className="not-italic" style={{ color: 'var(--color-taupe)' }}>判断の設計</em>だから。</>, sub: 'UIは装飾ではない。ユーザーの次の行動を決める構造。その責任を持って触れる人が少なすぎると思っている。' },
  { q: 'なぜ丁寧なのか', a: <>違和感は、<em className="not-italic" style={{ color: 'var(--color-taupe)' }}>すでに答えだ。</em></>, sub: '小さな引っかかりを放置しない。それは問いであり、改善のタネであり、最終的にはユーザーの信頼に直結する。' },
  { q: 'なぜ一人で持っていくのか', a: <>設計から実装まで、<em className="not-italic" style={{ color: 'var(--color-taupe)' }}>文脈が途切れない。</em></>, sub: '思想を知っている人間が実装する。これだけで、品質の劣化が大幅に減る。分業の限界を、一人称で越える。' },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto">
      <SectionReveal><SectionLabel num="01" label="Philosophy" /></SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <div
              className={[
                'py-10 md:py-12 border-t',
                // モバイルは右ボーダーなし・パディングなし、デスクトップのみ適用
                i % 2 === 0 ? 'md:pr-16 md:border-r' : 'md:pl-16',
              ].join(' ')}
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="mb-5 text-sm tracking-[0.05em]" style={{ fontFamily: 'var(--font-shippori)', color: 'var(--color-taupe)' }}>{item.q}</div>
              <div className="leading-[1.5] mb-5" style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(20px, 3vw, 34px)', fontWeight: 500, color: 'var(--color-ink)' }}>{item.a}</div>
              <div className="text-[13px] leading-[1.8]" style={{ color: 'var(--color-muted)', maxWidth: '340px' }}>{item.sub}</div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
