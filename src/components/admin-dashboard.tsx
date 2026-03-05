'use client'

import { useState, useEffect } from 'react'
import { Plus, LogOut, Calendar, Edit2, Trash2, Eye, EyeOff, Star, Mail, CheckCircle, Circle } from 'lucide-react'
import { getEvents, getContactMessages, updateMessageStatus } from '@/lib/supabase'
import { Event } from '@/types'
import { EventForm } from './event-form'
import { formatDate, formatCurrency } from '@/lib/utils'

import { logoutAction } from '@/app/admin/actions'
import { deleteEventAction, togglePublishAction, toggleFeaturedAction } from '@/app/admin/events/actions'
import { useRouter } from 'next/navigation'

interface AdminDashboardProps {
  session: any
}

export function AdminDashboard({ session }: AdminDashboardProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // New States
  const [activeTab, setActiveTab] = useState<'events' | 'messages'>('events')
  const [messages, setMessages] = useState<any[]>([])

  const router = useRouter()

  useEffect(() => {
    if (activeTab === 'events') {
      loadEvents()
    } else if (activeTab === 'messages') {
      loadMessages()
    }
  }, [activeTab])

  const loadEvents = async () => {
    setIsLoading(true)
    const allEvents = await getEvents()
    setEvents(allEvents)
    setIsLoading(false)
  }

  const loadMessages = async () => {
    setIsLoading(true)
    const allMsgs = await getContactMessages()
    setMessages(allMsgs)
    setIsLoading(false)
  }

  const handleToggleMessageStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread'
    const success = await updateMessageStatus(id, newStatus)
    if (success) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m))
    }
  }

  const handleDelete = async (id: string) => {
    const result = await deleteEventAction(id)
    if (result.success) {
      setEvents(events.filter(e => e.id !== id))
      setDeleteConfirm(null)
    }
  }

  const handleLogout = async () => {
    await logoutAction()
    router.refresh()
  }

  const handleTogglePublish = async (event: Event) => {
    const { data, error } = await togglePublishAction(event.id, event.is_published)

    if (!error && data) {
      setEvents(events.map(e => e.id === event.id ? data : e))
    }
  }

  const handleToggleFeatured = async (event: Event) => {
    const { data, error } = await toggleFeaturedAction(event.id, event.is_featured)

    if (!error && data) {
      setEvents(events.map(e => e.id === event.id ? data : e))
    }
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-cream">
      {/* header */}
      <header className="bg-white dark:bg-dark-warm-beige shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige">
                Admin Dashboard
              </h1>
              <nav className="hidden sm:flex items-center gap-2 border-l pl-6 border-warm-beige dark:border-dark-warm-beige">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'events'
                    ? 'bg-warm-beige/50 dark:bg-dark-warm-beige text-terracotta font-medium'
                    : 'text-soft-brown/60 dark:text-warm-beige/60 hover:bg-warm-beige/30 dark:hover:bg-dark-warm-beige/30'
                    }`}
                >
                  Events
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'messages'
                    ? 'bg-warm-beige/50 dark:bg-dark-warm-beige text-terracotta font-medium'
                    : 'text-soft-brown/60 dark:text-warm-beige/60 hover:bg-warm-beige/30 dark:hover:bg-dark-warm-beige/30'
                    }`}
                >
                  Messages
                  {messages.filter(m => m.status === 'unread').length > 0 && (
                    <span className="ml-2 bg-terracotta text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      {messages.filter(m => m.status === 'unread').length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="text-sm text-soft-brown/60 dark:text-warm-beige/60 hover:text-terracotta transition-colors"
              >
                View Site
              </a>
              {session?.role === 'superuser' && (
                <a
                  href="/admin/users"
                  className="text-sm border ml-2 border-terracotta/30 text-terracotta px-3 py-1.5 rounded-lg hover:bg-terracotta hover:text-white transition-colors"
                >
                  Manage Admins
                </a>
              )}
              <div className="flex items-center gap-2 mr-4 ml-6">
                <span className="text-xs text-soft-brown/60 dark:text-warm-beige/60 hidden sm:inline">
                  {session?.email}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-soft-brown/10 text-soft-brown/80 dark:bg-warm-beige/10 dark:text-warm-beige/80 uppercase font-bold tracking-wider">
                  {session?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-soft-brown/60 dark:text-warm-beige/60 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-dark-warm-beige rounded-xl p-4">
            <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase">Total Events</p>
            <p className="text-2xl font-serif font-semibold text-mocha-brown dark:text-warm-beige">
              {events.length}
            </p>
          </div>
          <div className="bg-white dark:bg-dark-warm-beige rounded-xl p-4">
            <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase">Published</p>
            <p className="text-2xl font-serif font-semibold text-mocha-brown dark:text-warm-beige">
              {events.filter(e => e.is_published).length}
            </p>
          </div>
          <div className="bg-white dark:bg-dark-warm-beige rounded-xl p-4">
            <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase">Featured</p>
            <p className="text-2xl font-serif font-semibold text-mocha-brown dark:text-warm-beige">
              {events.filter(e => e.is_featured).length}
            </p>
          </div>
          <div className="bg-white dark:bg-dark-warm-beige rounded-xl p-4">
            <p className="text-xs text-soft-brown/60 dark:text-warm-beige/60 uppercase">Drafts</p>
            <p className="text-2xl font-serif font-semibold text-mocha-brown dark:text-warm-beige">
              {events.filter(e => !e.is_published).length}
            </p>
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige">
            Events
          </h2>
          <button
            onClick={() => {
              setEditingEvent(null)
              setShowForm(true)
            }}
            className="btn-primary"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>

        {/* events table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-dark-warm-beige rounded-xl">
            <Calendar className="mx-auto mb-4 text-soft-brown/30" size={48} />
            <p className="text-soft-brown/60 dark:text-warm-beige/60">
              No events yet. Create your first event to get started.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-warm-beige rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-warm-beige/50 dark:bg-dark-warm-beige/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-4 py-3">
                      Event
                    </th>
                    <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-4 py-3">
                      Date
                    </th>
                    <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-4 py-3">
                      Price
                    </th>
                    <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-4 py-3">
                      Status
                    </th>
                    <th className="text-right text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-beige dark:divide-dark-warm-beige">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-warm-beige/20 dark:hover:bg-dark-warm-beige/20">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {event.featured_image && (
                            <img
                              src={event.featured_image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-mocha-brown dark:text-warm-beige">
                              {event.title}
                            </p>
                            <p className="text-xs text-soft-brown/50 dark:text-warm-beige/50">
                              {event.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-soft-brown/70 dark:text-warm-beige/70">
                        {formatDate(event.date)}
                      </td>
                      <td className="px-4 py-4 text-sm text-soft-brown/70 dark:text-warm-beige/70">
                        {event.price === 0 ? 'Free' : formatCurrency(event.price, event.currency)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePublish(event)}
                            className={`p-1.5 rounded-lg transition-colors ${event.is_published
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                              : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
                              }`}
                            title={event.is_published ? 'Published' : 'Draft'}
                          >
                            {event.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(event)}
                            className={`p-1.5 rounded-lg transition-colors ${event.is_featured
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                              : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                              }`}
                            title={event.is_featured ? 'Featured' : 'Not featured'}
                          >
                            <Star size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingEvent(event)
                              setShowForm(true)
                            }}
                            className="p-2 rounded-lg hover:bg-warm-beige dark:hover:bg-dark-warm-beige text-soft-brown/60 dark:text-warm-beige/60 hover:text-terracotta transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(event.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-soft-brown/60 dark:text-warm-beige/60 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* event form modal */}
      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={() => {
            setShowForm(false)
            setEditingEvent(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditingEvent(null)
            loadEvents()
          }}
        />
      )}

      {/* delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-warm-beige rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-serif text-lg font-semibold text-mocha-brown dark:text-warm-beige mb-2">
              Delete Event?
            </h3>
            <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70 mb-6">
              This action cannot be undone. Are you sure you want to delete this event?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-xl border border-warm-beige dark:border-dark-warm-beige text-soft-brown dark:text-warm-beige font-medium hover:bg-warm-beige/50 dark:hover:bg-dark-warm-beige/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
