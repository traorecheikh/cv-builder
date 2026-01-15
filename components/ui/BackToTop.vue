<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    @click="scrollToTop"
    :class="[
      'fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-full text-white shadow-card hover:shadow-lg hover:scale-110 transition-all duration-300 z-50 group',
      isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
    ]"
    style="background-color: #C2410C;"
    aria-label="Retour en haut"
  >
    <ArrowUp class="w-6 h-6 group-hover:animate-bounce" />
  </button>
</template>

<style scoped>
/* Scoped block to ensure proper SFC parsing */
</style>
