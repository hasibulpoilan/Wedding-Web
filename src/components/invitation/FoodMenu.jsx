import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Coffee, IceCream, Pizza } from 'lucide-react';

const FoodMenu = ({ menu = [] }) => {
  if (!menu || menu.length === 0) return null;

  return (
    <section className="py-24 bg-[#FDFBF7] relative overflow-hidden px-6">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 h-full">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="border border-gold/20 aspect-square flex items-center justify-center text-4xl">✥</div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <UtensilsCrossed className="w-12 h-12 text-gold/40 mx-auto mb-6" />
          <span className="text-xs uppercase tracking-[0.5em] text-gold font-bold">The Wedding Feast</span>
          <h2 className="text-5xl font-serif text-deep-green mt-4 italic">Culinary Delights</h2>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {menu.map((category, idx) => (
            <motion.div
              key={category.id || idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white border border-gold/10 shadow-[0_20px_50px_rgba(197,160,89,0.05)] relative overflow-hidden group hover:border-gold/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-125 group-hover:rotate-12 transform">
                {idx % 3 === 0 ? <Coffee className="w-24 h-24" /> : idx % 3 === 1 ? <IceCream className="w-24 h-24" /> : <Pizza className="w-24 h-24" />}
              </div>

              <h3 className="text-2xl font-serif text-gold mb-8 italic flex items-center gap-4">
                <span className="w-8 h-[1px] bg-gold/30" />
                {category.title}
              </h3>
              
              <ul className="space-y-6">
                {category.items.map((item, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat font-bold text-deep-green tracking-wide">{item.name}</span>
                      <div className="flex-1 border-b border-gold/10 border-dotted mx-4" />
                      {item.tag && <span className="text-[9px] uppercase tracking-tighter bg-gold/10 text-gold px-2 py-0.5 rounded-full font-bold">{item.tag}</span>}
                    </div>
                    {item.description && <p className="text-[11px] text-deep-green/50 italic font-serif leading-relaxed">{item.description}</p>}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold/60 font-bold mb-4">Bon Appétit</p>
          <div className="inline-flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-gold/20" />
             <div className="w-3 h-3 rounded-full bg-gold/40" />
             <div className="w-2 h-2 rounded-full bg-gold/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodMenu;
