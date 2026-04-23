'use client'

import { useState } from 'react'
import SectionReveal from './SectionReveal'

const SNS = [
  { label: 'X (Twitter)',  href: 'https://x.com/bento59174' },
  { label: 'Instagram',    href: 'https://www.instagram.com/yu_bento_design/' },
  { label: 'Threads',      href: 'https://www.threads.com/@yu_bento_design' },
  { label: 'GitHub',       href: 'https://github.com/ykke539' },
  { label: 'Note',         href: 'https://note.com/yu_bento' },
]

const SUBJECTS = ['お仕事のご依頼', '音楽関係', 'その他のお問い合わせ']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'sent' : 'error')
    } catch { setStatus('error') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '1px solid var(--color-border)', padding: '12px 0',
    fontFamily: 'var(--font-dm-sans)', fontSize: '14px',
    color: 'var(--color-ink)', outline: 'none', transition: 'border-color 0.2s',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-dm-mono)', fontSize: '10px',
    color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px',
  }

  return (
    <section id="contact" className="py-20 md:py-36 px-6 md:px-14 max-w-[1200px] mx-auto" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
        <div>
          <SectionReveal>
            <h2 className="leading-none mb-10 md:mb-12" style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 400, color: 'var(--color-ink)' }}>
              <span className="block mb-4 md:mb-6" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>Contact</span>
              話しましょう
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="text-sm leading-[1.9] mb-8" style={{ color: 'var(--color-muted)' }}>設計できる人を探しているなら、<br />それはここです。</p>
            <div className="flex flex-col gap-3">
              {SNS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="no-underline flex items-center gap-3 text-[11px] tracking-[0.08em] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}
                >
                  <span className="w-4 h-px" style={{ background: 'var(--color-border)', flexShrink: 0 }} />
                  {label}
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.15}>
          {status === 'sent' ? (
            <div className="py-16 text-center" style={{ fontFamily: 'var(--font-shippori)', fontSize: '18px', color: 'var(--color-taupe)' }}>
              送信しました。<br />
              <span className="text-[13px]" style={{ color: 'var(--color-muted)' }}>ありがとうございます。折り返しご連絡します。</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div><label style={labelStyle}>お名前</label><input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="山田 太郎" /></div>
              <div><label style={labelStyle}>メールアドレス</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="you@example.com" /></div>
              <div>
                <label style={labelStyle}>件名</label>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>メッセージ</label><textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'none', lineHeight: '1.8' }} placeholder="ご依頼・ご質問などお気軽にどうぞ" /></div>
              <button type="submit" disabled={status === 'sending'} className="self-start transition-all duration-250 disabled:opacity-50"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-bg)', background: 'var(--color-ink)', border: '1px solid var(--color-ink)', padding: '16px 36px', cursor: 'pointer' }}>
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
              {status === 'error' && <p className="text-[12px]" style={{ color: '#c0392b' }}>送信に失敗しました。時間をおいて再度お試しください。</p>}
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}
