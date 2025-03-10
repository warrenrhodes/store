'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/hooks/store/auth-store'
import { ResetPasswordForm } from './ResetPasswordForm'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { Alert, AlertDescription } from '../ui/alert'

interface AuthFormProps {
  isLogin: boolean
  isResetting: boolean
}

export function AuthForm(props: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(props.isLogin)
  const [isResetting, setIsResetting] = useState(props.isResetting)
  const { error, setLoading, setError } = useAuthStore()

  useEffect(() => {
    setLoading(false)
    setError(null)
  }, [])

  const toggleForm = (value: boolean) => {
    setIsLogin(value)
    setIsResetting(false)
  }

  const toggleResetPassword = () => {
    setIsResetting(!isResetting)
  }

  return (
    <div className="flex flex-col max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <Alert variant="destructive">
              <div className="flex items-center gap-2 justify-center">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {isResetting ? (
          <ResetPasswordForm onBack={toggleResetPassword} />
        ) : isLogin ? (
          <SignInForm
            onToggleForm={() => toggleForm(false)}
            onForgotPassword={toggleResetPassword}
          />
        ) : (
          <SignUpForm onToggleForm={() => toggleForm(true)} />
        )}
      </AnimatePresence>
    </div>
  )
}
