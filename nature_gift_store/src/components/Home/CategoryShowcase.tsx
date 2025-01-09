'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '../ui/badge'
import useFilter from '@/hooks/useFilter'
import { useRouter } from 'next/navigation'
import { ICategory } from '@/lib/api/categories'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function CategoryShowcase({ categories }: { categories: ICategory[] }) {
  const router = useRouter()
  const { localization } = useLocalization()

  const { filters, setFilters, clearFilters } = useFilter()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {localization.exploreCategories}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find everything you need across our diverse range of products
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map(category => (
            <motion.div key={`${category.id}`} variants={itemVariants}>
              <div
                className="cursor-pointer"
                onClick={() => {
                  clearFilters()
                  setFilters({
                    ...filters,
                    categories: [category.id],
                  })
                  router.push(`/shop`)
                }}
              >
                <Card className="group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5]">
                      <div style={{ backgroundImage: `url(${category.image?.url})` }}>
                        <Image
                          src={category.image?.url || ''}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          placeholder="blur"
                          blurDataURL={category.image?.blurDataUrl || FAKE_BLUR}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/60" />
                      </div>
                      {category.featured && (
                        <Badge className="absolute top-4 left-4">Feature</Badge>
                      )}
                      <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                        <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                        <p className="mt-2 text-sm text-gray-300">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
