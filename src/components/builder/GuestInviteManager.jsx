import React, { useState } from 'react';
import { Sparkles, Copy, Plus, Trash2 } from 'lucide-react';
import {
  buildGuestInviteLink,
  getEnabledEvents,
  upsertGuestRecord,
  rememberLastGuestInvite,
} from '../../lib/guestInvites';

const storeInviteForPreview = (config, guestName, invitedEventIds, lang) => {
  rememberLastGuestInvite({
    guestName,
    invitedEventIds,
    lang,
    weddingId: config.weddingId,
  });
};

const GuestInviteManager = ({ config, updateConfig }) => {
  const enabledEvents = getEnabledEvents(config);
  const [draftName, setDraftName] = useState('');
  const [draftLang, setDraftLang] = useState(config.language || 'en');
  const [draftEvents, setDraftEvents] = useState(() => enabledEvents.map((e) => e.id));

  const toggleDraftEvent = (eventId) => {
    setDraftEvents((prev) => {
      if (prev.includes(eventId)) {
        const next = prev.filter((id) => id !== eventId);
        return next.length ? next : prev;
      }
      return [...prev, eventId];
    });
  };

  const saveGuestAndCopyLink = () => {
    if (!draftName.trim()) {
      alert('Please enter a guest name.');
      return;
    }
    if (!draftEvents.length) {
      alert('Select at least one event for this guest.');
      return;
    }

    const guests = upsertGuestRecord(config.guests, {
      name: draftName.trim(),
      invitedEvents: draftEvents,
    });
    updateConfig('guests', guests);

    const guestName = draftName.trim();
    storeInviteForPreview(config, guestName, draftEvents, draftLang);
    const link = buildGuestInviteLink(config, {
      guestName,
      invitedEventIds: draftEvents,
      lang: draftLang,
    });
    navigator.clipboard.writeText(link);
    alert(`Saved & link copied for "${draftName.trim()}"`);
  };

  const copyLinkForGuest = (guest) => {
    storeInviteForPreview(config, guest.name, guest.invitedEvents, config.language);
    const link = buildGuestInviteLink(config, {
      guestName: guest.name,
      invitedEventIds: guest.invitedEvents,
      lang: config.language,
    });
    navigator.clipboard.writeText(link);
    alert(`Link copied for ${guest.name}`);
  };

  const removeGuest = (guestId) => {
    updateConfig(
      'guests',
      (config.guests || []).filter((g) => g.id !== guestId)
    );
  };

  return (
    <section className="col-span-1 md:col-span-2 space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gold/5">
      <h2 className="flex items-center gap-3 text-lg font-serif text-deep-green border-b border-gold/10 pb-4">
        <Sparkles className="w-5 h-5 text-gold" /> Personalized Guest Invites
      </h2>
      <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold leading-relaxed">
        Each guest sees only the programs you invite them to. RSVP matches those events.
      </p>

      <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">
              Guest name
            </label>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="w-full p-3 bg-white border border-neutral-100 rounded-xl focus:ring-2 focus:ring-gold/20 outline-none font-serif text-sm"
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">
              Link language
            </label>
            <select
              value={draftLang}
              onChange={(e) => setDraftLang(e.target.value)}
              className="w-full p-3 bg-white border border-neutral-100 rounded-xl focus:ring-2 focus:ring-gold/20 outline-none font-serif text-sm"
            >
              <option value="en">English</option>
              <option value="bn">Bengali</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold ml-1">
            Invite to programs
          </p>
          <div className="flex flex-wrap gap-2">
            {enabledEvents.map((event) => {
              const on = draftEvents.includes(event.id);
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => toggleDraftEvent(event.id)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide border transition-all ${
                    on
                      ? 'bg-gold text-white border-gold'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:border-gold/40'
                  }`}
                >
                  {event.title}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={saveGuestAndCopyLink}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Save guest & copy link
        </button>
      </div>

      {(config.guests || []).length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
            Saved guests ({config.guests.length})
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(config.guests || []).map((guest) => (
              <div
                key={guest.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-cream/40 border border-gold/10 rounded-xl"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-deep-green font-medium">{guest.name}</p>
                  <p className="text-[9px] text-neutral-400 mt-1 truncate">
                    {(guest.invitedEvents || [])
                      .map((id) => enabledEvents.find((e) => e.id === id)?.title || id)
                      .join(' · ')}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => copyLinkForGuest(guest)}
                    className="px-3 py-2 bg-gold/10 text-gold rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Link
                  </button>
                  <button
                    type="button"
                    onClick={() => removeGuest(guest.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                    aria-label="Remove guest"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[9px] text-neutral-400 italic">
        Link example: {buildGuestInviteLink(config, {
          guestName: 'Guest Name',
          invitedEventIds: ['haldi', 'wedding'],
          lang: 'en',
        })}
      </p>
    </section>
  );
};

export default GuestInviteManager;
