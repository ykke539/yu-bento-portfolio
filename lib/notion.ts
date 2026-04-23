import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const DATABASE_ID = process.env.NOTION_PROPOSALS_DB_ID!

export interface Proposal {
  slug: string
  clientName: string
  proposalText: string
  selectedWorks: string[]
  status: 'draft' | 'active' | 'archived'
}

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

  const props = page.properties as Record<string, any>

  return {
    slug,
    clientName: props.client_name?.rich_text?.[0]?.plain_text ?? '',
    proposalText: props.proposal_text?.rich_text?.map((t: any) => t.plain_text).join('') ?? '',
    selectedWorks: props.selected_works?.multi_select?.map((s: any) => s.name) ?? [],
    status: props.status?.select?.name ?? 'draft',
  }
}
