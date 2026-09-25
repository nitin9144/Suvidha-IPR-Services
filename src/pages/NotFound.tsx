import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
      <div className="text-center">
        <div className="text-8xl font-bold text-navy-900/10 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>404</div>
        <h1 className="text-2xl font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Page Not Found</h1>
        <p className="text-gray-500 text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 rounded-full text-sm font-bold" style={{ background: '#c8a84b', color: '#0b1c3d' }}>Go Home →</Link>
      </div>
    </div>
  )
}
