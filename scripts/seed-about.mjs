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

  console.log('\n✅ 完了！Notionを確認してください。')
}

main().catch(e => { console.error(e); process.exit(1) })
