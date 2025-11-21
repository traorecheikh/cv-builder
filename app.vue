<script setup lang="ts">
import { useTheme } from './composables/useTheme'

useTheme()
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
