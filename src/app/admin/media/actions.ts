'use server'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSession } from '@/lib/session'

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

export async function uploadToR2(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin()

  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) || 'kokokollective'

  if (!file) {
    return { error: 'No file provided' }
  }

  if (file.size > 10 * 1024 * 1024) {
    return { error: 'File size exceeds 10MB limit' }
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG' }
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`
    const key = `uploads/${folder}/${filename}`

    const client = getR2Client()
    await client.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000, immutable',
    }))

    const url = `${R2_PUBLIC_URL}/${key}`
    return { url }
  } catch (err) {
    console.error('r2 upload error:', err)
    return { error: 'Failed to upload file to R2' }
  }
}

export async function uploadMultipleToR2(formData: FormData): Promise<{ urls?: string[]; error?: string }> {
  await requireAdmin()

  const files = formData.getAll('files') as File[]
  const folder = (formData.get('folder') as string) || 'kokokollective'

  if (!files || files.length === 0) {
    return { error: 'No files provided' }
  }

  const urls: string[] = []
  const client = getR2Client()

  for (const file of files) {
    if (file.size > 10 * 1024 * 1024) continue

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) continue

    try {
      const buffer = Buffer.from(await file.arrayBuffer())
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`
      const key = `uploads/${folder}/${filename}`

      await client.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: 'public, max-age=31536000, immutable',
      }))

      urls.push(`${R2_PUBLIC_URL}/${key}`)
    } catch (err) {
      console.error('r2 upload error:', err)
    }
  }

  if (urls.length === 0) {
    return { error: 'Failed to upload any files to R2' }
  }

  return { urls }
}
