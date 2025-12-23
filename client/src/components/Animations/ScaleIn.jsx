import { motion } from "framer-motion";

export default function ScaleIn({
  children,
  delay = 0,
  className = ""
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          delay,
          ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
        }
      }}
      viewport={{ once: true, margin: "-30px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
