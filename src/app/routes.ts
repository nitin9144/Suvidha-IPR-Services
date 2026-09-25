import { createBrowserRouter } from 'react-router'
import Root from './Root'
import Home from '../pages/Home'
import PatentEnquiry from '../pages/PatentEnquiry'
import CopyrightEnquiry from '../pages/CopyrightEnquiry'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ClientDashboard from '../pages/dashboard/ClientDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'patent-enquiry', Component: PatentEnquiry },
      { path: 'copyright-enquiry', Component: CopyrightEnquiry },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'dashboard', Component: ClientDashboard },
      { path: 'admin', Component: AdminDashboard },
      { path: '*', Component: NotFound },
    ],
  },
])
