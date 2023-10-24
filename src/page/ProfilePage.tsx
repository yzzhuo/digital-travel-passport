import { useAuth0 } from '@auth0/auth0-react'
import { CodeSnippet } from '../component/CodeSnippet'
import { PageLayout } from '../component/PageLayout'

export const ProfilePage = () => {
  const { user } = useAuth0()

  if (!user) {
    return null
  }

  return (
    <PageLayout>
      <div className='container mx-auto'>
        <article className='prose mx-auto	text-center'>
          <h3>My Profile</h3>
          <div>
            <div className='avatar'>
              <div className='w-24 rounded-full'>
                <img className='mb-0 mt-0' src={user.picture} />
              </div>
            </div>
            <div className='profile__headline'>
              <h2 className='profile__title'>{user.name}</h2>
              <span className='profile__description'>{user.email}</span>
            </div>
          </div>
          <div className='profile__details'>
            <CodeSnippet
              title='Decoded ID Token'
              code={JSON.stringify(user, null, 2)}
            />
          </div>
        </article>
      </div>
    </PageLayout>
  )
}
