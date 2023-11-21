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
  photo: string
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
