'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Tab = 'journey' | 'misc' | 'skills' | 'profile' | 'philosophy' | 'process' | 'about_stats'

interface Item {
  id: string
  section: string
  title: string
  sub_label: string
  body: string
  url: string
  order: number
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'journey',    label: 'Journey（経歴）' },
  { id: 'misc',       label: 'Misc（リンク）' },
  { id: 'skills',     label: 'Skills（スキル）' },
  { id: 'profile',    label: 'Profile（プロフィール）' },
  { id: 'philosophy',  label: 'Philosophy（哲学）' },
  { id: 'process',     label: 'Process（プロセス）' },
  { id: 'about_stats', label: 'TOP About（スタッツ）' },
]

const PROFILE_KEYS = [
  { key: 'catch_copy', label: 'キャッチコピー' },
  { key: 'intro', label: '自己紹介文' },
  { key: 'Base', label: 'Base（場所）' },
  { key: 'Available', label: 'Available（状況）' },
  { key: 'Type', label: 'Type（属性）' },
]

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: '10px 20px', fontSize: '13px', fontWeight: active ? 600 : 400,
    color: active ? '#111110' : '#78716c', background: 'none', border: 'none',
    borderBottom: active ? '2px solid #111110' : '2px solid transparent',
    cursor: 'pointer', whiteSpace: 'nowrap',
  }
}

