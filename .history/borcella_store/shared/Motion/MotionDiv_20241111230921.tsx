import { motion } from "framer-motion";
import { useState } from "react";

export const MotionDiv = ({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) => {
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
      whileHover={{ scale: 1.03 }}
      className={className}
      onHoverStart={() => setHoveredIndex(index || null)}
      onHoverEnd={() => setHoveredIndex(null)}
    >
      <motion.div animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}>
        {children}
      </motion.div>
    </motion.div>
  );
};
