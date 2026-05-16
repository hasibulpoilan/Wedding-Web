import React, { useState } from 'react';
import SetupDashboard from './components/builder/SetupDashboard';
import MainInvitation from './components/invitation/MainInvitation';
import MarketingPreview from './components/builder/MarketingPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, CloudSync, Save } from 'lucide-react';
import { supabase } from './lib/supabase';
import { getSharePhoto } from './lib/sharePhoto';
import { getLastGuestInvite, applyGuestInviteToUrl } from './lib/guestInvites';

const initialConfig = {
  weddingId: "tanmay-tanya",
  masterName1: "Tanmay", // The original names set by Hasibul
  masterName2: "Tanya",
  couple: {
    name1: "Tanmay",
    name2: "Tanya",
    initials: "T&T",
    upi: "wedding.joy@okaxis",
    accountNo: "9876543210",
    ifsc: "WJOY000123"
  },
  date: "2026-05-30",
  venue: "The Grand Palace, Udaipur",
  stories: [
    { id: 1, caption: "First Real Date", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", rotation: -3 },
    { id: 2, caption: "Beautiful Moments", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", rotation: 5 },
    { id: 3, caption: "Love in the Air", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", rotation: -2 }
  ],
  events: [
    { id: "haldi", title: "Haldi", time: "10:00 AM", date: "May 28", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" },
    { id: "carnival", title: "Carnival", time: "11:00 AM", date: "May 29", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" },
    { id: "sangeet", title: "Sangeet Sandhya", time: "7:00 PM", date: "May 29", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" },
    { id: "wedding", title: "Wedding Ceremony", time: "4:00 PM", date: "May 30", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" },
    { id: "reception", title: "Reception & Dinner", time: "8:00 PM", date: "May 30", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", enabled: true, venueName: "The Grand Palace, Udaipur", venueUrl: "" }
  ],
  funds: [
    { id: 1, title: "Honeymoon Fund", description: "Help us create memories on our first journey as a couple.", enabled: true },
    { id: 2, title: "New Home Fund", description: "Contribute towards building our little nest together.", enabled: true },
    { id: 3, title: "Romantic Dinner", description: "Treat us to a beautiful candlelit dinner.", enabled: true }
  ],
  menu: [
    { 
      id: "starters", 
      title: "Starters", 
      items: [
        { name: "Paneer Tikka", description: "Grilled cottage cheese with spices", tag: "Veg" },
        { name: "Chicken 65", description: "Spicy deep-fried chicken", tag: "Non-Veg" }
      ] 
    },
    { 
      id: "main", 
      title: "Main Course", 
      items: [
        { name: "Butter Chicken", description: "Creamy tomato based chicken curry" },
        { name: "Dal Makhani", description: "Slow cooked black lentils" }
      ] 
    }
  ],
  tier: 'gold', // 'basic', 'gold', 'platinum'
  guestName: "Our Special Guest",
  guests: [],
  language: 'en'
};

function App() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('weddingConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge to ensure new fields like 'funds' exist
        return {
          ...initialConfig,
          ...parsed,
          couple: { ...initialConfig.couple, ...parsed.couple },
          funds: parsed.funds || initialConfig.funds,
          events: parsed.events || initialConfig.events,
          stories: parsed.stories || initialConfig.stories,
          language: parsed.language || initialConfig.language,
          guests: parsed.guests || initialConfig.guests
        };
      } catch (e) {
        return initialConfig;
      }
    }
    return initialConfig;
  });
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'guest' ? 'invitation' : 'setup';
  });
  
  const queryParams = new URLSearchParams(window.location.search);
  const isGuest = queryParams.get('mode') === 'guest';
  const isAdmin = queryParams.get('role') === 'admin'; // Hasibul's secret access
  
  const [showMarketing, setShowMarketing] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);

  // Web Security (Basic Protection for Final Website & Guests)
  React.useEffect(() => {
    // Only apply protection when viewing the invitation and NOT logged in as admin
    if (viewMode !== 'invitation' || isAdmin) return;

    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      // Prevent F12
      if (e.key === 'F12') e.preventDefault();
      // Prevent Ctrl+Shift+I, J, C and Ctrl+U
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) e.preventDefault();
      if (e.ctrlKey && ['U', 'u'].includes(e.key)) e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Prevent text selection globally via CSS
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'auto';
    };
  }, [viewMode, isAdmin]);

  // Load from Supabase on start
  React.useEffect(() => {
    const loadFromCloud = async () => {
      const id = queryParams.get('id') || config.weddingId;
      if (!id) return;

      setIsSyncing(true);
      const { data, error } = await supabase
        .from('weddings')
        .select('*')
        .eq('wedding_id', id)
        .single();

      if (data && !error) {
        setConfig((prev) => ({
          ...prev,
          ...data.config,
          couple: { ...prev.couple, ...data.config.couple },
          events: data.config.events || prev.events,
          stories: data.config.stories || prev.stories,
          funds: data.config.funds || prev.funds,
          guests: data.config.guests?.length ? data.config.guests : prev.guests,
        }));
        console.log('Cloud data loaded successfully');
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error loading from cloud:', error.message);
      }
      setIsSyncing(false);
    };

    loadFromCloud();
  }, []);

  // Dynamically update Open Graph meta tags for link previews
  React.useEffect(() => {
    if (!config) return;

    const coverPhoto = getSharePhoto(config);
    const title = `Wedding Invitation: ${config.couple.name1 || ''} & ${config.couple.name2 || ''}`;
    
    // Update document title
    document.title = title;

    // Helper to safely update meta tags
    const updateMetaTag = (selector, content) => {
      const tag = document.querySelector(selector);
      if (tag) tag.setAttribute('content', content);
    };

    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:image"]', coverPhoto);
    updateMetaTag('meta[itemprop="name"]', title);
    updateMetaTag('meta[itemprop="image"]', coverPhoto);
  }, [config]);

  const saveToCloud = async () => {
    setIsSyncing(true);
    const { error } = await supabase
      .from('weddings')
      .upsert({ 
        wedding_id: config.weddingId, 
        config: config,
        master_name1: config.masterName1,
        master_name2: config.masterName2
      }, { onConflict: 'wedding_id' });

    if (error) {
      alert('Error saving to cloud: ' + error.message);
    } else {
      alert('Wedding data synced to PostgreSQL successfully!');
    }
    setIsSyncing(false);
  };

  React.useEffect(() => {
    try {
      localStorage.setItem('weddingConfig', JSON.stringify(config));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        console.warn('Storage limit reached. Large images or music cannot be saved locally.');
      }
    }
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
              isAdmin={isAdmin}
              saveToCloud={saveToCloud}
              isSyncing={isSyncing}
              onFinish={() => {
                const last = getLastGuestInvite();
                const guest = config.guests?.[0];
                if (last?.guestName) {
                  applyGuestInviteToUrl(config, {
                    guestName: last.guestName,
                    invitedEventIds: last.invitedEventIds,
                    lang: last.lang || config.language,
                  });
                } else if (guest?.name) {
                  applyGuestInviteToUrl(config, {
                    guestName: guest.name,
                    invitedEventIds: guest.invitedEvents,
                    lang: config.language,
                  });
                }
                setViewMode('invitation');
              }} 
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
            
            {/* Back to Edit Button - Only for Owner */}
            {!isGuest && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setViewMode('setup')}
                className="fixed bottom-24 right-7 z-[200] w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-gold border border-gold/10 hover:bg-gold hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
