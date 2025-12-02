<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X, Download, Moon, Sun } from 'lucide-vue-next'
import { usePortfolioStore } from '../stores/portfolio'
import { useTheme } from '../composables/useTheme'
import ScrollProgress from './ui/ScrollProgress.vue'
import CVDownloadModal from './CVDownloadModal.vue'

const menuOpen = ref(false)
const showCVModal = ref(false)
const portfolioStore = usePortfolioStore()
const { isDark, toggleTheme } = useTheme()

const navItems = [
  { name: 'Accueil', href: '/#' },
  { name: 'Expérience', href: '/#experience' },
  { name: 'Éducation', href: '/#education' },
  { name: 'Compétences', href: '/#skills' },
  { name: 'Certifications', href: '/#certifications' },
  { name: 'Enseignement', href: '/#enseignement' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/#contact' },
]

const handleCVClick = () => {
  showCVModal.value = true
  menuOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-bg-secondary/95 backdrop-blur-2xl border-b border-border-color shadow-lg transition-colors duration-300"
  >
    <ScrollProgress />
    <div class="w-full px-lg md:px-2xl">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-md no-underline">
          <span class="font-bold text-lg text-text-primary transition-colors duration-300"
            >{{ portfolioStore.personalInfo.firstName }}
            {{ portfolioStore.personalInfo.lastName }}</span
          >
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-2xl">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            :class="[
              'px-lg py-sm rounded-lg transition-all duration-300 no-underline font-medium text-sm hover:text-primary-blue hover:bg-bg-tertiary/50',
              'text-text-secondary',
            ]"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- CTA Button & Mobile Menu Toggle -->
        <div class="flex items-center gap-md">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-sm text-text-secondary hover:bg-bg-tertiary rounded-lg transition-all duration-300 hover:text-primary-blue"
            aria-label="Toggle theme"
            title="Basculer le thème"
          >
            <Moon v-if="isDark" class="w-5 h-5" />
            <Sun v-else class="w-5 h-5" />
          </button>

          <button
            @click="handleCVClick"
            class="hidden sm:flex items-center gap-sm px-xl py-sm bg-primary-orange text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-card"
          >
            <Download class="w-4 h-4" />
            <span>Mon CV</span>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden p-sm text-text-secondary hover:bg-bg-tertiary rounded-lg transition-colors duration-300"
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
          class="md:hidden pb-lg border-t border-bg-tertiary space-y-sm bg-bg-secondary/98 backdrop-blur-lg shadow-lg"
        >
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            :class="[
              'block px-lg py-md rounded-lg transition-all duration-300 no-underline font-medium text-text-primary hover:text-primary-blue hover:bg-bg-tertiary',
            ]"
            @click="menuOpen = false"
          >
            {{ item.name }}
          </a>
          <button
            @click="handleCVClick"
            class="w-full flex items-center justify-center gap-sm px-lg py-md bg-primary-orange text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-soft"
          >
            <Download class="w-4 h-4" />
            Télécharger Mon CV
          </button>
        </div>
      </transition>
    </div>

    <Teleport to="body">
      <CVDownloadModal v-if="showCVModal" @close="showCVModal = false" />
    </Teleport>
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