import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { fetchPlaceList } from '../services/api'
import { useEffect, useState } from 'react'
import { type Place } from '../models/place'
import { Link } from 'react-router-dom'
import { PageLayout } from '../component/PageLayout'
import { PageLoading } from '../component/PageLoader'
import NotFound from '../component/NotFound'

export default function AttractionList() {
  const [loading, setLoading] = useState<boolean>(true)
  const [places, setPlaces] = useState<Place[]>([])

  // use fo search box
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedFilters, setSelectedFilters] = useState({
    regions: [],
    activities: [],
    admissionFee: [],
  })
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

  const handleClickPlace = () => {} // Click any attraction

  // search a place
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // new added
  const handleCheckboxChange = (category, value) => {
    // Update the selectedFilters state based on checkbox changes
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }))
  }

  // click clear button
  const handleClear = () => {
    setSelectedFilters({
      regions: [],
      activities: [],
      admissionFee: [],
    })
    // for track changes
    // console.log(selectedFilters);
  } // Click clear button

  // click save button
  function handleSave() {
    // to froneend
  } // Click save button

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
              value={searchTerm}
              onChange={handleSearchChange}
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
                    <h3 className='flex-1 text-lg font-bold'>
                      Choose your filter options
                    </h3>
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
                        <input
                          type='checkbox'
                          className='checkbox mr-2'
                          checked={selectedFilters.regions.includes('Helsinki')}
                          onChange={() =>
                            handleCheckboxChange('regions', 'Helsinki')
                          }
                        />
                        <span className='label-text flex-1'>Helsinki</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='checkbox mr-2'
                          checked={selectedFilters.regions.includes('Espoo')}
                          onChange={() =>
                            handleCheckboxChange('regions', 'Espoo')
                          }
                        />
                        <span className='label-text flex-1'>Espoo</span>
                      </label>
                    </div>
                  </div>
                  <div className='divider'></div>
                  <div>
                    <h3 className='text-md font-bold'>Activities</h3>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='checkbox mr-2'
                          checked={selectedFilters.activities.includes(
                            'Design and art',
                          )}
                          onChange={() =>
                            handleCheckboxChange('activities', 'Design and art')
                          }
                        />
                        <span className='label-text flex-1'>
                          Design and art
                        </span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='checkbox mr-2'
                          checked={selectedFilters.activities.includes(
                            'Shopping',
                          )}
                          onChange={() =>
                            handleCheckboxChange('activities', 'Shopping')
                          }
                        />
                        <span className='label-text flex-1'>Shopping</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='checkbox mr-2'
                          checked={selectedFilters.activities.includes(
                            'Food and drinks',
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              'activities',
                              'Food and drinks',
                            )
                          }
                        />
                        <span className='label-text flex-1'>
                          Food and drinks
                        </span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='checkbox mr-2'
                          checked={selectedFilters.activities.includes(
                            'Attractions',
                          )}
                          onChange={() =>
                            handleCheckboxChange('activities', 'Attractions')
                          }
                        />
                        <span className='label-text flex-1'>Attractions</span>
                      </label>
                    </div>
                  </div>
                  <div className='divider'></div>
                  <div>
                    <h3 className='text-md font-bold'>Admission Fee</h3>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='radio mr-2'
                          checked={selectedFilters.admissionFee.includes('All')}
                          onChange={() =>
                            handleCheckboxChange('admissionFee', 'All')
                          }
                        />
                        <span className='label-text flex-1'>All</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer'>
                        <input
                          type='checkbox'
                          className='radio mr-2'
                          checked={selectedFilters.admissionFee.includes(
                            'Free',
                          )}
                          onChange={() =>
                            handleCheckboxChange('admissionFee', 'Free')
                          }
                        />
                        <span className='label-text flex-1'>Free</span>
                      </label>
                    </div>
                  </div>
                  <div className='divider'></div> {/* MN - divider added */}
                  {/* MN - buttons added */}
                  <div className='mt-4 flex justify-center'>
                    <button
                      type='button'
                      className='btn mr-2'
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {places.length ? (
              places
                .filter((place) =>
                  place.name.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((place) => (
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
                <NotFound> Ops, no place found.</NotFound>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}
