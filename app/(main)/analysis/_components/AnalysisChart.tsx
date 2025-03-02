'use client'
import { Skeleton } from '@/components/ui/skeleton'
import useAnalysis from '@/hooks/use-analysis'
import useChart from '@/hooks/use-chart'
import { WeatherResponse } from '@/utils/analysis'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const AnalysisChart = () => {
  const { dataChart, loading } = useChart()

  return (
    <>
      {loading ? (
        <Skeleton className='w-full h-[500px] rounded-lg shadow-md'>
          <Skeleton className='w-1/3 h-6 mb-4' />
          <Skeleton className='w-full h-[90%]' />
        </Skeleton>
      ) : (
        <div className='w-full h-[500px] bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>
            Weekly Strawberry Yield Statistics
          </h2>
          <ResponsiveContainer width='100%' height='90%'>
            <LineChart data={dataChart?.content}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='weekNumber'
                label={{ value: 'Week', position: 'insideBottom', offset: -5 }}
              />
              <YAxis />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='humidity'
                stroke='#8884d8'
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='rainFall'
                stroke='#82ca9d'
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='temperature'
                stroke='#ffc658'
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='totalYield'
                stroke='#ff7300'
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='totalRejectDueToPest'
                stroke='#d62728'
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='totalRejectDueToDisease'
                stroke='#2ca02c'
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  )
}
export default AnalysisChart
