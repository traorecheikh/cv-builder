import { ref } from 'vue'

export function useImageLoad() {
  const isLoaded = ref(false)
  const hasError = ref(false)

  const handleLoad = () => {
    isLoaded.value = true
    hasError.value = false
  }

  const handleError = () => {
    hasError.value = true
    isLoaded.value = false
  }

  return {
    isLoaded,
    hasError,
    handleLoad,
    handleError,
  }
}
