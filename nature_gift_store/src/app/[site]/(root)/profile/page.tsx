import ProfileView from '@/components/Profile/ProfileView'
import { getAllCollectionFresh, siteOf } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Order } from '@/lib/firebase/models'
import { getDatabasePath, QueryFilter } from '@spreeloop/database'
import { clientConfig, serverConfig } from 'config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

export default async function ProfilePage({ params }: { params: Promise<{ site: string }> }) {
  const { store } = await siteOf(params)
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })
  const orders = await getAllCollectionFresh<Order>({
    collection: CollectionsName.Orders,
    filters: [
      new QueryFilter(
        'userPath',
        '==',
        getDatabasePath(CollectionsName.Users, token?.decodedToken?.uid),
      ),
      // In a store, its orders only.
      ...(store ? [new QueryFilter('storeId', '==', store.id)] : []),
    ],
  })
  return (
    <div className="flex md:flex-row gap-8 items-center justify-center  flex-col">
      <ProfileView orders={orders} />
    </div>
  )
}
