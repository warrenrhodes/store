import { Locale, localization } from '@/lib/localizations'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LocaleStore {
  locale: Locale
  setLocale: (localToSet: Locale) => void
}

const useLocale = create(
  persist<LocaleStore>(
    (set, get) => ({
      locale: localization.defaultLocale,
      setLocale: (localToSet: Locale) => {
        set({ locale: localToSet })
      },
    }),
    {
      name: 'lang',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useLocale }
