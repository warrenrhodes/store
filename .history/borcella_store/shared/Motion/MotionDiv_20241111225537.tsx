import { motion } from "framer-motion";
import { useState } from "react";

export const MotionDiv = ({ children }: { children: React.ReactNode }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
