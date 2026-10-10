'use client'

import type { ComponentConfig, Config, Field, Slot } from '@puckeditor/core'
import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

// Everything is styled inline: the exported HTML is rendered on the store,
// which doesn't ship this app's CSS. Responsiveness comes from flex-wrap and
// auto-fit grids, so layouts stack on phones without media queries.

/* ---------- Tailwind-like scales ---------- */

const BRAND = '#017d59'

// Tailwind palette, shades 100/300/500/700.
const PALETTE: [string, string[]][] = [
  ['slate', ['#f1f5f9', '#cbd5e1', '#64748b', '#334155']],
  ['red', ['#fee2e2', '#fca5a5', '#ef4444', '#b91c1c']],
  ['orange', ['#ffedd5', '#fdba74', '#f97316', '#c2410c']],
  ['amber', ['#fef3c7', '#fcd34d', '#f59e0b', '#b45309']],
  ['green', ['#dcfce7', '#86efac', '#22c55e', '#15803d']],
  ['emerald', ['#d1fae5', '#6ee7b7', '#10b981', '#047857']],
  ['sky', ['#e0f2fe', '#7dd3fc', '#0ea5e9', '#0369a1']],
  ['blue', ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8']],
  ['violet', ['#ede9fe', '#c4b5fd', '#8b5cf6', '#6d28d9']],
  ['pink', ['#fce7f3', '#f9a8d4', '#ec4899', '#be185d']],
  ['rose', ['#ffe4e6', '#fda4af', '#f43f5e', '#be123c']],
]
const SHADES = ['100', '300', '500', '700']

const scaleField = (label: string, scale: Record<string, number>): Field => ({
  type: 'select',
  label,
  options: Object.entries(scale).map(([name, px]) => ({ label: `${name} (${px}px)`, value: px })),
})

const SPACING = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
  '20': 80,
  '24': 96,
}
const RADIUS = { none: 0, sm: 4, md: 8, lg: 12, xl: 16, '2xl': 24, full: 999 }
const FONT_SIZE = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
}
const MAX_WIDTH = { sm: 640, md: 768, lg: 1024, xl: 1100, '2xl': 1280, full: 0 }
const SHADOWS: Record<string, string> = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,.08)',
  md: '0 4px 12px rgba(0,0,0,.10)',
  lg: '0 10px 24px rgba(0,0,0,.12)',
  xl: '0 20px 40px rgba(0,0,0,.16)',
}
const shadowField: Field = {
  type: 'select',
  label: 'Shadow',
  options: Object.keys(SHADOWS).map(v => ({ label: v, value: v })),
}

// Large text scales down on small screens.
const fontSize = (px: number) =>
  px >= 30 ? `clamp(${Math.round(px * 0.7)}px, ${(px / 9).toFixed(1)}vw, ${px}px)` : px

/* ---------- Custom fields ---------- */

const inputStyle: CSSProperties = {
  width: '100%',
  padding: 8,
  border: '1px solid #ddd',
  borderRadius: 4,
  fontSize: 13,
}

