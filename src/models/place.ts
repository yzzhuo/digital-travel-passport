export interface PlaceListResult {
  count: number
  results: Place[]
}

export interface Place {
  id: number
  name: string
  category: Category
  description: string
  admission_fee: string
  location_lat: string
  location_lon: string
  region: Region
  photo: string
  url: string
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
