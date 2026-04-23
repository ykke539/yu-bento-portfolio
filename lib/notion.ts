import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATABASE_ID = process.env.NOTION_PROPOSALS_DB_ID!

export interface Proposal {
  id: string
  slug: string
  clientName: string
  proposalText: string
  selectedWorks: string[]
  status: 'draft' | 'active' | 'archived'
  order: number
  createdAt?: string
}

function pageToProposal(page: any): Proposal {
  const props = page.properties as Record<string, any>
  const rawWorks = props.selected_works?.rich_text?.map((t: any) => t.plain_text).join('') ?? ''
  const selectedWorks = rawWorks ? rawWorks.split(',').map((s: string) => s.trim()).filter(Boolean) : []
  const status = (props.status?.rich_text?.map((t: any) => t.plain_text).join('') ?? 'draft') as Proposal['status']
  const order = props.order?.number ?? 999

  return {
    id: page.id,
    slug: props.slug?.rich_text?.[0]?.plain_text ?? '',
    clientName: props.client_name?.rich_text?.[0]?.plain_text ?? '',
    proposalText: props.proposal_text?.rich_text?.map((t: any) => t.plain_text).join('') ?? '',
    selectedWorks,
    status,
    order,
    createdAt: page.created_time,
  }
}

export async function getProposalBySlug(slug: string): Promise<Proposal | null> {
  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        { property: 'slug', rich_text: { equals: slug } },
        { property: 'status', rich_text: { equals: 'active' } },
      ],
    },
  })
  const page = res.results[0]
  if (!page || !('properties' in page)) return null
  return pageToProposal(page)
}

export async function getProposalById(id: string): Promise<Proposal | null> {
  const page = await notion.pages.retrieve({ page_id: id }) as any
  if (!page || !('properties' in page)) return null
  return pageToProposal(page)
}

export async function getAllProposals(): Promise<Proposal[]> {
  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  })
  const proposals = res.results.filter(p => 'properties' in p).map(pageToProposal)
  // orderフィールドがあれば順番通りに並べる
  return proposals.sort((a, b) => a.order - b.order)
}

async function getTitlePropName(): Promise<string> {
  const db = await notion.databases.retrieve({ database_id: DATABASE_ID }) as any
  return Object.entries(db.properties as Record<string, any>)
    .find(([_, prop]) => prop.type === 'title')?.[0] ?? 'Name'
}

export async function createProposal(data: {
  slug: string
  clientName: string
  proposalText: string
  selectedWorks: string[]
  order?: number
}): Promise<Proposal> {
  const titlePropName = await getTitlePropName()
  const page = await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      [titlePropName]: { title: [{ text: { content: data.clientName } }] },
      slug: { rich_text: [{ text: { content: data.slug } }] },
      client_name: { rich_text: [{ text: { content: data.clientName } }] },
      proposal_text: { rich_text: [{ text: { content: data.proposalText } }] },
      selected_works: { rich_text: [{ text: { content: data.selectedWorks.join(',') } }] },
      status: { rich_text: [{ text: { content: 'active' } }] },
      ...(data.order !== undefined ? { order: { number: data.order } } : {}),
    },
  }) as any
  return pageToProposal(page)
}

export async function updateProposal(id: string, data: {
  clientName?: string
  proposalText?: string
  selectedWorks?: string[]
  status?: 'draft' | 'active' | 'archived'
  order?: number
}): Promise<void> {
  const props: Record<string, any> = {}
  if (data.clientName !== undefined) {
    const titlePropName = await getTitlePropName()
    props[titlePropName] = { title: [{ text: { content: data.clientName } }] }
    props.client_name = { rich_text: [{ text: { content: data.clientName } }] }
  }
  if (data.proposalText !== undefined)
    props.proposal_text = { rich_text: [{ text: { content: data.proposalText } }] }
  if (data.selectedWorks !== undefined)
    props.selected_works = { rich_text: [{ text: { content: data.selectedWorks.join(',') } }] }
  if (data.status !== undefined)
    props.status = { rich_text: [{ text: { content: data.status } }] }
  if (data.order !== undefined)
    props.order = { number: data.order }

  await notion.pages.update({ page_id: id, properties: props })
}
