import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  anonymousUserId: string | null
  setAnonymousUserId: (id: string) => void
  clearAnonymousUserId: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      anonymousUserId: null,
      setAnonymousUserId: id => set({ anonymousUserId: id }),
      clearAnonymousUserId: () => set({ anonymousUserId: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
