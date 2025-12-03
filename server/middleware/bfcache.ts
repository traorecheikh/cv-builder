export default defineEventHandler((event) => {
  // Remove headers that block back/forward cache
  const headers = {
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  }

  Object.entries(headers).forEach(([key, value]) => {
    setHeader(event, key, value)
  })

  // Prevent unload handlers that block bfcache
  // This is handled via app.vue and proper cleanup in composables
})
