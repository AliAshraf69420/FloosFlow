import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hover = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
