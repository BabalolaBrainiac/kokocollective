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
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return []
  }

  try {
    const { data, error } = await client
      .from('events')
      .select('*')
      .eq('is_published', true)
      .order('date', { ascending: true })

    if (error) {
      console.error('error fetching events:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('error fetching events:', err)
    return []
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return []
  }

  try {
    const { data, error } = await client
      .from('events')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('date', { ascending: true })
      .limit(3)

    if (error) {
      console.error('error fetching featured events:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('error fetching featured events:', err)
    return []
  }
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

export async function createEvent(event: EventFormData): Promise<Event | null> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return null
  }

  try {
    const { data, error } = await client
      .from('events')
      .insert([{ ...event, spots_remaining: event.capacity }])
      .select()
      .single()

    if (error) {
      console.error('error creating event:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('error creating event:', err)
    return null
  }
}

export async function updateEvent(id: string, event: Partial<EventFormData>): Promise<Event | null> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return null
  }

  try {
    const { data, error } = await client
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('error updating event:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('error updating event:', err)
    return null
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  const client = getSupabase()
  if (!client) {
    console.warn('supabase not configured')
    return false
  }

  try {
    const { error } = await client
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('error deleting event:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('error deleting event:', err)
    return false
  }
}

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
