'use client'

import { motion } from 'framer-motion'
import { Copy, Tag, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { IPromotion } from '@/lib/models/Promotions'
import { getDetailedExpiresIn } from '@/lib/utils/utils'

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

export function ActivePromotions({ activePromotions }: { activePromotions: IPromotion[] }) {
  if (activePromotions.length === 0) {
    return <></>
  }
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ description: 'Promotion code copied to clipboard!' })
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Available Promotions</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activePromotions.map(promo => {
          const expiresIn = getDetailedExpiresIn(promo.endDate)
          return (
            <motion.div key={`${promo._id}`} variants={itemVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Tag className="h-5 w-5" />
                    <span className="text-sm font-medium">Special Offer</span>
                  </div>
                  <CardTitle>{promo.name}</CardTitle>
                  <CardDescription>{promo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Expires in {expiresIn}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyCode(promo.code)}>
                      {promo.code}
                      <Copy className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
