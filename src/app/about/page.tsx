import Image from 'next/image'
import { Heart, Users, Sparkles, Shield } from 'lucide-react'

export const metadata = {
  title: 'About | Koko Kollective',
  description: 'Learn about Koko Kollective - an inclusive BIPOC community-led creative events platform creating spaces for connection and self-expression.',
}

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-terracotta text-sm font-medium uppercase tracking-wider">About Us</span>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-mocha-brown dark:text-warm-beige mt-3 mb-6">
            Creating Spaces for Connection
          </h1>
          <p className="text-lg text-soft-brown/70 dark:text-warm-beige/70 max-w-2xl mx-auto">
            Koko Kollective is more than events. We&apos;re a community-first platform 
            dedicated to fostering genuine connections through creative experiences.
          </p>
        </div>
      </section>

      {/* mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-beige/30 dark:bg-dark-warm-beige/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-mocha-brown dark:text-warm-beige mb-6">
                Our Mission
              </h2>
              <p className="text-soft-brown/80 dark:text-warm-beige/80 leading-relaxed mb-4">
                Koko Kollective exists to create intentional, welcoming spaces where 
                BIPOC communities can connect, create, and celebrate their authentic 
                selves. We believe in the power of shared experiences to build 
                meaningful relationships and foster a sense of belonging.
              </p>
              <p className="text-soft-brown/80 dark:text-warm-beige/80 leading-relaxed">
                Whether you&apos;re looking to explore your creativity, meet like-minded 
                individuals, or simply enjoy a welcoming social atmosphere, our events 
                are designed with you in mind.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-sage-green/20 to-terracotta/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-mocha-brown/10 flex items-center justify-center">
                    <Heart className="text-terracotta" size={40} />
                  </div>
                  <p className="font-serif text-2xl text-mocha-brown dark:text-warm-beige italic">
                    &ldquo;Connection through creativity&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-mocha-brown dark:text-warm-beige">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta/10 flex items-center justify-center">
                <Heart className="text-terracotta" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2">
                Intentional Connection
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Every event is designed to foster genuine relationships and meaningful interactions.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-green/20 flex items-center justify-center">
                <Users className="text-muted-olive dark:text-sage-green" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2">
                Cultural Inclusivity
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Celebrating diversity and creating spaces where all BIPOC individuals feel welcome.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mocha-brown/10 flex items-center justify-center">
                <Sparkles className="text-mocha-brown dark:text-warm-beige" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2">
                Creative Expression
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Encouraging self-expression through art, conversation, and shared experiences.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta/10 flex items-center justify-center">
                <Shield className="text-terracotta" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2">
                Safe Spaces
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Prioritising comfort, respect, and safety for all attendees, especially Black queer individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* who we serve */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-mocha-brown dark:bg-dark-warm-beige">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-beige mb-6">
            Who We Serve
          </h2>
          <p className="text-warm-beige/80 mb-10 max-w-2xl mx-auto">
            Our events are specifically designed as welcoming social spaces for:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['BIPOC Communities', 'Diaspora Attendees', 'Black Queer Individuals', 'Respectful Allies'].map((item) => (
              <span
                key={item}
                className="px-6 py-3 rounded-full bg-warm-beige/10 text-warm-beige text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-warm-beige/60 text-sm">
            We focus on atmosphere, guided interaction, themed experiences and 
            comfortable socialising rather than nightlife-style partying.
          </p>
        </div>
      </section>

      {/* founder note */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-terracotta/10 flex items-center justify-center">
            <span className="font-serif text-2xl text-terracotta">P</span>
          </div>
          <blockquote className="font-serif text-2xl md:text-3xl text-mocha-brown dark:text-warm-beige italic mb-6">
            &ldquo;I created Koko Kollective because I wanted to build the kind of spaces 
            I wished existed - warm, welcoming, and unapologetically centered on 
            BIPOC joy and connection.&rdquo;
          </blockquote>
          <p className="text-soft-brown/70 dark:text-warm-beige/70">
            Precious K, Founder & Project Manager
          </p>
        </div>
      </section>
    </>
  )
}
