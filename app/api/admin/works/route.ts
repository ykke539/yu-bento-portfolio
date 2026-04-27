import { NextRequest, NextResponse } from 'next/server'
import { getAllWorksForAdmin, createWork } from '@/lib/notion-works'
import { COOKIE_NAME, getExpectedToken } from '@/lib/auth'

function isAuthed(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value === getExpectedToken()
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const works = await getAllWorksForAdmin()
    return NextResponse.json(works)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  if (!data.title || !data.slug) {
    return NextResponse.json({ error: 'title と slug は必須です' }, { status: 400 })
  }
  try {
    const work = await createWork(data)
    return NextResponse.json(work, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
