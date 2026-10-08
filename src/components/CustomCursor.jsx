import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MousePointer2, Cpu } from 'lucide-react';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 35, stiffness: 400 }; // Dipercepat agar presisi
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Deteksi jika perangkat adalah layar sentuh (mobile/tablet)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    // Sembunyikan kursor bawaan secara global hanya untuk desktop
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      // Penyesuaian offset agar ujung panah pas dengan titik klik asli
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('.cursor-pointer') ||
        target.closest('.cursor-grab') ||
        target.closest('.cursor-crosshair')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return isTouchDevice ? null : (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center hidden md:flex"
      style={{ x, y }}
      animate={{
        scale: isHovered ? 1.2 : 1,
        rotate: isHovered ? 15 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
        {isHovered ? (
          // Icon saat hover: Chip / Processor (Mewakili IoT dan Tech)
          <div className="filter drop-shadow-[8px_8px_0_#333333]">
            <Cpu size={70} strokeWidth={2} color="#333333" fill="#00c853" />
          </div>
        ) : (
          // Icon default: Panah Raksasa (Neo-Brutalism)
          <div className="filter drop-shadow-[8px_8px_0_#333333]">
            <MousePointer2 size={80} strokeWidth={2} color="#333333" fill="#ffe600" />
          </div>
        )}
    </motion.div>
  );
};

export default CustomCursor;
