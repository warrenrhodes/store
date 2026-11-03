// The platform's emails to store owners (NotificationAPI, NOTIFICATIONAPI_CLIENT_ID/SECRET, the
// same account as the storefront's). Without credentials nothing is sent. Never throws.
import notificationapi from 'notificationapi-node-server-sdk'

const clientId = process.env.NOTIFICATIONAPI_CLIENT_ID
const clientSecret = process.env.NOTIFICATIONAPI_CLIENT_SECRET
const enabled = !!clientId && !!clientSecret
if (enabled) notificationapi.init(clientId!, clientSecret!)

/** `notificationId`: a notification created in NotificationAPI, its merge tags = `data`. */
export async function emailOwner(
  email: string | null | undefined,
  notificationId: string,
  data: Record<string, string>,
) {
  if (!enabled || !email) return false
  try {
    await notificationapi.send({ notificationId, user: { id: email, email }, mergeTags: data })
    return true
  } catch (error) {
    console.error(`NotificationAPI ${notificationId} failed:`, error)
    return false
  }
}
