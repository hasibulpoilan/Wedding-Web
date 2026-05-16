import React, { useMemo, useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { buildGuestInviteLink, rememberLastGuestInvite } from '../../lib/guestInvites';
import GuestLinkShareIcons from './GuestLinkShareIcons';

const ShareGuestLinkBar = ({ config }) => {
  const guests = config.guests || [];
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    if (guests.length && !guests.find((g) => g.id === selectedId)) {
      setSelectedId(guests[0].id);
    }
  }, [guests, selectedId]);

  const selectedGuest = guests.find((g) => g.id === selectedId);

  const link = useMemo(() => {
    if (selectedGuest) {
      return buildGuestInviteLink(config, {
        guestName: selectedGuest.name,
        invitedEventIds: selectedGuest.invitedEvents,
        lang: config.language,
      });
    }
    return buildGuestInviteLink(config, { lang: config.language });
  }, [config, selectedGuest]);

  const copyLink = () => {
    if (selectedGuest) {
      rememberLastGuestInvite({
        guestName: selectedGuest.name,
        invitedEventIds: selectedGuest.invitedEvents,
        lang: config.language,
        weddingId: config.weddingId,
      });
    }
    navigator.clipboard.writeText(link);
    alert(
      selectedGuest
        ? `Personalized link copied for ${selectedGuest.name}`
        : 'Guest link copied (all programs — pick a guest above for custom invites)'
    );
  };

  return (
    <div className="space-y-3">
      {guests.length > 0 && (
        <div>
          <label className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">
            Share link for guest
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-[11px] text-neutral-200 outline-none focus:ring-2 focus:ring-gold/30"
          >
            {guests.map((g) => (
              <option key={g.id} value={g.id} className="text-neutral-900">
                {g.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex-1 w-full truncate font-mono text-[10px] text-neutral-300 px-4">{link}</div>
        <div className="flex items-center gap-2 shrink-0">
          <GuestLinkShareIcons shareLink={link} coupleLabel={`${config.couple.name1} & ${config.couple.name2}`} />
          <button
            type="button"
            onClick={copyLink}
            className="px-4 py-2.5 bg-gold text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Guest Link
          </button>
        </div>
      </div>
      {!guests.length && (
        <p className="text-[9px] text-neutral-500 italic">
          Add guests in Personalized Guest Invites above to copy links with specific programs.
        </p>
      )}
    </div>
  );
};

export default ShareGuestLinkBar;
