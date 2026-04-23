import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Heart, User, Camera, X, Upload } from 'lucide-react';

const WishesWall = () => {
  const [wishes, setWishes] = useState([
    { id: 1, name: "Rahul & Neha", message: "So happy for you both! Wishing you a lifetime of love and happiness.", emoji: "❤️", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Priya Sharma", message: "Can't wait for the Udaipur wedding! It's going to be magical.", emoji: "✨", image: null },
    { id: 3, name: "Uncle Ji", message: "God bless you both on this new journey. Stay happy always.", emoji: "🙏", image: null }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', message: '', emoji: '❤️', image: null });
  const fileInputRef = useRef(null);

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

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold block mb-4"
        >
          Interactive Guestbook
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-cursive text-deep-green mb-6"
        >
          Wishes Wall
        </motion.h2>
        <p className="text-sm font-serif italic text-deep-green/60 max-w-lg mx-auto">
          Leave a message, a photo, or a blessing to become part of our permanent wedding memory.
        </p>
      </div>

      {/* Wishes Grid */}
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
          <span>Leave a Blessing & Photo</span>
        </motion.button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 border border-gold/10 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                 <X className="w-5 h-5 text-neutral-400" />
              </button>

              <h3 className="text-4xl font-cursive text-gold mb-2">Write a Blessing</h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-8 font-bold">Share your love and a photo with us</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-6">
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Your Name</label>
                        <input 
                          required
                          type="text" 
                          value={newWish.name}
                          onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                          className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Your Blessing</label>
                        <textarea 
                          required
                          value={newWish.message}
                          onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                          className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-serif h-32"
                          placeholder="Write something beautiful..."
                        />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="block text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">Attach a Photo</label>
                      <div 
                        onClick={() => fileInputRef.current.click()}
                        className="aspect-[4/5] bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all overflow-hidden relative group"
                      >
                         {newWish.image ? (
                           <>
                             <img src={newWish.image} alt="Upload" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Upload className="text-white w-8 h-8" />
                             </div>
                           </>
                         ) : (
                           <>
                             <Camera className="w-8 h-8 text-neutral-300 mb-2" />
                             <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Click to Upload</span>
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
                </div>

                <div className="flex justify-between items-center bg-neutral-50 p-4 rounded-2xl">
                   <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold ml-1">Feeling like?</span>
                   <div className="flex gap-4">
                      {['❤️', '✨', '🙏', '🥂', '🎉'].map(emoji => (
                        <button 
                          key={emoji}
                          type="button"
                          onClick={() => setNewWish({...newWish, emoji})}
                          className={`text-xl transition-transform hover:scale-125 ${newWish.emoji === emoji ? 'scale-125 opacity-100' : 'opacity-40'}`}
                        >
                          {emoji}
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-neutral-900 text-cream rounded-2xl font-serif text-sm tracking-widest hover:bg-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group"
                >
                  <span>Post to Wishes Wall</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WishesWall;
