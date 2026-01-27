// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@pinia/nuxt', '@nuxtjs/strapi', '@nuxtjs/seo', '@nuxtjs/sitemap', 'nuxt-schema-org'],

  sitemap: {
    enabled: true,
    zeroRuntime: true,
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://makhmadane-lo-portfolio.vercel.app',
    name: 'Makhmadane LO - Portfolio',

  ogImage: {
    compatibility: {
      prerender: {
        chromium: false
      }
    }
  },

  strapi: {
    url: process.env.STRAPI_URL || 'https://lic-strapi.onrender.com',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },

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
        { name: 'google-site-verification', content: '4Tkm9W_O2NiUzmgdI2dHuZhqQeCVGf9mQdoK1VWuRU8' },
        { name: 'description', content: 'Professional Portfolio' },
        { name: 'theme-color', content: '#1171B8' },
        { name: 'color-scheme', content: 'dark light' },
        { httpEquiv: 'x-ua-compatible', content: 'IE=edge' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/LIC.png' },
        // Preload critical fonts
        { rel: 'preload', as: 'font', href: '/fonts/Montserrat/Montserrat-VariableFont_wght.ttf', type: 'font/ttf', crossorigin: 'anonymous' },
        // Preload LCP image (WebP preferred for modern browsers, JPEG as fallback)
        { rel: 'preload', as: 'image', href: '/profile.webp', type: 'image/webp' },
        { rel: 'preload', as: 'image', href: '/profile.jpg', type: 'image/jpeg' },
        // DNS prefetch
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      ]
    }
  },

  // Build optimizations
  build: {
    transpile: ['qs'],
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'pinia'],
        },
      },
    },
  },

  vite: {
    build: {
      cssCodeSplit: true,
    },
    optimizeDeps: {
      include: ['qs'],
    },
    resolve: {
      alias: {
        qs: 'qs/lib/index.js',
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      failOnError: false, 
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
      // Cache CSS and image files only (not JS)
      '/**/*.{css,woff,woff2,ttf,eot,svg,png,jpg,jpeg,gif,webp}': {
        cache: {
          maxAge: 60 * 60 * 24 * 365, // 1 year
        },
      },
      // No cache for API routes
      '/api/**': {
        cache: false,
      },
    },
  },
})