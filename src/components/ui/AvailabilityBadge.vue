<script setup lang="ts">
import { Check } from 'lucide-vue-next'
</script>

<template>
  <div class="inline-flex items-center gap-sm px-lg py-sm bg-accent-green/10 border border-accent-green rounded-full animate-pulse">
    <span class="relative flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-accent-green"></span>
    </span>
    <span class="text-sm font-semibold text-accent-green">Disponible pour de nouvelles opportunités</span>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
