'use client'
import { dashboard, emptyDashborad } from '@/utils/Dashboard'
import { response } from '@/utils/Response'
import { useEffect, useState } from 'react'

interface DateRange {
  startDate: string
  endDate: string
}

const useDashboard = () => {
  const [result, setResult] = useState<dashboard>(emptyDashborad)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleGetDashboard = async () => {
      setLoading(true)
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('sid='))
          ?.split('=')[1]

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/report/dashboard`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: ` Bearer ${token}`,
            },
            body: JSON.stringify({
              startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
              endDate: new Date(),
            }),
            credentials: 'include',
          }
        )
        const data: response = await response.json()
        setLoading(false)
        setResult(data.data)
        return data
      } catch (err) {
        setError(err)
        console.error('Get dashboard error:', error)
      }
      setLoading(false)
    }

    handleGetDashboard()
  }, [])

  return { result, loading, error }
}
export default useDashboard
