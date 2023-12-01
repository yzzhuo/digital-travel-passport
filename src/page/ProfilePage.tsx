import { useAuth0 } from '@auth0/auth0-react'
import { PageLayout } from '../component/PageLayout'
import { LogoutButton } from '../component/LogoutButton'
import { useEffect, useState, useMemo } from 'react'
import { User } from '../models/user'
import { fetchCurrentUser, updateUser } from '../services/api'
import countryList from 'react-select-country-list'
import Select from 'react-select'

export const ProfilePage = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    url: '',
    country: '',
    username: '',
    display_name: ' ',
  })
  const [formData, setFormData] = useState({
    display_name: '',
    country: '',
  })
  const countryOptions = useMemo(() => countryList().getData(), [])
  const countryDisplayName = useMemo(() => {
    const country = countryOptions.find(
      (country) => country.value === userInfo.country,
    )
    return country ? country.label : 'Unknown Country'
  }, [userInfo.country])

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

  const handleEdit = () => {
    setFormData({
      display_name: userInfo.display_name,
      country: userInfo.country,
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    const accessToken = await getAccessTokenSilently()
    const res = await updateUser(accessToken, {
      display_name: formData.display_name,
      country: formData.country,
    })
    if (!res.error) {
      setIsEditing(false)
      setUserInfo(res.data)
      setIsSaving(false)
    }
  }

  console.log(JSON.stringify(user, null, 2))

  if (!user) {
    return null
  }
  return (
    <PageLayout>
      <div className='container flex h-screen items-center justify-center'>
        <div className='prose mx-auto	text-center'>
          <div>
            <div className='avatar'>
              <div className='w-24 rounded-full'>
                <img className='mb-0 mt-0' src={user.picture} />
              </div>
            </div>
            <div className='mt-6 flex w-80 flex-col gap-2'>
              {isEditing ? (
                <input
                  className='input input-bordered w-full'
                  defaultValue={userInfo.display_name || user.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_name: e.target.value || user.name,
                    })
                  }
                />
              ) : (
                <span className='text-2xl font-bold'>
                  {userInfo.display_name || user.name}
                </span>
              )}
              {!isEditing && <span className=''>{user.email}</span>}
              {isEditing ? (
                <Select
                  placeholder='Select Country'
                  defaultValue={{
                    value: formData.country,
                    label: countryDisplayName,
                  }}
                  options={countryOptions}
                  onChange={(country: any) =>
                    setFormData({ ...formData, country: country.value })
                  }
                />
              ) : (
                <span className=''>{countryDisplayName}</span>
              )}
            </div>
          </div>
          <div className='mt-8 flex flex-col'>
            {isEditing ? (
              <button className='btn btn-primary mb-4' onClick={handleSave}>
                {isSaving ? (
                  <span className='loading loading-dots loading-xs'></span>
                ) : (
                  'Save'
                )}
              </button>
            ) : (
              <button className='btn btn-primary mb-4' onClick={handleEdit}>
                Edit My Profile
              </button>
            )}
            {!isEditing && <LogoutButton />}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
