import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Coffee, Gift, Copy, Check } from 'lucide-react';

const ContributionFunds = ({ config }) => {
  const [copied, setCopied] = React.useState(null);
  const activeFunds = config.funds?.filter(f => f.enabled) || [];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (activeFunds.length === 0) return null;

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('honeymoon')) return <Coffee className="w-6 h-6" />;
    if (t.includes('home')) return <Home className="w-6 h-6" />;
    if (t.includes('dinner')) return <Heart className="w-6 h-6" />;
    return <Gift className="w-6 h-6" />;
  };

  return (
    <section className="py-32 px-6 bg-stone-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-playfair text-deep-green mb-6 italic"
        >
          Registry & Contributions
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold mx-auto mb-8" />
        <p className="text-sm font-serif text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a contribution towards our new journey would be warmly appreciated.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {activeFunds.map((fund, idx) => (
          <motion.div
            key={fund.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-gold/5 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-500">
              {getIcon(fund.title)}
            </div>
            <h3 className="text-xl font-playfair text-deep-green mb-4">{fund.title}</h3>
            <p className="text-xs font-serif text-neutral-400 mb-8 leading-relaxed italic">
              {fund.description}
            </p>
            <button 
               className="mt-auto px-8 py-3 bg-neutral-900 text-cream text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-gold transition-all"
               onClick={() => {
                  const element = document.getElementById('payment-details');
                  element?.scrollIntoView({ behavior: 'smooth' });
               }}
            >
              Contribute
            </button>
          </motion.div>
        ))}
      </div>

      <div id="payment-details" className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-gold/10 text-center">
        <h3 className="text-2xl font-playfair text-deep-green mb-8">Payment Details</h3>
        
        <div className="space-y-6">
          {config.couple.upi && (
            <div className="flex items-center justify-between p-6 bg-stone-50 rounded-2xl border border-dashed border-gold/30">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">UPI ID</p>
                <p className="text-sm font-medium text-deep-green">{config.couple.upi}</p>
              </div>
              <button 
                onClick={() => handleCopy(config.couple.upi, 'upi')}
                className="p-3 bg-white rounded-xl shadow-sm hover:text-gold transition-colors"
              >
                {copied === 'upi' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {config.couple.accountNo && (
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Account Number</p>
                <p className="text-sm font-medium text-deep-green">{config.couple.accountNo}</p>
              </div>
            )}
            {config.couple.ifsc && (
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">IFSC Code</p>
                <p className="text-sm font-medium text-deep-green">{config.couple.ifsc}</p>
              </div>
            )}
          </div>
          
          {!config.couple.upi && !config.couple.accountNo && !config.couple.ifsc && (
            <div className="p-8 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <p className="text-xs font-serif text-neutral-400 italic">
                Payment details have not been provided yet. Please check back later or contact the couple directly.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Ornaments */}
      <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
         <div className="w-64 h-64 border-[1px] border-gold rounded-full -ml-32 -mb-32" />
      </div>
    </section>
  );
};

export default ContributionFunds;
