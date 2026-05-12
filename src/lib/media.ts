/**
 * Koko Kollective — R2 Media Assets
 *
 * Base CDN: https://cdn.babalola.dev/uploads/kokokollective
 * Bucket:   babalola-uploads/uploads/kokokollective/
 *
 * Each slot maps to a fixed R2 filename. Uploading via the admin
 * Media Manager overwrites the file at that path. The CDN URL stays
 * constant so all site references update automatically.
 */

const CDN_BASE = 'https://cdn.babalola.dev/uploads/kokokollective'

export type GalleryImage = { src: string; alt: string; caption?: string }
export type VideoAsset = { src: string; poster?: string; caption?: string }

export type MediaSlot = {
  key: string
  filename: string
  label: string
  section: string
  type: 'image' | 'video'
}

export const SITE_MEDIA_SLOTS: MediaSlot[] = [
  { key: 'hero_bg_video',     filename: '1777361066159-img_5519.mp4',   label: 'Hero Background Video',   section: 'Homepage Hero',      type: 'video' },
  { key: 'carousel_1',        filename: '1777355473239-img_1803.jpeg',  label: 'Community Carousel 1',     section: 'Our Community',      type: 'image' },
  { key: 'carousel_2',        filename: '1777355477623-img_1804.jpeg',  label: 'Community Carousel 2',     section: 'Our Community',      type: 'image' },
  { key: 'carousel_3',        filename: '1777360951933-img_5537.jpeg',  label: 'Community Carousel 3',     section: 'Our Community',      type: 'image' },
  { key: 'carousel_4',        filename: '1777360959181-img_5538.jpeg',  label: 'Community Carousel 4',     section: 'Our Community',      type: 'image' },
  { key: 'carousel_5',        filename: '1777360967291-img_5541.jpeg',  label: 'Community Carousel 5',     section: 'Our Community',      type: 'image' },
  { key: 'carousel_6',        filename: '1777360975757-img_5540.jpeg',  label: 'Community Carousel 6',     section: 'Our Community',      type: 'image' },
  { key: 'community_video_1', filename: '1777361020764-img_5523.mp4',   label: 'Community Video 1',        section: 'Community Videos',   type: 'video' },
  { key: 'community_video_2', filename: '1777361042581-img_5507.mp4',   label: 'Community Video 2',        section: 'Community Videos',   type: 'video' },
  { key: 'community_video_3', filename: '1777361066159-img_5519.mp4',   label: 'Community Video 3',        section: 'Community Videos',   type: 'video' },
  { key: 'gallery_1',         filename: '1777355473239-img_1803.jpeg',  label: 'Gallery Image 1',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_2',         filename: '1777355477623-img_1804.jpeg',  label: 'Gallery Image 2',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_3',         filename: '1777360951933-img_5537.jpeg',  label: 'Gallery Image 3',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_4',         filename: '1777360959181-img_5538.jpeg',  label: 'Gallery Image 4',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_5',         filename: '1777360967291-img_5541.jpeg',  label: 'Gallery Image 5',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_6',         filename: '1777360975757-img_5540.jpeg',  label: 'Gallery Image 6',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_7',         filename: '1777360982063-img_5533.jpeg',  label: 'Gallery Image 7',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_8',         filename: '1777360987835-img_5534.jpeg',  label: 'Gallery Image 8',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_9',         filename: '1777360997432-img_5532.jpeg',  label: 'Gallery Image 9',          section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_10',        filename: '1777361002669-img_5531.jpeg',  label: 'Gallery Image 10',         section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_11',        filename: '1777361007519-img_5530.jpeg',  label: 'Gallery Image 11',         section: 'About Page Gallery', type: 'image' },
  { key: 'gallery_12',        filename: '1777361014254-img_5528.jpeg',  label: 'Gallery Image 12',         section: 'About Page Gallery', type: 'image' },
]

export function getSlotByKey(key: string): MediaSlot | undefined {
  return SITE_MEDIA_SLOTS.find(s => s.key === key)
}

/**
 * All 12 images uploaded to R2 — used across gallery, carousel, and event cards.
 */
export const galleryImages: GalleryImage[] = SITE_MEDIA_SLOTS
  .filter(s => s.section === 'About Page Gallery')
  .map((s, i) => ({
    src: `${CDN_BASE}/${s.filename}`,
    alt: `Koko Kollective photo ${i + 1}`,
    caption: `Gallery image ${i + 1}`,
  }))

/**
 * Hero carousel — first 6 images used on the homepage slideshow.
 */
export const heroImages: GalleryImage[] = SITE_MEDIA_SLOTS
  .filter(s => s.section === 'Our Community')
  .map((s, i) => ({
    src: `${CDN_BASE}/${s.filename}`,
    alt: `Koko Kollective community moment ${i + 1}`,
    caption: `Carousel image ${i + 1}`,
  }))

/**
 * Featured event image — used on the Eventbrite event card.
 */
export const featuredEventImage: string = `${CDN_BASE}/${SITE_MEDIA_SLOTS[0].filename}`

/**
 * 3 video assets uploaded to R2.
 */
export const videos: VideoAsset[] = SITE_MEDIA_SLOTS
  .filter(s => s.section === 'Community Videos')
  .map((s, i) => ({
    src: `${CDN_BASE}/${s.filename}`,
    poster: galleryImages[i * 4]?.src || galleryImages[0].src,
    caption: `Community video ${i + 1}`,
  }))
  .slice(0, 3)

export const CDN_URL = CDN_BASE
