'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/hooks/store/auth-store'
import { ResetPasswordForm } from './ResetPasswordForm'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

interface AuthFormProps {
  isLogin: boolean
  isResetting: boolean
}

export function AuthForm(props: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(props.isLogin)
  const [isResetting, setIsResetting] = useState(props.isResetting)
  const { setLoading, setError } = useAuthStore()

  useEffect(() => {
    setLoading(false)
    setError(null)
  }, [])

  const toggleForm = (value: boolean) => {
    setError(null)
    setIsLogin(value)
    setIsResetting(false)
  }

  const toggleResetPassword = () => {
    setIsResetting(!isResetting)
  }

  return (
    <div className="flex w-full flex-col items-center">
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
