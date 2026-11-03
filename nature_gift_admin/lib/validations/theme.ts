// Home page sections of a store's theme (docs/MULTI_TENANT_PLAN.md, 3.7), checked before saving.
import { Section, videoEmbedUrl } from '@ngift/core/theme'
import { z } from 'zod'

const blankToNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v)
const optional = (max: number) => z.preprocess(blankToNull, z.string().trim().max(max).nullish())
const required = (max: number) => z.string().trim().min(1, 'required').max(max)
const count = z.coerce.number().int().min(1).max(12)
const httpsUrl = z.preprocess(
  blankToNull,
  z.string().trim().max(500).url().startsWith('https://', 'an https:// address').nullish(),
)

const base = {
  id: z.string().regex(/^[\w-]{1,40}$/),
  hidden: z.boolean().optional(),
  title: optional(120),
}

export const sectionSchema = z.discriminatedUnion('type', [
  z.object({
    ...base,
    type: z.literal('hero'),
    subtitle: optional(300),
    imageUrl: httpsUrl,
    ctaLabel: optional(40),
    ctaHref: z.preprocess(
      blankToNull,
      z
        .string()
        .trim()
        .max(200)
        .regex(/^\/(?!\/)\S*$/, 'a page of the store, starting with /')
        .nullish(),
    ),
  }),
  z.object({
    ...base,
    type: z.literal('featuredProducts'),
    source: z.enum(['featured', 'new', 'all']),
    limit: count,
  }),
  z.object({ ...base, type: z.literal('categoryGrid') }),
  z.object({ ...base, type: z.literal('reviews'), limit: count }),
  z.object({
    ...base,
    type: z.literal('faq'),
    items: z
      .array(z.object({ question: required(200), answer: required(2000) }))
      .min(1)
      .max(20),
  }),
  z.object({ ...base, type: z.literal('richText'), text: required(5000) }),
  z.object({
    ...base,
    type: z.literal('video'),
    url: z
      .string()
      .trim()
      .refine(url => !!videoEmbedUrl(url), 'a YouTube or Vimeo address'),
  }),
  z.object({ ...base, type: z.literal('promoBanner') }),
])

export const sectionsSchema = z
  .array(sectionSchema)
  .max(20, 'at most 20 sections')
  .refine(list => new Set(list.map(s => s.id)).size === list.length, 'duplicate section')

/** The sections, or the first problem in words ("Section 2 (video): url: …"). */
export const parseSections = (
  json: string,
): { sections: Section[]; error?: undefined } | { error: string } => {
  let raw: unknown
  try {
    raw = JSON.parse(json || '[]')
  } catch {
    return { error: 'Sections: invalid data.' }
  }
  const parsed = sectionsSchema.safeParse(raw)
  if (parsed.success) return { sections: parsed.data as Section[] }
  const issue = parsed.error.issues[0]
  const [index, ...field] = issue.path
  const type = Array.isArray(raw) && typeof index === 'number' ? raw[index]?.type : undefined
  const where =
    typeof index === 'number' ? `Section ${index + 1}${type ? ` (${type})` : ''}` : 'Sections'
  return { error: `${where}: ${field.length ? `${field.join('.')}: ` : ''}${issue.message}` }
}
