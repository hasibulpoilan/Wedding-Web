import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ScratchCard = ({ revealContent, revealDate }) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Fill with premium gold scratchable color
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.5, '#F9E498');
    gradient.addColorStop(1, '#D4AF37');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add luxury patterns
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Add text
    ctx.fillStyle = '#8B0000';
    ctx.font = 'bold 10px serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 + 5);

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const handleMove = (e) => {
    if (!isScratching) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / (pixels.length / 4)) * 100;
    if (percent > 45 && !hasTriggeredConfetti) {
      setIsRevealed(true);
      setHasTriggeredConfetti(true);
      triggerMagic();
    }
  };

  const triggerMagic = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D4AF37', '#8B0000', '#FDFBF7'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D4AF37', '#8B0000', '#FDFBF7'] });
    }, 250);
  };

  return (
    <div className="relative w-72 h-44 mx-auto group perspective-1000">
      {/* Hidden Content */}
      <motion.div 
        animate={isRevealed ? { scale: [1, 1.05, 1], rotateY: [0, 5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-white border-2 border-gold/20 rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-inner overflow-hidden"
      >
        {/* Light Burst Background */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 4, opacity: 0.1 }}
              className="absolute inset-0 bg-gold rounded-full blur-3xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3 font-bold">Save the Date</p>
        <h3 className="font-cursive text-4xl text-deep-green italic">{revealDate}</h3>
        <div className="w-8 h-[1px] bg-gold/20 my-4" />
        <p className="text-[8px] uppercase tracking-widest text-deep-green/60">Udaipur, Rajasthan</p>
      </motion.div>

      {/* Scratch Layer */}
      <motion.canvas
        ref={canvasRef}
        width={288}
        height={176}
        animate={isRevealed ? { opacity: 0, scale: 1.2, filter: 'blur(20px)' } : { opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute inset-0 rounded-2xl shadow-2xl cursor-crosshair touch-none z-10 ${isRevealed ? 'pointer-events-none' : ''}`}
        onMouseDown={() => setIsScratching(true)}
        onMouseUp={() => setIsScratching(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setIsScratching(true)}
        onTouchEnd={() => setIsScratching(false)}
        onTouchMove={handleMove}
      />
      
      {!isRevealed && (
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -bottom-10 left-0 w-full text-center text-[9px] uppercase tracking-[0.3em] text-gold font-bold"
        >
          Gently scratch to reveal
        </motion.div>
      )}
    </div>
  );
};

export default ScratchCard;
