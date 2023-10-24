import { useEffect, useState } from 'react'
import { PlaceInfo, fetchPlaceDetail } from '../api/place'
import { PageLayout } from '../component/PageLayout'
import { PageLoading } from '../component/PageLoader'

export default function AttractionDetail() {
  const [placeDetail, setPlaceDetail] = useState<PlaceInfo | null>(null)
  useEffect(() => {
    fetchPlaceDetail(1).then((data: PlaceInfo) => {
      setPlaceDetail(data)
    })
  }, [])
  return (
    <PageLayout>
      {placeDetail ? (
        <div className='container mx-auto'>
          <article className='prose mt-6'>
            <h3 className='mb-0'>{placeDetail.name}</h3>
            <div className='carousel w-full'>
              <div id='slide1' className='carousel-item relative w-full'>
                <img src={placeDetail.photo_url} className='w-full' />
                <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'></div>
              </div>
            </div>
            <p className='mt-0'>{placeDetail.description}</p>
          </article>
        </div>
      ) : (
        <PageLoading />
      )}
    </PageLayout>
  )
}
