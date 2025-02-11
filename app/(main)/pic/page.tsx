'use client'
import { pic } from '@/utils/DummyPIC'
import AlertDelete from './_components/AlertDelete'
const Pic = () => {
  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='md:text-2xl font-bold mb-4 text-center'> Daftar PIC</h2>
      {pic
        .filter((item) => item.role === 'PIC')
        .map((pic, i) => (
          <div
            key={pic.username}
            className='flex max-w-md border rounded-md justify-between p-2 mt-3'
          >
            <p className='font-semibold w-1/2'>{`${i + 1}. ${pic.name}`}</p>
            <div className='flex gap-x-4'>
              <AlertDelete username={pic.username} name={pic.name} />
            </div>
          </div>
        ))}
    </div>
  )
}
export default Pic
