import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import logo from '/images/white sssmart investment final logo-0١ 2.png'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)
  const [currentLang, setCurrentLang] = useState()
  const { i18n } = useTranslation()


  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  useEffect(() => {
    const currentLang = i18n.language || window.localStorage.i18nextLng || 'en'
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    setCurrentLang(currentLang)

  }, [i18n.language])



  // console.log("document.documentElement.lang", document.documentElement.lang)
  // console.log("currentLang", currentLang)

  return (
    <aside
      className={cn(
        `fixed ${currentLang === 'ar' ? 'right-0' : 'left-0'}  top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='z-50 flex justify-between px-4 py-3 shadow-sm md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
              className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-8 w-8'}`}
            >
              <rect width='256' height='256' fill='none'></rect>
              <line
                x1='208'
                y1='128'
                x2='128'
                y2='208'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
              <line
                x1='192'
                y1='40'
                x2='40'
                y2='192'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
              <span className='sr-only'>Website Name</span>
            </svg> */}
            <Link to={'/'} ><img src={logo} alt='' style={{ height: '90px' }} /></Link>
            
            {/* <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium'>Smart Hiring</span>
              <span className='text-xs'>Smart Hiring</span>
            </div> */}
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className={`absolute ${currentLang === 'ar' ? '-left-5' : '-right-5'}  top-1/2 z-50 hidden rounded-full md:inline-flex`}
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
