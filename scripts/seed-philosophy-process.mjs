import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DB_ID = process.env.NOTION_ABOUT_DB_ID

async function getTitlePropName() {
  const db = await notion.databases.retrieve({ database_id: DB_ID })
  return Object.entries(db.properties).find(([_, p]) => p.type === 'title')?.[0] ?? 'Name'
}

async function createItem(titlePropName, { title, section, sub_label = '', body = '', order }) {
  await notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      [titlePropName]: { title: [{ text: { content: title } }] },
      section: { rich_text: [{ text: { content: section } }] },
      sub_label: { rich_text: [{ text: { content: sub_label } }] },
      body: { rich_text: [{ text: { content: body } }] },
      url: { rich_text: [{ text: { content: '' } }] },
      order: { number: order },
    },
  })
  console.log(`  ✓ ${section} / ${title}`)
}

const philosophyData = [
  { title: 'なぜAIを使うのか',        body: '速さのためではない。\n本質に集中するため。',  sub_label: 'AIは実装の道具ではなく、判断の量を増やすための媒介。速度よりも、思考の密度を上げることが目的。', order: 1 },
  { title: 'なぜUI/UXなのか',         body: '見た目ではなく、判断の設計だから。',          sub_label: 'UIは装飾ではない。ユーザーの次の行動を決める構造。その責任を持って触れる人が少なすぎると思っている。', order: 2 },
  { title: 'なぜ丁寧なのか',          body: '違和感は、すでに答えだ。',                    sub_label: '小さな引っかかりを放置しない。それは問いであり、改善のタネであり、最終的にはユーザーの信頼に直結する。', order: 3 },
  { title: 'なぜ一人で持っていくのか', body: '設計から実装まで、文脈が途切れない。',        sub_label: '思想を知っている人間が実装する。これだけで、品質の劣化が大幅に減る。分業の限界を、一人称で越える。', order: 4 },
]

const processData = [
  { title: 'Observe',     sub_label: '観察する',     body: '何を作るかより先に、何が起きているかを見る。課題の定義が間違っていれば、どんな実装も無駄になる。ユーザーの行動と違和感を丁寧に拾う。', order: 1 },
  { title: 'Organize',    sub_label: '整理する',     body: '情報を構造化する。何が本質で、何が枝葉か。捨てる判断と残す判断の両方に責任を持つ。', order: 2 },
  { title: 'Hypothesize', sub_label: '仮説を立てる', body: '「こうすれば良くなる」という根拠のある仮説を持って、設計に入る。直感と論理の両方を使う。', order: 3 },
  { title: 'Build',       sub_label: '作る',         body: '設計の意図を壊さずに実装する。コードは仕様書ではなく、UIの最後の翻訳者だと思っている。', order: 4 },
  { title: 'Refine',      sub_label: '改善する',     body: '出して終わりではない。使われてからが設計の始まり。小さな違和感を積み重ねて、丁寧に精度を上げる。', order: 5 },
]

const titlePropName = await getTitlePropName()
console.log('\n--- Philosophy ---')
for (const item of philosophyData) await createItem(titlePropName, { ...item, section: 'philosophy' })
console.log('\n--- Process ---')
for (const item of processData) await createItem(titlePropName, { ...item, section: 'process' })
console.log('\n✅ 完了')
