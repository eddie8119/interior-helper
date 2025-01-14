type DateTimeFormatOptions = {
  format?: 'full' | 'date' | 'time' | 'short'
  locale?: string
}

export const formatDateTime = (
  date: Date | string | number,
  options: DateTimeFormatOptions = {}
) => {
  const {
    format = 'full',
    locale = 'zh-TW'
  } = options

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour12: false
  }

  switch (format) {
    case 'full':
      Object.assign(formatOptions, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      break
    case 'date':
      Object.assign(formatOptions, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      break
    case 'time':
      Object.assign(formatOptions, {
        hour: '2-digit',
        minute: '2-digit'
      })
      break
    case 'short':
      Object.assign(formatOptions, {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      break
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(new Date(date))
}

export const formatRelativeTime = (date: Date | string | number, locale = 'zh-TW') => {
  const now = new Date()
  const target = new Date(date)
  const diffInMinutes = Math.floor((target.getTime() - now.getTime()) / (1000 * 60))
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minutes')
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hours')
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, 'days')
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, 'months')
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return rtf.format(diffInYears, 'years')
}
