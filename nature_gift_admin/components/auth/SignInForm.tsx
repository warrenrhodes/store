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
import { useRouter } from 'next/navigation'
import { AuthCard } from './AuthCard'
import { useAuthStore } from '@/hooks/auth-store'
import { ROUTES } from '@/lib/router'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})

type FormData = z.infer<typeof formSchema>

interface SignInFormProps {
  onToggleForm(): void
  onForgotPassword(): void
}

export function SignInForm({ onToggleForm, onForgotPassword }: SignInFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { signIn, signInWithGoogle, loading, error } = useAuthStore()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password)
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in',
      })
      router.replace(ROUTES.dashboard)
    } catch (err) {
      console.error(err)
      form.setError('root', {
        type: 'manual',
        message: error || 'An unexpected error occurred',
      })
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast({
        title: 'Welcome!',
        description: 'You have successfully signed in with Google',
      })
      router.replace(ROUTES.dashboard)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthCard title="Welcome Back" description="Sign in to your account">
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center space-y-2">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button variant="link" onClick={onToggleForm}>
            {"Don't have an account? Sign Up"}
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button variant="link" onClick={onForgotPassword}>
            Forgot password?
          </Button>
        </motion.div>
      </div>
    </AuthCard>
  )
}
