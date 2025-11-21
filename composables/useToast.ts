import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const add = (message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id = Date.now().toString()
    const toast: Toast = { id, message, type, duration }

    toasts.value.push(toast)

    if (duration) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, duration?: number) => add(message, 'success', duration)
  const error = (message: string, duration?: number) => add(message, 'error', duration)
  const info = (message: string, duration?: number) => add(message, 'info', duration)
  const warning = (message: string, duration?: number) => add(message, 'warning', duration)

  return {
    toasts,
    add,
    remove,
    success,
    error,
    info,
    warning,
  }
}
