import React, { useState, useEffect } from 'react';
import { Users, Heart, CheckCircle2, XCircle, RefreshCw, MessageSquareHeart, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGuestRSVPs, fetchGuestWishes } from '../../lib/guestFeedback';

const ClientFeedbackDashboard = ({ weddingId, events = [] }) => {
  const [activeTab, setActiveTab] = useState('rsvp'); // 'rsvp' | 'wishes'
  const [rsvps, setRsvps] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const loadData = async () => {
    if (!weddingId) return;
    setIsLoading(true);
    try {
      const [rsvpData, wishData] = await Promise.all([
        fetchGuestRSVPs({ weddingId }),
        fetchGuestWishes({ weddingId, isOwner: true }),
      ]);
      setRsvps(rsvpData || []);
      setWishes(wishData || []);
      // If no RSVPs but has wishes, auto switch to wishes tab
      if ((!rsvpData || rsvpData.length === 0) && wishData && wishData.length > 0) {
        setActiveTab('wishes');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [weddingId]);

  const totalCount = rsvps.length + wishes.length;

  // Requirement: kono wishes ba rsvp na thakle aii section ta completely hide thakbe
  if (totalCount === 0) {
    return null;
  }

  // Display list according to tab and expansion
  const currentList = activeTab === 'rsvp' ? rsvps : wishes;
  const displayedItems = isExpanded ? currentList : currentList.slice(0, 1);
  const hasMultiple = currentList.length > 1;

  return (
    <section className="col-span-1 md:col-span-2 space-y-5 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gold/15 transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/10 pb-4">
        <div>
          <h2 className="text-lg md:text-xl font-serif text-deep-green flex items-center gap-2.5">
            <Users className="w-5 h-5 text-gold" />
            Guest Responses & Wishes
            <span className="text-[10px] bg-gold/15 text-gold font-bold px-2 py-0.5 rounded-full font-sans">
              {totalCount} Total
            </span>
          </h2>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mt-1">
            Real-time RSVP confirmations & guest blessings
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="bg-neutral-100 p-1 rounded-xl flex items-center text-xs font-bold uppercase tracking-wider">
            {rsvps.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('rsvp');
                  setIsExpanded(false);
                }}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'rsvp'
                    ? 'bg-white text-gold shadow-sm'
                    : 'text-neutral-500 hover:text-deep-green'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                RSVP ({rsvps.length})
              </button>
            )}

            {wishes.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('wishes');
                  setIsExpanded(false);
                }}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'wishes'
                    ? 'bg-white text-gold shadow-sm'
                    : 'text-neutral-500 hover:text-deep-green'
                }`}
              >
                <MessageSquareHeart className="w-3.5 h-3.5" />
                Wishes ({wishes.length})
              </button>
            )}
          </div>

          <button
            onClick={loadData}
            title="Refresh Responses"
            className="p-2 bg-gold/10 text-gold rounded-xl hover:bg-gold hover:text-white transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'rsvp' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200/50 pb-2">
                    <span className="font-serif text-deep-green font-bold text-sm">
                      {item.guest_name}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-mono">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {events.map((ev) => {
                      const status = item.responses?.[ev.id];
                      if (!status) return null;
                      const isAttending = status === 'attending';
                      return (
                        <div
                          key={ev.id}
                          className="flex items-center justify-between text-xs font-medium py-1 px-2.5 rounded-lg bg-white border border-neutral-100"
                        >
                          <span className="text-neutral-700 truncate">{ev.title}</span>
                          <span
                            className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                              isAttending ? 'text-emerald-600' : 'text-neutral-400'
                            }`}
                          >
                            {isAttending ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Attending
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-neutral-400" /> Declined
                              </>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wishes' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedItems.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center text-xs font-bold">
                        {(w.guest_name || 'G').charAt(0)}
                      </div>
                      <span className="font-serif text-deep-green font-bold text-sm">
                        {w.guest_name}
                      </span>
                    </div>
                    <span className="text-xl">{w.emoji || '❤️'}</span>
                  </div>

                  {w.image && (
                    <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                      <img src={w.image} alt="Guest memory" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <p className="text-xs font-serif italic text-neutral-600 leading-relaxed bg-white p-3 rounded-xl border border-neutral-100">
                    "{w.message}"
                  </p>

                  <div className="text-right text-[9px] text-neutral-400 font-mono">
                    {w.created_at ? new Date(w.created_at).toLocaleString() : ''}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Expand / Collapse Button if multiple entries exist */}
      {hasMultiple && (
        <div className="pt-2 text-center border-t border-gold/10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gold/10 hover:bg-gold hover:text-white text-gold text-xs font-bold uppercase tracking-wider transition-all"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide & Show Latest Only
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                View All {currentList.length} {activeTab === 'rsvp' ? 'RSVP Responses' : 'Wishes'}
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default ClientFeedbackDashboard;
