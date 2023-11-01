import { useAuth0 } from '@auth0/auth0-react'
import { PageFooter } from './PageFooter'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth0()

  return (
    <div className='h-screen'>
      <div className='navbar sticky top-0 bg-white shadow-md'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'>
              <li>
                <a>Discover</a>
              </li>
              <li>
                <a>Passport</a>
              </li>
            </ul>
          </div>
          <a className='btn btn-ghost text-xl normal-case'>daisyUI</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a>Discover</a>
            </li>
            <li>
              <a>Passport</a>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          {user ? (
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='avatar btn btn-circle btn-ghost'>
                <div className='w-10 rounded-full'>
                  <img src={user.picture} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
              >
                <li>
                  <a className='justify-between'>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
      <div className='h-full'>{children}</div>
      <PageFooter />
    </div>
  )
}
