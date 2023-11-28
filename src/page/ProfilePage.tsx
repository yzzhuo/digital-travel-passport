import { useAuth0 } from '@auth0/auth0-react'
import { PageLayout } from '../component/PageLayout'
import { LogoutButton } from '../component/LogoutButton'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { User } from '../models/user'
import { fetchCurrentUser, updateStamp, updateUser } from '../services/api'

export const ProfilePage = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    url: '',
    country: '',
    username: '',
    display_name: '',
  })

  useEffect(() => {
    if (!userInfo.id) {
      getCurrentUser()
    }
  }, [userInfo])

  const getCurrentUser = async () => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetchCurrentUser(accessToken)
    if (!res.error) {
      setUserInfo(res.data)
    }
  }

  const handleSave = async () => {
    const accessToken = await getAccessTokenSilently()
    const res = await updateUser(accessToken, userInfo.id, {
      display_name: userInfo.display_name,
    })
    if (!res.error) {
      setIsEditing(false)
    }
  }

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
              <h2 className=''>
                {isEditing ? (
                  <input
                    className='text-2xl font-bold'
                    defaultValue={userInfo.display_name || user.name}
                    value={userInfo.display_name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, display_name: e.target.value })
                    }
                  />
                ) : (
                  <span className='text-2xl font-bold'>
                    {userInfo.display_name || user.name}
                  </span>
                )}
                <PencilSquareIcon
                  className='ml-2 inline h-5 w-5'
                  onClick={() => {
                    if (isEditing) {
                      handleSave()
                    } else {
                      setIsEditing(true)
                    }
                  }}
                />
              </h2>
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
