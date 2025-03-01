'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { AuthCard } from './AuthCard'
import { useAuthStore } from '@/hooks/auth-store'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof formSchema>

interface ResetPasswordFormProps {
  onBack(): void
}

export function ResetPasswordForm({ onBack }: ResetPasswordFormProps) {
  const { toast } = useToast()
  const { resetPassword, loading, error } = useAuthStore()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email)
      toast({
        title: 'Password reset email sent',
        description: 'Check your email for further instructions',
      })
      onBack()
    } catch (err) {
      form.setError('root', {
        type: 'manual',
        message: error || 'An unexpected error occurred',
      })
    }
  }

  return (
    <AuthCard title="Reset Password" description="Enter your email to reset your password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center">
        <Button variant="link" onClick={onBack}>
          Back to login
        </Button>
      </div>
    </AuthCard>
  )
}
