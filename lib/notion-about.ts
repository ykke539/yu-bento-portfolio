import { Client } from '@notionhq/client'
import { unstable_cache } from 'next/cache'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const ABOUT_DB_ID = process.env.NOTION_ABOUT_DB_ID!

export interface JourneyItem {
  id: string
  section: 'journey'
  sub_label: string
  title: string
  body: string
  order: number
}

export interface MiscLink {
  id: string
  section: 'misc'
  sub_label: string
  name: string
  url: string
  order: number
}

export interface SkillItem {
  id: string
  section: 'skills'
  title: string      // スキル名
  sub_label: string  // レベル表記
  body: string       // グループ（Design / Engineering / Product）
  order: number
}

export interface ProfileItem {
  id: string
  section: 'profile'
  title: string          // キー（catch_copy / intro / intro_top / Base / Available / Type）
  body: string           // 値（プレーンテキスト）
  bodyRich: RichTextSpan[] // rich_text（強調色対応）
  order: number
}

export interface AboutStatItem {
  id: string
  section: 'about_stats'
  title: string  // キー名（Role / Focus / Stack / Belief）
  body: string   // 値
  order: number
}

export interface RichTextSpan {
  text: string
  color: string  // 'default' | 'gray' | 'brown' | ... Notionのcolor値
}

export interface PhilosophyItem {
  id: string
  section: 'philosophy'
  title: string          // 問い（q）
  bodyRich: RichTextSpan[] // 答え（色情報付き）
  body: string           // 答え（プレーンテキスト）
  sub_label: string      // 説明文
  order: number
}

export interface ProcessItem {
  id: string
  section: 'process'
  title: string      // 英語名（en）
  sub_label: string  // 日本語名（jp）
  body: string       // 説明文（desc）
  order: number
}

export interface AboutItem {
  id: string
  section: string
  title: string
  sub_label: string
  body: string
  url: string
  order: number
}

function getText(props: Record<string, any>, key: string): string {
  return props[key]?.rich_text?.map((t: any) => t.plain_text).join('') ?? ''
}

function getRichText(props: Record<string, any>, key: string): RichTextSpan[] {
  return (props[key]?.rich_text ?? []).map((t: any) => ({
    text: t.plain_text,
    color: t.annotations?.color ?? 'default',
  }))
}

function getTitleText(props: Record<string, any>): string {
  const p = Object.values(props).find((p: any) => p.type === 'title') as any
  return p?.title?.[0]?.plain_text ?? ''
}

async function fetchAbout(): Promise<{
  journey: JourneyItem[]
  misc: MiscLink[]
  skills: SkillItem[]
  profile: ProfileItem[]
  philosophy: PhilosophyItem[]
  process: ProcessItem[]
  aboutStats: AboutStatItem[]
}> {
  const res = await notion.databases.query({
    database_id: ABOUT_DB_ID,
    sorts: [{ property: 'order', direction: 'ascending' }],
  })

  const journey: JourneyItem[] = []
  const misc: MiscLink[] = []
  const skills: SkillItem[] = []
  const profile: ProfileItem[] = []
  const philosophy: PhilosophyItem[] = []
  const process: ProcessItem[] = []
  const aboutStats: AboutStatItem[] = []

  for (const page of res.results) {
    if (!('properties' in page)) continue
    const props = page.properties as Record<string, any>
    const section = getText(props, 'section')
    const order = props.order?.number ?? 99

    if (section === 'journey') {
      journey.push({
        id: page.id,
        section: 'journey',
        sub_label: getText(props, 'sub_label'),
        title: getTitleText(props),
        body: getText(props, 'body'),
        order,
      })
    } else if (section === 'misc') {
      misc.push({
        id: page.id,
        section: 'misc',
        sub_label: getText(props, 'sub_label'),
        name: getTitleText(props),
        url: getText(props, 'url'),
        order,
      })
    } else if (section === 'skills') {
      skills.push({
        id: page.id,
        section: 'skills',
        title: getTitleText(props),
        sub_label: getText(props, 'sub_label'),
        body: getText(props, 'body'),
        order,
      })
    } else if (section === 'profile') {
      const bodyRich = getRichText(props, 'body')
      profile.push({
        id: page.id,
        section: 'profile',
        title: getTitleText(props),
        body: bodyRich.map(s => s.text).join(''),
        bodyRich,
        order,
      })
    } else if (section === 'philosophy') {
      const bodyRich = getRichText(props, 'body')
      philosophy.push({
        id: page.id,
        section: 'philosophy',
        title: getTitleText(props),
        bodyRich,
        body: bodyRich.map(s => s.text).join(''),
        sub_label: getText(props, 'sub_label'),
        order,
      })
    } else if (section === 'process') {
      process.push({
        id: page.id,
        section: 'process',
        title: getTitleText(props),
        sub_label: getText(props, 'sub_label'),
        body: getText(props, 'body'),
        order,
      })
    } else if (section === 'about_stats') {
      aboutStats.push({
        id: page.id,
        section: 'about_stats',
        title: getTitleText(props),
        body: getText(props, 'body'),
        order,
      })
    }
  }

  return { journey, misc, skills, profile, philosophy, process, aboutStats }
}

