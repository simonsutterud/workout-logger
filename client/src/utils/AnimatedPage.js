import React from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={animations}
      inital="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
