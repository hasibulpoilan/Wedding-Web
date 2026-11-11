import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

export const THEMES = [
  {
    id: 'royal-gold',
    name: 'Royal Heritage Gold',
    badge: 'Classic Heritage',
    description: 'Traditional cream & rich emerald green with regal gold borders & wax seal envelope.',
    previewGradient: 'from-[#FAF9F6] via-[#FDFBF7] to-[#1B3022]',
    accentColor: '#C5A059',
  },
  {
    id: 'blush-floral',
    name: 'Blush Floral & Golden Ring',
    badge: 'Modern Romantic',
    description: 'Pastel peach & blush pink flowers, glowing circular gold frame, butterflies & luxury velvet envelope.',
    previewGradient: 'from-[#FFF8F3] via-[#FFEBE5] to-[#721C24]',
    accentColor: '#E07A7A',
  },
  {
    id: 'mughal-palace',
    name: 'Noor Mahal (Mughal Palace & Jeweled Chest)',
    badge: 'Royal Islamic & Mughal',
    description: 'Ornate emerald green Mughal doors, palace interior, jeweled chest letter, celestial astrolabe countdown & sacred dua.',
    previewGradient: 'from-[#0A1F17] via-[#0E281F] to-[#D4AF37]',
    accentColor: '#D4AF37',
  },
];

const ThemeSelector = ({ currentTheme = 'royal-gold', onSelectTheme }) => {
  return (
    <section className="col-span-1 md:col-span-2 space-y-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gold/15">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold/10 pb-4">
        <div>
          <h2 className="text-lg md:text-xl font-serif text-deep-green flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            Admin Exclusive: Select Wedding Invitation Theme
          </h2>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mt-1">
            Choose the visual experience for this client. Content remains identical across all themes.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold bg-neutral-900 text-gold px-3 py-1.5 rounded-full w-fit">
          Admin Only
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {THEMES.map((theme) => {
          const isSelected = currentTheme === theme.id;
          return (
            <motion.div
              key={theme.id}
              whileHover={{ y: -3 }}
              onClick={() => onSelectTheme(theme.id)}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-gold shadow-lg shadow-gold/10 bg-gold/[0.03]'
                  : 'border-neutral-200 hover:border-gold/50 bg-neutral-50/50'
              }`}
            >
              {/* Top Accent Strip */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${theme.previewGradient} rounded-full mb-4 shadow-sm`} />

              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                    {theme.badge}
                  </span>
                  <h3 className="font-serif text-base md:text-lg text-deep-green font-bold mt-1.5">
                    {theme.name}
                  </h3>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-gold border-gold text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <p className="text-xs text-neutral-500 font-serif leading-relaxed mt-2">
                {theme.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ThemeSelector;
