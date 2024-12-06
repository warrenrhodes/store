import notificationapi from 'notificationapi-node-server-sdk'

notificationapi.init(
  process.env.NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID || '',
  process.env.NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET || '',
)

export default notificationapi
