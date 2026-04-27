'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface ScopeRow { uid: string; key: string; val: string }
interface ThinkingItem { uid: string; q: string; a: string; body: string }

let _uid = 0
const nextUid = () => String(++_uid)

const mono = { fontFamily: 'var(--font-dm-mono)' }
const serif = { fontFamily: 'var(--font-shippori)' }

/**
 * contenteditable な要素。
 * - initial を mount 時に一度だけ DOM にセット
 * - onBlur で onCommit を呼ぶ（入力中は state を更新しないので cursor がジャンプしない）
 * - 親の re-render では内部の useEffect が再実行されないため DOM の内容が保持される
 */
function CE({
  as = 'div',
  initial,
  onCommit,
  className,
  style,
}: {
  as?: string
  initial: string
  onCommit: (v: string) => void
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.innerText = initial
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // mount 時のみ — 意図的に initial を deps から外している

  return React.createElement(as, {
    ref,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e: React.FocusEvent<HTMLElement>) => onCommit(e.currentTarget.innerText.trim()),
    className: `focus:outline-none focus:ring-1 focus:ring-[#8B2E2E]/40 rounded-sm ${className ?? ''}`,
    style: { cursor: 'text', minWidth: '4px', ...style },
  })
}

export default function WysiwygWorkEdit() {
  const { id } = useParams() as { id: string }
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // ツールバー用（非ビジュアルフィールド）
  const [slug, setSlug]     = useState('')
  const [status, setStatus] = useState('active')
  const [order, setOrder]   = useState('')

  // ビジュアルフィールド（CE の onCommit で更新）
  const [title, setTitle]       = useState('')
  const [cat, setCat]           = useState('')
  const [url, setUrl]           = useState('')
  const [num, setNum]           = useState('')
  const [subtitle, setSubtitle] = useState('')

  // 配列（追加・削除があるので state）
  const [scope, setScope]       = useState<ScopeRow[]>([])
  const [thinking, setThinking] = useState<ThinkingItem[]>([])

  useEffect(() => {
    fetch(`/api/admin/works/${id}`)
      .then(r => r.json())
      .then(data => {
        setTitle(data.title ?? '')
        setCat(data.cat ?? '')
        setUrl(data.url ?? '')
        setNum(data.num ?? '')
        setSubtitle(data.subtitle ?? '')
        setSlug(data.slug ?? '')
        setStatus(data.status ?? 'active')
        setOrder(data.order !== 999 ? String(data.order) : '')
        setScope(
          (data.scope ?? []).map((r: any) => ({
            uid: nextUid(),
            key: r.key ?? '',
            val: r.tags ? r.tags.join(', ') : (r.val ?? ''),
          }))
        )
        setThinking(
          (data.thinking ?? []).map((t: any) => ({
            uid: nextUid(),
            q: t.q ?? '',
            a: t.a ?? '',
            body: t.body ?? '',
          }))
        )
        setLoading(false)
      })
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    setError('')

    const scopeData = scope.filter(r => r.key).map(r =>
      r.key.toLowerCase() === 'stack'
        ? { key: r.key, tags: r.val.split(',').map(t => t.trim()).filter(Boolean) }
        : { key: r.key, val: r.val }
    )

    const res = await fetch(`/api/admin/works/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, cat, url, num, subtitle,
        scope: scopeData,
        thinking: thinking.filter(t => t.q && t.a && t.body),
        slug, status,
        order: order ? Number(order) : undefined,
      }),
    })

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } else {
      const body = await res.json().catch(() => ({}))
      setError(body.error ?? '保存に失敗しました')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span style={{ ...mono, color: 'var(--color-muted)', fontSize: '13px' }}>Loading...</span>
      </div>
    )
  }

  return (
    <>
      {/* ━━ ツールバー ━━ */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-5 h-12 text-[12px]"
        style={{ background: '#111110', color: '#fff', fontFamily: 'var(--font-dm-mono)' }}>
        <Link href="/admin/works" style={{ color: '#a8a29e', textDecoration: 'none', letterSpacing: '0.05em' }}>
          ← 実績一覧
        </Link>
        <span style={{ color: '#444' }}>|</span>

        <label style={{ color: '#a8a29e' }}>slug</label>
        <input value={slug} onChange={e => setSlug(e.target.value)}
          style={{ background: '#222', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontFamily: 'var(--font-dm-mono)', width: '140px', outline: 'none' }} />

        <select value={status} onChange={e => setStatus(e.target.value)}
          style={{ background: '#222', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontFamily: 'var(--font-dm-mono)', cursor: 'pointer', outline: 'none' }}>
          <option value="active">公開中</option>
          <option value="draft">ドラフト</option>
          <option value="archived">アーカイブ</option>
        </select>

        <label style={{ color: '#a8a29e' }}>順</label>
        <input type="number" value={order} onChange={e => setOrder(e.target.value)} placeholder="1"
          style={{ background: '#222', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontFamily: 'var(--font-dm-mono)', width: '56px', outline: 'none' }} />

        <div style={{ flex: 1 }} />
        {error && <span style={{ color: '#f87171', fontSize: '11px' }}>{error}</span>}

        <button onClick={handleSave} disabled={saving}
          style={{ padding: '5px 18px', background: saved ? '#166534' : '#8B2E2E', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.05em', transition: 'background 0.3s' }}>
          {saving ? '保存中...' : saved ? '✓ 保存しました' : '保存する'}
        </button>
      </div>

      {/* ━━ Works ページのビジュアルそのまま（編集モード） ━━ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-14 py-14 md:py-24"
        style={{ borderBottom: '1px solid var(--color-border)' }}>

        {/* meta 行 */}
        <div className="flex items-baseline gap-6 mb-16">
          <CE as="span" initial={num} onCommit={setNum}
            style={{ ...mono, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.1em' }} />
          <CE as="span" initial={cat} onCommit={setCat}
            className="text-[10px] px-3 py-1 tracking-[0.1em] uppercase"
            style={{ ...mono, color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }} />
          <CE as="span" initial={url} onCommit={setUrl}
            className="text-[11px] tracking-[0.08em]"
            style={{ ...mono, color: 'var(--color-muted)' }} />
        </div>

        {/* タイトル */}
        <CE as="h2" initial={title} onCommit={setTitle}
          className="mb-6"
          style={{ ...serif, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--color-ink)' }} />

        {/* 概要 */}
        <CE as="p" initial={subtitle} onCommit={setSubtitle}
          className="mb-16 leading-[1.9]"
          style={{ fontSize: '14px', color: 'var(--color-muted)', maxWidth: '560px' }} />

        {/* ━━ Scope ━━ */}
        <div className="mb-20" style={{ borderTop: '1px solid var(--color-border)' }}>
          {scope.map(row => (
            <div key={row.uid}
              className="group grid gap-6 py-4 text-[13px]"
              style={{ gridTemplateColumns: '140px 1fr 28px', borderBottom: '1px solid var(--color-border)' }}>
              {/* Key */}
              <CE as="span" initial={row.key}
                onCommit={v => setScope(s => s.map(r => r.uid === row.uid ? { ...r, key: v } : r))}
                className="text-[10px] tracking-[0.1em] uppercase pt-1"
                style={{ ...mono, color: 'var(--color-muted)' }} />
              {/* Value */}
              {row.key.toLowerCase() === 'stack' ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-2 pointer-events-none">
                    {row.val.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 tracking-[0.05em]"
                        style={{ ...mono, color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CE as="span" initial={row.val}
                    onCommit={v => setScope(s => s.map(r => r.uid === row.uid ? { ...r, val: v } : r))}
                    style={{ fontSize: '11px', color: 'var(--color-muted)', ...mono }} />
                </div>
              ) : (
                <CE as="span" initial={row.val}
                  onCommit={v => setScope(s => s.map(r => r.uid === row.uid ? { ...r, val: v } : r))}
                  style={{ color: 'var(--color-ink)' }} />
              )}
              {/* 削除 */}
              <button onClick={() => setScope(s => s.filter(r => r.uid !== row.uid))}
                className="opacity-0 group-hover:opacity-100 transition-opacity self-center"
                style={{ color: '#dc2626', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                ✕
              </button>
            </div>
          ))}
          <button onClick={() => setScope(s => [...s, { uid: nextUid(), key: '', val: '' }])}
            className="mt-3 text-[11px] tracking-[0.08em] uppercase"
            style={{ ...mono, color: 'var(--color-taupe)', background: 'none', border: '1px dashed var(--color-border)', padding: '6px 14px', cursor: 'pointer' }}>
            + 行を追加
          </button>
        </div>

        {/* ━━ Thinking ━━ */}
        <div>
          <div className="flex items-center gap-5 mb-12 text-[10px] tracking-[0.2em] uppercase"
            style={{ ...mono, color: 'var(--color-taupe)' }}>
            Thinking
            <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {thinking.map((t, i) => (
              <div key={t.uid}
                className={`group relative py-10 border-t ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:border-l'}`}
                style={{ borderColor: 'var(--color-border)' }}>
                {/* 削除 */}
                <button onClick={() => setThinking(s => s.filter(x => x.uid !== t.uid))}
                  className="absolute top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-[11px]"
                  style={{ ...mono, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', letterSpacing: '0.05em' }}>
                  ✕ 削除
                </button>
                {/* Q */}
                <CE as="div" initial={t.q}
                  onCommit={v => setThinking(s => s.map(x => x.uid === t.uid ? { ...x, q: v } : x))}
                  className="mb-4 text-[10px] tracking-[0.12em] uppercase"
                  style={{ ...mono, color: 'var(--color-muted)' }} />
                {/* A */}
                <CE as="div" initial={t.a}
                  onCommit={v => setThinking(s => s.map(x => x.uid === t.uid ? { ...x, a: v } : x))}
                  className="mb-4 text-[18px] font-medium leading-[1.7]"
                  style={{ ...serif, color: 'var(--color-ink)' }} />
                {/* Body */}
                <CE as="div" initial={t.body}
                  onCommit={v => setThinking(s => s.map(x => x.uid === t.uid ? { ...x, body: v } : x))}
                  className="text-[13px] leading-[1.9]"
                  style={{ color: 'var(--color-muted)' }} />
              </div>
            ))}
          </div>

          <button onClick={() => setThinking(s => [...s, { uid: nextUid(), q: '', a: '', body: '' }])}
            className="mt-8 text-[11px] tracking-[0.08em] uppercase"
            style={{ ...mono, color: 'var(--color-taupe)', background: 'none', border: '1px dashed var(--color-border)', padding: '6px 14px', cursor: 'pointer' }}>
            + Thinking を追加
          </button>
        </div>
      </div>
    </>
  )
}
