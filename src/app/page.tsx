import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Users, Palette } from 'lucide-react'
import { getFeaturedEvents } from '@/lib/supabase'
import { EventCard } from '@/components/event-card'
import { ExternalEventCard } from '@/components/external-event-card'
import { ImageCarousel } from '@/components/image-carousel'
import { LazyVideo } from '@/components/lazy-video'
import { heroImages, featuredEventImage, galleryImages, videos } from '@/lib/media'
import { Event } from '@/types'

export default async function HomePage() {
  let featuredEvents: Event[] = []

  try {
    featuredEvents = await getFeaturedEvents()
  } catch (error) {
    console.error('Failed to load featured events:', error)
  }

  return (
    <>
      {/* hero section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* background video */}
        <div className="absolute inset-0 z-0 bg-mocha-brown">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={videos[2].poster}
            className="w-full h-full object-cover opacity-30 dark:opacity-40"
          >
            <source src={videos[2].src} type="video/mp4" />
          </video>
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-warm-beige/70 to-cream dark:from-dark-cream/90 dark:via-dark-warm-beige/80 dark:to-dark-cream" />
        </div>

        {/* decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sage-green/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-green/20 text-mocha-brown dark:text-warm-beige text-sm font-medium mb-6">
              Curated Social Experiences
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-mocha-brown dark:text-warm-beige mb-6 animate-slide-up">
            Koko Kollective
          </h1>

          <p className="text-lg md:text-xl text-soft-brown/80 dark:text-warm-beige/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            An inclusive BIPOC community-led platform creating intentional spaces
            for connection, creativity, and authentic self-expression.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/events" className="btn-primary">
              Explore Events
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://www.instagram.com/kokokollectiveuk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 rounded-full border-2 border-mocha-brown/30 dark:border-warm-beige/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-mocha-brown/50 dark:bg-warm-beige/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* photo carousel — real event imagery from R2 */}
      <section className="section-padding pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-terracotta text-sm font-medium uppercase tracking-wider">Our Community</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-mocha-brown dark:text-warm-beige mt-3">
              Real Moments, Real People
            </h2>
          </div>
          <ImageCarousel images={heroImages} className="shadow-2xl" />
        </div>
      </section>

      {/* what we do section */}
      <section className="section-padding bg-warm-beige/50 dark:bg-dark-warm-beige/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-terracotta text-sm font-medium uppercase tracking-wider">What We Do</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-mocha-brown dark:text-warm-beige mt-3">
              Experiences That Connect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-cream dark:bg-dark-cream">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-terracotta/10 flex items-center justify-center">
                <Palette className="text-terracotta" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-3">
                Paint & Sip Sessions
              </h3>
              <p className="text-soft-brown/70 dark:text-warm-beige/70 text-sm leading-relaxed">
                Unleash your creativity in a relaxed, social atmosphere.
                No experience needed - just bring yourself and good vibes.
              </p>
            </div>

            {/* feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-cream dark:bg-dark-cream">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-green/20 flex items-center justify-center">
                <Users className="text-muted-olive dark:text-sage-green" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-3">
                Social Games
              </h3>
              <p className="text-soft-brown/70 dark:text-warm-beige/70 text-sm leading-relaxed">
                Break the ice and make genuine connections through curated
                games designed to spark meaningful conversations.
              </p>
            </div>

            {/* feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-cream dark:bg-dark-cream">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-mocha-brown/10 flex items-center justify-center">
                <Sparkles className="text-mocha-brown dark:text-warm-beige" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-3">
                Themed Experiences
              </h3>
              <p className="text-soft-brown/70 dark:text-warm-beige/70 text-sm leading-relaxed">
                From creative workshops to cultural celebrations, our themed
                events celebrate identity and self-expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* featured events section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-terracotta text-sm font-medium uppercase tracking-wider">Upcoming</span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-mocha-brown dark:text-warm-beige mt-3">
                Featured Events
              </h2>
            </div>
            <Link
              href="/events"
              className="text-mocha-brown dark:text-warm-beige font-medium hover:text-terracotta transition-colors inline-flex items-center gap-2"
            >
              View all events
              <ArrowRight size={18} />
            </Link>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          )}
        </div>
      </section>

      {/* community section */}
      <section className="section-padding bg-mocha-brown dark:bg-dark-warm-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-warm-beige mb-6">
            A Space for Community
          </h2>
          <p className="text-lg text-warm-beige/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Koko Kollective prioritises intentional connection and cultural inclusivity.
            Our events are designed as welcoming social spaces for BIPOC communities,
            diaspora attendees, Black queer individuals, and respectful allies.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <span className="px-6 py-3 rounded-full bg-warm-beige/10 text-warm-beige text-sm">
              BIPOC Led
            </span>
            <span className="px-6 py-3 rounded-full bg-warm-beige/10 text-warm-beige text-sm">
              LGBTQ+ Inclusive
            </span>
            <span className="px-6 py-3 rounded-full bg-warm-beige/10 text-warm-beige text-sm">
              Diaspora Welcome
            </span>
            <span className="px-6 py-3 rounded-full bg-warm-beige/10 text-warm-beige text-sm">
              Ally Friendly
            </span>
          </div>

          {/* community videos grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mt-12 pb-8">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transform md:translate-y-8 transition-transform duration-500 hover:scale-[1.02]">
              <LazyVideo src={videos[0].src} poster={videos[0].poster} />
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <LazyVideo src={videos[1].src} poster={videos[1].poster} />
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transform md:-translate-y-8 transition-transform duration-500 hover:scale-[1.02]">
              <LazyVideo src={videos[2].src} poster={videos[2].poster} />
            </div>
          </div>
        </div>
      </section>

      {/* instagram cta section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-mocha-brown dark:text-warm-beige mb-4">
            Join Our Community
          </h2>
          <p className="text-soft-brown/70 dark:text-warm-beige/70 mb-8 max-w-xl mx-auto">
            Follow us on Instagram for event updates, behind-the-scenes content,
            and a glimpse into our vibrant community.
          </p>
          <a
            href="https://www.instagram.com/kokokollectiveuk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            @kokokollectiveuk
          </a>
        </div>
      </section>
    </>
  )
}
