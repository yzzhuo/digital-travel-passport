import { Stamp } from '../models/stamp'

export default function Review({ stamps }: { stamps: Stamp[] }) {
  return (
    <div className=''>
      {stamps.map((stamp) => (
        <div className='mt-4' key={stamp.id}>
          <div className='flex'>
            <div className='mr-6'>
              <div className='font-bold'>{stamp.user}</div>
              <div className='text-sm opacity-50'>{stamp.time_of_visit}</div>
            </div>
          </div>
          <p className='ml-0 mt-2'>{stamp.notes}</p>
          {/* <div className='flex gap-2 overflow-auto'>
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
          <img
            src='https://res.cloudinary.com/digitalpassport/image/upload/v1/passport-media/Nordic_Wildlife_Reserve_ipfhyo'
            className='h-20 w-20'
          />
        </div> */}
        </div>
      ))}
    </div>
  )
}
