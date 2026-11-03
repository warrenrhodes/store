import { FormNotice } from '@/components/layout/FormNotice'
import { ThemeForm } from '@/components/theme/ThemeForm'
import { Button } from '@/components/ui/button'
import { applyThemePreset, discardThemeDraft } from '@/lib/actions/theme.actions'
import { StoreRole } from '@/lib/firebase/models'
import { PLATFORM_URL, storefrontUrl } from '@/lib/storefront'
import { getStoreContext } from '@/lib/tenant'
import { PREVIEW_PATH, THEME_PRESETS, themeOf } from '@ngift/core/theme'
import { previewToken } from '@ngift/core/theme-preview'

export const metadata = { title: 'Theme' }
export const dynamic = 'force-dynamic'

export default async function ThemePage(props: {
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const ctx = await getStoreContext()
  if (!ctx) return <p className="text-muted-foreground">No store selected.</p>
  if (ctx.role !== StoreRole.OWNER) {
    return <p className="text-muted-foreground">Only the store owner can change its theme.</p>
  }
  const { saved, error } = await props.searchParams
  const { store, storeId } = ctx
  const hasDraft = !!store.themeDraft
  // The draft on the real storefront, for an hour (signed with the secret both apps share).
  const draftUrl = `${storefrontUrl(store)}?preview=${encodeURIComponent(
    previewToken(process.env.REVALIDATE_SECRET ?? '', storeId),
  )}`

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Theme</h1>
        <p className="text-sm text-muted-foreground">
          Changes show in the preview (with sample products) as you make them and are saved as a
          draft. The storefront only
          changes when you publish.
        </p>
      </div>
      <FormNotice saved={saved} error={error} />
      <div className="flex flex-wrap items-end gap-2">
        <form action={applyThemePreset} className="flex flex-wrap items-end gap-2">
          <div className="space-y-1">
            <label htmlFor="preset" className="text-sm font-medium">
              Start from a preset
            </label>
            <select
              id="preset"
              name="preset"
              defaultValue={themeOf(store.themeDraft ?? store.theme).preset}
              className="flex h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {THEME_PRESETS.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="outline">
            Apply preset to the draft
          </Button>
        </form>
        {hasDraft && (
          <form action={discardThemeDraft}>
            <Button type="submit" variant="ghost">
              Discard the draft
            </Button>
          </form>
        )}
      </div>
      {PLATFORM_URL ? (
        <ThemeForm
          initial={themeOf(store.themeDraft ?? store.theme)}
          previewUrl={`${PLATFORM_URL}${PREVIEW_PATH}`}
          draftUrl={draftUrl}
          store={{
            name: store.name,
            whatsapp: store.settings?.whatsapp ?? null,
            email: store.settings?.contactEmail ?? null,
          }}
        />
      ) : (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
        >
          NEXT_PUBLIC_PLATFORM_URL (the storefront&apos;s address) is not set in the admin&apos;s
          environment: no preview and no store links.
        </p>
      )}
    </div>
  )
}
