'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormFieldInput from '@/components/FormFieldInput'
import { login } from '@/actions/auth'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof loginSchema>

const Login = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const router = useRouter()

  function onSubmit(values: FormData) {
    console.log(values)
    try {
      login(values)
        .then(() => {
          toast({
            description: 'Login success',
          })
          form.reset()
          router.push('/')
        })
        .catch(() => {
          toast({
            title: 'Login failed',
            variant: 'destructive',
            description: 'Invalid email or password. Please try again',
          })
        })
    } catch (err) {
      toast({
        title: 'Login failed',
        variant: 'destructive',
        description: 'Invalid email or password. Please try again',
      })
      console.log('Login error: ', err)
    }
  }

  return (
    <div className='flex flex-col items-center w-full p-4'>
      <h2 className='md:text-2xl font-bold mb-4'>Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormFieldInput
            control={form.control}
            name='username'
            label='Username'
            placeholder='Enter your username'
          />
          <FormFieldInput
            control={form.control}
            name='password'
            label='Password'
            type='password'
            placeholder='Enter your password'
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default Login
