import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music as MusicIcon, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ audioSrc, autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioSrc) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [autoPlay, audioSrc]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!audioSrc) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      <audio ref={audioRef} src={audioSrc} loop />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-gold border border-gold/20 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VolumeX className="w-5 h-5 opacity-40" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visualizer animation when playing */}
        {isPlaying && (
          <div className="absolute bottom-1 flex items-end justify-center gap-0.5 w-full">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                className="w-0.5 bg-gold/40"
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
