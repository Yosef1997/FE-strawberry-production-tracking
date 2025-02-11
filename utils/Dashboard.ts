export interface HourlyAccumulationPIC {
  picName: string
  hour: string
  totalQuantity: number
}

export interface HourlyAccumulationPack {
  packType: string
  hour: string
  quantity: number
}

export interface ProductivityMetric {
  picName: string
  hourlyProductivity: number
  dailyProductivity: number
  date: string
}

export interface RejectRatio {
  timeFrame: string
  rejectRatio: number
  hourly: boolean
}

export interface PackRatio {
  timeFrame: string
  packARatio: number
  packBRatio: number
  packCRatio: number
  hourly: boolean
}

export interface dashboard {
  hourlyAccumulationPerPIC: HourlyAccumulationPIC[]
  hourlyAccumulationPerPack: HourlyAccumulationPack[]
  productivityMetrics: ProductivityMetric[]
  rejectRatios: RejectRatio[]
  packRatios: PackRatio[]
}

export const emptyDashborad: dashboard = {
  hourlyAccumulationPerPIC: [],
  hourlyAccumulationPerPack: [],
  productivityMetrics: [],
  rejectRatios: [],
  packRatios: [],
}
