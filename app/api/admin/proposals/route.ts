import { NextRequest, NextResponse } from 'next/server'
import { getAllProposals, createProposal } from '@/lib/notion'
import { COOKIE_NAME, getExpectedToken } from '@/lib/auth'

function isAuthed(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value === getExpectedToken()
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbId = process.env.NOTION_PROPOSALS_DB_ID
  const apiKey = process.env.NOTION_API_KEY

  if (!apiKey) return NextResponse.json({ error: 'NOTION_API_KEY が設定されていません' }, { status: 500 })
  if (!dbId)   return NextResponse.json({ error: 'NOTION_PROPOSALS_DB_ID が設定されていません' }, { status: 500 })

  // ?v=... が混入していないか確認
  if (dbId.includes('?') || dbId.includes('http')) {
    return NextResponse.json({
      error: `NOTION_PROPOSALS_DB_ID の形式が不正です。\n現在の値: "${dbId}"\n正しい形式: 32文字のID（?v=以降は不要）`
    }, { status: 500 })
  }

  try {
    const proposals = await getAllProposals()
    return NextResponse.json(proposals)
  } catch (e: any) {
    console.error('[admin/proposals GET]', e)
    return NextResponse.json(
      { error: `Notion API エラー: ${e.message}` },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { clientName, proposalText, selectedWorks } = await req.json()
  if (!clientName || !proposalText) {
    return NextResponse.json({ error: 'clientName and proposalText are required' }, { status: 400 })
  }

  const slug = crypto.randomUUID()
  const proposal = await createProposal({ slug, clientName, proposalText, selectedWorks: selectedWorks ?? [] })
  return NextResponse.json(proposal, { status: 201 })
}
