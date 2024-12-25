import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type TemporalUser = {
  fullName?: string
  phone?: string
  email?: string
  address?: string
  city?: string
}

interface TemporalUserData {
  temporalUser: TemporalUser | null
  setUserData: (userData: TemporalUser) => void
  clearTemporalUser: () => void
}

const useTemporalUser = create(
  persist<TemporalUserData>(
    (set, get) => ({
      temporalUser: get()?.temporalUser || null,
      setUserData: (data: TemporalUser) => {
        set({ temporalUser: data })
      },

      clearTemporalUser: () => set({ temporalUser: null }),
    }),
    {
      name: 'temporal-user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useTemporalUser }
