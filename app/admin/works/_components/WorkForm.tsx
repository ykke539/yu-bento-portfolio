'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface ScopeRowForm { key: string; val: string }
export interface ThinkingForm { q: string; a: string; body: string }
export interface WorkFormData {
  title: string
  slug: string
  num: string
  cat: string
  url: string
  subtitle: string
  scope: ScopeRowForm[]
  thinking: ThinkingForm[]
  order: string
  status: string
}

interface Props {
  title: string
  backHref: string
  initialData: WorkFormData
  onSave: (data: WorkFormData) => void
  saving: boolean
  error: string
}

export default function WorkForm({ title, backHref, initialData, onSave, saving, error }: Props) {
  const [f, setF] = useState<WorkFormData>(initialData)

  const s: Record<string, React.CSSProperties> = {
    header: { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
    back: { fontSize: '13px', color: '#78716c', textDecoration: 'none' },
    pageTitle: { fontSize: '16px', fontWeight: 600, color: '#111110' },
    saveBtn: { padding: '8px 20px', background: '#111110', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: saving ? 0.5 : 1 },
    main: { maxWidth: '760px', margin: '0 auto', padding: '40px 24px' },
    section: { marginBottom: '40px' },
    sectionTitle: { fontSize: '11px', fontWeight: 600, color: '#a8a29e', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #f5f5f4' },
    label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#44403c', marginBottom: '6px' },
    input: { width: '100%', padding: '9px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
    textarea: { width: '100%', padding: '9px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '14px', outline: 'none', resize: 'vertical' as const, minHeight: '80px', boxSizing: 'border-box' as const, lineHeight: '1.7', fontFamily: 'inherit' },
    hint: { fontSize: '11px', color: '#a8a29e', marginTop: '4px' },
    addBtn: { padding: '7px 14px', border: '1px dashed #d1d5db', borderRadius: '6px', fontSize: '12px', color: '#78716c', background: 'none', cursor: 'pointer', width: '100%', marginTop: '8px' },
    delBtn: { padding: '4px 8px', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '11px', color: '#dc2626', background: '#fff', cursor: 'pointer', flexShrink: 0 as const },
    rowBox: { display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '10px', border: '1px solid #f5f5f4', borderRadius: '6px', background: '#fafaf9', marginBottom: '8px' },
  }

  const updateScope = (idx: number, field: keyof ScopeRowForm, val: string) => {
    setF(prev => ({ ...prev, scope: prev.scope.map((r, i) => i === idx ? { ...r, [field]: val } : r) }))
  }

  const updateThinking = (idx: number, field: keyof ThinkingForm, val: string) => {
    setF(prev => ({ ...prev, thinking: prev.thinking.map((t, i) => i === idx ? { ...t, [field]: val } : t) }))
  }

  return (
    <>
      <header style={s.header}>
        <div style={s.headerLeft}>
          <Link href={backHref} style={s.back}>← 実績一覧</Link>
          <span style={s.pageTitle}>{title}</span>
        </div>
        <button onClick={() => onSave(f)} disabled={saving} style={s.saveBtn}>
          {saving ? '保存中...' : '保存する'}
        </button>
      </header>

      <main style={s.main}>
        {error && (
          <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '6px', fontSize: '13px', color: '#dc2626', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {/* 基本情報 */}
        <div style={s.section}>
          <div style={s.sectionTitle}>基本情報</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={s.label}>タイトル <span style={{ color: '#dc2626' }}>*</span></label>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="Perzona" />
            </div>
            <div>
              <label style={s.label}>Slug <span style={{ color: '#dc2626' }}>*</span></label>
              <input style={s.input} value={f.slug} onChange={e => setF(p => ({ ...p, slug: e.target.value }))} placeholder="perzona" />
              <div style={s.hint}>URLに使用。英数字・ハイフンのみ</div>
            </div>
            <div>
              <label style={s.label}>番号</label>
              <input style={s.input} value={f.num} onChange={e => setF(p => ({ ...p, num: e.target.value }))} placeholder="01" />
            </div>
            <div>
              <label style={s.label}>カテゴリ</label>
              <input style={s.input} value={f.cat} onChange={e => setF(p => ({ ...p, cat: e.target.value }))} placeholder="Web App / Full Stack" />
            </div>
            <div>
              <label style={s.label}>公開URL</label>
              <input style={s.input} value={f.url} onChange={e => setF(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <label style={s.label}>表示順</label>
              <input style={s.input} type="number" value={f.order} onChange={e => setF(p => ({ ...p, order: e.target.value }))} placeholder="1" min={1} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={s.label}>概要文</label>
            <textarea style={s.textarea} value={f.subtitle} onChange={e => setF(p => ({ ...p, subtitle: e.target.value }))} placeholder="このプロジェクトについて..." />
          </div>
          <div>
            <label style={s.label}>ステータス</label>
            <select value={f.status} onChange={e => setF(p => ({ ...p, status: e.target.value }))} style={{ ...s.input, width: '160px', cursor: 'pointer' }}>
              <option value="active">公開中</option>
              <option value="draft">ドラフト</option>
              <option value="archived">アーカイブ</option>
            </select>
          </div>
        </div>

        {/* Scope */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Scope</div>
          {f.scope.map((row, i) => (
            <div key={i} style={s.rowBox}>
              <input
                style={{ ...s.input, width: '140px', flexShrink: 0 }}
                value={row.key}
                onChange={e => updateScope(i, 'key', e.target.value)}
                placeholder="Scope / Stack..."
              />
              <input
                style={{ ...s.input, flex: 1 }}
                value={row.val}
                onChange={e => updateScope(i, 'val', e.target.value)}
                placeholder={row.key.toLowerCase() === 'stack' ? 'Next.js, TypeScript, Vercel' : '値'}
              />
              <button style={s.delBtn} onClick={() => setF(p => ({ ...p, scope: p.scope.filter((_, j) => j !== i) }))}>✕</button>
            </div>
          ))}
          <button style={s.addBtn} onClick={() => setF(p => ({ ...p, scope: [...p.scope, { key: '', val: '' }] }))}>
            + 行を追加
          </button>
          <div style={s.hint}>キーが「Stack」の行はタグ表示されます（カンマ区切り）</div>
        </div>

        {/* Thinking */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Thinking</div>
          {f.thinking.map((t, i) => (
            <div key={i} style={{ ...s.rowBox, flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#a8a29e', fontWeight: 500 }}>#{i + 1}</span>
                <button style={s.delBtn} onClick={() => setF(p => ({ ...p, thinking: p.thinking.filter((_, j) => j !== i) }))}>✕</button>
              </div>
              <div>
                <label style={{ ...s.label, fontSize: '11px' }}>Q（問い）</label>
                <input style={s.input} value={t.q} onChange={e => updateThinking(i, 'q', e.target.value)} placeholder="なぜ作ったか" />
              </div>
              <div>
                <label style={{ ...s.label, fontSize: '11px' }}>A（見出し）</label>
                <input style={s.input} value={t.a} onChange={e => updateThinking(i, 'a', e.target.value)} placeholder="一言で答える" />
              </div>
              <div>
                <label style={{ ...s.label, fontSize: '11px' }}>Body（本文）</label>
                <textarea style={s.textarea} value={t.body} onChange={e => updateThinking(i, 'body', e.target.value)} placeholder="詳細な説明..." />
              </div>
            </div>
          ))}
          <button style={s.addBtn} onClick={() => setF(p => ({ ...p, thinking: [...p.thinking, { q: '', a: '', body: '' }] }))}>
            + Thinking を追加
          </button>
        </div>
      </main>
    </>
  )
}
