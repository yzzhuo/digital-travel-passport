import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { fetchPlaceList } from '../services/api'
import { useEffect, useState } from 'react'
import { type Place } from '../models/place'
import { Link } from 'react-router-dom'
import { PageLayout } from '../component/PageLayout'
import { PageLoading } from '../component/PageLoader'
import Empty from '../assets/empty.png'

export default function AttractionList() {
  const [loading, setLoading] = useState<boolean>(true)
  const [places, setPlaces] = useState<Place[]>([])
  useEffect(() => {
    fetchPlaceList().then((data) => {
      if (!data.error) {
        setPlaces(data.data.results)
      }
      setLoading(false)
    })
  }, [])

  const handleOpenFilter = () => {
    const dialog = document.getElementById('my_modal_1')
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal()
    }
  }
  const handleClickPlace = () => {}

  return (
    <PageLayout>
      {loading ? (
        <PageLoading />
      ) : (
        <div className='container pb-20'>
          <article className='prose mt-6'>
            <h2>Places to go</h2>
          </article>
          <div className='mt-6 flex columns-1'>
            <input
              type='text'
              placeholder='Search a place'
              className='input input-bordered w-full flex-1'
            />
            <div className='dropdown'>
              <button
                onClick={handleOpenFilter}
                className='btn btn-square ml-2'
              >
                <AdjustmentsHorizontalIcon className='primary h-6 w-6' />
              </button>
              <dialog id='my_modal_1' className='modal'>
                <div className='modal-box'>
                  <div className='flex'>
                    <h3 className='flex-1 text-lg font-bold'>Filter</h3>
                    <div className='modal-action mt-0'>
                      <form method='dialog'>
                        <button>
                          <XMarkIcon className='primary h-6 w-6' />
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className='divider'></div>
                  <div>
                    <h3 className='text-md font-bold'>Region</h3>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='checkbox mr-2' />
                        <span className='label-text flex-1'>Helsinki</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='checkbox mr-2' />
                        <span className='label-text flex-1'>Espoo</span>
                      </label>
                    </div>
                  </div>
                  <div className='divider'></div>
                  <div>
                    <h3 className='text-md font-bold'>Activities</h3>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='checkbox mr-2' />
                        <span className='label-text flex-1'>
                          Design and art
                        </span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='checkbox mr-2' />
                        <span className='label-text flex-1'>Shopping</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='checkbox mr-2' />
                        <span className='label-text flex-1'>
                          Food and drinks
                        </span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='checkbox mr-2' />
                        <span className='label-text flex-1'>Attractions</span>
                      </label>
                    </div>
                  </div>
                  <div className='divider'></div>
                  <div>
                    <h3 className='text-md font-bold'>Admission Fee</h3>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='radio mr-2' />
                        <span className='label-text flex-1'>All</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input type='checkbox' className='radio mr-2' />
                        <span className='label-text flex-1'>Free</span>
                      </label>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {places.length ? (
              places.map((place) => (
                <Link
                  key={place.name}
                  to={`/place/${place.id}`}
                  className='w-full'
                >
                  <div
                    key={place.name}
                    onClick={handleClickPlace}
                    className='card mx-auto mt-4 border-2 border-gray-200 shadow'
                  >
                    <figure className='h-48'>
                      <img src={place.photo} alt={place.name} />
                    </figure>
                    <div className='card-body'>
                      <h2 className='card-title'>{place.name}</h2>
                      <p>{place.region.name}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>
                <img src={Empty} alt='bg' className='background-contain' />
                <p className='text-center text-xl font-bold'>
                  Ops, no place found.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}
