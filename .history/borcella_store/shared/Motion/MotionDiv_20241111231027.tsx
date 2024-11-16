import { motion } from "framer-motion";

export const MotionDiv = ({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) => {
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
        duration: 0.2,
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
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
