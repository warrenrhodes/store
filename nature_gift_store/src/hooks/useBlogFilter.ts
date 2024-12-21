import { create } from 'zustand'

export interface BlogFilters {
  categories: string[]
  tags: string[]
}

interface BlogFilterStore {
  filters: BlogFilters
  setFilters: (filters: BlogFilters) => void
  clearFilters: () => void
}

const useBlogFilter = create<BlogFilterStore>(set => ({
  filters: {
    categories: [],
    tags: [],
  },
  setFilters: (filters: BlogFilters) => set({ filters }),
  clearFilters: () =>
    set({
      filters: {
        categories: [],
        tags: [],
      },
    }),
}))

export default useBlogFilter
