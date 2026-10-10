'use client'

import { Puck, Render, useGetPuck, type Data } from '@puckeditor/core'
import { useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Eye, Monitor, Smartphone, Tablet, X } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { PAGE_CSS, puckConfig } from './puck/config'
import { contentSizeError, readPuckData, writePuckContent } from './puck/serialize'

interface CustomRichTextProps {
  content: string
  onSave: (value: string) => void
  onClose: () => void
}

async function renderHtml(data: Data) {
  const { renderToStaticMarkup } = await import('react-dom/server')
  return (
    renderToStaticMarkup(<Render config={puckConfig} data={data} />)
      // React 19 hoists image preloads as <link> tags; the store doesn't need them.
      .replace(/<link rel="preload"[^>]*>/g, '')
  )
}

// Approximates the store page: Fredoka + Tailwind's preflight resets, which
// the exported HTML has to look right against.
const previewDocument = (html: string) => `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&display=swap">
<style>
*,*::before,*::after{box-sizing:border-box;border:0 solid}
body{margin:0;font-family:Fredoka,system-ui,sans-serif;color:#1f2937;line-height:1.5}
h1,h2,h3,h4,h5,h6,p,figure,blockquote{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}
ul,ol{list-style:none;margin:0;padding:0}a{color:inherit;text-decoration:inherit}
img,video{display:block;max-width:100%;height:auto}
</style></head><body>${html}</body></html>`

const DEVICES = [
  { name: 'Mobile', width: 390, Icon: Smartphone },
  { name: 'Tablet', width: 768, Icon: Tablet },
  { name: 'Desktop', width: 0, Icon: Monitor },
]

function PreviewOverlay({ html, onClose }: { html: string; onClose: () => void }) {
  const [width, setWidth] = useState(0)
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-muted">
      <div className="flex items-center justify-between gap-2 border-b bg-background px-4 py-2">
        <span className="font-medium">Preview</span>
        <div className="flex gap-1" role="group" aria-label="Screen size">
          {DEVICES.map(({ name, width: w, Icon }) => (
            <Button
              key={name}
              type="button"
              size="icon"
              variant={width === w ? 'secondary' : 'ghost'}
              aria-label={name}
              aria-pressed={width === w}
              onClick={() => setWidth(w)}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={onClose}>
          <X className="mr-1 h-4 w-4" />
          Back to editor
        </Button>
      </div>
      <div className="flex flex-1 justify-center overflow-hidden p-4">
        <iframe
          title="Page preview"
          srcDoc={previewDocument(html)}
          sandbox="allow-same-origin allow-popups"
          className="h-full rounded-md border bg-white shadow-sm transition-[width]"
          style={{ width: width ? width : '100%' }}
        />
      </div>
    </div>
  )
}

function RichTextV3({ content, onSave, onClose }: CustomRichTextProps) {
  const initialData = useMemo(() => readPuckData(content), [content])
  const [saving, setSaving] = useState(false)
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)

  const preview = async (data: Data) => setPreviewHtml(await renderHtml(data))

  const save = async (data: Data) => {
    setSaving(true)
    try {
      const value = writePuckContent(await renderHtml(data), data)
      const sizeError = contentSizeError(value)
      if (sizeError) {
        // Keep the editor open so nothing is lost.
        toast({ variant: 'destructive', title: 'Page too large', description: sizeError })
        return
      }
      onSave(value)
      toast({ description: 'Content saved. Remember to update the blog.' })
      onClose()
    } catch (error) {
      console.error(error)
      toast({ variant: 'destructive', description: 'Could not save the page.' })
    } finally {
      setSaving(false)
    }
  }

  // Portaled out of the host <form> (Puck renders its own form), and submit events
  // are stopped because React still bubbles them to the host form through portals.
  return createPortal(
    <div className="fixed inset-0 z-50 bg-background" onSubmit={e => e.stopPropagation()}>
      {/* Same rich-text styles as the canvas, for the field editor in the side panel. */}
      <style>{PAGE_CSS}</style>
      <Puck
        config={puckConfig}
        data={initialData}
        headerTitle="Page builder"
        overrides={{
          headerActions: () => (
            <HeaderActions saving={saving} onSave={save} onPreview={preview} onClose={onClose} />
          ),
        }}
      />
      {previewHtml !== null && (
        <PreviewOverlay html={previewHtml} onClose={() => setPreviewHtml(null)} />
      )}
    </div>,
    document.body,
    // Cast: react-dom's types resolve a second copy of @types/react.
  ) as unknown as ReactNode
}

function HeaderActions({
  saving,
  onSave,
  onPreview,
  onClose,
}: {
  saving: boolean
  onSave: (data: Data) => void
  onPreview: (data: Data) => void
  onClose: () => void
}) {
  const getPuck = useGetPuck()
  return (
    <>
      <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
        Cancel
      </Button>
      <Button type="button" variant="outline" onClick={() => onPreview(getPuck().appState.data)}>
        <Eye className="mr-1 h-4 w-4" />
        Preview
      </Button>
      <Button type="button" onClick={() => onSave(getPuck().appState.data)} disabled={saving}>
        {saving ? 'Saving…' : 'Save'}
      </Button>
    </>
  )
}

export default RichTextV3
