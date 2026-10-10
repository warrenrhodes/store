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
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AuthCard, AuthError } from '../Auth/AuthCard'
import { GoogleIcon } from './components/Google'
import { useAuthStore } from '@/hooks/store/auth-store'
import { useLocalization } from '@/hooks/useLocalization'

interface SignInFormProps {
  onToggleForm(): void
  onForgotPassword(): void
}

export function SignInForm({ onToggleForm, onForgotPassword }: SignInFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { signIn, signInWithGoogle, loading } = useAuthStore()
  const searchParams = useSearchParams()
  const { localization } = useLocalization()
  // Stays true until navigation unmounts the form: `loading` drops back to false as soon
  // as Firebase answers, which would re-enable the buttons during the redirect.
  const [redirecting, setRedirecting] = useState(false)
  const busy = loading || redirecting

  const formSchema = z.object({
    email: z.string().email(localization.invalidEmail),
    password: z.string().min(1),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSuccess = () => {
    setRedirecting(true)
    toast({ title: localization.signedIn })
    router.replace(searchParams.get('redirect') || '/')
  }
  const onError = () =>
    form.setError('root', {
      message: useAuthStore.getState().error || localization.unexpectedError,
    })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await signIn(data.email, data.password)
      onSuccess()
    } catch {
      onError()
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      onSuccess()
    } catch {
      onError()
    }
  }

  return (
    <AuthCard title={localization.welcomeBack} description={localization.signInToAccount}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={busy} aria-busy={busy} className="space-y-5">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>{localization.password}</FormLabel>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-sm text-primary hover:underline"
                    >
                      {localization.forgotPassword}
                    </button>
                  </div>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthError message={form.formState.errors.root?.message} />

            <Button type="submit" className="h-11 w-full">
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              {localization.signIn}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 w-full"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              {localization.continueWithGoogle}
            </Button>
          </fieldset>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {localization.noAccount}{' '}
        <button
          type="button"
          onClick={onToggleForm}
          disabled={busy}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {localization.createAccount}
        </button>
      </p>
    </AuthCard>
  )
}
