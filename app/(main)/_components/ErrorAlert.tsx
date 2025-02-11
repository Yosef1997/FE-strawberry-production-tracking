import AlertHandler from '@/components/AlertHandler'
import { useSearchParams } from 'next/navigation'

const ErrorAlert = () => {
  const searchParams = useSearchParams()
  const errorAuth = searchParams.get('error')

  if (!errorAuth) return null
  return (
    <div className='p-4 w-full'>
      <AlertHandler />
    </div>
  )
}
export default ErrorAlert
