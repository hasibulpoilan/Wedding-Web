import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Envelope = ({ initials, onOpen }) => {
  const [isBreaking, setIsBreaking] = useState(false);
  const [isUnfolding, setIsUnfolding] = useState(false);

  const handleBreak = () => {
    setIsBreaking(true);
    setTimeout(() => setIsUnfolding(true), 500);
    setTimeout(onOpen, 2000);
  };

  return (
    <motion.div 
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm"
    >
      <div className="relative w-72 h-52 perspective-1000">
        {/* Lower Part of Envelope */}
        <motion.div 
          className="absolute inset-0 bg-envelope-red rounded-sm z-10 shadow-2xl overflow-hidden"
          style={{ 
            backgroundImage: 'url("/assets/envelope.png")', 
            backgroundSize: 'cover',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Top Flap */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/2 bg-envelope-red origin-top z-20 shadow-lg"
          animate={isUnfolding ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ 
            backgroundImage: 'url("/assets/envelope.png")', 
            backgroundSize: 'cover',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)' 
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Content (Peeking out) */}
        <motion.div 
          animate={isUnfolding ? { y: -20, opacity: 1 } : { y: 0, opacity: 0 }}
          className="absolute inset-x-4 top-4 bottom-4 bg-cream z-0 shadow-inner p-4 flex flex-col items-center justify-center text-center border border-gold/20"
        >
          <h3 className="font-pinyon text-gold text-2xl">{initials}</h3>
          <div className="w-10 h-[1px] bg-gold/30 my-1" />
          <p className="text-[10px] uppercase tracking-widest text-deep-green opacity-60 font-montserrat">Wedding Invite</p>
        </motion.div>

        {/* Wax Seal */}
        <AnimatePresence>
          {!isUnfolding && (
            <motion.div 
              initial={{ scale: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
              onClick={!isBreaking ? handleBreak : undefined}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-16 bg-[#a11d1d] rounded-full shadow-xl flex items-center justify-center border-4 border-[#7a1414]"
              >
                <span className="text-white font-pinyon text-2xl select-none">{initials}</span>
                
                {/* Glow ring */}
                {isBreaking && (
                  <motion.div 
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    className="absolute inset-0 border-2 border-gold rounded-full"
                  />
                )}
              </motion.div>
              
              {/* Floating glow */}
              {!isBreaking && (
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gold/20 rounded-full blur-xl -z-10"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Radiant Light Spread */}
        {isUnfolding && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 30, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeIn" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full z-[80] pointer-events-none"
          />
        )}
      </div>

      {!isBreaking && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-20 text-white font-montserrat tracking-[0.3em] text-[10px] uppercase"
        >
          Tap the seal to open
        </motion.div>
      )}
    </motion.div>
  );
};

export default Envelope;
