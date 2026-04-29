import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, MessageCircle, Copy, Check, Download, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

const GuestShareTool = ({ coupleNames, config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
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
      // Small delay to ensure all animations and images are settled
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: '#FDFBF7',
        logging: true,
        imageTimeout: 10000,
        foreignObjectRendering: false,
        removeContainer: true,
      });
      
      const image = canvas.toDataURL('image/jpeg', 0.9);
      
      // Mark as downloaded to show share options
      setIsDownloaded(true);

      // Try to use Native Share API if available (especially for mobile)
      if (navigator.share && navigator.canShare) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], `${coupleNames.replace(/ & /g, '_')}_Invitation.jpg`, { type: 'image/jpeg' });
        
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Wedding Invitation',
              text: `✨ A Beautiful Journey Begins ✨ - Celebration of ${coupleNames}`
            });
            return; // Success!
          } catch (shareErr) {
            console.log("Share cancelled or failed:", shareErr);
          }
        }
      }

      // Fallback: Download the image
      const link = document.createElement('a');
      link.href = image;
      link.download = `${coupleNames.replace(/ & /g, '_')}_Wedding_Invitation.jpg`;
      link.click();
      alert("Invitation Card Downloaded! Now you can share this image on your WhatsApp Status or Instagram Story. ✨");
    } catch (err) {
      console.error("Detailed Capture Error:", err);
      alert(`Could not generate image: ${err.message || 'Unknown Error'}. Please take a screenshot of the card instead!`);
    }
    setIsCapturing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



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

              <div className="text-center mb-6">
                <h2 className="text-3xl font-serif text-deep-green italic">Share the Joy</h2>
                <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mt-2">Get your premium digital card</p>
              </div>

              {/* Digital Card Preview - Moved to Top */}
              <div className="space-y-6">
                <div 
                  ref={cardRef}
                  className="relative overflow-hidden rounded-[2.5rem] p-8 text-center"
                  style={{ 
                    width: '100%', 
                    maxWidth: '300px', 
                    margin: '0 auto',
                    backgroundColor: '#FDFBF7',
                    border: '8px solid rgba(197, 160, 89, 0.1)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div className="absolute inset-0 m-2 pointer-events-none" style={{ border: '1px solid rgba(197, 160, 89, 0.2)' }} />
                  
                  <p className="text-[10px] uppercase tracking-[0.5em] mb-4 font-cinzel" style={{ color: '#C5A059' }}>Celebration of Love</p>
                  
                  <div className="aspect-[4/5] relative rounded-full overflow-hidden mb-6 mx-auto w-40" style={{ border: '4px solid #ffffff', boxShadow: '0 15px 20px -5px rgba(0, 0, 0, 0.1)' }}>
                     <img 
                       src={config?.couple?.coverPhoto || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"} 
                       className="w-full h-full object-cover" 
                       alt="Wedding Preview" 
                       crossOrigin="anonymous"
                     />
                  </div>

                  <h3 className="text-3xl font-pinyon mb-3" style={{ color: '#1B3022' }}>{coupleNames}</h3>
                  <div className="w-10 h-[1px] mx-auto mb-3" style={{ backgroundColor: 'rgba(197, 160, 89, 0.3)' }} />
                  <p className="text-[11px] tracking-[0.2em] font-serif italic mb-1" style={{ color: '#737373' }}>Wedding Ceremony</p>
                  <p className="text-[9px] tracking-widest font-bold uppercase" style={{ color: 'rgba(197, 160, 89, 0.6)' }}>Save The Date</p>
                </div>

                <div className="flex flex-col gap-3">
                  {!isDownloaded ? (
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
                          <span className="text-xs font-bold uppercase tracking-widest">Generate & Download Card</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-center">
                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mb-1">✨ Card Saved to Gallery!</p>
                        <p className="text-[9px] text-green-600/70 italic">Now share it on your Story or Status</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`✨ Join us for the wedding of ${coupleNames}! ✨`)}`, '_blank')}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-neutral-100 hover:border-gold/20"
                        >
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                          <span className="text-[8px] font-bold uppercase text-neutral-400">WhatsApp</span>
                        </button>
                        <button 
                          onClick={() => alert("Paste the card you just downloaded into your Instagram Story! ✨")}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-neutral-100 hover:border-gold/20"
                        >
                          <ImageIcon className="w-5 h-5 text-[#E4405F]" />
                          <span className="text-[8px] font-bold uppercase text-neutral-400">Instagram</span>
                        </button>
                        <button 
                          onClick={handleCopy}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-neutral-100 hover:border-gold/20"
                        >
                          <Copy className="w-5 h-5 text-gold" />
                          <span className="text-[8px] font-bold uppercase text-neutral-400">Copy Caption</span>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => setIsDownloaded(false)}
                        className="w-full py-2 text-[8px] text-neutral-400 uppercase tracking-widest hover:text-gold transition-colors"
                      >
                        Reset & Redownload
                      </button>
                    </motion.div>
                  )}
                  
                  <p className="text-[9px] text-neutral-400 text-center italic font-medium px-4 leading-relaxed">
                    {!isDownloaded 
                      ? "Get your personalized invitation card as a high-quality image."
                      : "The card is in your downloads/gallery. Select an app to share the celebration!"
                    }
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gold/10 flex flex-col items-center">
                <button
                  onClick={handleCopy}
                  className="px-6 py-2 bg-neutral-50 text-neutral-500 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-100 transition-all active:scale-95 border border-neutral-100"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-neutral-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Get Web Link</span>
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
