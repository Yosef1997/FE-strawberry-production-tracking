import { Input } from '@/components/ui/input'
import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputHTMLAttributes } from 'react'

interface FormFieldInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  className?: string
}

const FormFieldInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  inputProps,
  className,
}: FormFieldInputProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormFieldInput
