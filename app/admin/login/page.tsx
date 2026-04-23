'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push(searchParams.get('from') ?? '/admin')
    } else {
      const { error } = await res.json()
      setError(error)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>優.bento</div>
          <div style={{ fontSize: '13px', color: '#78716c' }}>Admin</div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '8px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#44403c', marginBottom: '8px', letterSpacing: '0.04em' }}>
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            required
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #e7e5e4', borderRadius: '6px', fontSize: '16px', outline: 'none', marginBottom: '16px', boxSizing: 'border-box' }}
          />
          {error && (
            <div style={{ fontSize: '13px', color: '#dc2626', marginBottom: '12px' }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{ width: '100%', padding: '10px', background: loading || !password ? '#d6d3d1' : '#111110', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: loading || !password ? 'not-allowed' : 'pointer', letterSpacing: '0.04em' }}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
