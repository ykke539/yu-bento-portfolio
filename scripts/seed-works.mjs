/**
 * Notion Works DB シードスクリプト
 * 実行: node --env-file=.env.local scripts/seed-works.mjs
 */

import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DB_ID = process.env.NOTION_WORKS_DB_ID

if (!DB_ID) {
  console.error('NOTION_WORKS_DB_ID が未設定です')
  process.exit(1)
}

const works = [
  {
    title: 'Perzona',
    num: '01',
    cat: 'Web App / Full Stack',
    url: 'https://perzona.site/',
    subtitle: 'AIパーソナ診断サービス。着想から、ロゴ・全デザイン・全実装まで一人称で担当。決済（Stripe）を含む、LP・診断ページ・管理画面をフルスタックで構築した。',
    scope: `Scope: 着想・構想 / ロゴデザイン / 全ページUI設計 / フロントエンド実装 / バックエンド実装 / 決済統合
Pages: LP / 診断ページ / 管理画面
Stack: Next.js, TypeScript, Stripe, Tailwind CSS, Vercel
Design: Figma / Adobe Illustrator（ロゴ）`,
    thinking: [
      { q: 'なぜ作ったか', a: '「自分が何者か」を言語化できない人が多すぎると気づいた。', body: '履歴書やSNSのプロフィールに悩む人を見ていて、強みを引き出すプロセスを設計できれば、それ自体がプロダクトになると考えた。' },
      { q: '何を疑ったか', a: '「診断系はゲームっぽくないといけない」という思い込み。', body: '多くの診断サービスがポップなUIを採用している。でもPerzonaのユーザーは「ちゃんと使いたい人」。静かなUIにすることで、むしろ信頼感が生まれると判断した。' },
      { q: '何を捨てたか', a: 'アニメーションと、「すごそうに見せる」デザイン。', body: '初期案にはマイクロアニメーションを含めていた。しかし「ユーザーが診断に集中できるか」という基準で判断し、ノイズになる要素をすべて削除した。' },
      { q: 'どう設計したか', a: '問いの順序と文体が、UIより先にある。', body: '診断の設計は、先にUIを作らず質問の構造と言葉を固めることから始めた。情報設計が決まってから、それに合ったUIを乗せた。' },
    ],
    order: 1,
  },
  {
    title: 'annonline.jp',
    num: '02',
    cat: 'WordPress / Full Stack',
    url: 'https://annonline.jp/',
    subtitle: 'WordPressオリジナルクラシックテーマをフルスタックで実装。テーマの購入や流用ではなく、ゼロから設計・構築した。',
    scope: `Scope: サイト設計 / デザイン / WordPressテーマ開発（クラシック）/ フロントエンド実装
Stack: WordPress, PHP, JavaScript, CSS, HTML`,
    thinking: [
      { q: 'なぜオリジナルテーマか', a: 'テンプレートは、設計の妥協から始まる。', body: '既存テーマを使えば速い。しかし「このサイトに必要な構造」を先に考えると、市販テーマのHTMLの癖が邪魔になる。ゼロから書くことで、意図しない制約を全て取り除いた。' },
      { q: '何を疑ったか', a: '「WordPressは重い・遅い」は設計の問題だと気づいた。', body: 'プラグイン過多、テーマの肥大化、不要なjQuery依存。これらは技術の問題ではなく設計の問題。必要なものだけを書けば、WordPressでも十分に速く、軽くなる。' },
      { q: 'どう設計したか', a: '編集者の視点でテンプレートを設計した。', body: '管理画面での更新のしやすさを最優先に設計した。カスタムフィールドの設計、カテゴリ体系まで、「運用する人が迷わない構造」を考えた。' },
    ],
    order: 2,
  },
  {
    title: 'AG — ロゴデザイン',
    num: '03',
    cat: 'Logo Design',
    url: '',
    subtitle: 'パフォーマー「AG」さんのロゴデザイン。Adobe Illustratorを使用し、活動の世界観と名前の文字性を同時に設計した。',
    scope: `Scope: ヒアリング / コンセプト設計 / ロゴデザイン / 納品データ制作
Tool: Adobe Illustrator`,
    thinking: [
      { q: 'なぜそのかたちか', a: '文字は、人格を持てる。', body: '「AG」というイニシャルに、単なる文字以上の意味を持たせることを目標にした。パフォーマーとしての動きやエネルギーを、フォルムの構造に落とし込んだ。' },
      { q: '何を疑ったか', a: '「かっこよくすること」が目的になっていないか。', body: 'ロゴは見た目の完成度より「誰のためのものか」が先にある。活動の場、使われ方を理解してから、ビジュアルの方向を決めた。' },
    ],
    order: 3,
  },
  {
    title: '業務効率化システム群',
    num: '04',
    cat: 'Automation / Internal Tools',
    url: '',
    subtitle: '複数の業務課題に対して、個別に設計・実装した自動化ツール群。ExcelVBA・GAS・Next.jsまで、課題に合わせて道具を選んでいる。',
    scope: `Project 1: eラーニングシステム インポート用データ生成ツール
Stack: Excel VBA, Google Apps Script
Project 2: 在庫管理表 × 出荷依頼用帳票 × 売上管理表 疎結合連携システム
Stack: Excel VBA
Project 3: 請求管理・売上ダッシュボード統合システム
Stack: Next.js, TypeScript, Recharts, Framer Motion, Google Chat API
Project 4: 結婚式DX — 列席者共有システム / LINE Officialミニアプリ / 招待状サイト
Stack: LINE Official Account, Web`,
    thinking: [
      { q: 'なぜ作ったか', a: '「人がやる必要のないこと」を正確に見極めたかった。', body: '自動化の本質は、速さではなく判断の再配置だと思っている。どこまで人が考え、どこから機械が動くべきか。その線引きを丁寧に行う。' },
      { q: '道具の選び方', a: '最新技術ではなく、その現場に最適な道具を選ぶ。', body: 'Excel VBAで十分ならVBAを使う。「モダンな技術を使いたい」という欲求より、「この人がこの環境で使い続けられるか」を優先する。' },
      { q: '疎結合という判断', a: 'システムを密に繋げると、壊れたとき全部が止まる。', body: '在庫・出荷・売上の連携システムでは、あえて疎結合の設計を選んだ。堅牢さは複雑さからではなく、単純さから生まれる。' },
    ],
    order: 4,
  },
]

