import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Smartphone, Heart, Users, Gift, CheckCircle2, ArrowRight } from 'lucide-react';

const MarketingPreview = ({ onClose }) => {
  const points = [
    {
      title: "Cinematic Experience",
      hindi: "शादी का निमंत्रण अब एक फिल्म जैसा!",
      desc: "Interactive Envelope, Falling Petals, and Music guests को हैरान कर देंगे।",
      icon: Sparkles
    },
    {
      title: "Smart RSVP",
      hindi: "मेहमानों का हिसाब अब आसान!",
      desc: "Phone कॉल्स की झंझट खत्म। जानें कौन आ रहा है और कौन नहीं, सिर्फ एक क्लिक में।",
      icon: Users
    },
    {
      title: "Digital Guestbook",
      hindi: "यादें जो हमेशा साथ रहेंगी।",
      desc: "मेहमान अपनी शुभकामनाएं और फोटो शादी से पहले ही भेज सकते हैं।",
      icon: Heart
    },
    {
      title: "Gift Registry",
      hindi: "उपहारों का सही तरीका!",
      desc: "अपने बैंक डिटेल्स या विशलिस्ट को शालीनता से साझा करें।",
      icon: Gift
    }
  ];

  return (
    <div className="fixed inset-0 z-[600] bg-white overflow-y-auto">
      {/* Premium Header */}
      <nav className="p-6 border-b border-gold/10 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
         <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-gold fill-gold" />
            <span className="font-serif italic text-xl text-deep-green">Wedding Magic SaaS</span>
         </div>
         <button 
           onClick={onClose}
           className="px-6 py-2 border border-gold/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold hover:bg-gold hover:text-white transition-all"
         >
           Close Preview
         </button>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gold/5 to-transparent">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-3xl mx-auto"
         >
            <span className="px-4 py-2 bg-gold/10 text-gold rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 inline-block">Instagram Marketing Kit</span>
            <h1 className="text-5xl md:text-7xl font-cursive text-deep-green mb-8">
               आपका Digital Invitation <br /> 
               <span className="text-gold">अब एक Brand है!</span>
            </h1>
            <p className="text-lg text-neutral-500 font-serif italic mb-12">
               Instagram पर Reels बनाओ और क्लाइंट्स को प्रीमियम फील दो।
            </p>
         </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {points.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-neutral-50 rounded-[3rem] border border-gold/5 hover:border-gold/20 transition-all group"
              >
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-gold transition-all">
                    <point.icon className="w-8 h-8 text-gold group-hover:text-white" />
                 </div>
                 <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-bold mb-2">{point.title}</h3>
                 <h2 className="text-2xl font-serif text-deep-green mb-4">{point.hindi}</h2>
                 <p className="text-sm text-neutral-500 leading-relaxed font-serif italic">{point.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Marketing Strategy for Instagram */}
      <section className="py-24 px-6 bg-deep-green text-cream">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif mb-12 text-center flex items-center justify-center gap-4">
               <Smartphone className="w-10 h-10" /> Instagram Strategy
            </h2>
            
            <div className="space-y-12">
               <div className="space-y-6">
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                     <CheckCircle2 className="w-4 h-4" /> 1. The "Reveal" Reel
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                     अपने फोन में Envelope ओपन करते हुए वीडियो बनाओ। Background में ट्रेंडिंग "Romantic Wedding Music" डालो। <br />
                     <span className="text-gold italic font-serif">Hook: "Tired of boring PDFs? Invite your guests like a Movie!"</span>
                  </p>
               </div>

               <div className="space-y-6">
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                     <CheckCircle2 className="w-4 h-4" /> 2. Story Polls
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                     दो अलग डिजाइन्स (Gold vs Platinum) पोस्ट करो और पूछो "Which one for your dream wedding?" इससे एंगेजमेंट बढ़ेगी।
                  </p>
               </div>

               <div className="space-y-6">
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                     <CheckCircle2 className="w-4 h-4" /> 3. DM Strategy
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                     जब कोई "How much?" पूछे, तो सिर्फ रेट मत बताओ। उन्हें एक डेमो लिंक भेजो और बोलो: "Experience it yourself here!"
                  </p>
               </div>
            </div>

            <button 
              onClick={onClose}
              className="mt-16 w-full py-6 bg-gold text-white rounded-2xl font-bold uppercase tracking-[0.4em] text-sm hover:bg-white hover:text-deep-green transition-all shadow-2xl flex items-center justify-center gap-4"
            >
               <span>Get Started Building</span>
               <ArrowRight className="w-5 h-5" />
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-neutral-400 text-[10px] uppercase tracking-widest font-bold">
         Your Business. Your Rules. Your Profit.
      </footer>
    </div>
  );
};

export default MarketingPreview;
