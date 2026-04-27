'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import WorkForm from '../_components/WorkForm'
import type { WorkFormData } from '../_components/WorkForm'

export default function EditWorkPage() {
  const { id } = useParams() as { id: string }
  const [initial, setInitial] = useState<WorkFormData | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/admin/works/${id}`)
      .then(r => r.json())
      .then(data => {
        setInitial({
          title: data.title ?? '',
          slug: data.slug ?? '',
          num: data.num ?? '',
          cat: data.cat ?? '',
          url: data.url ?? '',
          subtitle: data.subtitle ?? '',
          scope: data.scope?.length ? data.scope.map((r: any) => ({
            key: r.key ?? '',
            val: r.tags ? r.tags.join(', ') : (r.val ?? ''),
          })) : [{ key: '', val: '' }],
          thinking: data.thinking?.length ? data.thinking : [{ q: '', a: '', body: '' }],
          order: data.order !== 999 ? String(data.order) : '',
          status: data.status ?? 'active',
        })
      })
  }, [id])

  const handleSave = async (data: WorkFormData) => {
    setSaving(true)
    setError('')

    const scope = data.scope.filter(r => r.key).map(r => {
      if (r.key.toLowerCase() === 'stack') {
        return { key: r.key, tags: r.val.split(',').map(t => t.trim()).filter(Boolean) }
      }
      return { key: r.key, val: r.val }
    })

    const res = await fetch(`/api/admin/works/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        order: data.order !== '' ? Number(data.order) : undefined,
        scope,
        thinking: data.thinking.filter(t => t.q && t.a && t.body),
      }),
    })
    if (res.ok) {
      router.push('/admin/works')
    } else {
      const body = await res.json().catch(() => ({}))
      setError(body.error ?? '保存に失敗しました')
      setSaving(false)
    }
  }

  if (!initial) return (
    <div style={{ padding: '40px 24px', color: '#a8a29e', fontSize: '14px' }}>読み込み中...</div>
  )

  return <WorkForm title="実績を編集" backHref="/admin/works" initialData={initial} onSave={handleSave} saving={saving} error={error} />
}
