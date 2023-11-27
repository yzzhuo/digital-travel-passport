import React from 'react'
import Empty from '../assets/empty.png'

export default function NotFound({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <img src={Empty} alt='bg' className='background-contain p-6' />
      <p className='text-center text-xl font-bold'>{children}</p>
    </div>
  )
}
