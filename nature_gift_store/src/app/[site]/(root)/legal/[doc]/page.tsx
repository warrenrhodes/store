import { siteOf } from '@/lib/api/utils'
import { LEGAL_DOCS, LegalDoc, legalPage, LegalParty } from '@/lib/legal'
import { PLATFORM_LEGAL } from '@/lib/platform-site'
import { absoluteUrl } from '@/lib/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ site: string; doc: string }> }

/** The site's page: a store's (from its settings) or the marketplace's (the platform's). */
const pageOf = async (props: Props) => {
  const [{ site, store }, { doc }] = await Promise.all([siteOf(props.params), props.params])
  if (!LEGAL_DOCS.includes(doc as LegalDoc)) return undefined
  const party: LegalParty = store
    ? {
        name: store.name,
        legal: store.settings?.legal,
        email: store.settings?.contactEmail,
        whatsapp: store.settings?.whatsapp,
      }
    : PLATFORM_LEGAL
  const page = legalPage(doc as LegalDoc, party, !store)
  return page && { page, url: absoluteUrl(site, `/legal/${doc}`) }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const found = await pageOf(props)
  return found ? { title: found.page.title, alternates: { canonical: found.url } } : {}
}

export default async function LegalPage(props: Props) {
  const found = await pageOf(props)
  if (!found) notFound()
  const { page } = found
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">{page.title}</h1>
      {page.sections.map(section => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          {section.paragraphs.map((text, i) => (
            <p key={i} className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
              {text}
            </p>
          ))}
        </section>
      ))}
    </main>
  )
}
