import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, differenceInSeconds } from 'date-fns';

const Hero = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(config.date);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(targetDate, now);
      
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (60 * 60 * 24)),
        hours: Math.floor((diff / (60 * 60)) % 24),
        minutes: Math.floor((diff / 60) % 60),
        seconds: Math.floor(diff % 60)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [config.date]);

  const weddingDateFormatter = new Date(config.date);
  const displayDate = format(weddingDateFormatter, 'MMMM do, yyyy');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 bg-cream px-6 overflow-hidden">
      {/* Background Cinematic Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[20rem] font-cursive whitespace-nowrap rotate-[-15deg]">
          Forever Together
        </h1>
      </div>

      {/* Decorative ornaments */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold mb-12 text-center relative z-10"
      >
        <div className="w-16 h-[1px] bg-gold/30 mx-auto mb-6" />
        <p className="text-[12px] uppercase tracking-[0.6em] font-montserrat font-medium text-gold/80">The Wedding Invitation of</p>
      </motion.div>

      {/* Main Names */}
      <div className="text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative inline-block"
        >
          <h1 className="text-7xl md:text-[11rem] font-pinyon text-deep-green leading-[0.8] mb-4">
            {config.couple.name1}
          </h1>
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="text-4xl md:text-6xl font-cursive text-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream px-6 py-2 rounded-full border border-gold/10 shadow-sm"
          >
            &
          </motion.div>
          <h1 className="text-7xl md:text-[11rem] font-pinyon text-deep-green leading-[0.8] mt-4">
            {config.couple.name2}
          </h1>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="text-center relative z-10"
      >
        <p className="text-xl font-cormorant italic text-gold mb-6 tracking-widest">Are embarking on a new journey together</p>
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="w-12 h-[1px] bg-gold/20" />
          <h2 className="text-2xl md:text-3xl font-cinzel tracking-[0.3em] text-deep-green uppercase">{displayDate}</h2>
          <div className="w-12 h-[1px] bg-gold/20" />
        </div>
      </motion.div>

      {/* Countdown UI */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-4 gap-6 md:gap-10 mb-20 relative z-10"
      >
        {Object.entries(timeLeft).map(([unit, value], idx) => (
          <div key={unit} className="flex flex-col items-center">
             <div className="relative group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold/10 flex flex-col items-center justify-center bg-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-500 group-hover:border-gold/30">
                   <span className="text-2xl md:text-3xl font-serif text-deep-green font-light">{value}</span>
                   <span className="text-[9px] uppercase tracking-widest text-gold/60 mt-1 font-bold">{unit}</span>
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 border border-gold/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />
             </div>
          </div>
        ))}
      </motion.div>
      
      {/* Scroll Down Hint */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 flex flex-col items-center gap-4 opacity-40"
      >
        <span className="text-[8px] uppercase tracking-[0.8em] text-gold">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>

      {/* Floating Cinematic Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(20)].map((_, i) => (
           <motion.div 
             key={i}
             animate={{ 
               y: [Math.random() * 100, Math.random() * 100],
               x: [Math.random() * 100, Math.random() * 100],
               opacity: [0.1, 0.5, 0.1],
               scale: [1, 1.5, 1]
             }}
             transition={{ 
               duration: 5 + Math.random() * 10, 
               repeat: Infinity,
               ease: "linear"
             }}
             className="absolute w-[2px] h-[2px] bg-gold rounded-full blur-[1px]"
             style={{ 
               top: `${Math.random() * 100}%`, 
               left: `${Math.random() * 100}%` 
             }}
           />
         ))}
      </div>
    </section>
  );
};

export default Hero;
