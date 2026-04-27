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
  num: string
  cat: string
  url?: string
  title: string
  subtitle: string
  scope: ScopeRow[]
  thinking: ThinkingItem[]
  order: number
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

async function fetchThinking(pageId: string): Promise<ThinkingItem[]> {
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

async function fetchWorks(): Promise<Work[]> {
  const res = await notion.databases.query({
    database_id: WORKS_DB_ID,
    filter: { property: 'status', rich_text: { equals: 'active' } },
    sorts: [{ property: 'order', direction: 'ascending' }],
  })

  const pages = res.results.filter(p => 'properties' in p)

  const works = await Promise.all(
    pages.map(async (page: any) => {
      const props = page.properties as Record<string, any>
      const scopeText = props.scope?.rich_text?.map((t: any) => t.plain_text).join('') ?? ''
      const urlText = props.url?.rich_text?.[0]?.plain_text ?? ''

      return {
        id: page.id,
        num: props.num?.rich_text?.[0]?.plain_text ?? '',
        cat: props.cat?.rich_text?.[0]?.plain_text ?? '',
        url: urlText || undefined,
        title: getTitleText(props),
        subtitle: props.subtitle?.rich_text?.map((t: any) => t.plain_text).join('') ?? '',
        scope: parseScope(scopeText),
        thinking: await fetchThinking(page.id),
        order: props.order?.number ?? 999,
      }
    })
  )

  return works.sort((a, b) => a.order - b.order)
}

export const getWorks = unstable_cache(fetchWorks, ['works'], {
  revalidate: 300,
  tags: ['works'],
})
