// The platform's emails to store owners and invited staff (NotificationAPI,
// NOTIFICATIONAPI_CLIENT_ID/SECRET, the same account as the storefront's). The content is built
// here (@ngift/core/emails): no template to create in NotificationAPI, `type` only files the
// sends in its logs. Without credentials nothing is sent. Never throws.
import notificationapi, { Channels } from 'notificationapi-node-server-sdk'
import type { EmailContent } from '@ngift/core/emails'
import { PLATFORM_URL } from '@/lib/storefront'

const clientId = process.env.NOTIFICATIONAPI_CLIENT_ID
const clientSecret = process.env.NOTIFICATIONAPI_CLIENT_SECRET
const enabled = !!clientId && !!clientSecret
if (enabled) notificationapi.init(clientId!, clientSecret!)

/** The logo at the top of the emails (served by the storefront). */
export const EMAIL_LOGO = `${PLATFORM_URL}/logo-wordmark.png`

/** True once NotificationAPI accepted it (delivery happens after: see its logs). */
export async function sendEmail(
  email: string | null | undefined,
  type: string,
  content: EmailContent,
) {
  if (!enabled || !email) return false
  try {
    await notificationapi.send({
      type,
      to: { id: email, email },
      forceChannels: [Channels.EMAIL],
      email: { ...content, senderName: 'N.Gift' },
    })
    return true
  } catch (error) {
    console.error(`NotificationAPI ${type} failed:`, error)
    return false
  }
}
