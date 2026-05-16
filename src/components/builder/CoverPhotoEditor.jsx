import React, { useRef, useCallback } from 'react';
import { Upload, RotateCcw, Move } from 'lucide-react';
import { getSharePhoto } from '../../lib/sharePhoto';
import { DEFAULT_PHOTO_FOCUS, getPhotoFocus } from '../../lib/photoFocus';
import CoverPhotoFrame from '../shared/CoverPhotoFrame';

const CoverPhotoEditor = ({ config, updateConfig, handleFileUpload }) => {
  const previewRef = useRef(null);
  const photoSrc = getSharePhoto(config);
  const focus = getPhotoFocus(config);
  const hasOwnCover = Boolean(config?.couple?.coverPhoto);

  const setFocus = useCallback(
    (patch) => {
      updateConfig('couple.photoFocus', { ...focus, ...patch });
    },
    [focus, updateConfig]
  );

  const resetFocus = () => updateConfig('couple.photoFocus', { ...DEFAULT_PHOTO_FOCUS });

  const pickPositionFromEvent = (clientX, clientY) => {
    const el = previewRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setFocus({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const onPreviewPointerDown = (e) => {
    e.preventDefault();
    pickPositionFromEvent(e.clientX, e.clientY);

    const onMove = (ev) => {
      if (ev.cancelable) ev.preventDefault();
      pickPositionFromEvent(ev.clientX, ev.clientY);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className="pt-6 mt-4 border-t border-gold/10">
      <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">
        Couple Photo (Share Cards & Link Preview)
      </label>
      <p className="text-[9px] text-neutral-400 mb-4 ml-1 leading-relaxed">
        Upload a photo, then drag inside the circle or use sliders to zoom and position — so the face is not cut off on guest share cards.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div
            ref={previewRef}
            onPointerDown={onPreviewPointerDown}
            className="cursor-grab active:cursor-grabbing touch-none select-none relative"
            title="Drag to reposition"
          >
            <CoverPhotoFrame src={photoSrc} focus={focus} size={140} borderColor="#C5A059" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30 pointer-events-none" />
          </div>
          <p className="text-[9px] text-gold font-bold uppercase tracking-widest flex items-center gap-1">
            <Move className="w-3 h-3" /> Drag to move
          </p>

          <label className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-gold/20 transition-colors">
            <Upload className="w-4 h-4" />
            {hasOwnCover ? 'Change photo' : 'Upload photo'}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'couple.coverPhoto')}
            />
          </label>
        </div>

        <div className="flex-1 w-full space-y-4 min-w-[200px]">
          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
              <span>Zoom</span>
              <span className="text-gold">{focus.scale.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={focus.scale}
              onChange={(e) => setFocus({ scale: parseFloat(e.target.value) })}
              className="w-full accent-gold"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
              <span>Left ↔ Right</span>
              <span>{Math.round(focus.x)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={focus.x}
              onChange={(e) => setFocus({ x: parseFloat(e.target.value) })}
              className="w-full accent-gold"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
              <span>Up ↕ Down</span>
              <span>{Math.round(focus.y)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={focus.y}
              onChange={(e) => setFocus({ y: parseFloat(e.target.value) })}
              className="w-full accent-gold"
            />
          </div>

          <button
            type="button"
            onClick={resetFocus}
            className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest font-bold hover:text-gold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset position & zoom
          </button>

          <input
            type="text"
            value={config.couple.coverPhoto || ''}
            onChange={(e) => updateConfig('couple.coverPhoto', e.target.value)}
            className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-gold/20"
            placeholder="Or paste image URL..."
          />

          {config.couple.coverPhoto && (
            <button
              type="button"
              onClick={() => {
                updateConfig('couple.coverPhoto', '');
                resetFocus();
              }}
              className="text-[10px] text-red-400 uppercase tracking-widest font-bold hover:text-red-600"
            >
              Remove cover photo
            </button>
          )}

          {!config.couple.coverPhoto && config.stories?.[0]?.image && (
            <p className="text-[9px] text-neutral-400 italic">
              Until you upload, the first Our Story photo is used. You can still adjust how it appears in the circle.
            </p>
          )}

          <div className="pt-2 border-t border-neutral-100">
            <p className="text-[9px] text-neutral-400 mb-2 uppercase tracking-widest font-bold">Card preview</p>
            <CoverPhotoFrame src={photoSrc} focus={focus} size={100} borderColor="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPhotoEditor;
