import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import useAnalysis from '@/hooks/use-analysis'
import { ChevronRight, ChevronLeft, ArrowUp, ArrowDown } from 'lucide-react'
import { BestWeatherData, WeatherData, WeatherResponse } from '@/utils/analysis'

const SORT_OPTIONS = [
  { key: 'yield', label: 'Yield' },
  { key: 'reject', label: 'Reject' },
]

const AnalysisTable: React.FC<{
  bestWeather: BestWeatherData
}> = ({ bestWeather }) => {
  const { data, loading, refetch } = useAnalysis()
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
      <div className='mb-2 space-x-2'>
        Sort By{' '}
        {SORT_OPTIONS.map(({ key, label }) => (
          <Button
            key={key}
            variant={sortBy === key ? 'default' : 'outline'}
            onClick={() => handleSort(key)}
          >
            {label}{' '}
            {sortBy === key ? (
              sortDir === 'asc' ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )
            ) : null}
          </Button>
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table>
            <TableCaption className='text-start'>
              A list of yield, reject due to pest, and reject due to diseases
              based on weather data such as humidity, rain fall, and temperature
              each week
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='text-start md:text-center'>
                  Week Number
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Humidity {`(%)`}
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Rain Fall {`(mm)`}
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Temperature {`(C)`}
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Yield {`(kg)`}
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Reject Due To Pest {`(kg)`}
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Reject Due To Diseases {`(kg)`}
                </TableHead>
                <TableHead className='text-start md:text-center'>
                  Total Reject {`(kg)`}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content.length === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center py-4'>
                    No data available
                  </td>
                </tr>
              ) : (
                data?.content.map((content) => (
                  <TableRow
                    key={content.weekNumber}
                    className={`${
                      content.weekNumber === bestWeather?.weekNumber
                        ? 'bg-green-500'
                        : ''
                    }`}
                  >
                    <TableCell className='font-medium text-center'>
                      {content.weekNumber}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.humidity}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.rainFall}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.temperature}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.totalYield}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.rejectDueToPest}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.rejectDueToDisease}
                    </TableCell>
                    <TableCell className='font-medium text-center'>
                      {content.totalReject}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className='flex items-center justify-between mt-4'>
            <div>
              Page {data?.number! + 1} of {data?.totalPages}
            </div>
            <div className='space-x-4'>
              <Button
                variant='outline'
                disabled={data?.first}
                onClick={() => refetch({ page: (data?.number || 1) - 1 })}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant='outline'
                disabled={data?.last}
                onClick={() => refetch({ page: (data?.number || 0) + 1 })}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default AnalysisTable
