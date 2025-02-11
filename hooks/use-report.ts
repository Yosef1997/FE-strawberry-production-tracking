'use client'

import { report, reportData } from '@/utils/Report'
import { useState } from 'react'
import { toast } from './use-toast'
import { response } from '@/utils/Response'

export interface reportReq {
  id: number | null
  userId: number
  grossStrawberryWeight: number
  packAQuantity: number
  packBQuantity: number
  packCQuantity: number
  rejectWeight: number
}

const useReport = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreateReport = async (request: reportReq) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/report`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          body: JSON.stringify(request),
          credentials: 'include',
        }
      )

      const data: response = await response.json()
      if (!data.success) {
        toast({
          variant: 'destructive',
          title: data.message,
        })
        return
      }
      setLoading(false)
      toast({
        title: data.message,
      })
      return data
    } catch (error) {
      setError(error)
      console.error('Create report error:', error)
    }
    setLoading(false)
  }

  const handleUpdateReport = async (request: reportReq) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/report`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          body: JSON.stringify(request),
          credentials: 'include',
        }
      )

      const data: report = await response.json()
      setLoading(false)
      return data
    } catch (error) {
      setError(error)
      console.error('Edit report error:', error)
    }
    setLoading(false)
  }

  const handleDeleteReport = async (reportId: number) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/report`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          credentials: 'include',
        }
      )

      const data: response = await response.json()
      if (!data.success) {
        toast({
          variant: 'destructive',
          title: data.message,
        })
        return
      }
      setLoading(false)
      toast({
        title: data.message,
      })
      return data
    } catch (error) {
      setError(error)
      toast({
        variant: 'destructive',
        title: 'Delete report failed',
      })
      console.error('Delete report error:', error)
    }
    setLoading(false)
  }

  return {
    handleCreateReport,
    handleUpdateReport,
    handleDeleteReport,
    loading,
    error,
  }
}
export default useReport
