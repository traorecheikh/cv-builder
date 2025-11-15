<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { Code2, Lock, Brain, Trello } from 'lucide-vue-next'
import SkillBar from '../components/ui/SkillBar.vue'

const portfolioStore = usePortfolioStore()

interface SkillCategory {
  title: string
  icon: typeof Code2
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Développement Applicatif',
    icon: Code2,
    skills: portfolioStore.skills.applicativeDevelopment,
  },
  {
    title: 'Sécurité & Cloud',
    icon: Lock,
    skills: portfolioStore.skills.securityCloud,
  },
  {
    title: 'Intelligence Artificielle & ML',
    icon: Brain,
    skills: portfolioStore.skills.aiML,
  },
  {
    title: 'Méthodologies & Gestion',
    icon: Trello,
    skills: portfolioStore.skills.methodology,
  },
]

// Top skills with proficiency levels
const topSkills = [
  { name: 'SpringBoot', level: 90 },
  { name: 'Docker', level: 85 },
  { name: 'Node.js', level: 88 },
  { name: 'Vue.js', level: 85 },
  { name: 'Azure', level: 75 },
  { name: 'PostgreSQL', level: 80 },
]
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
      <h1 class="text-4xl md:text-5xl font-bold text-accent-dark-gray mb-lg">
        Compétences
        <span class="text-primary-orange">Techniques</span>
      </h1>
      <p class="text-lg text-accent-text-secondary max-w-2xl">
        Plus de 40 technologies et outils maîtrisés, couvrant le développement, DevOps, sécurité et IA.
      </p>
    </section>

    <!-- Top Skills with Proficiency -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl pb-12">
      <h2 class="text-2xl font-bold text-accent-dark-gray mb-2xl">Compétences Principales</h2>
      <div class="grid md:grid-cols-2 gap-2xl bg-white p-2xl rounded-xl border-2 border-accent-light-gray shadow-card">
        <SkillBar
          v-for="skill in topSkills"
          :key="skill.name"
          :skill="skill"
        />
      </div>
    </section>

    <!-- Skills Categories -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
      <div class="grid md:grid-cols-2 gap-2xl">
        <div
          v-for="category in skillCategories"
          :key="category.title"
          class="bg-accent-light-gray rounded-xl p-2xl hover:shadow-card transition-all duration-300 border border-accent-light-gray hover:border-primary-blue"
        >
          <div class="flex items-center gap-lg mb-lg">
            <component :is="category.icon" class="w-8 h-8 text-primary-blue" />
            <h3 class="text-2xl font-bold text-accent-dark-gray">{{ category.title }}</h3>
          </div>

          <!-- Skills Badges -->
          <div class="flex flex-wrap gap-md">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="px-lg py-sm bg-white rounded-full text-sm font-semibold text-accent-dark-gray border-2 border-primary-blue/30 hover:border-primary-blue hover:bg-accent-light-blue transition-all duration-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Skills Summary Stats -->
      <div class="mt-24 bg-gradient-to-r from-primary-blue to-primary-blue/80 rounded-xl p-2xl md:p-3xl text-white">
        <h2 class="text-3xl font-bold mb-2xl">Résumé des Compétences</h2>
        <div class="grid md:grid-cols-4 gap-2xl">
          <div>
            <p class="text-4xl font-bold">{{ skillCategories.length }}</p>
            <p class="text-white/80 mt-sm">Catégories</p>
          </div>
          <div>
            <p class="text-4xl font-bold">
              {{
                skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)
              }}
            </p>
            <p class="text-white/80 mt-sm">Technologies</p>
          </div>
          <div>
            <p class="text-4xl font-bold">10+</p>
            <p class="text-white/80 mt-sm">Années d'Exp.</p>
          </div>
          <div>
            <p class="text-4xl font-bold">✓</p>
            <p class="text-white/80 mt-sm">Prêt pour de nouveaux défis</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
