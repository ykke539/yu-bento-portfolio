import { Client } from '@notionhq/client'
import { unstable_cache } from 'next/cache'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const ABOUT_DB_ID = process.env.NOTION_ABOUT_DB_ID!

export interface JourneyItem {
  id: string
  sub_label: string
  title: string
  body: string
  order: number
}

export interface MiscLink {
  id: string
  sub_label: string
  name: string
  url: string
  order: number
}

function getText(props: Record<string, any>, key: string): string {
  return props[key]?.rich_text?.map((t: any) => t.plain_text).join('') ?? ''
}

function getTitleText(props: Record<string, any>): string {
  const p = Object.values(props).find((p: any) => p.type === 'title') as any
  return p?.title?.[0]?.plain_text ?? ''
}

async function fetchAbout(): Promise<{ journey: JourneyItem[]; misc: MiscLink[] }> {
  const res = await notion.databases.query({
    database_id: ABOUT_DB_ID,
    sorts: [{ property: 'order', direction: 'ascending' }],
  })

  const journey: JourneyItem[] = []
  const misc: MiscLink[] = []

  for (const page of res.results) {
    if (!('properties' in page)) continue
    const props = page.properties as Record<string, any>
    const section = getText(props, 'section')

    if (section === 'journey') {
      journey.push({
        id: page.id,
        sub_label: getText(props, 'sub_label'),
        title: getTitleText(props),
        body: getText(props, 'body'),
        order: props.order?.number ?? 99,
      })
    } else if (section === 'misc') {
      misc.push({
        id: page.id,
        sub_label: getText(props, 'sub_label'),
        name: getTitleText(props),
        url: getText(props, 'url'),
        order: props.order?.number ?? 99,
      })
    }
  }

  return { journey, misc }
}

export const getAboutContent = unstable_cache(fetchAbout, ['about'], {
  revalidate: 300,
  tags: ['about'],
})
