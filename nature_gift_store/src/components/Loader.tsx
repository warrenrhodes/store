import { Suspense } from 'react'

async function Loader({
  children,
  loading,
}: {
  children: React.ReactNode
  loading: React.ReactNode
}) {
  return <Suspense fallback={loading}>{children}</Suspense>
}

export default Loader
