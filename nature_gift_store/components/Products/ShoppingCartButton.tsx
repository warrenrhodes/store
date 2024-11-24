'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartSideBar } from '@/lib/hooks/useCart'

export function ShoppingCartButton() {
  const { onOpenChange } = useCartSideBar()
  return (
    <motion.div
      className="fixed bottom-6 right-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        size="lg"
        className="rounded-full h-16 w-16 shadow-lg"
        onClick={() => onOpenChange(true)}
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>
    </motion.div>
  )
}
