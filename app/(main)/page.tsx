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
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts'
import ErrorAlert from './_components/ErrorAlert'
import useDashboard from '@/hooks/use-dashboard'

export default function Home() {
  const { result, loading, error } = useDashboard()

  const formatHour = (timestamp: string) => {
    return new Date(timestamp).getHours() + ':00'
  }

  return (
    <div className=' p-4'>
      <h2 className='md:text-2xl font-bold mb-4 text-center'>Dashboard</h2>
      <Suspense fallback={null}>
        <ErrorAlert />
      </Suspense>
      <div className='grid gap-y-8 lg:grid-cols-2 xl:grid-cols-3 lg:gap-4'>
        {/* PIC Accumulation Chart */}

        <Card>
          <CardHeader>
            <CardTitle>Hourly Accumulation Per PIC</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={result.hourlyAccumulationPerPIC}>
                <XAxis dataKey='picName' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='totalQuantity' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
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
                <LineChart
                  data={result.hourlyAccumulationPerPack}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='hour' tickFormatter={formatHour} />
                  <YAxis />
                  <Tooltip labelFormatter={formatHour} />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='packAQuantity'
                    stroke='#8884d8'
                    name='Pack A'
                  />
                  <Line
                    type='monotone'
                    dataKey='packBQuantity'
                    stroke='#82ca9d'
                    name='Pack B'
                  />
                  <Line
                    type='monotone'
                    dataKey='packCQuantity'
                    stroke='#ff7300'
                    name='Pack C'
                  />
                </LineChart>
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
                    fill='#8884d8'
                    name='Hourly Productivity'
                  />
                  <Bar
                    dataKey='dailyProductivity'
                    fill='#82ca9d'
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
                <AreaChart
                  data={result.rejectRatios}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='timeFrame' tickFormatter={formatHour} />
                  <YAxis />
                  <Tooltip labelFormatter={formatHour} />
                  <Area
                    type='monotone'
                    dataKey='rejectRatio'
                    stroke='#ff4d4d'
                    fill='#ffcccc'
                    name='Reject Ratio (%)'
                  />
                </AreaChart>
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
                <LineChart
                  data={result.packRatios}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='timeFrame' tickFormatter={formatHour} />
                  <YAxis domain={[20, 50]} />
                  <Tooltip labelFormatter={formatHour} />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='packARatio'
                    stroke='#4CAF50'
                    name='Pack A'
                  />
                  <Line
                    type='monotone'
                    dataKey='packBRatio'
                    stroke='#FFC107'
                    name='Pack B'
                  />
                  <Line
                    type='monotone'
                    dataKey='packCRatio'
                    stroke='#F44336'
                    name='Pack C'
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
