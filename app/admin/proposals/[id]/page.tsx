'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import type { Proposal } from '@/lib/notion'

const WORKS = [
  { id: 'perzona',    label: 'Perzona — Web App / Full Stack' },
  { id: 'annonline',  label: 'annonline.jp — WordPress / Full Stack' },
  { id: 'ag-logo',    label: 'AG — ロゴデザイン' },
  { id: 'automation', label: '業務効率化システム群' },
]

export default function EditProposalPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [form, setForm] = useState({ clientName: '', proposalText: '', selectedWorks: [] as string[], status: 'active' as Proposal['status'], order: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [slug, setSlug] = useState('')

  useEffect(() => {
    fetch(`/api/admin/proposals/${id}`)
      .then(r => r.json())
      .then(data => {
        setSlug(data.slug ?? '')
        setForm({
          clientName: data.clientName ?? '',
          proposalText: data.proposalText ?? '',
          selectedWorks: data.selectedWorks ?? [],
          status: data.status ?? 'active',
          order: data.order !== 999 ? String(data.order) : '',
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const toggleWork = (wid: string) => {
    setForm(f => ({
      ...f,
      selectedWorks: f.selectedWorks.includes(wid)
        ? f.selectedWorks.filter(w => w !== wid)
        : [...f.selectedWorks, wid],
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    const res = await fetch(`/api/admin/proposals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: form.clientName,
        proposalText: form.proposalText,
        selectedWorks: form.selectedWorks,
        status: form.status,
        ...(form.order !== '' ? { order: Number(form.order) } : {}),
      }),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      const body = await res.json().catch(() => ({}))
      setError(body.error ?? '保存に失敗しました')
    }
    setSaving(false)
  }

  const saveBtn = (ok: boolean): React.CSSProperties => ({ padding: '10px 28px', background: ok ? '#166534' : '#111110', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' })

  const s: Record<string, React.CSSProperties> = {
    header: { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
    back: { fontSize: '13px', color: '#78716c', textDecoration: 'none' },
    title: { fontSize: '16px', fontWeight: 600, color: '#111110' },
    main: { maxWidth: '640px', margin: '0 auto', padding: '40px 24px' },
    label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#44403c', marginBottom: '8px', letterSpacing: '0.03em' },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
    textarea: { width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', outline: 'none', resize: 'vertical' as const, minHeight: '160px', boxSizing: 'border-box' as const, lineHeight: '1.7', fontFamily: 'inherit' },
    hint: { fontSize: '12px', color: '#a8a29e', marginTop: '6px' },
  }

  if (loading) return (
    <>
      <header style={s.header}><Link href="/admin" style={s.back}>← 一覧に戻る</Link></header>
      <main style={s.main}><p style={{ color: '#a8a29e' }}>読み込み中...</p></main>
    </>
  )

  return (
    <>
      <header style={s.header}>
        <div style={s.headerLeft}>
          <Link href="/admin" style={s.back}>← 一覧に戻る</Link>
          <span style={s.title}>提案ページを編集</span>
        </div>
        <button onClick={handleSave} disabled={saving} style={saveBtn(saved)}>
          {saving ? '保存中...' : saved ? '✓ 保存しました' : '保存する'}
        </button>
      </header>

      <main style={s.main}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div>
            <label style={s.label}>クライアント名</label>
            <input type="text" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} style={s.input} />
          </div>

          <div>
            <label style={s.label}>提案文</label>
            <textarea value={form.proposalText} onChange={e => setForm({ ...form, proposalText: e.target.value })} style={s.textarea} />
          </div>

          <div>
            <label style={s.label}>表示する実績（上から順に表示）</label>

            {/* 選択済み：並び替え可能 */}
            {form.selectedWorks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                {form.selectedWorks.map((wid, idx) => {
                  const work = WORKS.find(w => w.id === wid)
                  if (!work) return null
                  return (
                    <div key={wid} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: '1px solid #86efac', borderRadius: '6px', background: '#f0fdf4', fontSize: '14px', color: '#44403c' }}>
                      {/* 並び替えボタン */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const arr = [...form.selectedWorks]
                            ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
                            setForm(f => ({ ...f, selectedWorks: arr }))
                          }}
                          style={{ padding: '1px 6px', fontSize: '11px', border: '1px solid #d1d5db', borderRadius: '3px', background: '#fff', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.3 : 1 }}
                        >↑</button>
                        <button
                          type="button"
                          disabled={idx === form.selectedWorks.length - 1}
                          onClick={() => {
                            const arr = [...form.selectedWorks]
                            ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
                            setForm(f => ({ ...f, selectedWorks: arr }))
                          }}
                          style={{ padding: '1px 6px', fontSize: '11px', border: '1px solid #d1d5db', borderRadius: '3px', background: '#fff', cursor: idx === form.selectedWorks.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === form.selectedWorks.length - 1 ? 0.3 : 1 }}
                        >↓</button>
                      </div>
                      <span style={{ flex: 1 }}>{work.label}</span>
                      {/* 削除ボタン */}
                      <button
                        type="button"
                        onClick={() => setForm(f => ({ ...f, selectedWorks: f.selectedWorks.filter(w => w !== wid) }))}
                        style={{ padding: '2px 8px', fontSize: '12px', border: '1px solid #fca5a5', borderRadius: '4px', background: '#fff', color: '#dc2626', cursor: 'pointer' }}
                      >✕</button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 未選択：追加ボタン */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {WORKS.filter(w => !form.selectedWorks.includes(w.id)).map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, selectedWorks: [...f.selectedWorks, w.id] }))}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: '1px dashed #e7e5e4', borderRadius: '6px', background: '#fff', fontSize: '14px', color: '#a8a29e', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '16px', color: '#d1d5db' }}>+</span> {w.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={s.label}>公開ステータス</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Proposal['status'] })}
                style={{ ...s.input, cursor: 'pointer' }}>
                <option value="active">公開中</option>
                <option value="draft">ドラフト</option>
                <option value="archived">アーカイブ</option>
              </select>
            </div>
            <div>
              <label style={s.label}>表示順</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })}
                style={s.input} placeholder="例: 1" min={1} />
              <div style={s.hint}>数字が小さいほど上に表示</div>
            </div>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '6px', fontSize: '13px', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <div style={{ paddingTop: '8px', borderTop: '1px solid #f5f5f4' }}>
            <label style={s.label}>共有URL</label>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', background: '#f5f5f4', padding: '10px 14px', borderRadius: '6px', color: '#44403c' }}>
              {typeof window !== 'undefined' ? window.location.origin : ''}/proposal/{slug}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
