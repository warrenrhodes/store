import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  items: Set<string>
  pendingChanges: Map<string, number>
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  clearPendingChange: (productId: string) => void
  getPendingChanges: () => Array<{ productId: string; timestamp: number }>
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: new Set(),
      pendingChanges: new Map(),

      addItem: (productId: string) =>
        set(state => {
          const newItems = new Set(state.items)
          newItems.add(productId)
          const newPendingChanges = new Map(state.pendingChanges)
          newPendingChanges.set(productId, Date.now())
          return { items: newItems, pendingChanges: newPendingChanges }
        }),

      removeItem: (productId: string) =>
        set(state => {
          const newItems = new Set(state.items)
          newItems.delete(productId)
          const newPendingChanges = new Map(state.pendingChanges)
          newPendingChanges.set(productId, Date.now())
          return { items: newItems, pendingChanges: newPendingChanges }
        }),

      clearPendingChange: (productId: string) =>
        set(state => {
          const newPendingChanges = new Map(state.pendingChanges)
          newPendingChanges.delete(productId)
          return { pendingChanges: newPendingChanges }
        }),

      getPendingChanges: () => {
        const state = get()
        return Array.from(state.pendingChanges.entries()).map(([productId, timestamp]) => ({
          productId,
          timestamp,
        }))
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: state => ({
        items: Array.from(state.items),
        pendingChanges: Array.from(state.pendingChanges.entries()),
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        items: new Set(persistedState.items || []),
        pendingChanges: new Map(persistedState.pendingChanges || []),
      }),
    },
  ),
)
