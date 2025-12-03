<script setup lang="ts">
import { useTheme } from './composables/useTheme'
import { onBeforeUnmount } from 'vue'

useTheme()

// Enable back/forward cache by avoiding unload handlers
if (process.client) {
  // Disable problematic unload handlers
  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    // Don't prevent unload for bfcache compatibility
    return undefined
  }

  // Listen for bfcache events
  if ('onpageshow' in window) {
    window.addEventListener('pageshow', (e) => {
      if ((e as PageTransitionEvent).persisted) {
        // Page was restored from bfcache
        // Re-initialize components if needed
      }
    })

    window.addEventListener('pagehide', (e) => {
      if ((e as PageTransitionEvent).persisted) {
        // Page will be stored in bfcache
        // Cleanup if needed
      }
    })
  }

  onBeforeUnmount(() => {
    // Ensure no unload handlers are left attached
    window.removeEventListener('beforeunload', beforeUnloadHandler)
  })
}
</script>

<template>
  <div id="app" class="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300">
    <NavBar />

    <main class="pt-20">
      <NuxtPage />
    </main>

    <BackToTop />
    <Toast />
  </div>
</template>

<style scoped></style>
