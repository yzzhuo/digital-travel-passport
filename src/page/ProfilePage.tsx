import { useAuth0 } from '@auth0/auth0-react'
import { PageLayout } from '../component/PageLayout'
import { LogoutButton } from '../component/LogoutButton'

export const ProfilePage = () => {
  const { user } = useAuth0()
  console.log(JSON.stringify(user, null, 2))
  if (!user) {
    return null
  }
  return (
    <PageLayout>
      <div className='container flex h-screen items-center justify-center'>
        <article className='prose mx-auto	text-center'>
          <div>
            <div className='avatar'>
              <div className='w-24 rounded-full'>
                <img className='mb-0 mt-0' src={user.picture} />
              </div>
            </div>
            <div className=''>
              <h2 className=''>{user.name}</h2>
              <span className=''>{user.email}</span>
            </div>
          </div>
          <div className='mt-8'>
            <LogoutButton />
          </div>
        </article>
      </div>
    </PageLayout>
  )
}
