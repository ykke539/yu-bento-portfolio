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
  createdAt?: string
}

function pageToProposal(page: any): Proposal {
  const props = page.properties as Record<string, any>
  return {
    id: page.id,
    slug: props.slug?.rich_text?.[0]?.plain_text ?? '',
    clientName: props.client_name?.rich_text?.[0]?.plain_text ?? '',
    proposalText: props.proposal_text?.rich_text?.map((t: any) => t.plain_text).join('') ?? '',
    selectedWorks: props.selected_works?.multi_select?.map((s: any) => s.name) ?? [],
    status: props.status?.select?.name ?? 'draft',
    createdAt: page.created_time,
  }
}

// 公開用：アクティブな提案をスラッグで取得
export async function getProposalBySlug(slug: string): Promise<Proposal | null> {
  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        { property: 'slug', rich_text: { equals: slug } },
        { property: 'status', select: { equals: 'active' } },
      ],
    },
  })
  const page = res.results[0]
  if (!page || !('properties' in page)) return null
  return pageToProposal(page)
}

// 管理用：全提案を取得
export async function getAllProposals(): Promise<Proposal[]> {
  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  })
  return res.results
    .filter(p => 'properties' in p)
    .map(pageToProposal)
}

// 管理用：提案を作成
export async function createProposal(data: {
  slug: string
  clientName: string
  proposalText: string
  selectedWorks: string[]
}): Promise<Proposal> {
  const page = await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      // Notionのtitleプロパティ（DB名が"Name"の場合）
      Name: { title: [{ text: { content: data.clientName } }] },
      slug: { rich_text: [{ text: { content: data.slug } }] },
      client_name: { rich_text: [{ text: { content: data.clientName } }] },
      proposal_text: { rich_text: [{ text: { content: data.proposalText } }] },
      selected_works: { multi_select: data.selectedWorks.map(name => ({ name })) },
      status: { select: { name: 'active' } },
    },
  }) as any
  return pageToProposal(page)
}

// 管理用：ステータス更新
export async function updateProposalStatus(
  id: string,
  status: 'draft' | 'active' | 'archived'
): Promise<void> {
  await notion.pages.update({
    page_id: id,
    properties: {
      status: { select: { name: status } },
    },
  })
}
