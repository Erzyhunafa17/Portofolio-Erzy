import React, { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from 'framer-motion';

// Utilitas manual untuk wrap angka tanpa perlu library eksternal
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Komponen Teks Parallax yang merespon kecepatan scroll
const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Wrap antara -20% dan -45% agar teks selalu menyambung sempurna saat loop
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Ubah arah jika scroll terbalik
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full">
      <motion.div 
        className="font-display text-[120px] sm:text-[180px] lg:text-[250px] text-cloud-white uppercase flex whitespace-nowrap flex-nowrap gap-8" 
        style={{ x }}
      >
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
      </motion.div>
    </div>
  );
};

// Custom card component for the bounce/press effect with interactive sticker badges
const SkillCard = ({ title, color, items, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay, type: "spring", bounce: 0.4 }}
      whileHover={{ 
        scale: 1.02, 
        rotate: (Math.random() - 0.5) * 2,
        boxShadow: `12px 12px 0px ${color}`
      }}
      whileTap={{ 
        scale: 0.95, 
        rotate: 0,
        boxShadow: `0px 0px 0px ${color}`
      }}
      className="border-4 border-charcoal-ink bg-cloud-white p-6 cursor-crosshair transition-colors flex flex-col"
      style={{ boxShadow: `8px 8px 0px ${color}` }}
    >
      <h3 className="font-display text-[28px] uppercase mb-6 border-b-4 border-charcoal-ink pb-2" style={{ color: color === '#333333' ? '#333333' : color }}>
        {title}
      </h3>
      
      {/* Kumpulan Sticker Badge */}
      <div className="flex flex-wrap gap-3 mt-auto">
        {items.map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ 
              y: -8, 
              scale: 1.15, 
              rotate: (Math.random() - 0.5) * 15,
              backgroundColor: color,
              color: color === '#333333' ? '#ffffff' : '#333333'
            }}
            whileTap={{ scale: 0.9, y: 0 }}
            className="border-2 border-charcoal-ink bg-cloud-white px-3 py-1 font-bold font-sans text-sm md:text-base text-charcoal-ink shadow-[4px_4px_0_#333333] cursor-pointer transition-colors duration-100"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative w-full min-h-screen bg-globe-azure flex flex-col items-center justify-center py-[100px] px-5 sm:px-10 lg:px-20 overflow-hidden border-t-8 border-charcoal-ink">
      
      {/* Animated Velocity Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 flex flex-col justify-between py-10">
        <ParallaxText baseVelocity={2}>TECH STACK • TECH STACK •</ParallaxText>
        <ParallaxText baseVelocity={-2}>HARDWARE • SOFTWARE •</ParallaxText>
        <ParallaxText baseVelocity={2}>INNOVATION • CREATIVITY •</ParallaxText>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true }}
          className="bg-signal-yellow border-4 border-charcoal-ink px-8 py-4 mb-16 shadow-[8px_8px_0_#333333]"
        >
          <h2 className="font-display text-[40px] sm:text-[50px] text-charcoal-ink uppercase drop-shadow-[2px_2px_0_#ffffff]">
            Kemampuan
          </h2>
        </motion.div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <SkillCard 
            title="Programming" 
            color="#ef3b2c" // Red
            delay={0.1}
            items={["JavaScript", "Python", "C++", "Java", "TypeScript"]} 
          />
          
          <SkillCard 
            title="Web Dev" 
            color="#ffe600" // Yellow
            delay={0.2}
            items={["React", "Next.js", "Node.js", "Tailwind", "Three.js", "Framer"]} 
          />

          <SkillCard 
            title="Tools & DB" 
            color="#333333" // Black
            delay={0.3}
            items={["Git", "GitHub", "MySQL", "PostgreSQL", "Docker", "Figma"]} 
          />

          <SkillCard 
            title="IoT / Hardware" 
            color="#00c853" // Green
            delay={0.4}
            items={["Mikrokontroler", "Arduino", "ESP32", "Sensors", "C for IoT"]} 
          />

        </div>
      </div>
    </section>
  );
};

export default Skills;
