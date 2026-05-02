import { Suspense } from 'react'
import { getEvents } from '@/lib/supabase'
import { EventCard } from '@/components/event-card'
import { ExternalEventCard } from '@/components/external-event-card'
import { EventsFilter } from '@/components/events-filter'
import { featuredEventImage } from '@/lib/media'

export const metadata = {
  title: 'Events | Koko Kollective',
  description: 'Discover curated social gatherings, paint & sip sessions, creative workshops and themed events for BIPOC communities.',
}

export default async function EventsPage() {
  const events = await getEvents()

  // get unique categories
  const categories = Array.from(new Set(events.map(e => e.category)))

  return (
    <>
      {/* page header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-terracotta text-sm font-medium uppercase tracking-wider">Discover</span>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-mocha-brown dark:text-warm-beige mt-3 mb-4">
            Upcoming Events
          </h1>
          <p className="text-soft-brown/70 dark:text-warm-beige/70 max-w-2xl mx-auto">
            Join us for curated experiences designed to foster connection, 
            creativity, and community. All events are welcoming spaces for BIPOC individuals and allies.
          </p>
        </div>
      </section>

      {/* eventbrite events — externally ticketed */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-terracotta text-sm font-medium uppercase tracking-wider">Ticketed</span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-mocha-brown dark:text-warm-beige mt-1">
                On Eventbrite
              </h2>
            </div>
            <a
              href="https://www.eventbrite.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-soft-brown/60 dark:text-warm-beige/60 hover:text-terracotta transition-colors"
            >
              View on Eventbrite
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="eventbrite-events-grid">
            <ExternalEventCard
              title="MIND THE CROWN (Yoga & Paint Mini Retreat)"
              description="A wellness experience blending movement, creativity, and Afro-diaspora culture. Ground, connect & reset with a yoga session, sound therapy, and an Afrobeat paint session. Centring BIPOC communities while welcoming all."
              date="Sun, 24 May • 8:00 AM"
              location="Pocket cafe bar, 98 Paradise Street, Liverpool L1 4AA"
              price="£11.55 - £50"
              category="Wellness & Creativity"
              eventbriteUrl="https://www.eventbrite.co.uk/e/mind-the-crown-yoga-paint-mini-retreat-tickets-1985651293471?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=wsa&aff=ebdsshwebmobile"
              imageUrl={featuredEventImage}
            />
          </div>
        </div>
      </section>

      {/* events grid — from database */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 bg-warm-beige/30 dark:bg-dark-warm-beige/30 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-terracotta text-sm font-medium uppercase tracking-wider">All Events</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-mocha-brown dark:text-warm-beige mt-1">
              Community Calendar
            </h2>
          </div>
          <Suspense fallback={<EventsSkeleton />}>
            <EventsContent events={events} categories={categories} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

function EventsContent({ 
  events, 
  categories 
}: { 
  events: Awaited<ReturnType<typeof getEvents>>
  categories: string[] 
}) {
  return (
    <>
      {/* filters */}
      <EventsFilter categories={categories} />

      {/* events grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warm-beige dark:bg-dark-warm-beige flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-soft-brown/40 dark:text-warm-beige/40" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-mocha-brown dark:text-warm-beige mb-2">
            No events yet
          </h3>
          <p className="text-soft-brown/60 dark:text-warm-beige/60 max-w-md mx-auto">
            We&apos;re planning something special. Follow us on Instagram to be the 
            first to know when new events are announced.
          </p>
          <a
            href="https://www.instagram.com/kokokollectiveuk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Follow on Instagram
          </a>
        </div>
      )}
    </>
  )
}

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="aspect-[16/10] bg-warm-beige dark:bg-dark-warm-beige" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-warm-beige dark:bg-dark-warm-beige rounded w-1/3" />
            <div className="h-6 bg-warm-beige dark:bg-dark-warm-beige rounded w-3/4" />
            <div className="h-4 bg-warm-beige dark:bg-dark-warm-beige rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
