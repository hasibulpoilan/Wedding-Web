import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './Envelope';
import Hero from './Hero';
import OurStory from './OurStory';
import Events from './Events';
import Mandap from './Mandap';
import RSVPForm from './RSVPForm';
import ScratchCard from './ScratchCard';
import Petals from './Petals';
import MusicPlayer from './MusicPlayer';
import WishesWall from './WishesWall';
import GiftRegistry from './GiftRegistry';
import VideoIntro from './VideoIntro';
import VendorReferrals from './VendorReferrals';

const MainInvitation = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setStartMusic(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    // After intro, we still show the envelope for that tactile feel
  };

  return (
    <div className="relative w-full h-full bg-cream overflow-y-auto overflow-x-hidden scroll-smooth">
      <AnimatePresence>
        {showIntro && (
          <VideoIntro 
            onComplete={handleIntroComplete} 
            coupleNames={`${config.couple.name1} & ${config.couple.name2}`} 
          />
        )}
      </AnimatePresence>

      <MusicPlayer audioSrc={config.musicUrl} autoPlay={startMusic} />
      
      <AnimatePresence>
        {!isOpen && (
          <Envelope 
            initials={config.couple.initials} 
            onOpen={handleOpen} 
          />
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <Petals />
          
          <Hero config={config} />
          
          {/* Save the Date Interactivity */}
          <section className="py-24 bg-cream flex flex-col items-center justify-center border-y border-gold/10">
             <div className="mb-12 text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Important Notice</span>
                <h2 className="text-4xl font-serif text-deep-green mt-2">Save the Date</h2>
             </div>
             <ScratchCard revealDate={config.date} />
          </section>

          <OurStory stories={config.stories} />
          <Events events={config.events} />
          {/* <VendorReferrals /> - Commented out as requested */}
          <Mandap isPlatinum={true} />
          
          <GiftRegistry config={config} />
          
          <WishesWall />
          <RSVPForm config={config} />
          
          <footer className="py-32 text-center bg-cream border-t border-gold/10 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-pinyon text-gold/5 whitespace-nowrap pointer-events-none">
                Forever & Always
             </div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative z-10 space-y-6"
             >
               <h2 className="text-6xl font-pinyon text-gold">{config.couple.name1} & {config.couple.name2}</h2>
               <div className="flex items-center justify-center gap-6">
                  <div className="w-12 h-[1px] bg-gold/30" />
                  <p className="text-deep-green tracking-[0.5em] text-[11px] uppercase font-montserrat font-medium">A Lifetime of Love</p>
                  <div className="w-12 h-[1px] bg-gold/30" />
               </div>
               <p className="text-[10px] text-deep-green/40 font-cinzel mt-12 tracking-widest uppercase">Digital Wedding Invitation © 2026</p>
             </motion.div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default MainInvitation;
