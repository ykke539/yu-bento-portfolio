import { NextRequest, NextResponse } from 'next/server'
import { getWorkForAdmin, updateWork } from '@/lib/notion-works'
import { COOKIE_NAME, getExpectedToken } from '@/lib/auth'

function isAuthed(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value === getExpectedToken()
}

interface Params { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const work = await getWorkForAdmin(id)
    if (!work) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(work)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json()
  try {
    await updateWork(id, data)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
