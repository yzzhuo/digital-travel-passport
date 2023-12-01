import { useEffect, useState } from 'react'
import {
  fetchCurrentUser,
  fetchPlaceDetail,
  fetchStamps,
} from '../services/api'
import { type Place } from '../models/place'
import { PageLayout } from '../component/PageLayout'
import { PageLoading } from '../component/PageLoader'
import { useParams } from 'react-router-dom'
import {
  MapPinIcon,
  CurrencyEuroIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import Map from '../component/Map'
import Review from '../component/Review'
import { Stamp, StampList } from '../models/stamp'
import { useAuth0 } from '@auth0/auth0-react'

export default function AttractionDetail() {
  const { placeId } = useParams()
  const [placeDetail, setPlaceDetail] = useState<Place | null>(null)
  const { getAccessTokenSilently } = useAuth0()
  const [currentStamp, setCurrentStamp] = useState<Stamp | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [stamps, setStamps] = useState<StampList>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  })

  const initData = async () => {
    setIsLoading(true)
    const data = await fetchPlaceDetail(placeId)
    if (!data.error) {
      setPlaceDetail(data.data)
    }
    if (placeId) {
      // for reviews data
      await Promise.all([checkIfUserHasStamp(), fetchStampsByPlace()])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    initData()
  }, [placeId])

  const checkIfUserHasStamp = async () => {
    const accessToken = await getAccessTokenSilently()
    const currentUser = await fetchCurrentUser(accessToken)
    const res = await fetchStamps(accessToken, {
      user: currentUser.data.id,
      place: placeId,
    })
    if (res.data.results.length > 0) {
      setCurrentStamp(res.data.results[0])
    }
  }
  const fetchStampsByPlace = async () => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetchStamps(accessToken, {
      place: placeId,
    })
    if (!res.error) {
      setStamps(res.data)
    }
  }

  const goToStampPage = () => {
    if (currentStamp) {
      location.href = `/stamp/${currentStamp.id}?placeid=${placeId}`
    } else {
      location.href = `/stamp?placeid=${placeId}`
    }
  }
  const GoBackBtn = () => {
    return (
      <div className='relative w-full'>
        <Link to='/place'>
          <ArrowLeftIcon className='absolute left-4 top-4 h-5 w-5 text-white' />
        </Link>
        <img src={placeDetail.photo} className='h-80 w-full object-cover' />
      </div>
    )
  }
  return (
    <PageLayout>
      {!isLoading && placeDetail ? (
        <div className='overflow-auto'>
          <div className='relative'>
            <GoBackBtn />
            <div
              className='container mb-24 flex flex-col items-center'
              style={{ maxWidth: '65ch' }}
            >
              <article className='prose mt-6 flex flex-col lg:prose-xl'>
                <h3 className='mb-0'>{placeDetail.name}</h3>
                <p className='mt-0'>{placeDetail.description}</p>
                <div className='flex justify-between'>
                  <div>
                    <div className='flex items-center'>
                      <MapPinIcon className='mr-1 h-6 w-6' />
                      <span>{placeDetail.region.name}</span>
                    </div>
                    <div className='flex items-center'>
                      <CurrencyEuroIcon className='mr-1 h-6 w-6' />
                      <span>{placeDetail.admission_fee}</span>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <button
                      onClick={goToStampPage}
                      className='btn btn-circle btn-primary btn-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-4 w-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5'
                        />
                      </svg>
                    </button>
                    <span className='text-md mt-2 sm:text-sm'>
                      {currentStamp ? 'Edit ' : 'Get '}Stamp
                    </span>
                  </div>
                </div>
              </article>
              <div
                role='tablist'
                className='tabs-lifted tabs mt-4 self-stretch'
              >
                <input
                  type='radio'
                  name='my_tabs_2'
                  role='tab'
                  className='tab'
                  aria-label='Location'
                  checked
                />
                <div
                  role='tabpanel'
                  style={{ height: '300px' }}
                  className='tab-content w-full pt-2'
                >
                  <Map
                    center={{
                      lat: Number(placeDetail.location_lat),
                      lng: Number(placeDetail.location_lon),
                    }}
                  />
                </div>
                <input
                  type='radio'
                  name='my_tabs_2'
                  role='tab'
                  className='tab'
                  aria-label={`Reviews`}
                />
                <div role='tabpanel' className='tab-content pt-2'>
                  <Review stamplist={stamps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoading />
      )}
    </PageLayout>
  )
}
