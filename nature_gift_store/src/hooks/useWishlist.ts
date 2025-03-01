'use client'

import { useEffect, useCallback } from 'react'
import { useWishlistStore } from './store/useWishlistStore'
import { useAuthStore } from './store/auth-store'

const SYNC_INTERVAL = 5000 // 5 seconds

export function useWishlist() {
  const { user } = useAuthStore()
  const { items, addItem, removeItem, getPendingChanges, clearPendingChange } = useWishlistStore()

  const syncWithDatabase = useCallback(async () => {
    if (!user) return

    const pendingChanges = getPendingChanges()
    if (pendingChanges.length === 0) return

    try {
      const response = await fetch('/api/user/wishlist/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          changes: pendingChanges,
          currentItems: Array.from(items),
        }),
      })

      if (response.ok) {
        pendingChanges.forEach(({ productId }) => clearPendingChange(productId))
      }
    } catch (error) {
      console.error('Error syncing wishlist:', error)
    }
  }, [user, items, getPendingChanges, clearPendingChange])

  useEffect(() => {
    const interval = setInterval(syncWithDatabase, SYNC_INTERVAL)
    return () => clearInterval(interval)
  }, [syncWithDatabase])

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (items.has(productId)) {
        removeItem(productId)
      } else {
        addItem(productId)
      }
    },
    [items, addItem, removeItem],
  )

  return {
    isInWishlist: useCallback((productId: string) => items.has(productId), [items]),
    toggleWishlist,
  }
}
