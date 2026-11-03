// The theme a store's pages show (docs/MULTI_TENANT_PLAN.md, 3.7).
import { contrastProblems, StoreTheme, themeOf } from '@ngift/core/theme'
import { isPreviewToken, PREVIEW_HEADER } from '@ngift/core/theme-preview'
import { headers } from 'next/headers'
import { cache } from 'react'
import type { SiteStore } from './api/utils'

export type SiteTheme = {
  theme: StoreTheme
  /** The store set a theme (or a draft is previewed): its CSS variables are injected. */
  custom: boolean
  /** Opened from the admin's theme editor (valid token), with or without a draft yet. */
  preview: boolean
}

/**
 * The draft with a valid preview token (?preview=, signed by the admin), else the published
 * theme; the `nature` preset (globals.css) on the marketplace and for stores without theme.
 * Colors that fail the contrast rules (written around the admin) fall back to the preset's.
 */
export const siteTheme = cache(async (store: SiteStore | null): Promise<SiteTheme> => {
  if (!store) return { theme: themeOf(null), custom: false, preview: false }
  const token = (await headers()).get(PREVIEW_HEADER)
  const preview = isPreviewToken(process.env.REVALIDATE_SECRET, store.id, token)
  const saved = (preview && store.themeDraft) || store.theme
  const theme = themeOf(saved)
  if (contrastProblems(theme.colors).length) theme.colors = themeOf({ preset: theme.preset }).colors
  return { theme, custom: !!saved, preview }
})
