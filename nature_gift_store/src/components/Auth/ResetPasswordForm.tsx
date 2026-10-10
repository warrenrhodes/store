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
import { AuthCard, AuthError } from '../Auth/AuthCard'
import { useLocalization } from '@/hooks/useLocalization'
import { useAuthStore } from '@/hooks/store/auth-store'

interface ResetPasswordFormProps {
  onBack(): void
}

export function ResetPasswordForm({ onBack }: ResetPasswordFormProps) {
  const { toast } = useToast()
  const { resetPassword, loading } = useAuthStore()
  const { localization } = useLocalization()
  const formSchema = z.object({ email: z.string().email(localization.invalidEmail) })
  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email)
      toast({ title: localization.resetEmailSent, description: localization.checkEmail })
      onBack()
    } catch {
      form.setError('root', {
        message: useAuthStore.getState().error || localization.unexpectedError,
      })
    }
  }

  return (
    <AuthCard
      title={localization.resetPassword}
      description={localization.resetPasswordDescription}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localization.email}</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AuthError message={form.formState.errors.root?.message} />
          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
            {localization.sendResetLink}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Button variant="link" onClick={onBack}>
          {localization.backToSignIn}
        </Button>
      </div>
    </AuthCard>
  )
}
