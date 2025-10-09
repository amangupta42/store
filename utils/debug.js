/**
 * Debug utility for production debugging
 * Logs are enabled in development and can be enabled in production via env variable
 */

const isDebugEnabled = () => {
  if (typeof window !== 'undefined') {
    // Client-side: check localStorage or env variable
    return (
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_DEBUG === 'true' ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('debug') === 'true')
    )
  }
  // Server-side: check env variable
  return process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true'
}

export const debugLog = (...args) => {
  if (isDebugEnabled()) {
    console.log('[DEBUG]', ...args)
  }
}

export const debugError = (...args) => {
  // Always log errors, even in production
  console.error('[ERROR]', ...args)
}

export const debugWarn = (...args) => {
  if (isDebugEnabled()) {
    console.warn('[WARN]', ...args)
  }
}

export const debugInfo = (category, data) => {
  if (isDebugEnabled()) {
    console.log(`[INFO:${category}]`, data)
  }
}

// Log data fetching operations
export const logDataFetch = (page, operation, data) => {
  if (isDebugEnabled()) {
    console.group(`[DATA FETCH] ${page}`)
    console.log('Operation:', operation)
    console.log('Data:', data)
    console.log('Data length:', Array.isArray(data) ? data.length : 'N/A')
    console.log('Timestamp:', new Date().toISOString())
    console.groupEnd()
  }
}

// Log errors with context
export const logError = (context, error, additionalInfo = {}) => {
  console.group(`[ERROR] ${context}`)
  console.error('Error:', error)
  console.error('Message:', error?.message || 'Unknown error')
  console.error('Stack:', error?.stack || 'No stack trace')
  console.error('Additional Info:', additionalInfo)
  console.error('Timestamp:', new Date().toISOString())
  console.groupEnd()
}

// Enable debug mode from browser console
if (typeof window !== 'undefined') {
  window.enableDebug = () => {
    localStorage.setItem('debug', 'true')
    console.log('[DEBUG] Debug mode enabled. Reload the page to see debug logs.')
  }

  window.disableDebug = () => {
    localStorage.removeItem('debug')
    console.log('[DEBUG] Debug mode disabled. Reload the page.')
  }
}

export default {
  log: debugLog,
  error: debugError,
  warn: debugWarn,
  info: debugInfo,
  logDataFetch,
  logError,
}
