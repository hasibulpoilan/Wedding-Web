import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Calendar, MapPin, Send } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'story', label: 'Our Story', icon: Heart },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'venue', label: 'Venue', icon: MapPin },
    { id: 'rsvp', label: 'RSVP', icon: Send },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[150] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-deep-green text-white' : 'bg-white text-gold border border-gold/20'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-8 z-[150] bg-white/90 backdrop-blur-xl border border-gold/20 rounded-3xl p-4 shadow-2xl w-64 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 ml-2">Navigation</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-4 p-4 hover:bg-gold/10 rounded-2xl transition-all group text-left"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-montserrat text-sm font-bold text-deep-green tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[140] bg-black/20 backdrop-blur-[2px]"
        />
      )}
    </>
  );
};

export default Navigation;
