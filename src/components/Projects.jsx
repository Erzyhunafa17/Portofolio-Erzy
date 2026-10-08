import React from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "Sistem Informasi Akademik",
    tags: ["React", "Node.js", "PostgreSQL"],
    desc: "Membangun platform manajemen data mahasiswa dan nilai dengan dashboard interaktif. Dilengkapi dengan otentikasi aman dan pelaporan otomatis.",
    bgColor: "#007fff", // globe-azure
    textColor: "#ffffff",
    rotate: -2
  },
  {
    id: 2,
    title: "E-Commerce Pop-up",
    tags: ["Next.js", "Tailwind", "Three.js"],
    desc: "Website toko online dengan visual bergaya storybook 3D interaktif. Menggunakan integrasi keranjang belanja tanpa reload untuk pengalaman yang mulus.",
    bgColor: "#ef3b2c", // roof-coral
    textColor: "#ffffff",
    rotate: 2
  },
  {
    id: 3,
    title: "Interactive Data Viz",
    tags: ["D3.js", "React", "GSAP"],
    desc: "Dasbor visualisasi data kreatif yang menampilkan tren penggunaan teknologi, dikemas dengan animasi parallax yang imersif dan responsif.",
    bgColor: "#ffffff", // cloud-white
    textColor: "#333333",
    rotate: -1
  }
];

const Projects = () => {
  return (
    <section id="projects" className="relative w-full min-h-screen bg-signal-yellow flex flex-col items-center justify-center py-[100px] px-5 sm:px-10 lg:px-20 overflow-hidden border-t-8 border-charcoal-ink">
      
      {/* Animated Background shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 border-[20px] border-charcoal-ink border-dashed rounded-full opacity-20"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-roof-coral border-8 border-charcoal-ink opacity-20"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-cloud-white border-4 border-charcoal-ink px-10 py-6 mb-20 shadow-[12px_12px_0_#333333] relative z-10 transform rotate-1"
      >
        <h2 className="font-display text-[40px] sm:text-[60px] text-charcoal-ink uppercase">
          Proyek Pilihan
        </h2>
      </motion.div>
      
      <div className="w-full max-w-6xl space-y-20 relative z-10">
        {projectsData.map((proj, i) => (
          <motion.div 
            key={proj.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className={`flex flex-col lg:flex-row gap-8 items-stretch ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Visual Box */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 0 }}
              className="w-full lg:w-1/2 cursor-pointer"
            >
              <div 
                className="w-full h-full min-h-[300px] border-4 border-charcoal-ink p-4 shadow-[16px_16px_0_#333333] flex items-center justify-center transition-colors"
                style={{ backgroundColor: proj.bgColor, transform: `rotate(${proj.rotate}deg)` }}
              >
                <div className="w-full h-full border-4 border-charcoal-ink bg-cloud-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden group">
                  <span className="font-display text-4xl uppercase opacity-80" style={{ color: proj.textColor }}>
                    Visual {proj.id}
                  </span>
                  
                  {/* Hover reveal text */}
                  <div className="absolute inset-0 bg-charcoal-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-display text-signal-yellow text-3xl uppercase tracking-widest">
                      Buka Proyek
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Info Box */}
            <motion.div 
              whileHover={{ x: i % 2 !== 0 ? -10 : 10 }}
              className="w-full lg:w-1/2 bg-cloud-white border-4 border-charcoal-ink p-8 shadow-[12px_12px_0_#333333] flex flex-col justify-center"
            >
              <h3 className="font-display text-[32px] sm:text-[40px] text-charcoal-ink mb-4 leading-none uppercase">{proj.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map(tag => (
                  <span key={tag} className="border-2 border-charcoal-ink bg-signal-yellow px-3 py-1 text-[12px] font-bold uppercase shadow-[2px_2px_0_#333333]">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="font-sans text-[16px] md:text-[18px] mb-8 font-medium leading-relaxed">
                {proj.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, x: 4, y: 4, boxShadow: '0px 0px 0px #333333' }}
                  href="#" 
                  className="border-4 border-charcoal-ink bg-globe-azure text-cloud-white px-8 py-3 uppercase font-display text-lg tracking-wider hover:bg-charcoal-ink hover:text-globe-azure transition-colors shadow-[6px_6px_0_#333333]"
                >
                  Live Demo
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, x: 4, y: 4, boxShadow: '0px 0px 0px #333333' }}
                  href="#" 
                  className="border-4 border-charcoal-ink bg-cloud-white text-charcoal-ink px-8 py-3 uppercase font-display text-lg tracking-wider hover:bg-charcoal-ink hover:text-cloud-white transition-colors shadow-[6px_6px_0_#333333]"
                >
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
