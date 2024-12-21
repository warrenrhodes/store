'use client'

import { useEffect, useState } from 'react'
import { useUser as useClerkUser } from '@clerk/nextjs'
import { useUserStore } from './store/userUserStore'
import { IUser } from '@/lib/api/user'

export function useCurrentUser() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useClerkUser()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { anonymousUserId, setAnonymousUserId, clearAnonymousUserId } = useUserStore()

  useEffect(() => {
    async function initializeUser() {
      if (!clerkLoaded) return

      try {
        if (clerkUser) {
          // User is authenticated, get or create their account
          const response = await fetch('/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkId: clerkUser.id,
              email: clerkUser.primaryEmailAddress?.emailAddress,
              fullName: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
              phone: clerkUser.primaryPhoneNumber?.phoneNumber,
              avatar: clerkUser.imageUrl,
            }),
          })
          const userData = await response.json()
          setUser(userData)
          clearAnonymousUserId() // Clear anonymous user ID when authenticated
        } else {
          // Create or get anonymous user
          if (anonymousUserId) {
            const response = await fetch(`/api/user/${anonymousUserId}`)
            const userData = await response.json()
            setUser(userData)
          } else {
            const response = await fetch('/api/user/anonymous', {
              method: 'POST',
            })
            const userData = await response.json()
            setAnonymousUserId(userData.id)
            setUser(userData)
          }
        }
      } catch (error) {
        console.error('Error initializing user:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeUser()
  }, [clerkUser, clerkLoaded, anonymousUserId, setAnonymousUserId, clearAnonymousUserId])

  const updateUserInfo = async (data: Partial<IUser>) => {
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
  }

  return {
    user,
    loading,
    updateUserInfo,
  }
}
