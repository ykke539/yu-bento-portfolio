import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'portfolio@resend.dev',
    to: 'yusuke.katsuki.539@gmail.com',
    replyTo: email,
    subject: `[優.bento] ${subject} — ${name}`,
    text: `名前: ${name}\nメール: ${email}\n件名: ${subject}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
