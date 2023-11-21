import { useEffect, useState } from 'react'
import { fetchPlaceDetail } from '../services/place.service'
import { type PlaceInfo } from '../models/place'
import { PageLayout } from '../component/PageLayout'
import { PageLoading } from '../component/PageLoader'
import { useParams } from 'react-router-dom'
import {
  MapPinIcon,
  CurrencyEuroIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid'
import StampBtnIcon from '../assets/stamp_button_icon.svg'
import { Link } from 'react-router-dom'

export default function AttractionDetail() {
  const { placeId } = useParams()
  const [placeDetail, setPlaceDetail] = useState<PlaceInfo | null>(null)
  useEffect(() => {
    fetchPlaceDetail(placeId).then((data) => {
      if (!data.error) {
        setPlaceDetail(data.data)
      }
    })
  }, [placeId])

  return (
    <PageLayout>
      {placeDetail ? (
        <div className='relative'>
          <Link to='/stamp'>
            <button
              style={{
                backgroundImage: `url(${StampBtnIcon})`,
                backgroundSize: '24px',
              }}
              className='btn btn-circle btn-primary fixed bottom-4 right-12 cursor-pointer bg-center bg-no-repeat text-white'
            ></button>
          </Link>
          <div className='relative w-full'>
            <Link to='/place'>
              <ArrowLeftIcon className='absolute left-4 top-4 h-5 w-5 text-white' />
            </Link>
            <img src={placeDetail.photo} className='h-80 w-full' />
          </div>
          <div className='container mb-24'>
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
