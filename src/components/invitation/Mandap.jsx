import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Mandap = ({ isPlatinum }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section className={`relative h-[800px] overflow-hidden flex items-center justify-center ${isPlatinum ? 'bg-[#0a0a0a]' : 'bg-[#1B3022]'}`}>
      {/* Parallax Background */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 z-0"
      >
        <motion.img 
          initial={isPlatinum ? { scale: 1.5, filter: 'blur(10px)', opacity: 0 } : { scale: 1.25, opacity: 0.4 }}
          whileInView={isPlatinum ? { scale: 1.1, filter: 'blur(0px)', opacity: 0.6 } : { scale: 1.25, opacity: 0.4 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200" 
          alt="Mandap" 
          className="w-full h-full object-cover"
        />
        {/* Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="relative z-20 text-center px-8">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="space-y-6"
        >
           <div className="relative inline-block">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-gold/30 rounded-full border-dashed"
              />
              <div className="bg-cream/5 backdrop-blur-xl p-16 rounded-full border border-gold/20 shadow-[0_0_50px_rgba(197,160,89,0.1)]">
                 <h2 className="text-5xl font-cursive text-gold italic mb-2 drop-shadow-lg">The Ceremony</h2>
                 <p className="text-cream/70 text-[10px] uppercase tracking-[0.5em] font-serif">In the Presence of Divinity</p>
              </div>
           </div>
           
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="text-gold/50 text-xs italic font-serif"
           >
              “Together, we start a new chapter”
           </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Petals at the very bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  );
};

export default Mandap;
