import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Palette, Flower2, ExternalLink, ShieldCheck } from 'lucide-react';

const VendorReferrals = () => {
  const vendors = [
    {
      id: 1,
      type: 'Photography',
      name: 'Cinematic Memories',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600',
      icon: Camera,
      badge: 'Platinum Partner'
    },
    {
      id: 2,
      type: 'Makeup Artist',
      name: 'Royal Glow Studio',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
      icon: Palette,
      badge: 'Verified'
    },
    {
      id: 3,
      type: 'Decorators',
      name: 'Floral Dreams',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600',
      icon: Flower2,
      badge: 'Top Rated'
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#FAF9F6] relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold block mb-4"
        >
          Our Partnered Experts
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-cursive text-deep-green mb-6"
        >
          Recommended Vendors
        </motion.h2>
        <p className="text-sm font-serif italic text-deep-green/60 max-w-lg mx-auto">
          We've partnered with the best in the industry to make your event truly spectacular.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 relative z-10">
        {vendors.map((vendor, idx) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gold/5 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-700"
          >
            {/* Vendor Image */}
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={vendor.image} 
                alt={vendor.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-gold flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3 h-3" /> {vendor.badge}
                 </span>
              </div>
            </div>

            {/* Vendor Details */}
            <div className="p-8">
               <div className="flex items-center gap-2 mb-3">
                  <vendor.icon className="w-4 h-4 text-gold opacity-60" />
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">{vendor.type}</span>
               </div>
               <h3 className="text-xl font-serif text-deep-green mb-6">{vendor.name}</h3>
               
               <button className="w-full py-4 bg-neutral-50 group-hover:bg-gold group-hover:text-white rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 border border-neutral-100 group-hover:border-gold">
                  <span className="text-[10px] font-bold uppercase tracking-widest">View Portfolio</span>
                  <ExternalLink className="w-3 h-3" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* B2B Revenue Tip (Visible only in dev/builder mode conceptually) */}
      <div className="mt-16 text-center">
         <p className="text-[9px] text-neutral-300 uppercase tracking-[0.3em] font-medium">
            SaaS B2B Opportunity: Vendors pay to be featured here
         </p>
      </div>
    </section>
  );
};

export default VendorReferrals;
