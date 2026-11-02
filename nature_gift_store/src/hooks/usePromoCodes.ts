'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/** Discount codes typed at checkout or carried by an ad link (?promo=CODE), kept across pages. */
export const usePromoCodes = create(
  persist<{
    codes: string[]
    add: (code: string) => void
    remove: (code: string) => void
    clear: () => void
  }>(
    set => ({
      codes: [],
      add: code => {
        const normalized = code.trim().toUpperCase()
        if (!normalized) return
        set(state => ({ codes: [...new Set([...state.codes, normalized])].slice(-5) }))
      },
      remove: code => set(state => ({ codes: state.codes.filter(c => c !== code) })),
      clear: () => set({ codes: [] }),
    }),
    { name: 'promo-codes', storage: createJSONStorage(() => localStorage) },
  ),
)
