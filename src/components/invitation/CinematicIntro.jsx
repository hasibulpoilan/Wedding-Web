import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const Particles = () => {
  // Memoize particles so they don't re-render on every scene change
  const particles = useMemo(() => [...Array(60)].map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: `${Math.random() * 100}vw`,
    y: `${Math.random() * 100}vh`,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle light rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50 mix-blend-screen" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/60"
          initial={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            y: [null, `calc(${p.y} - 20vh)`],
            opacity: [0, Math.random() * 0.8 + 0.2, 0],
            scale: [0.5, p.size, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
             width: `${p.size}px`,
             height: `${p.size}px`,
             boxShadow: '0 0 12px 2px rgba(212, 175, 55, 0.4)'
          }}
        />
      ))}
    </div>
  );
};

const CinematicIntro = ({ config, guestName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  const sequence = useMemo(() => {
    const seq = [
      { id: 1, duration: 2500, content: "a wonderful beginning", type: 'script' },
      { id: 2, duration: 2500, content: "a moment to remember", type: 'script' },
      { id: 3, duration: 2500, content: "a lifetime of happiness", type: 'script' },
      { id: 4, duration: 2500, content: "the sweetness of sharing", type: 'script' },
      { id: 5, duration: 3000, content: "YOU ARE INVITED TO THE WEDDING OF", type: 'serif-caps' },
      { id: 6, duration: 4000, type: 'names' },
      { id: 7, duration: 3000, content: "AND YOUR PRESENCE WILL BE EXTREMELY IMPORTANT FOR US", type: 'serif-caps' },
      { id: 8, duration: 3500, type: 'savethedate' },
    ];

    if (guestName) {
      seq.push({ id: 9, duration: 3000, content: `Dear ${guestName}`, type: 'script-large' });
      seq.push({ id: 10, duration: 3000, content: "You are cordially invited to celebrate with us", type: 'serif' });
    }

    seq.push({ id: 11, duration: 0, type: 'final' });
    return seq;
  }, [config, guestName]);

  useEffect(() => {
    if (isSkipped) return;
    const currentPhase = sequence[currentStep];
    if (currentPhase && currentPhase.duration > 0) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, currentPhase.duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isSkipped, sequence]);

  const handleSkip = () => {
    setIsSkipped(true);
    setCurrentStep(sequence.length - 1);
  };

  const renderScene = (scene) => {
    if (!scene) return null;

    switch (scene.type) {
      case 'script':
        return (
          <motion.h2 className="font-pinyon text-5xl md:text-7xl text-gold text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            {scene.content}
          </motion.h2>
        );
      case 'serif-caps':
        return (
          <motion.h3 className="font-cinzel text-lg md:text-2xl tracking-[0.3em] text-gold/90 text-center uppercase leading-relaxed max-w-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            {scene.content}
          </motion.h3>
        );
      case 'names':
        return (
          <div className="flex flex-col items-center border border-gold/30 p-10 md:p-16 relative bg-black/20 backdrop-blur-sm">
             <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
             <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
             <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
             <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />
             <h1 className="font-pinyon text-6xl md:text-8xl text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">{config.couple.name1}</h1>
             <span className="font-cinzel text-xs text-gold/50 tracking-[0.4em] my-6 uppercase">Weds</span>
             <h1 className="font-pinyon text-6xl md:text-8xl text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">{config.couple.name2}</h1>
          </div>
        );
      case 'savethedate':
        return (
          <div className="relative flex items-center justify-center">
             <div className="absolute w-52 h-52 border border-gold/40 rotate-45" />
             <div className="absolute w-56 h-56 border border-gold/10 rotate-45" />
             <h3 className="font-cinzel tracking-[0.4em] text-xl md:text-2xl text-gold uppercase z-10 text-center leading-loose drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                Please<br/>Save The<br/>Date
             </h3>
          </div>
        );
      case 'script-large':
        return (
          <h1 className="font-pinyon text-6xl md:text-8xl text-gold text-center drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
            {scene.content}
          </h1>
        );
      case 'serif':
        return (
          <p className="font-cormorant text-2xl md:text-4xl text-gold/80 italic text-center max-w-xl leading-relaxed">
            {scene.content}
          </p>
        );
      case 'final':
        return (
          <div className="flex flex-col items-center text-center space-y-12 w-full px-4 relative z-10">
            <div className="space-y-4">
              <h1 className="font-pinyon text-7xl md:text-9xl text-gold drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                {config.couple.name1} & {config.couple.name2}
              </h1>
              {guestName && (
                 <p className="font-cinzel text-gold/70 tracking-widest uppercase text-sm mt-6 block drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                   Dear {guestName}, We can't wait to see you
                 </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-4xl border-y border-gold/20 py-10 bg-black/10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent pointer-events-none" />
              <div className="flex flex-col items-center relative z-10">
                <span className="font-cinzel text-gold/50 tracking-[0.3em] uppercase text-xs mb-3">Date</span>
                <span className="font-cormorant text-2xl md:text-3xl text-gold">{format(new Date(config.date), 'MMMM do, yyyy')}</span>
              </div>
              <div className="flex flex-col items-center relative z-10">
                <span className="font-cinzel text-gold/50 tracking-[0.3em] uppercase text-xs mb-3">Time</span>
                <span className="font-cormorant text-2xl md:text-3xl text-gold">{config.events[0]?.time || '5:00 PM'}</span>
              </div>
              <div className="flex flex-col items-center relative z-10">
                <span className="font-cinzel text-gold/50 tracking-[0.3em] uppercase text-xs mb-3">Venue</span>
                <span className="font-cormorant text-2xl md:text-3xl text-gold whitespace-pre-wrap">{config.venue}</span>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 opacity-60 pt-10"
            >
              <span className="text-[9px] uppercase tracking-[0.5em] text-gold">Scroll to Explore</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0500] via-[#1a0f00] to-[#0a0500] overflow-hidden">
      <Particles />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          {renderScene(sequence[currentStep])}
        </motion.div>
      </AnimatePresence>

      {/* Skip Button */}
      {currentStep < sequence.length - 1 && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-50 text-[10px] text-gold/40 uppercase tracking-widest border border-gold/20 px-4 py-2 rounded-full hover:bg-gold/10 hover:text-gold transition-all backdrop-blur-sm"
        >
          Skip Intro
        </button>
      )}

      {/* Fade transition to the cream background below for seamless scroll */}
      {currentStep === sequence.length - 1 && (
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-cream pointer-events-none z-20" />
      )}
    </section>
  );
};

export default CinematicIntro;
