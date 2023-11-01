import { useEffect, useState } from 'react'
import { PlaceInfo, fetchPlaceDetail } from '../api/place'
import { PageLayout } from '../component/PageLayout'
import { PageLoading } from '../component/PageLoader'
import { useParams } from 'react-router-dom'
import { MapPinIcon, CurrencyEuroIcon } from '@heroicons/react/24/solid'

export default function AttractionDetail() {
  const { placeId } = useParams()
  const [placeDetail, setPlaceDetail] = useState<PlaceInfo | null>(null)
  useEffect(() => {
    fetchPlaceDetail(placeId).then((data: PlaceInfo) => {
      setPlaceDetail(data)
    })
  }, [placeId])
  return (
    <PageLayout>
      {placeDetail ? (
        <div>
          <div className='w-full'>
            <img src={placeDetail.photo_url} className='h-80 w-full' />
          </div>
          <div className='container'>
            <article className='prose mt-6'>
              <h3 className='mb-0'>{placeDetail.name}</h3>
              <p className='mt-0'>{placeDetail.description}</p>

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
            </article>
            <div className='divider'></div>
            <div tabIndex={0} className='collapse-arrow collapse'>
              <div className='collapse-title pl-0 font-medium'>
                Look at other review{' '}
              </div>
              <div className='collapse-content'>
                <div>
                  <div className='flex'>
                    <div className='avatar mr-6'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src='https://daisyui.com/tailwind-css-component-profile-2@56w.png'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div className='mr-6'>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className='text-sm opacity-50'>United States</div>
                    </div>
                  </div>
                  <p className='ml-0 mt-2'>
                    As a traveler, I had the pleasure of visiting the Helsinki
                    Cathedral, and it truly left an indelible mark on my journey
                    through Finland's capital city. This architectural
                    masterpiece, perched atop a majestic flight of stairs..
                  </p>
                </div>

                <div className='mt-4'>
                  <div className='flex '>
                    <div className='avatar mr-6'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src='https://daisyui.com/tailwind-css-component-profile-2@56w.png'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div className='mr-6'>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className='text-sm opacity-50'>United States</div>
                    </div>
                  </div>
                  <p className='ml-0 mt-2'>
                    As a traveler, I had the pleasure of visiting the Helsinki
                    Cathedral, and it truly left an indelible mark on my journey
                    through Finland's capital city. This architectural
                    masterpiece, perched atop a majestic flight of stairs..
                  </p>
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
