import React from 'react';
import { motion } from 'framer-motion';

const Petals = () => {
  const petals = [...Array(15)];

  return (
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -100, 
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          animate={{ 
            top: '110%',
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            rotate: [Math.random() * 360, Math.random() * 720],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 15, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 2
          }}
          className="absolute"
        >
          {/* Rose Petal Shape */}
          <div 
            className="w-6 h-8 bg-red-600/40 rounded-full blur-[1px]"
            style={{ 
              clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
              boxShadow: 'inset -2px -2px 10px rgba(0,0,0,0.1)'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Petals;
