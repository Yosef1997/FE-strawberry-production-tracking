'use client'
import { WeatherData, WeatherResponse } from '@/utils/analysis'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from './use-toast'
import { response } from '@/utils/Response'

interface QueryParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  [key: string]: string | number | undefined
}

const useAnalysis = (initialParams: QueryParams = {}) => {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [bestWeather, setBestWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchData = async (params: QueryParams, append: boolean = false) => {
    setLoading(true)

    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value.toString()
        }
        return acc
      },
      {} as Record<string, string>
    )

    const queryString = new URLSearchParams(filteredParams).toString()

    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/analysis?${queryString}`,
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

      setData((prevData) => {
        if (append && prevData) {
          return {
            ...result.data,
            content: [...prevData.content, ...result.data.content],
          }
        }
        return result.data
      })
      setLoading(false)

      router.push(`?${queryString}`, { scroll: false })
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  const handleGetWeatherData = async () => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/analysis/best-weather`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          credentials: 'include',
        }
      )
      const data: response = await response.json()
      setLoading(false)
      setBestWeather(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Get Best WeatherData error:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(initialParams)
    handleGetWeatherData()
  }, [])

  const refetch = useCallback(
    (newParams: QueryParams = {}, append: boolean = false) => {
      const currentParams = Object.fromEntries(searchParams.entries())
      const combinedParams = {
        ...initialParams,
        ...currentParams,
        ...newParams,
      }

      const filteredParams = Object.entries(combinedParams).reduce<QueryParams>(
        (acc, [key, value]) => {
          if (value !== undefined) {
            acc[key as keyof QueryParams] = value
          }
          return acc
        },
        {} as QueryParams
      )

      fetchData(filteredParams, append)
    },
    [searchParams, initialParams]
  )

  return { data, setData, refetch, bestWeather, loading, error }
}

export default useAnalysis
