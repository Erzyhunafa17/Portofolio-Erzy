import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[10px] bg-roof-coral z-[9999] border-b-4 border-charcoal-ink origin-left shadow-[0_4px_0_#333333]"
      style={{ scaleX }}
    />
  );
};

export default ProgressBar;
