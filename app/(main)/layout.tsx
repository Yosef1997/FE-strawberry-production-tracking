import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-svw overflow-hidden'>
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}
