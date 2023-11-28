export interface UserListResult {
  count: number
  next: boolean
  previous: number
  results: User[]
}

export interface User {
  url: string
  id: number
  username: string
  country?: string
  created_at: string
  updated_at: string
}
