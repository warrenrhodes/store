'use client'

import { DictWords, dictionary } from '@/lib/localizations'
import { useLocale } from './useLocale'

export const useLocalization = () => {
  const { locale } = useLocale()

  const localization = new Proxy({} as Record<DictWords, string>, {
    get: (target, prop: DictWords) => {
      return dictionary[prop][locale] || prop
    },
  })

  return { localization }
}
