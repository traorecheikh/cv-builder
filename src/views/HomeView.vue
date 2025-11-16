<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { useImageLoad } from '../composables/useImageLoad'
import { ArrowRight, Code2, Lock, Brain, Trello, Calendar, MapPin, ExternalLink, Github, Star, Trophy, Award } from 'lucide-vue-next'
import SocialLinks from '../components/ui/SocialLinks.vue'
import AvailabilityBadge from '../components/ui/AvailabilityBadge.vue'
import SkillBar from '../components/ui/SkillBar.vue'

const portfolioStore = usePortfolioStore()
const { isLoaded, hasError, handleLoad, handleError } = useImageLoad()

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

const topSkills = [
  { name: 'SpringBoot', level: 90 },
  { name: 'Docker', level: 85 },
  { name: 'Node.js', level: 88 },
  { name: 'Vue.js', level: 85 },
  { name: 'Azure', level: 75 },
  { name: 'PostgreSQL', level: 80 },
]

const featuredProjects = ['1']
</script>

<template>
  <div class="bg-bg-primary">
    <!-- Hero Section -->
    <section class="relative max-w-6xl mx-auto px-lg md:px-2xl py-20 md:py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-gradient-to-br from-bg-tertiary/20 via-bg-primary to-bg-primary opacity-50 -z-10"></div>
      <div class="absolute top-20 right-10 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-10 left-10 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>

      <div class="grid md:grid-cols-2 gap-2xl items-center">
        <div class="space-y-lg order-2 md:order-1">
          <AvailabilityBadge />

          <div class="space-y-sm">
            <p class="text-primary-blue font-semibold text-sm md:text-base tracking-wide uppercase">
              Développeur Backend & DevOps
            </p>
            <h1 class="text-5xl md:text-6xl font-bold text-text-primary leading-tight">
              {{ portfolioStore.personalInfo.firstName }}
              <span class="text-primary-orange block mt-sm">{{ portfolioStore.personalInfo.lastName }}</span>
            </h1>
          </div>

          <p class="text-lg text-text-secondary leading-relaxed max-w-lg">
            {{ portfolioStore.personalInfo.bio }}
          </p>

          <SocialLinks />

          <div class="flex flex-col sm:flex-row gap-lg pt-lg">
            <a
              href="#experience"
              class="inline-flex items-center justify-center gap-sm px-2xl py-lg bg-primary-orange text-white font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 group"
            >
              Voir Mon Parcours
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              :href="`mailto:${portfolioStore.personalInfo.email}`"
              class="inline-flex items-center justify-center gap-sm px-2xl py-lg border-2 border-primary-blue text-primary-blue font-semibold rounded-lg hover:bg-bg-tertiary active:scale-95 transition-all duration-300 group"
            >
              <span>Me Contacter</span>
            </a>
          </div>
        </div>

        <!-- Profile Photo Placeholder & Stats -->
        <div class="order-1 md:order-2 space-y-lg">
          <!-- Profile Photo -->
          <div class="relative w-64 h-64 mx-auto md:w-80 md:h-80 group">
            <!-- Animated gradient border -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary-blue to-primary-orange rounded-3xl p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            <!-- Main card -->
            <div class="relative w-full h-full rounded-3xl bg-bg-secondary shadow-card group-hover:shadow-lg overflow-hidden transition-all duration-300 hover:scale-105">
              <!-- Photo if loaded -->
              <img
                v-if="!hasError"
                src="/profile.png"
                alt="Profile photo"
                class="w-full h-full object-cover transition-opacity duration-300"
                :style="{ opacity: isLoaded ? 1 : 0 }"
                @load="handleLoad"
                @error="handleError"
              />

              <!-- Fallback initials -->
              <div
                v-if="hasError || !isLoaded"
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-orange transition-opacity duration-300"
              >
                <div class="text-center">
                  <div class="inline-flex items-center justify-center w-32 h-32 bg-bg-secondary/20 rounded-full backdrop-blur-sm mb-lg">
                    <span class="text-5xl font-bold text-white drop-shadow-lg">
                      {{ portfolioStore.personalInfo.firstName.charAt(0) }}{{ portfolioStore.personalInfo.lastName.charAt(0) }}
                    </span>
                  </div>
                  <p class="text-white/90 text-sm font-medium drop-shadow-md">Photo professionnelle</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-md">
            <div class="bg-bg-secondary rounded-xl p-lg border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 cursor-pointer group">
              <p class="text-3xl font-bold text-primary-blue group-hover:scale-110 transition-transform duration-300 origin-left">3+</p>
              <p class="text-text-tertiary text-sm mt-sm group-hover:text-text-secondary transition-colors">Années d'Exp.</p>
            </div>
            <div class="bg-bg-secondary rounded-xl p-lg border-2 border-bg-tertiary hover:border-primary-orange transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 cursor-pointer group">
              <p class="text-3xl font-bold text-primary-orange group-hover:scale-110 transition-transform duration-300 origin-left">20+</p>
              <p class="text-text-tertiary text-sm mt-sm group-hover:text-text-secondary transition-colors">Projets Réalisés</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE SECTION -->
    <section id="experience" class="bg-bg-primary">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-lg">
          Expérience
          <span class="text-primary-orange">Professionnelle</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl">
          Un parcours diversifié dans le développement backend, DevOps et l'intégration logicielle.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="space-y-lg">
          <div
            v-for="(exp, index) in portfolioStore.experiences"
            :key="exp.id"
            class="relative"
          >
            <div
              v-if="index !== portfolioStore.experiences.length - 1"
              class="absolute left-6 top-24 w-1 h-24 bg-primary-blue"
            ></div>
            <div class="absolute left-0 top-8 w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center border-4 border-white">
              <span class="text-white text-lg">{{ index + 1 }}</span>
            </div>

            <div class="ml-20 bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-2xl hover:border-primary-blue transition-all duration-300 hover:shadow-card">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-lg mb-lg">
                <div>
                  <h3 class="text-2xl font-bold text-text-primary">{{ exp.role }}</h3>
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

                <div
                  v-if="exp.current"
                  class="px-xl py-sm bg-accent-green/10 text-accent-green font-semibold rounded-full text-sm self-start md:self-auto"
                >
                  En cours
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-2xl mb-lg text-text-secondary text-sm">
                <div class="flex items-center gap-sm">
                  <Calendar class="w-4 h-4 text-primary-blue" />
                  {{ exp.startDate }} - {{ exp.endDate }}
                </div>
                <div class="flex items-center gap-sm">
                  <MapPin class="w-4 h-4 text-primary-blue" />
                  {{ exp.location }}
                </div>
              </div>

              <ul class="space-y-sm">
                <li
                  v-for="(desc, idx) in exp.description"
                  :key="idx"
                  class="flex gap-md text-text-secondary leading-relaxed"
                >
                  <span class="text-primary-orange font-bold mt-sm flex-shrink-0">•</span>
                  <span>{{ desc }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION SECTION -->
    <section id="education" class="bg-bg-primary">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-lg">
          Formation
          <span class="text-primary-orange">Académique</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl">
          Licence en Génie Logiciel et formation scientifique solide.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="space-y-lg">
          <div
            v-for="(edu, index) in portfolioStore.education"
            :key="edu.id"
            class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-2xl hover:border-primary-blue transition-all duration-300 hover:shadow-card"
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
                <h3 class="text-2xl font-bold text-text-primary">
                  {{ edu.institution }}
                </h3>
                <p class="text-text-secondary mt-sm">
                  {{ edu.field }}
                </p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-2xl mb-lg text-text-secondary text-sm">
              <div class="flex items-center gap-sm">
                <Calendar class="w-4 h-4 text-primary-blue" />
                {{ edu.startDate }} - {{ edu.endDate }}
              </div>
              <div class="flex items-center gap-sm">
                <MapPin class="w-4 h-4 text-primary-blue" />
                {{ edu.location }}
              </div>
            </div>

            <div v-if="edu.highlights && edu.highlights.length" class="space-y-sm">
              <div
                v-for="(highlight, idx) in edu.highlights"
                :key="idx"
                class="flex gap-md items-start"
              >
                <Award class="w-5 h-5 text-primary-orange mt-sm flex-shrink-0" />
                <span class="text-text-secondary">{{ highlight }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Languages Section -->
        <div class="mt-24">
          <h2 class="text-3xl font-bold text-text-primary mb-2xl">
            Compétences
            <span class="text-primary-orange">Linguistiques</span>
          </h2>

          <div class="grid md:grid-cols-3 gap-lg">
            <div
              v-for="lang in portfolioStore.languages"
              :key="lang.language"
              class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-2xl hover:border-primary-blue transition-all duration-300"
            >
              <h3 class="text-xl font-bold text-text-primary mb-lg">
                {{ lang.language }}
                <span v-if="lang.mother" class="text-sm text-primary-orange ml-sm">Maternelle</span>
              </h3>
              <div class="space-y-sm">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-text-secondary">Compréhension</span>
                  <span class="font-semibold text-primary-blue">{{ lang.comprehension }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-text-secondary">Expression orale</span>
                  <span class="font-semibold text-primary-blue">{{ lang.speaking }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-text-secondary">Écrit</span>
                  <span class="font-semibold text-primary-blue">{{ lang.writing }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS SECTION -->
    <section id="skills" class="bg-bg-primary">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-lg">
          Compétences
          <span class="text-primary-orange">Techniques</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl">
          Plus de 40 technologies et outils maîtrisés, couvrant le développement, DevOps, sécurité et IA.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-12">
        <h2 class="text-2xl font-bold text-text-primary mb-2xl">Compétences Principales</h2>
        <div class="grid md:grid-cols-2 gap-2xl bg-bg-secondary p-2xl rounded-xl border-2 border-bg-tertiary shadow-card">
          <SkillBar
            v-for="skill in topSkills"
            :key="skill.name"
            :skill="skill"
          />
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="grid md:grid-cols-2 gap-2xl">
          <div
            v-for="category in skillCategories"
            :key="category.title"
            class="bg-accent-light-gray rounded-xl p-2xl hover:shadow-card transition-all duration-300 border border-bg-tertiary hover:border-primary-blue"
          >
            <div class="flex items-center gap-lg mb-lg">
              <component :is="category.icon" class="w-8 h-8 text-primary-blue" />
              <h3 class="text-2xl font-bold text-text-primary">{{ category.title }}</h3>
            </div>

            <div class="flex flex-wrap gap-md">
              <span
                v-for="skill in category.skills"
                :key="skill"
                class="px-lg py-sm bg-bg-secondary rounded-full text-sm font-semibold text-text-primary border-2 border-primary-blue/30 hover:border-primary-blue hover:bg-bg-tertiary transition-all duration-300"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-24 bg-primary-blue rounded-xl p-2xl md:p-3xl text-white">
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
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects" class="bg-bg-primary">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-lg">
          Projets
          <span class="text-primary-orange">Réalisés</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl">
          Des projets d'envergure en startup et en entreprise, showcasing expertise et innovation.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="space-y-2xl">
          <div
            v-for="(project, index) in portfolioStore.projects"
            :key="project.id"
            class="group relative bg-bg-secondary border-2 border-bg-tertiary rounded-xl overflow-hidden hover:border-primary-blue hover:shadow-card transition-all duration-300 hover:-translate-y-1"
          >
            <div
              v-if="featuredProjects.includes(project.id)"
              class="absolute top-4 right-4 z-10 flex items-center gap-sm px-lg py-sm bg-primary-orange text-white rounded-full text-xs font-semibold"
            >
              <Star class="w-4 h-4 fill-current" />
              Projet Vedette
            </div>

            <div class="w-full h-48 bg-bg-tertiary flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <div class="text-6xl font-bold text-primary-blue/20">
                {{ project.name.charAt(0) }}
              </div>
              <div class="absolute inset-0 bg-bg-secondary/50"></div>
            </div>

            <div class="p-2xl border-b-2 border-bg-tertiary">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-lg">
                <div>
                  <span class="text-sm text-primary-blue font-semibold uppercase tracking-wide">
                    Projet #{{ index + 1 }}
                  </span>
                  <h3 class="text-2xl md:text-3xl font-bold text-text-primary mt-sm group-hover:text-primary-blue transition-colors">
                    {{ project.name }}
                  </h3>
                </div>
                <div class="text-sm text-text-secondary font-medium">
                  {{ project.startDate }} - {{ project.endDate }}
                </div>
              </div>
            </div>

            <div class="p-2xl">
              <p class="text-text-secondary leading-relaxed mb-lg">
                {{ project.description }}
              </p>

              <div class="mb-lg">
                <p class="text-sm font-semibold text-text-primary mb-sm">Stack technologique :</p>
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

              <div class="pt-lg border-t border-bg-tertiary">
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
                <span v-else class="inline-flex items-center gap-sm text-text-secondary">
                  <span class="text-sm">Code privé</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-24 bg-primary-orange rounded-xl p-2xl md:p-3xl text-white text-center">
          <h2 class="text-3xl font-bold mb-lg">Plus de projets sur GitHub</h2>
          <p class="text-white/90 mb-2xl max-w-2xl mx-auto">
            Consultez mon profil GitHub pour découvrir d'autres projets et contributions open-source.
          </p>
          <a
            href="https://github.com/traorecheikh"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-sm px-2xl py-lg bg-bg-secondary text-primary-orange font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300"
          >
            <Github class="w-5 h-5" />
            Visiter mon GitHub
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="max-w-6xl mx-auto px-lg md:px-2xl py-20 md:py-24">
      <div class="bg-bg-secondary rounded-xl p-2xl md:p-3xl text-text-primary text-center border border-bg-tertiary">
        <h2 class="text-3xl md:text-4xl font-bold mb-lg text-text-primary">Intéressé par une collaboration?</h2>
        <p class="text-text-secondary mb-2xl max-w-2xl mx-auto">
          N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
        </p>
        <a
          :href="`mailto:${portfolioStore.personalInfo.email}`"
          class="inline-block px-2xl py-lg bg-primary-orange text-white font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105"
        >
          Envoyer un Email
        </a>
      </div>
    </section>
  </div>
</template>
