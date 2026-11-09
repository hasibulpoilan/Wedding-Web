import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

const MusicPlayer = ({ audioSrc, autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytContainerRef = useRef(null);
  const youtubeId = getYouTubeId(audioSrc);

  // Initialize YouTube Iframe API if YouTube URL is detected
  useEffect(() => {
    if (!youtubeId) return;

    const setupYT = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(setupYT, 300);
        return;
      }
      try {
        ytPlayerRef.current = new window.YT.Player('yt-bg-audio-player', {
          height: '0',
          width: '0',
          videoId: youtubeId,
          playerVars: {
            autoplay: autoPlay ? 1 : 0,
            controls: 0,
            loop: 1,
            playlist: youtubeId,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (autoPlay) {
                e.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (e.data === window.YT.PlayerState.PAUSED || e.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.error('Error creating YT player:', err);
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = setupYT;
    } else {
      setupYT();
    }

    return () => {
      try {
        if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
          ytPlayerRef.current.destroy();
        }
      } catch {}
    };
  }, [youtubeId]);

  // Standard audio autoplay
  useEffect(() => {
    if (!youtubeId && autoPlay && audioSrc && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [autoPlay, audioSrc, youtubeId]);

  const togglePlay = () => {
    if (youtubeId && ytPlayerRef.current) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch (e) {
        console.error(e);
      }
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!audioSrc) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      {youtubeId ? (
        <div id="yt-bg-audio-player" ref={ytContainerRef} style={{ display: 'none' }} />
      ) : (
        <audio ref={audioRef} src={audioSrc} loop />
      )}
      
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
