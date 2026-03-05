import { Mail, MapPin, Instagram, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact | Koko Kollective',
  description: 'Get in touch with Koko Kollective. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <>
      {/* hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-terracotta text-sm font-medium uppercase tracking-wider">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-mocha-brown dark:text-warm-beige mt-3 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-soft-brown/70 dark:text-warm-beige/70 max-w-2xl mx-auto">
            Have a question, partnership idea, or just want to say hello? 
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* contact info */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* email */}
            <a
              href="mailto:hello@kokokollective.com"
              className="p-6 rounded-2xl bg-warm-beige/30 dark:bg-dark-warm-beige/30 hover:bg-warm-beige/50 dark:hover:bg-dark-warm-beige/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
                <Mail className="text-terracotta" size={24} />
              </div>
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-1">Email</h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">hello@kokokollective.com</p>
            </a>

            {/* instagram */}
            <a
              href="https://www.instagram.com/kokokollectiveuk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-warm-beige/30 dark:bg-dark-warm-beige/30 hover:bg-warm-beige/50 dark:hover:bg-dark-warm-beige/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
                <Instagram className="text-terracotta" size={24} />
              </div>
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-1">Instagram</h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">@kokokollectiveuk</p>
            </a>

            {/* location */}
            <div className="p-6 rounded-2xl bg-warm-beige/30 dark:bg-dark-warm-beige/30">
              <div className="w-12 h-12 rounded-full bg-sage-green/20 flex items-center justify-center mb-4">
                <MapPin className="text-muted-olive dark:text-sage-green" size={24} />
              </div>
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-1">Location</h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                5 Brayford Square<br />
                London E1 0SG
              </p>
            </div>

            {/* response time */}
            <div className="p-6 rounded-2xl bg-warm-beige/30 dark:bg-dark-warm-beige/30">
              <div className="w-12 h-12 rounded-full bg-mocha-brown/10 flex items-center justify-center mb-4">
                <Clock className="text-mocha-brown dark:text-warm-beige" size={24} />
              </div>
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-1">Response Time</h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                We aim to respond to all enquiries within 48 hours.
              </p>
            </div>
          </div>

          {/* contact form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-cream dark:bg-dark-cream rounded-2xl p-8 shadow-sm border border-warm-beige dark:border-dark-warm-beige">
              <h2 className="font-serif text-2xl font-semibold text-mocha-brown dark:text-warm-beige mb-6">
                Send us a message
              </h2>
              
              <form className="space-y-6" action="mailto:hello@kokokollective.com" method="post" encType="text/plain">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Event Question">Event Question</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Press">Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* faq section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-warm-beige/30 dark:bg-dark-warm-beige/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-mocha-brown dark:text-warm-beige text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-cream dark:bg-dark-cream rounded-xl p-6">
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Who can attend Koko Kollective events?
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Our events are designed for BIPOC communities, diaspora attendees, Black queer individuals, 
                and respectful allies. We create intentional spaces that centre BIPOC experiences while 
                remaining welcoming to all who respect our values.
              </p>
            </div>

            <div className="bg-cream dark:bg-dark-cream rounded-xl p-6">
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Do I need experience for paint & sip sessions?
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Not at all! Our paint & sip sessions are designed for all skill levels. 
                Our facilitators guide you through the process step by step, so whether 
                you&apos;re a beginner or experienced artist, you&apos;ll have a great time.
              </p>
            </div>

            <div className="bg-cream dark:bg-dark-cream rounded-xl p-6">
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Can I get a refund if I can&apos;t attend?
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Refunds are available up to 7 days before the event. Within 7 days, 
                we can offer a credit for a future event or transfer your ticket to 
                another person. Please contact us for assistance.
              </p>
            </div>

            <div className="bg-cream dark:bg-dark-cream rounded-xl p-6">
              <h3 className="font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Do you host private events?
              </h3>
              <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70">
                Yes! We love hosting private events for birthdays, team building, 
                celebrations, and more. Get in touch with us to discuss your requirements 
                and we&apos;ll create a bespoke experience for your group.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
