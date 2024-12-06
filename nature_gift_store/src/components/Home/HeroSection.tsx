'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart, Zap, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center theme-g"
          style={{
            backgroundImage: 'url(/hero.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
      </motion.div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-red-400" />
              <Zap className="w-6 h-6 text-yellow-400" />
              <ShoppingBag className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Everything You Need, All in One Place
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              From health & wellness to the latest tech gadgets. Discover quality products that
              enhance your lifestyle.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button size="lg" className="group" asChild>
                <Link href="/shop">
                  Explore Store
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
