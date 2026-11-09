import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VelvetFloralEnvelope = ({ initials, onOpen, t }) => {
  const [isBreaking, setIsBreaking] = useState(false);

  const handleBreak = () => {
    setIsBreaking(true);
    setTimeout(onOpen, 1000);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none bg-stone-950"
    >
      {/* 1. Exact High-Resolution Reference Photographic Scene */}
      <img
        src="/assets/theme2_envelope_bg.jpg"
        alt="Royal Velvet Envelope"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
      />

      {/* 2. Soft Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/35 pointer-events-none" />

      {/* 3. Invisible Interactive Click Area precisely covering the central wax seal */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        onClick={!isBreaking ? handleBreak : undefined}
        className="absolute top-[43%] sm:top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center group"
      >
        {/* Subtle breathing golden glow to show it's clickable */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-400/20 blur-md pointer-events-none"
        />

        {/* Burst wave on click */}
        {isBreaking && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-amber-300"
          />
        )}
      </motion.div>

      {/* 4. Invisible bottom click area also triggering open */}
      {!isBreaking && (
        <div
          onClick={handleBreak}
          className="absolute bottom-14 sm:bottom-18 left-1/2 -translate-x-1/2 w-72 h-20 z-20 cursor-pointer"
        />
      )}

      {/* 5. Smooth Flash Transition upon opening */}
      {isBreaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-amber-100 via-[#FFF9F4] to-[#FFF9F4] z-[90] pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default VelvetFloralEnvelope;
