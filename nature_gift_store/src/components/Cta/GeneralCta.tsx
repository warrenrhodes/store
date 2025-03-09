'use client'
import { useLocalization } from '@/hooks/useLocalization'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function GeneralCTAComponent() {
  const router = useRouter()
  const { localization } = useLocalization()

  return (
    <div className="mb-10 rounded-xl w-full bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 max-sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {localization.ctaTitle}
            </motion.h2>

            <motion.p
              className="text-sm text-white/70 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {localization.ctaDescription}
            </motion.p>

            <motion.button
              className="px-8 py-4 bg-[#b91e77] text-white rounded-xl text-lg font-semibold hover:bg-[#a01a69] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b91e77] focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/products')}
            >
              {localization.ctaButton}
            </motion.button>
          </motion.div>

          {/* Right side illustration */}
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/illustration.png"
              alt="Premium features illustration"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GeneralCTAComponent
