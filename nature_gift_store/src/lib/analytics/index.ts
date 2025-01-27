import { Analytics } from './Analytics'

declare global {
  interface Window {
    analytics: Analytics | undefined
  }
}

let analyticsInstance: Analytics | null = null

const initAnalytics = () => {
  console.log('Initializing analytics...')

  if (typeof window === 'undefined') {
    console.log('Not initializing analytics - server side context')
    return null
  }

  if (!window.analytics) {
    console.log('Creating new analytics instance')
    analyticsInstance = new Analytics()
    window.analytics = analyticsInstance
    return analyticsInstance
  }

  console.log('Analytics instance already exists')
  return window.analytics
}

// Create a function to get/init analytics that we can call from our components
export const getAnalytics = () => {
  console.log('typeof window', typeof window)
  if (typeof window === 'undefined') return null

  if (!window.analytics) {
    return initAnalytics()
  }
  console.log('window.analytics', !!window.analytics)

  return window.analytics
}

// Initialize on import if we're in the browser
if (typeof window !== 'undefined') {
  initAnalytics()
}

export { Analytics }
