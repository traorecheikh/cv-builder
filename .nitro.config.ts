import type { NitroConfig } from 'nitropack'

export default {
  // Prerender main routes only (don't crawl to avoid API routes)
  prerender: {
    crawlLinks: false,
    routes: ['/', '/articles'],
  },

  minify: true,

  compressPublicAssets: {
    gzip: true,
    brotli: true,
  },

  // Enable precompression of assets
  rollupConfig: {
    output: {
      compact: true,
    },
  },

  // Performance optimizations
  timing: false,

  // API route caching
  routeRules: {
    // Cache HTML pages
    '/**': {
      cache: {
        maxAge: 60 * 60, // 1 hour
        s_maxage: 60 * 60,
      },
    },
    // API routes: no cache
    '/api/**': {
      cache: false,
    },
    // Static assets: 1 year cache
    '/**/*.{js,css,woff,woff2,ttf,eot,svg,png,jpg,jpeg,gif,webp}': {
      cache: {
        maxAge: 60 * 60 * 24 * 365,
        s_maxage: 60 * 60 * 24 * 365,
      },
    },
  },

  // Disable sourceMap in production
  sourceMap: process.env.NODE_ENV !== 'production',
} satisfies NitroConfig
