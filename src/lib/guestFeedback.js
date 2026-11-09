import { supabase } from './supabase';

const WISHES_STORAGE_KEY = (weddingId) => `wedding_wishes_${weddingId}`;
const RSVP_STORAGE_KEY = (weddingId) => `wedding_rsvps_${weddingId}`;

/**
 * Submit a wish from a guest
 */
export async function submitGuestWish({ weddingId, guestName, message, emoji = '❤️', image = null }) {
  const wish = {
    id: `wish_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    wedding_id: weddingId,
    guest_name: guestName || 'Anonymous Guest',
    message,
    emoji,
    image,
    created_at: new Date().toISOString(),
  };

  // 1. Try Supabase
  try {
    const { data, error } = await supabase.from('guest_wishes').insert([wish]).select();
    if (!error && data) return { success: true, wish: data[0] };
  } catch (err) {
    console.warn('Supabase insert wish fallback to local:', err);
  }

  // 2. Fallback to LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY(weddingId)) || '[]');
    existing.unshift(wish);
    localStorage.setItem(WISHES_STORAGE_KEY(weddingId), JSON.stringify(existing));
    return { success: true, wish };
  } catch (err) {
    console.error('Failed to save wish locally:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch wishes:
 * If guestName is provided, returns wishes belonging to that guest.
 * If isOwner is true, returns all wishes for the wedding.
 */
export async function fetchGuestWishes({ weddingId, guestName, isOwner = false }) {
  let wishes = [];

  // 1. Try Supabase
  try {
    let query = supabase.from('guest_wishes').select('*').eq('wedding_id', weddingId).order('created_at', { ascending: false });
    if (!isOwner && guestName) {
      query = query.ilike('guest_name', guestName);
    }
    const { data, error } = await query;
    if (!error && data && data.length) {
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch wishes fallback:', err);
  }

  // 2. Fallback to LocalStorage
  try {
    const raw = localStorage.getItem(WISHES_STORAGE_KEY(weddingId));
    if (raw) {
      const all = JSON.parse(raw);
      if (isOwner) return all;
      if (guestName) {
        return all.filter((w) => (w.guest_name || '').toLowerCase() === guestName.toLowerCase());
      }
      return [];
    }
  } catch (e) {
    console.error(e);
  }

  return wishes;
}

/**
 * Submit an RSVP
 */
export async function submitGuestRSVP({ weddingId, guestName, responses }) {
  const rsvp = {
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    wedding_id: weddingId,
    guest_name: guestName,
    responses, // e.g. { nikah: 'attending', reception: 'declined' }
    created_at: new Date().toISOString(),
  };

  // 1. Try Supabase
  try {
    const { data, error } = await supabase.from('guest_rsvps').upsert([rsvp], { onConflict: 'wedding_id,guest_name' }).select();
    if (!error && data) return { success: true, rsvp: data[0] };
  } catch (err) {
    console.warn('Supabase insert rsvp fallback to local:', err);
  }

  // 2. Fallback to LocalStorage
  try {
    const key = RSVP_STORAGE_KEY(weddingId);
    let existing = JSON.parse(localStorage.getItem(key) || '[]');
    // Upsert by guest_name
    existing = existing.filter((r) => (r.guest_name || '').toLowerCase() !== (guestName || '').toLowerCase());
    existing.unshift(rsvp);
    localStorage.setItem(key, JSON.stringify(existing));
    return { success: true, rsvp };
  } catch (err) {
    console.error('Failed to save RSVP locally:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch RSVPs (for Client / Owner Dashboard)
 */
export async function fetchGuestRSVPs({ weddingId }) {
  // 1. Try Supabase
  try {
    const { data, error } = await supabase.from('guest_rsvps').select('*').eq('wedding_id', weddingId).order('created_at', { ascending: false });
    if (!error && data && data.length) return data;
  } catch (err) {
    console.warn('Supabase fetch RSVPs fallback:', err);
  }

  // 2. Fallback to LocalStorage
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY(weddingId));
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }

  return [];
}
