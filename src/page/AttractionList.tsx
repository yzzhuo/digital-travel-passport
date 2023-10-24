import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { fetchPlaceList } from '../api/place'
import { useEffect, useState } from 'react'
import { type PlaceListResult, type PlaceInfo } from '../api/place'
import { Link } from 'react-router-dom'
import { PageLayout } from '../component/PageLayout'

export default function AttractionList() {
  const [places, setPlaces] = useState<PlaceInfo[]>([])
  useEffect(() => {
    fetchPlaceList().then((data: PlaceListResult) => {
      console.log('data', data)
      setPlaces(data.results)
    })
  }, [])
  const handleClickPlace = () => {}
  return (
    <PageLayout>
      <div className='container mx-auto'>
        <article className='prose mt-6'>
          <h3>Places to go</h3>
          <div className='mx-auto flex'>
            <input
              type='text'
              placeholder='Search a place'
              className='input input-bordered w-full flex-1'
            />
            <button className='btn btn-square ml-2'>
              <AdjustmentsHorizontalIcon className='primary h-6 w-6' />
            </button>
          </div>
        </article>
        <div className='mt-4'>
          <div className='mx-auto columns-1'>
            {places.map((place) => (
              <Link key={place.name} to={`/place/${place.id}`}>
                <div
                  key={place.name}
                  onClick={handleClickPlace}
                  className='card mx-auto mt-4 border-2 border-gray-200 shadow'
                >
                  <figure className='h-48'>
                    <img src={place.photo_url} alt={place.name} />
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title'>{place.name}</h2>
                    <p>{place.region.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
