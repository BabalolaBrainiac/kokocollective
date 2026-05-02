import { createClient } from '@supabase/supabase-js'
import { Event, EventFormData } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// lazy init - only create when needed
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!supabaseClient && supabaseUrl && supabaseKey) {
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseClient
}

export const supabase = getSupabase()

// events
export async function getEvents(): Promise<Event[]> {
  // Temporary bypass: The current Supabase DB points to Eyimofe Wellness instead of KokoKollective.
  // Querying it causes a 5.2s timeout during SSR. We return empty array to prevent hanging the page.
  return []
}

export async function getFeaturedEvents(): Promise<Event[]> {
  // Temporary bypass to prevent 5.2s SSR hang
  return []
}

export async function getEventById(id: string): Promise<Event | null> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return null
  }

  try {
    const { data, error } = await client
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('error fetching event:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('error fetching event:', err)
    return null
  }
}

// removed createEvent, updateEvent, deleteEvent because they are now server actions

// image uploads
export async function uploadImage(file: File, path: string): Promise<string | null> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return null
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { error } = await client.storage
      .from('event-images')
      .upload(filePath, file)

    if (error) {
      console.error('error uploading image:', error)
      return null
    }

    const { data } = client.storage
      .from('event-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  } catch (err) {
    console.error('error uploading image:', err)
    return null
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return false
  }

  try {
    const path = url.split('/event-images/')[1]
    if (!path) return false

    const { error } = await client.storage
      .from('event-images')
      .remove([path])

    if (error) {
      console.error('error deleting image:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('error deleting image:', err)
    return false
  }
}

// contact messages
export async function getContactMessages() {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return []
  }

  try {
    const { data, error } = await client
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('error fetching messages:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('error fetching messages:', err)
    return []
  }
}

export async function updateMessageStatus(id: string, status: 'read' | 'unread') {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return false
  }

  try {
    // @ts-ignore - bypassing untyped supabase schema
    const { error } = await (client as any)
      .from('contact_messages')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('error updating message status:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('error updating message status:', err)
    return false
  }
}

