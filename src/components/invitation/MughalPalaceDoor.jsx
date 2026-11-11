import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MughalPalaceDoor
 * 100% Symmetric, Authentic Ornate Green Mughal Arch Door
 * Completely removes phone mockup frames.
 * The left door is an exact horizontal mirror of the right door for flawless symmetry.
 * When unlocked, plays a smooth 3D opening animation parting the doors into the royal invitation.
 */
export default function MughalPalaceDoor({ onOpen, config, initials }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      if (onOpen) onOpen();
    }, 1400);
  };

  const name1 = config?.couple?.name1 || config?.couple?.groom || '';
  const name2 = config?.couple?.name2 || config?.couple?.bride || '';
  
  // Dynamic initials calculation from actual names or initials config
  const derivedInitials = initials || (name1 && name2 
    ? `${name1.trim().charAt(0).toUpperCase()}&${name2.trim().charAt(0).toUpperCase()}` 
    : 'H&P');

  const groomName = name1 ? name1.split(' ')[0] : 'Groom';
  const brideName = name2 ? name2.split(' ')[0] : 'Bride';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06120D] overflow-hidden select-none">
      {/* Background Ambience / Subtle Starry Night Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0D291E] via-[#081812] to-[#040B08]" />
      
      {/* Glowing Lantern Ambience (Floating Bokeh) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Palace Arch Container */}
      <div className="relative w-full max-w-[440px] h-[100dvh] max-h-[920px] flex flex-col items-center justify-between py-6 px-4 z-10">
        
        {/* Top Header: Bismillah & Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-20 pt-2"
        >
          <div className="font-serif text-amber-200/90 text-sm md:text-base tracking-[0.25em] mb-1">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-amber-400/80 font-medium">
            The Royal Wedding Invitation
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-2" />
        </motion.div>

        {/* Center: Symmetric Mughal Arch Door */}
        <div className="relative w-full flex-1 max-h-[640px] my-auto flex items-center justify-center">
          
          {/* Ornate Arch Frame Border */}
          <div 
            className="relative w-[310px] sm:w-[340px] h-[520px] sm:h-[570px] rounded-t-[170px] border-2 border-amber-500/60 shadow-[0_0_40px_rgba(217,119,6,0.25)] overflow-hidden flex bg-[#0A1F17]"
            style={{
              boxShadow: '0 0 0 4px #07130E, 0 0 0 6px rgba(217,119,6,0.4), 0 20px 45px rgba(0,0,0,0.85)'
            }}
          >
            {/* Interior Revealed when doors open (Clean Palace Hallway & Couple names) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/assets/mughal_palace_interior_clean.jpg)',
                filter: 'brightness(0.9)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#06140E] via-black/40 to-[#06140E]/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300 font-serif">Welcome To The Palace</span>
                <h2 className="font-serif text-3xl text-amber-100 italic tracking-wide font-medium">
                  {groomName} & {brideName}
                </h2>
                <div className="w-16 h-[1px] bg-amber-400/50 mx-auto my-1" />
                <span className="text-[9px] uppercase tracking-widest text-amber-300/80 font-sans">
                  Entering The Royal Celebration...
                </span>
              </div>
            </div>

            {/* Left Door Leaf (Mirrored for 100% symmetric carving match) */}
            <motion.div
              animate={{ 
                x: isOpen ? '-105%' : '0%',
                rotateY: isOpen ? -45 : 0
              }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-1/2 h-full border-r border-amber-400/40 overflow-hidden shadow-2xl origin-left z-10"
              style={{
                backgroundImage: 'url(/assets/mughal_door_half_left.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'right center'
              }}
            >
              {/* Door Carving Depth & Shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-amber-400/60 shadow-[0_0_8px_#F59E0B]" />
            </motion.div>

            {/* Right Door Leaf */}
            <motion.div
              animate={{ 
                x: isOpen ? '105%' : '0%',
                rotateY: isOpen ? 45 : 0
              }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-1/2 h-full border-l border-amber-400/40 overflow-hidden shadow-2xl origin-right z-10"
              style={{
                backgroundImage: 'url(/assets/mughal_door_half_right.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'left center'
              }}
            >
              {/* Door Carving Depth & Shadow */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-amber-400/60 shadow-[0_0_8px_#F59E0B]" />
            </motion.div>

            {/* Central Round Medallion Lock Button (Centered on the door seam) */}
            <AnimatePresence>
              {!isOpen && (
                <motion.button
                  key="medallion-btn"
                  onClick={handleOpen}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Unlock Door"
                >
                  {/* Glowing halo behind medallion */}
                  <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl group-hover:bg-amber-400/40 transition-all duration-500" />
                  
                  {/* Ornate Medallion */}
                  <div className="relative w-20 h-20 rounded-full p-[2px] bg-gradient-to-b from-amber-200 via-amber-500 to-amber-800 shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#0D241B] border border-amber-300/40 flex flex-col items-center justify-center text-center shadow-inner">
                      <span className="font-serif italic text-amber-200 text-lg tracking-widest font-bold">
                        {derivedInitials}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest text-amber-400/90 font-medium mt-0.5">
                        OPEN
                      </span>
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Radiant Opening Light Beam */}
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.4 }}
                className="absolute inset-0 bg-amber-100/40 z-30 pointer-events-none mix-blend-overlay"
              />
            )}
          </div>
        </div>

        {/* Bottom CTA & Instruction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center z-20 pb-2 cursor-pointer"
          onClick={handleOpen}
        >
          <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center mx-auto mb-2 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105 transition-transform">
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-serif">
            Tap The Medallion To Enter
          </div>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mt-2" />
        </motion.div>

      </div>
    </div>
  );
}
