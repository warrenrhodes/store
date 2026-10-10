import StatusPage from '@/components/NotFound'

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Page introuvable"
      description="Cette page n'existe pas ou a été déplacée. Découvrez plutôt nos produits."
    />
  )
}
