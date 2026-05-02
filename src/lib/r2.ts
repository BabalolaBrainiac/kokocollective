export const R2_CDN_URL = 'https://cdn.babalola.dev/uploads/kokokollective/'

export function getR2ImageUrl(filename: string): string {
  if (!filename) return ''
  if (filename.startsWith('http')) return filename
  return `${R2_CDN_URL}${filename}`
}
