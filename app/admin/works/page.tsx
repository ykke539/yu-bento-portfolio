'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: '公開中',     color: '#166534', bg: '#dcfce7' },
  draft:    { label: 'ドラフト',   color: '#92400e', bg: '#fef3c7' },
  archived: { label: 'アーカイブ', color: '#6b7280', bg: '#f3f4f6' },
}

export default function AdminWorksPage() {
  const [works, setWorks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchWorks = useCallback(async () => {
    const res = await fetch('/api/admin/works')
    if (res.status === 401) { router.push('/admin/login'); return }
    setWorks(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { fetchWorks() }, [fetchWorks])

  const badge = (status: string): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
    borderRadius: '999px', fontSize: '11px', fontWeight: 500,
    color: STATUS_LABEL[status]?.color ?? '#6b7280',
    background: STATUS_LABEL[status]?.bg ?? '#f3f4f6',
  })

  const s: Record<string, React.CSSProperties> = {
    header: { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
    back: { fontSize: '13px', color: '#78716c', textDecoration: 'none' },
    title: { fontSize: '16px', fontWeight: 600, color: '#111110' },
    newBtn: { padding: '8px 16px', background: '#111110', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 500 },
    main: { maxWidth: '960px', margin: '0 auto', padding: '32px 24px' },
    card: { background: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', overflow: 'hidden' },
    row: { padding: '16px 20px', borderBottom: '1px solid #f5f5f4', display: 'flex', alignItems: 'center', gap: '12px' },
    num: { fontSize: '11px', fontFamily: 'monospace', color: '#a8a29e', minWidth: '28px' },
    name: { flex: 1, fontSize: '15px', fontWeight: 500, color: '#111110' },
    cat: { fontSize: '12px', color: '#78716c' },
    editBtn: { padding: '6px 14px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '12px', textDecoration: 'none', color: '#44403c', background: '#fff' },
    empty: { padding: '60px 24px', textAlign: 'center' as const, color: '#a8a29e', fontSize: '14px' },
  }

  return (
    <>
      <header style={s.header}>
        <div style={s.headerLeft}>
          <Link href="/admin" style={s.back}>← 管理トップ</Link>
          <span style={s.title}>実績管理</span>
        </div>
        <Link href="/admin/works/new" style={s.newBtn}>+ 新規作成</Link>
      </header>

      <main style={s.main}>
        <div style={s.card}>
          {loading ? (
            <div style={s.empty}>読み込み中...</div>
          ) : works.length === 0 ? (
            <div style={s.empty}>
              実績がありません。<br />
              <Link href="/admin/works/new" style={{ color: '#111110', marginTop: '8px', display: 'inline-block' }}>最初の実績を作成する →</Link>
            </div>
          ) : works.map(w => (
            <div key={w.id} style={s.row}>
              <span style={s.num}>{w.num || '—'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.name}>{w.title || '(タイトルなし)'}</div>
                <div style={s.cat}>{w.cat}</div>
              </div>
              <span style={badge(w.status)}>{STATUS_LABEL[w.status]?.label ?? w.status}</span>
              <Link href={`/admin/works/${w.id}`} style={s.editBtn}>編集</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
