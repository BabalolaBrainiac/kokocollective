// simple class merge utility
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ')
}

// format date for display
export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// format time for display
export function formatTime(timeString: string): string {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(parseInt(hours || '0'), parseInt(minutes || '0'))
  return date.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// format currency
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// truncate text
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || ''
  return text.slice(0, maxLength).trim() + '...'
}
