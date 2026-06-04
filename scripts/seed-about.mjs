/**
 * Notion About DB シードスクリプト（Skills・Profile の初期データ投入）
 * 実行: node --env-file=.env.local scripts/seed-about.mjs
 *
 * ※ 既存の Journey・Misc データには触れません
 * ※ 実行前に NOTION_ABOUT_DB_ID が .env.local に設定されていることを確認してください
 */

import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DB_ID = process.env.NOTION_ABOUT_DB_ID

if (!DB_ID) {
  console.error('NOTION_ABOUT_DB_ID が未設定です')
  process.exit(1)
}

// タイトルプロパティ名を取得
async function getTitlePropName() {
  const db = await notion.databases.retrieve({ database_id: DB_ID })
  return Object.entries(db.properties).find(([_, p]) => p.type === 'title')?.[0] ?? 'Name'
}

async function createItem(titlePropName, { title, section, sub_label = '', body = '', url = '', order }) {
  await notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      [titlePropName]: { title: [{ text: { content: title } }] },
      section: { rich_text: [{ text: { content: section } }] },
      sub_label: { rich_text: [{ text: { content: sub_label } }] },
      body: { rich_text: [{ text: { content: body } }] },
      url: { rich_text: [{ text: { content: url } }] },
      order: { number: order },
    },
  })
  console.log(`  ✓ ${section} / ${title}`)
}

// ---- シードデータ ----

const skillsData = [
  // Design
  { title: 'UX設計 / 情報設計',      sub_label: 'Core',          body: 'Design',      order: 1 },
  { title: 'UI設計 / コンポーネント設計', sub_label: 'Core',       body: 'Design',      order: 2 },
  { title: 'Figma',                   sub_label: 'Main tool',     body: 'Design',      order: 3 },
  { title: 'Adobe Illustrator',       sub_label: 'Logo / Graphics', body: 'Design',    order: 4 },
  { title: 'ロゴデザイン',            sub_label: '——',            body: 'Design',      order: 5 },
  // Engineering
  { title: 'Next.js / React',         sub_label: 'Main',          body: 'Engineering', order: 6 },
  { title: 'TypeScript',              sub_label: '——',            body: 'Engineering', order: 7 },
  { title: 'Tailwind CSS',            sub_label: '——',            body: 'Engineering', order: 8 },
  { title: 'WordPress (PHP)',         sub_label: 'Full stack',     body: 'Engineering', order: 9 },
  { title: 'Excel VBA / GAS',         sub_label: 'Automation',    body: 'Engineering', order: 10 },
  // Product
  { title: 'AIプロトタイピング',      sub_label: 'Core',          body: 'Product',     order: 11 },
  { title: '要件定義 / 設計',         sub_label: '——',            body: 'Product',     order: 12 },
  { title: 'Supabase / Vercel',       sub_label: 'Infrastructure', body: 'Product',    order: 13 },
  { title: 'Stripe 決済統合',         sub_label: '——',            body: 'Product',     order: 14 },
  { title: 'LINE Official設計',       sub_label: '——',            body: 'Product',     order: 15 },
]

const profileData = [
  { title: 'catch_copy', body: 'AI Native Product Designer × Design Engineer', order: 1 },
  {
    title: 'intro',
    body: 'エンジニアとして実装し、\nデザイナーとして設計し、\n思考する実装者として最後まで持っていく。\n\n「ちゃんと整う」を、一人称で担える人間でいたい。',
    order: 2,
  },
  { title: 'Base',      body: 'Tokyo, Japan', order: 3 },
  { title: 'Available', body: '案件相談可',   order: 4 },
  { title: 'Type',      body: 'フリーランス', order: 5 },
]

// ---- Philosophy ----
// ※ 強調テキストはNotion上で手動で色付けしてください（APIではplain_textで投入）
const philosophyData = [
  { title: 'なぜAIを使うのか',     body: '速さのためではない。\n本質に集中するため。',  sub_label: 'AIは実装の道具ではなく、判断の量を増やすための媒介。速度よりも、思考の密度を上げることが目的。', order: 1 },
  { title: 'なぜUI/UXなのか',      body: '見た目ではなく、判断の設計だから。',          sub_label: 'UIは装飾ではない。ユーザーの次の行動を決める構造。その責任を持って触れる人が少なすぎると思っている。', order: 2 },
  { title: 'なぜ丁寧なのか',       body: '違和感は、すでに答えだ。',                    sub_label: '小さな引っかかりを放置しない。それは問いであり、改善のタネであり、最終的にはユーザーの信頼に直結する。', order: 3 },
  { title: 'なぜ一人で持っていくのか', body: '設計から実装まで、文脈が途切れない。',   sub_label: '思想を知っている人間が実装する。これだけで、品質の劣化が大幅に減る。分業の限界を、一人称で越える。', order: 4 },
]

// ---- Process ----
const processData = [
  { title: 'Observe',     sub_label: '観察する',     body: '何を作るかより先に、何が起きているかを見る。課題の定義が間違っていれば、どんな実装も無駄になる。ユーザーの行動と違和感を丁寧に拾う。', order: 1 },
  { title: 'Organize',    sub_label: '整理する',     body: '情報を構造化する。何が本質で、何が枝葉か。捨てる判断と残す判断の両方に責任を持つ。', order: 2 },
  { title: 'Hypothesize', sub_label: '仮説を立てる', body: '「こうすれば良くなる」という根拠のある仮説を持って、設計に入る。直感と論理の両方を使う。', order: 3 },
  { title: 'Build',       sub_label: '作る',         body: '設計の意図を壊さずに実装する。コードは仕様書ではなく、UIの最後の翻訳者だと思っている。', order: 4 },
  { title: 'Refine',      sub_label: '改善する',     body: '出して終わりではない。使われてからが設計の始まり。小さな違和感を積み重ねて、丁寧に精度を上げる。', order: 5 },
]

async function main() {
  const titlePropName = await getTitlePropName()
  console.log(`タイトルプロパティ名: "${titlePropName}"`)

  console.log('\n--- Skills を投入中 ---')
  for (const item of skillsData) {
    await createItem(titlePropName, { ...item, section: 'skills' })
  }

  console.log('\n--- Profile を投入中 ---')
  for (const item of profileData) {
    await createItem(titlePropName, { ...item, section: 'profile' })
  }

  console.log('\n--- Philosophy を投入中 ---')
  for (const item of philosophyData) {
    await createItem(titlePropName, { ...item, section: 'philosophy' })
  }

  console.log('\n--- Process を投入中 ---')
  for (const item of processData) {
    await createItem(titlePropName, { ...item, section: 'process' })
  }

  console.log('\n✅ 完了！Notionを確認してください。')
  console.log('💡 Philosophy の強調テキストはNotion上で文字を灰色に色付けしてください。')
}

main().catch(e => { console.error(e); process.exit(1) })
