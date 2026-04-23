import React, { useState } from 'react';
import SetupDashboard from './components/builder/SetupDashboard';
import MainInvitation from './components/invitation/MainInvitation';
import MarketingPreview from './components/builder/MarketingPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const initialConfig = {
  couple: {
    name1: "Tanmay",
    name2: "Tanya",
    initials: "T&T"
  },
  date: "2026-05-30",
  venue: "The Grand Palace, Udaipur",
  stories: [
    { id: 1, caption: "First Real Date", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", rotation: -3 },
    { id: 2, caption: "Beautiful Moments", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", rotation: 5 },
    { id: 3, caption: "Love in the Air", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", rotation: -2 }
  ],
  events: [
    { id: "carnival", title: "Carnival", time: "11:00 AM", date: "May 29", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" },
    { id: "sangeet", title: "Sangeet", time: "7:00 PM", date: "May 29", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" },
    { id: "wedding", title: "Wedding", time: "4:00 PM", date: "May 30", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" }
  ],
  tier: 'gold' // 'basic', 'gold', 'platinum'
};

function App() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('weddingConfig');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialConfig;
      }
    }
    return initialConfig;
  });
  const [viewMode, setViewMode] = useState('setup'); // 'setup' or 'invitation'
  const [showMarketing, setShowMarketing] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('weddingConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 font-serif">
      <AnimatePresence>
        {showMarketing && <MarketingPreview onClose={() => setShowMarketing(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewMode === 'setup' ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <SetupDashboard 
              config={config} 
              updateConfig={updateConfig} 
              onFinish={() => setViewMode('invitation')} 
            />
            
            {/* Marketing Tool Button - Commented out as requested
            <button 
              onClick={() => setShowMarketing(true)}
              className="fixed bottom-8 right-8 z-50 bg-gold text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]"
            >
               <Rocket className="w-4 h-4" /> Marketing Kit (Hindi)
            </button>
            */}
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-screen overflow-hidden relative"
          >
            <MainInvitation config={config} />
            
            {/* Back to Edit Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setViewMode('setup')}
              className="fixed bottom-8 right-8 z-[200] w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-gold border border-gold/10 hover:bg-gold hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
