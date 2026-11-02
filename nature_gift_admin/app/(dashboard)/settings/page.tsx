import { FormNotice } from '@/components/layout/FormNotice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getSecretsStatus, saveStoreSettings } from '@/lib/actions/store.actions'
import { StoreRole } from '@/lib/firebase/models'
import { getStoreContext } from '@/lib/tenant'

export const metadata = { title: 'Store settings' }

export default async function SettingsPage(props: {
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const ctx = await getStoreContext()
  if (!ctx) return <p className="text-muted-foreground">No store selected.</p>
  if (ctx.role !== StoreRole.OWNER) {
    return <p className="text-muted-foreground">Only the store owner can change its settings.</p>
  }
  const { saved, error } = await props.searchParams
  const secrets = await getSecretsStatus()
  const { store } = ctx
  const pixelLines = store.settings.metaPixelIds.join('\n')

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Store settings</h1>
        <p className="text-sm text-muted-foreground">
          Status: {store.status}
          {store.paidUntil ? ` · paid until ${store.paidUntil.slice(0, 10)}` : ''}
        </p>
      </div>
      <FormNotice saved={saved} error={error} />
      <form action={saveStoreSettings} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Store</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" defaultValue={store.name} required />
            <Field
              label="Address (/boutique/…)"
              name="slug"
              defaultValue={store.slug}
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
            />
            <Field
              label="WhatsApp (international, without +)"
              name="whatsapp"
              defaultValue={store.settings.whatsapp ?? ''}
              inputMode="tel"
            />
            <Field
              label="Contact email"
              name="contactEmail"
              type="email"
              defaultValue={store.settings.contactEmail ?? ''}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order notifications</CardTitle>
            <CardDescription>One per line.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Area
              label="Emails"
              name="notificationEmails"
              defaultValue={store.settings.notificationEmails.join('\n')}
            />
            <Area
              label="Phones (SMS)"
              name="notificationPhones"
              defaultValue={store.settings.notificationPhones.join('\n')}
            />
            <div className="space-y-2 sm:col-span-2">
              <Field
                label={`Flock webhook URL${secrets.flock ? ' (saved, leave empty to keep it)' : ''}`}
                name="flockWebhookUrl"
                type="url"
                placeholder={secrets.flock ? '••••••••' : 'https://api.flock.com/hooks/…'}
              />
              {secrets.flock && (
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="removeFlock" /> Remove the Flock webhook
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tracking</CardTitle>
            <CardDescription>
              Several containers and Pixels are allowed; every one of them is loaded and receives
              the events.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Area
              label="Google Tag Manager containers (GTM-XXXXXXX, one per line)"
              name="gtmIds"
              defaultValue={store.settings.gtmIds.join('\n')}
            />
            <div className="space-y-2">
              <Area
                label="Meta Pixels: one per line, PIXEL_ID or PIXEL_ID CAPI_TOKEN"
                name="metaPixels"
                defaultValue={pixelLines}
              />
              {secrets.pixelsWithToken.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Conversions API token saved for {secrets.pixelsWithToken.join(', ')}. A Pixel
                  listed without a token keeps its saved token.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Input id={props.name} {...props} />
    </div>
  )
}

function Area({ label, ...props }: { label: string } & React.ComponentProps<typeof Textarea>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Textarea id={props.name} rows={4} {...props} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
