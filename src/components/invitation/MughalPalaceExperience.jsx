import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, Clock, CheckCircle2, Music, Volume2, VolumeX, Send, Sparkles, Camera } from 'lucide-react';
import { getSharePhoto } from '../../lib/sharePhoto';

/**
 * MughalPalaceExperience
 * Authentic Sheesh Mahal / Mughal Palace interactive invitation UI.
 * Fully integrated with Admin & Client configurations:
 *  - Displays Admin Cover Photo (Portrait Arch)
 *  - Displays Our Story Gallery & Memories (Admin photos)
 *  - Displays Event Images uploaded in Admin
 *  - Floating Side Navigation Checklist (Cover, Names, Letter, Gallery, Families, Events, Countdown, RSVP, Dua)
 *  - Rotating Celestial Astrolabe countdown timer
 *  - RSVP form with interactive event checkmark selectors
 *  - Mosque reflection with Quranic marriage Dua
 */
export default function MughalPalaceExperience({ config, guestName: guestNameProp, t, lang, invitedProgramsLabel }) {
  const [activeSection, setActiveSection] = useState('names');
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpEvents, setRsvpEvents] = useState(['Mehndi', 'Nikkah', 'Reception']);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [wishesText, setWishesText] = useState('');

  // Fallback names & data from config
  const groomName = config?.couple?.name1 || config?.couple?.groom || 'Hasibul';
  const brideName = config?.couple?.name2 || config?.couple?.bride || 'Pailan';
  const coverPhoto = config?.couple?.coverPhoto || getSharePhoto(config);
  const stories = config?.stories || [];
  const eventsList = (config?.events && config.events.length > 0) ? config.events.filter(e => e.enabled !== false) : [];
  const guestDisplay = guestNameProp || config?.guestName || 'Honored Guest & Family';

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDateStr = config?.date || config?.events?.[0]?.date || '2026-11-20T18:00:00';
    const weddingDate = new Date(weddingDateStr).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = weddingDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [config]);

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['names', 'letter', 'gallery', 'families', 'events', 'countdown', 'rsvp', 'dua'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const sectionsList = [
    { id: 'names', label: 'Names' },
    { id: 'letter', label: 'Letter' },
    { id: 'gallery', label: 'Memories' },
    { id: 'families', label: 'Families' },
    { id: 'events', label: 'Events' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'dua', label: 'Dua' },
  ];

  const handleToggleEvent = (eventName) => {
    if (rsvpEvents.includes(eventName)) {
      setRsvpEvents(rsvpEvents.filter(e => e !== eventName));
    } else {
      setRsvpEvents([...rsvpEvents, eventName]);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06120D] text-amber-100 font-sans selection:bg-amber-600 selection:text-white pb-24 overflow-x-hidden">
      
      {/* Background Ambience: Deep Emerald Mughal Walls with Subtle Gold Dust */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A261B] via-[#06140E] to-[#030906] z-0" />
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* Floating Left Side Checklist (Aqd Invites Navigation Menu) */}
      <nav 
        aria-label="Invitation Sections"
        className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5 p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-amber-500/20 shadow-2xl"
      >
        <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold px-1 mb-1 border-b border-amber-500/20 pb-1">
          Menu
        </span>
        {sectionsList.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-2.5 text-xs text-left transition-all duration-300 group ${
                isActive ? 'text-amber-300 font-semibold translate-x-1' : 'text-amber-100/60 hover:text-amber-200'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                isActive 
                  ? 'border-amber-400 bg-amber-500 shadow-[0_0_8px_#F59E0B]' 
                  : 'border-amber-400/40 group-hover:border-amber-300'
              }`}>
                {isActive && <div className="w-1.5 h-1.5 bg-[#071710] rounded-full" />}
              </div>
              <span className="tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Floating Audio & Share Controls */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-lg hover:scale-105 transition-transform"
          aria-label="Toggle Sound"
        >
          {isPlayingMusic ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Main Content Column */}
      <main className="relative z-10 max-w-[460px] mx-auto px-4 pt-10 sm:pt-14 space-y-16">
        
        {/* ================= SECTION 1: NAMES & COUPLE PORTRAIT ================= */}
        <section id="names" className="text-center pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 text-[11px] tracking-[0.25em] uppercase font-serif shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            <h3 className="text-xs uppercase tracking-[0.35em] text-amber-200/80 font-medium">
              The Royal Wedding of
            </h3>

            {/* Couple Calligraphic Arch Box */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0E2F22]/90 to-[#071811]/90 border border-amber-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              
              {/* Couple Cover Photo (Portrait Frame) */}
              {coverPhoto && (
                <div className="relative w-36 h-36 mx-auto mb-6 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#091D16]">
                    <img 
                      src={coverPhoto} 
                      alt="Couple"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              )}

              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 tracking-wide mb-2 italic">
                {groomName}
              </h1>
              
              <div className="flex items-center justify-center gap-3 my-2">
                <div className="h-[1px] w-12 bg-amber-400/40" />
                <span className="font-serif italic text-amber-300 text-xl">&</span>
                <div className="h-[1px] w-12 bg-amber-400/40" />
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 tracking-wide italic">
                {brideName}
              </h2>

              <p className="text-xs text-amber-200/70 tracking-widest uppercase mt-5 font-serif">
                Together with their beloved families cordially invite you
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 2: PERSONALIZED LETTER ================= */}
        <section id="letter" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-amber-400/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                Royal Invitation Letter
              </span>
              <div className="h-[1px] w-8 bg-amber-400/30" />
            </div>

            {/* Jeweled Chest & Letter Container */}
            <div className="relative rounded-3xl bg-[#091D16] border border-amber-500/30 p-6 sm:p-7 shadow-2xl text-left overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Jeweled Chest Decorative Header */}
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-28 h-20 rounded-2xl overflow-hidden border border-amber-400/40 shadow-lg">
                  <img 
                    src="/assets/mughal_jeweled_chest.jpg" 
                    alt="Royal Chest"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Addressed To Guest */}
              <div className="border-b border-amber-500/20 pb-3 mb-4">
                <span className="text-[10px] tracking-widest uppercase text-amber-400/80 block">Specially Addressed To:</span>
                <span className="font-serif text-xl sm:text-2xl text-amber-200 italic font-medium">
                  {guestDisplay}
                </span>
                {invitedProgramsLabel && (
                  <span className="text-[10px] text-amber-400/80 uppercase tracking-widest mt-1 block">
                    Invited to: {invitedProgramsLabel}
                  </span>
                )}
              </div>

              {/* Quranic Verse */}
              <div className="p-3.5 rounded-xl bg-black/30 border border-amber-400/20 mb-4 text-center">
                <p className="font-serif text-amber-200/90 text-xs sm:text-sm italic leading-relaxed">
                  "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
                </p>
                <span className="text-[10px] tracking-wider text-amber-400/70 block mt-1.5 font-sans uppercase">
                  — Surah Ar-Rum (30:21)
                </span>
              </div>

              {/* Letter Body */}
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-serif">
                {config?.messages?.invitation ||
                  "With the grace of Almighty Allah, we take immense pleasure and joy in welcoming you to celebrate this blessed milestone as our families unite. Your gracious presence and prayers will make this joyous occasion truly unforgettable."}
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 3: STORY GALLERY (Admin Photos) ================= */}
        {stories && stories.length > 0 && (
          <section id="gallery" className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-amber-400/30" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                  Precious Memories
                </span>
                <div className="h-[1px] w-8 bg-amber-400/30" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stories.map((story, idx) => (
                  <div 
                    key={story.id || idx}
                    className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#091D16] shadow-xl group hover:border-amber-400/60 transition-all"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-black/40">
                      <img 
                        src={story.image} 
                        alt={story.caption || 'Memory'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {story.caption && (
                      <div className="p-3 bg-gradient-to-t from-black/90 to-black/40 text-center">
                        <p className="font-serif italic text-xs text-amber-200">
                          {story.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ================= SECTION 4: FAMILIES ================= */}
        <section id="families" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-amber-400/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                With The Blessings Of
              </span>
              <div className="h-[1px] w-8 bg-amber-400/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Groom's Family */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0B241B] to-[#071711] border border-amber-500/25 shadow-lg text-center">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-medium block mb-1">
                  Groom's Parents
                </span>
                <h4 className="font-serif text-lg text-amber-100">
                  {config?.parents?.groomParents || 'Mr. & Mrs. Rahman'}
                </h4>
              </div>

              {/* Bride's Family */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0B241B] to-[#071711] border border-amber-500/25 shadow-lg text-center">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-medium block mb-1">
                  Bride's Parents
                </span>
                <h4 className="font-serif text-lg text-amber-100">
                  {config?.parents?.brideParents || 'Mr. & Mrs. Khan'}
                </h4>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 5: EVENTS ITINERARY ================= */}
        <section id="events" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-amber-400/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                Wedding Itinerary
              </span>
              <div className="h-[1px] w-8 bg-amber-400/30" />
            </div>

            <div className="space-y-5">
              {(eventsList.length > 0 ? eventsList : [
                {
                  id: 'mehndi',
                  title: 'Mehndi Ceremony',
                  date: 'November 18, 2026',
                  time: '07:00 PM',
                  venueName: 'Sheesh Mahal Grand Courtyard, Heritage Palace'
                },
                {
                  id: 'nikkah',
                  title: 'Nikkah & Reception',
                  date: 'November 20, 2026',
                  time: '06:30 PM',
                  venueName: 'Royal Ballroom, The Imperial Palace Hall'
                }
              ]).map((event, idx) => {
                const venueAddress = event.venueName || event.venue || config?.venue || 'Heritage Palace';
                return (
                  <div 
                    key={event.id || idx}
                    className="relative rounded-3xl bg-gradient-to-b from-[#0C271D] to-[#06160F] border border-amber-500/30 shadow-xl text-left overflow-hidden group hover:border-amber-400/60 transition-all"
                  >
                    {/* Event Custom Image if set in Admin */}
                    {event.image && (
                      <div className="relative w-full h-36 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C271D] via-black/30 to-transparent" />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between border-b border-amber-500/20 pb-3 mb-3">
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-amber-400 font-medium">Event {idx + 1}</span>
                          <h4 className="font-serif text-xl sm:text-2xl text-amber-100 font-medium">
                            {event.title}
                          </h4>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                          <Clock size={16} />
                        </div>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-amber-200/80 mb-5 font-serif">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-amber-400 shrink-0" />
                          <span>{event.date} {event.time ? `• ${event.time}` : ''}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                          <span>{venueAddress}</span>
                        </div>
                      </div>

                      {/* Interactive Directions & Add to Calendar */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <a
                          href={event.venueUrl || `https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs tracking-wider uppercase transition-colors"
                        >
                          <MapPin size={13} />
                          <span>Directions</span>
                        </a>
                        <button
                          onClick={() => alert(`Added ${event.title} to your calendar!`)}
                          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-400/40 text-emerald-200 text-xs tracking-wider uppercase transition-colors"
                        >
                          <Calendar size={13} />
                          <span>Calendar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 6: CELESTIAL ASTROLABE COUNTDOWN ================= */}
        <section id="countdown" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-amber-400/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                Celestial Astrolabe
              </span>
              <div className="h-[1px] w-8 bg-amber-400/30" />
            </div>

            {/* Astrolabe Circular Dial */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
              {/* Rotating Astrolabe Rings */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/30 animate-spin"
                style={{ animationDuration: '60s' }}
              />
              <div 
                className="absolute inset-4 rounded-full border border-amber-500/40 animate-spin"
                style={{ animationDuration: '40s', animationDirection: 'reverse' }}
              />

              {/* Astrolabe Graphic Center */}
              <div className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full overflow-hidden p-1 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-[#071A12] flex items-center justify-center">
                <img 
                  src="/assets/mughal_astrolabe.png" 
                  alt="Astrolabe"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                />
                
                {/* Countdown 4 Columns Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-black/50 p-2 rounded-xl border border-amber-400/30 backdrop-blur-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-amber-200 block">{timeLeft.days}</span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-400/80">Days</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-xl border border-amber-400/30 backdrop-blur-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-amber-200 block">{timeLeft.hours}</span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-400/80">Hours</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-xl border border-amber-400/30 backdrop-blur-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-amber-200 block">{timeLeft.minutes}</span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-400/80">Mins</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-xl border border-amber-400/30 backdrop-blur-sm">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-amber-200 block">{timeLeft.seconds}</span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-400/80">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-amber-200/70 tracking-widest uppercase font-serif">
              Counting Down To The Sacred Union
            </p>
          </motion.div>
        </section>

        {/* ================= SECTION 7: RSVP FORM ================= */}
        <section id="rsvp" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-amber-400/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                RSVP & Attendance
              </span>
              <div className="h-[1px] w-8 bg-amber-400/30" />
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#091D16] border border-amber-500/30 shadow-2xl text-left">
              {rsvpSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-serif text-2xl text-amber-100">Shukran!</h4>
                  <p className="text-xs text-amber-200/80">
                    Your response has been received. We look forward to celebrating with you!
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRsvpSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-amber-400 block mb-1.5 font-medium">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpAttending('yes')}
                        className={`py-2 px-3 rounded-xl border text-xs tracking-wider uppercase transition-all ${
                          rsvpAttending === 'yes'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-semibold'
                            : 'bg-black/30 border-amber-500/20 text-amber-300/60'
                        }`}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpAttending('no')}
                        className={`py-2 px-3 rounded-xl border text-xs tracking-wider uppercase transition-all ${
                          rsvpAttending === 'no'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-semibold'
                            : 'bg-black/30 border-amber-500/20 text-amber-300/60'
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpAttending === 'yes' && (
                    <>
                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-amber-400 block mb-1.5 font-medium">
                          Select Events You Will Attend
                        </label>
                        <div className="space-y-2">
                          {(eventsList.length > 0 ? eventsList.map(e => e.title) : ['Mehndi Ceremony', 'Nikkah & Reception']).map((evt) => {
                            const isChecked = rsvpEvents.includes(evt);
                            return (
                              <div
                                key={evt}
                                onClick={() => handleToggleEvent(evt)}
                                className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-amber-500/20 cursor-pointer hover:border-amber-400/50 transition-colors"
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  isChecked ? 'bg-amber-500 border-amber-400' : 'border-amber-400/40'
                                }`}>
                                  {isChecked && <CheckCircle2 size={12} className="text-black" />}
                                </div>
                                <span className="text-xs text-amber-100 font-serif">{evt}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-amber-400 block mb-1.5 font-medium">
                          Number of Guests
                        </label>
                        <select 
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full py-2 px-3 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value={1} className="bg-[#091D16]">1 Guest</option>
                          <option value={2} className="bg-[#091D16]">2 Guests</option>
                          <option value={3} className="bg-[#091D16]">3 Guests</option>
                          <option value={4} className="bg-[#091D16]">4+ Family Members</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-amber-400 block mb-1.5 font-medium">
                      Blessings & Warm Wishes
                    </label>
                    <textarea 
                      rows={2}
                      value={wishesText}
                      onChange={(e) => setWishesText(e.target.value)}
                      placeholder="Send your heartfelt prayer or warm message..."
                      className="w-full p-3 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs placeholder:text-amber-200/30 focus:outline-none focus:border-amber-400 resize-none font-serif"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-[#07160F] font-serif font-bold text-xs tracking-widest uppercase shadow-[0_5px_20px_rgba(245,158,11,0.3)] hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>Confirm Response</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 8: SACRED CLOSING DUA ================= */}
        <section id="dua" className="text-center pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-amber-400/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                Closing Sacred Blessing
              </span>
              <div className="h-[1px] w-8 bg-amber-400/30" />
            </div>

            {/* Illuminated Mosque Container */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#091D16] to-[#040C09] border border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-5 border border-amber-400/30 shadow-inner">
                <img 
                  src="/assets/mughal_dua_mosque.jpg" 
                  alt="Mosque Over Water"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091D16] via-transparent to-black/40" />
              </div>

              {/* Marriage Dua Calligraphy */}
              <div className="space-y-3">
                <div className="font-serif text-amber-200 text-lg sm:text-xl tracking-wider leading-relaxed">
                  بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                </div>
                
                <p className="font-serif italic text-xs sm:text-sm text-amber-300/80 max-w-sm mx-auto leading-relaxed">
                  "May Allah bless you, shower His blessings upon you, and bring you together in goodness."
                </p>

                <div className="w-16 h-[1px] bg-amber-400/40 mx-auto my-3" />

                <div className="font-serif text-amber-100 text-base sm:text-lg">
                  {groomName} & {brideName}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-amber-400/70">
                  Thank You For Being Part Of Our Journey
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
