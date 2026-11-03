'use server'

// The current store's theme (docs/MULTI_TENANT_PLAN.md, 3.7): saved as a draft, previewed on
// the storefront with a signed link, then published. Owner only. Allowed to use `backend`
// directly by scripts/check-tenant.mjs: it only writes stores/{requireStore().storeId}.
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { requireStore, revalidateStorefront } from '@/lib/tenant'
import { parseSections } from '@/lib/validations/theme'
import {
  contrastProblems,
  hexToHsl,
  PRESETS,
  StoreTheme,
  THEME_FONTS,
  THEME_PRESETS,
  THEME_RADII,
  ThemeFont,
  themeOf,
  ThemePreset,
} from '@ngift/core/theme'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const back = (params: Record<string, string>): never =>
  redirect(`/theme?${new URLSearchParams(params)}`)

const imageUrl = z
  .string()
  .trim()
  .max(500)
  .url()
  .startsWith('https://')
  .or(z.literal(''))
  .transform(v => v || null)

/** The theme the form describes, or why it can't be saved (shared by save and autosave). */
function readThemeForm(formData: FormData): { theme: StoreTheme } | { error: string } {
  const text = (name: string) => String(formData.get(name) ?? '').trim()
  const preset = text('preset') as ThemePreset
  if (!THEME_PRESETS.includes(preset)) return { error: 'Unknown preset.' }
  const sections = parseSections(text('sections'))
  if (sections.error !== undefined) return { error: sections.error }
  const logo = imageUrl.safeParse(text('logoUrl'))
  const favicon = imageUrl.safeParse(text('faviconUrl'))
  if (!logo.success || !favicon.success) return { error: 'Logo and favicon: https:// images.' }
  const announcement = text('announcement').replace(/\s+/g, ' ') || null
  if (announcement && announcement.length > 160)
    return { error: 'Announcement: 160 characters at most.' }
  const radius = Number(text('radius'))
  const font = text('font') as ThemeFont
  if (!THEME_RADII.includes(radius as never)) return { error: 'Unknown corner radius.' }
  if (!THEME_FONTS.includes(font)) return { error: 'Unknown font.' }
  const colors = {
    primary: hexToHsl(text('primary')),
    background: hexToHsl(text('background')),
    foreground: hexToHsl(text('foreground')),
    accent: hexToHsl(text('accent')),
  }
  const missing = Object.entries(colors).find(([, v]) => !v)
  if (missing) return { error: `${missing[0]}: pick a color.` }
  const problems = contrastProblems(colors as StoreTheme['colors'])
  if (problems.length) return { error: `Not readable enough. ${problems.join(' · ')}` }
  return {
    theme: {
      preset,
      colors: colors as StoreTheme['colors'],
      radius,
      font,
      logoUrl: logo.data,
      faviconUrl: favicon.data,
      announcement,
      sections: sections.sections,
    },
  }
}

const writeTheme = async (storeId: string, data: Record<string, StoreTheme | null>) => {
  await backend.db
    .collection(CollectionsName.Stores)
    .doc(storeId)
    .update({ ...data, updatedAt: new Date().toISOString() })
  await revalidateStorefront(storeId)
}

/**
 * intent=draft saves the form as the draft (shown only in the preview), intent=publish makes it
 * the storefront's theme. Nothing is saved when a color pair is below 4.5:1 or a section is
 * invalid.
 */
export async function saveTheme(formData: FormData) {
  const { storeId } = await requireStore({ owner: true })
  const intent = String(formData.get('intent') ?? '')
  if (intent !== 'draft' && intent !== 'publish') return back({ error: 'Unknown action.' })
  const read = readThemeForm(formData)
  if ('error' in read) return back({ error: read.error })
  await writeTheme(
    storeId,
    intent === 'publish' ? { theme: read.theme, themeDraft: null } : { themeDraft: read.theme },
  )
  back({
    saved:
      intent === 'publish'
        ? 'Published: the storefront shows it now.'
        : 'Draft saved: only the preview shows it.',
  })
}

/** The editor saves the draft by itself after each pause, for the live preview. */
export async function autosaveThemeDraft(formData: FormData): Promise<{ error?: string }> {
  const { storeId } = await requireStore({ owner: true })
  const read = readThemeForm(formData)
  if ('error' in read) return { error: read.error }
  await writeTheme(storeId, { themeDraft: read.theme })
  return {}
}

/** A preset's colors, radius and font, as the draft (logo, favicon and sections are kept). */
export async function applyThemePreset(formData: FormData) {
  const { storeId, store } = await requireStore({ owner: true })
  const preset = String(formData.get('preset') ?? '') as ThemePreset
  if (!THEME_PRESETS.includes(preset)) return back({ error: 'Unknown preset.' })
  const current = themeOf(store.themeDraft ?? store.theme)
  await backend.db
    .collection(CollectionsName.Stores)
    .doc(storeId)
    .update({
      themeDraft: { ...current, ...PRESETS[preset] } satisfies StoreTheme,
      updatedAt: new Date().toISOString(),
    })
  await revalidateStorefront(storeId)
  back({ saved: `Preset ${preset} applied to the draft.` })
}

/** Drops the draft: the editor and the preview go back to the published theme. */
export async function discardThemeDraft() {
  const { storeId } = await requireStore({ owner: true })
  await backend.db
    .collection(CollectionsName.Stores)
    .doc(storeId)
    .update({ themeDraft: null, updatedAt: new Date().toISOString() })
  await revalidateStorefront(storeId)
  back({ saved: 'Draft discarded.' })
}
