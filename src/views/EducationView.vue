<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { Calendar, MapPin, Trophy, Award } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
      <h1 class="text-4xl md:text-5xl font-bold text-accent-dark-gray mb-lg">
        Formation
        <span class="text-primary-orange">Académique</span>
      </h1>
      <p class="text-lg text-accent-text-secondary max-w-2xl">
        Licence en Génie Logiciel et formation scientifique solide.
      </p>
    </section>

    <!-- Education Cards -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
      <div class="space-y-lg">
        <div
          v-for="(edu, index) in portfolioStore.education"
          :key="edu.id"
          class="bg-gradient-to-br from-accent-light-blue to-white border-2 border-accent-light-gray rounded-xl p-2xl hover:border-primary-blue transition-all duration-300 hover:shadow-card"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-lg mb-lg">
            <div>
              <div class="flex items-center gap-sm mb-sm">
                <Trophy
                  v-if="index === 0"
                  class="w-5 h-5 text-primary-orange"
                />
                <span class="text-sm font-semibold text-primary-blue uppercase tracking-wide">
                  {{ edu.degree }}
                </span>
              </div>
              <h3 class="text-2xl font-bold text-accent-dark-gray">
                {{ edu.institution }}
              </h3>
              <p class="text-accent-text-secondary mt-sm">
                {{ edu.field }}
              </p>
            </div>
          </div>

          <!-- Meta Info -->
          <div class="flex flex-col sm:flex-row gap-2xl mb-lg text-accent-text-secondary text-sm">
            <div class="flex items-center gap-sm">
              <Calendar class="w-4 h-4 text-primary-blue" />
              {{ edu.startDate }} - {{ edu.endDate }}
            </div>
            <div class="flex items-center gap-sm">
              <MapPin class="w-4 h-4 text-primary-blue" />
              {{ edu.location }}
            </div>
          </div>

          <!-- Highlights -->
          <div v-if="edu.highlights && edu.highlights.length" class="space-y-sm">
            <div
              v-for="(highlight, idx) in edu.highlights"
              :key="idx"
              class="flex gap-md items-start"
            >
              <Award class="w-5 h-5 text-primary-orange mt-sm flex-shrink-0" />
              <span class="text-accent-text-secondary">{{ highlight }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Languages Section -->
      <div class="mt-24">
        <h2 class="text-3xl font-bold text-accent-dark-gray mb-2xl">
          Compétences
          <span class="text-primary-orange">Linguistiques</span>
        </h2>

        <div class="grid md:grid-cols-3 gap-lg">
          <div
            v-for="lang in portfolioStore.languages"
            :key="lang.language"
            class="bg-white border-2 border-accent-light-gray rounded-xl p-2xl hover:border-primary-blue transition-all duration-300"
          >
            <h3 class="text-xl font-bold text-accent-dark-gray mb-lg">
              {{ lang.language }}
              <span v-if="lang.mother" class="text-sm text-primary-orange ml-sm">Maternelle</span>
            </h3>
            <div class="space-y-sm">
              <div class="flex justify-between items-center">
                <span class="text-sm text-accent-text-secondary">Compréhension</span>
                <span class="font-semibold text-primary-blue">{{ lang.comprehension }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-accent-text-secondary">Expression orale</span>
                <span class="font-semibold text-primary-blue">{{ lang.speaking }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-accent-text-secondary">Écrit</span>
                <span class="font-semibold text-primary-blue">{{ lang.writing }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
