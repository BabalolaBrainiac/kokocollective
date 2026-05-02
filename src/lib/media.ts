/**
 * Koko Kollective — R2 Media Assets
 *
 * Base CDN: https://cdn.babalola.dev/uploads/kokokollective
 * Bucket:   babalola-uploads/uploads/kokokollective/
 * Uploaded: 28 Apr 2026
 */

const CDN_BASE = 'https://cdn.babalola.dev/uploads/kokokollective'

export type GalleryImage = { src: string; alt: string; caption?: string }
export type VideoAsset   = { src: string; poster?: string; caption?: string }

/**
 * All 12 images uploaded to R2 — used across gallery, carousel, and event cards.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: `${CDN_BASE}/1777355473239-img_1803.jpeg`,
    alt: 'Koko Kollective community event',
    caption: 'Creative energy in the room',
  },
  {
    src: `${CDN_BASE}/1777355477623-img_1804.jpeg`,
    alt: 'Koko Kollective paint & sip session',
    caption: 'Paint & Sip vibes',
  },
  {
    src: `${CDN_BASE}/1777360951933-img_5537.jpeg`,
    alt: 'Koko Kollective attendees enjoying the event',
    caption: 'Community connection',
  },
  {
    src: `${CDN_BASE}/1777360959181-img_5538.jpeg`,
    alt: 'Koko Kollective social gathering',
    caption: 'Moments to remember',
  },
  {
    src: `${CDN_BASE}/1777360967291-img_5541.jpeg`,
    alt: 'Koko Kollective creative workshop',
    caption: 'Creativity unleashed',
  },
  {
    src: `${CDN_BASE}/1777360975757-img_5540.jpeg`,
    alt: 'Koko Kollective event experience',
    caption: 'Authentic connections',
  },
  {
    src: `${CDN_BASE}/1777360982063-img_5533.jpeg`,
    alt: 'Koko Kollective community moment',
    caption: 'Good vibes only',
  },
  {
    src: `${CDN_BASE}/1777360987835-img_5534.jpeg`,
    alt: 'Koko Kollective art session',
    caption: 'Art & community',
  },
  {
    src: `${CDN_BASE}/1777360997432-img_5532.jpeg`,
    alt: 'Koko Kollective event attendees',
    caption: 'Real people, real joy',
  },
  {
    src: `${CDN_BASE}/1777361002669-img_5531.jpeg`,
    alt: 'Koko Kollective social experience',
    caption: 'Safe space, real space',
  },
  {
    src: `${CDN_BASE}/1777361007519-img_5530.jpeg`,
    alt: 'Koko Kollective event highlights',
    caption: 'Always a good time',
  },
  {
    src: `${CDN_BASE}/1777361014254-img_5528.jpeg`,
    alt: 'Koko Kollective community gathering',
    caption: 'BIPOC joy in every frame',
  },
]

/**
 * Hero carousel — first 6 images used on the homepage slideshow.
 */
export const heroImages = galleryImages.slice(0, 6)

/**
 * Featured event image — used on the Eventbrite event card.
 */
export const featuredEventImage = galleryImages[0].src

/**
 * 3 video assets uploaded to R2.
 * Poster images use the first gallery image as a thumbnail placeholder.
 */
export const videos: VideoAsset[] = [
  {
    src: `${CDN_BASE}/1777361020764-img_5523.mp4`,
    poster: galleryImages[4].src,
    caption: 'Koko Kollective — event highlights',
  },
  {
    src: `${CDN_BASE}/1777361042581-img_5507.mp4`,
    poster: galleryImages[6].src,
    caption: 'Community in motion',
  },
  {
    src: `${CDN_BASE}/1777361066159-img_5519.mp4`,
    poster: galleryImages[8].src,
    caption: 'Real moments, real people',
  },
]

export const CDN_URL = CDN_BASE

