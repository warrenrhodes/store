'use client'
import { useLocalization } from '@/hooks/useLocalization'
import { useLocale } from '@/hooks/useLocale'
import { navItems } from '@/lib/utils/navItems'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SiteLink as Link, useSite } from '@/components/Site'
import { BrandMark } from './Header/BrandMark'
import { LEGAL_TITLES, legalDocsOf } from '@/lib/legal'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { localization } = useLocalization()
  const { locale } = useLocale()
  const { isMarket, whatsapp, email, name } = useSite()

  return (
    <footer className="bg-foreground text-background/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="text-background">
              <BrandMark className="h-8 w-auto rounded bg-white p-1" />
            </div>
            <p className="max-w-xs text-sm">{localization.footerDescription}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-background">
              {localization.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-background transition-colors">
                    {item.title[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/profile?tabs=orders"
                  className="hover:text-background transition-colors"
                >
                  {localization.orders}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-background">
              {localization.contactUs}
            </h3>
            <ul className="space-y-3 text-sm">
              {isMarket && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    Yaoundé, Carrefour Ekoudoum, lieu dit restaurant Droit Chemin, à côté de
                    l&apos;Hôtel IRIS
                  </span>
                </li>
              )}
              {whatsapp && (
                <>
                  <li>
                    <a
                      href={`tel:+${whatsapp}`}
                      className="flex items-center gap-3 hover:text-background"
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden />+{whatsapp}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-background"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                      WhatsApp
                    </a>
                  </li>
                </>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 hover:text-background"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden />
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6 lg:px-8">
          <span>
            © {currentYear} {isMarket ? localization.copyright : name}
          </span>
          <nav aria-label={localization.legal}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalDocsOf(isMarket).map(doc => (
                <li key={doc}>
                  <Link
                    href={`/legal/${doc}`}
                    className="hover:text-background underline-offset-4 hover:underline"
                  >
                    {LEGAL_TITLES[doc][locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
