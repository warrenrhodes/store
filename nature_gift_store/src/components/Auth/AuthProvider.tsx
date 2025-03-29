'use client'
import { useAuthStore } from '@/hooks/store/auth-store'
import { useEffect } from 'react'

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const { initializeAuth } = useAuthStore()
  useEffect(() => {
    initializeAuth()
  }, [])
  return <div>{props.children}</div>
}
