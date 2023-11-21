import Bg from '../assets/passport_bg.jpg'
import Stamp from '../assets/stamp.svg'
import { motion, LayoutGroup } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
import { PageLayout } from '../component/PageLayout'
import { fetchStamps } from '../services/place.service'

interface Stamp {
  id: number
  name: string
  region: string
  photo: string
  description: string
}

export default function Passport() {
  const [stamps, setStamps] = useState<Stamp[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    fetchStamps()
  }, [])
  return (
    <PageLayout>
      <div className='p-6 '>
        <LayoutGroup>
          {currentPage === 0 && (
            <motion.div
              transition={{ duration: 0.3 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: '90deg' }}
              className='card h-full w-full bg-primary text-primary-content shadow-xl'
            >
              <div className='card-body flex flex-col'>
                <h2 className='card-title text-3xl'>My Travel Passport</h2>
                <div className='mt-8 flex-auto'>
                  <img src={Bg} alt='bg' className='background-contain' />
                </div>
                <div className='stats shadow'>
                  <div className='stat'>
                    <div className='stat-title'>Stamps</div>
                    <div className='stat-value'>12</div>
                    {/* <div className='stat-desc'>21% more than last month</div> */}
                  </div>
                  <div className='stat'>
                    <div className='stat-title'>Regions</div>
                    <div className='stat-value'>2</div>
                  </div>
                </div>
                <div className='card-actions mt-16 justify-center'>
                  {stamps.length > 0 ? (
                    <button
                      className='btn btn-secondary'
                      onClick={() => setCurrentPage(1)}
                    >
                      Open Passport
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(1)}
                      className='btn btn-secondary'
                    >
                      Start Exploring
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          {currentPage === 1 && (
            <motion.div
              transition={{ duration: 0.3 }}
              className='card h-full w-full border-2 border-solid border-primary'
              animate={{ rotateY: 0 }}
              exit={{ rotateY: '-90deg' }}
            >
              <div className='card-body flex flex-col'>
                <h2 className='card-title'>Aalto University</h2>
                <div className='mt-1 flex-auto justify-end'>
                  <img
                    src={Stamp}
                    alt='bg'
                    className='background-contain w-28'
                  />
                </div>
                <p className='text-sm'>
                  As a traveler, I had the pleasure of visiting the Helsinki
                  Cathedral, and it truly left an indelible mark on my journey
                  through Finland's capital city. This architectural
                  masterpiece, perched atop a majestic flight of stairs
                </p>
                <div className='mt-4 grid grid-cols-3 gap-2'>
                  <div className='h-20 w-20 bg-purple-800'>01</div>
                  <div className='h-20 w-20 bg-purple-800'>01</div>
                  <div className='h-20 w-20 bg-purple-800'>01</div>
                  <div className='h-20 w-20 bg-purple-800'>01</div>
                  <div className='h-20 w-20 bg-purple-800'>01</div>
                  <div className='h-20 w-20 bg-purple-800'>01</div>
                </div>
                <div className='mt-4 flex flex-col text-sm'>
                  <div className='flex items-center'>
                    <MapPinIcon className='mr-1 h-6 w-6' />
                    <span>Helsinki Cathedral</span>
                  </div>
                  <div className='flex items-center'>
                    <CalendarDaysIcon className='mr-1 h-6 w-6' />
                    <span>2023-08-11</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </LayoutGroup>
      </div>
    </PageLayout>
  )
}
