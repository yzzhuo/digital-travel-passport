import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  UserIcon,
  MapIcon,
  DeviceTabletIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

enum Path {
  Discovery = '/place',
  Passport = '/passport',
  Profile = '/profile',
}

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(Path.Discovery)
  const location = useLocation()
  const currentPath = location.pathname
  useEffect(() => {
    const prefixPath = `/${currentPath.split('/')[1]}`
    switch (prefixPath) {
      case Path.Discovery:
        setActive(Path.Discovery)
        break
      case Path.Passport:
        setActive(Path.Passport)
        break
      case Path.Profile:
        setActive(Path.Profile)
        break
    }
  })

  return (
    <div className='h-screen'>
      <div className='h-full'>{children}</div>
      <div className='border-top-solid btm-nav border-t-2 border-gray-100 shadow-sm'>
        <button className={`${active === Path.Discovery ? 'active' : ''} `}>
          <Link
            to='/place'
            className='flex flex-col items-center justify-center'
          >
            <MapIcon className='h-5 w-5' />
            <span className='btm-nav-label'>Discovery</span>
          </Link>
        </button>
        <button className={`${active === Path.Passport ? 'active' : ''} `}>
          <Link
            to='/passport'
            className='flex flex-col items-center justify-center'
          >
            <DeviceTabletIcon className='h-5 w-5' />
            <span className='btm-nav-label'>Passport</span>
          </Link>
        </button>
        <button className={`${active === Path.Profile ? 'active' : ''} `}>
          <Link
            to='/profile'
            className='flex flex-col items-center justify-center'
          >
            <UserIcon className='h-5 w-5' />
            <span className='btm-nav-label'>Profile</span>
          </Link>
        </button>
      </div>
    </div>
  )
}
