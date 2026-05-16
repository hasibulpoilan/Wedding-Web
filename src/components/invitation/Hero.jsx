import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, differenceInSeconds } from 'date-fns';
import { bn } from 'date-fns/locale';
import { toBengaliDigits } from '../../lib/translations';

const Hero = ({ config, guestName, t, lang, invitedProgramsLabel }) => {
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
  let displayDate = format(weddingDateFormatter, lang === 'bn' ? 'd MMMM, yyyy' : 'MMMM do, yyyy', { 
    locale: lang === 'bn' ? bn : undefined 
  });
  
  if (lang === 'bn') {
    displayDate = toBengaliDigits(displayDate);
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-10 bg-cream px-6 overflow-hidden">
      {/* Premium Background Light Flares */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-gold/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-gold/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Guest Welcome Message */}
      {guestName && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center w-full px-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold/60 font-bold mb-1 block">{t.welcomeGuest}</span>
          <h2 className="text-3xl md:text-5xl font-pinyon text-gold leading-tight">
            {guestName === 'Our Special Guest' ? t.specialGuest : guestName}
          </h2>
          <div className="w-8 h-[1px] bg-gold/20 mx-auto mt-2" />
          {invitedProgramsLabel && (
            <p className="mt-4 text-[9px] uppercase tracking-[0.35em] text-deep-green/50 font-bold max-w-md mx-auto">
              {t.invitedTo || 'Invited to'}: {invitedProgramsLabel}
            </p>
          )}
        </motion.div>
      )}

      {/* Background Cinematic Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[18rem] md:text-[25rem] font-cursive whitespace-nowrap rotate-[-12deg]">
          {t.foreverTogether || 'Forever Together'}
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
        <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-montserrat font-medium text-gold/80">{t.invitationOf}</p>
      </motion.div>

      {/* Main Names */}
      <div className="text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative inline-block"
        >
          <h1 className="text-7xl md:text-[11rem] font-pinyon text-deep-green leading-[0.8] mb-4 drop-shadow-sm">
            {config.couple.name1}
          </h1>
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="text-4xl md:text-6xl font-cursive text-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream/80 backdrop-blur-sm px-6 py-2 rounded-full border border-gold/10 shadow-sm z-10"
          >
            {t.and}
          </motion.div>
          <h1 className="text-7xl md:text-[11rem] font-pinyon text-deep-green leading-[0.8] mt-4 drop-shadow-sm">
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
        <p className="text-lg md:text-xl font-cormorant italic text-gold mb-6 tracking-[0.2em]">{t.embarkingJourney}</p>
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
        className="grid grid-cols-4 gap-4 md:gap-10 mb-20 relative z-10"
      >
        {Object.entries(timeLeft).map(([unit, value], idx) => (
          <div key={unit} className="flex flex-col items-center">
             <div className="relative group">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-gold/10 flex flex-col items-center justify-center bg-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-500 group-hover:border-gold/30">
                   <span className="text-xl md:text-3xl font-serif text-deep-green font-light">
                     {lang === 'bn' ? toBengaliDigits(value) : value}
                   </span>
                   <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-gold/60 mt-1 font-bold">{t[unit] || unit}</span>
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
        <span className="text-[8px] uppercase tracking-[0.8em] text-gold font-bold">{t.scroll}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>

      {/* Floating Cinematic Sparkles & Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(30)].map((_, i) => (
           <motion.div 
             key={i}
             animate={{ 
               y: [Math.random() * -100, Math.random() * 100],
               x: [Math.random() * -100, Math.random() * 100],
               opacity: [0.05, 0.4, 0.05],
               scale: [1, 1.8, 1],
               rotate: [0, 360]
             }}
             transition={{ 
               duration: 8 + Math.random() * 12, 
               repeat: Infinity,
               ease: "linear"
             }}
             className="absolute bg-gold rounded-full blur-[1px]"
             style={{ 
               top: `${Math.random() * 100}%`, 
               left: `${Math.random() * 100}%`,
               width: `${Math.random() * 3 + 1}px`,
               height: `${Math.random() * 3 + 1}px`
             }}
           />
         ))}
         
         {/* Floating Icons (Premium Touch) */}
         {[...Array(5)].map((_, i) => (
           <motion.div
             key={`icon-${i}`}
             animate={{
               y: [0, -100, 0],
               x: [0, Math.random() * 50 - 25, 0],
               opacity: [0, 0.15, 0],
               rotate: [0, 20, 0]
             }}
             transition={{
               duration: 20 + i * 5,
               repeat: Infinity,
               ease: "easeInOut",
               delay: i * 4
             }}
             className="absolute text-gold text-4xl"
             style={{
               top: `${20 + i * 15}%`,
               left: `${5 + i * 20}%`
             }}
           >
             {i % 2 === 0 ? "✥" : "✦"}
           </motion.div>
         ))}
      </div>
    </section>
  );
};

export default Hero;
