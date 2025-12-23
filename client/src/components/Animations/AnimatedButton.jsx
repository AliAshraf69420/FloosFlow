import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  variant = "primary" // primary, secondary, danger
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: disabled ? 1 : 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
        transition: { duration: 0.1 }
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
