import Footer from '@/components/Footer'

const works = [
  {
    id: 'perzona',
    num: '01',
    cat: 'Web App / Full Stack',
    url: 'https://perzona.site/',
    title: 'Perzona',
    subtitle: 'AIパーソナ診断サービス。着想から、ロゴ・全デザイン・全実装まで一人称で担当。決済（Stripe）を含む、LP・診断ページ・管理画面をフルスタックで構築した。',
    scope: [
      { key: 'Scope', val: '着想・構想 / ロゴデザイン / 全ページUI設計 / フロントエンド実装 / バックエンド実装 / 決済統合' },
      { key: 'Pages', val: 'LP / 診断ページ / 管理画面' },
      { key: 'Stack', val: '', tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'Vercel'] },
      { key: 'Design', val: 'Figma / Adobe Illustrator（ロゴ）' },
    ],
    thinking: [
      { q: 'なぜ作ったか', a: '「自分が何者か」を言語化できない人が多すぎると気づいた。', body: '履歴書やSNSのプロフィールに悩む人を見ていて、強みを引き出すプロセスを設計できれば、それ自体がプロダクトになると考えた。' },
      { q: '何を疑ったか', a: '「診断系はゲームっぽくないといけない」という思い込み。', body: '多くの診断サービスがポップなUIを採用している。でもPerzonaのユーザーは「ちゃんと使いたい人」。静かなUIにすることで、むしろ信頼感が生まれると判断した。' },
      { q: '何を捨てたか', a: 'アニメーションと、「すごそうに見せる」デザイン。', body: '初期案にはマイクロアニメーションを含めていた。しかし「ユーザーが診断に集中できるか」という基準で判断し、ノイズになる要素をすべて削除した。' },
      { q: 'どう設計したか', a: '問いの順序と文体が、UIより先にある。', body: '診断の設計は、先にUIを作らず質問の構造と言葉を固めることから始めた。情報設計が決まってから、それに合ったUIを乗せた。' },
    ],
  },
  {
    id: 'annonline',
    num: '02',
    cat: 'WordPress / Full Stack',
    url: 'https://annonline.jp/',
    title: 'annonline.jp',
    subtitle: 'WordPressオリジナルクラシックテーマをフルスタックで実装。テーマの購入や流用ではなく、ゼロから設計・構築した。',
    scope: [
      { key: 'Scope', val: 'サイト設計 / デザイン / WordPressテーマ開発（クラシック）/ フロントエンド実装' },
      { key: 'Stack', val: '', tags: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'HTML'] },
    ],
    thinking: [
      { q: 'なぜオリジナルテーマか', a: 'テンプレートは、設計の妥協から始まる。', body: '既存テーマを使えば速い。しかし「このサイトに必要な構造」を先に考えると、市販テーマのHTMLの癖が邪魔になる。ゼロから書くことで、意図しない制約を全て取り除いた。' },
      { q: '何を疑ったか', a: '「WordPressは重い・遅い」は設計の問題だと気づいた。', body: 'プラグイン過多、テーマの肥大化、不要なjQuery依存。これらは技術の問題ではなく設計の問題。必要なものだけを書けば、WordPressでも十分に速く、軽くなる。' },
      { q: 'どう設計したか', a: '編集者の視点でテンプレートを設計した。', body: '管理画面での更新のしやすさを最優先に設計した。カスタムフィールドの設計、カテゴリ体系まで、「運用する人が迷わない構造」を考えた。' },
    ],
  },
  {
    id: 'ag-logo',
    num: '03',
    cat: 'Logo Design',
    url: undefined,
    title: 'AG — ロゴデザイン',
    subtitle: 'パフォーマー「AG」さんのロゴデザイン。Adobe Illustratorを使用し、活動の世界観と名前の文字性を同時に設計した。',
    scope: [
      { key: 'Scope', val: 'ヒアリング / コンセプト設計 / ロゴデザイン / 納品データ制作' },
      { key: 'Tool', val: 'Adobe Illustrator' },
    ],
    thinking: [
      { q: 'なぜそのかたちか', a: '文字は、人格を持てる。', body: '「AG」というイニシャルに、単なる文字以上の意味を持たせることを目標にした。パフォーマーとしての動きやエネルギーを、フォルムの構造に落とし込んだ。' },
      { q: '何を疑ったか', a: '「かっこよくすること」が目的になっていないか。', body: 'ロゴは見た目の完成度より「誰のためのものか」が先にある。活動の場、使われ方を理解してから、ビジュアルの方向を決めた。' },
    ],
  },
  {
    id: 'automation',
    num: '04',
    cat: 'Automation / Internal Tools',
    url: undefined,
    title: '業務効率化システム群',
    subtitle: '複数の業務課題に対して、個別に設計・実装した自動化ツール群。ExcelVBA・GAS・Next.jsまで、課題に合わせて道具を選んでいる。',
    scope: [
      { key: 'Project 1', val: 'eラーニングシステム インポート用データ生成ツール' },
      { key: 'Stack', val: '', tags: ['Excel VBA', 'Google Apps Script'] },
      { key: 'Project 2', val: '在庫管理表 × 出荷依頼用帳票 × 売上管理表 疎結合連携システム' },
      { key: 'Stack', val: '', tags: ['Excel VBA'] },
      { key: 'Project 3', val: '請求管理・売上ダッシュボード統合システム' },
      { key: 'Stack', val: '', tags: ['Next.js', 'TypeScript', 'Recharts', 'Framer Motion', 'Google Chat API'] },
      { key: 'Project 4', val: '結婚式DX — 列席者共有システム / LINE Officialミニアプリ / 招待状サイト' },
      { key: 'Stack', val: '', tags: ['LINE Official Account', 'Web'] },
    ],
    thinking: [
      { q: 'なぜ作ったか', a: '「人がやる必要のないこと」を正確に見極めたかった。', body: '自動化の本質は、速さではなく判断の再配置だと思っている。どこまで人が考え、どこから機械が動くべきか。その線引きを丁寧に行う。' },
      { q: '道具の選び方', a: '最新技術ではなく、その現場に最適な道具を選ぶ。', body: 'Excel VBAで十分ならVBAを使う。「モダンな技術を使いたい」という欲求より、「この人がこの環境で使い続けられるか」を優先する。' },
      { q: '疎結合という判断', a: 'システムを密に繋げると、壊れたとき全部が止まる。', body: '在庫・出荷・売上の連携システムでは、あえて疎結合の設計を選んだ。堅牢さは複雑さからではなく、単純さから生まれる。' },
    ],
  },
]

