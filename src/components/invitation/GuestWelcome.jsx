import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuestWelcome = ({ guestName, coupleNames, onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-cream flex flex-col items-center justify-center text-center p-6 overflow-hidden"
        >
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -15, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="text-xs uppercase tracking-[0.5em] text-gold font-bold mb-8 block">A Special Invitation for</span>
              <h2 className="text-5xl md:text-7xl font-pinyon text-deep-green mb-8 leading-tight">
                Dearest {guestName}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="w-16 h-[1px] bg-gold/30 mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-lg md:text-xl font-serif text-deep-green italic leading-relaxed mb-12"
            >
              You are cordially invited to witness the union of<br/>
              <span className="text-3xl md:text-4xl font-serif not-italic font-bold text-gold mt-4 block">
                {coupleNames}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              <button 
                onClick={() => setShow(false)}
                className="px-10 py-4 bg-transparent border border-gold text-gold text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-gold hover:text-white transition-all duration-500"
              >
                Enter the Celebration
              </button>
            </motion.div>
          </div>

          {/* Decorative Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                y: [0, -100, -200]
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity, 
                delay: i * 0.5 
              }}
              className="absolute text-gold/30 text-xl"
              style={{ 
                left: `${15 + i * 15}%`, 
                bottom: '10%' 
              }}
            >
              ✦
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestWelcome;
