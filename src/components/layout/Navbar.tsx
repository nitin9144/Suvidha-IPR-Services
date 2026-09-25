import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield } from 'lucide-react'
import { getSession, clearSession } from '../../lib/auth'

const services = [
  { label: 'Patent Services', href: '/#services' },
  { label: 'Copyright Services', href: '/#services' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const session = getSession()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const solid = scrolled || !isHome
  const textCls = solid ? 'text-navy-800 hover:text-gold-600' : 'text-white/85 hover:text-white'
  const bg = solid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-9 w-auto object-contain" />
          <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold border-l pl-2.5 hidden sm:block ${solid ? 'text-navy-700 border-navy-200' : 'text-white/60 border-white/20'}`}
            style={{ fontFamily: 'DM Mono, monospace' }}>IPR Services</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {[['Home', '/'], ['About', '/#about'], ['How It Works', '/#how-it-works'], ['FAQ', '/#faq']].map(([l, h]) => (
            <a key={l} href={h} className={`text-sm font-medium transition-colors ${textCls}`}>{l}</a>
          ))}

          {/* Services dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${textCls}`}>
              Services <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <Link to="/patent-enquiry" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-800 hover:bg-navy-50 hover:text-gold-700 transition-colors">
                  🔬 Patent Services
                </Link>
                <Link to="/copyright-enquiry" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-800 hover:bg-navy-50 hover:text-gold-700 transition-colors">
                  ©️ Copyright Services
                </Link>
                <div className="my-1 border-t border-gray-100" />
                <a href="/#status" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-800 hover:bg-navy-50 hover:text-gold-700 transition-colors">
                  🔍 IP Status Check
                </a>
              </div>
            )}
          </div>

          <a href="/#contact" className={`text-sm font-medium transition-colors ${textCls}`}>Contact</a>
        </div>

        {/* Auth / CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {session ? (
            <>
              <Link
                to={session.role === 'admin' ? '/admin' : '/dashboard'}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${textCls}`}
              >
                {session.role === 'admin' ? <Shield className="w-4 h-4" /> : <LayoutDashboard className="w-4 h-4" />}
                {session.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              <button onClick={handleLogout} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${textCls}`}>
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`text-sm font-medium transition-colors ${textCls}`}>Client Login</Link>
              <Link to="/patent-enquiry"
                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
                style={{ background: '#c8a84b', color: '#0b1c3d' }}>
                Start Filing →
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen
            ? <X className={`w-5 h-5 ${solid ? 'text-navy-900' : 'text-white'}`} />
            : <Menu className={`w-5 h-5 ${solid ? 'text-navy-900' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 pb-5 pt-3">
          {[['Home', '/'], ['About', '/#about'], ['How It Works', '/#how-it-works'], ['FAQ', '/#faq'], ['Contact', '/#contact']].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-navy-800 font-medium border-b border-gray-50">{l}</a>
          ))}
          <Link to="/patent-enquiry" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-navy-800 font-medium border-b border-gray-50">🔬 Patent Services</Link>
          <Link to="/copyright-enquiry" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-navy-800 font-medium border-b border-gray-50">©️ Copyright Services</Link>
          <div className="mt-4 flex flex-col gap-2">
            {session ? (
              <>
                <Link to={session.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 bg-navy-900 text-white rounded-full text-sm font-semibold">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-center px-5 py-2.5 border border-gray-200 text-navy-800 rounded-full text-sm font-semibold">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 border border-gray-200 text-navy-800 rounded-full text-sm font-semibold">Client Login</Link>
                <Link to="/patent-enquiry" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: '#c8a84b', color: '#0b1c3d' }}>Start Filing →</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
