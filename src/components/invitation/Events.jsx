import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { bn } from 'date-fns/locale';
import { toBengaliDigits } from '../../lib/translations';

const Events = ({ events, t, lang }) => {
  const activeEvents = events.filter(e => e.enabled);

  const openInGoogleMaps = (event) => {
    if (event.venueUrl) {
      window.open(event.venueUrl, '_blank');
      return;
    }
    const encodedLocation = encodeURIComponent(event.venueName || event.venue || t.defaultVenue);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  };

  return (
    <section className="py-32 px-6 bg-cream relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
         <div className="w-48 h-48 border-[1px] border-gold rounded-full -mr-24 -mt-24" />
         <div className="w-64 h-64 border-[1px] border-gold rounded-full -mr-32 -mt-32 opacity-50" />
      </div>

      <div className="max-w-xl mx-auto text-center mb-20 px-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.6em] text-gold font-bold block mb-4 font-montserrat"
        >
          {t.joinUs || 'Join Us'}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-playfair text-deep-green tracking-wide mb-6 italic"
        >
          {t.events}
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {activeEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-white overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gold/10 flex flex-col h-full rounded-[2.5rem]"
          >
            {/* Event Image */}
            <div className="h-64 relative overflow-hidden flex-shrink-0">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-8 left-8 text-white text-left">
                <h3 className="text-4xl font-pinyon text-gold-light mb-2">{event.title}</h3>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase opacity-90 font-montserrat">
                   <span className="text-gold font-bold">{t.vibrant || 'Vibrant'}</span>
                   <span className="w-1 h-1 bg-white/40 rounded-full" />
                   <span>
                     {lang === 'bn' 
                       ? toBengaliDigits(isValid(parseISO(event.date)) 
                           ? format(parseISO(event.date), 'd MMMM', { locale: bn }) 
                           : event.date.replace('January', 'জানুয়ারি').replace('February', 'ফেব্রুয়ারি').replace('March', 'মার্চ').replace('April', 'এপ্রিল').replace('May', 'মে').replace('June', 'জুন').replace('July', 'জুলাই').replace('August', 'আগস্ট').replace('September', 'সেপ্টেম্বর').replace('October', 'অক্টোবর').replace('November', 'নভেম্বর').replace('December', 'ডিসেম্বর'))
                       : event.date}
                   </span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-5 group/item">
                     <div className="p-3 bg-gold/5 rounded-2xl group-hover/item:bg-gold/10 transition-colors">
                        <Clock className="w-4 h-4 text-gold" />
                     </div>
                     <div className="text-left">
                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{t.time}</p>
                        <p className="text-sm font-medium text-deep-green">{event.time}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-5 group/item">
                     <div className="p-3 bg-gold/5 rounded-2xl group-hover/item:bg-gold/10 transition-colors">
                        <MapPin className="w-4 h-4 text-gold" />
                     </div>
                      <div className="text-left">
                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{t.venue}</p>
                        <p className="text-sm font-medium text-deep-green leading-relaxed">
                          {event.venueName || t.defaultVenue.split(',')[0]}<br/>
                        </p>
                      </div>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openInGoogleMaps(event)}
                    className="w-full py-4 bg-neutral-900 text-cream text-[11px] uppercase tracking-[0.3em] font-bold rounded-2xl hover:bg-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group/btn font-montserrat"
                  >
                     <span>{t.viewOnMap || 'View on Map'}</span>
                     <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
            </div>
            
            {/* Elegant Border Accent */}
            <div className="absolute inset-[1px] border border-gold/5 rounded-[2.5rem] pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
