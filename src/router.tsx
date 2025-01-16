/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import React from 'react'
import ProtectedRoute from './config/ProtectedRoute.tsx'
import { Roles } from './config/roles.ts'

import UserKyc from './pages/UserKYC/index.tsx'
import Users from '@/pages/users/index.tsx'
import Country from './pages/Country/index.tsx'
import Ads from './pages/Ads/index.tsx'
import Developer from './pages/Developer/index.tsx'
import Deposite from './pages/Deposite/index.tsx'
import Invoices from './pages/Invoices/index.tsx'
import UserDetails from './pages/userDetails/index.tsx'
import Projects from './pages/Projects/index.tsx'
import Shares from './pages/Shares/index.tsx'
import SharesHistory from './pages/Shares-History/index.tsx'
import Blogs from './pages/Blogs/index.tsx'
import Wallets from './pages/Wallets/index.tsx'
import WalletsSettings from './pages/Wllaets-Settings/index.tsx'
import UserBuffer from './pages/Buffer/index.tsx'
import BufferUsers from './pages/Buffer user/index.tsx'
import PriceShare from './pages/PriceShare/index.tsx'
import Withdraw from './pages/Withdraw/index.tsx'
import Cookies from 'js-cookie'


const AppShell = React.lazy(() => import('./components/app-shell'))
const Dashboard = React.lazy(() => import('./pages/dashboard'))


const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-in-2',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-2')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    element: (
      <ProtectedRoute requiredRole={Roles.ADMIN}>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <GeneralError />,
    children: [
      // {
      //   index: true,
      //   element: (
      //     <React.Suspense fallback={<div>Loading Dashboard...</div>}>
      //       <ProtectedRoute requiredRole={Roles.ADMIN}>
      //         <Dashboard />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      {
        index: true,
        element: (
          <React.Suspense fallback={<div>Loading Users...</div>}>
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Users />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'user/:id',
        element: (
          <React.Suspense
            fallback={<div>Loading User Details...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <UserDetails />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
    
      {
        path: 'ads',
        element: (
          <React.Suspense
            fallback={<div>Loading Ads...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Ads />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'country',
        element: (
          <React.Suspense
            fallback={<div>Loading country...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Country />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'developer',
        element: (
          <React.Suspense
            fallback={<div>Loading Developer...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Developer />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'deposite',
        element: (
          <React.Suspense
            fallback={<div>Loading Deposites...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Deposite />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'withdraw',
        element: (
          <React.Suspense
            fallback={<div>Loading Withdraw...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Withdraw />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'invoices',
        element: (
          <React.Suspense
            fallback={<div>Loading invoices...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Invoices />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'user-kyc',
        element: (
          <React.Suspense
            fallback={<div>Loading UserKyc...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <UserKyc />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },

      {
        path: 'projects',
        element: (
          <React.Suspense
            fallback={<div>Loading projects...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Projects />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },

      {
        path: 'shares',
        element: (
          <React.Suspense
            fallback={<div>Loading Shares...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Shares />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'shares_history',
        element: (
          <React.Suspense
            fallback={<div>Loading Shares history...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <SharesHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'blogs',
        element: (
          <React.Suspense
            fallback={<div>Loading Blogs...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Blogs />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      
      {
        path: 'wallets',
        element: (
          <React.Suspense
            fallback={<div>Loading Wallets...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <Wallets />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'wallets-settings',
        element: (
          <React.Suspense
            fallback={<div>Loading Wallets-Settings...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <WalletsSettings />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'user-buffer',
        element: (
          <React.Suspense
            fallback={<div>Loading buffer...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <UserBuffer />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'buffer-users',
        element: (
          <React.Suspense
            fallback={<div>Loading buffer users...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <BufferUsers />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },

      {
        path: 'priceShare',
        element: (
          <React.Suspense
            fallback={<div>Loading buffer users...</div>}
          >
            <ProtectedRoute requiredRole={Roles.ADMIN}>
              <PriceShare />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      // {
      //   path: 'chats',
      //   element: (
      //     <React.Suspense fallback={<div>Loading Chats...</div>}>
      //       <ProtectedRoute requiredRole={Roles.USER}>
      //         <Chats />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: 'apps',
      //   element: (
      //     <React.Suspense fallback={<div>Loading Apps...</div>}>
      //       <ProtectedRoute requiredRole={Roles.ADMIN}>
      //         <Apps />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: 'users',
      //   element: (
      //     <React.Suspense fallback={<div>Loading Coming Soon...</div>}>
      //       <ProtectedRoute requiredRole={Roles.ADMIN}>
      //         <ComingSoon />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: 'analysis',
      //   element: (
      //     <React.Suspense fallback={<div>Loading Coming Soon...</div>}>
      //       <ProtectedRoute requiredRole={Roles.ADMIN}>
      //         <ComingSoon />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: 'extra-components',
      //   element: (
      //     <React.Suspense fallback={<div>Loading Extra Components...</div>}>
      //       <ProtectedRoute requiredRole={Roles.ADMIN}>
      //         <ExtraComponents />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: 'settings',
      //   element: (
      //     <React.Suspense fallback={<div>Loading Settings...</div>}>
      //       <ProtectedRoute requiredRole={Roles.ADMIN}>
      //         <Settings />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      //   errorElement: <GeneralError />,
      //   children: [
      //     {
      //       index: true,
      //       element: (
      //         <React.Suspense fallback={<div>Loading Profile...</div>}>
      //           <Profile />
      //         </React.Suspense>
      //       ),
      //     },
      //     {
      //       path: 'account',
      //       element: (
      //         <React.Suspense fallback={<div>Loading Account...</div>}>
      //           <Account />
      //         </React.Suspense>
      //       ),
      //     },
      //     {
      //       path: 'appearance',
      //       element: (
      //         <React.Suspense fallback={<div>Loading Appearance...</div>}>
      //           <Appearance />
      //         </React.Suspense>
      //       ),
      //     },
      //     {
      //       path: 'notifications',
      //       element: (
      //         <React.Suspense fallback={<div>Loading Notifications...</div>}>
      //           <Notifications />
      //         </React.Suspense>
      //       ),
      //     },
      //     {
      //       path: 'display',
      //       element: (
      //         <React.Suspense fallback={<div>Loading Display...</div>}>
      //           <Display />
      //         </React.Suspense>
      //       ),
      //     },
      //     {
      //       path: 'error-example',
      //       element: (
      //         <React.Suspense fallback={<div>Loading Error Example...</div>}>
      //           <ErrorExample />
      //         </React.Suspense>
      //       ),
      //       errorElement: <GeneralError className='h-[50svh]' minimal />,
      //     },
      //   ],
      // },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
