<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
  scrollProgress.value = Math.min(scrollPercentage, 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-1 bg-accent-light-gray z-50">
    <div
      class="h-full bg-gradient-to-r from-primary-blue to-primary-orange transition-all duration-300"
      :style="{ width: `${scrollProgress}%` }"
    />
  </div>
</template>
