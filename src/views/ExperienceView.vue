<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { Calendar, MapPin, ExternalLink } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
      <h1 class="text-4xl md:text-5xl font-bold text-accent-dark-gray mb-lg">
        Expérience
        <span class="text-primary-orange">Professionnelle</span>
      </h1>
      <p class="text-lg text-accent-text-secondary max-w-2xl">
        Un parcours diversifié dans le développement backend, DevOps et l'intégration logicielle.
      </p>
    </section>

    <!-- Experience Timeline -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
      <div class="space-y-lg">
        <div
          v-for="(exp, index) in portfolioStore.experiences"
          :key="exp.id"
          class="relative"
        >
          <!-- Timeline dot and line -->
          <div
            v-if="index !== portfolioStore.experiences.length - 1"
            class="absolute left-6 top-24 w-1 h-24 bg-gradient-to-b from-primary-blue to-accent-light-gray"
          ></div>
          <div class="absolute left-0 top-8 w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center border-4 border-white">
            <span class="text-white text-lg">{{ index + 1 }}</span>
          </div>

          <!-- Card -->
          <div class="ml-20 bg-white border-2 border-accent-light-gray rounded-xl p-2xl hover:border-primary-blue transition-all duration-300 hover:shadow-card">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-lg mb-lg">
              <div>
                <h3 class="text-2xl font-bold text-accent-dark-gray">{{ exp.role }}</h3>
                <div class="flex items-center gap-md mt-sm">
                  <a
                    v-if="exp.website"
                    :href="exp.website"
                    target="_blank"
                    rel="noopener"
                    class="text-primary-blue font-semibold hover:underline text-lg"
                  >
                    {{ exp.company }}
                    <ExternalLink class="inline w-4 h-4 ml-sm" />
                  </a>
                  <span v-else class="text-primary-blue font-semibold text-lg">{{ exp.company }}</span>
                </div>
              </div>

              <!-- Badge -->
              <div
                v-if="exp.current"
                class="px-xl py-sm bg-accent-green/10 text-accent-green font-semibold rounded-full text-sm self-start md:self-auto"
              >
                En cours
              </div>
            </div>

            <!-- Meta Info -->
            <div class="flex flex-col sm:flex-row gap-2xl mb-lg text-accent-text-secondary text-sm">
              <div class="flex items-center gap-sm">
                <Calendar class="w-4 h-4 text-primary-blue" />
                {{ exp.startDate }} - {{ exp.endDate }}
              </div>
              <div class="flex items-center gap-sm">
                <MapPin class="w-4 h-4 text-primary-blue" />
                {{ exp.location }}
              </div>
            </div>

            <!-- Description -->
            <ul class="space-y-sm">
              <li
                v-for="(desc, idx) in exp.description"
                :key="idx"
                class="flex gap-md text-accent-text-secondary leading-relaxed"
              >
                <span class="text-primary-orange font-bold mt-sm flex-shrink-0">•</span>
                <span>{{ desc }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
