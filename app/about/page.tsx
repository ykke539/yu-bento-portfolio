import Footer from '@/components/Footer'

export const metadata = {
  title: 'About — 優.bento',
}

const skills = [
  {
    group: 'Design',
    items: [
      { name: 'UX設計 / 情報設計', level: 'Core' },
      { name: 'UI設計 / コンポーネント設計', level: 'Core' },
      { name: 'Figma', level: 'Main tool' },
      { name: 'Adobe Illustrator', level: 'Logo / Graphics' },
      { name: 'ロゴデザイン', level: '——' },
    ],
  },
  {
    group: 'Engineering',
    items: [
      { name: 'Next.js / React', level: 'Main' },
      { name: 'TypeScript', level: '——' },
      { name: 'Tailwind CSS', level: '——' },
      { name: 'WordPress (PHP)', level: 'Full stack' },
      { name: 'Excel VBA / GAS', level: 'Automation' },
    ],
  },
  {
    group: 'Product',
    items: [
      { name: 'AIプロトタイピング', level: 'Core' },
      { name: '要件定義 / 設計', level: '——' },
      { name: 'Supabase / Vercel', level: 'Infrastructure' },
      { name: 'Stripe 決済統合', level: '——' },
      { name: 'LINE Official設計', level: '——' },
    ],
  },
]

const monoStyle = { fontFamily: 'var(--font-dm-mono)' }
const serifStyle = { fontFamily: 'var(--font-shippori)' }

export default function AboutPage() {
  return (
    <main>
      {/* HERO SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-[88px]">
        {/* 写真サイド */}
        <div
          className="relative flex items-end p-14 overflow-hidden"
          style={{ background: '#eae7e3', minHeight: '560px' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'repeating-linear-gradient(-45deg, #dedad5, #dedad5 1px, #eae7e3 1px, #eae7e3 14px)',
            }}
          >
            <div
              className="text-center leading-[2.2] px-8 py-5"
              style={{
                ...monoStyle,
                fontSize: '11px',
                color: 'var(--color-muted)',
                letterSpacing: '0.15em',
                background: 'rgba(234,231,227,0.85)',
              }}
            >
              portrait photo<br />
              差し替え用プレースホルダー<br />
              推奨: 縦長, 自然光
            </div>
          </div>
          <div
            className="relative z-10 leading-[2]"
            style={{ ...monoStyle, fontSize: '10px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}
          >
            優.bento<br />Tokyo, Japan
          </div>
        </div>

        {/* テキストサイド */}
        <div
          className="flex flex-col justify-center px-16 py-20"
          style={{ borderLeft: '1px solid var(--color-border)' }}
        >
          <div
            className="flex items-center gap-3.5 mb-8 text-[10px] tracking-[0.2em] uppercase"
            style={{ ...monoStyle, color: 'var(--color-taupe)' }}
          >
            <span className="block w-6 h-px" style={{ background: 'var(--color-taupe)' }} />
            04 — About
          </div>
          <div style={{ ...serifStyle, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 500, lineHeight: 1.1, color: 'var(--color-ink)' }}>
            優
          </div>
          <div
            className="mt-2 mb-10 text-[13px] tracking-[0.15em]"
            style={{ ...monoStyle, color: 'var(--color-muted)' }}
          >
            Yu — .bento
          </div>
          <div
            className="mb-10 text-[18px] leading-[1.6]"
            style={{ ...serifStyle, fontWeight: 400, color: 'var(--color-taupe)' }}
          >
            AI Native Product Designer<br />× Design Engineer
          </div>
          <p
            className="text-[14px] leading-[2]"
            style={{ color: 'var(--color-ink)', borderLeft: '1px solid var(--color-border)', paddingLeft: '24px', maxWidth: '420px' }}
          >
            エンジニアとして実装し、<br />
            デザイナーとして設計し、<br />
            思考する実装者として最後まで持っていく。<br /><br />
            「ちゃんと整う」を、一人称で担える人間でいたい。
          </p>
          <div className="flex gap-12 mt-12 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
            {[
              { key: 'Base', val: 'Tokyo, Japan' },
              { key: 'Available', val: '案件相談可' },
              { key: 'Type', val: 'フリーランス' },
            ].map(({ key, val }) => (
              <div key={key}>
                <div className="mb-2 text-[9px] tracking-[0.15em] uppercase" style={{ ...monoStyle, color: 'var(--color-muted)' }}>{key}</div>
                <div style={{ ...serifStyle, fontSize: '15px', color: 'var(--color-ink)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-14">
        <div className="py-16 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-5 mb-16">
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>01</span>
            <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Journey</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20">
            <div>
              <div
                className="text-[10px] leading-[2] tracking-[0.1em] p-4"
                style={{ ...monoStyle, color: 'var(--color-border)', border: '1px dashed var(--color-border)' }}
              >
                ※ この遍歴ストーリーは<br />
                あなたの言葉で埋めてください。<br />
                構造だけ用意しています。
              </div>
            </div>
            <div>
              {[
                { year: 'Chapter 01', title: '最初の一歩 — なぜエンジニアになったのか', body: 'ここに、最初にコードやデザインに触れたきっかけを書いてください。どんな問いや違和感が、今のあなたの原点にありますか。' },
                { year: 'Chapter 02', title: '転換点 — デザインと出会ったとき', body: 'エンジニアとしてのキャリアの中で、UIやUXへの関心が生まれた瞬間はどこでしたか。実装だけでは足りないと感じた体験を書いてください。' },
                { year: 'Chapter 03', title: 'AIとの出会い — 道具として使うということ', body: 'AIを「設計に使う人」になった経緯。速さのためではなく、本質に集中するためにAIを選んだ理由を書いてください。' },
                { year: 'Now', title: '優.bento — 思考を信用してもらう場所として', body: '今、なぜこのブランドなのか。「まったり、丁寧に、本質をレジスタンス」という言葉に込めた意味を書いてください。' },
              ].map((ch, i) => (
                <div
                  key={i}
                  className="py-8"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <div className="mb-3 text-[10px] tracking-[0.12em]" style={{ ...monoStyle, color: 'var(--color-taupe)' }}>{ch.year}</div>
                  <div className="mb-3 text-[20px] font-medium leading-[1.5]" style={{ ...serifStyle, color: 'var(--color-ink)' }}>{ch.title}</div>
                  <div className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>{ch.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-14">
        <div className="py-16 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-5 mb-16">
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>02</span>
            <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Skills</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {skills.map((group, gi) => (
              <div
                key={group.group}
                className={['py-10 border-t', gi === 1 ? 'md:px-10 md:border-l' : '', gi === 2 ? 'md:pl-10 md:border-l' : ''].join(' ')}
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="mb-6 text-[10px] tracking-[0.15em] uppercase" style={{ ...monoStyle, color: 'var(--color-taupe)' }}>
                  {group.group}
                </div>
                <ul className="list-none flex flex-col gap-2.5">
                  {group.items.map(({ name, level }) => (
                    <li
                      key={name}
                      className="flex items-center gap-3"
                      style={{ ...serifStyle, fontSize: '15px', color: 'var(--color-ink)' }}
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-taupe)' }} />
                      {name}
                      <span className="ml-auto text-[9px] tracking-[0.08em]" style={{ ...monoStyle, color: 'var(--color-muted)' }}>{level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer nav */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-14 py-12 md:py-20 flex justify-between items-center"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <a href="/works" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>← Works</a>
        <a href="/#contact" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>Contact →</a>
      </div>

      <Footer />
    </main>
  )
}
