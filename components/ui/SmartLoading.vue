<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps({
  messages: {
    type: Array as PropType<string[]>,
    default: () => [
      'Connexion au serveur...',
      'Récupération des données...',
      'Le serveur démarre (environ 30s)...',
      'Chargement des articles...',
      'Finalisation...'
    ]
  },
  interval: {
    type: Number,
    default: 3000
  }
})

const currentMessageIndex = ref(0)
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % props.messages.length
  }, props.interval)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 space-y-4 text-center">
    <div class="relative">
      <div class="absolute inset-0 bg-primary-blue/20 rounded-full blur-xl animate-pulse"></div>
      <Loader2 class="w-12 h-12 text-primary-orange animate-spin relative z-10" />
    </div>
    
    <transition name="fade" mode="out-in">
      <p :key="currentMessageIndex" class="text-text-secondary font-medium min-h-[1.5rem] animate-pulse">
        {{ messages[currentMessageIndex] }}
      </p>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
