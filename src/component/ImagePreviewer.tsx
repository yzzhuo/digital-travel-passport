import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function ImagePreviewer({
  previewImage,
  onClose,
  onDelete,
}: {
  previewImage: string | null
  onClose: () => void
  onDelete?: (image: string | null) => void
}) {
  return (
    <div className='fixed left-0 top-0 flex h-full w-full flex-col bg-black'>
      <div className='flex w-full items-center justify-between bg-white pb-2 pt-2'>
        <button className='btn btn-circle btn-ghost' onClick={() => onClose()}>
          <XMarkIcon className='h-6 w-6' />
        </button>
        {onDelete && (
          <button
            className='btn btn-circle btn-ghost'
            onClick={() => onDelete(previewImage)}
          >
            <TrashIcon className='h-6 w-6' />
          </button>
        )}
      </div>
      <div className='flex flex-1 items-center'>
        <img
          src={
            previewImage ||
            'http://res.cloudinary.com/digitalpassport/image/upload/v1700916517/users/v012mttevpp5huwz1630.png'
          }
          className='h-full w-full object-contain'
        />
      </div>
    </div>
  )
}
