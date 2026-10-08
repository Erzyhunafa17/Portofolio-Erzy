import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Komponen pengetikan otomatis (Typewriter)
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length + 10) { // Biarkan cursor berkedip sejenak setelah selesai
        i = 0; // Ulangi dari awal jika ingin looping (atau matikan clearInterval)
      }
    }, 150);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse font-normal">|</span>
    </span>
  );
};

const Hero = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const controls = useAnimation();

  const triggerConfetti = (e) => {
    setShowConfetti(true);
    controls.start({
      scale: [1, 0.9, 1.1, 1],
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    });

    const btnRect = e.target.getBoundingClientRect();
    const burstColors = ['#ffe600', '#ef3b2c', '#007fff', '#ffffff', '#00c853', '#ec4899'];
    
    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div');
      const isCircle = Math.random() > 0.5;
      const size = Math.random() * 20 + 10;
      
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = burstColors[Math.floor(Math.random() * burstColors.length)];
      confetti.style.position = 'fixed';
      confetti.style.border = '3px solid #333333';
      if (isCircle) confetti.style.borderRadius = '50%';
      confetti.style.zIndex = '9999';
      
      confetti.style.left = `${btnRect.left + btnRect.width / 2}px`;
      confetti.style.top = `${btnRect.top + btnRect.height / 2}px`;
      
      document.body.appendChild(confetti);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 500;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity - 300;

      confetti.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        { transform: `translate(${x}px, ${y}px) scale(1.5) rotate(${Math.random() * 1080}deg)`, offset: 0.6 },
        { transform: `translate(${x * 1.5}px, window.innerHeight) scale(0) rotate(${Math.random() * 1080}deg)` }
      ], {
        duration: 2500 + Math.random() * 1500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }).onfinish = () => confetti.remove();
    }
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-5 sm:px-10 lg:px-20 overflow-hidden bg-transparent">
      
      {/* Moving animated CSS background grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 animate-slide-bg" style={{ 
          backgroundImage: 'linear-gradient(#333 2px, transparent 2px), linear-gradient(90deg, #333 2px, transparent 2px)', 
          backgroundSize: '60px 60px',
          width: '200%',
          height: '200%'
        }}></div>
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Main Center Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-block border-4 border-charcoal-ink bg-cloud-white px-6 py-2 shadow-[4px_4px_0_#333333] transform -rotate-3"
          >
            <span className="font-sans font-bold text-sm md:text-lg uppercase tracking-wider text-charcoal-ink">
              Halo Dunia, Saya
            </span>
          </motion.div>

          <h1 className="font-display text-[60px] sm:text-[90px] lg:text-[120px] leading-[0.9] text-charcoal-ink uppercase drop-shadow-[6px_6px_0_#ffffff]">
            ERZY HUNAFA
          </h1>

          <div className="flex flex-col items-center gap-3 mt-4">
            {/* Role 1: Diketik (Typewriter) */}
            <div className="bg-roof-coral border-4 border-charcoal-ink px-6 py-3 shadow-[8px_8px_0_#333333] transform rotate-1">
              <p className="font-sans font-bold text-xl md:text-3xl text-cloud-white uppercase tracking-wide">
                <TypewriterText text="Web Development" />
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {/* Role 2: Bebas 1 (Bergetar / Wiggle) */}
              <motion.div 
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                className="bg-globe-azure border-4 border-charcoal-ink px-4 py-2 shadow-[4px_4px_0_#333333]"
              >
                <p className="font-sans font-bold text-lg md:text-xl text-cloud-white uppercase">
                  IoT Enthusiast
                </p>
              </motion.div>

              {/* Role 3: Bebas 2 (Melompat / Bouncing) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="bg-cloud-white border-4 border-charcoal-ink px-4 py-2 shadow-[4px_4px_0_#333333] transform -rotate-2"
              >
                <p className="font-sans font-bold text-lg md:text-xl text-charcoal-ink uppercase">
                  Data Analyst
                </p>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
            <motion.a 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: 0, x: 4, y: 4, boxShadow: '0px 0px 0px #333333' }}
              href="#projects" 
              className="inline-block border-4 border-charcoal-ink bg-signal-yellow text-charcoal-ink px-10 py-5 uppercase text-xl font-display tracking-wider hover:bg-charcoal-ink hover:text-signal-yellow transition-colors cursor-pointer shadow-[8px_8px_0_#333333]"
            >
              Lihat Proyek
            </motion.a>
            
            <motion.button 
              animate={controls}
              whileHover={{ scale: 1.05, rotate: -3 }}
              whileTap={{ scale: 0.9, rotate: 0, x: 4, y: 4, boxShadow: '0px 0px 0px #333333' }}
              onClick={triggerConfetti}
              className={`relative inline-block border-4 border-charcoal-ink bg-cloud-white text-charcoal-ink px-10 py-5 uppercase text-xl font-display tracking-wider cursor-pointer shadow-[8px_8px_0_#333333] overflow-hidden ${showConfetti ? 'bg-roof-coral text-cloud-white' : ''}`}
            >
              <span className="relative z-10">{showConfetti ? "BOOM! 💥" : "Sentuh Aku 🎈"}</span>
              <motion.div 
                className="absolute inset-0 bg-signal-yellow -z-0 opacity-0"
                whileHover={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="font-display uppercase tracking-widest text-charcoal-ink text-sm bg-cloud-white border-4 border-charcoal-ink px-4 py-1 shadow-[4px_4px_0_#333333]">
          Scroll Ke Bawah
        </span>
        <div className="w-10 h-10 border-4 border-charcoal-ink bg-signal-yellow shadow-[4px_4px_0_#333333] flex items-center justify-center transform rotate-45 mt-2">
          <span className="transform -rotate-45 text-2xl font-bold text-charcoal-ink">↓</span>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-bg {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-60px, -60px); }
        }
        .animate-slide-bg {
          animation: slide-bg 3s linear infinite;
        }
      `}} />
    </section>
  );
};

export default Hero;
