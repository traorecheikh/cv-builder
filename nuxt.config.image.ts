// Image optimization configuration for Nuxt Image (future use)
// This configuration can be extended when integrating @nuxt/image for automatic optimization

export const imageOptimizationConfig = {
  // Image sizes for responsive images
  sizes: [320, 640, 1024, 1280, 1920],

  // Format preferences (WebP with fallback to JPEG)
  formats: ['webp', 'jpeg'],

  // Default image quality (80 is a good balance for performance)
  quality: 80,

  // Enable caching for optimized images
  caching: true,

  // Cache duration: 1 year
  cacheDuration: 60 * 60 * 24 * 365,
}
