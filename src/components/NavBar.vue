<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X, Download } from 'lucide-vue-next'
import { usePortfolioStore } from '../stores/portfolio'
import { generateMindblowingCV } from '../utils/cvGenerator'
import ScrollProgress from './ui/ScrollProgress.vue'

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const isGenerating = ref(false)
const portfolioStore = usePortfolioStore()

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Expérience', path: '/experience' },
  { name: 'Éducation', path: '/education' },
  { name: 'Compétences', path: '/skills' },
  { name: 'Projets', path: '/projects' },
]

const isActive = (path: string) => route.path === path

const handleCVDownload = async () => {
  if (isGenerating.value) return
  
  isGenerating.value = true
  menuOpen.value = false
  
  try {
    const pdf = await generateMindblowingCV(
      portfolioStore.personalInfo,
      portfolioStore.experiences,
      portfolioStore.education,
      portfolioStore.projects,
      portfolioStore.skills,
      portfolioStore.languages
    )
    
    pdf.save(`${portfolioStore.personalInfo.firstName}_${portfolioStore.personalInfo.lastName}_CV_2025.pdf`)
  } catch (error) {
    console.error('Error generating CV:', error)
    alert('Erreur lors de la génération du CV')
  } finally {
    isGenerating.value = false
  }
}

const handleNavClick = (path: string) => {
  menuOpen.value = false
  router.push(path)
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-accent-light-gray shadow-soft">
    <ScrollProgress />
    <div class="max-w-6xl mx-auto px-lg md:px-2xl">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-md no-underline">
          <div class="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">C</span>
          </div>
          <span class="hidden sm:inline font-bold text-lg text-accent-dark-gray">CT</span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-2xl">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'px-lg py-sm rounded-lg transition-all duration-300 no-underline font-medium text-sm',
              isActive(item.path)
                ? 'text-primary-blue bg-accent-light-blue'
                : 'text-accent-dark-gray hover:text-primary-blue hover:bg-accent-light-blue',
            ]"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- CTA Button & Mobile Menu Toggle -->
        <div class="flex items-center gap-md">
          <button
            @click="handleCVDownload"
            :disabled="isGenerating"
            class="hidden sm:flex items-center gap-sm px-xl py-sm bg-primary-orange text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-soft hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download class="w-4 h-4" :class="{ 'animate-bounce': isGenerating }" />
            <span>{{ isGenerating ? 'Génération...' : 'Mon CV' }}</span>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden p-sm text-accent-dark-gray hover:bg-accent-light-gray rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Menu v-if="!menuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div
          v-if="menuOpen"
          class="md:hidden pb-lg border-t border-accent-light-gray space-y-sm"
        >
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'block px-lg py-md rounded-lg transition-all duration-300 no-underline font-medium',
              isActive(item.path)
                ? 'text-primary-blue bg-accent-light-blue'
                : 'text-accent-dark-gray hover:text-primary-blue hover:bg-accent-light-gray',
            ]"
            @click="menuOpen = false"
          >
            {{ item.name }}
          </router-link>
          <button
            @click="handleCVDownload"
            :disabled="isGenerating"
            class="w-full flex items-center justify-center gap-sm px-lg py-md bg-primary-orange text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            <Download class="w-4 h-4" :class="{ 'animate-bounce': isGenerating }" />
            {{ isGenerating ? 'Génération...' : 'Télécharger Mon CV' }}
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
