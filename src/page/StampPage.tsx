import { PageLayout } from '../component/PageLayout'
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
import Lottie from 'lottie-react'
import stampAnimation from '../assets/stamp.json'
import { useState } from 'react'
import StampSvg from '../assets/stamp.svg'

export const StampPage = () => {
  const [isStamping, setStampStatus] = useState(false)
  const handleStamp = () => {
    setStampStatus(true)
    setTimeout(() => {
      setStampStatus(false)
    }, 2000)
  }
  return (
    <PageLayout>
      <div className='container'>
        <article className='prose mt-6'>
          <h2>Get a stamp</h2>
        </article>
        <div className='mt-4'>
          <div className='flex items-center'>
            <MapPinIcon className='mr-1 h-6 w-6' />
            <span>Helsinki Cathedral</span>
          </div>
          <span className='ml-6'>10827 people have this stamps</span>
        </div>
        <div>
          <div className='mt-6 flex h-40 w-full items-center justify-center rounded-md border-4 border-dotted border-primary'>
            {/* {!isStamping && (
              <div onClick={handleStamp}>Click me to get stamp!</div>
            )}
            {isStamping && (
              <Lottie
                className='h-full w-full'
                animationData={stampAnimation}
                loop={false}
              />
            )} */}
            <div
              className='align-center flex h-full w-full justify-center bg-contain bg-center bg-no-repeat p-4 text-center'
              style={{ backgroundImage: `url(${StampSvg})` }}
            >
              <span className='flex items-center text-lg'>
                Helsinki Cathedral
              </span>
            </div>
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <button className='btn btn-info btn-outline'>
            Edit my Experience
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
