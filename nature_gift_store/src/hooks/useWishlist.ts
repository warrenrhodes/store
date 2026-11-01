'use client'

import { syncWishlist } from '@/actions/wishlist'
import { useCallback, useEffect } from 'react'
import { useAuthStore } from './store/auth-store'
import { useWishlistStore } from './store/useWishlistStore'

const SYNC_INTERVAL = 5000 // 5 seconds
const RETRY_AFTER_FAILURE = 5 * 60_000

// Every product card mounts this hook: one sync at a time for the whole page, and no retry
// storm when the server keeps failing (each attempt costs a Firestore read and write).
let syncing = false
let retryAt = 0

export function useWishlist() {
  const { user } = useAuthStore()
  const { items, addItem, removeItem, getPendingChanges, clearPendingChange } = useWishlistStore()

  const syncWithDatabase = useCallback(async () => {
    if (!user) return

    const pendingChanges = getPendingChanges()
    if (pendingChanges.length === 0 || syncing || Date.now() < retryAt) return

    syncing = true
    try {
      const result = await syncWishlist(user.authId, Array.from(items))

      if (result.success) {
        pendingChanges.forEach(({ productId }) => clearPendingChange(productId))
      } else {
        retryAt = Date.now() + RETRY_AFTER_FAILURE
      }
    } catch (error) {
      retryAt = Date.now() + RETRY_AFTER_FAILURE
      console.error('Error syncing wishlist:', error)
    } finally {
      syncing = false
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