export const getAboutContent = unstable_cache(fetchAbout, ['about'], {
  revalidate: 300,
  tags: ['about'],
})

// 管理画面用：全アイテムを返す（キャッシュなし）
export async function getAllAboutForAdmin(): Promise<AboutItem[]> {
  const res = await notion.databases.query({
    database_id: ABOUT_DB_ID,
    sorts: [{ property: 'order', direction: 'ascending' }],
  })

  return res.results
    .filter(p => 'properties' in p)
    .map((page: any) => {
      const props = page.properties as Record<string, any>
      return {
        id: page.id,
        section: getText(props, 'section'),
        title: getTitleText(props),
        sub_label: getText(props, 'sub_label'),
        body: getText(props, 'body'),
        url: getText(props, 'url'),
        order: props.order?.number ?? 99,
      }
    })
}

async function getTitlePropName(): Promise<string> {
  const db = await notion.databases.retrieve({ database_id: ABOUT_DB_ID }) as any
  return Object.entries(db.properties as Record<string, any>)
    .find(([_, prop]) => prop.type === 'title')?.[0] ?? 'Name'
}

export async function createAboutItem(data: {
  section: string
  title: string
  sub_label?: string
  body?: string
  url?: string
  order?: number
}): Promise<AboutItem> {
  const titlePropName = await getTitlePropName()
  const page = await notion.pages.create({
    parent: { database_id: ABOUT_DB_ID },
    properties: {
      [titlePropName]: { title: [{ text: { content: data.title } }] },
      section: { rich_text: [{ text: { content: data.section } }] },
      sub_label: { rich_text: [{ text: { content: data.sub_label ?? '' } }] },
      body: { rich_text: [{ text: { content: data.body ?? '' } }] },
      url: { rich_text: [{ text: { content: data.url ?? '' } }] },
      ...(data.order !== undefined ? { order: { number: data.order } } : {}),
    },
  }) as any
  const props = page.properties as Record<string, any>
  return {
    id: page.id,
    section: data.section,
    title: data.title,
    sub_label: data.sub_label ?? '',
    body: data.body ?? '',
    url: data.url ?? '',
    order: data.order ?? 99,
  }
}

export async function updateAboutItem(id: string, data: {
  title?: string
  sub_label?: string
  body?: string
  url?: string
  order?: number
}): Promise<void> {
  const props: Record<string, any> = {}
  if (data.title !== undefined) {
    const titlePropName = await getTitlePropName()
    props[titlePropName] = { title: [{ text: { content: data.title } }] }
  }
  if (data.sub_label !== undefined) props.sub_label = { rich_text: [{ text: { content: data.sub_label } }] }
  if (data.body !== undefined) props.body = { rich_text: [{ text: { content: data.body } }] }
  if (data.url !== undefined) props.url = { rich_text: [{ text: { content: data.url } }] }
  if (data.order !== undefined) props.order = { number: data.order }
  await notion.pages.update({ page_id: id, properties: props })
}

export async function deleteAboutItem(id: string): Promise<void> {
  await notion.pages.update({ page_id: id, properties: { archived: true } as any })
}
