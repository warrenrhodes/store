import { motion } from "framer-motion";

function GeneralCTAComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-12">
      <motion.div
        className="max-w-lg p-6 bg-white rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Find Your Perfect Match
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Discover quality products for every need. From gourmet coffee to the
          latest tech and baby essentials, we have it all. Browse our collection
          and find what fits your life best!
        </motion.p>

        <motion.button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
}

export default GeneralCTAComponent;
