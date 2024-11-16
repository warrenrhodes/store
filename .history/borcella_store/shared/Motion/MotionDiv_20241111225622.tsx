import { motion } from "framer-motion";
import { useState } from "react";

export const MotionDiv = ({ children }: { children: React.ReactNode }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      y: 20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      key={index}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`absolute ${desktopPositions[index]} max-w-xs`}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
    >
      {children}
    </motion.div>
  );
};
