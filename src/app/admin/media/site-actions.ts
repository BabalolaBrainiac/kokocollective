'use server'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSession } from '@/lib/session'
import { SITE_MEDIA_SLOTS, getSlotByKey, type MediaSlot } from '@/lib/media'

const R2_ENDPOINT = `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`
const R2_BUCKET = process.env.CF_R2_BUCKET || 'babalola-uploads'
const R2_PUBLIC_URL = process.env.CF_R2_PUBLIC_URL || 'https://cdn.babalola.dev'

function getR2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
    },
  })
}

async function requireAdmin() {
  const session = await getSession()
  if (!session || !['admin', 'superuser'].includes(session.role)) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function replaceSiteMedia(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin()

  const file = formData.get('file') as File | null
  const slotKey = formData.get('slot') as string | null

  if (!file) return { error: 'No file provided' }
  if (!slotKey) return { error: 'No slot specified' }

  const slot = getSlotByKey(slotKey)
  if (!slot) return { error: `Unknown slot: ${slotKey}` }

  if (file.size > 50 * 1024 * 1024) {
    return { error: 'File size exceeds 50MB limit' }
  }

  const isVideo = slot.type === 'video'
  const allowedTypes = isVideo
    ? ['video/mp4', 'video/webm', 'video/quicktime']
    : ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']

  if (!allowedTypes.includes(file.type)) {
    return { error: `Invalid file type for ${slot.type}. Allowed: ${allowedTypes.join(', ')}` }
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const key = `uploads/kokokollective/${slot.filename}`

    const client = getR2Client()
    await client.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000, immutable',
    }))

    return { url: `${R2_PUBLIC_URL}/${key}` }
  } catch (err) {
    console.error('r2 site media replace error:', err)
    return { error: 'Failed to upload file to R2' }
  }
}

export async function getSiteMediaSlots(): Promise<MediaSlot[]> {
  await requireAdmin()
  return SITE_MEDIA_SLOTS
}
