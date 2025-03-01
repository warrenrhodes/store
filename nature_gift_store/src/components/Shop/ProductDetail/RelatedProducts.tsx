'use client'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ProductCard'
import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function RelatedProducts({ relatedProducts }: { relatedProducts: Product[] }) {
  const { localization } = useLocalization()

  if (relatedProducts.length === 0) {
    return <></>
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">{localization.youMayAlsoLike}</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {relatedProducts.map(product => (
          <ProductCard key={`${product.path}`} product={product} />
        ))}
      </motion.div>
    </section>
  )
}
