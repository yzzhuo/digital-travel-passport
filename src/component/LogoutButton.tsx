import { useAuth0 } from '@auth0/auth0-react'

export const LogoutButton = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({})
  }

  return (
    <button className='btn' onClick={handleLogout}>
      Log Out
    </button>
  )
}
