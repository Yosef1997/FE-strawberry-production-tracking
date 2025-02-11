'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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

const productionSchema = z.object({
  pic: z.coerce.number().nullable(),
  gross: z.coerce.number().positive('Berat Kotor must be a positive number'),
  qtyPackA: z.coerce.number().positive('Qty Pack A must be a positive number'),
  qtyPackB: z.coerce.number().positive('Qty Pack B must be a positive number'),
  qtyPackC: z.coerce.number().positive('Qty Pack C must be a positive number'),
  reject: z.coerce.number().nonnegative('Reject weight cannot be negative'),
})

type ProductionFormData = z.infer<typeof productionSchema>

const Report = () => {
  const form = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      gross: 0,
      qtyPackA: 0,
      qtyPackB: 0,
      qtyPackC: 0,
      reject: 0,
    },
  })

  function onSubmit(values: ProductionFormData) {
    console.log(values)
    form.reset({ pic: null })
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
          <FormFieldInput
            control={form.control}
            name='gross'
            label='Berat Kotor Strawberry yang di pack (kg) per jam'
            placeholder='Berat kotor'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='qtyPackA'
            label='Jumlah Pack A per jam'
            placeholder='Jumlah Pack A'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='qtyPackB'
            label='Jumlah Pack B per jam'
            placeholder='Jumlah Pack B'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='qtyPackC'
            label='Jumlah Pack C per jam'
            placeholder='Jumlah Pack C'
            type='number'
          />
          <FormFieldInput
            control={form.control}
            name='reject'
            label='Reject (kg) per jam'
            placeholder='Berat reject'
            type='number'
          />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default Report
