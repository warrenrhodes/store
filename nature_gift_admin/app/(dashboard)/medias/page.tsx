import { getMedias } from '@/lib/actions/server'
import { MediaList } from './mediaList'

export default async function MediasPage() {
  const medias = await getMedias()
  return (
    <div className="container py-10">
      <MediaList medias={medias} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
