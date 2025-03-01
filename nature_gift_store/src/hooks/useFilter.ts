import { Filters } from '@/lib/firebase/models'
import { create } from 'zustand'

const MIN_PRICE = 0
const MAX_PRICE = 100000
interface FilterStore {
  MIN_PRICE: number
  MAX_PRICE: number
  filters: Filters
  setFilters: (filters: Filters) => void
  clearFilters: () => void
}

const useFilter = create<FilterStore>(set => ({
  MIN_PRICE: MIN_PRICE,
  MAX_PRICE: MAX_PRICE,
  filters: {
    search: '',
    categories: [],
    priceRange: [MIN_PRICE, MAX_PRICE],
    sortBy: 'newest',
    colors: [],
    tags: [],
  },
  setFilters: (filters: Filters) => set({ filters }),
  clearFilters: () =>
    set({
      filters: {
        search: '',
        categories: [],
        priceRange: [MIN_PRICE, MAX_PRICE],
        sortBy: 'newest',
        colors: [],
        tags: [],
      },
    }),
}))

export default useFilter
