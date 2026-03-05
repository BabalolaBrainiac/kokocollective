'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Event } from '@/types'
import { AdminLogin } from '@/components/admin-login'
import { AdminDashboard } from '@/components/admin-dashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // check if user is already authenticated
    const authStatus = sessionStorage.getItem('kokokollective-admin-auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (email: string, password: string) => {
    // simple auth - in production, use proper authentication
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@kokokollective.com'
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem('kokokollective-admin-auth', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    sessionStorage.removeItem('kokokollective-admin-auth')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
