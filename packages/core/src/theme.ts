// Store themes (docs/MULTI_TENANT_PLAN.md, 3.7): presets, colors, fonts, home sections and the
// WCAG contrast rules a theme must pass. Colors are HSL triples ("163 94% 24%"), the format of
// the storefront's CSS variables (globals.css, hsl(var(--primary))). Self-check: theme.check.ts

export const THEME_PRESETS = ['nature', 'minimal', 'bold'] as const
export type ThemePreset = (typeof THEME_PRESETS)[number]

/** Closed list, loaded with next/font in the storefront's root layout. */
export const THEME_FONTS = ['fredoka', 'inter', 'poppins', 'playfair', 'dm-sans'] as const
export type ThemeFont = (typeof THEME_FONTS)[number]

export const THEME_RADII = [0, 0.25, 0.5, 0.75, 1] as const

export interface ThemeColors {
  primary: string
  background: string
  foreground: string
  accent?: string | null
}

type SectionBase = { id: string; hidden?: boolean; title?: string | null }
export type Section = SectionBase &
  (
    | {
        type: 'hero'
        subtitle?: string | null
        imageUrl?: string | null
        ctaLabel?: string | null
        /** A path inside the store ("/shop"). */
        ctaHref?: string | null
      }
    | { type: 'featuredProducts'; source: 'featured' | 'new' | 'all'; limit: number }
    | { type: 'categoryGrid' }
    | { type: 'reviews'; limit: number }
    | { type: 'faq'; items: { question: string; answer: string }[] }
    /** Plain text, paragraphs separated by a blank line (no HTML). */
    | { type: 'richText'; text: string }
    /** YouTube or Vimeo address. */
    | { type: 'video'; url: string }
    | { type: 'promoBanner' }
  )
export type SectionType = Section['type']
export const SECTION_TYPES: SectionType[] = [
  'hero',
  'featuredProducts',
  'categoryGrid',
  'reviews',
  'faq',
  'richText',
  'video',
  'promoBanner',
]

export interface StoreTheme {
  preset: ThemePreset
  colors: ThemeColors
  /** rem */
  radius: number
  font: ThemeFont
  logoUrl?: string | null
  faviconUrl?: string | null
  /** The bar above the header ("Delivery in Douala · Pay on delivery"); none when empty. */
  announcement?: string | null
  /** Home page, in order. Absent: DEFAULT_SECTIONS. */
  sections?: Section[] | null
}

export const PRESETS: Record<
  ThemePreset,
  Omit<StoreTheme, 'sections' | 'logoUrl' | 'faviconUrl'>
> = {
  // N.Gift's look (globals.css).
  nature: {
    preset: 'nature',
    colors: {
      primary: '163 94% 24%',
      background: '0 0% 100%',
      foreground: '160 20% 8%',
      accent: '150 30% 94%',
    },
    radius: 0.75,
    font: 'fredoka',
  },
  minimal: {
    preset: 'minimal',
    colors: {
      primary: '0 0% 9%',
      background: '0 0% 100%',
      foreground: '0 0% 9%',
      accent: '0 0% 94%',
    },
    radius: 0.25,
    font: 'inter',
  },
  bold: {
    preset: 'bold',
    colors: {
      primary: '262 83% 45%',
      background: '0 0% 100%',
      foreground: '240 10% 10%',
      accent: '45 93% 80%',
    },
    radius: 1,
    font: 'poppins',
  },
}

/** The home page of a store that never edited its sections. */
export const DEFAULT_SECTIONS: Section[] = [
  { id: 'hero', type: 'hero' },
  { id: 'categories', type: 'categoryGrid' },
  { id: 'featured', type: 'featuredProducts', source: 'featured', limit: 4 },
  { id: 'promotions', type: 'promoBanner' },
  { id: 'new', type: 'featuredProducts', source: 'new', limit: 4 },
]

/** The theme as saved, filled from its preset (a store without theme gets `nature`). */
export const themeOf = (theme?: Partial<StoreTheme> | null): StoreTheme => {
  const preset = PRESETS[theme?.preset as ThemePreset] ?? PRESETS.nature
  return {
    ...theme,
    preset: preset.preset,
    colors: { ...preset.colors, ...theme?.colors },
    radius: THEME_RADII.includes(theme?.radius as never) ? theme!.radius! : preset.radius,
    font: THEME_FONTS.includes(theme?.font as never) ? theme!.font! : preset.font,
    sections: theme?.sections ?? DEFAULT_SECTIONS,
  }
}

// --- Colors -------------------------------------------------------------------------------

type Rgb = [number, number, number]

/** "163 94% 24%" → [h, s, l], or null. */
export const parseHsl = (value: unknown): [number, number, number] | null => {
  const m = String(value ?? '').match(
    /^(\d{1,3}(?:\.\d+)?) (\d{1,3}(?:\.\d+)?)% (\d{1,3}(?:\.\d+)?)%$/,
  )
  if (!m) return null
  const [h, s, l] = m.slice(1).map(Number)
  return h <= 360 && s <= 100 && l <= 100 ? [h, s, l] : null
}
export const isHsl = (value: unknown) => parseHsl(value) !== null

const toRgb = (hsl: string): Rgb => {
  const [h, s, l] = parseHsl(hsl) ?? [0, 0, 0]
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return [f(0), f(8), f(4)]
}

