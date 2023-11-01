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
            <div>
              <button className='btn btn-link'>Look at other's review</button>
            </div>
          </div>
        </div>
      ) : (
        <PageLoading />
      )}
    </PageLayout>
  )
}
