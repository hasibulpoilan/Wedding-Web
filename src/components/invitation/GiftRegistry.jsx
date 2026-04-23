import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Coffee, Home, Plane, Heart, Copy, Check } from 'lucide-react';

const GiftRegistry = ({ config }) => {
  const [selectedFund, setSelectedFund] = useState(null);
  const [copied, setCopied] = useState(false);

  const funds = [
    { id: 'honeymoon', title: 'Honeymoon Fund', icon: Plane, desc: 'Help us create memories on our first journey as a couple.' },
    { id: 'home', title: 'New Home Fund', icon: Home, desc: 'Contribute towards building our little nest together.' },
    { id: 'dinner', title: 'Romantic Dinner', icon: Coffee, desc: 'Treat us to a beautiful candlelit dinner.' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 px-6 bg-cream relative">
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold block mb-4"
        >
          Gift Registry
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-cursive text-deep-green mb-6"
        >
          Registry & Cash Fund
        </motion.h2>
        <p className="text-sm font-serif italic text-deep-green/60 max-w-lg mx-auto">
          Your presence is enough, but if you'd like to help us start our new life, we've set up some funds below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {funds.map((fund, idx) => (
          <motion.div
            key={fund.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gold/5 text-center flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <fund.icon className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-serif text-deep-green mb-3 uppercase tracking-wider">{fund.title}</h3>
            <p className="text-xs text-neutral-400 font-serif leading-relaxed flex-1 mb-8">
              {fund.desc}
            </p>
            <button 
              onClick={() => setSelectedFund(fund)}
              className="w-full py-4 bg-neutral-900 text-cream rounded-2xl font-serif text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-500 shadow-xl"
            >
              Contribute
            </button>
          </motion.div>
        ))}
      </div>

      {/* Contribution Modal */}
      <AnimatePresence>
        {selectedFund && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFund(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10 border border-gold/10 overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] -mr-10 -mt-10">
                 <Gift className="w-48 h-48 text-gold" />
              </div>

              <h3 className="text-3xl font-cursive text-gold mb-2">{selectedFund.title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-8 font-bold">Transfer directly to the couple</p>
              
              <div className="space-y-6 relative z-10">
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                   <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3">UPI ID / Phone</p>
                   <div className="flex items-center justify-between">
                      <span className="text-deep-green font-bold text-lg font-serif tracking-widest">{config.couple.upi || "wedding.pay@upi"}</span>
                      <button 
                        onClick={() => copyToClipboard(config.couple.upi || "wedding.pay@upi")}
                        className="p-2 bg-gold/10 rounded-lg text-gold hover:bg-gold/20 transition-all"
                      >
                         {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                   </div>
                </div>

                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                   <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3">Bank Account Details</p>
                   <div className="space-y-1">
                      <p className="text-xs text-deep-green font-medium">A/C: {config.couple.accountNo || "XXXXXXXXX1234"}</p>
                      <p className="text-xs text-deep-green font-medium">IFSC: {config.couple.ifsc || "BANK0001234"}</p>
                      <p className="text-[10px] text-neutral-400 italic mt-2">Account Name: {config.couple.name1} & {config.couple.name2}</p>
                   </div>
                </div>

                <p className="text-[9px] text-neutral-400 text-center italic">
                  Once transferred, you can send a message on WhatsApp to let us know!
                </p>

                <button 
                  onClick={() => setSelectedFund(null)}
                  className="w-full py-5 bg-neutral-900 text-cream rounded-2xl font-serif text-sm tracking-widest hover:bg-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                >
                  <span>Done</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GiftRegistry;
