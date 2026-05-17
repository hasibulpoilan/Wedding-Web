export function getEnabledEvents(config) {
  return (config?.events || []).filter((e) => e.enabled !== false);
}

export function normalizeGuestName(name) {
  return (name || '').trim().toLowerCase();
}

export function findGuestRecord(config, guestName) {
  const norm = normalizeGuestName(guestName);
  if (!norm || norm === 'our special guest') return null;
  return (config?.guests || []).find((g) => normalizeGuestName(g.name) === norm);
}

export function parseEventsParam(param) {
  if (!param) return null;
  return param
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Which event ids this guest may see / RSVP for.
 * Priority: URL ?events= → saved guest record → all enabled events.
 */
export function resolveInvitedEventIds(config, { guestName, eventsParam } = {}) {
  const enabled = getEnabledEvents(config);
  const enabledIds = enabled.map((e) => e.id);

  const fromUrl = parseEventsParam(eventsParam);
  if (fromUrl?.length) {
    const matched = fromUrl.filter((id) => enabledIds.includes(id));
    if (matched.length) return matched;
  }

  const record = findGuestRecord(config, guestName);
  if (record?.invitedEvents?.length) {
    return record.invitedEvents.filter((id) => enabledIds.includes(id));
  }

  return enabledIds;
}

export function filterEventsByInvite(config, invitedIds) {
  const enabled = getEnabledEvents(config);
  if (!invitedIds?.length) return [];
  const allIds = enabled.map((e) => e.id);
  if (invitedIds.length >= allIds.length) {
    const set = new Set(invitedIds);
    const filtered = enabled.filter((e) => set.has(e.id));
    return filtered.length ? filtered : enabled;
  }
  const set = new Set(invitedIds);
  return enabled.filter((e) => set.has(e.id));
}

export function isRestrictedInvite(config, invitedIds) {
  const enabledCount = getEnabledEvents(config).length;
  return (
    invitedIds?.length > 0 &&
    invitedIds.length < enabledCount
  );
}

const LAST_INVITE_KEY = 'wedding_last_guest_invite';

export function rememberLastGuestInvite({ guestName, invitedEventIds, lang, weddingId }) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(
      LAST_INVITE_KEY,
      JSON.stringify({ guestName, invitedEventIds, lang, weddingId })
    );
  } catch {
    /* ignore */
  }
}

export function getLastGuestInvite() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(LAST_INVITE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function readGuestInviteFromUrl(config) {
  if (typeof window === 'undefined') {
    return { guestName: config?.guestName || '', eventsParam: null };
  }
  const params = new URLSearchParams(window.location.search);
  let guestName = config?.guestName || '';
  const guest = params.get('guest');
  if (guest === 'Our Special Guest') {
    guestName = 'Our Special Guest';
  } else if (guest) {
    guestName = guest;
  }
  return { guestName, eventsParam: params.get('events') };
}

export function applyGuestInviteToUrl(config, { guestName, invitedEventIds, lang } = {}) {
  if (typeof window === 'undefined') return;
  const link = buildGuestInviteLink(config, { guestName, invitedEventIds, lang });
  const query = link.split('?')[1] || '';
  const path = window.location.pathname || '/';
  window.history.replaceState(null, '', query ? `${path}?${query}` : path);
}

export function getInvitedEventTitles(config, invitedIds, separator = ', ') {
  return filterEventsByInvite(config, invitedIds)
    .map((e) => e.title)
    .join(separator);
}

/**
 * Builder link for the couple (owner). No mode=guest, no role=admin.
 */
export function buildOwnerSetupLink(config, { lang } = {}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams();

  const weddingId =
    config?.weddingId ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('id')
      : null);
  if (weddingId) params.set('id', weddingId);

  const language =
    lang ||
    config?.language ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('lang')
      : null);
  if (language) params.set('lang', language);

  const query = params.toString();
  return query ? `${origin}/?${query}` : `${origin}/`;
}

export function buildGuestInviteLink(config, { guestName, invitedEventIds, lang } = {}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams();

  const weddingId =
    config?.weddingId ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('id')
      : null);
  if (weddingId) params.set('id', weddingId);

  params.set('mode', 'guest');

  if (guestName && guestName !== 'Our Special Guest') {
    params.set('guest', guestName);
  }

  const enabledIds = getEnabledEvents(config).map((e) => e.id);
  const ids =
    invitedEventIds?.length > 0
      ? invitedEventIds.filter((id) => enabledIds.includes(id))
      : enabledIds;

  if (ids.length > 0 && ids.length < enabledIds.length) {
    params.set('events', ids.join(','));
  }

  const language =
    lang ||
    config?.language ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('lang')
      : null);
  if (language) params.set('lang', language);

  return `${origin}/?${params.toString()}`;
}

export function upsertGuestRecord(guests, { name, invitedEvents }) {
  const norm = normalizeGuestName(name);
  if (!norm) return guests;

  const next = [...(guests || [])];
  const idx = next.findIndex((g) => normalizeGuestName(g.name) === norm);
  const record = { id: norm.replace(/\s+/g, '-'), name: name.trim(), invitedEvents };

  if (idx >= 0) next[idx] = { ...next[idx], ...record };
  else next.push(record);

  return next;
}
