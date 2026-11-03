import notificationapi from 'notificationapi-node-server-sdk'

const clientId = process.env.NOTIFICATIONAPI_CLIENT_ID
const clientSecret = process.env.NOTIFICATIONAPI_CLIENT_SECRET

/** False without credentials (local, tests): sends are skipped instead of crashing orders. */
export const notificationsEnabled = !!clientId && !!clientSecret
if (notificationsEnabled) notificationapi.init(clientId!, clientSecret!)

export default notificationapi
