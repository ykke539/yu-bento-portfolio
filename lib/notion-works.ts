import { Client } from '@notionhq/client'
import { unstable_cache } from 'next/cache'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const WORKS_DB_ID = process.env.NOTION_WORKS_DB_ID!

export interface ScopeRow {
  key: string
  val?: string
  tags?: string[]
}

export interface ThinkingItem {
  q: string
  a: string
  body: string
}

export interface Work {
  id: string
  slug: string
  num: string
  cat: string
  url?: string
  title: string
  subtitle: string
  scope: ScopeRow[]
  thinking: ThinkingItem[]
  order: number
  status: string
}

function getTitleText(props: Record<string, any>): string {
  const titleProp = Object.values(props).find((p: any) => p.type === 'title') as any
  return titleProp?.title?.[0]?.plain_text ?? ''
}

function parseScope(text: string): ScopeRow[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) return { key: line }
      const key = line.slice(0, colonIdx).trim()
      const val = line.slice(colonIdx + 1).trim()
      if (key.toLowerCase() === 'stack') {
        return { key, tags: val.split(',').map(t => t.trim()).filter(Boolean) }
      }
      return { key, val }
    })
}

export function formatScope(rows: ScopeRow[]): string {
  return rows
    .map(row => {
      if (row.tags) return `${row.key}: ${row.tags.join(', ')}`
      return `${row.key}: ${row.val ?? ''}`
    })
    .join('\n')
}

export async function fetchThinkingBlocks(pageId: string): Promise<ThinkingItem[]> {
  const res = await notion.blocks.children.list({ block_id: pageId })
  const items: ThinkingItem[] = []
  let current: Partial<ThinkingItem> = {}

  for (const block of res.results) {
    if (!('type' in block) || block.type !== 'paragraph') continue
    const text = (block as any).paragraph.rich_text
      .map((t: any) => t.plain_text)
      .join('')
    if (!text.trim()) continue

    if (text.startsWith('Q:')) {
      if (current.q && current.a && current.body) items.push(current as ThinkingItem)
      current = { q: text.slice(2).trim() }
    } else if (text.startsWith('A:')) {
      current.a = text.slice(2).trim()
    } else if (text.startsWith('Body:')) {
      current.body = text.slice(5).trim()
    }
  }
  if (current.q && current.a && current.body) items.push(current as ThinkingItem)
  return items
}

export function buildThinkingBlocks(thinking: ThinkingItem[]) {
  const blocks: any[] = []
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

function pageToWork(page: any): Omit<Work, 'thinking'> {
  const props = page.properties as Record<string, any>
  const scopeText = props.scope?.rich_text?.map((t: any) => t.plain_text).join('') ?? ''
  const urlText = props.url?.rich_text?.[0]?.plain_text ?? ''

  return {
    id: page.id,
    slug: props.slug?.rich_text?.[0]?.plain_text ?? '',
    num: props.num?.rich_text?.[0]?.plain_text ?? '',
    cat: props.cat?.rich_text?.[0]?.plain_text ?? '',
    url: urlText || undefined,
    title: getTitleText(props),
    subtitle: props.subtitle?.rich_text?.map((t: any) => t.plain_text).join('') ?? '',
    scope: parseScope(scopeText),
    order: props.order?.number ?? 999,
    status: props.status?.rich_text?.[0]?.plain_text ?? 'draft',
  }
}

async function fetchWorks(): Promise<Work[]> {
  const res = await notion.databases.query({
    database_id: WORKS_DB_ID,
    filter: { property: 'status', rich_text: { equals: 'active' } },
    sorts: [{ property: 'order', direction: 'ascending' }],
  })

  const pages = res.results.filter(p => 'properties' in p)
  const works = await Promise.all(
    pages.map(async (page: any) => ({
      ...pageToWork(page),
      thinking: await fetchThinkingBlocks(page.id),
    }))
  )
  return works.sort((a, b) => a.order - b.order)
}

export const getWorks = unstable_cache(fetchWorks, ['works'], {
  revalidate: 300,
  tags: ['works'],
})

// 提案ページ用：status問わずslugで取得（キャッシュなし）
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const res = await notion.databases.query({
    database_id: WORKS_DB_ID,
    filter: { property: 'slug', rich_text: { equals: slug } },
  })
  const page = res.results.find(p => 'properties' in p) as any
  if (!page) return null
  return { ...pageToWork(page), thinking: await fetchThinkingBlocks(page.id) }
}

