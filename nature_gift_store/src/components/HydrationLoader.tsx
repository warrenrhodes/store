import { motion } from 'framer-motion'

const HydrationLoader = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const loadingItemsVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    animate: {
      opacity: [0, 1, 0.7, 1],
      y: [20, 0, 5, 0],
      scale: [0.9, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'reverse' as const,
      },
    },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Background Dynamic Elements */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-300 blur-xl"
            style={{
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformOrigin: 'center center',
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: 'easeOut',
            },
          }}
          className="text-4xl font-bold text-gray-800 mb-6 tracking-tight"
        >
          Curating Your Perfect Shopping Experience
        </motion.h1>

        {/* Loading Indicators */}
        <div className="flex justify-center space-x-4 mb-6">
          {['Products', 'Prices', 'Recommendations', 'Deals', 'Inventory'].map(item => (
            <motion.div
              key={item}
              variants={loadingItemsVariants}
              initial="initial"
              animate="animate"
              className="flex items-center space-x-2 bg-white shadow-md rounded-full px-4 py-2"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 1.5,
              delay: 0.5,
              type: 'spring',
              bounce: 0.3,
            },
          }}
          className="flex justify-center space-x-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: 40,
                opacity: 1,
                transition: {
                  duration: 1,
                  delay: i * 0.2,
                  type: 'spring',
                  stiffness: 100,
                },
              }}
              className="h-1.5 bg-gray-300 rounded-full"
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1,
              duration: 1,
            },
          }}
          className="mt-6 text-lg text-gray-600 font-medium tracking-wider"
        >
          Optimizing your shopping journey • Fetching latest products • Personalizing
          recommendations
        </motion.p>
      </div>
    </div>
  )
}

export default HydrationLoader
