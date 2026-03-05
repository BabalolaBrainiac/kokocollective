import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, MapPin, Users, ExternalLink, Ticket } from 'lucide-react'
import { getEventById } from '@/lib/supabase'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'

interface EventPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventPageProps) {
  const resolvedParams = await params
  const event = await getEventById(resolvedParams.id)

  if (!event) {
    return { title: 'Event Not Found | Koko Kollective' }
  }

  return {
    title: `${event.title} | Koko Kollective`,
    description: event.short_description,
    openGraph: {
      title: event.title,
      description: event.short_description,
      images: event.featured_image ? [event.featured_image] : [],
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const resolvedParams = await params
  const event = await getEventById(resolvedParams.id)

  if (!event) {
    notFound()
  }

  const isSoldOut = event.spots_remaining === 0

  return (
    <>
      {/* back button */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-soft-brown/70 dark:text-warm-beige/70 hover:text-terracotta transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to events</span>
          </Link>
        </div>
      </div>

      {/* event content */}
      <article className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* featured image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
            {event.featured_image ? (
              <Image
                src={event.featured_image}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-warm-beige dark:bg-dark-warm-beige flex items-center justify-center">
                <span className="text-soft-brown/40 dark:text-warm-beige/40">No image available</span>
              </div>
            )}
          </div>

          {/* header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-sage-green/20 text-muted-olive dark:text-sage-green text-sm font-medium">
                {event.category}
              </span>
              {isSoldOut && (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                  Sold Out
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-mocha-brown dark:text-warm-beige mb-4">
              {event.title}
            </h1>

            <p className="text-lg text-soft-brown/70 dark:text-warm-beige/70">
              {event.short_description}
            </p>
          </div>

          {/* event details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-beige/30 dark:bg-dark-warm-beige/30">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                <Calendar className="text-terracotta" size={20} />
              </div>
              <div>
                <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider">Date</p>
                <p className="font-medium text-mocha-brown dark:text-warm-beige">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-beige/30 dark:bg-dark-warm-beige/30">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                <Clock className="text-terracotta" size={20} />
              </div>
              <div>
                <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider">Time</p>
                <p className="font-medium text-mocha-brown dark:text-warm-beige">{formatTime(event.time)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-beige/30 dark:bg-dark-warm-beige/30">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                <MapPin className="text-terracotta" size={20} />
              </div>
              <div>
                <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider">Location</p>
                <p className="font-medium text-mocha-brown dark:text-warm-beige">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-beige/30 dark:bg-dark-warm-beige/30">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                <Users className="text-terracotta" size={20} />
              </div>
              <div>
                <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider">Availability</p>
                <p className="font-medium text-mocha-brown dark:text-warm-beige">
                  {event.spots_remaining} of {event.capacity} spots left
                </p>
              </div>
            </div>
          </div>

          {/* full description */}
          <div className="prose prose-stone dark:prose-invert max-w-none mb-10">
            <h2 className="font-serif text-2xl font-semibold text-mocha-brown dark:text-warm-beige mb-4">
              About This Event
            </h2>
            <div className="text-soft-brown/80 dark:text-warm-beige/80 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </div>
          </div>

          {/* address */}
          <div className="p-6 rounded-xl bg-warm-beige/30 dark:bg-dark-warm-beige/30 mb-10">
            <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-2">Address</h3>
            <p className="text-soft-brown/70 dark:text-warm-beige/70">{event.address}</p>
          </div>

          {/* gallery */}
          {event.gallery_images && event.gallery_images.length > 0 && (
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-semibold text-mocha-brown dark:text-warm-beige mb-6">
                Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.gallery_images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`${event.title} - image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ticket cta */}
          <div className="sticky bottom-4 bg-cream dark:bg-dark-cream rounded-2xl shadow-lg border border-warm-beige dark:border-dark-warm-beige p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-soft-brown/60 dark:text-warm-beige/60">Price</p>
                <p className="text-2xl font-serif font-semibold text-mocha-brown dark:text-warm-beige">
                  {event.price === 0 ? 'Free' : formatCurrency(event.price, event.currency)}
                </p>
              </div>

              {event.eventbrite_url ? (
                <a
                  href={event.eventbrite_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto ${isSoldOut ? 'btn-outline opacity-50 cursor-not-allowed' : 'btn-primary'}`}
                  onClick={(e) => isSoldOut && e.preventDefault()}
                >
                  {isSoldOut ? 'Sold Out' : 'Get Tickets'}
                  {!isSoldOut && <ExternalLink size={18} />}
                </a>
              ) : (
                <button disabled className="btn-outline opacity-50 cursor-not-allowed">
                  Tickets Coming Soon
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
