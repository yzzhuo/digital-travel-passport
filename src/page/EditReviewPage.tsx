import { useRef, useState, useEffect } from 'react'
import { PageLayout } from '../component/PageLayout'
import { fetchPlaceDetail, saveStamp } from '../services/api'
import {
  CalendarDaysIcon,
  UserGroupIcon,
  PlusIcon,
  TrashIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid'
import { type Place } from '../models/place'
import { useParams } from 'react-router-dom'
import { uploadFile } from '../utils/uploader'
import { PageLoading } from '../component/PageLoader'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import { useAuth0 } from '@auth0/auth0-react'
import { StampBox } from '../component/StampBox'
import StampImg from '../assets/stamp_sample.jpg'

export const EditReviewPage = () => {
  const { placeId } = useParams()
  const datePickerRef = useRef<HTMLDialogElement>(null)
  const [placeDetail, setPlaceDetail] = useState<Place | null>(null)
  const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const getAccessToken = async () => {}
  const { user, getAccessTokenSilently } = useAuth0()
  const [stampDetail, setStampDetail] = useState(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getAccessToken()
  }, [getAccessTokenSilently, user?.sub])

  const [formData, setFormData] = useState({
    notes: '',
    photos: [],
    time_of_visit: new Date(),
    people: '',
  })

  useEffect(() => {
    fetchPlaceDetail(placeId).then((data) => {
      if (!data.error) {
        setPlaceDetail(data.data)
      }
    })
  }, [placeId])

  const handleStamp = () => {
    setStampDetail({
      url: StampImg,
      id: 1,
    })
  }

  const handleImageUpload = async () => {
    const files = fileInputRef?.current?.files
    try {
      const imageUrl = await uploadFile(files[0])
      setFormData({
        ...formData,
        photos: [...formData.photos, imageUrl],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteImage = (photo: string) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((item) => item !== photo),
    })
    setPreviewImage(null)
  }
  const gotoPreview = () => {
    location.href = `/passport?stampid=${stampDetail.id}`
  }
  const handleSaveStamp = async () => {
    console.log(formData)
    if (!user) {
      alert('Please login to save stamp')
      return
    }
    const accessToken = await getAccessTokenSilently()
    const data = await saveStamp(accessToken, {
      place: placeDetail.url,
      notes: formData.notes,
      time_of_visit: dayjs(formData.time_of_visit).toISOString(),
      // photos: formData.photos,
      // people: formData.people,
    })
    if (data.error) {
      alert(data.error)
      return
    }
    gotoPreview()
  }
  const DatePicker = () => {
    return (
      <>
        <input
          type='checkbox'
          id='stamp_confirm_modal'
          className='modal-toggle'
          checked={isDatePickerOpen}
          onChange={() => setDatePickerOpen(!isDatePickerOpen)}
        />
        <dialog
          role='dialog'
          className='modal modal-bottom'
          ref={datePickerRef}
        >
          <div className='modal-box flex flex-col items-center'>
            <Calendar
              onChange={(value) => {
                setFormData({
                  ...formData,
                  time_of_visit: value as Date,
                })
                setDatePickerOpen(false)
              }}
              value={formData.time_of_visit}
            />
          </div>
        </dialog>
      </>
    )
  }
  return (
    <PageLayout>
      {placeDetail ? (
        <div className='flex w-full flex-col border-opacity-50'>
          <div className='relative w-full'>
            <div
              className='h-32 bg-cover bg-center '
              style={{ backgroundImage: `url(${placeDetail.photo})` }}
            />
          </div>
          <div
            className='container relative rounded-t-xl bg-white pb-16 pt-2'
            style={{ top: -30 }}
          >
            <article className='prose mt-6'>
              <h2>{placeDetail.name}</h2>
            </article>
            <StampBox
              placeDetail={placeDetail}
              stampDetail={stampDetail}
              onStamp={handleStamp}
            />
            {stampDetail && (
              <details className='collapse-arrow collapse mt-4 rounded-none border-b-2 border-t-2 border-base-300'>
                <summary className='collapse-title text-lg font-medium'>
                  Edit your memory
                </summary>
                <div className='collapse-content'>
                  <form className='mt-6'>
                    <label className='block'>
                      <span className='text-md block font-medium text-slate-700'>
                        Your notes
                      </span>
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          notes: e.target.value,
                        })
                      }}
                      placeholder='Write your review of your Travel Journey. Travellers will love to know your experience!'
                      className='textarea textarea-bordered textarea-md mt-2 w-full leading-normal	'
                    ></textarea>
                    <div className='mt-2'>
                      <label className='block'>
                        <span className='text-md block font-medium text-slate-700'>
                          Your photos
                        </span>
                      </label>
                      <div className='grid grid-cols-4 gap-4'>
                        {formData.photos.map((photo) => (
                          <div
                            key={photo}
                            className='mt-2 h-20 w-20 cursor-pointer'
                            onClick={() => setPreviewImage(photo)}
                          >
                            <img src={photo} />
                          </div>
                        ))}
                        <div
                          className='mt-2 h-20 w-20 cursor-pointer bg-gray-300'
                          onClick={() => fileInputRef?.current?.click?.()}
                        >
                          <input
                            type='file'
                            accept='image/*'
                            multiple
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                          />
                          <PlusIcon className='text-white' />
                        </div>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <div className='flex items-center'>
                        <CalendarDaysIcon className='mr-1 h-6 w-6' />
                        <input
                          type='text'
                          onClick={() => {
                            setDatePickerOpen(true)
                          }}
                          value={dayjs(formData.time_of_visit).format(
                            'DD/MM/YYYY',
                          )}
                          placeholder='Type here'
                          onChange={() => {}}
                          className='input input-ghost w-full max-w-xs'
                        />
                        <DatePicker />
                      </div>
                      <div className='flex items-center'>
                        <UserGroupIcon className='mr-1 h-6 w-6' />
                        <input
                          type='text'
                          value={formData.people}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              people: e.target.value,
                            })
                          }}
                          className='input input-ghost w-full max-w-xs'
                        />
                      </div>
                    </div>
                  </form>
                  <div className='mt-8 flex justify-end'>
                    <button
                      className='btn btn-primary w-full'
                      onClick={handleSaveStamp}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </details>
            )}
            {stampDetail && (
              <div className='mt-4 pl-4 pr-4'>
                <button className='btn w-full' onClick={gotoPreview}>
                  Preview
                </button>
              </div>
            )}
          </div>
          {previewImage && (
            <div className='absolute top-0 flex h-full w-full flex-col bg-black'>
              <div className='flex w-full items-center justify-between bg-white pb-2 pt-2'>
                <button
                  className='btn btn-circle btn-ghost'
                  onClick={() => setPreviewImage(null)}
                >
                  <ChevronLeftIcon className='h-6 w-6' />
                </button>
                <button
                  className='btn btn-circle btn-ghost'
                  onClick={() => handleDeleteImage(previewImage)}
                >
                  <TrashIcon className='h-6 w-6' />
                </button>
              </div>
              <div className='flex flex-1 items-center'>
                <img
                  src={
                    previewImage ||
                    'http://res.cloudinary.com/digitalpassport/image/upload/v1700916517/users/v012mttevpp5huwz1630.png'
                  }
                  className='w-full'
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <PageLoading />
      )}
    </PageLayout>
  )
}
