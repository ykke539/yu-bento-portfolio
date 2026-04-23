'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const WORKS = [
  { id: 'perzona',    label: 'Perzona — Web App / Full Stack' },
  { id: 'annonline',  label: 'annonline.jp — WordPress / Full Stack' },
  { id: 'ag-logo',    label: 'AG — ロゴデザイン' },
  { id: 'automation', label: '業務効率化システム群' },
]

export default function NewProposalPage() {
  const [form, setForm] = useState({ clientName: '', proposalText: '', selectedWorks: [] as string[] })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [createdSlug, setCreatedSlug] = useState('')
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const toggleWork = (id: string) => {
    setForm(f => ({
      ...f,
      selectedWorks: f.selectedWorks.includes(id)
        ? f.selectedWorks.filter(w => w !== id)
        : [...f.selectedWorks, id],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const res = await fetch('/api/admin/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const data = await res.json()
      setCreatedSlug(data.slug)
      setStatus('done')
    } else {
      setStatus('error')
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/proposal/${createdSlug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const s: Record<string, React.CSSProperties> = {
    header: { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px', height: '56px' },
    back: { fontSize: '13px', color: '#78716c', textDecoration: 'none' },
    title: { fontSize: '16px', fontWeight: 600, color: '#111110' },
    main: { maxWidth: '640px', margin: '0 auto', padding: '40px 24px' },
    label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#44403c', marginBottom: '8px', letterSpacing: '0.03em' },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
    textarea: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', outline: 'none', resize: 'vertical' as const, minHeight: '160px', boxSizing: 'border-box' as const, lineHeight: '1.7', fontFamily: 'inherit' },
    checkbox: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', border: '1px solid #e7e5e4', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#44403c' },
    submitBtn: { padding: '11px 24px', background: '#111110', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' },
    hint: { fontSize: '12px', color: '#a8a29e', marginTop: '6px' },
    successCard: { background: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', padding: '32px', textAlign: 'center' as const },
    url: { fontFamily: 'monospace', fontSize: '13px', background: '#f5f5f4', padding: '12px 16px', borderRadius: '6px', wordBreak: 'break-all' as const, color: '#44403c', margin: '16px 0' },
    copyBtn: { padding: '10px 24px', background: '#111110', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', marginRight: '12px' },
  }

  if (status === 'done') {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/proposal/${createdSlug}`
    return (
      <>
        <header style={s.header}>
          <Link href="/admin" style={s.back}>← 一覧に戻る</Link>
          <span style={s.title}>提案ページを作成しました</span>
        </header>
        <main style={s.main}>
          <div style={s.successCard}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111110', marginBottom: '8px' }}>作成完了</div>
            <div style={{ fontSize: '14px', color: '#78716c', marginBottom: '20px' }}>以下のURLをクライアントに共有してください</div>
            <div style={s.url}>{url}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={copyUrl} style={{ ...s.copyBtn, background: copied ? '#166534' : '#111110' }}>
                {copied ? '✓ コピー済み' : 'URLをコピー'}
              </button>
              <a href={url} target="_blank" rel="noopener noreferrer"
                style={{ padding: '10px 24px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', color: '#44403c' }}>
                プレビュー ↗
              </a>
              <button onClick={() => router.push('/admin')}
                style={{ padding: '10px 24px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#fff', color: '#44403c' }}>
                一覧に戻る
              </button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <header style={s.header}>
        <Link href="/admin" style={s.back}>← 一覧に戻る</Link>
        <span style={s.title}>新規提案ページ作成</span>
      </header>

      <main style={s.main}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div>
            <label style={s.label}>クライアント名 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="text" required value={form.clientName}
              onChange={e => setForm({ ...form, clientName: e.target.value })}
              style={s.input} placeholder="株式会社〇〇 様"
            />
            <div style={s.hint}>管理用（提案ページには表示されません）</div>
          </div>

          <div>
            <label style={s.label}>提案文 <span style={{ color: '#dc2626' }}>*</span></label>
            <textarea
              required value={form.proposalText}
              onChange={e => setForm({ ...form, proposalText: e.target.value })}
              style={s.textarea}
              placeholder={'例：\n〇〇様のプロジェクトに向けて、\n私がこれまで担当してきた実績と\nアプローチをご紹介します。'}
            />
            <div style={s.hint}>ページ最上部に大きく表示されます</div>
          </div>

          <div>
            <label style={s.label}>表示する実績</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {WORKS.map(w => (
                <label key={w.id} style={{ ...s.checkbox, background: form.selectedWorks.includes(w.id) ? '#f0fdf4' : '#fff', borderColor: form.selectedWorks.includes(w.id) ? '#86efac' : '#e7e5e4' }}>
                  <input
                    type="checkbox" checked={form.selectedWorks.includes(w.id)}
                    onChange={() => toggleWork(w.id)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  {w.label}
                </label>
              ))}
            </div>
            <div style={s.hint}>未選択の場合は全実績を表示します</div>
          </div>

          {status === 'error' && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '6px', fontSize: '13px', color: '#dc2626' }}>
              作成に失敗しました。Notion APIの設定を確認してください。
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={status === 'submitting' || !form.clientName || !form.proposalText} style={{ ...s.submitBtn, opacity: status === 'submitting' || !form.clientName || !form.proposalText ? 0.5 : 1 }}>
              {status === 'submitting' ? '作成中...' : '提案ページを作成する'}
            </button>
            <Link href="/admin" style={{ padding: '11px 20px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', textDecoration: 'none', color: '#78716c' }}>
              キャンセル
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}
