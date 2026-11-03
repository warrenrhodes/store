import { FormNotice } from '@/components/layout/FormNotice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createMyStore } from '@/lib/actions/store.actions'
import { PLATFORM_URL } from '@/lib/storefront'
import { getMyStores } from '@/lib/tenant'
import { STORE_PREFIX } from '@ngift/core/site'
import { PRESETS, THEME_PRESETS } from '@ngift/core/theme'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Create your store' }
export const dynamic = 'force-dynamic'

const LOOKS: Record<(typeof THEME_PRESETS)[number], string> = {
  nature: 'Nature: green, rounded, friendly',
  minimal: 'Minimal: black and white, square, sober',
  bold: 'Bold: purple, very rounded, lively',
}

/** Self-service sign-up, step 2: the store (the account was step 1). */
export default async function OnboardingPage(props: { searchParams: Promise<{ error?: string }> }) {
  if ((await getMyStores()).length > 0) redirect('/')
  const { error } = await props.searchParams

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Create your store</h1>
        <p className="text-sm text-muted-foreground">
          You can prepare your catalogue right away. Your storefront opens once the platform has
          received your subscription payment (cash).
        </p>
      </div>
      <FormNotice error={error} />
      <form action={createMyStore}>
        <Card>
          <CardHeader>
            <CardTitle>Your store</CardTitle>
            <CardDescription>
              You can change all of this later in Store settings and Theme.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store name</Label>
              <Input id="name" name="name" required minLength={2} maxLength={80} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Address</Label>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="shrink-0">
                  {PLATFORM_URL}
                  {STORE_PREFIX}/
                </span>
                <Input
                  id="slug"
                  name="slug"
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  minLength={3}
                  maxLength={40}
                  placeholder="my-store"
                  aria-describedby="slug-help"
                />
              </div>
              <p id="slug-help" className="text-xs text-muted-foreground">
                Lower-case letters, digits and dashes.
              </p>
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Look</legend>
              {THEME_PRESETS.map((preset, i) => (
                <label
                  key={preset}
                  className="flex items-center gap-3 rounded-md border p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="preset"
                    value={preset}
                    defaultChecked={i === 0}
                    required
                  />
                  <span
                    aria-hidden
                    className="h-5 w-5 rounded-full border"
                    style={{ background: `hsl(${PRESETS[preset].colors.primary})` }}
                  />
                  {LOOKS[preset]}
                </label>
              ))}
            </fieldset>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="terms" required className="mt-1" />
              <span>
                I accept the{' '}
                <a
                  href={`${PLATFORM_URL}/legal/vendeurs`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  seller terms
                </a>{' '}
                of the platform.
              </span>
            </label>
            <Button type="submit" className="w-full">
              Create my store
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
