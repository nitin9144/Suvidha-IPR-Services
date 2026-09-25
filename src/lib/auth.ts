export type Role = 'client' | 'admin'

export interface Session {
  id: string
  name: string
  email: string
  role: Role
}

// Demo credentials
export const DEMO_USERS: (Session & { password: string })[] = [
  { id: 'u1', name: 'Arjun Mehta', email: 'client@suvidha.com', role: 'client', password: 'demo123' },
  { id: 'u2', name: 'Priya Nair', email: 'priya@startup.com', role: 'client', password: 'demo123' },
  { id: 'admin', name: 'Admin User', email: 'admin@suvidha.com', role: 'admin', password: 'admin123' },
]

const KEY = 'suvidha_session'

export function login(email: string, password: string): Session | null {
  const user = DEMO_USERS.find(u => u.email === email && u.password === password)
  if (!user) return null
  const session: Session = { id: user.id, name: user.name, email: user.email, role: user.role }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function register(name: string, email: string, _password: string): Session {
  const session: Session = { id: `u_${Date.now()}`, name, email, role: 'client' }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearSession() {
  localStorage.removeItem(KEY)
}
