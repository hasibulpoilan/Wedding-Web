import { resolveInvitedEventIds, getEnabledEvents } from './guestInvites';

/**
 * Builds a clean guest invitation URL (no admin/setup params).
 */
export function buildGuestInvitationLink(config, guestName, options = {}) {
  const origin = window.location.origin;
  const params = new URLSearchParams();

  const weddingId = config?.weddingId || new URLSearchParams(window.location.search).get('id');
  if (weddingId) params.set('id', weddingId);

  params.set('mode', 'guest');

  const currentGuest = new URLSearchParams(window.location.search).get('guest');
  const name = guestName || currentGuest;
  if (name && name !== 'Our Special Guest') {
    params.set('guest', name);
  }

  const eventsParam =
    options.eventsParam ?? new URLSearchParams(window.location.search).get('events');
  const invitedIds = resolveInvitedEventIds(config, {
    guestName: name,
    eventsParam,
  });
  const enabledIds = getEnabledEvents(config).map((e) => e.id);
  if (invitedIds.length > 0 && invitedIds.length < enabledIds.length) {
    params.set('events', invitedIds.join(','));
  }

  const lang =
    options.lang ??
    new URLSearchParams(window.location.search).get('lang') ??
    config?.language;
  if (lang) params.set('lang', lang);

  return `${origin}/?${params.toString()}`;
}

/**
 * Plain-text share message (no emoji — avoids WhatsApp encoding issues).
 */
export function buildCardShareMessage({ templateLabel, coupleNames, invitationLink, t }) {
  const joinLine =
    t?.shareJoinLine?.replace('{couple}', coupleNames) ||
    `You are invited to celebrate with ${coupleNames}!`;

  const eventLine = templateLabel
    ? `${templateLabel} — ${coupleNames}`
    : joinLine;

  return `${eventLine}\n\n${t?.shareViewInvite || 'View our digital invitation'}:\n${invitationLink}`;
}
