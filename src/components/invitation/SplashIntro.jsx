import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particles = () => {
  // Increased count to 250 for a dense starfield effect
  const colors = ['#FF69B4', '#FF1493', '#FF4D4D', '#D4AF37', '#E0115F', '#FFB6C1', '#FF007F', '#FF3366'];

  const particles = useMemo(() => [...Array(200)].map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    return {
      id: i,
      size: i % 8 === 0 ? Math.random() * 60 + 30 : Math.random() * 15 + 5,
      startX: 50,
      startY: 50,
      endX: 50 + Math.cos(angle) * distance,
      endY: 50 + Math.sin(angle) * distance,
      duration: Math.random() * 2 + 0.8,
      delay: Math.random() * 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 1080 - 540
    };
  }), []);

  const driftParticles = useMemo(() => [...Array(40)].map((_, i) => ({
    id: `drift-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cinematic Rotating Rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-[0.07]"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(212,175,55,0.2), transparent 15deg, transparent 30deg, rgba(212,175,55,0.2) 45deg, transparent 60deg)'
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,251,247,0)_0%,_rgba(253,251,247,0.8)_100%)] pointer-events-none" />

      {/* Floating Background Sparkles */}
      {driftParticles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%` }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [`${p.y}%`, `${p.y - 15}%`],
            scale: [1, 1.8, 1]
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bg-gold rounded-full blur-[1px]"
          style={{ width: p.size, height: p.size }}
        />
      ))}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute flex items-center justify-center"
          initial={{
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{
            left: [`${p.startX}%`, `${p.endX}%`],
            top: [`${p.startY}%`, `${p.endY}%`],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 2, 2.5],
            rotate: [0, p.rotation]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut"
          }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          <svg viewBox="0 0 32 32" fill={p.color} className="w-full h-full drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]">
            <path d="M16 28.5L14.1 26.8C7.4 20.8 3 16.8 3 11.9C3 7.9 6.1 4.8 10.1 4.8C12.3 4.8 14.5 5.9 15.9 7.6C17.3 5.9 19.5 4.8 21.7 4.8C25.7 4.8 28.8 7.9 28.8 11.9C28.8 16.8 24.4 20.8 17.7 26.8L16 28.5Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const SplashIntro = ({ guestName, config }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(15px)', scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,251,247,0)_0%,_rgba(253,251,247,1)_100%)] pointer-events-none" />
      <Particles />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: [0.9, 1.05, 1], filter: 'blur(0px)' }}
        transition={{
          delay: 0.1,
          duration: 1.2,
          ease: "easeOut",
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="relative z-10 text-center px-4"
      >
        {/* Shimmering Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none z-20"
          style={{
            animation: 'textShimmer 2.5s infinite linear',
            backgroundSize: '200% 100%'
          }}
        />
        <style>{`
          @keyframes textShimmer {
            0% { transform: translateX(-150%) skewX(-25deg); }
            100% { transform: translateX(150%) skewX(-25deg); }
          }
        `}</style>
        {guestName ? (
          <>
            <span className="font-cinzel text-deep-green/60 tracking-[0.4em] uppercase text-xs md:text-sm mb-6 block">
              A Special Welcome
            </span>
            <h1 className="font-pinyon text-7xl md:text-9xl text-deep-green drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              {guestName}
            </h1>
          </>
        ) : (
          <>
            <span className="font-cinzel text-deep-green/60 tracking-[0.4em] uppercase text-xs md:text-sm mb-6 block">
              A Wonderful Beginning
            </span>
            <h1 className="font-pinyon text-7xl md:text-9xl text-deep-green drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              {config.couple.name1} & {config.couple.name2}
            </h1>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SplashIntro;
