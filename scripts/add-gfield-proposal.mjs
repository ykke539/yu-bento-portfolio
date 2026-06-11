import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DB_ID = process.env.NOTION_PROPOSALS_DB_ID

async function ensureHtmlUrlProperty() {
  const db = await notion.databases.retrieve({ database_id: DB_ID })
  if (db.properties.html_url) {
    console.log('  ✓ html_url プロパティは既に存在します')
    return
  }
  await notion.databases.update({
    database_id: DB_ID,
    properties: { html_url: { rich_text: {} } },
  })
  console.log('  ✓ html_url プロパティを追加しました')
}

async function getTitlePropName() {
  const db = await notion.databases.retrieve({ database_id: DB_ID })
  return Object.entries(db.properties).find(([_, p]) => p.type === 'title')?.[0] ?? 'Name'
}

async function createGfieldProposal() {
  const titlePropName = await getTitlePropName()
  const clientName = '株式会社G-field 様'
  const page = await notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      [titlePropName]: { title: [{ text: { content: clientName } }] },
      slug: { rich_text: [{ text: { content: 'gfield' } }] },
      client_name: { rich_text: [{ text: { content: clientName } }] },
      proposal_text: { rich_text: [{ text: { content: '' } }] },
      selected_works: { rich_text: [{ text: { content: '' } }] },
      status: { rich_text: [{ text: { content: 'active' } }] },
      memo: { rich_text: [{ text: { content: 'ホームページ制作のご提案' } }] },
      html_url: { rich_text: [{ text: { content: '/proposals/gfield.html' } }] },
    },
  })
  console.log(`  ✓ ${clientName} (slug: gfield) を作成しました → ${page.id}`)
}

console.log('--- Proposals DB に html_url プロパティを追加 ---')
await ensureHtmlUrlProperty()
console.log('\n--- G-field 提案ページを作成 ---')
await createGfieldProposal()
console.log('\n✅ 完了')
