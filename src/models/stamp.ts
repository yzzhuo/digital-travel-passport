import { Place } from './place'

export interface Stamp {
  url: string
  id: number
  place: Place
  user: string
  time_of_visit: string
  notes: string
  rating: number
}

export interface StampPostData {
  place: number
  user: string
  time_of_visit?: string
  notes?: string
  rating?: number
}
