import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Koko Kollective | Curated Social Experiences for BIPOC Communities',
  description: 'An inclusive BIPOC community-led creative events and social experience platform. Join us for paint & sip sessions, social games, creative workshops and themed events focused on connection, identity and self-expression.',
  keywords: 'BIPOC events, creative workshops, social experiences, paint and sip, London events, Black queer events, community gatherings',
  openGraph: {
    title: 'Koko Kollective',
    description: 'Curated social gatherings for BIPOC communities',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-cream dark:bg-dark-cream transition-colors duration-300">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
