<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BackToTop from './components/ui/BackToTop.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-white">
    <NavBar />
    
    <main class="pt-20">
      <RouterView />
    </main>

    <BackToTop />
  </div>
</template>

<style scoped></style>