const s: Record<string, React.CSSProperties> = {
  header: { background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  back: { fontSize: '13px', color: '#78716c', textDecoration: 'none' },
  title: { fontSize: '16px', fontWeight: 600, color: '#111110' },
  main: { maxWidth: '960px', margin: '0 auto', padding: '32px 24px' },
  tabs: { display: 'flex', gap: '0', borderBottom: '1px solid #e7e5e4', marginBottom: '28px' },
  card: { background: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4', overflow: 'hidden' },
  row: { padding: '14px 20px', borderBottom: '1px solid #f5f5f4', display: 'grid', gap: '8px' },
  label: { fontSize: '11px', fontWeight: 600, color: '#a8a29e', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '4px' },
  input: { width: '100%', padding: '7px 10px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
  textarea: { width: '100%', padding: '7px 10px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '13px', outline: 'none', resize: 'vertical' as const, minHeight: '70px', boxSizing: 'border-box' as const, lineHeight: '1.7', fontFamily: 'inherit' },
  saveBtn: { padding: '6px 14px', background: '#111110', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
  editBtn: { padding: '5px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '12px', color: '#44403c', background: '#fff', cursor: 'pointer' },
  delBtn: { padding: '5px 12px', border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '12px', color: '#dc2626', background: '#fff', cursor: 'pointer' },
  addBtn: { padding: '8px 16px', border: '1px dashed #d1d5db', borderRadius: '6px', fontSize: '12px', color: '#78716c', background: 'none', cursor: 'pointer', margin: '12px 20px' },
  empty: { padding: '40px 24px', textAlign: 'center' as const, color: '#a8a29e', fontSize: '14px' },
  hint: { fontSize: '11px', color: '#a8a29e', marginTop: '3px' },
}

function ItemRow({ item, tab, onUpdated, onDeleted }: { item: Item; tab: Tab; onUpdated: () => void; onDeleted: () => void }) {
  const [editing, setEditing] = useState(false)
  const [f, setF] = useState({ title: item.title, sub_label: item.sub_label, body: item.body, url: item.url, order: String(item.order) })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await fetch(`/api/admin/about/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, order: Number(f.order) || 99 }),
    })
    setSaving(false)
    setEditing(false)
    onUpdated()
  }

  const del = async () => {
    if (!confirm('削除しますか？')) return
    await fetch(`/api/admin/about/${item.id}`, { method: 'DELETE' })
    onDeleted()
  }

  if (!editing) {
    return (
      <div style={{ ...s.row, gridTemplateColumns: '1fr auto' }}>
        <div>
          {tab === 'journey' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>{item.sub_label}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111110' }}>{item.title}</div>
              {item.body && <div style={{ fontSize: '12px', color: '#78716c', marginTop: '3px', whiteSpace: 'pre-line' }}>{item.body.slice(0, 80)}{item.body.length > 80 ? '...' : ''}</div>}
            </>
          )}
          {tab === 'misc' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>{item.sub_label}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111110' }}>{item.title}</div>
              {item.url && <div style={{ fontSize: '11px', color: '#a8a29e', fontFamily: 'monospace', marginTop: '2px' }}>{item.url}</div>}
            </>
          )}
          {tab === 'skills' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>{item.body} — {item.sub_label}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111110' }}>{item.title}</div>
            </>
          )}
          {tab === 'profile' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#111110', whiteSpace: 'pre-line' }}>{item.body.slice(0, 100)}{item.body.length > 100 ? '...' : ''}</div>
            </>
          )}
          {tab === 'philosophy' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>{item.title}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111110' }}>{item.body}</div>
              {item.sub_label && <div style={{ fontSize: '12px', color: '#78716c', marginTop: '3px' }}>{item.sub_label.slice(0, 60)}{item.sub_label.length > 60 ? '...' : ''}</div>}
            </>
          )}
          {tab === 'process' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>— {String(item.order).padStart(2, '0')} {item.sub_label}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111110' }}>{item.title}</div>
              {item.body && <div style={{ fontSize: '12px', color: '#78716c', marginTop: '3px' }}>{item.body.slice(0, 60)}{item.body.length > 60 ? '...' : ''}</div>}
            </>
          )}
          {tab === 'about_stats' && (
            <>
              <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '2px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#111110', whiteSpace: 'pre-line' }}>{item.body.slice(0, 80)}{item.body.length > 80 ? '...' : ''}</div>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', paddingTop: '2px' }}>
          <button style={s.editBtn} onClick={() => setEditing(true)}>編集</button>
          <button style={s.delBtn} onClick={del}>削除</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ ...s.row, background: '#fafaf9' }}>
      <div style={{ display: 'grid', gap: '10px' }}>
        {/* Journey */}
        {tab === 'journey' && (
          <>
            <div>
              <div style={s.label}>年代ラベル（sub_label）</div>
              <input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="2020 / 2020–2022" />
            </div>
            <div>
              <div style={s.label}>タイトル</div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="〇〇として独立" />
            </div>
            <div>
              <div style={s.label}>本文</div>
              <textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} />
            </div>
          </>
        )}
        {/* Misc */}
        {tab === 'misc' && (
          <>
            <div>
              <div style={s.label}>カテゴリ（sub_label）</div>
              <input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="X / Note / GitHub" />
            </div>
            <div>
              <div style={s.label}>表示名</div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="@yubento" />
            </div>
            <div>
              <div style={s.label}>URL</div>
              <input style={s.input} value={f.url} onChange={e => setF(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
            </div>
          </>
        )}
        {/* Skills */}
        {tab === 'skills' && (
          <>
            <div>
              <div style={s.label}>グループ（body）</div>
              <input style={s.input} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder="Design / Engineering / Product" />
            </div>
            <div>
              <div style={s.label}>スキル名</div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="Next.js / React" />
            </div>
            <div>
              <div style={s.label}>レベル（sub_label）</div>
              <input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="Core / Main / Main tool" />
            </div>
          </>
        )}
        {/* Profile */}
        {tab === 'profile' && (
          <>
            <div>
              <div style={s.label}>キー名（title）</div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="catch_copy / intro / Base / Available / Type" />
              <div style={s.hint}>catch_copy=キャッチコピー, intro=自己紹介文, Base/Available/Type=ステータス欄</div>
            </div>
            <div>
              <div style={s.label}>値（body）</div>
              <textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} />
            </div>
          </>
        )}
        {/* Philosophy */}
        {tab === 'philosophy' && (
          <>
            <div>
              <div style={s.label}>問い（title）</div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="なぜAIを使うのか" />
            </div>
            <div>
              <div style={s.label}>答え（body）</div>
              <textarea style={{ ...s.textarea, minHeight: '60px' }} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder="速さのためではない。&#10;本質に集中するため。" />
              <div style={s.hint}>Notionで文字を灰色などに色付けすると、表示時に強調色になります</div>
            </div>
            <div>
              <div style={s.label}>説明文（sub_label）</div>
              <textarea style={s.textarea} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="AIは実装の道具ではなく..." />
            </div>
          </>
        )}
        {/* Process */}
        {tab === 'process' && (
          <>
            <div><div style={s.label}>英語名（title）</div><input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="Observe" /></div>
            <div><div style={s.label}>日本語名（sub_label）</div><input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="観察する" /></div>
            <div><div style={s.label}>説明文（body）</div><textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder="何を作るかより先に..." /></div>
          </>
        )}
        {/* TOP About スタッツ */}
        {tab === 'about_stats' && (
          <>
            <div>
              <div style={s.label}>キー（title）</div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="Role / Focus / Stack / Belief" />
              <div style={s.hint}>TOPページのAboutセクション右カラムに表示されます</div>
            </div>
            <div><div style={s.label}>値（body）</div><textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder={'AI Native Product Designer\nDesign Engineer'} /></div>
          </>
        )}
        <div>
          <div style={s.label}>表示順（order）</div>
          <input style={{ ...s.input, width: '80px' }} type="number" value={f.order} onChange={e => setF(p => ({ ...p, order: e.target.value }))} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button style={{ ...s.editBtn }} onClick={() => setEditing(false)}>キャンセル</button>
        <button style={s.saveBtn} onClick={save} disabled={saving}>{saving ? '保存中...' : '保存'}</button>
      </div>
    </div>
  )
}

function NewItemRow({ tab, onCreated, onCancel }: { tab: Tab; onCreated: () => void; onCancel: () => void }) {
  const [f, setF] = useState({ title: '', sub_label: '', body: '', url: '', order: '' })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (!f.title.trim()) return alert('タイトルは必須です')
    setSaving(true)
    await fetch('/api/admin/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, section: tab, order: Number(f.order) || 99 }),
    })
    setSaving(false)
    onCreated()
  }

  return (
    <div style={{ ...s.row, background: '#f0f9ff', borderLeft: '3px solid #3b82f6' }}>
      <div style={{ display: 'grid', gap: '10px' }}>
        {tab === 'journey' && (
          <>
            <div><div style={s.label}>年代ラベル（sub_label）</div><input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="2020" /></div>
            <div><div style={s.label}>タイトル <span style={{ color: '#dc2626' }}>*</span></div><input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="〇〇として独立" /></div>
            <div><div style={s.label}>本文</div><textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} /></div>
          </>
        )}
        {tab === 'misc' && (
          <>
            <div><div style={s.label}>カテゴリ（sub_label）</div><input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="X / Note" /></div>
            <div><div style={s.label}>表示名 <span style={{ color: '#dc2626' }}>*</span></div><input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} /></div>
            <div><div style={s.label}>URL</div><input style={s.input} value={f.url} onChange={e => setF(p => ({ ...p, url: e.target.value }))} placeholder="https://..." /></div>
          </>
        )}
        {tab === 'skills' && (
          <>
            <div><div style={s.label}>グループ（body）</div><input style={s.input} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder="Design / Engineering / Product" /></div>
            <div><div style={s.label}>スキル名 <span style={{ color: '#dc2626' }}>*</span></div><input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} /></div>
            <div><div style={s.label}>レベル（sub_label）</div><input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="Core / Main" /></div>
          </>
        )}
        {tab === 'profile' && (
          <>
            <div>
              <div style={s.label}>キー名（title）<span style={{ color: '#dc2626' }}> *</span></div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="catch_copy / intro / Base / Available / Type" />
              <div style={s.hint}>catch_copy=キャッチコピー, intro=自己紹介文, Base/Available/Type=ステータス欄</div>
            </div>
            <div><div style={s.label}>値（body）</div><textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} /></div>
          </>
        )}
        {tab === 'philosophy' && (
          <>
            <div><div style={s.label}>問い（title）<span style={{ color: '#dc2626' }}> *</span></div><input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="なぜAIを使うのか" /></div>
            <div>
              <div style={s.label}>答え（body）</div>
              <textarea style={{ ...s.textarea, minHeight: '60px' }} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder="速さのためではない。&#10;本質に集中するため。" />
              <div style={s.hint}>Notionで文字を灰色などに色付けすると、表示時に強調色になります</div>
            </div>
            <div><div style={s.label}>説明文（sub_label）</div><textarea style={s.textarea} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="AIは実装の道具ではなく..." /></div>
          </>
        )}
        {tab === 'process' && (
          <>
            <div><div style={s.label}>英語名（title）<span style={{ color: '#dc2626' }}> *</span></div><input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="Observe" /></div>
            <div><div style={s.label}>日本語名（sub_label）</div><input style={s.input} value={f.sub_label} onChange={e => setF(p => ({ ...p, sub_label: e.target.value }))} placeholder="観察する" /></div>
            <div><div style={s.label}>説明文（body）</div><textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder="何を作るかより先に..." /></div>
          </>
        )}
        {tab === 'about_stats' && (
          <>
            <div>
              <div style={s.label}>キー（title）<span style={{ color: '#dc2626' }}> *</span></div>
              <input style={s.input} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} placeholder="Role / Focus / Stack / Belief" />
              <div style={s.hint}>TOPページのAboutセクション右カラムに表示されます</div>
            </div>
            <div><div style={s.label}>値（body）</div><textarea style={s.textarea} value={f.body} onChange={e => setF(p => ({ ...p, body: e.target.value }))} placeholder={'AI Native Product Designer\nDesign Engineer'} /></div>
          </>
        )}
        <div><div style={s.label}>表示順</div><input style={{ ...s.input, width: '80px' }} type="number" value={f.order} onChange={e => setF(p => ({ ...p, order: e.target.value }))} placeholder="99" /></div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button style={s.editBtn} onClick={onCancel}>キャンセル</button>
        <button style={s.saveBtn} onClick={save} disabled={saving}>{saving ? '作成中...' : '追加する'}</button>
      </div>
    </div>
  )
}

export default function AdminAboutPage() {
  const [tab, setTab] = useState<Tab>('journey')
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const router = useRouter()

  const fetch_ = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/about')
    if (res.status === 401) { router.push('/admin/login'); return }
    setItems(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { fetch_() }, [fetch_])

  const tabItems = items.filter(i => i.section === tab)

  return (
    <>
      <header style={s.header}>
        <div style={s.headerLeft}>
          <Link href="/admin" style={s.back}>← 管理トップ</Link>
          <span style={s.title}>About 管理</span>
        </div>
        <button
          style={{ padding: '8px 16px', background: '#111110', color: '#fff', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
          onClick={() => setAdding(true)}
        >
          + 追加
        </button>
      </header>

      <main style={s.main}>
        <div style={s.tabs}>
          {TABS.map(t => (
            <button key={t.id} style={tabStyle(tab === t.id)} onClick={() => { setTab(t.id); setAdding(false) }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={s.card}>
          {loading ? (
            <div style={s.empty}>読み込み中...</div>
          ) : (
            <>
              {tabItems.length === 0 && !adding && (
                <div style={s.empty}>データがありません</div>
              )}
              {tabItems.map(item => (
                <ItemRow
                  key={item.id}
                  item={item}
                  tab={tab}
                  onUpdated={fetch_}
                  onDeleted={fetch_}
                />
              ))}
              {adding && (
                <NewItemRow
                  tab={tab}
                  onCreated={() => { setAdding(false); fetch_() }}
                  onCancel={() => setAdding(false)}
                />
              )}
              {!adding && (
                <button style={s.addBtn} onClick={() => setAdding(true)}>
                  + {TABS.find(t => t.id === tab)?.label} を追加
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
