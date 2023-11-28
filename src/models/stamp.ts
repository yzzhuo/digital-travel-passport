import { Place } from './place'

export interface Stamp {
  url: string
  id: string
  place: Place
  user: string
  time_of_visit: string
  notes: string
  rating: number
  // TODO: add photos
  photos: string[]
}

export interface StampPostData {
  place: string
  time_of_visit?: string
  notes?: string
  rating?: number
}
