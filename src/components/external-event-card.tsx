'use client'

import { ExternalLink, Calendar, MapPin, Tag } from 'lucide-react'
import Image from 'next/image'

interface ExternalEventCardProps {
  title: string
  description: string
  date: string
  location: string
  price: string
  category: string
  eventbriteUrl: string
  imageUrl?: string
}

export function ExternalEventCard({
  title,
  description,
  date,
  location,
  price,
  category,
  eventbriteUrl,
  imageUrl,
}: ExternalEventCardProps) {
  return (
    <article className="card group">
      {/* image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-terracotta/20 via-sage-green/20 to-mocha-brown/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-terracotta/20 flex items-center justify-center">
                <Calendar size={28} className="text-terracotta" />
              </div>
              <span className="text-soft-brown/60 dark:text-warm-beige/60 text-sm">Event</span>
            </div>
          </div>
        )}

        {/* category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-cream/90 dark:bg-dark-cream/90 backdrop-blur-sm text-xs font-medium text-soft-brown dark:text-warm-beige">
            {category}
          </span>
        </div>

        {/* price badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-terracotta text-white text-xs font-medium">
            {price}
          </span>
        </div>

        {/* eventbrite badge */}
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 rounded-full bg-[#F6682F] text-white text-xs font-medium">
            Eventbrite
          </span>
        </div>
      </div>

      {/* content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-soft-brown/60 dark:text-warm-beige/60 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="truncate max-w-[120px]">{location}</span>
          </div>
        </div>

        <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-soft-brown/50 dark:text-warm-beige/50">
            <Tag size={12} />
            <span>{category}</span>
          </div>

          <a
            href={eventbriteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-terracotta text-white text-sm font-medium hover:bg-terracotta/90 transition-colors"
            id="eventbrite-link-mind-the-crown"
          >
            Get Tickets
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  )
}
