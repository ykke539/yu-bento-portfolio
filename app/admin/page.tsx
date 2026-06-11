'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Proposal } from '@/lib/notion'

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: '公開中',     color: '#166534', bg: '#dcfce7' },
  draft:    { label: 'ドラフト',   color: '#92400e', bg: '#fef3c7' },
  archived: { label: 'アーカイブ', color: '#6b7280', bg: '#f3f4f6' },
}

const NAV_CARDS = [
  {
    href: '/admin/works',
    title: '実績管理',
    desc: 'Works ページの案件を追加・編集',
    note: '画像はNotion本文に追加',
    icon: '📁',
  },
  {
    href: '/admin/top',
    title: 'TOPページ管理',
    desc: 'Philosophy・Process・Aboutセクション',
    note: '強調テキストはNotionで色付けが必要',
    icon: '🏠',
  },
  {
    href: '/admin/about',
    title: 'Aboutページ管理',
    desc: 'Journey・スキル・プロフィール・リンク',
    note: '内容はすべてこの画面から編集可能',
    icon: '👤',
  },
]

export default function AdminPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()

  const fetchProposals = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/proposals')
      if (res.status === 401) { router.push('/admin/login'); return }
      if (!res.ok) {
        const body = await res.text()
        setError(`APIエラー (${res.status}): ${body}`)
        setLoading(false)
        return
      }
      setProposals(await res.json())
    } catch (e: any) {
      setError(`通信エラー: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchProposals() }, [fetchProposals])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/proposals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchProposals()
  }

  const copyUrl = (slug: string) => {
    const url = `${window.location.origin}/proposal/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const badge = (status: string): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
    borderRadius: '999px', fontSize: '11px', fontWeight: 500,
    color: STATUS_LABEL[status]?.color ?? '#6b7280',
    background: STATUS_LABEL[status]?.bg ?? '#f3f4f6',
  })

  const s: Record<string, React.CSSProperties> = {
    header:     { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
    logo:       { fontSize: '16px', fontWeight: 600, color: '#111110' },
    logoutBtn:  { padding: '8px 12px', background: 'none', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: '#78716c' },
    main:       { maxWidth: '960px', margin: '0 auto', padding: '32px 24px' },
    sectionTitle: { fontSize: '11px', fontWeight: 600, color: '#a8a29e', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '12px' },
    card:       { background: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', overflow: 'hidden' },
    row:        { padding: '16px 20px', borderBottom: '1px solid #f5f5f4' },
    clientName: { fontSize: '15px', fontWeight: 500, color: '#111110', marginBottom: '4px' },
    slug:       { fontSize: '12px', color: '#a8a29e', fontFamily: 'monospace' },
    copyBtn:    { padding: '7px 14px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', background: '#fff', whiteSpace: 'nowrap' as const },
    empty:      { padding: '60px 24px', textAlign: 'center' as const, color: '#a8a29e', fontSize: '14px' },
  }

  return (
    <>
      <header style={s.header}>
        <div style={s.logo}>優.bento Admin</div>
        <button onClick={logout} style={s.logoutBtn}>ログアウト</button>
      </header>

      <main style={s.main}>

        {/* ナビカード */}
        <div style={{ marginBottom: '40px' }}>
          <div style={s.sectionTitle}>ページ管理</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {NAV_CARDS.map(card => (
              <Link
                key={card.href}
                href={card.href}
                style={{ textDecoration: 'none', display: 'block', background: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', padding: '20px', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#111110')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e7e5e4')}
              >
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>{card.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#111110', marginBottom: '4px' }}>{card.title}</div>
                <div style={{ fontSize: '12px', color: '#78716c', marginBottom: '8px' }}>{card.desc}</div>
                <div style={{ fontSize: '11px', color: '#a8a29e', background: '#f5f5f4', borderRadius: '4px', padding: '4px 8px', display: 'inline-block' }}>
                  {card.note}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 提案ページ */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={s.sectionTitle}>提案ページ</div>
          <Link href="/admin/proposals/new" style={{ padding: '7px 14px', background: '#111110', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
            + 新規作成
          </Link>
        </div>

        <div style={s.card}>
          {loading ? (
            <div style={s.empty}>読み込み中...</div>
          ) : error ? (
            <div style={{ padding: '32px 24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#dc2626', marginBottom: '8px' }}>エラーが発生しました</div>
              <pre style={{ fontSize: '12px', color: '#78716c', whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#fef2f2', padding: '12px', borderRadius: '6px' }}>{error}</pre>
              <button onClick={fetchProposals} style={{ marginTop: '16px', padding: '8px 16px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#fff' }}>再試行</button>
            </div>
          ) : proposals.length === 0 ? (
            <div style={s.empty}>
              提案ページがまだありません。<br />
              <Link href="/admin/proposals/new" style={{ color: '#111110', marginTop: '8px', display: 'inline-block' }}>最初の提案を作成する →</Link>
            </div>
          ) : (
            proposals.map(p => (
              <div key={p.id} style={s.row}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={s.clientName}>{p.clientName || '（名前なし）'}{p.memo ? <span style={{ marginLeft: '8px', fontSize: '11px', color: '#a8a29e', fontWeight: 400 }}>{p.memo}</span> : null}</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {p.htmlUrl && <span style={badge('html')}>静的HTML</span>}
                    <span style={badge(p.status)}>{STATUS_LABEL[p.status]?.label ?? p.status}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ ...s.slug, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.order !== 999 && <span style={{ marginRight: '8px', color: '#d6d3d1' }}>#{p.order}</span>}
                    /proposal/{p.slug}{p.htmlUrl && <span style={{ color: '#a8a29e' }}> → {p.htmlUrl}</span>}
                  </span>
                  <button onClick={() => copyUrl(p.slug)} style={{ ...s.copyBtn, background: copied === p.slug ? '#f0fdf4' : '#fff', color: copied === p.slug ? '#166534' : '#44403c', flexShrink: 0 }}>
                    {copied === p.slug ? '✓ コピー' : 'URLコピー'}
                  </button>
                  <Link href={`/admin/proposals/${p.id}`} style={{ ...s.copyBtn, textDecoration: 'none', color: '#fff', background: '#111110', border: '1px solid #111110', flexShrink: 0 } as React.CSSProperties}>
                    編集
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}
