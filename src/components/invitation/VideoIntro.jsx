import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2 } from 'lucide-react';

const VideoIntro = ({ onComplete, coupleNames, t }) => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="fixed inset-0 z-[500] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!isStarted ? (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer border border-white/20 hover:bg-white/20 transition-colors"
              onClick={() => setIsStarted(true)}
            >
              <Play className="w-8 h-8 text-white fill-white" />
            </motion.div>
            <h2 className="text-white font-montserrat tracking-[0.5em] uppercase text-[10px] mb-2 opacity-60">{t.platinumExclusive || 'Platinum Exclusive'}</h2>
            <h1 className="text-white text-4xl font-cinzel">{t.cinematicJourney || 'A Cinematic Journey Begins'}</h1>
          </motion.div>
        ) : (
          <motion.div 
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative"
          >
            {/* Cinematic Placeholder (Matches the video style) */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
               <motion.div 
                 initial={{ opacity: 0, scale: 1.2 }}
                 animate={{ opacity: 0.4, scale: 1 }}
                 transition={{ duration: 10, ease: "easeOut" }}
                 className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
               />
            </div>

            {/* Cinematic Text Reveal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1, duration: 2 }}
                 className="mb-8"
               >
                  <span className="text-gold font-montserrat tracking-[0.8em] uppercase text-[9px] font-bold block mb-4">{t.togetherFamilies || 'Together with their families'}</span>
                  <h2 className="text-white text-5xl md:text-7xl font-pinyon mb-4">{coupleNames}</h2>
                  <p className="text-white/60 font-cinzel tracking-[0.5em] uppercase text-[10px]">{t.inviteToCelebrate || 'Invite you to celebrate their love'}</p>
               </motion.div>

               <motion.div
                 initial={{ width: 0 }}
                 animate={{ width: "200px" }}
                 transition={{ delay: 2.5, duration: 1.5 }}
                 className="h-[1px] bg-gold/50 mx-auto mb-8"
               />

               <motion.button
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 5 }}
                 onClick={onComplete}
                 className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white rounded-full font-cinzel text-[10px] uppercase tracking-[0.5em] transition-all"
               >
                  {t.enterExperience || 'Enter Experience'}
               </motion.button>
            </div>

            {/* Subtle Light Leaks */}
            <motion.div 
               animate={{ 
                 opacity: [0.1, 0.3, 0.1],
                 x: [0, 50, 0],
                 y: [0, -30, 0]
               }}
               transition={{ duration: 8, repeat: Infinity }}
               className="absolute top-0 left-0 w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
         <Volume2 className="w-3 h-3 text-white" />
         <span className="text-white text-[8px] uppercase tracking-widest font-serif">{t.soundRecommended || 'Sound on recommended'}</span>
      </div>
    </div>
  );
};

export default VideoIntro;
