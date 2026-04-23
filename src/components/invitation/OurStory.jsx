import React from 'react';
import { motion } from 'framer-motion';

const OurStory = ({ stories }) => {
  return (
    <section className="py-32 px-6 bg-[#FAF9F6] overflow-hidden relative min-h-[800px] md:min-h-screen">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -left-20 text-[15rem] font-cursive text-gold select-none"
        >
          Love
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 text-[15rem] font-cursive text-gold select-none"
        >
          Always
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold block mb-4"
        >
          A Glimpse of Our Journey
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl font-cursive text-deep-green mb-6"
        >
          Our Story
        </motion.h2>
        <div className="w-24 h-[1px] bg-gold/30 mx-auto" />
      </div>

      {/* Scattered Scrapbook Layout */}
      <div className="relative max-w-5xl mx-auto px-4 h-[600px] md:h-[700px] mt-12">
        {stories.map((story, index) => {
          // Precise scattered positions to match the "natural" look in the video
          const positions = [
            { top: '0%', left: '5%', rotate: -8, scale: 0.95 },   // Top Left
            { top: '15%', left: '50%', rotate: 5, scale: 1.05 }, // Center-ish
            { top: '45%', left: '15%', rotate: -4, scale: 1 },    // Mid Left
            { top: '55%', left: '55%', rotate: 6, scale: 0.98 },  // Bottom Right
          ];
          
          const pos = positions[index % positions.length];

          return (
            <motion.div
              key={story.id}
              initial={{ 
                opacity: 0, 
                scale: 0.5, 
                rotate: 0,
                y: 100 
              }}
              whileInView={{ 
                opacity: 1, 
                scale: pos.scale, 
                rotate: pos.rotate,
                y: 0 
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 50, 
                transition: { type: "spring", stiffness: 300 } 
              }}
              className="absolute w-[240px] md:w-[320px] cursor-pointer"
              style={{
                left: pos.left,
                top: pos.top,
                transform: `translateX(-${index % 2 === 0 ? '0%' : '50%'})`,
                zIndex: 10 + index
              }}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-sm border border-neutral-100 relative group">
                <div className="aspect-square bg-neutral-100 overflow-hidden relative shadow-inner">
                  <img 
                    src={story.image} 
                    alt={story.caption} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="mt-8 text-center">
                  <p className="font-cursive text-deep-green text-3xl italic">{story.caption}</p>
                </div>

                {/* Tape Effect (Matches Video) */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 border border-white/20 backdrop-blur-[4px] -rotate-2 z-20 shadow-sm" />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Dynamic Background Petals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, 800], 
            x: [0, Math.sin(i) * 150],
            rotate: [0, 360] 
          }}
          transition={{ 
            duration: 20 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 3
          }}
          className="absolute -top-20 opacity-[0.15] pointer-events-none"
          style={{ left: `${Math.random() * 100}%` }}
        >
          <div className="w-5 h-5 bg-gold rounded-full blur-[3px]" />
        </motion.div>
      ))}
    </section>
  );
};

export default OurStory;
