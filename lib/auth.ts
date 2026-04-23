export const COOKIE_NAME = 'admin_session'

export function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? ''
  // パスワードをBase64エンコードして固定トークンとして使用
  return Buffer.from(`yu-bento-admin:${password}`).toString('base64')
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false
  return token === getExpectedToken()
}
