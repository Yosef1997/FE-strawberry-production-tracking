'use client'
import { logOut } from '@/actions/auth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import { Home, Inbox, BookUser, LogIn, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Produksi Strawberry',
    url: '/report',
    icon: Inbox,
  },
  {
    title: 'PIC',
    url: '/pic',
    icon: BookUser,
  },
  {
    title: 'Login',
    url: '/login',
    icon: LogIn,
  },
]

const AppSidebar = () => {
  const { status } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await logOut()
    router.push('/login')
  }

  useEffect(() => {
    console.log(status)
  }, [])
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuButton asChild>
                <button onClick={handleLogout} className='flex items-center'>
                  <LogOut />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