const GRADIENT_PRESETS = [
  'linear-gradient(135deg,#017d59,#22c55e)',
  'linear-gradient(135deg,#10b981,#84cc16)',
  'linear-gradient(135deg,#0ea5e9,#10b981)',
  'linear-gradient(135deg,#3b82f6,#8b5cf6)',
  'linear-gradient(135deg,#8b5cf6,#ec4899)',
  'linear-gradient(135deg,#f43f5e,#ec4899)',
  'linear-gradient(135deg,#f97316,#f59e0b)',
  'linear-gradient(135deg,#334155,#0f172a)',
]
const GRADIENT_RE = /^linear-gradient\((\d+)deg,\s*(#[0-9a-f]{6}),\s*(#[0-9a-f]{6})\)$/i

export const isGradient = (value?: string) => !!value && /gradient\(/.test(value)

function GradientBuilder({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const [, angle = '135', from = '#10b981', to = '#84cc16'] = value?.match(GRADIENT_RE) ?? []
  const set = (a: string, f: string, t: string) => onChange(`linear-gradient(${a}deg,${f},${t})`)
  const colorStyle: CSSProperties = {
    width: 36,
    height: 34,
    padding: 0,
    border: 'none',
    background: 'none',
  }
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <span style={{ fontSize: 12, width: 56 }}>Gradient</span>
      <input
        type="color"
        aria-label="Gradient start"
        value={from}
        onChange={e => set(angle, e.target.value, to)}
        style={colorStyle}
      />
      <input
        type="color"
        aria-label="Gradient end"
        value={to}
        onChange={e => set(angle, from, e.target.value)}
        style={colorStyle}
      />
      <select
        aria-label="Gradient angle"
        value={angle}
        onChange={e => set(e.target.value, from, to)}
        style={{ ...inputStyle, width: 'auto' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
          <option key={a} value={a}>
            {a}°
          </option>
        ))}
      </select>
    </div>
  )
}

function ColorInput({
  value,
  onChange,
  gradient,
}: {
  value?: string
  onChange: (v: string) => void
  gradient?: boolean
}) {
  const swatch = (color: string, title: string) => (
    <button
      key={title}
      type="button"
      title={title}
      aria-label={title}
      onClick={() => onChange(color)}
      style={{
        width: 20,
        height: 20,
        borderRadius: 4,
        background: color,
        border: value === color ? '2px solid #111' : '1px solid rgba(0,0,0,.15)',
        cursor: 'pointer',
        padding: 0,
      }}
    />
  )
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {swatch('#ffffff', 'white')}
        {swatch('#000000', 'black')}
        {swatch(BRAND, 'brand')}
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: `repeat(${PALETTE.length}, 20px)`, gap: 3 }}
      >
        {SHADES.map((shade, i) =>
          PALETTE.map(([hue, hexes]) => swatch(hexes[i], `${hue}-${shade}`)),
        )}
      </div>
      {gradient && (
        <>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {GRADIENT_PRESETS.map((g, i) => swatch(g, `gradient ${i + 1}`))}
          </div>
          <GradientBuilder value={value} onChange={onChange} />
        </>
      )}
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type="color"
          aria-label="Pick any color"
          value={/^#[0-9a-f]{6}$/i.test(value ?? '') ? value : '#000000'}
          onChange={e => onChange(e.target.value)}
          style={{ width: 36, height: 34, padding: 0, border: 'none', background: 'none' }}
        />
        <input
          type="text"
          placeholder={gradient ? '#hex, rgb(), linear-gradient(…)' : '#hex, rgb()'}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => onChange('')}
          style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

const isVideo = (url?: string) => !!url && /\.(mp4|webm|mov)(\?|$)/i.test(url)

function ImageInput({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false)

  const upload = async (file?: File) => {
    if (!file) return
    setUploading(true)
    try {
      const body = new FormData()
      body.append('files', file)
      const res = await fetch('/api/media/upload', { method: 'POST', body })
      if (!res.ok) throw new Error(String(res.status))
      const json = await res.json()
      onChange(json.data.files[0].url)
    } catch {
      toast({ variant: 'destructive', description: 'Upload failed. Try again.' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8, minWidth: 0 }}>
      {value &&
        (isVideo(value) ? (
          <video src={value} style={{ width: '100%', maxHeight: 160, borderRadius: 6 }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 6 }}
          />
        ))}
      <input
        style={{ width: '100%', fontSize: 13 }}
        type="file"
        accept="image/*,video/*"
        disabled={uploading}
        onChange={e => upload(e.target.files?.[0])}
      />
      {uploading && <span style={{ fontSize: 12 }}>Uploading…</span>}
      <input
        type="url"
        placeholder="…or paste a URL"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  )
}

const customField = (
  label: string,
  Input: (p: { value?: string; onChange: (v: string) => void }) => ReactNode,
): Field<string | undefined> => ({
  type: 'custom',
  label,
  render: ({ value, onChange }) => (
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <Input value={value} onChange={onChange} />
    </div>
  ),
})

const colorField = (label: string) => customField(label, ColorInput)
const gradientField = (label: string) =>
  customField(label, props => <ColorInput {...props} gradient />)
const imageField = (label: string) => customField(label, ImageInput)

const alignField: Field = {
  type: 'radio',
  label: 'Align',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ],
}

const yesNoField = (label: string): Field => ({
  type: 'radio',
  label,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
})

/* ---------- Animations ---------- */

