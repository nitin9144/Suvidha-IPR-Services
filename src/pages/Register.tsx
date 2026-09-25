import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { register } from '../lib/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    register(form.name, form.email, form.password)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 20% 80%, rgba(200,168,75,0.10) 0%, transparent 60%)' }} />
        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-10 w-auto object-contain" />
          <span className="text-[10px] text-white/40 uppercase tracking-widest border-l border-white/10 pl-2.5" style={{ fontFamily: 'DM Mono, monospace' }}>IPR Services</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Protect your IP<br /><em className="text-yellow-400">with confidence.</em>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">Create your client account to begin a patent or copyright enquiry and track its progress from first submission to grant.</p>
          <div className="space-y-3">
            {[
              'Submit Patent & Copyright Enquiries',
              'Upload and Download Documents Securely',
              'Track Your Case in Real Time',
              'Communicate with Your Assigned Team',
              'View Payment & Invoice Information',
            ].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-white/60 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/15 text-xs">© 2026 Suvidha IPR Services</div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/"><img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-9 w-auto object-contain" /></Link>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Create Account</h1>
          <p className="text-gray-500 text-sm mb-8">Register to start your IP filing journey.</p>

          {error && <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 mb-5 text-sm text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { k: 'name', l: 'Full Name', t: 'text', ph: 'Dr. Arjun Mehta' },
              { k: 'email', l: 'Email Address', t: 'email', ph: 'arjun@company.com' },
              { k: 'phone', l: 'Phone / WhatsApp', t: 'tel', ph: '+91 98765 43210' },
            ].map(f => (
              <div key={f.k}>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.l}</label>
                <input type={f.t} required placeholder={f.ph} value={(form as any)[f.k]} onChange={e => set(f.k as any, e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
              </div>
            ))}
            {['password', 'confirm'].map(k => (
              <div key={k}>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {k === 'password' ? 'Password' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} required value={(form as any)[k]} onChange={e => set(k as any, e.target.value)} placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors pr-11" />
                  {k === 'password' && (
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              By registering, you acknowledge that Suvidha IPR Services provides <strong>professional filing assistance</strong> only. Patent grant and copyright registration are decisions of the respective government offices and are not guaranteed.
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold bg-navy-900 text-white hover:bg-navy-800 transition-all disabled:opacity-60">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-navy-700 font-semibold hover:text-gold-600 transition-colors">Sign in</Link>
          </p>
          <p className="text-center mt-3">
            <Link to="/" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">← Back to website</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
