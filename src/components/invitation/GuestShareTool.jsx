import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, MessageCircle, Copy, Check, Download } from 'lucide-react';
import { captureShareCardElement } from '../../lib/shareCardCapture';
import ShareCardCanvas from './shareCards/ShareCardCanvas';
import {
  getAvailableShareTemplates,
  getTemplateById,
} from '../../lib/shareCardTemplates';
import { buildGuestInvitationLink, buildCardShareMessage } from '../../lib/guestShareLink';

const GuestShareTool = ({ coupleNames, config, guestName, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const cardRef = useRef(null);
  const cardBlobRef = useRef(null);

  const templates = useMemo(() => getAvailableShareTemplates(config), [config]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('welcome');

  const selectedTemplate = useMemo(
    () => getTemplateById(selectedTemplateId),
    [selectedTemplateId]
  );

  const invitationLink = useMemo(
    () => buildGuestInvitationLink(config, guestName),
    [config, guestName]
  );

  const templateLabel = useCallback(
    (tpl) => t[tpl.labelKey] || tpl.label,
    [t]
  );

  const shareMessage = useMemo(() => {
    const label = templateLabel(selectedTemplate);
    return buildCardShareMessage({
      templateLabel: label,
      coupleNames,
      invitationLink,
      t,
    });
  }, [selectedTemplate, coupleNames, invitationLink, t, templateLabel]);

  const fileName = useMemo(() => {
    const fileLabel = templateLabel(selectedTemplate).replace(/\s+/g, '_');
    return `${coupleNames.replace(/ & /g, '_')}_${fileLabel}.jpg`;
  }, [coupleNames, selectedTemplate, templateLabel]);

  useEffect(() => {
    if (templates.length && !templates.find((tpl) => tpl.id === selectedTemplateId)) {
      setSelectedTemplateId(templates[0].id);
    }
  }, [templates, selectedTemplateId]);

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

  const handleTemplateChange = (id) => {
    setSelectedTemplateId(id);
    setIsDownloaded(false);
    cardBlobRef.current = null;
  };

  const captureCardBlob = async () => {
    if (!cardRef.current) throw new Error('Card not ready');
    const blob = await captureShareCardElement(cardRef.current);
    cardBlobRef.current = blob;
    return blob;
  };

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareWithNativeApi = async (blob) => {
    if (!navigator.share) return false;

    const file = new File([blob], fileName, { type: 'image/jpeg' });
    const payload = { files: [file], text: shareMessage, title: t.digitalInvitation || 'Wedding Invitation' };

    if (navigator.canShare && !navigator.canShare({ files: [file] })) {
      return false;
    }

    try {
      await navigator.share(payload);
      return true;
    } catch (err) {
      if (err?.name === 'AbortError') return true;
      return false;
    }
  };

  const handleGenerateCard = async () => {
    if (!cardRef.current) return null;
    setIsCapturing(true);
    try {
      const blob = await captureCardBlob();
      setIsDownloaded(true);
      return blob;
    } catch (err) {
      console.error('Capture error:', err);
      alert(
        `Could not generate image: ${err.message || 'Unknown error'}. Please try again or take a screenshot.`
      );
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDownload = async () => {
    const blob = cardBlobRef.current || (await handleGenerateCard());
    if (!blob) return;

    if (await shareWithNativeApi(blob)) return;

    downloadBlob(blob, fileName);
    alert(
      `${t.cardSaved || 'Invitation card saved!'} ${t.shareOnStory || 'Open your gallery and share the image on WhatsApp Status or Instagram Story.'}`
    );
  };

  const handleShareWhatsApp = async () => {
    setIsCapturing(true);
    try {
      const blob = cardBlobRef.current || (await captureCardBlob());
      setIsDownloaded(true);

      if (await shareWithNativeApi(blob)) return;

      downloadBlob(blob, fileName);

      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
      window.open(waUrl, '_blank');

      alert(
        t.shareWhatsAppHint ||
          'Your invitation card was saved to Downloads/Gallery. In WhatsApp, tap Attach (clip icon) and select the image, then send the message.'
      );
    } catch (err) {
      console.error('WhatsApp share error:', err);
      alert(`Could not prepare card: ${err.message || 'Unknown error'}`);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleShareGeneric = async () => {
    setIsCapturing(true);
    try {
      const blob = cardBlobRef.current || (await captureCardBlob());
      setIsDownloaded(true);

      if (await shareWithNativeApi(blob)) return;

      downloadBlob(blob, fileName);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareMessage);
        alert(t.shareGenericHint || 'Card saved and invitation message copied. Paste the message and attach the image in your app.');
      }
    } catch (err) {
      console.error('Share error:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLinkOnly = async () => {
    await navigator.clipboard.writeText(invitationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsDownloaded(false);
    cardBlobRef.current = null;
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-cream rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-gold/10"
            >
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-gold transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-4 pr-8">
                <h2 className="text-2xl sm:text-3xl font-serif text-deep-green italic">
                  {t.shareTheJoy || 'Share the Joy'}
                </h2>
                <p className="text-[10px] sm:text-xs text-gold uppercase tracking-[0.3em] font-bold mt-2">
                  {t.chooseCardStyle || 'Choose your card style'}
                </p>
              </div>

              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2 text-center">
                  {t.pickTemplate || 'Pick a template'}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {templates.map((tpl) => {
                    const active = tpl.id === selectedTemplateId;
                    const miniBg = tpl.theme?.bg?.includes('gradient')
                      ? tpl.theme.bg
                      : tpl.theme?.bg || '#FDFBF7';
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleTemplateChange(tpl.id)}
                        className={`relative rounded-xl p-2 text-center transition-all border-2 ${
                          active
                            ? 'border-gold shadow-md shadow-gold/20 scale-[1.02]'
                            : 'border-neutral-100 hover:border-gold/30'
                        }`}
                      >
                        <div
                          className="h-10 rounded-lg mb-1.5 mx-auto w-full"
                          style={{ background: miniBg }}
                        />
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wide leading-tight block ${
                            active ? 'text-gold' : 'text-neutral-500'
                          }`}
                        >
                          {templateLabel(tpl)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-center py-1">
                  <ShareCardCanvas
                    ref={cardRef}
                    template={selectedTemplate}
                    config={config}
                    coupleNames={coupleNames}
                    guestName={guestName}
                    t={t}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleShareWhatsApp}
                    disabled={isCapturing}
                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all active:scale-95 shadow-lg shadow-green-500/20 disabled:opacity-50"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {isCapturing
                        ? t.generatingCard || 'Preparing card...'
                        : t.shareOnWhatsApp || 'Share on WhatsApp'}
                    </span>
                  </button>

                  <button
                    onClick={handleDownload}
                    disabled={isCapturing}
                    className="w-full py-4 bg-gold text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-gold/90 transition-all active:scale-95 shadow-xl shadow-gold/20 disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {t.generateCard || 'Save Card Image'}
                    </span>
                  </button>

                  {isDownloaded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-center">
                        <p className="text-xs text-green-600 font-bold uppercase tracking-widest mb-1">
                          {t.cardSaved || 'Card ready!'}
                        </p>
                        <p className="text-[11px] text-green-600/70 italic leading-relaxed">
                          {t.shareWhatsAppHintShort ||
                            'On phone: use Share on WhatsApp for image + link. On desktop: attach the saved image in WhatsApp.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={handleShareWhatsApp}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-neutral-100 hover:border-gold/20"
                        >
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                          <span className="text-[10px] font-bold uppercase text-neutral-400">
                            {t.whatsapp || 'WhatsApp'}
                          </span>
                        </button>
                        <button
                          onClick={handleShareGeneric}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-neutral-100 hover:border-gold/20"
                        >
                          <Share2 className="w-5 h-5 text-gold" />
                          <span className="text-[10px] font-bold uppercase text-neutral-400">
                            {t.shareMore || 'More apps'}
                          </span>
                        </button>
                        <button
                          onClick={handleCopy}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-neutral-100 hover:border-gold/20"
                        >
                          <Copy className="w-5 h-5 text-gold" />
                          <span className="text-[10px] font-bold uppercase text-neutral-400">
                            {t.copyCaption || 'Copy text'}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <p className="text-[11px] text-neutral-400 text-center italic font-medium px-2 leading-relaxed">
                    {t.getCardMessage ||
                      'Pick a style, then share — your card image and invitation link go together.'}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-gold/10 flex flex-col items-center gap-2">
                <button
                  onClick={handleCopyLinkOnly}
                  className="px-6 py-2 bg-neutral-50 text-neutral-500 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-100 transition-all active:scale-95 border border-neutral-100"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {t.linkCopied || 'Copied'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {t.getWebLink || 'Copy invitation link'}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-[9px] text-neutral-400 text-center break-all max-w-full px-2">
                  {invitationLink}
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-neutral-400 leading-relaxed italic">
                "{t.sharedHappiness || 'Shared happiness is double happiness.'}" <br />
                {t.thankYouPart || 'Thank you for being a part of our celebration!'}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuestShareTool;
