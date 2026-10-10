'use client'

import { ContactForm } from '@/components/ContactForm/Form'
import { useLocalization } from '@/hooks/useLocalization'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/237696689073'

export default function ContactPage() {
  const { localization } = useLocalization()

  const items: { icon: typeof MapPin; title: string; lines: string[]; prefix?: string }[] = [
    { icon: MapPin, title: localization.ourLocation, lines: [localization.locationAddress] },
    {
      icon: Phone,
      title: localization.phone,
      lines: ['+237 6 96 68 90 73'],
      prefix: 'tel:',
    },
    {
      icon: Mail,
      title: localization.email,
      lines: ['natures.gift.237@gmail.com', 'webanalyse237@gmail.com'],
      prefix: 'mailto:',
    },
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{localization.getInTouch}</h1>
        <p className="mt-3 text-muted-foreground">{localization.contactDescription}</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl bg-primary p-5 text-primary-foreground transition hover:bg-primary/90"
          >
            <MessageCircle className="h-7 w-7 shrink-0" aria-hidden />
            <span>
              <span className="block font-semibold">{localization.chatOnWhatsApp}</span>
              <span className="text-sm text-primary-foreground/85">
                {localization.fastestAnswer}
              </span>
            </span>
          </a>
          {items.map(({ icon: Icon, title, lines, prefix }) => (
            <div key={title} className="flex items-start gap-4 rounded-xl border p-5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div className="text-sm">
                <h2 className="font-sans font-semibold">{title}</h2>
                {lines.map(line =>
                  prefix ? (
                    <a
                      key={line}
                      href={prefix + line.replace(/\s/g, '')}
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-muted-foreground">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border p-6 sm:p-8 lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
