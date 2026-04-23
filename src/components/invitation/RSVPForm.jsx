import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';

const RSVPForm = ({ config }) => {
  const [formData, setFormData] = useState({ name: '', events: [] });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleCheckbox = (eventId) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(eventId) 
        ? prev.events.filter(id => id !== eventId)
        : [...prev.events, eventId]
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-8 bg-[#1B3022] text-center text-[#FAF9F6] flex flex-col items-center justify-center min-h-[500px]">
        <motion.div
           initial={{ scale: 0, rotate: -180 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ duration: 1, type: "spring" }}
           className="mb-8 p-6 bg-gold/20 rounded-full"
        >
           <CheckCircle className="w-16 h-16 text-gold" />
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="text-5xl font-cursive italic text-gold mb-6"
        >
          Thank you for confirming!
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="text-[10px] uppercase tracking-[0.4em] font-serif opacity-70 mb-2"
        >
           We are delighted to have you with us
        </motion.p>
        
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: 60 }}
           transition={{ delay: 1, duration: 1 }}
           className="h-[1px] bg-gold/40 my-8" 
        />
        
        <motion.h3 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2 }}
           className="text-3xl font-cursive italic text-gold-light"
        >
           {config.couple.name1} & {config.couple.name2}
        </motion.h3>
      </section>
    );
  }

  return (
    <section className="py-24 px-8 bg-cream border-t border-gold/10">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-16">
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl font-cursive text-gold mb-4"
           >
              RSVP
           </motion.h2>
           <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-4" />
           <p className="text-[10px] uppercase tracking-[0.4em] text-deep-green/60">Kindly respond by May 15th</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
           <div className="relative group">
              <input 
                required
                type="text" 
                placeholder="Enter Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-gold/20 pb-4 font-serif text-deep-green placeholder:text-deep-green/20 outline-none focus:border-gold transition-all duration-500 text-lg"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-focus-within:w-full transition-all duration-700" />
           </div>

           <div className="space-y-6">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-deep-green/40 mb-2">Select the events you will attend</p>
              <div className="grid grid-cols-1 gap-4">
                {config.events.filter(e => e.enabled).map(event => (
                  <label 
                    key={event.id} 
                    className="flex items-center justify-between p-4 bg-white/50 border border-gold/10 rounded-2xl cursor-pointer hover:bg-white hover:shadow-lg hover:shadow-gold/5 transition-all group"
                  >
                     <div className="flex flex-col">
                        <span className="text-deep-green font-serif italic text-xl">{event.title}</span>
                        <span className="text-[9px] uppercase tracking-widest opacity-40">{event.date}</span>
                     </div>
                     <input 
                        type="checkbox"
                        checked={formData.events.includes(event.id)}
                        onChange={() => handleCheckbox(event.id)}
                        className="w-6 h-6 accent-gold rounded-full transition-transform group-hover:scale-110"
                     />
                  </label>
                ))}
              </div>
           </div>

           <div className="pt-8">
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               type="submit"
               disabled={isLoading}
               className="w-full relative py-5 bg-neutral-950 text-gold-light uppercase tracking-[0.5em] font-bold rounded-2xl shadow-2xl overflow-hidden group disabled:opacity-80"
             >
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-deep-green transition-colors flex items-center justify-center gap-3">
                   {isLoading ? (
                     <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                     </>
                   ) : "Confirm Invitation"}
                </span>
             </motion.button>
           </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
