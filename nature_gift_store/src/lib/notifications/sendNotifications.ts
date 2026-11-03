// Store alerts by email and SMS (NotificationAPI). The content is built in @ngift/core/emails:
// no template to create in NotificationAPI, `type` only files the sends in its logs. Without
// credentials nothing is sent. Never throws: an order or a message is saved either way.
import { PLATFORM_URL } from '@/lib/site'
import type { EmailContent } from '@ngift/core/emails'
import { Channels } from 'notificationapi-node-server-sdk'
import notificationapi, { notificationsEnabled } from './notificationConfig'

/** The logo at the top of the emails. */
export const EMAIL_LOGO = `${PLATFORM_URL}/logo-wordmark.png`

export async function sendEmail(props: {
  email: string
  type: string
  content: EmailContent
  /** The visitor's address, for a contact message: answering the email writes to them. */
  replyTo?: string
}) {
  if (!notificationsEnabled) return false
  try {
    await notificationapi.send({
      type: props.type,
      to: { id: props.email, email: props.email },
      forceChannels: [Channels.EMAIL],
      email: { ...props.content, senderName: 'N.Gift' },
      ...(props.replyTo && { options: { email: { replyToAddresses: [props.replyTo] } } }),
    })
    return true
  } catch (error) {
    console.error(`NotificationAPI email ${props.type} failed:`, error)
    return false
  }
}

export async function sendSms(props: { phone: string; type: string; message: string }) {
  if (!notificationsEnabled) return false
  try {
    await notificationapi.send({
      type: props.type,
      to: { id: props.phone, number: props.phone },
      forceChannels: [Channels.SMS],
      sms: { message: props.message },
    })
    return true
  } catch (error) {
    console.error(`NotificationAPI SMS ${props.type} failed:`, error)
    return false
  }
}
