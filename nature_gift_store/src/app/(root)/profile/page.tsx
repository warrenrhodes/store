import ProfileView from '@/components/Profile/ProfileView'
import { getAllCollection } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Order } from '@/lib/firebase/models'
import { getDatabasePath, QueryFilter } from '@spreeloop/database'
import { clientConfig, serverConfig } from 'config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

export default async function ProfilePage() {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })
  const orders = await getAllCollection<Order>({
    collection: CollectionsName.Orders,
    filters: [
      new QueryFilter(
        'userPath',
        '==',
        getDatabasePath(CollectionsName.Users, token?.decodedToken?.uid),
      ),
    ],
  })
  return (
    <div className="flex md:flex-row gap-8 items-center justify-center  flex-col">
      <ProfileView orders={orders} />
    </div>
  )
}
