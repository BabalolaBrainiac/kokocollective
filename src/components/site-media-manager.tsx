'use client'

import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, RefreshCw, Image as ImageIcon, Video } from 'lucide-react'
import { replaceSiteMedia } from '@/app/admin/media/site-actions'
import { SITE_MEDIA_SLOTS, CDN_URL } from '@/lib/media'
import type { MediaSlot } from '@/lib/media'
import { cn } from '@/lib/utils'

interface UploadState {
  slotKey: string
  status: 'idle' | 'uploading' | 'success' | 'error'
  message?: string
}

const SECTION_ORDER = ['Homepage Hero', 'Our Community', 'Community Videos', 'About Page Gallery']

export function SiteMediaManager() {
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({})

  const sections = SECTION_ORDER.map(sectionName => ({
    name: sectionName,
    slots: SITE_MEDIA_SLOTS.filter(s => s.section === sectionName),
  }))

  const handleUpload = async (slot: MediaSlot, file: File) => {
    const slotKey = slot.key
    setUploadStates(prev => ({
      ...prev,
      [slotKey]: { slotKey, status: 'uploading' },
    }))

    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('slot', slotKey)
      const result = await replaceSiteMedia(fd)

      if (result.error) {
        setUploadStates(prev => ({
          ...prev,
          [slotKey]: { slotKey, status: 'error', message: result.error },
        }))
      } else {
        setUploadStates(prev => ({
          ...prev,
          [slotKey]: { slotKey, status: 'success', message: result.url },
        }))
        setTimeout(() => {
          setUploadStates(prev => ({
            ...prev,
            [slotKey]: { slotKey, status: 'idle' },
          }))
        }, 3000)
      }
    } catch (err) {
      setUploadStates(prev => ({
        ...prev,
        [slotKey]: { slotKey, status: 'error', message: 'Upload failed' },
      }))
    }
  }

  return (
    <div className="space-y-8">
      {sections.map(section => (
        <div key={section.name} className="bg-white dark:bg-dark-warm-beige rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-mocha-brown dark:text-warm-beige mb-4">
            {section.name}
          </h3>
          <div className={cn(
            'grid gap-4',
            section.name === 'About Page Gallery'
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          )}>
            {section.slots.map(slot => {
              const state = uploadStates[slot.key]
              const isVideo = slot.type === 'video'
              const previewUrl = `${CDN_URL}/${slot.filename}`

              return (
                <div
                  key={slot.key}
                  className="relative border border-warm-beige dark:border-dark-warm-beige rounded-xl overflow-hidden group"
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {previewUrl && !isVideo ? (
                      <img
                        src={previewUrl}
                        alt={slot.label}
                        className="w-full h-full object-cover"
                      />
                    ) : previewUrl && isVideo ? (
                      <div className="w-full h-full flex items-center justify-center bg-mocha-brown/10 dark:bg-warm-beige/10">
                        <Video size={32} className="text-soft-brown/30 dark:text-warm-beige/30" />
                      </div>
                    ) : (
                      <ImageIcon size={32} className="text-soft-brown/30 dark:text-warm-beige/30" />
                    )}

                    {/* upload overlay */}
                    <label className={cn(
                      'absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer',
                      'bg-black/0 group-hover:bg-black/40',
                      state?.status === 'uploading' && 'bg-black/60',
                      state?.status === 'success' && 'bg-green-900/60',
                      state?.status === 'error' && 'bg-red-900/60',
                    )}>
                      <input
                        type="file"
                        accept={isVideo ? 'video/mp4,video/webm,video/quicktime' : 'image/jpeg,image/png,image/webp,image/gif'}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleUpload(slot, file)
                        }}
                        className="hidden"
                        disabled={state?.status === 'uploading'}
                      />

                      {state?.status === 'uploading' ? (
                        <RefreshCw size={24} className="text-white animate-spin" />
                      ) : state?.status === 'success' ? (
                        <CheckCircle size={24} className="text-green-300" />
                      ) : state?.status === 'error' ? (
                        <AlertCircle size={24} className="text-red-300" />
                      ) : (
                        <Upload size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}

                      <span className={cn(
                        'text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity',
                        (state?.status === 'uploading' || state?.status === 'success' || state?.status === 'error') && 'opacity-100',
                      )}>
                        {state?.status === 'uploading' ? 'Uploading...' :
                         state?.status === 'success' ? 'Replaced' :
                         state?.status === 'error' ? (state.message || 'Failed') :
                         'Click to replace'}
                      </span>
                    </label>
                  </div>

                  <div className="p-2">
                    <p className="text-xs font-medium text-soft-brown dark:text-warm-beige truncate">
                      {slot.label}
                    </p>
                    <p className="text-[10px] text-soft-brown/40 dark:text-warm-beige/40 truncate">
                      {slot.filename}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
