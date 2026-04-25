import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, ImageIcon, Sparkles, Send, Music, Upload, Gift, Share2, Copy, Check } from 'lucide-react';

const SetupDashboard = ({ config, updateConfig, onFinish }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e, path, isStory = false, index = 0) => {
    const file = e.target.files[0];
    if (file) {
      // Audio warning: Base64 audio is huge
      if (file.type.startsWith('audio/') && file.size > 2 * 1024 * 1024) {
        alert("Audio file is too large for local saving (Limit 2MB). Please use a URL instead for larger files.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        
        if (file.type.startsWith('image/')) {
          // Compress Image
          const img = new Image();
          img.src = result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality jpeg
            
            if (isStory) {
              const newStories = [...config.stories];
              newStories[index].image = compressedBase64;
              updateConfig('stories', newStories);
            } else {
              updateConfig(path, compressedBase64);
            }
          };
        } else {
          // For non-image files (like audio), save as is but warn
          updateConfig(path, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 md:p-16 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-10 h-10 text-gold fill-gold" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green mb-4 italic">Invitation Builder</h1>
          <p className="text-neutral-500 font-serif tracking-widest uppercase text-xs">Fill in your details to create magic</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Section 1: The Couple */}
          <section className="space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
            <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green border-b border-gold/10 pb-4">
              <Heart className="w-5 h-5 text-gold" /> The Happy Couple
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Person 1 Name</label>
                <input 
                  type="text" 
                  value={config.couple.name1}
                  onChange={(e) => updateConfig('couple.name1', e.target.value)}
                  className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                  placeholder="e.g. Tanmay"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Person 2 Name</label>
                <input 
                  type="text" 
                  value={config.couple.name2}
                  onChange={(e) => updateConfig('couple.name2', e.target.value)}
                  className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                  placeholder="e.g. Tanya"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Initials (For Wax Seal)</label>
                <input 
                  type="text" 
                  value={config.couple.initials}
                  onChange={(e) => updateConfig('couple.initials', e.target.value)}
                  className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                  placeholder="e.g. T&T"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Date & Venue */}
          <section className="space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
            <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green border-b border-gold/10 pb-4">
              <Calendar className="w-5 h-5 text-gold" /> When & Where
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Wedding Date</label>
                <input 
                  type="date" 
                  value={config.date}
                  onChange={(e) => updateConfig('date', e.target.value)}
                  className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Main Venue Address</label>
                <textarea 
                  value={config.venue}
                  onChange={(e) => updateConfig('venue', e.target.value)}
                  className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif h-32"
                  placeholder="Enter full address..."
                />
              </div>
            </div>
          </section>

          {/* Section 3: Our Story Photos */}
          <section className="col-span-1 md:col-span-2 space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
            <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green border-b border-gold/10 pb-4">
              <ImageIcon className="w-5 h-5 text-gold" /> Our Story Gallery (URL or File)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.stories.map((story, idx) => (
                <div key={story.id} className="p-6 bg-neutral-50 rounded-[1.5rem] border border-neutral-100">
                  <div className="aspect-square bg-neutral-200 rounded-xl mb-4 overflow-hidden shadow-inner group relative">
                    <img src={story.image} alt="Preview" className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                       <Upload className="text-white w-8 h-8" />
                       <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, '', true, idx)}
                       />
                    </label>
                  </div>
                  <input 
                    type="text" 
                    value={story.image}
                    onChange={(e) => {
                      const newStories = [...config.stories];
                      newStories[idx].image = e.target.value;
                      updateConfig('stories', newStories);
                    }}
                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs outline-none"
                    placeholder="Or paste URL here..."
                  />
                  <input 
                    type="text" 
                    value={story.caption}
                    onChange={(e) => {
                      const newStories = [...config.stories];
                      newStories[idx].caption = e.target.value;
                      updateConfig('stories', newStories);
                    }}
                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs outline-none mt-2 italic font-serif"
                    placeholder="Caption (e.g. First Date)"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Music Selection */}
          <section className="col-span-1 md:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
             <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green border-b border-gold/10 pb-4 mb-6">
              <Music className="w-5 h-5 text-gold" /> Background Music
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
               <div className="flex-1 w-full">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Music Source (URL or File)</label>
                  <input 
                    type="text" 
                    value={config.musicUrl || ''}
                    onChange={(e) => updateConfig('musicUrl', e.target.value)}
                    className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                    placeholder="https://...mp3"
                  />
               </div>
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-neutral-300 font-bold uppercase">OR</span>
                  <label className="px-6 py-4 bg-gold/10 text-gold rounded-2xl cursor-pointer hover:bg-gold/20 transition-all flex items-center gap-2 font-bold text-xs">
                     <Upload className="w-4 h-4" /> Upload MP3
                     <input 
                        type="file" 
                        className="hidden" 
                        accept="audio/*"
                        onChange={(e) => handleFileUpload(e, 'musicUrl')}
                      />
                  </label>
               </div>
            </div>
          </section>
          {/* Section 5: Events (Programs) */}
          <section className="col-span-1 md:col-span-2 space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
            <div className="flex justify-between items-center border-b border-gold/10 pb-4">
              <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green">
                <Sparkles className="w-5 h-5 text-gold" /> Wedding Programs & Locations
              </h2>
              <button 
                onClick={() => {
                  const newEvents = [...config.events];
                  newEvents.push({
                    id: `event-${Date.now()}`,
                    title: "New Program",
                    time: "00:00 AM",
                    date: "May 30",
                    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
                    enabled: true,
                    venueName: "",
                    venueUrl: ""
                  });
                  updateConfig('events', newEvents);
                }}
                className="px-4 py-2 bg-gold/10 text-gold rounded-xl hover:bg-gold hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
              >
                + Add Program
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.events.map((event, idx) => (
                <div key={event.id} className="p-6 bg-neutral-50 rounded-[1.5rem] border border-neutral-100 space-y-4 relative group">
                  <button 
                    onClick={() => {
                      const newEvents = config.events.filter((_, i) => i !== idx);
                      updateConfig('events', newEvents);
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-50 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>

                  <div className="flex justify-between items-center">
                    <input 
                      type="text" 
                      value={event.title}
                      onChange={(e) => {
                        const newEvents = [...config.events];
                        newEvents[idx].title = e.target.value;
                        updateConfig('events', newEvents);
                      }}
                      className="font-serif text-deep-green font-bold text-lg bg-transparent border-none outline-none focus:ring-0 w-3/4 p-0"
                      placeholder="Event Title"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Enabled</span>
                      <input 
                        type="checkbox" 
                        checked={event.enabled}
                        onChange={(e) => {
                          const newEvents = [...config.events];
                          newEvents[idx].enabled = e.target.checked;
                          updateConfig('events', newEvents);
                        }}
                        className="accent-gold w-5 h-5"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1 font-bold">Time</label>
                      <input 
                        type="text" 
                        value={event.time}
                        onChange={(e) => {
                          const newEvents = [...config.events];
                          newEvents[idx].time = e.target.value;
                          updateConfig('events', newEvents);
                        }}
                        className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-sm outline-none"
                        placeholder="e.g. 7:00 PM"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1 font-bold">Date</label>
                      <input 
                        type="text" 
                        value={event.date}
                        onChange={(e) => {
                          const newEvents = [...config.events];
                          newEvents[idx].date = e.target.value;
                          updateConfig('events', newEvents);
                        }}
                        className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-sm outline-none"
                        placeholder="e.g. May 30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1 font-bold">Venue Name</label>
                    <input 
                      type="text" 
                      value={event.venueName || ''}
                      onChange={(e) => {
                        const newEvents = [...config.events];
                        newEvents[idx].venueName = e.target.value;
                        updateConfig('events', newEvents);
                      }}
                      className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-sm outline-none"
                      placeholder="e.g. Grand Ballroom"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1 font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Google Maps URL
                    </label>
                    <input 
                      type="text" 
                      value={event.venueUrl || ''}
                      onChange={(e) => {
                        const newEvents = [...config.events];
                        newEvents[idx].venueUrl = e.target.value;
                        updateConfig('events', newEvents);
                      }}
                      className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-sm outline-none"
                      placeholder="https://goo.gl/maps/..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Contribution Funds (Gift Registry) */}
          <section className="col-span-1 md:col-span-2 space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
            <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green border-b border-gold/10 pb-4">
              <Gift className="w-5 h-5 text-gold" /> Contribution Funds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(config.funds || []).map((fund, idx) => (
                <div key={fund.id} className="p-6 bg-neutral-50 rounded-[1.5rem] border border-neutral-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <input 
                      type="text" 
                      value={fund.title}
                      onChange={(e) => {
                        const newFunds = [...config.funds];
                        newFunds[idx].title = e.target.value;
                        updateConfig('funds', newFunds);
                      }}
                      className="font-serif text-deep-green font-bold text-sm bg-transparent border-none outline-none focus:ring-0 p-0"
                    />
                    <input 
                      type="checkbox" 
                      checked={fund.enabled}
                      onChange={(e) => {
                        const newFunds = [...config.funds];
                        newFunds[idx].enabled = e.target.checked;
                        updateConfig('funds', newFunds);
                      }}
                      className="accent-gold w-4 h-4"
                    />
                  </div>
                  <textarea 
                    value={fund.description}
                    onChange={(e) => {
                      const newFunds = [...config.funds];
                      newFunds[idx].description = e.target.value;
                      updateConfig('funds', newFunds);
                    }}
                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-[10px] outline-none h-20 font-serif italic"
                  />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gold/5">
               <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">UPI ID for Contributions</label>
                  <input 
                    type="text" 
                    value={config.couple.upi || ''}
                    onChange={(e) => updateConfig('couple.upi', e.target.value)}
                    className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                    placeholder="e.g. name@upi"
                  />
               </div>
               <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Account No.</label>
                  <input 
                    type="text" 
                    value={config.couple.accountNo || ''}
                    onChange={(e) => updateConfig('couple.accountNo', e.target.value)}
                    className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                    placeholder="Bank details..."
                  />
               </div>
               <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">IFSC Code</label>
                  <input 
                    type="text" 
                    value={config.couple.ifsc || ''}
                    onChange={(e) => updateConfig('couple.ifsc', e.target.value)}
                    className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                    placeholder="IFSC..."
                  />
               </div>
            </div>
          </section>

          {/* Section 7: Invitation Tiers (Monetization Strategy) */}
          <section className="col-span-1 md:col-span-2 space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border-2 border-gold/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 bg-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl">
                Special Offer
             </div>
             
             <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-deep-green mb-2 italic">Invitation Tier</h2>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Enjoy all premium features at no cost!</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-2xl mx-auto">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2.5rem] border-2 border-gold bg-gold/5 shadow-xl shadow-gold/10 relative"
                >
                  <div className="flex justify-between items-start mb-6">
                     <span className="text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-gold text-white">
                        Free All-Access Pass
                     </span>
                     <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-serif text-deep-green mb-3">Premium Cinematic Experience</h3>
                  <p className="text-[11px] text-neutral-500 mb-8 leading-relaxed font-serif italic">
                    For a limited time, all premium luxury features are completely unlocked for your invitation.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       'Interactive Envelope', 
                       'Falling Petals', 
                       'Personalized Video Intro', 
                       '3D Mandap Reveal',
                       'Interactive Guestbook',
                       'Gift Registry',
                       'Vendor Referrals',
                       'Music Player'
                     ].map(f => (
                       <li key={f} className="text-[10px] text-deep-green/80 flex items-center gap-3 font-bold uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full" /> {f}
                       </li>
                     ))}
                  </div>
                </motion.div>
             </div>
          </section>
        </div>

          {/* Section 8: Share & Publish */}
          <section className="col-span-1 md:col-span-2 space-y-8 bg-neutral-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Share2 className="w-32 h-32" />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-3xl font-serif mb-2 italic">Ready to Invite?</h2>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-8">Share your premium cinematic invitation with guests</p>
                
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm">
                   <div className="flex-1 w-full truncate font-mono text-[10px] text-neutral-300 px-4">
                      {window.location.origin}/?mode=guest
                   </div>
                   <button 
                     onClick={() => {
                        const link = `${window.location.origin}/?mode=guest`;
                        navigator.clipboard.writeText(link);
                        alert("Guest Link Copied! You can now share this with your friends and family.");
                     }}
                     className="px-8 py-3 bg-gold text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 w-full md:w-auto justify-center"
                   >
                      <Copy className="w-4 h-4" /> Copy Guest Link
                   </button>
                </div>
                
                <p className="mt-6 text-[10px] text-neutral-500 italic font-serif">
                   Note: The Guest Link will hide the builder dashboard and only show the elegant wedding invitation.
                </p>
             </div>
          </section>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-16 text-center"
        >
          <button 
            onClick={onFinish}
            className="px-12 py-5 bg-neutral-900 text-cream rounded-[2rem] font-serif text-lg tracking-widest hover:bg-gold transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 mx-auto group border border-white/10"
          >
            <span>Preview Final Invitation</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
  );
};

export default SetupDashboard;
