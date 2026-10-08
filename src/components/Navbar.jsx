import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] md:w-auto`}
        id="navbar"
      >
        <div className={`border-4 border-charcoal-ink flex items-center justify-between px-6 py-3 transition-all duration-300 ${
          scrolled ? 'bg-cloud-white shadow-[8px_8px_0_#333333]' : 'bg-cloud-white/90 backdrop-blur-sm shadow-[4px_4px_0_#333333]'
        }`}>
          {/* Logo */}
          <div className="font-display text-xl uppercase tracking-wider md:hidden">
            EH.
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-2 text-sm font-bold uppercase">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  className={`block py-2 px-4 transition-all border-2 border-transparent ${
                    activeSection === link.id 
                      ? 'bg-globe-azure text-cloud-white border-charcoal-ink shadow-[2px_2px_0_#333333]' 
                      : 'text-charcoal-ink hover:bg-signal-yellow hover:border-charcoal-ink hover:shadow-[2px_2px_0_#333333]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 border-2 border-charcoal-ink bg-signal-yellow active:shadow-none shadow-[2px_2px_0_#333333]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-charcoal-ink mb-1.5"></div>
            <div className="w-6 h-0.5 bg-charcoal-ink mb-1.5"></div>
            <div className="w-6 h-0.5 bg-charcoal-ink"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-40 md:hidden bg-cloud-white border-4 border-charcoal-ink shadow-[8px_8px_0_#333333] flex flex-col p-4 gap-2"
          >
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 text-center font-bold uppercase border-2 ${
                  activeSection === link.id 
                    ? 'bg-globe-azure text-cloud-white border-charcoal-ink' 
                    : 'bg-cloud-white text-charcoal-ink border-transparent hover:border-charcoal-ink hover:bg-signal-yellow'
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
