export interface Event {
  id: string
  title: string
  description: string
  short_description: string
  date: string
  time: string
  location: string
  address: string
  price: number
  currency: string
  eventbrite_url: string
  featured_image: string
  gallery_images: string[]
  capacity: number
  spots_remaining: number
  is_featured: boolean
  is_published: boolean
  category: string
  created_at: string
  updated_at: string
}

export interface EventFormData {
  title: string
  description: string
  short_description: string
  date: string
  time: string
  location: string
  address: string
  price: number
  currency: string
  eventbrite_url: string
  capacity: number
  is_featured: boolean
  is_published: boolean
  category: string
}

export interface AdminUser {
  email: string
  isAuthenticated: boolean
}
