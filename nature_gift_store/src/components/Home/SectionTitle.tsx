'use client'

import { useLocalization } from '@/hooks/useLocalization'
import { DictWords } from '@/lib/localizations'

/** A section's heading: the owner's title, else the default one in the visitor's language. */
export function SectionTitle({
  title,
  fallback,
}: {
  title?: string | null
  fallback: `${DictWords}`
}) {
  const { localization } = useLocalization()
  return (
    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
      {title || localization[fallback as DictWords]}
    </h2>
  )
}