// 管理画面用：全ステータスを返す（キャッシュなし）
export async function getAllWorksForAdmin(): Promise<(Omit<Work, 'thinking'> & { thinking: ThinkingItem[] })[]> {
  const res = await notion.databases.query({
    database_id: WORKS_DB_ID,
    sorts: [{ property: 'order', direction: 'ascending' }],
  })
  const pages = res.results.filter(p => 'properties' in p)
  const works = await Promise.all(
    pages.map(async (page: any) => ({
      ...pageToWork(page),
      thinking: await fetchThinkingBlocks(page.id),
    }))
  )
  return works.sort((a, b) => a.order - b.order)
}

// 管理画面編集用：IDで1件取得（キャッシュなし）
export async function getWorkForAdmin(notionId: string): Promise<Work | null> {
  const page = await notion.pages.retrieve({ page_id: notionId }) as any
  if (!page || !('properties' in page)) return null
  return { ...pageToWork(page), thinking: await fetchThinkingBlocks(notionId) }
}

export async function createWork(data: {
  title: string
  slug: string
  num: string
  cat: string
  url: string
  subtitle: string
  scope: ScopeRow[]
  thinking: ThinkingItem[]
  order?: number
  status: string
}): Promise<Work> {
  const titlePropName = await getTitlePropName()
  const page = await notion.pages.create({
    parent: { database_id: WORKS_DB_ID },
    properties: {
      [titlePropName]: { title: [{ text: { content: data.title } }] },
      slug: { rich_text: [{ text: { content: data.slug } }] },
      num: { rich_text: [{ text: { content: data.num } }] },
      cat: { rich_text: [{ text: { content: data.cat } }] },
      url: { rich_text: [{ text: { content: data.url } }] },
      subtitle: { rich_text: [{ text: { content: data.subtitle } }] },
      scope: { rich_text: [{ text: { content: formatScope(data.scope) } }] },
      status: { rich_text: [{ text: { content: data.status } }] },
      ...(data.order !== undefined ? { order: { number: data.order } } : {}),
    },
    children: buildThinkingBlocks(data.thinking),
  }) as any
  return { ...pageToWork(page), thinking: data.thinking }
}

export async function updateWork(notionId: string, data: {
  title?: string
  slug?: string
  num?: string
  cat?: string
  url?: string
  subtitle?: string
  scope?: ScopeRow[]
  thinking?: ThinkingItem[]
  order?: number
  status?: string
}): Promise<void> {
  const props: Record<string, any> = {}

  if (data.title !== undefined) {
    const titlePropName = await getTitlePropName()
    props[titlePropName] = { title: [{ text: { content: data.title } }] }
  }
  if (data.slug !== undefined) props.slug = { rich_text: [{ text: { content: data.slug } }] }
  if (data.num !== undefined) props.num = { rich_text: [{ text: { content: data.num } }] }
  if (data.cat !== undefined) props.cat = { rich_text: [{ text: { content: data.cat } }] }
  if (data.url !== undefined) props.url = { rich_text: [{ text: { content: data.url } }] }
  if (data.subtitle !== undefined) props.subtitle = { rich_text: [{ text: { content: data.subtitle } }] }
  if (data.scope !== undefined) props.scope = { rich_text: [{ text: { content: formatScope(data.scope) } }] }
  if (data.status !== undefined) props.status = { rich_text: [{ text: { content: data.status } }] }
  if (data.order !== undefined) props.order = { number: data.order }

  await notion.pages.update({ page_id: notionId, properties: props })

  if (data.thinking !== undefined) {
    const existing = await notion.blocks.children.list({ block_id: notionId })
    await Promise.all(existing.results.map(b => notion.blocks.delete({ block_id: b.id })))
    if (data.thinking.length > 0) {
      await notion.blocks.children.append({
        block_id: notionId,
        children: buildThinkingBlocks(data.thinking),
      })
    }
  }
}

async function getTitlePropName(): Promise<string> {
  const db = await notion.databases.retrieve({ database_id: WORKS_DB_ID }) as any
  return Object.entries(db.properties as Record<string, any>)
    .find(([_, prop]) => prop.type === 'title')?.[0] ?? 'Name'
}
