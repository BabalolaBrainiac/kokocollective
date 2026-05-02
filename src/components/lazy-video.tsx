'use client'

import { useRef, useEffect, useState } from 'react'

interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function LazyVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          // Once it's in view, we can stop observing
          if (containerRef.current) {
            observer.unobserve(containerRef.current)
          }
        }
      },
      { rootMargin: '200px' } // Start loading slightly before it comes into view
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full h-full bg-mocha-brown/10 ${className}`}>
      {/* Show poster image as a fallback background until video loads */}
      {poster && !inView && (
        <img 
          src={poster} 
          alt="Video thumbnail" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      )}
      
      {inView && (
        <video
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
