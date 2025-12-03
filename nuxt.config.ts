// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false }, // Disable in production to reduce bundle
  ssr: true,

  modules: ['@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    contactReceiver: process.env.CONTACT_RECEIVER,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      title: 'Portfolio - Makhmadane LO',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional Portfolio' },
        { name: 'theme-color', content: '#1171B8' },
        { name: 'color-scheme', content: 'dark light' },
        { httpEquiv: 'x-ua-compatible', content: 'IE=edge' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Preload critical fonts
        { rel: 'preload', as: 'font', href: '/fonts/Montserrat/Montserrat-VariableFont_wght.ttf', type: 'font/ttf', crossorigin: 'anonymous' },
        // DNS prefetch
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        // Preconnect to API
        { rel: 'preconnect', href: '/api' },
        // Preload critical CSS
        { rel: 'preload', as: 'style', href: '/fonts/Montserrat/Montserrat-VariableFont_wght.ttf' },
      ]
    }
  },

  // Build optimizations
  build: {
    transpile: [],
    minify: 'terser',
    terser: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'pinia'],
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/articles'],
    },
    minify: true,
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    routeRules: {
      // Aggressive caching for static assets
      '/**/*.{js,css,woff,woff2,ttf,eot,svg,png,jpg,jpeg,gif,webp}': {
        cache: {
          maxAge: 60 * 60 * 24 * 365, // 1 year
        },
      },
      // Moderate caching for pages
      '/**': {
        cache: {
          maxAge: 60 * 60, // 1 hour
        },
      },
      // No cache for API routes
      '/api/**': {
        cache: false,
      },
    },
  },

  // Route rules for caching
  routeRules: {
    '/api/**': { cache: false },
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash].[ext]',
        },
      },
    },
    optimization: {
      minimize: true,
    },
  },
})
