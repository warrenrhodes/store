'use client'

import { motion } from 'framer-motion'
import { icons } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import { IProduct } from '@/lib/api/products'

const iconNames = Object.keys(LucideIcons).filter(
  name => name !== 'createLucideIcon' && name !== 'default',
)

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturesForProducts({ product }: { product: IProduct }) {
  const { features, description } = product

  if (!features || features.length === 0) {
    return <></>
  }

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Advanced Features</h2>
        <p className="mt-2 text-muted-foreground">
          Discover what makes our Smart Fitness Watch Pro stand out
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map(feature => {
          const lucideIcon = iconNames.find(iconName => iconName.toLowerCase() === feature?.icon)
          let LucideIcon: React.ComponentType<LucideIcons.LucideProps> | null = null
          if (lucideIcon) {
            LucideIcon = icons[lucideIcon as keyof typeof icons]
          }
          return (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  {LucideIcon && <LucideIcon className="w-10 h-10 text-primary mb-2" />}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {feature.description && (
                    <CardDescription>
                      {description.contentType === 'TEXT' ? (
                        <p className="text-muted-foreground line-clamp-2">{description.content}</p>
                      ) : (
                        <div
                          className="prose prose-slate prose-sm sm:prose text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: product.description.content,
                          }}
                        />
                      )}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
