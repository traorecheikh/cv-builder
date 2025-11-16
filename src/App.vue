<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BackToTop from './components/ui/BackToTop.vue'
import Toast from './components/ui/Toast.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-bg-primary">
    <NavBar />

    <main class="pt-20">
      <RouterView />
    </main>

    <BackToTop />
    <Toast />
  </div>
</template>

<style scoped></style>
