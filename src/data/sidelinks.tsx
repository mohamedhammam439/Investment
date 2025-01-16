import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
} from '@tabler/icons-react'
import Cookies from 'js-cookie'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}
const status = Cookies.get('status')
console.log('status', status)

export const sidelinks: SideLink[] = [
  // {
  //   title: 'Dashboard',
  //   label: '',
  //   href: '/',
  //   icon: <IconLayoutDashboard size={18} />,
  // },
  {
    title: 'Users',
    label: '',
    href: '/',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Country',
    label: '',
    href: '/country',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Ads',
    label: '',
    href: '/ads',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Trade Types',
    label: '',
    href: '/developer',
    icon: <IconChecklist size={18} />,
  },

  {
    title: 'Deposite',
    label: '',
    href: '/deposite',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Withdraw',
    label: '',
    href: '/withdraw',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Invoices',
    label: '',
    href: '/invoices',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'User-kyc',
    label: '',
    href: '/user-kyc',
    icon: <IconChecklist size={18} />,
  },

  {
    title: 'Projects',
    label: '',
    href: '/projects',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Shares',
    label: '',
    href: '/shares',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Users Shares',
    label: '',
    href: '/shares_history',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Blogs',
    label: '',
    href: '/blogs',
    icon: <IconChecklist size={18} />,
  },
  ...(status === 'super_admin'
    ? [
        {
          title: 'Wallets',
          label: '',
          href: '/wallets',
          icon: <IconChecklist size={18} />,
        },
      ]
    : []),

  {
    title: 'Wallets-Settings Affiliate',
    label: '',
    href: '/wallets-settings',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Buffer',
    label: '',
    href: '/user-buffer',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Users Buffer',
    label: '',
    href: '/buffer-users',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Price Share',
    label: '',
    href: '/priceShare',
    icon: <IconChecklist size={18} />,
  },

  // {
  //   title: 'Chats',
  //   label: '',
  //   href: '/chats',
  //   icon: <IconMessages size={18} />,
  // },
  // {
  //   title: 'Apps',
  //   label: '',
  //   href: '/apps',
  //   icon: <IconApps size={18} />,
  // },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Users',
  //   label: '',
  //   href: '/users',
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: 'Requests',
  //   label: '',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/extra-components',
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/401',
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/settings',
  //   icon: <IconSettings size={18} />,
  // },
]
