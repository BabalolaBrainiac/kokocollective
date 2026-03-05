'use client'

import Link from 'next/link'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Event } from '@/types'
import { formatDate, formatCurrency } from '@/lib/utils'

interface EventCardProps {
  event: Event
  featured?: boolean
}

export function EventCard({ event, featured = false }: EventCardProps) {
  return (
    <article className={`card group ${featured ? 'md:col-span-2' : ''}`}>
      {/* image */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
        {event.featured_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.featured_image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-warm-beige dark:bg-dark-warm-beige flex items-center justify-center">
            <span className="text-soft-brown/40 dark:text-warm-beige/40 text-sm">No image</span>
          </div>
        )}
        
        {/* category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-cream/90 dark:bg-dark-cream/90 backdrop-blur-sm text-xs font-medium text-soft-brown dark:text-warm-beige">
            {event.category}
          </span>
        </div>

        {/* price badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-terracotta text-white text-xs font-medium">
            {event.price === 0 ? 'Free' : formatCurrency(event.price, event.currency)}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-soft-brown/60 dark:text-warm-beige/60 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="truncate max-w-[120px]">{event.location}</span>
          </div>
        </div>

        <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2 group-hover:text-terracotta transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70 mb-4 line-clamp-2">
          {event.short_description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-soft-brown/50 dark:text-warm-beige/50">
            {event.spots_remaining} spots left
          </span>
          
          <Link
            href={`/events/${event.id}`}
            className="text-terracotta text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
