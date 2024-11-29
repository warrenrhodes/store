"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromotionBanner() {
  return (
    <section className="bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <Zap className="h-6 w-6 text-primary-foreground" />
                <span className="text-lg font-medium text-primary-foreground">Flash Sale</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Tech & Wellness Bundle
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Save 30% on selected electronics and health products. Today only!
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                size="lg"
                variant="secondary"
                className="group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}