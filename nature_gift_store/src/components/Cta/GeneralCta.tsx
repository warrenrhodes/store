'use client'
import { useLocalization } from '@/hooks/useLocalization'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
function GeneralCTAComponent() {
  const router = useRouter()
  const { localization } = useLocalization()

  return (
    <section className="mb-10 rounded-2xl  w-full bg-[url('/bgProducts.png')] bg-cover bg-center bg-no-repeat">
      <motion.div
        className="flex flex-col items-center  py-16 bg-gray-900/80 rounded-2xl  w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-6xl font-bold text-white mb-5 text-center uppercase max-sm:text-2xl max-md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {localization.ctaTitle}
        </motion.h2>

        <motion.p
          className="mx-auto w-[80%] text-center md:w-[50%] text-white/90 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {localization.ctaDescription}
        </motion.p>

        <motion.button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/products')}
        >
          {localization.ctaButton}
        </motion.button>
      </motion.div>
    </section>
  )
}

export default GeneralCTAComponent
