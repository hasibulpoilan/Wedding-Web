import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, differenceInSeconds } from 'date-fns';
import { bn } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';
import { toBengaliDigits } from '../../lib/translations';

const FloralHero = ({ config, guestName, t, lang, invitedProgramsLabel }) => {
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
        minutes: Math.floor((diff / (60 * 60)) % 24),
        seconds: Math.floor(diff % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [config.date]);

  const weddingDateFormatter = new Date(config.date);
  const monthName = format(weddingDateFormatter, 'MMMM').toUpperCase();
  const dayYear = format(weddingDateFormatter, 'do, yyyy').toUpperCase();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-12 pb-16 px-4 md:px-8 overflow-hidden text-center select-none"
      style={{
        background: 'linear-gradient(180deg, #FFF9F4 0%, #FFF4ED 45%, #FEECE5 100%)',
      }}
    >
      {/* 1. Corner Flowers (Peony / Rose Bouquets rendered as clean decorative accents) */}
      <div className="absolute top-0 left-0 w-36 h-36 md:w-52 md:h-52 pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
          <circle cx="50" cy="50" r="42" fill="#F8B4C0" opacity="0.65" />
          <circle cx="75" cy="40" r="32" fill="#ED7D90" opacity="0.75" />
          <circle cx="45" cy="75" r="30" fill="#F49EAB" opacity="0.8" />
          <path d="M60,60 Q120,15 150,70 Q90,90 60,60" fill="#88A47C" opacity="0.6" />
          <path d="M35,80 Q15,140 80,130 Q70,90 35,80" fill="#6E8E61" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
          <circle cx="150" cy="150" r="42" fill="#F8B4C0" opacity="0.65" />
          <circle cx="125" cy="160" r="32" fill="#ED7D90" opacity="0.75" />
          <circle cx="155" cy="125" r="30" fill="#F49EAB" opacity="0.8" />
          <path d="M140,140 Q80,185 50,130 Q110,110 140,140" fill="#88A47C" opacity="0.6" />
          <path d="M165,120 Q185,60 120,70 Q130,110 165,120" fill="#6E8E61" opacity="0.5" />
        </svg>
      </div>

      {/* Thin Gold Vintage Corner Borders */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#D4AF37]/50 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#D4AF37]/50 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#D4AF37]/50 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#D4AF37]/50 rounded-br-lg pointer-events-none" />

      {/* Floating Gold Ribbons */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <path
            d="M-50,320 C250,180 550,550 1050,330 C1050,338 550,558 -50,328 Z"
            fill="url(#goldFlow)"
          />
          <defs>
            <linearGradient id="goldFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#F5DC8C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C59B42" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. Top Guest Welcome Section */}
      <div className="relative z-10 space-y-1 mt-2">
        <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase font-cinzel text-[#7E522F] font-semibold">
          A Special Welcome To Our Guest
        </p>
        <h2 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-[#6D3F1B] italic drop-shadow-sm my-1">
          {guestName || 'Our Special Guest'}
        </h2>
        {invitedProgramsLabel && (
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#7E522F]/80 font-sans font-bold">
            {t.invitedTo || 'Invited to'}: {invitedProgramsLabel}
          </p>
        )}

        {/* Delicate Heart Divider */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C59B63]" />
          <span className="text-xs text-[#B27342]">♡</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C59B63]" />
        </div>
      </div>

      {/* 3. Centerpiece: The Wedding Invitation of + Clean Gold Circular Ring */}
      <div className="relative z-10 my-4 flex flex-col items-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-[#704624] font-cinzel font-semibold mb-3">
          The Wedding Invitation Of
        </p>

        {/* Circular Gold Ring Frame with Couple Names */}
        <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 flex items-center justify-center">
          {/* Outer Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/25 via-white/80 to-amber-300/30 blur-md pointer-events-none" />

          {/* Thin Metallic Golden Ring with subtle floral accents attached */}
          <div
            className="absolute inset-2 sm:inset-3 rounded-full border-[2px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, #FFFFFF 50%, #FFF8F2 100%)',
            }}
          >
            {/* Top-left floral sprig on ring */}
            <div className="absolute -top-3 -left-3 w-16 h-16 pointer-events-none">
              <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                <circle cx="40" cy="40" r="16" fill="#F8B4C0" opacity="0.9" />
                <circle cx="34" cy="34" r="11" fill="#ED7D90" opacity="0.95" />
                <path d="M30,55 Q10,65 20,40 Q28,50 30,55" fill="#88A47C" />
              </svg>
            </div>

            {/* Bottom-right floral sprig on ring */}
            <div className="absolute -bottom-3 -right-3 w-18 h-18 pointer-events-none">
              <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                <circle cx="40" cy="40" r="18" fill="#F8B4C0" opacity="0.9" />
                <circle cx="48" cy="46" r="12" fill="#ED7D90" opacity="0.95" />
                <path d="M25,25 Q12,8 38,15 Q30,22 25,25" fill="#88A47C" />
              </svg>
            </div>

            {/* Fluttering Golden Butterfly */}
            <motion.div
              animate={{ y: [-2, 3, -2], rotate: [-2, 3, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 right-4 text-amber-500 text-lg drop-shadow"
            >
              🦋
            </motion.div>

            {/* Couple Names inside Ring (Deep Emerald Serif matching reference: soniya & raj) */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
              <h1 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-[#1E3B2B] leading-none drop-shadow-sm capitalize">
                {config.couple.name1}
              </h1>
              <span className="font-pinyon text-2xl sm:text-3xl text-[#B9835A] my-1 font-bold">&amp;</span>
              <h1 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-[#1E3B2B] leading-none drop-shadow-sm capitalize">
                {config.couple.name2}
              </h1>
            </div>
          </div>
        </div>

        {/* Embarking on a new journey together */}
        <div className="mt-4 space-y-1 max-w-md mx-auto">
          <p className="font-cormorant italic text-base sm:text-lg text-[#704624] tracking-wide">
            Are embarking on a new journey together
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-[1px] bg-gradient-to-r from-transparent to-[#C59B63]" />
            <span className="text-xs text-[#B27342]">♡</span>
            <div className="w-14 h-[1px] bg-gradient-to-l from-transparent to-[#C59B63]" />
          </div>

          {/* Date in Roman/Cinzel Serif with elegant letter spacing */}
          <div className="pt-1">
            <h3 className="font-cinzel text-lg sm:text-xl text-[#183626] tracking-[0.35em] font-medium">
              {monthName}
            </h3>
            <p className="font-cinzel text-sm sm:text-base text-[#183626] tracking-[0.25em] font-medium mt-0.5">
              {dayYear}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Glowing Gold Halo Countdown Timers (Clean, exactly matching reference) */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto mt-2">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 px-2">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div
                className="w-15 h-15 sm:w-18 sm:h-18 rounded-full flex flex-col items-center justify-center relative shadow-[0_4px_16px_rgba(212,175,55,0.25)]"
                style={{
                  background: 'radial-gradient(circle, #FFFFFF 65%, #FFF7EE 100%)',
                  border: '2px solid rgba(220, 175, 75, 0.85)',
                }}
              >
                <span className="font-cormorant font-bold text-xl sm:text-2xl text-[#2C2117] leading-none">
                  {lang === 'bn' ? toBengaliDigits(item.value) : item.value}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] font-sans font-bold tracking-[0.15em] text-[#8C6D4F] uppercase mt-0.5">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-0.5 mt-5 text-[#8A5A36] pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.35em] font-cinzel font-bold">Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
};

export default FloralHero;
