import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './Envelope';
import SplashIntro from './SplashIntro';
import Hero from './Hero';
import OurStory from './OurStory';
import Events from './Events';
import Mandap from './Mandap';
import RSVPForm from './RSVPForm';
import ScratchCard from './ScratchCard';
import Petals from './Petals';
import MusicPlayer from './MusicPlayer';
import WishesWall from './WishesWall';
import VideoIntro from './VideoIntro';
import VendorReferrals from './VendorReferrals';
import ContributionFunds from './ContributionFunds';
import FoodMenu from './FoodMenu';
import Navigation from './Navigation';
import GuestShareTool from './GuestShareTool';
import { translations } from '../../lib/translations';

const MainInvitation = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [guestName, setGuestName] = useState('');
  const [lang, setLang] = useState(config.language || 'en');

  const t = translations[lang] || translations.en;

  useEffect(() => {
    if (config.couple.name1 && config.couple.name2) {
      document.title = `${t.digitalInvitation || 'Wedding Invitation'}: ${config.couple.name1} ${t.and} ${config.couple.name2}`;
    }
  }, [config.couple]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Default from config
    let finalGuestName = config.guestName || '';
    
    // Check URL for guest name (overrides config)
    const guest = params.get('guest');
    if (guest === 'Our Special Guest') {
      finalGuestName = 'Our Special Guest';
    } else if (guest) {
      finalGuestName = guest;
    }
    
    setGuestName(finalGuestName);

    // Check URL for language
    const language = params.get('lang');
    if (language && (language === 'en' || language === 'bn')) {
      setLang(language);
    } else {
      setLang(config.language || 'en');
    }

    // Check URL for referral code
    const ref = params.get('ref');
    if (ref) {
      setPromoCode(ref);
      localStorage.setItem('wedding_referral', ref);
    } else {
      const storedRef = localStorage.getItem('wedding_referral');
      if (storedRef) {
        setPromoCode(storedRef);
      }
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setStartMusic(true);
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 2200);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative w-full h-full bg-cream overflow-y-auto overflow-x-hidden scroll-smooth">
      <AnimatePresence>
        {showIntro && (
          <VideoIntro 
            onComplete={handleIntroComplete} 
            coupleNames={`${config.couple.name1} ${t.and} ${config.couple.name2}`} 
            t={t}
          />
        )}
      </AnimatePresence>

      <MusicPlayer audioSrc={config.musicUrl} autoPlay={startMusic} />
      
      <AnimatePresence>
        {!isOpen && (
          <Envelope 
            initials={config.couple.initials} 
            onOpen={handleOpen} 
            t={t}
          />
        )}
      </AnimatePresence>

      {/* {isOpen && <Navigation />} */}

      <AnimatePresence>
        {showSplash && <SplashIntro guestName={guestName} config={config} t={t} />}
      </AnimatePresence>

      {isOpen && !showSplash && (
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <Petals />
          
          <Hero config={config} guestName={guestName} t={t} lang={lang} />
          
          {/* Save the Date Interactivity */}
          <section id="save-the-date" className="py-24 bg-cream flex flex-col items-center justify-center border-y border-gold/10">
             <div className="mb-12 text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">{t.importantNotice}</span>
                <h2 className="text-4xl font-serif text-deep-green mt-2">{t.saveTheDate}</h2>
             </div>
             <ScratchCard revealDate={config.date} t={t} lang={lang} />
          </section>

          <OurStory stories={config.stories} id="story" t={t} />
          <div id="events"><Events events={config.events} t={t} lang={lang} /></div>
          <div id="venue"><Mandap isPlatinum={true} t={t} /></div>
          
          <FoodMenu menu={config.menu} t={t} />

          <ContributionFunds config={config} t={t} />
          
          <WishesWall t={t} />
          <div id="rsvp"><RSVPForm config={config} t={t} /></div>
          
          <footer className="py-24 text-center bg-cream border-t border-gold/10 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-pinyon text-gold/5 whitespace-nowrap pointer-events-none">
                {t.foreverAlways}
             </div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative z-10 space-y-6"
             >
               <h2 className="text-6xl font-pinyon text-gold">{config.couple.name1} {t.and} {config.couple.name2}</h2>
               <div className="flex items-center justify-center gap-6">
                  <div className="w-12 h-[1px] bg-gold/30" />
                  <p className="text-deep-green tracking-[0.5em] text-[11px] uppercase font-montserrat font-medium">{t.lifetimeOfLove}</p>
                  <div className="w-12 h-[1px] bg-gold/30" />
               </div>
               <p className="text-[10px] text-deep-green/40 font-cinzel mt-12 tracking-widest uppercase">{t.digitalInvitation} © 2026</p>

               {/* Developer Branding & CTA */}
               <div className="mt-16 pt-8 border-t border-gold/10 max-w-sm mx-auto flex flex-col items-center gap-5">
                  <p className="text-xs font-montserrat text-deep-green/70 tracking-wide">
                    {t.designedDevelopedBy} <span className="font-bold text-gold">Hasibul Pailan</span>
                  </p>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-gold/50 hover:border-gold transition-colors duration-300"
                  >
                    <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors duration-300" />
                    <span className="relative text-gold text-xs font-bold uppercase tracking-widest">
                      {t.buildYourInvitation}
                    </span>
                  </button>
               </div>
             </motion.div>
          </footer>
        </motion.div>
      )}

      {isOpen && !showSplash && (
        <GuestShareTool 
          coupleNames={`${config.couple.name1} ${t.and} ${config.couple.name2}`} 
          config={config} 
          guestName={guestName} 
          t={t}
        />
      )}

      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cream p-8 md:p-10 rounded-2xl max-w-md w-full relative border border-gold/30 shadow-2xl text-center"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-deep-green/50 hover:text-gold transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>

              <h3 className="text-2xl font-serif text-deep-green mb-3">{t.craftPerfectInvitation}</h3>
              <p className="text-sm font-montserrat text-deep-green/70 mb-8 leading-relaxed">
                Your love story is unique, and your invitation should reflect that. Let's create a stunning digital experience that leaves a lasting impression on your guests!
              </p>

              <div className="space-y-4">
                <div className="mb-4 text-left">
                  <label className="block text-[10px] font-montserrat text-deep-green/60 mb-2 uppercase tracking-widest font-bold ml-1">{t.promoCodeLabel}</label>
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder={t.promoPlaceholder} 
                    className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-white/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 text-deep-green font-montserrat font-bold uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-normal transition-all"
                  />
                </div>

                <a 
                  href={`mailto:hasibulpailan8@gmail.com?subject=${t.inquirySubject}${promoCode ? ` (Promo: ${promoCode})` : ''}`}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white border border-gold/20 rounded-xl hover:border-gold hover:bg-gold/5 transition-all group"
                >
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-montserrat text-sm text-deep-green group-hover:text-gold transition-colors">hasibulpailan8@gmail.com</span>
                </a>

                <a 
                  href={`https://wa.me/919330266857?text=${encodeURIComponent(`Hi, I'm interested in building my wedding invitation!${promoCode ? ` (Promo Code: ${promoCode})` : ''}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white border border-gold/20 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group"
                >
                  <svg className="w-5 h-5 text-gold group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span className="font-montserrat text-sm text-deep-green group-hover:text-[#25D366] transition-colors">WhatsApp (+91 93302 66857)</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainInvitation;
