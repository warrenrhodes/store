import { LocationsManager } from '@/components/locations/LocationsManager'
import { getLocationsCache } from '@/lib/actions/server'

export default async function LocationsPage() {
  const locations = await getLocationsCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <LocationsManager locations={locations} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
