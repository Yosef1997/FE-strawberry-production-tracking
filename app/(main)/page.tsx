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
import ErrorAlert from './_components/ErrorAlert'
import useDashboard from '@/hooks/use-dashboard'

export default function Home() {
  const { result, loading, error } = useDashboard()

  const formatHour = (timestamp: string) => {
    return new Date(timestamp).getHours() + ':00'
  }

  return (
    <div className='space-y-8 p-4'>
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
              <BarChart data={result.hourlyAccumulationPerPIC}>
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
              <BarChart data={result.hourlyAccumulationPerPack}>
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
              <BarChart data={result.productivityMetrics}>
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
              <BarChart data={result.rejectRatios}>
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
              <BarChart data={result.packRatios}>
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
