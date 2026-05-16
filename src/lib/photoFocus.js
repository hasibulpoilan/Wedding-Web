export const DEFAULT_PHOTO_FOCUS = { x: 50, y: 50, scale: 1 };

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function normalizePhotoFocus(f) {
  if (!f || typeof f !== 'object') return { ...DEFAULT_PHOTO_FOCUS };
  return {
    x: clamp(Number(f.x) ?? 50, 0, 100),
    y: clamp(Number(f.y) ?? 50, 0, 100),
    scale: clamp(Number(f.scale) ?? 1, 1, 3),
  };
}

export function getPhotoFocus(config) {
  return normalizePhotoFocus(config?.couple?.photoFocus);
}

export function getPhotoFocusImageStyle(focus) {
  const { x, y, scale } = normalizePhotoFocus(focus);
  return {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${scale})`,
    transformOrigin: `${x}% ${y}%`,
  };
}