const fromRgb = ([r, g, b]: Rgb): string => {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255]
  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const l = (max + min) / 2
  const d = max - min
  let h = 0
  if (d) {
    if (max === rr) h = ((gg - bb) / d) % 6
    else if (max === gg) h = (bb - rr) / d + 2
    else h = (rr - gg) / d + 4
  }
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0
  return `${Math.round((h * 60 + 360) % 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

/** "#0a7a5c" → "163 85% 26%"; null if not a 6-digit hex color. */
export const hexToHsl = (hex: string) => {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i)
  if (!m) return null
  const n = parseInt(m[1], 16)
  return fromRgb([(n >> 16) & 255, (n >> 8) & 255, n & 255])
}
export const hslToHex = (hsl: string) =>
  '#' +
  toRgb(hsl)
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')

const luminance = (hsl: string) => {
  const [r, g, b] = toRgb(hsl).map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio of two HSL colors, 1 to 21. */
export const contrastRatio = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const WHITE = '0 0% 100%'
const BLACK = '0 0% 0%'
/** White or black, whichever reads better on `background`. */
export const readableOn = (background: string) =>
  contrastRatio(WHITE, background) >= contrastRatio(BLACK, background) ? WHITE : BLACK

/** `a` moved toward `b` by t (0 to 1), in RGB. */
const mix = (a: string, b: string, t: number) => {
  const [x, y] = [toRgb(a), toRgb(b)]
  return fromRgb(x.map((v, i) => Math.round(v + (y[i] - v) * t)) as Rgb)
}

/** WCAG AA for normal text. */
export const MIN_CONTRAST = 4.5
// The storefront's fixed colors (globals.css), shown as text on the background.
const DESTRUCTIVE = '0 72% 45%'
const SALE = '21 90% 42%'

/**
 * Every CSS variable of the storefront the theme sets (globals.css has the same names). Muted
 * text is the foreground moved toward the background, as far as it stays readable.
 */
export const themeVariables = (theme: StoreTheme): Record<string, string> => {
  const { primary, background, foreground } = theme.colors
  const accent = theme.colors.accent || mix(background, primary, 0.08)
  let mutedForeground = foreground
  for (const t of [0.45, 0.35, 0.25, 0.15]) {
    const candidate = mix(foreground, background, t)
    if (contrastRatio(candidate, background) >= MIN_CONTRAST) {
      mutedForeground = candidate
      break
    }
  }
  return {
    '--background': background,
    '--foreground': foreground,
    '--card': background,
    '--card-foreground': foreground,
    '--popover': background,
    '--popover-foreground': foreground,
    '--muted': mix(background, foreground, 0.04),
    '--muted-foreground': mutedForeground,
    '--border': mix(background, foreground, 0.12),
    '--input': mix(background, foreground, 0.15),
    '--primary': primary,
    '--primary-foreground': readableOn(primary),
    '--secondary': mix(background, primary, 0.06),
    '--secondary-foreground': foreground,
    '--accent': accent,
    '--accent-foreground': readableOn(accent) === WHITE ? WHITE : foreground,
    '--ring': primary,
    '--radius': `${theme.radius}rem`,
    '--prose-foreground': mutedForeground,
    '--prose-strong-foreground': foreground,
    '--font-theme': `var(--font-${theme.font})`,
  }
}

/** `:root{…}` for the storefront's layout. Values are checked HSL, numbers or a font name. */
export const themeCss = (theme: StoreTheme) =>
  `:root{${Object.entries(themeVariables(theme))
    .map(([k, v]) => `${k}:${v}`)
    .join(';')}}`

/**
 * Why these colors can't be published (empty if they can): every pair of text and background
 * the storefront shows must reach 4.5:1 (WCAG AA).
 */
export const contrastProblems = (colors: ThemeColors): string[] => {
  for (const [name, value] of Object.entries(colors)) {
    if (value != null && value !== '' && !isHsl(value)) return [`${name}: not a color`]
  }
  const { primary, background, foreground } = colors
  const accent = colors.accent || mix(background, primary, 0.08)
  const accentText = readableOn(accent) === WHITE ? WHITE : foreground
  const pairs: [string, string, string][] = [
    ['Text on the background', foreground, background],
    ['Links and prices (primary) on the background', primary, background],
    ['Button text on the primary color', readableOn(primary), primary],
    ['Text on the accent color', accentText, accent],
    ['Error messages on the background', DESTRUCTIVE, background],
    ['Sale prices on the background', SALE, background],
  ]
  return pairs
    .map(([label, a, b]) => [label, contrastRatio(a, b)] as const)
    .filter(([, ratio]) => ratio < MIN_CONTRAST)
    .map(([label, ratio]) => `${label}: ${ratio.toFixed(2)}:1, at least ${MIN_CONTRAST}:1 needed`)
}

/** YouTube or Vimeo address → its embed address, else null. */
export const videoEmbedUrl = (url: string) => {
  const youtube = url.match(
    /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})(?:[?&#].*)?$/,
  )
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}`
  const vimeo = url.match(
    /^https:\/\/(?:www\.|player\.)?vimeo\.com\/(?:video\/)?(\d{6,12})(?:[?#].*)?$/,
  )
  return vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null
}

// --- Preview ------------------------------------------------------------------------------

/**
 * The admin's theme editor shows the storefront's PREVIEW_PATH in an iframe and posts it the
 * draft ({ type: PREVIEW_MESSAGE, theme, store }) at every change; the page posts PREVIEW_READY
 * once it listens. Not a store slug (no "_" in slugs): never taken by a store.
 */
export const PREVIEW_PATH = '/theme_preview'
export const PREVIEW_MESSAGE = 'ngift-theme-preview'
export const PREVIEW_READY = 'ngift-theme-preview-ready'
