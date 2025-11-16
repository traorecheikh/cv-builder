<script setup lang="ts">
import { useToast } from '../../composables/useToast'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

const { toasts, remove } = useToast()

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
}

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
}
</script>

<template>
  <div class="fixed bottom-lg right-lg z-40 space-y-sm">
    <transition-group
      name="toast"
      tag="div"
      class="space-y-sm"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-start gap-md p-lg rounded-lg border max-w-sm shadow-soft animate-slideUp',
          colorMap[toast.type],
        ]"
      >
        <component
          :is="iconMap[toast.type]"
          class="w-5 h-5 mt-sm flex-shrink-0"
          :class="iconColorMap[toast.type]"
        />
        <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>
        <button
          @click="remove(toast.id)"
          class="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
