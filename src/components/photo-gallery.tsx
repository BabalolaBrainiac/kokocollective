'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface PhotoGalleryProps {
  images: GalleryImage[]
  title?: string
  subtitle?: string
}

export function PhotoGallery({ images, title, subtitle }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1)
  }

  const next = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1)
  }

  if (!images.length) return null

  return (
    <div>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {subtitle && (
            <span className="text-terracotta text-sm font-medium uppercase tracking-wider">{subtitle}</span>
          )}
          {title && (
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-mocha-brown dark:text-warm-beige mt-3">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* masonry-style grid */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4" id="photo-gallery">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => openLightbox(i)}
          >
            <div className="relative">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* hover overlay */}
              <div className="absolute inset-0 bg-mocha-brown/0 group-hover:bg-mocha-brown/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-mocha-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            {img.caption && (
              <div className="px-2 py-2 bg-cream dark:bg-dark-cream">
                <p className="text-xs text-soft-brown/70 dark:text-warm-beige/70">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            id="lightbox-close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          <button
            id="lightbox-prev"
            className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              sizes="90vw"
            />
            {images[lightboxIndex].caption && (
              <p className="text-center text-white/70 text-sm mt-3">{images[lightboxIndex].caption}</p>
            )}
          </div>

          <button
            id="lightbox-next"
            className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
