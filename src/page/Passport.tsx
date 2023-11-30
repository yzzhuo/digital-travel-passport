import { useEffect, useState, useMemo, Fragment } from 'react'
import Bg from '../assets/passport_bg.jpg'
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  PencilIcon,
} from '@heroicons/react/24/solid'
import { PageLayout } from '../component/PageLayout'
import { fetchStamps, fetchCurrentUser } from '../services/api'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { StampList } from '../models/stamp'
import dayjs from 'dayjs'
import MessageBadge from '../component/MessageBadge'
import StampPhoto from '../component/StampPhoto'
import { User } from '../models/user'
import { PageLoading } from '../component/PageLoader'
import ImagePreviewer from '../component/ImagePreviewer'
import { useParams } from 'react-router-dom'

export default function Passport() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentStampId = queryParams.get('stampid')
  const { getAccessTokenSilently } = useAuth0()
  const [stamps, setStamps] = useState<StampList>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  })
  const [stampIndex, setCurrentStampIndex] = useState<number>(-1)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isShowBadge, setIsShowBadge] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const { shareUserId } = useParams() // if userId is not null, then it is a shared passport

  useEffect(() => {
    getStamps()
  }, [])

  const regions = useMemo(() => {
    const regions = new Set<string>()
    stamps.results.forEach((stamp) => {
      regions.add(stamp.place.region.name)
    })
    return Array.from(regions)
  }, [stamps])

  const getAccessToken = async () => {
    return shareUserId ? '' : await getAccessTokenSilently()
  }

  const getCurrentUser = async () => {
    const accessToken = await getAccessToken()
    const data = await fetchCurrentUser(accessToken)
    if (!data.error) {
      setCurrentUser(data.data)
      return data.data
    } else {
      alert('Error fetching user')
    }
  }

  const gotoPlacePage = () => {
    window.location.href = '/place'
  }

  const getStamps = async () => {
    let passportOwnerId = ''
    if (!currentUser) {
      if (shareUserId) {
        passportOwnerId = shareUserId
      } else {
        const user = await getCurrentUser()
        passportOwnerId = user.id + ''
      }
    }
    const accessToken = await getAccessToken()
    const response = await fetchStamps(accessToken, {
      user: passportOwnerId + '',
    })
    if (response.error) {
      alert('Error fetching stamps')
    }
    const data = response.data
    setStamps(data)

    if (currentStampId) {
      const index = data.results.findIndex(
        (stamp) => stamp.id == currentStampId,
      )
      if (index >= 0) {
        setCurrentStampIndex(index)
      }
    }
    setIsLoaded(true)
  }
  const handleEditStamp = (stampId: string, placeId: number) => {
    window.location.href = `/stamp/${stampId}?placeid=${placeId}`
  }

  const handleNext = async () => {
    if (stampIndex === stamps.count - 1) {
      return
    }
    if (stampIndex === stamps.results.length - 1) {
      const accessToken = await getAccessToken()
      const query = stamps.next
        .split('?')[1]
        .split('&')
        .reduce((acc, cur) => {
          const [key, value] = cur.split('=')
          return { ...acc, [key]: value }
        }, {})
      const data = await fetchStamps(accessToken, query)
      if (!data.error) {
        setStamps({
          ...data.data,
          results: [...stamps.results, ...data.data.results],
        })
      }
    }
    setCurrentStampIndex(stampIndex + 1)
  }

  const handlePrev = () => {
    if (stampIndex === -1) {
      return
    }
    setCurrentStampIndex(stampIndex - 1)
  }

  const handleShare = () => {
    const url = `${window.location.origin}/passport/share/${
      currentUser?.id || shareUserId
    }`
    navigator.clipboard.writeText(url)
    setIsShowBadge(true)
    setTimeout(() => {
      setIsShowBadge(false)
    }, 3000)
  }
  const Wrapper = shareUserId ? Fragment : PageLayout
  return (
    <Wrapper>
      {isLoaded ? (
        <div
          className='relative flex max-w-md items-center justify-center p-6 pb-24'
          style={{ minHeight: '100%', margin: '0 auto' }}
        >
          {stampIndex === -1 && (
            <div
              style={{ height: 568 }}
              className='card w-full bg-primary text-primary-content shadow-xl'
            >
              <div className='card-body flex flex-col'>
                <h2 className='card-title text-center text-3xl'>
                  {shareUserId
                    ? `${stamps?.results?.[0].user.display_name}'s `
                    : 'My '}
                  Travel Passport
                </h2>
                <div className='mt-8 flex-auto'>
                  <img src={Bg} alt='bg' className='background-contain' />
                </div>
                <div className='stats shadow'>
                  <div className='stat'>
                    <div className='stat-title'>Stamps</div>
                    <div className='stat-value'>{stamps.count}</div>
                    {/* <div className='stat-desc'>21% more than last month</div> */}
                  </div>
                  <div className='stat'>
                    <div className='stat-title'>Regions</div>
                    <div className='stat-value'>{regions.length}</div>
                  </div>
                </div>
                <div className='card-actions mb-4 mt-2 flex justify-center'>
                  {stamps.results.length > 0 ? (
                    <div className='flex w-full'>
                      <button
                        className='btn btn-secondary flex-1'
                        onClick={() => handleNext()}
                      >
                        Open Passport
                      </button>
                      <button
                        className='float btn btn-warning ml-2'
                        onClick={() => handleShare()}
                      >
                        <ShareIcon className='h-6 w-6' />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={gotoPlacePage}
                      className='btn btn-secondary'
                    >
                      Start Exploring
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {stampIndex >= 0 && (
            <div
              style={{ minHeight: 560 }}
              className='card w-full border-2 border-solid border-primary'
            >
              <div className='card-body flex flex-col '>
                <h2 className='card-title'>
                  {stamps.results[stampIndex].place.name}
                  {!shareUserId && (
                    <span
                      className='cursor-pointer'
                      onClick={() =>
                        handleEditStamp(
                          stamps.results[stampIndex].id,
                          stamps.results[stampIndex].place.id,
                        )
                      }
                    >
                      <PencilIcon className='h-4 w-4 hover:fill-primary' />
                    </span>
                  )}
                </h2>
                <div
                  style={{ height: 200 }}
                  className='relative mt-1 flex w-full items-center justify-center border-4 border-dotted border-gray-200'
                >
                  <StampPhoto
                    imageUrl={stamps.results[stampIndex].place.photo}
                  />
                </div>
                {stampIndex >= 0 && (
                  <button
                    className='btn btn-circle absolute left-2'
                    style={{ top: '25%' }}
                    onClick={handlePrev}
                  >
                    <ChevronLeftIcon className='h-6 w-6 cursor-pointer' />
                  </button>
                )}
                {stampIndex < stamps.count - 1 && stampIndex !== -1 && (
                  <button
                    onClick={handleNext}
                    className='btn btn-circle absolute right-2'
                    style={{ top: '25%' }}
                  >
                    <ChevronRightIcon className='h-6 w-6 cursor-pointer' />
                  </button>
                )}
                <div>{stamps.results[stampIndex].notes}</div>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {(stamps.results[stampIndex].photos || []).map(
                    (stampPhoto) => {
                      return (
                        <div
                          key={stampPhoto.id}
                          className='h-20 w-20'
                          onClick={() => setPreviewImage(stampPhoto.photo)}
                        >
                          <img
                            src={stampPhoto.photo}
                            className='h-full w-full cursor-pointer object-cover'
                          />
                        </div>
                      )
                    },
                  )}
                </div>
                <div className='mt-2 flex flex-col '>
                  <div className='flex items-center'>
                    <CalendarDaysIcon className='mr-1 h-6 w-6' />
                    <span>
                      {dayjs(stamps.results[stampIndex].time_of_visit).format(
                        'DD/MM/YYYY',
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isShowBadge && (
            <MessageBadge text={' Link copied. Send it to your friend now.'} />
          )}
        </div>
      ) : (
        <PageLoading />
      )}
      {previewImage && (
        <ImagePreviewer
          previewImage={previewImage}
          onClose={() => setPreviewImage('')}
        />
      )}
    </Wrapper>
  )
}
