import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.strapi?.url || 'https://lic-strapi.onrender.com'
  
  try {
    // Fetch articles from Strapi
    // We only need slug and updatedAt for the sitemap
    const response: any = await $fetch(`${strapiUrl}/api/articles?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=1000`)
    
    // Check if data exists
    if (!response || !response.data) {
      console.error('Sitemap: No data received from Strapi')
      return []
    }

    // Map Strapi entries to sitemap format
    return response.data.map((article: any) => {
      // Handle both flattened (Strapi v5/plugin) and nested attributes (Strapi v4)
      const attributes = article.attributes || article
      const slug = attributes.slug
      const updatedAt = attributes.updatedAt

      if (!slug) return null

      return {
        loc: `/articles/${slug}`,
        lastmod: updatedAt,
        // Optional: images could be added here if needed
        changefreq: 'monthly',
        priority: 0.7
      }
    }).filter(Boolean) // Remove any null entries

  } catch (e) {
    console.error('Sitemap: Error fetching articles from Strapi', e)
    return []
  }
})
