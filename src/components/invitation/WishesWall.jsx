import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Camera, X, Upload } from 'lucide-react';

const WishesWall = ({ t }) => {
  const [wishes, setWishes] = useState([
    { id: 1, name: "Rahul & Neha", message: "So happy for you both! Wishing you a lifetime of love and happiness.", emoji: "❤️", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Priya Sharma", message: "Can't wait for the Udaipur wedding! It's going to be magical.", emoji: "✨", image: null },
    { id: 3, name: "Uncle Ji", message: "God bless you both on this new journey. Stay happy always.", emoji: "🙏", image: null }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', message: '', emoji: '❤️', image: null });
  const fileInputRef = useRef(null);
  const scrollLockY = useRef(0);

  useEffect(() => {
    if (!isModalOpen) return;

    scrollLockY.current = window.scrollY;
    const { style } = document.body;
    const prev = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollLockY.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.left = prev.left;
      document.body.style.right = prev.right;
      document.body.style.width = prev.width;
      document.body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollLockY.current);
    };
  }, [isModalOpen]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewWish({ ...newWish, image: url });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newWish.name && newWish.message) {
      setWishes([{ id: Date.now(), ...newWish }, ...wishes]);
      setIsModalOpen(false);
      setNewWish({ name: '', message: '', emoji: '❤️', image: null });
    }
  };

  const modal = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] flex flex-col bg-cream"
          style={{
            height: '100dvh',
            width: '100vw',
            maxHeight: '100dvh',
            maxWidth: '100vw',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative z-10 flex flex-col flex-1 min-h-0 w-full max-w-lg mx-auto bg-white md:my-auto md:rounded-[2rem] md:max-h-[min(100dvh,720px)] md:shadow-2xl md:border md:border-gold/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-gold/10 bg-white">
              <div className="min-w-0">
                <h3 className="text-2xl sm:text-3xl font-cursive text-gold leading-tight">
                  {t.leaveAWish || 'Write a Blessing'}
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1 font-bold">
                  {t.wishesWallSubheading || 'Share your love and a photo with us'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="shrink-0 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4 space-y-4"
            >
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 mb-1.5 font-bold ml-1">
                  {t.fullName || 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  value={newWish.name}
                  onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                  className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif text-sm"
                  placeholder={t.namePlaceholder || 'e.g. John Doe'}
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 mb-1.5 font-bold ml-1">
                  {t.yourBlessing || 'Your Blessing'}
                </label>
                <textarea
                  required
                  value={newWish.message}
                  onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                  className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif h-24 sm:h-28 text-sm resize-none"
                  placeholder={t.messagePlaceholder || 'Your message...'}
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 mb-1.5 font-bold ml-1">
                  {t.attachPhoto || 'Attach a Photo'}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-36 sm:h-44 bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all overflow-hidden relative group"
                >
                  {newWish.image ? (
                    <>
                      <img src={newWish.image} alt="Upload" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="text-white w-7 h-7" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera className="w-7 h-7 text-neutral-300 mb-1" />
                      <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">
                        {t.clickToUpload || 'Click to Upload'}
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-xl shrink-0">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  {t.feelingLike || 'Feeling like?'}
                </span>
                <div className="flex gap-3">
                  {['❤️', '✨', '🙏', '🥂', '🎉'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewWish({ ...newWish, emoji })}
                      className={`text-lg transition-transform hover:scale-125 ${newWish.emoji === emoji ? 'scale-125 opacity-100' : 'opacity-40'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="shrink-0 w-full py-4 bg-neutral-900 text-cream rounded-xl font-serif text-sm tracking-widest hover:bg-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group mb-2"
              >
                <span>{t.postToWall || 'Post to Wishes Wall'}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold block mb-4"
        >
          {t.interactiveGuestbook || 'Interactive Guestbook'}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-cursive text-deep-green mb-6"
        >
          {t.wishesWall || 'Wishes Wall'}
        </motion.h2>
        <p className="text-sm font-serif italic text-deep-green/60 max-w-lg mx-auto">
          {t.wishesWallMessage || 'Leave a message, a photo, or a blessing to become part of our permanent wedding memory.'}
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto px-4 relative z-10">
        <AnimatePresence>
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="break-inside-avoid mb-6 bg-cream/30 p-6 rounded-[2rem] border border-gold/10 shadow-sm relative group hover:bg-white transition-all duration-500"
            >
              {wish.image && (
                <div className="aspect-[4/5] mb-6 rounded-2xl overflow-hidden shadow-md">
                  <img src={wish.image} alt="Guest" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="absolute top-4 right-6 text-2xl opacity-40 group-hover:opacity-100 transition-opacity">
                {wish.emoji}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-serif italic text-deep-green leading-relaxed mb-6">
                  "{wish.message}"
                </p>
                <div className="flex items-center gap-3 border-t border-gold/5 pt-4">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px] font-bold">
                    {wish.name.charAt(0)}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{wish.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-20 text-center relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-neutral-900 text-cream rounded-full font-serif text-xs tracking-widest hover:bg-gold transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 mx-auto"
        >
          <Camera className="w-4 h-4" />
          <span>{t.leaveAWish || 'Leave a Blessing & Photo'}</span>
        </motion.button>
      </div>

      {typeof document !== 'undefined' && createPortal(modal, document.body)}
    </section>
  );
};

export default WishesWall;
