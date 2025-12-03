// Monitor Core Web Vitals for performance tracking
export default defineNuxtPlugin(() => {
  if (!process.client) return

  // Only load in production
  if (process.env.NODE_ENV !== 'production') return

  // Monitor Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.renderTime || lastEntry.loadTime
        console.debug('LCP:', lcp)
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })

      // Disconnect observer after first contentful paint
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        if (entries.some(entry => entry.name === 'first-contentful-paint')) {
          paintObserver.disconnect()
        }
      })

      paintObserver.observe({ entryTypes: ['paint'] })
    } catch (e) {
      // Gracefully handle if API is not available
    }
  }

  // Monitor Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
      })

      clsObserver.observe({ type: 'layout-shift', buffered: true })

      // Log CLS periodically
      setInterval(() => {
        if (clsValue > 0) {
          console.debug('CLS:', clsValue)
        }
      }, 30000)
    } catch (e) {
      // Gracefully handle if API is not available
    }
  }

  // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
  if ('PerformanceObserver' in window) {
    try {
      const interactionObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.debug('INP/FID:', {
            name: entry.name,
            duration: (entry as any).duration,
          })
        }
      })

      interactionObserver.observe({ type: 'first-input', buffered: true })
      interactionObserver.observe({ type: 'interaction', buffered: true })
    } catch (e) {
      // Gracefully handle if API is not available
    }
  }
})
