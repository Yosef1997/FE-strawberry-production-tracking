'use client'
import useAnalysis from '@/hooks/use-analysis'
import { useState } from 'react'
import AnalysisTable from './_components/AnalysisTable'
import AnalysisChart from './_components/AnalysisChart'

const SORT_OPTIONS = [{ key: 'yield', label: 'Yield' }]

const Analysis = () => {
  const { data, loading, bestWeather, refetch } = useAnalysis()
  const [sortBy, setSortBy] = useState<string | null>()
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>()

  const handleSort = (key: string) => {
    const newSortDir = sortBy === key && sortDir === 'asc' ? 'desc' : 'asc'
    setSortBy(key)
    setSortDir(newSortDir)
    refetch({ sortBy: key, sortDir: newSortDir })
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='p-4 lg:p-16 space-y-4 md:space-y-10'>
          <AnalysisChart />

          <AnalysisTable bestWeather={bestWeather!} />

          <p className='border rounded-md p-4 mt-4 md:mt-10'>
            <span className='font-semibold'>Conclusion</span> <br /> Week number{' '}
            {bestWeather?.weekNumber} is the best weather for strawberry
            production{' '}
            {`(humidity: ${bestWeather?.humidity}%, rain fall: ${bestWeather?.rainFall}mm, temperature: ${bestWeather?.temperature})`}
            <br />
            Yield: {bestWeather?.totalYield} kg
            <br />
            Total Reject:{' '}
            {bestWeather?.totalRejectDueToPest! +
              bestWeather?.totalRejectDueToDisease!}{' '}
            kg
            <br />
            Remaining Yield:{' '}
            {bestWeather?.totalYield! -
              (bestWeather?.totalRejectDueToPest! +
                bestWeather?.totalRejectDueToDisease!)}{' '}
            kg
          </p>
        </div>
      )}
    </>
  )
}
export default Analysis
