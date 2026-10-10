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
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { GoogleIcon } from './components/Google'
import { useAuthStore } from '@/hooks/store/auth-store'

interface SignUpFormProps {
  onToggleForm(): void
}

export function SignUpForm({ onToggleForm }: SignUpFormProps) {
  const { toast } = useToast()
  const { signUp, signInWithGoogle, loading } = useAuthStore()
  const { localization } = useLocalization()
  const router = useRouter()
  const searchParams = useSearchParams()
  // See SignInForm: keeps the form locked until navigation completes.
  const [redirecting, setRedirecting] = useState(false)
  const busy = loading || redirecting

  const formSchema = z.object({
    name: z.string().min(2, localization.nameMin),
    email: z.string().email(localization.invalidEmail),
    password: z
      .string()
      .min(8, localization.passwordMin8)
      .regex(/[A-Z]/, localization.passwordUpper)
      .regex(/[a-z]/, localization.passwordLower)
      .regex(/[0-9]/, localization.passwordNumber)
      .regex(/[\W_]/, localization.passwordSpecial),
  })
  type FormData = z.infer<typeof formSchema>
  const onError = () =>
    form.setError('root', {
      message: useAuthStore.getState().error || localization.unexpectedError,
    })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data.email, data.password, data.name)
      toast({ title: localization.accountCreated, description: localization.verifyEmail })
      onToggleForm()
    } catch {
      onError()
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      setRedirecting(true)
      toast({ title: localization.signedIn })
      router.replace(searchParams.get('redirect') || '/')
    } catch {
      onError()
    }
  }

  return (
    <AuthCard title={localization.createAccount} description={localization.signUpDescription}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={busy} aria-busy={busy} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{localization.fullName}</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormLabel>{localization.password}</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthError message={form.formState.errors.root?.message} />
            <div className="space-y-4">
              <Button type="submit" className="h-11 w-full">
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
                {localization.signUp}
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
            </div>
          </fieldset>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {localization.haveAccount}{' '}
        <button
          type="button"
          onClick={onToggleForm}
          disabled={busy}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {localization.signIn}
        </button>
      </p>
    </AuthCard>
  )
}
