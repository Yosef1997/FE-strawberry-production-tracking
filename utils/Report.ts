export interface report {
  id: number
  pic: string
  grossStrawberryWeight: number
  packAQuantity: number
  packBQuantity: number
  packCQuantity: number
  rejectWeight: number
  createdAt: string
  deletedAt: string | null
}

export const reportData: report = {
  id: 0,
  pic: '',
  grossStrawberryWeight: 0,
  packAQuantity: 0,
  packBQuantity: 0,
  packCQuantity: 0,
  rejectWeight: 0,
  createdAt: '',
  deletedAt: null,
}
