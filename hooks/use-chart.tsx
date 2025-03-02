import { WeatherResponse } from '@/utils/analysis'
import { useEffect, useState } from 'react'
import { toast } from './use-toast'
import { response } from '@/utils/Response'

const useChart = () => {
  const [dataChart, setDataChart] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>()

  const fetchDataChart = async () => {
    setLoading(true)

    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/analysis?size=52`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        }
      )

      const result: response = await response.json()

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: 'Oops! Something went wrong',
          description: result.message,
        })
        return
      }

      setDataChart(result.data)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDataChart()
  }, [])

  return { dataChart, loading, error }
}
export default useChart
