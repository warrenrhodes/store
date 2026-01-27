'use client'

import { syncWishlist } from '@/actions/wishlist'
import { useCallback, useEffect } from 'react'
import { useAuthStore } from './store/auth-store'
import { useWishlistStore } from './store/useWishlistStore'

const SYNC_INTERVAL = 5000 // 5 seconds

export function useWishlist() {
  const { user } = useAuthStore()
  const { items, addItem, removeItem, getPendingChanges, clearPendingChange } = useWishlistStore()

  const syncWithDatabase = useCallback(async () => {
    if (!user) return

    const pendingChanges = getPendingChanges()
    if (pendingChanges.length === 0) return

    try {
      const result = await syncWishlist(user.authId, Array.from(items))

      if (result.success) {
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
