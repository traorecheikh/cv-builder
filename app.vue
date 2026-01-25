<script setup lang="ts">
import { useTheme } from './composables/useTheme'
import { onBeforeUnmount } from 'vue'

// Manual imports to ensure component availability
import NavBar from '~/components/NavBar.vue'
import BackToTop from '~/components/ui/BackToTop.vue'
import Toast from '~/components/ui/Toast.vue'

useTheme()

useSeoMeta({
  title: 'Makhmadane LO - Portfolio',
  ogTitle: 'Makhmadane LO - Portfolio',
  description: 'Professional Portfolio',
  ogDescription: 'Professional Portfolio of Makhmadane LO',
  ogImage: '/LIC.png',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  definePerson({
    name: 'Makhmadane LO',
    image: '/profile.jpg',
    sameAs: [
      'https://www.linkedin.com/in/makhmadane-lo/',
    ]
  })
])

if (process.client) {
  const beforeUnloadHandler = (e: BeforeUnloadEvent) => undefined

  if ('onpageshow' in window) {
    window.addEventListener('pageshow', (e) => {
      if ((e as PageTransitionEvent).persisted) { /* restore if needed */ }
    })
  }

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler)
  })
}

// Wake up Strapi backend on initialization (Render cold start)
onMounted(() => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapi?.url || 'https://lic-strapi.onrender.com'
  
  // Fire and forget request to wake up the server
  fetch(`${strapiUrl}/api/articles?pagination[limit]=1`)
    .then(() => console.log('🚀 Strapi Wake-up Call Sent'))
    .catch(err => console.log('💤 Strapi Wake-up Call Failed (Normal if CORS or network issue, server will still wake)', err))
})
</script>

<template>
  <div id="app" class="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300">
    <NavBar />

    <main class="pt-20">
      <NuxtPage />
    </main>

    <!-- Components placed directly in app shell -->
    <BackToTop />
    <Toast />
  </div>
</template>

<style scoped></style>