function buildThinkingBlocks(thinking) {
  const blocks = []
  for (const t of thinking) {
    if (blocks.length > 0) {
      blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [] } })
    }
    blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `Q: ${t.q}` } }] } })
    blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `A: ${t.a}` } }] } })
    blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `Body: ${t.body}` } }] } })
  }
  return blocks
}

async function getTitlePropName() {
  const db = await notion.databases.retrieve({ database_id: DB_ID })
  return Object.entries(db.properties).find(([_, p]) => p.type === 'title')?.[0] ?? 'Name'
}

async function getExistingTitles() {
  const res = await notion.databases.query({ database_id: DB_ID })
  const titleProp = await getTitlePropName()
  return new Map(
    res.results
      .filter(p => 'properties' in p)
      .map(p => {
        const title = p.properties[titleProp]?.title?.[0]?.plain_text ?? ''
        return [title, p.id]
      })
  )
}

async function main() {
  const titlePropName = await getTitlePropName()
  const existing = await getExistingTitles()

  for (const work of works) {
    const existingId = existing.get(work.title)

    if (existingId) {
      // 既存ページを更新（status と不足フィールドを補完）
      await notion.pages.update({
        page_id: existingId,
        properties: {
          [titlePropName]: { title: [{ text: { content: work.title } }] },
          num: { rich_text: [{ text: { content: work.num } }] },
          cat: { rich_text: [{ text: { content: work.cat } }] },
          url: { rich_text: [{ text: { content: work.url } }] },
          subtitle: { rich_text: [{ text: { content: work.subtitle } }] },
          scope: { rich_text: [{ text: { content: work.scope } }] },
          status: { rich_text: [{ text: { content: 'active' } }] },
          order: { number: work.order },
        },
      })

      // ページ本文を差し替え
      const blocksRes = await notion.blocks.children.list({ block_id: existingId })
      for (const block of blocksRes.results) {
        await notion.blocks.delete({ block_id: block.id })
      }
      await notion.blocks.children.append({
        block_id: existingId,
        children: buildThinkingBlocks(work.thinking),
      })

      console.log(`✓ 更新: ${work.title}`)
    } else {
      // 新規作成
      const page = await notion.pages.create({
        parent: { database_id: DB_ID },
        properties: {
          [titlePropName]: { title: [{ text: { content: work.title } }] },
          num: { rich_text: [{ text: { content: work.num } }] },
          cat: { rich_text: [{ text: { content: work.cat } }] },
          url: { rich_text: [{ text: { content: work.url } }] },
          subtitle: { rich_text: [{ text: { content: work.subtitle } }] },
          scope: { rich_text: [{ text: { content: work.scope } }] },
          status: { rich_text: [{ text: { content: 'active' } }] },
          order: { number: work.order },
        },
        children: buildThinkingBlocks(work.thinking),
      })
      console.log(`✓ 作成: ${work.title} (${page.id})`)
    }
  }

  console.log('\n完了！Vercel再デプロイ後に /works を確認してください。')
}

main().catch(err => {
  console.error('エラー:', err.message)
  process.exit(1)
})
