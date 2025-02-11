'use client'
import HyoshiiLogo from '@/public/hyoshii-redlogo.png'
import Image from 'next/image'
import { useSidebar } from './ui/sidebar'
import { Menu } from 'lucide-react'

const Navbar = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <div className='flex w-full items-center justify-between p-4'>
      <Menu onClick={toggleSidebar} className='p-2' size={40} />
      <Image
        src={HyoshiiLogo}
        className='w-14 md:w-[60px]  h-14 md:h-[78px] object-contain'
        alt='Hyoshii'
        width={60}
        height={78}
        priority
      />
    </div>
  )
}
export default Navbar
