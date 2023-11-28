import { useEffect, useState } from 'react'
import { Stamp, StampList } from '../models/stamp'
import dayjs from 'dayjs'
import { fetchStamps } from '../services/api'
import { useAuth0 } from '@auth0/auth0-react'
import { PageLoading } from './PageLoader'
import ImagePreviewer from './ImagePreviewer'

export default function Review({ stamplist }: { stamplist: StampList }) {
  const [stamps, setStamps] = useState<Stamp[]>([...stamplist.results])
  const [nextPage, setNextPage] = useState<string>(stamplist.next)
  const { getAccessTokenSilently } = useAuth0()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')

  useEffect(() => {
    setStamps(stamplist.results)
    setNextPage(stamplist.next)
  }, [stamplist])

  const handleFetchMore = async () => {
    setIsLoading(true)
    const accessToken = await getAccessTokenSilently()
    // turn `?page=2&place=1` to {page: 2, place: 1}
    const query = nextPage
      .split('?')[1]
      .split('&')
      .reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        return { ...acc, [key]: value }
      }, {})

    const data = await fetchStamps(accessToken, query)
    if (!data.error) {
      setStamps([...stamps, ...data.data.results])
      setNextPage(data.data.next)
    }
    setIsLoading(false)
  }

  return (
    <div className=''>
      {stamps.map((stamp) => (
        <div className='mt-4' key={stamp.id}>
          <div className='flex'>
            <div className='mr-6'>
              <div className='font-bold'>username</div>
              <div className='text-sm opacity-50'>
                {dayjs(stamp.time_of_visit).format('DD/MM/YYYY HH:mm:ss')}
              </div>
            </div>
          </div>
          <p className='ml-0 mt-2'>{stamp.notes}</p>
          <div className='flex gap-2 overflow-auto'>
            {stamp.photos.map((photo) => (
              <img
                onClick={() => setPreviewImage(photo.photo)}
                key={photo.id}
                src={photo.photo}
                className='h-20 w-20 cursor-pointer'
              />
            ))}
          </div>
        </div>
      ))}
      {nextPage && (
        <div>
          <button
            className='btn btn-link btn-primary'
            onClick={handleFetchMore}
          >
            Load more
          </button>
        </div>
      )}
      {isLoading && <PageLoading />}
      {previewImage && (
        <ImagePreviewer
          previewImage={previewImage}
          onClose={() => setPreviewImage('')}
        />
      )}
    </div>
  )
}
