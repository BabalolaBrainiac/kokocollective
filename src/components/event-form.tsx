'use client'

import { useState, useRef } from 'react'
import { X, Upload, Image as ImageIcon, XCircle, Link as LinkIcon } from 'lucide-react'
import { Event, EventFormData } from '@/types'
import { uploadToR2, uploadMultipleToR2 } from '@/app/admin/media/actions'
import { createEventAction, updateEventAction } from '@/app/admin/events/actions'
import { getR2ImageUrl } from '@/lib/r2'

interface EventFormProps {
  event: Event | null
  onClose: () => void
  onSuccess: () => void
}

const CATEGORIES = [
  'paint-sip',
  'social-games',
  'workshop',
  'themed-party',
  'creative-session',
  'networking',
  'other'
]

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || '',
    description: event?.description || '',
    short_description: event?.short_description || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    time: event?.time || '19:00',
    location: event?.location || '',
    address: event?.address || '5 Brayford Square, London E1 0SG',
    price: event?.price || 0,
    currency: event?.currency || 'GBP',
    eventbrite_url: event?.eventbrite_url || '',
    capacity: event?.capacity || 20,
    is_featured: event?.is_featured || false,
    is_published: event?.is_published ?? true,
    category: event?.category || 'paint-sip',
  })

  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(event?.featured_image || null)
  const [useR2ForFeatured, setUseR2ForFeatured] = useState(false)
  const [r2FeaturedFilename, setR2FeaturedFilename] = useState('')

  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(event?.gallery_images || [])
  const [useR2ForGallery, setUseR2ForGallery] = useState(false)
  const [r2GalleryFilename, setR2GalleryFilename] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const featuredInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
      setFeaturedImagePreview(URL.createObjectURL(file))
      setUseR2ForFeatured(false)
    }
  }

  const handleR2FeaturedSubmit = () => {
    if (r2FeaturedFilename) {
      const url = getR2ImageUrl(r2FeaturedFilename)
      setFeaturedImagePreview(url)
      setFeaturedImage(null)
      setR2FeaturedFilename('')
    }
  }

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setGalleryImages([...galleryImages, ...files])
      const newPreviews = files.map(file => URL.createObjectURL(file))
      setGalleryPreviews([...galleryPreviews, ...newPreviews])
    }
  }

  const handleR2GallerySubmit = () => {
    if (r2GalleryFilename) {
      const url = getR2ImageUrl(r2GalleryFilename)
      setGalleryPreviews([...galleryPreviews, url])
      setR2GalleryFilename('')
    }
  }

  const removeGalleryImage = (index: number) => {
    const newImages = [...galleryImages]
    const newPreviews = [...galleryPreviews]

    // if it's a file that hasn't been uploaded yet
    if (index < galleryImages.length) {
      newImages.splice(index, 1)
      if (galleryPreviews[index].startsWith('blob:')) {
        URL.revokeObjectURL(galleryPreviews[index])
      }
    }

    newPreviews.splice(index, 1)
    setGalleryImages(newImages)
    setGalleryPreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      let featuredImageUrl = featuredImagePreview || ''
      const galleryImageUrls = [...galleryPreviews.filter(url => !url.startsWith('blob:'))]

      if (featuredImage) {
        const fd = new FormData()
        fd.append('file', featuredImage)
        fd.append('folder', 'kokokollective')
        const result = await uploadToR2(fd)
        if (result.url) featuredImageUrl = result.url
      }

      if (galleryImages.length > 0) {
        const fd = new FormData()
        for (const file of galleryImages) {
          fd.append('files', file)
        }
        fd.append('folder', 'kokokollective')
        const result = await uploadMultipleToR2(fd)
        if (result.urls) galleryImageUrls.push(...result.urls)
      }

      const eventData = {
        ...formData,
        featured_image: featuredImageUrl,
        gallery_images: galleryImageUrls,
      }

      let result
      if (event) {
        result = await updateEventAction(event.id, eventData)
      } else {
        result = await createEventAction(eventData)
      }

      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        onSuccess()
      } else {
        setError('Failed to save event. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-dark-warm-beige rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* header */}
        <div className="sticky top-0 bg-white dark:bg-dark-warm-beige border-b border-warm-beige dark:border-dark-warm-beige px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige">
            {event ? 'Edit Event' : 'Create Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-warm-beige dark:hover:bg-dark-warm-beige transition-colors"
          >
            <X size={20} className="text-soft-brown/60 dark:text-warm-beige/60" />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                placeholder="e.g., Paint & Sip: Summer Vibes"
                required
              />
            </div>

            {/* category */}
            <div>
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* date */}
            <div>
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                required
              />
            </div>

            {/* time */}
            <div>
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                required
              />
            </div>

            {/* location */}
            <div>
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Location Name *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                placeholder="e.g., The Canvas Cafe"
                required
              />
            </div>

            {/* price */}
            <div>
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Price ({formData.currency})
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>

            {/* capacity */}
            <div>
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Capacity *
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                required
              />
            </div>

            {/* eventbrite url */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Eventbrite Ticket URL
              </label>
              <input
                type="url"
                value={formData.eventbrite_url}
                onChange={(e) => setFormData({ ...formData, eventbrite_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                placeholder="https://www.eventbrite.co.uk/e/your-event"
              />
            </div>

            {/* address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Full Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                placeholder="Full address with postcode"
                required
              />
            </div>

            {/* short description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Short Description * (max 500 characters)
              </label>
              <textarea
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                rows={2}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                placeholder="Brief description for event cards"
                required
              />
            </div>

            {/* full description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                Full Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                placeholder="Detailed description of the event"
                required
              />
            </div>

            {/* featured image */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige">
                  Featured Image
                </label>
                <button
                  type="button"
                  onClick={() => setUseR2ForFeatured(!useR2ForFeatured)}
                  className="text-xs text-terracotta hover:underline flex items-center gap-1"
                >
                  <LinkIcon size={12} />
                  {useR2ForFeatured ? 'Upload instead' : 'Use R2 filename'}
                </button>
              </div>

              {useR2ForFeatured ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={r2FeaturedFilename}
                    onChange={(e) => setR2FeaturedFilename(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                    placeholder="e.g., event-image.jpg"
                  />
                  <button
                    type="button"
                    onClick={handleR2FeaturedSubmit}
                    className="px-4 py-2 bg-mocha-brown text-white rounded-xl hover:bg-soft-brown transition-colors"
                  >
                    Set
                  </button>
                </div>
              ) : (
                <>
                  <input
                    ref={featuredInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageChange}
                    className="hidden"
                  />

                  {featuredImagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={featuredImagePreview}
                        alt="Featured"
                        className="w-48 h-32 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedImage(null)
                          setFeaturedImagePreview(null)
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => featuredInputRef.current?.click()}
                      className="flex items-center gap-3 px-6 py-4 border-2 border-dashed border-warm-beige dark:border-dark-warm-beige rounded-xl hover:border-terracotta dark:hover:border-terracotta transition-colors"
                    >
                      <ImageIcon size={24} className="text-soft-brown/40" />
                      <span className="text-sm text-soft-brown/60 dark:text-warm-beige/60">
                        Click to upload featured image
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* gallery images */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-mocha-brown dark:text-warm-beige">
                  Gallery Images
                </label>
                <button
                  type="button"
                  onClick={() => setUseR2ForGallery(!useR2ForGallery)}
                  className="text-xs text-terracotta hover:underline flex items-center gap-1"
                >
                  <LinkIcon size={12} />
                  {useR2ForGallery ? 'Upload instead' : 'Add R2 filename'}
                </button>
              </div>

              {useR2ForGallery && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={r2GalleryFilename}
                    onChange={(e) => setR2GalleryFilename(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                    placeholder="e.g., gallery-1.jpg"
                  />
                  <button
                    type="button"
                    onClick={handleR2GallerySubmit}
                    className="px-4 py-2 bg-mocha-brown text-white rounded-xl hover:bg-soft-brown transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}

              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
                className="hidden"
              />

              <div className="flex flex-wrap gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Gallery ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                ))}

                {!useR2ForGallery && (
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-warm-beige dark:border-dark-warm-beige rounded-xl hover:border-terracotta dark:hover:border-terracotta transition-colors"
                  >
                    <Upload size={20} className="text-soft-brown/40 mb-1" />
                    <span className="text-xs text-soft-brown/40">Add</span>
                  </button>
                )}
              </div>
            </div>

            {/* toggles */}
            <div className="md:col-span-2 flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-5 h-5 rounded border-warm-beige text-terracotta focus:ring-terracotta"
                />
                <span className="text-sm text-mocha-brown dark:text-warm-beige">Published</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5 rounded border-warm-beige text-terracotta focus:ring-terracotta"
                />
                <span className="text-sm text-mocha-brown dark:text-warm-beige">Featured on homepage</span>
              </label>
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-4 pt-6 border-t border-warm-beige dark:border-dark-warm-beige">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige text-soft-brown dark:text-warm-beige font-medium hover:bg-warm-beige/50 dark:hover:bg-dark-warm-beige/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Saving...
                </>
              ) : (
                event ? 'Update Event' : 'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
