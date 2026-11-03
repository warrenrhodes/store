'use client'

import { Loader2, Plus, Trash } from 'lucide-react'
import { useId, useState } from 'react'
import { Button } from '../ui/button'

interface ImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

/** One image at a time, sent to Cloudinary through /api/media/upload (signed on the server). */
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {
  const id = useId()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('Choose an image.')
    if (file.size > 5 * 1024 * 1024) return setError('5 MB at most.')
    setBusy(true)
    setError('')
    try {
      const body = new FormData()
      body.append('files', file)
      const res = await fetch('/api/media/upload', { method: 'POST', body })
      const url = res.ok ? (await res.json()).data?.files?.[0]?.url : undefined
      if (url) onChange(url)
      else setError('Upload failed.')
    } catch {
      setError('Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-2">
      {value.map(url => (
        <div key={url} className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- any uploaded size */}
          <img src={url} alt="" className="h-20 max-w-[200px] rounded border object-contain" />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            aria-label="Remove the image"
            onClick={() => onRemove(url)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={busy}
        onChange={e => {
          upload(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      <Button type="button" variant="outline" size="sm" asChild disabled={busy}>
        <label htmlFor={id} className="cursor-pointer">
          {busy ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {value.length ? 'Replace image' : 'Upload image'}
        </label>
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default ImageUpload