export const metadata = {
  title: 'Works — 優.bento',
}

export default function WorksPage() {
  const monoStyle = { fontFamily: 'var(--font-dm-mono)' }
  const serifStyle = { fontFamily: 'var(--font-shippori)' }

  return (
    <main>
      {/* PAGE HEADER */}
      <div
        className="px-6 md:px-14 pt-32 md:pt-40 pb-12 md:pb-20 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div>
          <span className="block mb-5 text-[11px] tracking-[0.2em] uppercase" style={{ ...monoStyle, color: 'var(--color-taupe)' }}>02 — Works</span>
          <h1 style={{ ...serifStyle, fontSize: 'clamp(56px, 8vw, 108px)', fontWeight: 400, lineHeight: 1, color: 'var(--color-ink)' }}>
            作ってきたもの
          </h1>
        </div>
        <p
          className="text-[14px] leading-[2] max-w-[400px]"
          style={{ color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', paddingLeft: '32px' }}
        >
          実績というより、思考の記録。<br />
          何を作ったかではなく、<br />
          なぜそう設計したかを書いている。<br /><br />
          Before / Afterではなく、<br />
          Thinkingを読んでほしい。
        </p>
      </div>

      {/* INDEX */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-14 hidden md:flex"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        {works.map((w, i) => (
          <a
            key={w.id}
            href={`#${w.id}`}
            className="flex-1 flex items-center gap-4 py-8 no-underline transition-colors duration-200 group"
            style={{
              ...monoStyle,
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--color-muted)',
              borderRight: i < works.length - 1 ? '1px solid var(--color-border)' : undefined,
              paddingRight: i < works.length - 1 ? '24px' : 0,
              paddingLeft: i > 0 ? '24px' : 0,
            }}
          >
            <span style={{ color: 'var(--color-border)' }}>0{i + 1}</span>
            <span>{w.title}</span>
          </a>
        ))}
      </div>

      {/* WORK ENTRIES */}
      {works.map((work) => (
        <div
          key={work.id}
          id={work.id}
          className="max-w-[1200px] mx-auto px-6 md:px-14 py-14 md:py-24"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {/* meta */}
          <div className="flex items-baseline gap-6 mb-16">
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>{work.num}</span>
            <span
              className="text-[10px] px-3 py-1 tracking-[0.1em] uppercase"
              style={{ ...monoStyle, color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}
            >
              {work.cat}
            </span>
            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-[11px] tracking-[0.08em] transition-colors duration-200"
                style={{ ...monoStyle, color: 'var(--color-muted)' }}
              >
                {work.url.replace('https://', '')} ↗
              </a>
            )}
          </div>

          <h2
            className="mb-6"
            style={{ ...serifStyle, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--color-ink)' }}
          >
            {work.title}
          </h2>
          <p className="text-[14px] leading-[1.9] mb-16" style={{ color: 'var(--color-muted)', maxWidth: '560px' }}>
            {work.subtitle}
          </p>

          {/* scope table */}
          <div className="mb-20" style={{ borderTop: '1px solid var(--color-border)' }}>
            {work.scope.map((row, i) => (
              <div
                key={i}
                className="grid gap-6 py-4 text-[13px]"
                style={{ gridTemplateColumns: '140px 1fr', borderBottom: '1px solid var(--color-border)' }}
              >
                <span
                  className="text-[10px] tracking-[0.1em] uppercase pt-1"
                  style={{ ...monoStyle, color: 'var(--color-muted)' }}
                >
                  {row.key}
                </span>
                <div style={{ color: 'var(--color-ink)' }}>
                  {row.val || null}
                  {row.tags && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {row.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 tracking-[0.05em]"
                          style={{ ...monoStyle, color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* thinking */}
          <div>
            <div
              className="flex items-center gap-5 mb-12 text-[10px] tracking-[0.2em] uppercase"
              style={{ ...monoStyle, color: 'var(--color-taupe)' }}
            >
              Thinking
              <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {work.thinking.map((t, i) => (
                <div
                  key={i}
                  className={['py-10 border-t', i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:border-l'].join(' ')}
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="mb-4 text-[10px] tracking-[0.12em] uppercase"
                    style={{ ...monoStyle, color: 'var(--color-muted)' }}
                  >
                    {t.q}
                  </div>
                  <div
                    className="mb-4 text-[18px] font-medium leading-[1.7]"
                    style={{ ...serifStyle, color: 'var(--color-ink)' }}
                  >
                    {t.a}
                  </div>
                  <div className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                    {t.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* footer nav */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-14 py-12 md:py-20 flex justify-between items-center"
      >
        <a href="/" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>← Home</a>
        <a href="/about" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>About →</a>
      </div>

      <Footer />
    </main>
  )
}
