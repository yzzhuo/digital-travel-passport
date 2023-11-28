import { Place } from './place'
export interface StampList {
  count: number
  next: string
  previous: string
  results: Stamp[]
}

export interface Stamp {
  url: string
  id: string
  place: Place
  user: string
  time_of_visit: string
  notes: string
  rating: number
  photos: Photo[]
}

export interface StampPostData {
  place: string
  time_of_visit: string
  notes: string
  rating: number
  photos: string[]
}

export interface StampPhotoData {
  id: number
  photo: string
  stamp: string
  url: string
}

export interface Photo {
  url: string
  id: number
  photo: string
}
