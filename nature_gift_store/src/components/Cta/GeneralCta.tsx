'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Section } from '../Sections'

function GeneralCTAComponent() {
  const router = useRouter()

  return (
    <Section className="mb-10 rounded-2xl  w-full bg-[url('/bgProducts.png')] bg-cover bg-center bg-no-repeat">
      <motion.div
        className="flex flex-col items-center  py-16 bg-gray-900/50 rounded-2xl"
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
          Find Your Perfect Match
        </motion.h2>

        <motion.p
          className="mx-auto w-[80%] text-center md:w-[50%] text-white/60 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Discover quality products for every need. From gourmet coffee to the latest tech and baby
          essentials, we have it all. Browse our collection and find what fits your life best!
        </motion.p>

        <motion.button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/products')}
        >
          See Our Products
        </motion.button>
      </motion.div>
    </Section>
  )
}

export default GeneralCTAComponent
