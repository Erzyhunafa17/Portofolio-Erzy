import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

const TiltDiv = ({ children, className }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 5,
        speed: 400,
        glare: false,
        scale: 1.01
      });
    }
    return () => {
      if (tiltRef.current && tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

// A draggable Neo-Brutalist sticker with an elastic rubber band!
const DraggableSticker = ({ text, color, rotate, top, left, right, bottom }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <div className="absolute" style={{ top, left, right, bottom, zIndex: 40 }}>
      {/* Tali / Karet Visual */}
      <svg className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none" style={{ zIndex: 10 }}>
        <motion.line
          x1={0}
          y1={0}
          x2={x}
          y2={y}
          stroke="#333333"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      
      <motion.div
        drag
        dragSnapToOrigin={true}
        dragElastic={0.6} // Membuat efek tarikan berat seperti karet
        style={{ x, y, rotate: rotate, backgroundColor: color }}
        whileHover={{ scale: 1.15, zIndex: 50 }}
        whileDrag={{ scale: 1.25, boxShadow: '16px 16px 0px #333333', cursor: 'grabbing' }}
        className="relative cursor-grab font-display uppercase border-4 border-charcoal-ink px-4 py-2 z-20 shadow-[4px_4px_0_#333333] transition-colors"
      >
        {text}
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative w-full min-h-screen bg-cloud-white flex items-center justify-center py-24 px-5 sm:px-10 lg:px-20 overflow-hidden border-t-8 border-charcoal-ink">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1 relative"
        >
          {/* Surprise Interactive Sticker */}
          <DraggableSticker text="Tarik Aku! 👆" color="#ffe600" rotate={-5} top="-40px" left="20px" />
          
          <div className="relative mt-8 lg:mt-0">
            <h2 className="font-display text-[40px] sm:text-[60px] leading-stacked text-charcoal-ink uppercase drop-shadow-[4px_4px_0_#007fff]">
              TENTANG SAYA
            </h2>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-signal-yellow border-4 border-charcoal-ink -z-10 shadow-[4px_4px_0_#333333]"></div>
          </div>
          
          <TiltDiv className="font-sans text-[16px] md:text-[18px] leading-[1.8] border-4 border-charcoal-ink p-8 bg-cloud-white shadow-[12px_12px_0_#333333]">
            <p className="mb-4">
              Saya seorang mahasiswa <strong>Teknik Informatika</strong> yang memiliki hasrat tinggi di bidang Software Engineering dan Web Development.
            </p>
            <p className="mb-4">
              Fokus saya adalah menciptakan pengalaman digital yang tidak hanya fungsional tetapi juga interaktif dan visual yang kuat, menggabungkan logika pemrograman dengan kreativitas desain.
            </p>
            <p className="bg-signal-yellow font-bold p-3 border-2 border-charcoal-ink inline-block transform -rotate-1 hover:bg-roof-coral hover:text-cloud-white transition-colors cursor-crosshair">
              "Antusias terhadap pemecahan masalah dan eksplorasi teknologi."
            </p>
          </TiltDiv>

          <DraggableSticker text="Bug Hunter 🐛" color="#00c853" rotate={8} bottom="-20px" right="40px" />
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-sm group">
            {/* Background decorative offset boxes */}
            <div className="absolute inset-0 bg-globe-azure border-4 border-charcoal-ink transform translate-x-4 translate-y-4 shadow-[8px_8px_0_#333333]"></div>
            <div className="absolute inset-0 bg-roof-coral border-4 border-charcoal-ink transform -translate-x-2 -translate-y-2"></div>
            
            {/* Pop-out Hello sticker (Doesn't block face, pops out from top right) */}
            <div className="absolute -top-8 -right-4 bg-cloud-white border-4 border-charcoal-ink px-4 py-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-300 pointer-events-none z-30 shadow-[4px_4px_0_#333333] transform rotate-6">
              <span className="font-display text-2xl text-charcoal-ink uppercase">Hello! 👋</span>
            </div>

            <TiltDiv className="relative z-10 w-full aspect-square border-4 border-charcoal-ink bg-cloud-white p-2">
              <div className="w-full h-full overflow-hidden border-2 border-charcoal-ink">
                <img 
                  src="/foto_saya.jpeg" 
                  alt="Foto Erzy Hunafa" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
              </div>
            </TiltDiv>
            
            {/* Fun stickers scattered around */}
            <DraggableSticker text="ME! 👀" color="#007fff" rotate={12} bottom="-30px" right="-10px" />
            <DraggableSticker text="100% Coder 💻" color="#ef3b2c" rotate={-15} top="-20px" right="40px" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
export { TiltDiv };
