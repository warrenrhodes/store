'use server'

import { getSiteContext } from '@/lib/api/utils'
import { EMAIL_LOGO, sendEmail } from '@/lib/notifications/sendNotifications'
import { contactEmail } from '@ngift/core/emails'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  site: string
}

export async function submitContactForm(data: ContactFormData) {
  const name = data.name?.trim()
  const email = data.email?.trim()
  const subject = data.subject?.trim()
  const message = data.message?.trim()
  if (!name || !subject || !message || !/^\S+@\S+\.\S+$/.test(email ?? '')) {
    return { success: false, error: 'Invalid form' }
  }

  // A store's messages go to its alert emails (else its public email), the marketplace's to the platform.
  const ctx = await getSiteContext(data.site)
  if (!ctx) return { success: false, error: 'Invalid form' }
  const settings = ctx.store?.settings
  const adminEmails = ctx.store
    ? settings?.notificationEmails?.length
      ? settings.notificationEmails
      : [settings?.contactEmail].filter((e): e is string => !!e)
    : (process.env.PLATFORM_CONTACT_EMAIL ?? '')
        .split(',')
        .map(e => e.trim())
        .filter(Boolean)

  if (adminEmails.length === 0) {
    console.warn('No admin emails configured')
    return { success: true } // Return true to avoid showing error to user if config is missing but submission worked "technically"
  }

  const content = contactEmail({
    logoUrl: EMAIL_LOGO,
    siteName: ctx.store?.name ?? 'N.Gift',
    name,
    email: email!,
    subject,
    message,
  })
  try {
    await Promise.all(
      adminEmails.map(adminEmail =>
        sendEmail({ email: adminEmail, type: 'new_message', content, replyTo: email }),
      ),
    )
    return { success: true }
  } catch (error) {
    console.error('Failed to send email notifications:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
