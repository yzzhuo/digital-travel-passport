import GoogleMap from 'google-map-react'
import { MapPinIcon } from '@heroicons/react/24/solid'

interface Location {
  lat: number
  lng: number
}

const AnyReactComponent = ({ text }: { text: string }) => (
  <div>
    <MapPinIcon className='h-5 w-5' />
  </div>
)

export default function Map({
  center,
  zoom = 11,
}: {
  center: Location
  zoom?: number
}) {
  const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY
  console.log(key)
  return (
    <div className='h-full w-full'>
      <GoogleMap
        bootstrapURLKeys={{ key }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent lat={center.lat} lng={center.lng} text='My Marker' />
      </GoogleMap>
    </div>
  )
}
