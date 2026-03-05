'use client'

import { useState } from 'react'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

interface AdminLoginProps {
  onLogin: (email: string, password: string) => boolean
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = onLogin(email, password)
    if (!success) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark-cream px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-dark-warm-beige rounded-2xl shadow-lg p-8">
          {/* header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta/10 flex items-center justify-center">
              <Lock className="text-terracotta" size={28} />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-mocha-brown dark:text-warm-beige">
              Admin Access
            </h1>
            <p className="text-sm text-soft-brown/60 dark:text-warm-beige/60 mt-2">
              Koko Kollective Management Portal
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-brown/40" size={18} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  placeholder="admin@kokokollective.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-brown/40" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-soft-brown/40 hover:text-soft-brown transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary justify-center"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-center text-soft-brown/40 dark:text-warm-beige/40 mt-6">
            Default: admin@kokokollective.com / admin123
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-soft-brown/60 dark:text-warm-beige/60 hover:text-terracotta transition-colors">
            Return to website
          </a>
        </div>
      </div>
    </div>
  )
}
