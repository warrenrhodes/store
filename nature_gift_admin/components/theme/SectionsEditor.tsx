'use client'

import ImageUpload from '@/components/custom-ui/ImageUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Section, SECTION_TYPES, SectionType } from '@ngift/core/theme'
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash } from 'lucide-react'
import { useState } from 'react'

const LABELS: Record<SectionType, string> = {
  hero: 'Banner',
  featuredProducts: 'Products',
  categoryGrid: 'Categories',
  reviews: 'Customer reviews',
  faq: 'Questions and answers',
  richText: 'Text',
  video: 'Video',
  promoBanner: 'Current promotion',
}

const NEW: { [T in SectionType]: Omit<Extract<Section, { type: T }>, 'id'> } = {
  hero: { type: 'hero' },
  featuredProducts: { type: 'featuredProducts', source: 'featured', limit: 4 },
  categoryGrid: { type: 'categoryGrid' },
  reviews: { type: 'reviews', limit: 6 },
  faq: { type: 'faq', items: [{ question: '', answer: '' }] },
  richText: { type: 'richText', text: '' },
  video: { type: 'video', url: '' },
  promoBanner: { type: 'promoBanner' },
}

type Patch = Record<string, unknown>

/** Add, reorder, hide, edit and remove the home page's sections (validated on save). */
export function SectionsEditor({
  sections,
  onChange,
}: {
  sections: Section[]
  onChange: (sections: Section[]) => void
}) {
  const [adding, setAdding] = useState<SectionType>('richText')
  const update = (i: number, patch: Patch) =>
    onChange(sections.map((s, j) => (j === i ? ({ ...s, ...patch } as Section) : s)))
  const move = (i: number, by: number) => {
    const next = [...sections]
    ;[next[i], next[i + by]] = [next[i + by], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <ol className="space-y-3">
        {sections.map((section, i) => {
          const name = LABELS[section.type]
          return (
            <li
              key={section.id}
              className={`rounded-lg border p-3 ${section.hidden ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-1">
                <span className="mr-auto text-sm font-medium">
                  {i + 1}. {name}
                  {section.hidden ? ' (hidden)' : ''}
                </span>
                <IconButton
                  label={`Move ${name} up`}
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                >
                  <ArrowUp />
                </IconButton>
                <IconButton
                  label={`Move ${name} down`}
                  disabled={i === sections.length - 1}
                  onClick={() => move(i, 1)}
                >
                  <ArrowDown />
                </IconButton>
                <IconButton
                  label={section.hidden ? `Show ${name}` : `Hide ${name}`}
                  onClick={() => update(i, { hidden: !section.hidden })}
                >
                  {section.hidden ? <Eye /> : <EyeOff />}
                </IconButton>
                <IconButton
                  label={`Remove ${name}`}
                  onClick={() => onChange(sections.filter((_, j) => j !== i))}
                >
                  <Trash />
                </IconButton>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Fields section={section} onPatch={patch => update(i, patch)} />
              </div>
            </li>
          )
        })}
      </ol>
      <div className="flex flex-wrap items-end gap-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium">New section</span>
          <select
            value={adding}
            onChange={e => setAdding(e.target.value as SectionType)}
            className="flex h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {SECTION_TYPES.map(t => (
              <option key={t} value={t}>
                {LABELS[t]}
              </option>
            ))}
          </select>
        </label>
        <Button
          type="button"
          variant="outline"
          disabled={sections.length >= 20}
          onClick={() =>
            onChange([
              ...sections,
              { ...NEW[adding], id: crypto.randomUUID().slice(0, 8) } as Section,
            ])
          }
        >
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  )
}

function Fields({ section: s, onPatch }: { section: Section; onPatch: (patch: Patch) => void }) {
  const text = (key: string, label: string, props: { wide?: boolean; long?: boolean } = {}) => (
    <TextField
      key={key}
      id={`${s.id}-${key}`}
      label={label}
      value={String((s as Patch)[key] ?? '')}
      onChange={v => onPatch({ [key]: v })}
      {...props}
    />
  )
  const title = text('title', 'Title (optional)', { wide: true })
  switch (s.type) {
    case 'hero':
      return (
        <>
          {title}
          {text('subtitle', 'Text', { wide: true, long: true })}
          {text('ctaLabel', 'Button label')}
          {text('ctaHref', 'Button link (a page of the store, e.g. /shop)')}
          <div className="space-y-1 sm:col-span-2">
            <p className="text-sm font-medium">Image (else the primary color)</p>
            <ImageUpload
              value={s.imageUrl ? [s.imageUrl] : []}
              onChange={url => onPatch({ imageUrl: url })}
              onRemove={() => onPatch({ imageUrl: null })}
            />
          </div>
        </>
      )
    case 'featuredProducts':
      return (
        <>
          {title}
          <label className="space-y-1 text-sm">
            <span className="font-medium">Which products</span>
            <select
              value={s.source}
              onChange={e => onPatch({ source: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3"
            >
              <option value="featured">Featured</option>
              <option value="new">New</option>
              <option value="all">All</option>
            </select>
          </label>
          <Count section={s} onPatch={onPatch} />
        </>
      )
    case 'reviews':
      return (
        <>
          {title}
          <Count section={s} onPatch={onPatch} />
        </>
      )
    case 'faq':
      return (
        <>
          {title}
          {s.items.map((item, k) => (
            <div key={k} className="space-y-2 rounded border p-2 sm:col-span-2">
              <TextField
                id={`${s.id}-q${k}`}
                label={`Question ${k + 1}`}
                value={item.question}
                onChange={v =>
                  onPatch({
                    items: s.items.map((it, j) => (j === k ? { ...it, question: v } : it)),
                  })
                }
                wide
              />
              <TextField
                id={`${s.id}-a${k}`}
                label="Answer"
                value={item.answer}
                onChange={v =>
                  onPatch({ items: s.items.map((it, j) => (j === k ? { ...it, answer: v } : it)) })
                }
                wide
                long
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={s.items.length === 1}
                onClick={() => onPatch({ items: s.items.filter((_, j) => j !== k) })}
              >
                Remove this question
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="sm:col-span-2 justify-self-start"
            disabled={s.items.length >= 20}
            onClick={() => onPatch({ items: [...s.items, { question: '', answer: '' }] })}
          >
            Add a question
          </Button>
        </>
      )
    case 'richText':
      return (
        <>
          {title}
          {text('text', 'Text (a blank line starts a new paragraph)', { wide: true, long: true })}
        </>
      )
    case 'video':
      return (
        <>
          {title}
          {text('url', 'YouTube or Vimeo address', { wide: true })}
        </>
      )
    default:
      return title
  }
}

function Count({
  section,
  onPatch,
}: {
  section: { id: string; limit: number }
  onPatch: (p: Patch) => void
}) {
  return (
    <label className="space-y-1 text-sm">
      <span className="font-medium">How many (1 to 12)</span>
      <Input
        type="number"
        min={1}
        max={12}
        value={section.limit}
        onChange={e => onPatch({ limit: Number(e.target.value) })}
      />
    </label>
  )
}

function TextField(props: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  wide?: boolean
  long?: boolean
}) {
  const Control = props.long ? Textarea : Input
  return (
    <div className={`space-y-1 ${props.wide ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={props.id} className="text-sm font-medium">
        {props.label}
      </label>
      <Control id={props.id} value={props.value} onChange={e => props.onChange(e.target.value)} />
    </div>
  )
}

function IconButton(props: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactElement
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={props.label}
      title={props.label}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  )
}
