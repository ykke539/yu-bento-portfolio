'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import WorkForm from '../_components/WorkForm'
import type { WorkFormData } from '../_components/WorkForm'

const EMPTY: WorkFormData = {
  title: '', slug: '', num: '', cat: '', url: '', subtitle: '',
  scope: [{ key: '', val: '' }],
  thinking: [{ q: '', a: '', body: '' }],
  order: '', status: 'active',
}

export default function NewWorkPage() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSave = async (data: WorkFormData) => {
    setSaving(true)
    setError('')
    const res = await fetch('/api/admin/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        order: data.order !== '' ? Number(data.order) : undefined,
        scope: data.scope.filter(r => r.key),
        thinking: data.thinking.filter(t => t.q && t.a && t.body),
      }),
    })
    if (res.ok) {
      router.push('/admin/works')
    } else {
      const body = await res.json().catch(() => ({}))
      setError(body.error ?? '作成に失敗しました')
      setSaving(false)
    }
  }

  return <WorkForm title="実績を新規作成" backHref="/admin/works" initialData={EMPTY} onSave={handleSave} saving={saving} error={error} />
}
