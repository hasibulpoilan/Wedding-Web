import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { bn } from 'date-fns/locale';
import { filterEventsByInvite, isRestrictedInvite } from '../../lib/guestInvites';

const toBengaliDigits = (str) => {
  const map = { 0: '০', 1: '১', 2: '২', 3: '৩', 4: '৪', 5: '৫', 6: '৬', 7: '৭', 8: '৮', 9: '৯' };
  return String(str).replace(/[0-9]/g, (d) => map[d] ?? d);
};

const RSVPForm = ({ config, t, lang, invitedEventIds }) => {
  const invitedEvents = useMemo(
    () => filterEventsByInvite(config, invitedEventIds),
    [config, invitedEventIds]
  );

  const [formData, setFormData] = useState({ name: '', responses: {} });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setResponse = (eventId, value) => {
    setFormData((prev) => ({
      ...prev,
      responses: { ...prev.responses, [eventId]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const answered = invitedEvents.every(
      (ev) => formData.responses[ev.id] === 'attending' || formData.responses[ev.id] === 'declined'
    );
    if (!answered) {
      alert(t.rsvpAnswerAll || 'Please respond for each invited event.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const formatEventDate = (event) => {
    if (lang === 'bn') {
      return toBengaliDigits(
        isValid(parseISO(event.date))
          ? format(parseISO(event.date), 'd MMMM', { locale: bn })
          : event.date.replace('May', 'মে').replace('June', 'জুন')
      );
    }
    return event.date;
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-8 bg-[#1B3022] text-center text-[#FAF9F6] flex flex-col items-center justify-center min-h-[500px]">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
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
          {t.thankYou || 'Thank you for confirming!'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[10px] uppercase tracking-[0.4em] font-serif opacity-70 mb-2"
        >
          {t.delightedToHaveYou || 'We are delighted to have you with us'}
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
          {config.couple.name1} {t.and} {config.couple.name2}
        </motion.h3>
      </section>
    );
  }

  if (!invitedEvents.length) {
    return (
      <section className="py-24 px-8 bg-cream border-t border-gold/10 text-center">
        <p className="text-sm text-deep-green/60 font-serif italic">{t.noInvitedEvents || 'No events to RSVP for.'}</p>
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
            {t.rsvp}
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-4" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-deep-green/60">
            {t.rsvpBy || 'Kindly respond by May 15th'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="relative group">
            <input
              required
              type="text"
              placeholder={t.fullName || 'Enter Your Full Name'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-gold/20 pb-4 font-serif text-deep-green placeholder:text-deep-green/20 outline-none focus:border-gold transition-all duration-500 text-lg"
            />
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-focus-within:w-full transition-all duration-700" />
          </div>

          <div className="space-y-6">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-deep-green/40 mb-2">
              {isRestrictedInvite(config, invitedEventIds)
                ? t.rsvpInvitedOnly || 'Confirm attendance for your invited programs'
                : t.rsvpSubheading || 'Select the events you will attend'}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {invitedEvents.map((event) => {
                const response = formData.responses[event.id];
                return (
                  <div
                    key={event.id}
                    className="p-4 bg-white/50 border border-gold/10 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-gold/5 transition-all"
                  >
                    <div className="mb-3">
                      <span className="text-deep-green font-serif italic text-xl block">{event.title}</span>
                      <span className="text-[9px] uppercase tracking-widest opacity-40">
                        {formatEventDate(event)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setResponse(event.id, 'attending')}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          response === 'attending'
                            ? 'bg-gold text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-500 hover:bg-gold/10'
                        }`}
                      >
                        {t.rsvpAttending || 'Attending'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setResponse(event.id, 'declined')}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          response === 'declined'
                            ? 'bg-neutral-800 text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                        }`}
                      >
                        {t.rsvpDeclined || 'Regret'}
                      </button>
                    </div>
                  </div>
                );
              })}
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
                    {t.sending || 'Processing...'}
                  </>
                ) : (
                  t.submitRSVP || 'Confirm Invitation'
                )}
              </span>
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
