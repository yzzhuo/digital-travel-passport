import { useRef, useState, useEffect } from 'react'
import { PageLayout } from '../component/PageLayout'
import {
  fetchPlaceDetail,
  saveStamp,
  saveStampPhoto,
  updateStamp,
} from '../services/api'
import {
  CalendarDaysIcon,
  UserGroupIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { type Place } from '../models/place'
import { PageLoading } from '../component/PageLoader'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import { useAuth0 } from '@auth0/auth0-react'
import { StampBox } from '../component/StampBox'
import { Link, useLocation } from 'react-router-dom'
import MessageBadge, { MessageBadgeType } from '../component/MessageBadge'
import NotFound from '../component/NotFound'
import { StampPhotoData } from '../models/stamp'
import ImagePreviewer from '../component/ImagePreviewer'

interface StampFormData {
  notes: string
  time_of_visit: Date
  people: string
  stampPhotos: StampPhotoData[]
}
export const StampPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const placeId = queryParams.get('placeid')
  const [message, setMessage] = useState<string>('')
  const [stampDetail, setStampDetail] = useState(null)
  const [placeDetail, setPlaceDetail] = useState<Place | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [formData, setFormData] = useState<StampFormData>({
    notes: '',
    time_of_visit: new Date(),
    people: '',
    stampPhotos: [],
  })

  const datePickerRef = useRef<HTMLDialogElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    setIsLoading(true)
    if (!placeId) {
      setIsLoading(false)
    } else {
      fetchPlaceDetail(placeId)
        .then((data) => {
          if (!data.error) {
            setPlaceDetail(data.data)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [placeId])

  const showMessage = (message: string) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  const handleGetStamp = async () => {
    const accessToken = await getAccessTokenSilently()
    const data = await saveStamp(accessToken, {
      place: placeDetail.url,
      time_of_visit: dayjs(formData.time_of_visit).toISOString() as string,
    })
    if (data.error) {
      return showMessage(data.error.message)
    }
    setStampDetail({
      ...data.data,
    })
    return showMessage('Your stamp has been saved')
  }

  const handleImageUpload = async () => {
    const files = fileInputRef?.current?.files
    try {
      const accessToken = await getAccessTokenSilently()
      // const imageUrl = await uploadFile(files[0])
      const stampPhoto = await saveStampPhoto(
        accessToken,
        files[0],
        stampDetail.url,
      )
      if (!stampPhoto.error) {
        setFormData({
          ...formData,
          stampPhotos: [...formData.stampPhotos, stampPhoto.data],
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteImage = (photo: string) => {
    setFormData({
      ...formData,
      stampPhotos: formData.stampPhotos.filter((item) => item.photo !== photo),
    })
    setPreviewImage(null)
  }
  const handleSaveStamp = async () => {
    const accessToken = await getAccessTokenSilently()
    const data = await updateStamp(accessToken, stampDetail.id, {
      notes: formData.notes,
      time_of_visit: dayjs(formData.time_of_visit).toISOString(),
      photos: formData.stampPhotos.map((item) => item.url),
    })
    if (data.error) {
      showMessage(data.error.message)
      return
    }
    return showMessage('Your stamp has been saved')
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
      {!isLoading ? (
        placeDetail ? (
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
                onStamp={handleGetStamp}
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
                          {formData.stampPhotos.map((photo) => (
                            <div
                              key={photo.photo}
                              className='mt-2 h-20 w-20 cursor-pointer'
                              onClick={() => setPreviewImage(photo.photo)}
                            >
                              <img src={photo.photo} />
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
                  <Link to={`/passport?stampid=${stampDetail.id}`}>
                    <button className='btn w-full'>Preview</button>
                  </Link>
                </div>
              )}
            </div>
            {previewImage && (
              <ImagePreviewer
                previewImage={previewImage}
                onClose={() => setPreviewImage(null)}
                onDelete={handleDeleteImage}
              />
            )}
          </div>
        ) : (
          <NotFound>Ops, something went wrong</NotFound>
        )
      ) : (
        <PageLoading />
      )}
      {message && (
        <MessageBadge type={MessageBadgeType.SUCCESS} text={message} />
      )}
    </PageLayout>
  )
}
