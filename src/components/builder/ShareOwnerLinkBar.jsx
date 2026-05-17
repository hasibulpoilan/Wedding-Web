import React, { useMemo } from 'react';
import { Copy } from 'lucide-react';
import { buildOwnerSetupLink } from '../../lib/guestInvites';
import GuestLinkShareIcons from './GuestLinkShareIcons';

const ShareOwnerLinkBar = ({ config }) => {
  const link = useMemo(
    () => buildOwnerSetupLink(config, { lang: config.language }),
    [config]
  );

  const coupleLabel = `${config.couple.name1} & ${config.couple.name2}`;
  const shareMessage = `Hi ${coupleLabel}! Here is your private link to customize and manage your wedding invitation builder. Open: ${link}`;

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert('Owner builder link copied. Send this to the couple — not a guest invite link.');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex-1 w-full truncate font-mono text-[10px] text-neutral-300 px-4">{link}</div>
        <div className="flex items-center gap-2 shrink-0">
          <GuestLinkShareIcons
            shareLink={link}
            coupleLabel={coupleLabel}
            shareMessage={shareMessage}
          />
          <button
            type="button"
            onClick={copyLink}
            className="px-4 py-2.5 bg-gold text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Owner Link
          </button>
        </div>
      </div>
      <p className="text-[9px] text-neutral-500 italic leading-relaxed">
        The couple opens this link to edit the invitation and invite guests. Never share your admin URL
        (<span className="font-mono text-neutral-400">?role=admin</span>).
      </p>
    </div>
  );
};

export default ShareOwnerLinkBar;
