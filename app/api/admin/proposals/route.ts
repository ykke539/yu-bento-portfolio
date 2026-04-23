import { NextRequest, NextResponse } from 'next/server'
import { getAllProposals, createProposal } from '@/lib/notion'
import { COOKIE_NAME, getExpectedToken } from '@/lib/auth'

function isAuthed(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value === getExpectedToken()
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const proposals = await getAllProposals()
  return NextResponse.json(proposals)
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
