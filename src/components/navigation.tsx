'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, Instagram } from 'lucide-react'
import { useTheme } from './theme-provider'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // prevent hydration mismatch for theme toggle
  const ThemeIcon = mounted ? (theme === 'light' ? Moon : Sun) : Sun

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/90 dark:bg-dark-cream/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-mocha-brown dark:text-warm-beige">
              KOKOKO
            </span>
          </Link>

          {/* desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-terracotta ${
                  pathname === link.href
                    ? 'text-terracotta'
                    : 'text-soft-brown dark:text-warm-beige'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* instagram link */}
            <a
              href="https://www.instagram.com/kokokollectiveuk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-brown dark:text-warm-beige hover:text-terracotta transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} />
            </a>

            {/* theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-soft-brown dark:text-warm-beige hover:bg-warm-beige dark:hover:bg-dark-warm-beige transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <ThemeIcon size={20} />
            </button>
          </div>

          {/* mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-soft-brown dark:text-warm-beige"
              aria-label="Toggle theme"
            >
              <ThemeIcon size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-soft-brown dark:text-warm-beige"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-warm-beige dark:border-dark-warm-beige">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-terracotta'
                    : 'text-soft-brown dark:text-warm-beige'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/kokokollectiveuk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-soft-brown dark:text-warm-beige hover:text-terracotta transition-colors duration-200"
            >
              <Instagram size={20} />
              <span>Follow us</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