// Pure CSS so it also runs on the store, where scripts in content don't execute.
// Entrances are scroll-triggered where `animation-timeline: view()` is supported
// (Chrome, Edge, Safari 26+) and play on page load elsewhere.
export const PAGE_CSS = `
.nga{animation-duration:.8s;animation-timing-function:cubic-bezier(.2,.7,.2,1);animation-fill-mode:both}
.nga-loop{animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;animation-fill-mode:none}
@supports (animation-timeline: view()){.nga-in{animation-timeline:view();animation-range:entry 0% cover 30%}}
@media (prefers-reduced-motion: reduce){.nga{animation:none!important}}
.rich-text h1,.rich-text h2,.rich-text h3,.rich-text h4,.rich-text h5,.rich-text h6{font-weight:600;line-height:1.2;margin:.8em 0 .4em}
.rich-text h1{font-size:2.25em}.rich-text h2{font-size:1.75em}.rich-text h3{font-size:1.4em}
.rich-text h4{font-size:1.2em}.rich-text h5{font-size:1.05em}.rich-text h6{font-size:.95em}
.rich-text>:first-child,.rich-text .ProseMirror>:first-child{margin-top:0}
.rich-text p{margin:0 0 .9em}
.rich-text ul{list-style:disc;padding-left:1.5em;margin:0 0 .9em}
.rich-text ol{list-style:decimal;padding-left:1.5em;margin:0 0 .9em}
.rich-text li>p{margin:0}
.rich-text blockquote{border-left:4px solid currentColor;padding-left:1em;margin:0 0 .9em;opacity:.85}
.rich-text a{text-decoration:underline}
.rich-text code{font-family:monospace;background:rgba(0,0,0,.06);padding:.1em .3em;border-radius:4px}
@keyframes nga-fade{from{opacity:0}}
@keyframes nga-fade-up{from{opacity:0;transform:translateY(32px)}}
@keyframes nga-fade-down{from{opacity:0;transform:translateY(-32px)}}
@keyframes nga-slide-left{from{opacity:0;transform:translateX(48px)}}
@keyframes nga-slide-right{from{opacity:0;transform:translateX(-48px)}}
@keyframes nga-zoom{from{opacity:0;transform:scale(.9)}}
@keyframes nga-pulse{50%{transform:scale(1.05)}}
@keyframes nga-bounce{50%{transform:translateY(-8px)}}
@keyframes nga-float{50%{transform:translateY(-12px)}}
@keyframes nga-shake{0%,60%,100%{transform:none}10%,30%,50%{transform:translateX(-4px)}20%,40%{transform:translateX(4px)}}
`

const ENTRANCES = ['fade', 'fade-up', 'fade-down', 'slide-left', 'slide-right', 'zoom']
const LOOPS = ['pulse', 'bounce', 'float', 'shake']

const animationFields: Record<string, Field> = {
  animation: {
    type: 'select',
    label: 'Animation',
    options: [
      { label: 'none', value: 'none' },
      ...ENTRANCES.map(a => ({ label: `${a} (on scroll)`, value: a })),
      ...LOOPS.map(a => ({ label: `${a} (loop)`, value: a })),
    ],
  },
  animationDelay: {
    type: 'select',
    label: 'Animation delay',
    options: [0, 100, 200, 300, 500, 800, 1000].map(ms => ({ label: `${ms}ms`, value: ms })),
  },
}

