import { createPortal } from 'react-dom'
import { XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

export const Alert = ({
  text,
  type,
}: {
  text: string
  type?: 'error' | 'info'
}) => {
  // unmount the div after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      // unmount this component
    }, 3000)
  })
  return (
    <div id='message' className={`'alert' alert-${type} fixed top-20 flex`}>
      {type == 'error' && <XCircleIcon className='mr-2 h-6 w-6' />}
      {type == 'info' && <InformationCircleIcon className='mr-2 h-6 w-6' />}
      <span>{text}</span>
    </div>
  )
}

export const showAlert = (text: string) => {
  // create div with id alert
  const div = document.createElement('div')
  div.id = 'alert'
  // make div fixed
  div.style.position = 'fixed'
  div.style.top = '20px'
  div.style.height = '100%'
  div.style.width = '100%'
  document.body.appendChild(div)
  // TODO: figure out why this doesn't work
  createPortal(<Alert text={text} />, document.body)
  setTimeout(() => {
    document.body.removeChild(div)
  }, 3000)
}
