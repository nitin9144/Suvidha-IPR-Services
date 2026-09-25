import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react'
import { login } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const session = login(email, password)
    setLoading(false)
    if (!session) { setError('Invalid email or password. Try demo credentials below.'); return }
    navigate(session.role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 80% 20%, rgba(200,168,75,0.12) 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-10 w-auto object-contain" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest border-l border-white/10 pl-2.5" style={{ fontFamily: 'DM Mono, monospace' }}>IPR Services</span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Your IP journey,<br /><em className="text-yellow-400">tracked in one place.</em>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">Access your case dashboard to view case status, upload documents, track deadlines, and communicate with your assigned team.</p>
          <div className="space-y-4">
            {[
              { e: '📊', t: 'Real-time case tracking' },
              { e: '📁', t: 'Secure document management' },
              { e: '🔔', t: 'Deadline notifications' },
              { e: '💬', t: 'Direct team communication' },
            ].map(f => (
              <div key={f.t} className="flex items-center gap-3">
                <span className="text-lg">{f.e}</span>
                <span className="text-white/60 text-sm">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/15 text-xs">
          © 2026 Suvidha IPR Services
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-9 w-auto object-contain" />
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-navy-900 mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Client Login</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to access your IP dashboard.</p>

          {/* Demo credentials */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-xs text-blue-700">
            <strong className="block mb-1.5">Demo Credentials</strong>
            <div className="space-y-1">
              <p>🧑 Client: <code className="bg-blue-100 px-1 rounded">client@suvidha.com</code> / <code className="bg-blue-100 px-1 rounded">demo123</code></p>
              <p>🔐 Admin: <code className="bg-blue-100 px-1 rounded">admin@suvidha.com</code> / <code className="bg-blue-100 px-1 rounded">admin123</code></p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl p-3.5 mb-5 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="client@suvidha.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors pr-11" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold bg-navy-900 text-white hover:bg-navy-800 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? 'Signing in…' : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy-700 font-semibold hover:text-gold-600 transition-colors">Register here</Link>
          </p>
          <p className="text-center mt-4">
            <Link to="/" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">← Back to website</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
