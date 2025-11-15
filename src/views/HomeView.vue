<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { ArrowRight, Briefcase, GraduationCap, Wrench, Rocket } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import SocialLinks from '../components/ui/SocialLinks.vue'
import AvailabilityBadge from '../components/ui/AvailabilityBadge.vue'

const portfolioStore = usePortfolioStore()
const router = useRouter()
</script>

<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative max-w-6xl mx-auto px-lg md:px-2xl py-20 md:py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-gradient-to-br from-accent-light-blue via-white to-white opacity-50 -z-10"></div>
      <div class="absolute top-20 right-10 w-72 h-72 bg-primary-blue/5 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-10 left-10 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl -z-10"></div>

      <div class="grid md:grid-cols-2 gap-2xl items-center">
        <div class="space-y-lg order-2 md:order-1">
          <AvailabilityBadge />

          <div class="space-y-sm">
            <p class="text-primary-blue font-semibold text-sm md:text-base tracking-wide uppercase">
              Développeur Backend & DevOps
            </p>
            <h1 class="text-5xl md:text-6xl font-bold text-accent-dark-gray leading-tight">
              {{ portfolioStore.personalInfo.firstName }}
              <span class="text-primary-orange block mt-sm">{{ portfolioStore.personalInfo.lastName }}</span>
            </h1>
          </div>

          <p class="text-lg text-accent-text-secondary leading-relaxed max-w-lg">
            {{ portfolioStore.personalInfo.bio }}
          </p>

          <SocialLinks />

          <div class="flex flex-col sm:flex-row gap-lg pt-lg">
            <button
              @click="router.push('/experience')"
              class="inline-flex items-center justify-center gap-sm px-2xl py-lg bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105"
            >
              Voir Mon Parcours
              <ArrowRight class="w-5 h-5" />
            </button>
            <a
              :href="`mailto:${portfolioStore.personalInfo.email}`"
              class="inline-flex items-center justify-center gap-sm px-2xl py-lg border-2 border-primary-blue text-primary-blue font-semibold rounded-lg hover:bg-accent-light-blue transition-all duration-300"
            >
              Me Contacter
            </a>
          </div>
        </div>

        <!-- Profile Photo Placeholder & Stats -->
        <div class="order-1 md:order-2 space-y-lg">
          <!-- Profile Photo -->
          <div class="relative w-64 h-64 mx-auto md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary-blue to-primary-orange p-1 shadow-card hover:scale-105 transition-transform duration-300">
            <div class="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 mx-auto bg-accent-light-blue rounded-full flex items-center justify-center mb-lg">
                  <span class="text-6xl font-bold text-primary-blue">
                    {{ portfolioStore.personalInfo.firstName.charAt(0) }}{{ portfolioStore.personalInfo.lastName.charAt(0) }}
                  </span>
                  <img src="/profile.png" alt="Profile photo" class="absolute inset-0 w-full h-full object-cover z-0" @error="(e) => (e.target.style.display = 'none')" />
                </div>
                <p class="text-accent-text-secondary text-sm">Photo professionnelle</p>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-md">
            <div class="bg-white rounded-xl p-lg border-2 border-accent-light-gray hover:border-primary-blue transition-all duration-300 shadow-soft hover:shadow-card">
              <p class="text-3xl font-bold text-primary-blue">3+</p>
              <p class="text-accent-text-secondary text-sm mt-sm">Années d'Exp.</p>
            </div>
            <div class="bg-white rounded-xl p-lg border-2 border-accent-light-gray hover:border-primary-orange transition-all duration-300 shadow-soft hover:shadow-card">
              <p class="text-3xl font-bold text-primary-orange">20+</p>
              <p class="text-accent-text-secondary text-sm mt-sm">Projets Réalisés</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="bg-accent-light-gray py-20 md:py-24">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-accent-dark-gray mb-2xl text-center">
          Explorer Mon Portfolio
        </h2>

        <div class="grid md:grid-cols-4 gap-lg">
          <router-link
            to="/experience"
            class="bg-white p-2xl rounded-xl hover:shadow-card transition-all duration-300 border border-accent-light-gray hover:border-primary-blue no-underline group"
          >
            <div class="w-12 h-12 bg-accent-light-blue rounded-lg flex items-center justify-center mb-lg group-hover:bg-primary-orange/20 transition-colors">
              <Briefcase class="w-6 h-6 text-primary-blue group-hover:text-primary-orange transition-colors" />
            </div>
            <h3 class="font-semibold text-accent-dark-gray mb-sm">Expérience</h3>
            <p class="text-sm text-accent-text-secondary">{{ portfolioStore.experiences.length }} postes</p>
          </router-link>

          <router-link
            to="/education"
            class="bg-white p-2xl rounded-xl hover:shadow-card transition-all duration-300 border border-accent-light-gray hover:border-primary-blue no-underline group"
          >
            <div class="w-12 h-12 bg-accent-light-blue rounded-lg flex items-center justify-center mb-lg group-hover:bg-primary-orange/20 transition-colors">
              <GraduationCap class="w-6 h-6 text-primary-blue group-hover:text-primary-orange transition-colors" />
            </div>
            <h3 class="font-semibold text-accent-dark-gray mb-sm">Éducation</h3>
            <p class="text-sm text-accent-text-secondary">{{ portfolioStore.education.length }} diplômes</p>
          </router-link>

          <router-link
            to="/skills"
            class="bg-white p-2xl rounded-xl hover:shadow-card transition-all duration-300 border border-accent-light-gray hover:border-primary-blue no-underline group"
          >
            <div class="w-12 h-12 bg-accent-light-blue rounded-lg flex items-center justify-center mb-lg group-hover:bg-primary-orange/20 transition-colors">
              <Wrench class="w-6 h-6 text-primary-blue group-hover:text-primary-orange transition-colors" />
            </div>
            <h3 class="font-semibold text-accent-dark-gray mb-sm">Compétences</h3>
            <p class="text-sm text-accent-text-secondary">40+ technologies</p>
          </router-link>

          <router-link
            to="/projects"
            class="bg-white p-2xl rounded-xl hover:shadow-card transition-all duration-300 border border-accent-light-gray hover:border-primary-blue no-underline group"
          >
            <div class="w-12 h-12 bg-accent-light-blue rounded-lg flex items-center justify-center mb-lg group-hover:bg-primary-orange/20 transition-colors">
              <Rocket class="w-6 h-6 text-primary-blue group-hover:text-primary-orange transition-colors" />
            </div>
            <h3 class="font-semibold text-accent-dark-gray mb-sm">Projets</h3>
            <p class="text-sm text-accent-text-secondary">{{ portfolioStore.projects.length }} réalisations</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl py-20 md:py-24">
      <div class="bg-primary-blue rounded-xl p-2xl md:p-3xl text-white text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-lg">Intéressé par une collaboration?</h2>
        <p class="text-white/90 mb-2xl max-w-2xl mx-auto">
          N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
        </p>
        <a
          :href="`mailto:${portfolioStore.personalInfo.email}`"
          class="inline-block px-2xl py-lg bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-soft hover:shadow-card"
        >
          Envoyer un Email
        </a>
      </div>
    </section>
  </div>
</template>
