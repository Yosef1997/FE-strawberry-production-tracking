'use client'
import React, { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
// import { useSearchParams } from 'next/navigation'
import AlertHandler from '@/components/AlertHandler'
import ErrorAlert from './_components/ErrorAlert'

interface HourlyAccumulationPIC {
  picName: string
  hour: string
  totalQuantity: number
}

interface HourlyAccumulationPack {
  packType: string
  hour: string
  quantity: number
}

interface ProductivityMetric {
  picName: string
  hourlyProductivity: number
  dailyProductivity: number
  date: string
}

interface RejectRatio {
  timeFrame: string
  rejectRatio: number
  hourly: boolean
}

interface PackRatio {
  timeFrame: string
  packARatio: number
  packBRatio: number
  packCRatio: number
  hourly: boolean
}
export default function Home() {
  // Data PIC
  const picData: HourlyAccumulationPIC[] = [
    { picName: 'Andri', hour: '2025-02-10T00:00:00', totalQuantity: 99 },
    { picName: 'Andri', hour: '2025-02-09T23:00:00', totalQuantity: 893 },
    { picName: 'Indri', hour: '2025-02-10T00:00:00', totalQuantity: 90 },
    { picName: 'Indri', hour: '2025-02-09T23:00:00', totalQuantity: 870 },
    { picName: 'Indra', hour: '2025-02-10T00:00:00', totalQuantity: 92 },
    { picName: 'Indra', hour: '2025-02-09T23:00:00', totalQuantity: 875 },
  ]

  // Data Pack
  const packData: HourlyAccumulationPack[] = [
    { packType: 'A', hour: '2025-02-10T00:00:00', quantity: 134 },
    { packType: 'B', hour: '2025-02-10T00:00:00', quantity: 82 },
    { packType: 'C', hour: '2025-02-10T00:00:00', quantity: 65 },
    { packType: 'A', hour: '2025-02-09T23:00:00', quantity: 1233 },
    { packType: 'B', hour: '2025-02-09T23:00:00', quantity: 782 },
    { packType: 'C', hour: '2025-02-09T23:00:00', quantity: 623 },
  ]

  // Data Productivity
  const productivityData: ProductivityMetric[] = [
    {
      picName: 'Indra',
      hourlyProductivity: 16.116666666666667,
      dailyProductivity: 1.6116666666666666,
      date: '2025-02-09T07:00:00',
    },
    {
      picName: 'Andri',
      hourlyProductivity: 16.533333333333335,
      dailyProductivity: 1.6533333333333333,
      date: '2025-02-09T07:00:00',
    },
    {
      picName: 'Indri',
      hourlyProductivity: 16.0,
      dailyProductivity: 1.6,
      date: '2025-02-09T07:00:00',
    },
  ]

  // Data Reject Ratio
  const rejectRatioData: RejectRatio[] = [
    { timeFrame: '2025-02-09T00:00:00', rejectRatio: 3.25, hourly: true },
    { timeFrame: '2025-02-09T23:00:00', rejectRatio: 3.71, hourly: true },
  ]

  // Data Pack Ratio
  const packRatioData: PackRatio[] = [
    {
      timeFrame: '2025-02-09T00:00:00',
      packARatio: 47.69,
      packBRatio: 29.18,
      packCRatio: 23.13,
      hourly: true,
    },
    {
      timeFrame: '2025-02-09T23:00:00',
      packARatio: 46.74,
      packBRatio: 29.64,
      packCRatio: 23.62,
      hourly: true,
    },
  ]

  // Format timestamp to readable hour
  const formatHour = (timestamp: string) => {
    return new Date(timestamp).getHours() + ':00'
  }
  // const searchParams = useSearchParams()
  // const errorAuth = searchParams.get('error')

  return (
    <div className='space-y-8'>
      {/* {errorAuth && (
        <div className='p-4 w-full'>
          <AlertHandler />
        </div>
      )} */}
      <Suspense fallback={null}>
        <ErrorAlert />
      </Suspense>
      {/* PIC Accumulation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Accumulation per PIC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={picData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='hour' tickFormatter={formatHour} />
                <YAxis />
                <Tooltip
                  labelFormatter={formatHour}
                  formatter={(value: number) => [`${value} units`, 'Quantity']}
                />
                <Legend />
                <Bar
                  dataKey='totalQuantity'
                  fill='#4f46e5'
                  name='Total Quantity'
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pack Type Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Accumulation per Pack Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={packData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='hour' tickFormatter={formatHour} />
                <YAxis />
                <Tooltip
                  labelFormatter={formatHour}
                  formatter={(value: number) => [`${value} units`, 'Quantity']}
                />
                <Legend />
                <Bar dataKey='quantity' fill='#2563eb' name='Quantity' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Productivity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Productivity Metrics per PIC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='picName' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey='hourlyProductivity'
                  fill='#3b82f6'
                  name='Hourly Productivity'
                />
                <Bar
                  dataKey='dailyProductivity'
                  fill='#60a5fa'
                  name='Daily Productivity'
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Reject Ratio Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Reject Ratio per Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={rejectRatioData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='timeFrame' tickFormatter={formatHour} />
                <YAxis />
                <Tooltip
                  labelFormatter={formatHour}
                  formatter={(value: number) => [
                    `${value.toFixed(2)}%`,
                    'Reject Ratio',
                  ]}
                />
                <Legend />
                <Bar dataKey='rejectRatio' fill='#ef4444' name='Reject Ratio' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pack Ratio Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pack Type Distribution Ratio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={packRatioData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='timeFrame' tickFormatter={formatHour} />
                <YAxis />
                <Tooltip
                  labelFormatter={formatHour}
                  formatter={(value: number) => [
                    `${value.toFixed(2)}%`,
                    'Ratio',
                  ]}
                />
                <Legend />
                <Bar dataKey='packARatio' fill='#22c55e' name='Pack A Ratio' />
                <Bar dataKey='packBRatio' fill='#eab308' name='Pack B Ratio' />
                <Bar dataKey='packCRatio' fill='#ec4899' name='Pack C Ratio' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
