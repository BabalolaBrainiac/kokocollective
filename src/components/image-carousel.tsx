'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideImage {
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselProps {
  images: SlideImage[]
  autoPlayInterval?: number
  className?: string
}

export function ImageCarousel({ images, autoPlayInterval = 4500, className = '' }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const prev = useCallback(() => {
    goTo(current === 0 ? images.length - 1 : current - 1)
  }, [current, images.length, goTo])

  const next = useCallback(() => {
    goTo(current === images.length - 1 ? 0 : current + 1)
  }, [current, images.length, goTo])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(next, autoPlayInterval)
    return () => clearInterval(id)
  }, [next, autoPlayInterval, images.length])

  if (!images.length) return null

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* slides */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] bg-warm-beige dark:bg-dark-warm-beige">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={i === 0}
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* caption */}
            {img.caption && (
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="inline-block px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
                  {img.caption}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* controls */}
      {images.length > 1 && (
        <>
          <button
            id="carousel-prev"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            id="carousel-next"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
