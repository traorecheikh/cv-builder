<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { ExternalLink, Github, Star } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()

// Featured project badge
const featuredProjects = ['1'] // IDs of featured projects
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
      <h1 class="text-4xl md:text-5xl font-bold text-accent-dark-gray mb-lg">
        Projets
        <span class="text-primary-orange">Réalisés</span>
      </h1>
      <p class="text-lg text-accent-text-secondary max-w-2xl">
        Des projets d'envergure en startup et en entreprise, showcasing expertise et innovation.
      </p>
    </section>

    <!-- Projects Grid -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
      <div class="space-y-2xl">
        <div
          v-for="(project, index) in portfolioStore.projects"
          :key="project.id"
          class="group relative bg-white border-2 border-accent-light-gray rounded-xl overflow-hidden hover:border-primary-blue hover:shadow-card transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Featured Badge -->
          <div
            v-if="featuredProjects.includes(project.id)"
            class="absolute top-4 right-4 z-10 flex items-center gap-sm px-lg py-sm bg-primary-orange text-white rounded-full text-xs font-semibold"
          >
            <Star class="w-4 h-4 fill-current" />
            Projet Vedette
          </div>

          <!-- Project Image Placeholder -->
          <div class="w-full h-48 bg-gradient-to-br from-primary-blue/10 to-primary-orange/10 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <div class="text-6xl font-bold text-primary-blue/20">
              {{ project.name.charAt(0) }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
          </div>

          <!-- Header with dates -->
          <div class="p-2xl border-b-2 border-accent-light-gray">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-lg">
              <div>
                <span class="text-sm text-primary-blue font-semibold uppercase tracking-wide">
                  Projet #{{ index + 1 }}
                </span>
                <h3 class="text-2xl md:text-3xl font-bold text-accent-dark-gray mt-sm group-hover:text-primary-blue transition-colors">
                  {{ project.name }}
                </h3>
              </div>
              <div class="text-sm text-accent-text-secondary font-medium">
                {{ project.startDate }} - {{ project.endDate }}
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-2xl">
            <p class="text-accent-text-secondary leading-relaxed mb-lg">
              {{ project.description }}
            </p>

            <!-- Technologies -->
            <div class="mb-lg">
              <p class="text-sm font-semibold text-accent-dark-gray mb-sm">Stack technologique :</p>
              <div class="flex flex-wrap gap-sm">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-md py-sm bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium border border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/20 transition-all duration-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Link -->
            <div class="pt-lg border-t border-accent-light-gray">
              <a
                v-if="project.link !== '#'"
                :href="project.link"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-sm text-primary-blue font-semibold hover:text-primary-orange transition-colors duration-300 no-underline"
              >
                <Github class="w-5 h-5" />
                Voir le Code
                <ExternalLink class="w-4 h-4" />
              </a>
              <span v-else class="inline-flex items-center gap-sm text-accent-text-secondary">
                <span class="text-sm">Code privé</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-24 bg-primary-orange rounded-xl p-2xl md:p-3xl text-white text-center">
        <h2 class="text-3xl font-bold mb-lg">Plus de projets sur GitHub</h2>
        <p class="text-white/90 mb-2xl max-w-2xl mx-auto">
          Consultez mon profil GitHub pour découvrir d'autres projets et contributions open-source.
        </p>
        <a
          href="https://github.com/traorecheikh"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-sm px-2xl py-lg bg-white text-primary-orange font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300"
        >
          <Github class="w-5 h-5" />
          Visiter mon GitHub
          <ExternalLink class="w-4 h-4" />
        </a>
      </div>
    </section>
  </div>
</template>
