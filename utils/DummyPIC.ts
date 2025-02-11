export type picData = {
  id: number
  name: string
  username: string
  role: string
  createdAt: string
  deletedAt: string | null
}

export const emptyPicData: picData = {
  id: 0,
  name: '',
  username: '',
  role: '',
  createdAt: '',
  deletedAt: null,
}

export const pic: picData[] = [
  {
    id: 1,
    name: 'Admin Master',
    username: 'adminMaster',
    role: 'MASTER',
    createdAt: '2025-02-09T08:12:35.335722Z',
    deletedAt: null,
  },
  {
    id: 4,
    name: 'Admin 1',
    username: 'admin1',
    role: 'ADMIN',
    createdAt: '2025-02-09T08:42:32.488040Z',
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Andri',
    username: 'pic1',
    role: 'PIC',
    createdAt: '2025-02-09T08:20:00.833189Z',
    deletedAt: null,
  },
  {
    id: 3,
    name: 'Indra',
    username: 'pic2',
    role: 'PIC',
    createdAt: '2025-02-09T08:33:33.673977Z',
    deletedAt: null,
  },
  {
    id: 5,
    name: 'Indri',
    username: 'pic3',
    role: 'PIC',
    createdAt: '2025-02-09T16:16:04.655904Z',
    deletedAt: null,
  },
]
