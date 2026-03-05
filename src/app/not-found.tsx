import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found | Koko Kollective',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-8xl md:text-9xl font-semibold text-terracotta mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-mocha-brown dark:text-warm-beige mb-4">
          Page Not Found
        </h2>
        <p className="text-soft-brown/70 dark:text-warm-beige/70 max-w-md mx-auto mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved or deleted.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
