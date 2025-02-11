'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormFieldInput from '@/components/FormFieldInput'
import { pic } from '@/utils/DummyPIC'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useReport, { reportReq } from '@/hooks/use-report'

const PACK_WEIGHTS = {
  A: 0.2,
  B: 0.3,
  C: 0.4,
} as const

const DEFAULT_VALUES = {
  pic: null,
  qtyPackA: 0,
  qtyPackB: 0,
  qtyPackC: 0,
  reject: 0,
} as const

const productionSchema = z.object({
  pic: z.coerce.number().nullable(),
  qtyPackA: z.coerce
    .number()
    .nonnegative('Pack A quantity cannot be negative')
    .default(0),
  qtyPackB: z.coerce
    .number()
    .nonnegative('Pack B quantity cannot be negative')
    .default(0),
  qtyPackC: z.coerce
    .number()
    .nonnegative('Pack C quantity cannot be negative')
    .default(0),
  reject: z.coerce
    .number()
    .nonnegative('Reject weight cannot be negative')
    .default(0),
})

type ProductionFormData = z.infer<typeof productionSchema>

const calculateGrossWeight = (
  qtyPackA: number | string,
  qtyPackB: number | string,
  qtyPackC: number | string,
  reject: number | string
): number => {
  const packA = Number(qtyPackA || 0) * PACK_WEIGHTS.A
  const packB = Number(qtyPackB || 0) * PACK_WEIGHTS.B
  const packC = Number(qtyPackC || 0) * PACK_WEIGHTS.C
  const rejectWeight = Number(reject || 0)

  return Number((packA + packB + packC + rejectWeight).toFixed(2))
}

const GrossWeightDisplay = ({ control }: { control: any }) => {
  const values = useWatch({
    control,
    defaultValue: { qtyPackA: 0, qtyPackB: 0, qtyPackC: 0, reject: 0 },
  })

  const grossWeight = calculateGrossWeight(
    values.qtyPackA!,
    values.qtyPackB!,
    values.qtyPackC!,
    values.reject!
  )

  return (
    <FormItem>
      <FormLabel>Total Gross Weight (kg)</FormLabel>
      <FormControl>
        <input
          type='number'
          className='w-full px-3 py-2 border rounded-md bg-gray-100'
          disabled
          value={grossWeight}
        />
      </FormControl>
    </FormItem>
  )
}

const Report = () => {
  const form = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: DEFAULT_VALUES,
  })
  const { handleCreateReport, loading } = useReport()

  function onSubmit(values: ProductionFormData) {
    const grossWeight = calculateGrossWeight(
      values.qtyPackA,
      values.qtyPackB,
      values.qtyPackC,
      values.reject
    )

    const request: reportReq = {
      id: null,
      userId: values.pic!,
      grossStrawberryWeight: grossWeight,
      packAQuantity: values.qtyPackA,
      packBQuantity: values.qtyPackB,
      packCQuantity: values.qtyPackC,
      rejectWeight: values.reject,
    }
    handleCreateReport(request)
    form.reset(DEFAULT_VALUES)
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='md:text-2xl font-bold mb-4 text-center'>
        Strawberry Production Form
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='pic'
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIC</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select PIC' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pic
                      .filter((item) => item.role === 'PIC')
                      .map((pic) => (
                        <SelectItem
                          key={pic.username}
                          value={pic.id.toString()}
                        >
                          {pic.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <GrossWeightDisplay control={form.control} />

          <FormFieldInput
            control={form.control}
            name='qtyPackA'
            label={`Pack A Quantity (${PACK_WEIGHTS.A}kg each)`}
            placeholder='Enter Pack A quantity'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='qtyPackB'
            label={`Pack B Quantity (${PACK_WEIGHTS.B}kg each)`}
            placeholder='Enter Pack B quantity'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='qtyPackC'
            label={`Pack C Quantity (${PACK_WEIGHTS.C}kg each)`}
            placeholder='Enter Pack C quantity'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='reject'
            label='Reject Weight (kg)'
            placeholder='Enter reject weight'
            type='number'
          />

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Report
