import { NextRequest, NextResponse } from 'next/server'
import { getAllAboutForAdmin, createAboutItem } from '@/lib/notion-about'
import { COOKIE_NAME, getExpectedToken } from '@/lib/auth'

function isAuthed(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value === getExpectedToken()
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const items = await getAllAboutForAdmin()
    return NextResponse.json(items)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  if (!data.title || !data.section) {
    return NextResponse.json({ error: 'title と section は必須です' }, { status: 400 })
  }
  try {
    const item = await createAboutItem(data)
    return NextResponse.json(item, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
