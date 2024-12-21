'use client'

import { useEffect, useCallback } from 'react'
import { useCurrentUser } from './useCurrentUser'
import { useWishlistStore } from './store/useWishlistStore'

const SYNC_INTERVAL = 5000 // 5 seconds

export function useWishlist() {
  const { user } = useCurrentUser()
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
          userId: user.id,
          changes: pendingChanges,
          currentItems: Array.from(items),
        }),
      })

      if (response.ok) {
        // Clear synced changes
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
