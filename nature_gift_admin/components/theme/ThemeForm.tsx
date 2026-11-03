'use client'

import ImageUpload from '@/components/custom-ui/ImageUpload'
import { SectionsEditor } from '@/components/theme/SectionsEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { autosaveThemeDraft, saveTheme } from '@/lib/actions/theme.actions'
import {
  contrastProblems,
  hexToHsl,
  hslToHex,
  Section,
  StoreTheme,
  THEME_FONTS,
  THEME_RADII,
  ThemeFont,
  themeOf,
  themeVariables,
} from '@ngift/core/theme'
import { useEffect, useRef, useState } from 'react'

const COLORS = [
  ['primary', 'Primary (buttons, links, prices)'],
  ['background', 'Background'],
  ['foreground', 'Text'],
  ['accent', 'Accent (highlighted areas)'],
] as const
const select = 'flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'

/** Message the storefront applies at once in a preview (ThemePreviewListener). */
const PREVIEW_MESSAGE = 'ngift-theme-preview'

/**
 * Colors, radius, font, logo, favicon and home sections, next to a live preview of the store.
 * Colors, radius and font reach the preview at once (postMessage); every change is also saved
 * as the draft after a short pause, and the preview reloads when the page's content changed.
 */
export function ThemeForm({ initial, previewUrl }: { initial: StoreTheme; previewUrl: string }) {
  const [colors, setColors] = useState({
    primary: hslToHex(initial.colors.primary),
    background: hslToHex(initial.colors.background),
    foreground: hslToHex(initial.colors.foreground),
    accent: hslToHex(initial.colors.accent || initial.colors.background),
  })
  const [logoUrl, setLogoUrl] = useState(initial.logoUrl ?? '')
  const [faviconUrl, setFaviconUrl] = useState(initial.faviconUrl ?? '')
  const [announcement, setAnnouncement] = useState(initial.announcement ?? '')
  const [sections, setSections] = useState<Section[]>(initial.sections ?? [])
  const [radius, setRadius] = useState(initial.radius)
  const [font, setFont] = useState<ThemeFont>(initial.font)
  const [status, setStatus] = useState('')
  const [reloads, setReloads] = useState(0)
  const form = useRef<HTMLFormElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const previewOrigin = new URL(previewUrl).origin
  // The same rule as the server's: shown while picking, so a refused save is no surprise.
  const problems = contrastProblems({
    primary: hexToHsl(colors.primary) ?? '',
    background: hexToHsl(colors.background) ?? '',
    foreground: hexToHsl(colors.foreground) ?? '',
    accent: hexToHsl(colors.accent),
  })

  // Colors, radius and font: straight into the preview, no save needed.
  const vars = themeVariables(
    themeOf({
      preset: initial.preset,
      colors: {
        primary: hexToHsl(colors.primary) ?? initial.colors.primary,
        background: hexToHsl(colors.background) ?? initial.colors.background,
        foreground: hexToHsl(colors.foreground) ?? initial.colors.foreground,
        accent: hexToHsl(colors.accent),
      },
      radius,
      font,
    }),
  )
  const sendVars = () =>
    frame.current?.contentWindow?.postMessage({ type: PREVIEW_MESSAGE, vars }, previewOrigin)
  useEffect(sendVars)

  // Everything: saved as the draft after a pause; the preview reloads if the page changed.
  const content = JSON.stringify([sections, logoUrl, faviconUrl, announcement])
  const lastContent = useRef(content)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setStatus('Saving the draft…')
    const timer = setTimeout(async () => {
      const result = await autosaveThemeDraft(new FormData(form.current!))
      setStatus(result.error ? `Draft not saved: ${result.error}` : 'Draft saved.')
      if (!result.error && content !== lastContent.current) {
        lastContent.current = content
        setReloads(n => n + 1)
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [colors, radius, font, content])

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form ref={form} action={saveTheme} className="space-y-4">
        <input type="hidden" name="preset" value={initial.preset} />
        <input type="hidden" name="logoUrl" value={logoUrl} />
        <input type="hidden" name="faviconUrl" value={faviconUrl} />
        <input type="hidden" name="sections" value={JSON.stringify(sections)} />
        <Card>
          <CardHeader>
            <CardTitle>Look</CardTitle>
            <CardDescription>
              Every text must stay readable (contrast of at least 4.5:1, WCAG AA).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {COLORS.map(([name, label]) => (
                <label key={name} className="flex items-center gap-3 text-sm">
                  <input
                    type="color"
                    name={name}
                    value={colors[name]}
                    onChange={e => setColors({ ...colors, [name]: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border"
                  />
                  {label}
                </label>
              ))}
            </div>
            <div aria-live="polite">
              {problems.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-sm text-destructive">
                  {problems.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium">Corners</span>
                <select
                  name="radius"
                  value={radius}
                  onChange={e => setRadius(Number(e.target.value))}
                  className={select}
                >
                  {THEME_RADII.map(r => (
                    <option key={r} value={r}>
                      {r === 0 ? 'Square' : `${r} rem`}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium">Font</span>
                <select
                  name="font"
                  value={font}
                  onChange={e => setFont(e.target.value as ThemeFont)}
                  className={select}
                >
                  {THEME_FONTS.map(f => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcement bar</CardTitle>
            <CardDescription>
              The line above the header, on every page. Empty: no bar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label htmlFor="announcement" className="sr-only">
              Announcement
            </label>
            <Input
              id="announcement"
              name="announcement"
              maxLength={160}
              placeholder="Delivery in Douala · Pay on delivery"
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo and favicon</CardTitle>
            <CardDescription>Without a logo, the store name is shown as text.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Logo</p>
              <ImageUpload
                value={logoUrl ? [logoUrl] : []}
                onChange={setLogoUrl}
                onRemove={() => setLogoUrl('')}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Favicon (square)</p>
              <ImageUpload
                value={faviconUrl ? [faviconUrl] : []}
                onChange={setFaviconUrl}
                onRemove={() => setFaviconUrl('')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Home page</CardTitle>
            <CardDescription>Sections in order. Hidden sections stay saved.</CardDescription>
          </CardHeader>
          <CardContent>
            <SectionsEditor sections={sections} onChange={setSections} />
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" name="intent" value="draft" variant="secondary">
            Save draft
          </Button>
          <Button type="submit" name="intent" value="publish" disabled={problems.length > 0}>
            Publish
          </Button>
          <p role="status" className="self-center text-sm text-muted-foreground">
            {status}
          </p>
        </div>
      </form>
      <div className="space-y-2 xl:sticky xl:top-20 xl:self-start">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Live preview (draft)</span>
          <a href={previewUrl} target="_blank" rel="noreferrer" className="underline">
            Open in a new tab
          </a>
        </div>
        <iframe
          ref={frame}
          key={reloads}
          src={previewUrl}
          title="Storefront preview"
          onLoad={sendVars}
          className="h-[75vh] w-full rounded-lg border bg-white"
        />
      </div>
    </div>
  )
}
