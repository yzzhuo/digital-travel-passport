import { useRef, useState } from 'react'
import { PageLayout } from '../component/PageLayout'
import {
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { uploadFiles } from '../utils/uploader'

export const EditReviewPage = () => {
  const [selectedImages, setSelectedImages] = useState([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImageUpload = async () => {
    const files = fileInputRef?.current?.files
    try {
      const uploadedFiles = await uploadFiles(files)
      console.log(uploadedFiles)
    } catch (error) {
      console.log(error)
    }
    const imagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    )
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...imagesArray,
    ])
  }

  return (
    <PageLayout>
      <div className='container'>
        <article className='prose mt-6'>
          <h2>Edit travel experience</h2>
        </article>
        <form className='mt-6'>
          <label className='block'>
            <span className='block text-sm font-medium text-slate-700'>
              Your review
            </span>
          </label>
          <textarea
            placeholder='Write your review of your Travel Journey. Travellers will love to know your experience!'
            className='textarea textarea-bordered textarea-md mt-2 w-full leading-normal	'
          ></textarea>
          <div className='mt-2'>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Your photos
              </span>
            </label>
            <div className='grid grid-cols-4 gap-4'>
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
              <div className='mt-2 h-20 w-20'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
              <div className='mt-2 h-20 w-20'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
              <div className='mt-2 h-20 w-20'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
              <div className='mt-2 h-20 w-20'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
              <div className='mt-2 h-20 w-20'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <div className='mt-2 flex items-center'>
              <MapPinIcon className='mr-1 h-6 w-6' />
              <span>Helsinki</span>
            </div>
            <div className='mt-2 flex items-center'>
              <CalendarDaysIcon className='mr-1 h-6 w-6' />
              <span>2023-11-01</span>
            </div>
            <div className='mt-2 flex items-center'>
              <UserGroupIcon className='mr-1 h-6 w-6' />
              <span>Yanzhu</span>
            </div>
          </div>
          <div className='mt-8 flex justify-center'>
            <button className='btn  btn-primary w-20'>Save</button>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