function Animated({
  name,
  delay,
  children,
}: {
  name?: string
  delay?: number
  children: ReactNode
}) {
  if (!name || name === 'none') return <>{children}</>
  const loop = LOOPS.includes(name)
  return (
    <div
      className={`nga ${loop ? 'nga-loop' : 'nga-in'}`}
      style={{ animationName: `nga-${name}`, animationDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}

/* ---------- Section templates ---------- */

// Pages built with the first version stored preset names; keep rendering them.
const LEGACY_BACKGROUNDS: Record<string, [string, string?]> = {
  none: [''],
  soft: ['hsl(150 40% 96%)'],
  primary: [BRAND, '#ffffff'],
  greenGradient: ['linear-gradient(90deg,#43a047,#7ddc8b)', '#ffffff'],
  roseGradient: ['linear-gradient(135deg,#d65d6e,#b84d72 50%,#e06c96)', '#ffffff'],
  blush: ['#fbeff3'],
  dark: ['#111827', '#ffffff'],
}
const LEGACY_BUTTONS: Record<string, [string, string]> = {
  primary: [BRAND, '#ffffff'],
  light: ['#ffffff', '#1f2937'],
  whatsapp: ['#25D366', '#ffffff'],
  outline: ['transparent', 'inherit'],
}

type TemplateProps = {
  background?: string
  customBackground?: string
  textColor?: string
  paddingY: number
}

const templateFields = {
  background: gradientField('Background (color or gradient)'),
  textColor: colorField('Text color'),
  paddingY: scaleField('Padding top/bottom', SPACING),
}

type CtaProps = {
  buttonText?: string
  buttonUrl?: string
  buttonBackground?: string
  buttonTextColor?: string
  buttonVariant?: string
}

const ctaFields = {
  buttonText: { type: 'text', label: 'Button text' } as Field,
  buttonUrl: { type: 'text', label: 'Button link (https://, /shop/…, https://wa.me/…)' } as Field,
  buttonBackground: gradientField('Button background'),
  buttonTextColor: colorField('Button text color'),
}

function TemplateSection({
  background,
  customBackground,
  textColor,
  paddingY,
  children,
}: TemplateProps & { children: ReactNode }) {
  const [legacyBg, legacyText] = LEGACY_BACKGROUNDS[background ?? ''] ?? [background]
  return (
    <section
      style={{
        background: customBackground || legacyBg || undefined,
        color: textColor || legacyText || undefined,
        padding: `${paddingY ?? 56}px 16px`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

function Cta({
  buttonText,
  buttonUrl,
  buttonBackground,
  buttonTextColor,
  buttonVariant,
}: CtaProps) {
  if (!buttonText) return null
  const [legacyBg, legacyText] = LEGACY_BUTTONS[buttonVariant ?? ''] ?? []
  return (
    <a
      href={buttonUrl || '#'}
      style={{
        display: 'inline-block',
        padding: '14px 28px',
        borderRadius: 999,
        fontWeight: 600,
        textDecoration: 'none',
        boxShadow: '0 4px 14px rgba(0,0,0,.12)',
        background: buttonBackground || legacyBg || BRAND,
        color: buttonTextColor || legacyText || '#ffffff',
        border: buttonVariant === 'outline' ? '2px solid currentColor' : 'none',
      }}
    >
      {buttonText}
    </a>
  )
}

function TemplateMedia({ src, alt }: { src?: string; alt?: string }) {
  if (!src) {
    return (
      <div
        style={{
          aspectRatio: '4 / 3',
          borderRadius: 12,
          background: 'rgba(148,163,184,.25)',
          display: 'grid',
          placeItems: 'center',
          color: '#64748b',
        }}
      >
        Image
      </div>
    )
  }
  const style: CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,.12)',
  }
  return isVideo(src) ? (
    <video src={src} controls playsInline style={style} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ''} loading="lazy" style={style} />
  )
}

const templateTitle = (size: string): CSSProperties => ({
  fontSize: size,
  fontWeight: 600,
  lineHeight: 1.15,
  margin: '0 0 16px',
  color: 'inherit',
})

/* ---------- Components ---------- */

type Align = 'left' | 'center' | 'right'

type Props = {
  Section: {
    background?: string
    backgroundImage?: string
    textColor?: string
    paddingY: number
    paddingX: number
    maxWidth: number
    content: Slot
  }
  Grid: { columns: number; gap: number; minColumnWidth: number; items: Slot }
  Flex: {
    direction: 'row' | 'column'
    justify: string
    align: string
    gap: number
    wrap: 'wrap' | 'nowrap'
    items: Slot
  }
  Box: {
    background?: string
    textColor?: string
    borderColor?: string
    padding: number
    radius: number
    shadow: string
    align: Align
    content: Slot
  }
  Heading: {
    text: string
    level: 'h1' | 'h2' | 'h3' | 'h4'
    size: number
    weight: number
    color?: string
    align: Align
  }
  Text: { body: ReactNode; size: number; color?: string; align: Align }
  RichText: { richtext: ReactNode; paddingY: number; color?: string; maxWidth: number }
  Button: {
    text: string
    url: string
    newTab: 'yes' | 'no'
    background?: string
    textColor?: string
    borderColor?: string
    size: 'sm' | 'md' | 'lg'
    radius: number
    fullWidth: 'yes' | 'no'
    align: Align
  }
  Image: {
    src?: string
    alt: string
    width: number
    radius: number
    shadow: string
    link: string
    align: Align
  }
  Spacer: { height: number }
  Divider: { color?: string; thickness: number; spacing: number }
  RawHtml: { html: string }
  Hero: TemplateProps & CtaProps & { title: string; subtitle: string; image?: string; align: Align }
  ImageText: TemplateProps &
    CtaProps & {
      image?: string
      imageAlt?: string
      imageSide: 'left' | 'right'
      title: string
      body: ReactNode
    }
  Features: TemplateProps & {
    title?: string
    items: { icon: string; title: string; text: string }[]
  }
  Testimonials: TemplateProps & {
    title?: string
    items: { quote: string; author: string }[]
  }
}

const BUTTON_PADDING = { sm: '8px 16px', md: '12px 24px', lg: '16px 32px' }

export const puckConfig: Config<Props> = {
  root: {
    fields: {},
    render: ({ children }) => (
      // `clip` keeps slide-in animations from causing horizontal scroll on phones.
      <div style={{ overflowX: 'clip' }}>
        <style>{PAGE_CSS}</style>
        {children}
      </div>
    ),
  },
  categories: {
    layout: {
      title: 'Layout',
      components: ['Section', 'Grid', 'Flex', 'Box', 'Spacer', 'Divider'],
    },
    basics: { title: 'Basics', components: ['Heading', 'Text', 'RichText', 'Button', 'Image'] },
    sections: { title: 'Sections', components: ['Hero', 'ImageText', 'Features', 'Testimonials'] },
    advanced: { title: 'Advanced', components: ['RawHtml'] },
  },
  components: {
    Section: {
      fields: {
        content: { type: 'slot' },
        background: gradientField('Background (color or gradient)'),
        backgroundImage: imageField('Background image'),
        textColor: colorField('Text color'),
        paddingY: scaleField('Padding top/bottom', SPACING),
        paddingX: scaleField('Padding left/right', SPACING),
        maxWidth: scaleField('Content max width (full = 0)', MAX_WIDTH),
      },
      defaultProps: { paddingY: 48, paddingX: 16, maxWidth: 1100, content: [] },
      render: ({
        content: Content,
        background,
        backgroundImage,
        textColor,
        paddingY,
        paddingX,
        maxWidth,
      }) => (
        <section
          style={{
            background: background || undefined,
            ...(backgroundImage && {
              backgroundImage: `url("${backgroundImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }),
            color: textColor || undefined,
            padding: `${paddingY}px ${paddingX}px`,
          }}
        >
          <Content
            minEmptyHeight={80}
            style={{ maxWidth: maxWidth || undefined, margin: '0 auto' }}
          />
        </section>
      ),
    },

    Grid: {
      fields: {
        items: { type: 'slot' },
        columns: { type: 'number', label: 'Columns', min: 1, max: 6 },
        gap: scaleField('Gap', SPACING),
        minColumnWidth: {
          type: 'number',
          label: 'Min column width (px), columns stack below it',
          min: 0,
        },
      },
      defaultProps: { columns: 3, gap: 16, minColumnWidth: 220, items: [] },
      render: ({ items: Items, columns, gap, minColumnWidth }) => {
        const cols = Math.max(1, columns || 1)
        const share = `calc((100% - ${gap * (cols - 1)}px) / ${cols})`
        return (
          <Items
            minEmptyHeight={80}
            style={{
              display: 'grid',
              gap,
              gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, max(${minColumnWidth}px, ${share})), 1fr))`,
            }}
          />
        )
      },
    },

    Flex: {
      fields: {
        items: { type: 'slot' },
        direction: {
          type: 'radio',
          label: 'Direction',
          options: [
            { label: 'Row', value: 'row' },
            { label: 'Column', value: 'column' },
          ],
        },
        justify: {
          type: 'select',
          label: 'Justify',
          options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].map(v => ({
            label: v,
            value: v,
          })),
        },
        align: {
          type: 'select',
          label: 'Align items',
          options: ['stretch', 'flex-start', 'center', 'flex-end'].map(v => ({
            label: v,
            value: v,
          })),
        },
        gap: scaleField('Gap', SPACING),
        wrap: {
          type: 'radio',
          label: 'Wrap on small screens',
          options: [
            { label: 'Yes', value: 'wrap' },
            { label: 'No', value: 'nowrap' },
          ],
        },
      },
      defaultProps: {
        direction: 'row',
        justify: 'flex-start',
        align: 'center',
        gap: 16,
        wrap: 'wrap',
        items: [],
      },
      render: ({ items: Items, direction, justify, align, gap, wrap }) => (
        <Items
          minEmptyHeight={60}
          style={{
            display: 'flex',
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap,
            gap,
          }}
        />
      ),
    },

    Box: {
      fields: {
        content: { type: 'slot' },
        background: gradientField('Background (color or gradient)'),
        textColor: colorField('Text color'),
        borderColor: colorField('Border color'),
        padding: scaleField('Padding', SPACING),
        radius: scaleField('Corner radius', RADIUS),
        shadow: shadowField,
        align: alignField,
      },
      defaultProps: { padding: 24, radius: 12, shadow: 'none', align: 'left', content: [] },
      render: ({
        content: Content,
        background,
        textColor,
        borderColor,
        padding,
        radius,
        shadow,
        align,
      }) => (
        <div
          style={{
            background: background || undefined,
            color: textColor || undefined,
            border: borderColor ? `1px solid ${borderColor}` : undefined,
            padding,
            borderRadius: radius,
            boxShadow: SHADOWS[shadow],
            textAlign: align,
            height: '100%',
          }}
        >
          <Content minEmptyHeight={60} />
        </div>
      ),
    },

    Spacer: {
      fields: { height: scaleField('Height', SPACING) },
      defaultProps: { height: 32 },
      render: ({ height }) => <div style={{ height }} aria-hidden />,
    },

    Divider: {
      fields: {
        color: colorField('Color'),
        thickness: { type: 'number', label: 'Thickness (px)', min: 1, max: 10 },
        spacing: scaleField('Spacing above/below', SPACING),
      },
      defaultProps: { thickness: 1, spacing: 16 },
      render: ({ color, thickness, spacing }) => (
        <hr
          style={{
            border: 'none',
            borderTop: `${thickness}px solid ${color || 'rgba(0,0,0,.12)'}`,
            margin: `${spacing}px 0`,
          }}
        />
      ),
    },

    Heading: {
      fields: {
        text: { type: 'text', label: 'Text' },
        level: {
          type: 'select',
          label: 'Level (SEO)',
          options: ['h1', 'h2', 'h3', 'h4'].map(v => ({ label: v.toUpperCase(), value: v })),
        },
        size: scaleField('Size', FONT_SIZE),
        weight: {
          type: 'select',
          label: 'Weight',
          options: [
            { label: 'normal', value: 400 },
            { label: 'medium', value: 500 },
            { label: 'semibold', value: 600 },
            { label: 'bold', value: 700 },
          ],
        },
        color: gradientField('Color (gradient = gradient text)'),
        align: alignField,
      },
      defaultProps: { text: 'Heading', level: 'h2', size: 30, weight: 600, align: 'left' },
      render: ({ text, level: Tag, size, weight, color, align }) => (
        <Tag
          style={{
            fontSize: fontSize(size),
            fontWeight: weight,
            lineHeight: 1.2,
            color: isGradient(color) ? undefined : color || 'inherit',
            textAlign: align,
            margin: '0 0 12px',
          }}
        >
          {isGradient(color) ? (
            <span
              style={{
                backgroundImage: color,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {text}
            </span>
          ) : (
            text
          )}
        </Tag>
      ),
    },

    Text: {
      fields: {
        body: { type: 'richtext', label: 'Text', contentEditable: true },
        size: scaleField('Size', FONT_SIZE),
        color: colorField('Color'),
        align: alignField,
      },
      defaultProps: { body: '<p>Text</p>', size: 16, align: 'left' },
      render: ({ body, size, color, align }) => (
        <div
          style={{
            fontSize: fontSize(size),
            lineHeight: 1.7,
            color: color || undefined,
            textAlign: align,
          }}
        >
          {body}
        </div>
      ),
    },

    RichText: {
      label: 'Rich text',
      fields: {
        // contentEditable: also editable by typing directly in the preview.
        richtext: { type: 'richtext', label: 'Rich text', contentEditable: true },
        paddingY: scaleField('Vertical padding', SPACING),
        color: colorField('Text color'),
        maxWidth: scaleField('Max width (full = 0)', MAX_WIDTH),
      },
      defaultProps: {
        richtext: '<h2>Heading</h2><p>Body</p>',
        paddingY: 0,
        maxWidth: 0,
      },
      render: ({ richtext, paddingY, color, maxWidth }) => (
        <div
          style={{
            padding: `${paddingY}px 0`,
            color: color || undefined,
            maxWidth: maxWidth || undefined,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {richtext}
        </div>
      ),
    },

    Button: {
      fields: {
        text: { type: 'text', label: 'Text' },
        url: { type: 'text', label: 'Link (https://, /shop/…, https://wa.me/…)' },
        newTab: yesNoField('Open in new tab'),
        background: gradientField('Background (color or gradient)'),
        textColor: colorField('Text color'),
        borderColor: colorField('Border color'),
        size: {
          type: 'radio',
          label: 'Size',
          options: [
            { label: 'S', value: 'sm' },
            { label: 'M', value: 'md' },
            { label: 'L', value: 'lg' },
          ],
        },
        radius: scaleField('Corner radius', RADIUS),
        fullWidth: yesNoField('Full width'),
        align: alignField,
      },
      defaultProps: {
        text: 'Button',
        url: '#',
        newTab: 'no',
        background: BRAND,
        textColor: '#ffffff',
        size: 'md',
        radius: 8,
        fullWidth: 'no',
        align: 'left',
      },
      render: ({
        text,
        url,
        newTab,
        background,
        textColor,
        borderColor,
        size,
        radius,
        fullWidth,
        align,
      }) => (
        <div style={{ textAlign: align }}>
          <a
            href={url || '#'}
            {...(newTab === 'yes' && { target: '_blank', rel: 'noopener noreferrer' })}
            style={{
              display: fullWidth === 'yes' ? 'block' : 'inline-block',
              textAlign: 'center',
              padding: BUTTON_PADDING[size],
              borderRadius: radius,
              fontWeight: 600,
              textDecoration: 'none',
              background: background || undefined,
              color: textColor || 'inherit',
              border: borderColor ? `2px solid ${borderColor}` : 'none',
            }}
          >
            {text}
          </a>
        </div>
      ),
    },

    Image: {
      fields: {
        src: imageField('Image or video'),
        alt: { type: 'text', label: 'Description (accessibility)' },
        width: {
          type: 'select',
          label: 'Width',
          options: [25, 33, 50, 66, 75, 100].map(v => ({ label: `${v}%`, value: v })),
        },
        radius: scaleField('Corner radius', RADIUS),
        shadow: shadowField,
        link: { type: 'text', label: 'Link (optional)' },
        align: alignField,
      },
      defaultProps: { alt: '', width: 100, radius: 0, shadow: 'none', link: '', align: 'center' },
      render: ({ src, alt, width, radius, shadow, link, align }) => {
        if (!src) {
          return (
            <div
              style={{ padding: 32, textAlign: 'center', background: '#f1f5f9', color: '#64748b' }}
            >
              Image
            </div>
          )
        }
        const style: CSSProperties = {
          display: 'block',
          width: `${width}%`,
          height: 'auto',
          borderRadius: radius,
          boxShadow: SHADOWS[shadow],
          marginLeft: align === 'left' ? 0 : 'auto',
          marginRight: align === 'right' ? 0 : 'auto',
        }
        const media = isVideo(src) ? (
          <video src={src} controls playsInline style={style} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" style={style} />
        )
        return link ? <a href={link}>{media}</a> : media
      },
    },

    Hero: {
      fields: {
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'textarea', label: 'Subtitle' },
        image: imageField('Image (optional, shown beside the text)'),
        align: alignField,
        ...ctaFields,
        ...templateFields,
      },
      defaultProps: {
        title: 'Title',
        subtitle: 'Subtitle',
        align: 'center',
        buttonText: 'Button',
        buttonUrl: '#',
        background: 'linear-gradient(135deg,#017d59,#22c55e)',
        textColor: '#ffffff',
        buttonBackground: '#ffffff',
        buttonTextColor: '#1f2937',
        paddingY: 80,
      },
      render: ({ title, subtitle, image, align, ...rest }) => (
        <TemplateSection {...rest}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
            <div style={{ flex: '1 1 320px', textAlign: align }}>
              <h1 style={templateTitle('clamp(2rem, 5vw, 3.5rem)')}>{title}</h1>
              <p
                style={{ fontSize: '1.15rem', lineHeight: 1.6, margin: '0 0 28px', opacity: 0.95 }}
              >
                {subtitle}
              </p>
              <Cta {...rest} />
            </div>
            {image && (
              <div style={{ flex: '1 1 320px' }}>
                <TemplateMedia src={image} alt={title} />
              </div>
            )}
          </div>
        </TemplateSection>
      ),
    },

    ImageText: {
      label: 'Image + text',
      fields: {
        image: imageField('Image or video'),
        imageAlt: { type: 'text', label: 'Image description (accessibility)' },
        imageSide: {
          type: 'radio',
          label: 'Image side',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        title: { type: 'text', label: 'Title' },
        body: { type: 'richtext', label: 'Text', contentEditable: true },
        ...ctaFields,
        ...templateFields,
      },
      defaultProps: {
        imageSide: 'left',
        title: 'Title',
        body: '<p>Text</p>',
        paddingY: 48,
      },
      render: ({ image, imageAlt, imageSide, title, body, ...rest }) => (
        <TemplateSection {...rest}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: imageSide === 'right' ? 'row-reverse' : 'row',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <TemplateMedia src={image} alt={imageAlt} />
            </div>
            <div style={{ flex: '1 1 300px' }}>
              {title && <h2 style={templateTitle('clamp(1.5rem, 3vw, 2.1rem)')}>{title}</h2>}
              <div style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 20 }}>{body}</div>
              <Cta {...rest} />
            </div>
          </div>
        </TemplateSection>
      ),
    },

    Features: {
      label: 'Features grid',
      fields: {
        title: { type: 'text', label: 'Title' },
        items: {
          type: 'array',
          label: 'Items',
          getItemSummary: item => item.title || 'Item',
          defaultItemProps: { icon: '★', title: 'Feature', text: 'Description' },
          arrayFields: {
            icon: { type: 'text', label: 'Emoji / symbol' },
            title: { type: 'text', label: 'Title' },
            text: { type: 'textarea', label: 'Text' },
          },
        },
        ...templateFields,
      },
      defaultProps: {
        title: 'Title',
        paddingY: 56,
        background: '#f1f5f9',
        items: [1, 2, 3].map(n => ({ icon: '★', title: `Feature ${n}`, text: 'Description' })),
      },
      render: ({ title, items, ...rest }) => (
        <TemplateSection {...rest}>
          {title && (
            <h2
              style={{
                ...templateTitle('clamp(1.5rem, 3vw, 2.1rem)'),
                textAlign: 'center',
                marginBottom: 32,
              }}
            >
              {title}
            </h2>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 220px',
                  background: 'rgba(255,255,255,.75)',
                  color: '#1f2937',
                  borderRadius: 12,
                  padding: 24,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }} aria-hidden>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 6px' }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </TemplateSection>
      ),
    },

    Testimonials: {
      fields: {
        title: { type: 'text', label: 'Title' },
        items: {
          type: 'array',
          label: 'Testimonials',
          getItemSummary: item => item.author || 'Testimonial',
          defaultItemProps: { quote: 'Quote', author: 'Name' },
          arrayFields: {
            quote: { type: 'textarea', label: 'Quote' },
            author: { type: 'text', label: 'Name' },
          },
        },
        ...templateFields,
      },
      defaultProps: {
        title: 'Title',
        paddingY: 56,
        background: '#f1f5f9',
        items: [1, 2].map(n => ({ quote: 'Quote', author: `Name ${n}` })),
      },
      render: ({ title, items, ...rest }) => (
        <TemplateSection {...rest}>
          {title && (
            <h2
              style={{
                ...templateTitle('clamp(1.5rem, 3vw, 2.1rem)'),
                textAlign: 'center',
                marginBottom: 32,
              }}
            >
              {title}
            </h2>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {items.map((item, i) => (
              <blockquote
                key={i}
                style={{
                  flex: '1 1 280px',
                  margin: 0,
                  background: '#ffffff',
                  color: '#1f2937',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 4px 16px rgba(0,0,0,.06)',
                }}
              >
                <p style={{ margin: '0 0 12px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  “{item.quote}”
                </p>
                <footer style={{ fontWeight: 600 }}>— {item.author}</footer>
              </blockquote>
            ))}
          </div>
        </TemplateSection>
      ),
    },

    RawHtml: {
      label: 'Raw HTML',
      fields: { html: { type: 'textarea', label: 'HTML' } },
      defaultProps: { html: '' },
      render: ({ html }) => <div dangerouslySetInnerHTML={{ __html: html }} />,
    },
  },
}

// Every visual block gets the animation fields and a wrapper.
for (const [name, component] of Object.entries(puckConfig.components) as [
  string,
  ComponentConfig<any>,
][]) {
  if (['Spacer', 'Divider', 'RawHtml'].includes(name)) continue
  const render = component.render
  component.fields = { ...component.fields, ...animationFields }
  component.defaultProps = { ...component.defaultProps, animation: 'none', animationDelay: 0 }
  component.render = props => (
    <Animated name={props.animation} delay={props.animationDelay}>
      {render(props)}
    </Animated>
  )
}
