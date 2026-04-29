import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, MessageCircle, Copy, Check, Download, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

const GuestShareTool = ({ coupleNames, config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const invitationLink = window.location.href.split('&guest=')[0].split('?guest=')[0];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#FDFBF7'
      });
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = `${coupleNames.replace(/ & /g, '_')}_Wedding_Invitation.jpg`;
      link.click();
      alert("Invitation Card Downloaded! Now you can share this image on your WhatsApp Status or Instagram Story. ✨");
    } catch (err) {
      console.error("Failed to capture card:", err);
      alert("Could not generate image. Please take a screenshot of the card instead!");
    }
    setIsCapturing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp Status',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-[#25D366]',
      action: () => {
        const text = `✨ A Beautiful Journey Begins ✨\n\nI am so honored to be part of the wedding celebration of ${coupleNames}!\n\n#Wedding #Celebration #LoveAndJoy`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      color: 'bg-[#1877F2]',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationLink)}`, '_blank');
      }
    },
    {
      name: 'Instagram',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
      action: () => {
        navigator.clipboard.writeText(invitationLink);
        alert("Invitation link copied for your Instagram Story/Bio!");
      }
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-gold text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20 backdrop-blur-sm"
      >
        <Share2 className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </motion.button>

      {/* Share Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-cream rounded-[2.5rem] p-10 shadow-2xl border border-gold/10 overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto mb-4">
                  <Share2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif text-deep-green italic">Share the Love</h2>
                <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mt-2">Let others see this beautiful journey</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl border border-neutral-100 hover:border-gold/30 hover:shadow-lg transition-all group"
                  >
                    <div className={`${option.color} text-white p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{option.name}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest text-center">Your Personal Digital Card:</p>
                <div 
                  ref={cardRef}
                  className="relative overflow-hidden rounded-[2.5rem] border-8 border-gold/10 shadow-2xl bg-cream p-8 text-center"
                  style={{ width: '100%', maxWidth: '320px', margin: '0 auto' }}
                >
                  <div className="absolute inset-0 border-[1px] border-gold/20 m-2 pointer-events-none" />
                  
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6 font-cinzel">Joining the Celebration</p>
                  
                  <div className="aspect-[4/5] relative rounded-full overflow-hidden mb-8 border-4 border-white shadow-xl mx-auto w-48">
                     <img 
                       src={config?.couple?.coverPhoto || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"} 
                       className="w-full h-full object-cover" 
                       alt="Wedding Preview" 
                     />
                  </div>

                  <h3 className="text-4xl font-pinyon text-deep-green mb-4">{coupleNames}</h3>
                  <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-4" />
                  <p className="text-[12px] text-neutral-500 tracking-[0.2em] font-serif italic mb-2">Wedding Celebration</p>
                  <p className="text-[10px] text-gold/60 tracking-widest font-bold uppercase">Save The Date</p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={handleDownload}
                    disabled={isCapturing}
                    className="w-full py-5 bg-gold text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-gold/90 transition-all active:scale-95 shadow-xl shadow-gold/20 disabled:opacity-50"
                  >
                    {isCapturing ? (
                      <span className="animate-pulse">Generating Card...</span>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Download & Share Image</span>
                      </>
                    )}
                  </button>
                  <p className="text-[8px] text-neutral-400 text-center italic font-medium">Download this premium card to share as an image on your Status/Story!</p>
                </div>
              </div>

              <div className="pt-8 border-t border-gold/10">
                <button
                  onClick={handleCopy}
                  className="w-full py-4 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-neutral-50 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gold" />
                      <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest">Get Invitation Link</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] text-neutral-400 leading-relaxed italic">
                "Shared happiness is double happiness." <br/> Thank you for being a part of our celebration!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuestShareTool;
