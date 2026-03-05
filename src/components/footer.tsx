'use client'

import Link from 'next/link'
import { Instagram, Mail, MapPin, Heart } from 'lucide-react'

const footerLinks = {
  explore: [
    { href: '/events', label: 'All Events' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  connect: [
    { href: 'https://www.instagram.com/kokokollectiveuk', label: 'Instagram', external: true },
    { href: 'mailto:hello@kokokollective.com', label: 'Email', external: true },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-warm-beige dark:bg-dark-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* brand section */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-mocha-brown dark:text-warm-beige">
              KOKOKO
            </h3>
            <p className="text-sm text-soft-brown/80 dark:text-warm-beige/80 max-w-xs leading-relaxed">
              Curated social gatherings for BIPOC communities. Creating spaces for 
              connection, creativity, and authentic self-expression.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/kokokollectiveuk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-mocha-brown/10 dark:bg-warm-beige/10 text-mocha-brown dark:text-warm-beige hover:bg-terracotta hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:hello@kokokollective.com"
                className="p-2 rounded-full bg-mocha-brown/10 dark:bg-warm-beige/10 text-mocha-brown dark:text-warm-beige hover:bg-terracotta hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* explore links */}
          <div>
            <h4 className="font-medium text-mocha-brown dark:text-warm-beige mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-soft-brown/80 dark:text-warm-beige/80 hover:text-terracotta transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* connect links */}
          <div>
            <h4 className="font-medium text-mocha-brown dark:text-warm-beige mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-soft-brown/80 dark:text-warm-beige/80 hover:text-terracotta transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-mocha-brown/10 dark:border-warm-beige/10">
              <div className="flex items-start gap-2 text-sm text-soft-brown/60 dark:text-warm-beige/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>5 Brayford Square, London E1 0SG</span>
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-8 border-t border-mocha-brown/10 dark:border-warm-beige/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-soft-brown/60 dark:text-warm-beige/60">
              {currentYear} Koko Kollective. All rights reserved.
            </p>
            <p className="text-sm text-soft-brown/60 dark:text-warm-beige/60 flex items-center gap-1">
              Made with <Heart size={14} className="text-terracotta" /> for our community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
