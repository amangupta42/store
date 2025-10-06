/**
 * Environment Variable Configuration and Validation
 * This file ensures all required environment variables are present and valid
 */

// Required environment variables for the application to function
const requiredEnvVars = {
  // Stripe configuration (public key is required for checkout)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
}

// Optional environment variables with defaults
const optionalEnvVars = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Modern ECommerce Store',
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
}

/**
 * Validates that all required environment variables are present
 * Throws an error if any required variables are missing
 */
function validateEnv() {
  const missing = []

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value || value === 'xxx-xxx-xxx' || value.includes('your_key_here')) {
      missing.push(key)
    }
  })

  if (missing.length > 0) {
    console.error(
      `❌ Missing or invalid environment variables:\n${missing
        .map(key => `   - ${key}`)
        .join('\n')}\n\nPlease check your .env.local file and ensure all required variables are set.`
    )

    // Only throw in production to prevent build failures in development
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }
  }
}

// Validate environment variables on import
if (typeof window === 'undefined') {
  // Only validate on server side
  validateEnv()
}

// Export validated environment variables
export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,

  // Computed values
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isClient: typeof window !== 'undefined',
  isServer: typeof window === 'undefined',
}

// Helper function to get Stripe publishable key with fallback for development
export function getStripePublishableKey() {
  const key = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if (!key || key === 'xxx-xxx-xxx' || key.includes('your_key_here')) {
    if (env.isDevelopment) {
      console.warn(
        '⚠️  Stripe publishable key not configured. Checkout will not work.\n' +
        '   Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local file.'
      )
      return null
    }
    throw new Error('Stripe publishable key is required in production')
  }

  return key
}

export default env
