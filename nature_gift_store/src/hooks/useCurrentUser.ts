'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useUser as useClerkUser } from '@clerk/nextjs'
import { useUserStore } from './store/userUserStore'
import { IUser } from '@/lib/api/user'

export function useCurrentUser() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useClerkUser()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { anonymousUserId, setAnonymousUserId, clearAnonymousUserId } = useUserStore()

  const clerkUserData = useMemo(
    () => ({
      clerkId: clerkUser?.id,
      email: clerkUser?.primaryEmailAddress?.emailAddress,
      fullName: clerkUser ? `${clerkUser.firstName} ${clerkUser.lastName}`.trim() : '',
      phone: clerkUser?.primaryPhoneNumber?.phoneNumber,
      avatar: clerkUser?.imageUrl,
    }),
    [clerkUser],
  )

  const fetchAuthenticatedUser = useCallback(async () => {
    const response = await fetch('/api/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clerkUserData),
    })
    const userData = await response.json()
    setUser(userData)
    clearAnonymousUserId()
  }, [clerkUserData, clearAnonymousUserId])

  const fetchAnonymousUser = useCallback(async () => {
    if (anonymousUserId) {
      const response = await fetch(`/api/user/${anonymousUserId}`)
      const userData = await response.json()
      setUser(userData)
    } else {
      const response = await fetch('/api/user/anonymous', { method: 'POST' })
      const userData = await response.json()
      setAnonymousUserId(userData.id)
      setUser(userData)
    }
  }, [anonymousUserId, setAnonymousUserId])

  // Initialize user only when clerk loading state or user state changes
  useEffect(() => {
    if (!clerkLoaded) return

    const initializeUser = async () => {
      try {
        if (clerkUser) {
          await fetchAuthenticatedUser()
        } else {
          await fetchAnonymousUser()
        }
      } catch (error) {
        console.error('Error initializing user:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeUser()
  }, [clerkLoaded, clerkUser, fetchAuthenticatedUser, fetchAnonymousUser])

  const updateUserInfo = useCallback(
    async (data: Partial<IUser>) => {
      if (!user) return

      try {
        const response = await fetch(`/api/user/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const updatedUser = await response.json()
        setUser(updatedUser)
        return updatedUser
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      }
    },
    [user],
  )

  return useMemo(
    () => ({
      user,
      loading,
      updateUserInfo,
    }),
    [user, loading, updateUserInfo],
  )
}
