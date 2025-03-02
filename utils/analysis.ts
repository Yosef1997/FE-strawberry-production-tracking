export interface WeatherData {
  weekNumber: number
  humidity: number
  rainFall: number
  temperature: number
  totalYield: number
  totalRejectDueToPest: number
  totalRejectDueToDisease: number
}

export interface SortInfo {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: SortInfo
  offset: number
  unpaged: boolean
  paged: boolean
}

export interface WeatherResponse {
  totalElements: number
  totalPages: number
  size: number
  content: WeatherData[]
  number: number
  sort: SortInfo
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: Pageable
  empty: boolean
}
