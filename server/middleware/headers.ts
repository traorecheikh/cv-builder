// Set proper cache headers for all assets
export default defineEventHandler((event) => {
  const url = event.node.req.url || ''

  // Cache static assets for 1 year
  if (
    url.match(/\.(js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|webp)(\?|$)/i) ||
    url.includes('/_nuxt/')
  ) {
    setHeader(
      event,
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  }
  // Cache HTML pages for 1 hour
  else if (url.endsWith('.html') || url === '/' || url === '/articles') {
    setHeader(
      event,
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600'
    )
  }
  // No cache for API routes
  else if (url.includes('/api/')) {
    setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
    setHeader(event, 'Pragma', 'no-cache')
    setHeader(event, 'Expires', '0')
  }

  // Add security headers
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
})
