export enum MessageBadgeType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
export default function MessageBadge({
  text,
  type = MessageBadgeType.WARNING,
}: {
  text: string
  type?: MessageBadgeType
}) {
  console.log('type', type)
  return (
    <div className='fixed top-20 flex w-screen justify-center'>
      <div className={`badge badge-info border-none p-4`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='h-6 w-6 shrink-0 stroke-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
        {text}
      </div>
    </div>
  )
}
