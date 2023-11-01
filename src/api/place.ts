import axios from 'axios'
import { API_URL } from '../utils/const'

export interface PlaceListResult {
  count: number
  results: PlaceInfo[]
}

export interface PlaceInfo {
  id: number
  name: string
  category: Category
  description: string
  admission_fee: string
  location_lat: string
  location_lon: string
  region: Region
  photo_url: string
}
export interface Category {
  id: number
  name: string
  description: string
}

export interface Region {
  id: number
  name: string
}

export const fetchPlaceList = async () => {
  try {
    const data = await axios.get(`${API_URL}/place/`)
    return data.data
  } catch (err: any) {
    console.error(err.message)
    throw err
  }
}

export const fetchPlaceDetail = async (placeId: string) => {
  try {
    const data = await axios.get(`${API_URL}/place/${placeId}`)
    return data.data
  } catch (err: any) {
    console.error(err.message)
    throw err
  }
}
