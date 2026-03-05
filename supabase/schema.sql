-- kokokollective database schema

-- enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  eventbrite_url TEXT,
  featured_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  capacity INTEGER NOT NULL DEFAULT 20,
  spots_remaining INTEGER NOT NULL DEFAULT 20,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  category VARCHAR(100) NOT NULL DEFAULT 'social',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- storage policies
CREATE POLICY "public can view event images" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "authenticated users can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "authenticated users can delete event images" ON storage.objects
  FOR DELETE USING (bucket_id = 'event-images');

-- sample event categories
-- social, paint-sip, workshop, game-night, themed-party, creative-session

-- index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published) WHERE is_published = true;
