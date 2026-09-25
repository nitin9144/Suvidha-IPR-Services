import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const FULL_SCREEN_ROUTES = ['/dashboard', '/admin']

export default function Root() {
  const { pathname } = useLocation()
  const isFullScreen = FULL_SCREEN_ROUTES.some(r => pathname.startsWith(r))
  const isAuthPage = ['/login', '/register'].includes(pathname)

  if (isAuthPage) return <Outlet />

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isFullScreen && <Footer />}
    </div>
  )
}
