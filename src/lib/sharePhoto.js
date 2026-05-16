const DEFAULT_SHARE_PHOTO = '/assets/premium-og-preview.png';

/**
 * Photo for share cards & previews: owner cover → first story → default.
 */
export function getSharePhoto(config) {
  if (config?.couple?.coverPhoto) return config.couple.coverPhoto;
  const storyImage = config?.stories?.find((s) => s?.image)?.image;
  if (storyImage) return storyImage;
  return DEFAULT_SHARE_PHOTO;
}
