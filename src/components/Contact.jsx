import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <section id="contact" className="relative w-full min-h-screen bg-cloud-white flex flex-col items-center justify-center py-[100px] px-5 sm:px-10 lg:px-20 border-t-8 border-charcoal-ink overflow-hidden">
      
      {/* Animated Polka Dot Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <motion.div 
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#333 4px, transparent 4px)', 
            backgroundSize: '40px 40px' 
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, rotate: -5 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        className="bg-roof-coral border-4 border-charcoal-ink px-8 py-4 mb-12 shadow-[12px_12px_0_#333333] relative z-10"
      >
        <h2 className="font-display text-[40px] sm:text-[60px] text-cloud-white uppercase">
          Hubungi Saya
        </h2>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
        className="w-full max-w-3xl bg-signal-yellow border-4 border-charcoal-ink p-8 md:p-12 shadow-[16px_16px_0_#333333] relative z-10"
      >
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <label className="block font-display text-[20px] uppercase mb-2 text-charcoal-ink">Nama Anda</label>
            <motion.input 
              whileFocus={{ scale: 1.02 }}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              type="text" 
              className="w-full border-4 border-charcoal-ink p-4 font-sans font-bold text-lg focus:outline-none bg-cloud-white shadow-[6px_6px_0_#333333] transition-colors" 
              style={{ backgroundColor: focusedInput === 'name' ? '#e0f7fa' : '#ffffff' }}
              placeholder="Siapa namamu?" 
              required 
            />
          </div>
          <div className="relative">
            <label className="block font-display text-[20px] uppercase mb-2 text-charcoal-ink">Alamat Email</label>
            <motion.input 
              whileFocus={{ scale: 1.02 }}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              type="email" 
              className="w-full border-4 border-charcoal-ink p-4 font-sans font-bold text-lg focus:outline-none bg-cloud-white shadow-[6px_6px_0_#333333] transition-colors" 
              style={{ backgroundColor: focusedInput === 'email' ? '#ffebee' : '#ffffff' }}
              placeholder="email@contoh.com" 
              required 
            />
          </div>
          <div className="relative">
            <label className="block font-display text-[20px] uppercase mb-2 text-charcoal-ink">Pesan Tersembunyi</label>
            <motion.textarea 
              whileFocus={{ scale: 1.02 }}
              onFocus={() => setFocusedInput('message')}
              onBlur={() => setFocusedInput(null)}
              rows="5" 
              className="w-full border-4 border-charcoal-ink p-4 font-sans font-bold text-lg focus:outline-none bg-cloud-white shadow-[6px_6px_0_#333333] resize-none transition-colors" 
              style={{ backgroundColor: focusedInput === 'message' ? '#fff9c4' : '#ffffff' }}
              placeholder="Ketik pesannya di sini..." 
              required
            ></motion.textarea>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, rotate: -1 }}
            whileTap={{ scale: 0.95, x: 6, y: 6, boxShadow: '0px 0px 0px #333333' }}
            type="submit" 
            className="w-full border-4 border-charcoal-ink bg-globe-azure text-cloud-white py-6 uppercase font-display text-[24px] tracking-wider hover:bg-charcoal-ink transition-colors cursor-pointer shadow-[8px_8px_0_#333333]"
          >
            KIRIM PESAN SEKARANG 🚀
          </motion.button>
        </form>
      </motion.div>

      {/* Social Links */}
      <div className="mt-20 flex flex-wrap justify-center gap-6 relative z-10">
        {[
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/erzy-hunafa' },
          { name: 'Instagram', url: 'https://www.instagram.com/erzyhunafa/' },
          { name: 'GitHub', url: 'https://github.com/Erzyhunafa17' },
          { name: 'Email', url: 'mailto:erzyhunafa@gmail.com' }
        ].map((social) => (
          <motion.a 
            key={social.name}
            whileHover={{ y: -5, rotate: (Math.random() - 0.5) * 10 }}
            href={social.url}
            target={social.name === 'Email' ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="border-4 border-charcoal-ink bg-cloud-white px-6 py-2 font-display uppercase text-xl text-charcoal-ink shadow-[4px_4px_0_#333333] hover:bg-signal-yellow transition-colors"
          >
            {social.name}
          </motion.a>
        ))}
      </div>

      <footer className="mt-16 text-center font-sans font-bold text-[14px] uppercase relative z-10 bg-charcoal-ink text-signal-yellow px-6 py-2 border-4 border-charcoal-ink transform rotate-1">
        Copyright &copy; 2026 Erzy Hunafa. Built with Neo-Brutalism.
      </footer>
    </section>
  );
};

export default Contact;
