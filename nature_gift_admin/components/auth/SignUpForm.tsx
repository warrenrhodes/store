'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
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
import { GoogleIcon } from './components/Google'
import { AuthCard } from './AuthCard'
import { useAuthStore } from '@/hooks/auth-store'
import { ROUTES } from '@/lib/router'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
})

type FormData = z.infer<typeof formSchema>

interface SignUpFormProps {
  onToggleForm(): void
}

export function SignUpForm({ onToggleForm }: SignUpFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const { signUp, signInWithGoogle, loading } = useAuthStore()
  // See SignInForm: keeps the form locked until navigation completes.
  const [redirecting, setRedirecting] = useState(false)
  const busy = loading || redirecting

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
      toast({
        title: 'Account created',
        description: 'Please verify your email address',
      })
      onToggleForm()
    } catch (err) {
      console.error(err)
      form.setError('root', {
        type: 'manual',
        message: useAuthStore.getState().error || 'An unexpected error occurred',
      })
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      setRedirecting(true)
      toast({
        title: 'Welcome!',
        description: 'You have successfully signed in with Google',
      })
      router.replace(ROUTES.dashboard)
    } catch {
      form.setError('root', {
        type: 'manual',
        message: useAuthStore.getState().error || 'An unexpected error occurred',
      })
    }
  }

  return (
    <AuthCard title="Create Account" description="Sign up for a new account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={busy} aria-busy={busy} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <Button type="submit" className="w-full">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>

      <div className="text-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button variant="link" onClick={onToggleForm} disabled={busy}>
            Already have an account? Sign In, Sign-In
          </Button>
        </motion.div>
      </div>
    </AuthCard>
  )
}
