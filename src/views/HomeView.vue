<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio'
import { useImageLoad } from '../composables/useImageLoad'
import { ArrowRight, Code2, Lock, Trello, Calendar, MapPin, ExternalLink, Trophy, Award, BookOpen as BookOpenIcon, Mail, Home, Briefcase, Wrench, GraduationCap, Heart, Cloud, Zap, Server, Rocket, Building } from 'lucide-vue-next'
import SocialLinks from '../components/ui/SocialLinks.vue'
import AvailabilityBadge from '../components/ui/AvailabilityBadge.vue'

const portfolioStore = usePortfolioStore()
const { isLoaded, hasError, handleLoad, handleError } = useImageLoad()

interface SkillCategory {
  title: string
  icon: typeof Code2
  color: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Backend',
    icon: Rocket,
    color: 'from-primary-blue to-blue-600',
    skills: ['SpringBoot', 'Quarkus', 'Node.js', 'Flask', 'FastApi', 'Jakarta', 'CDI'],
  },
  {
    title: 'Frontend',
    icon: Code2,
    color: 'from-primary-orange to-orange-600',
    skills: ['Vue', 'Angular', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'from-cyan-500 to-cyan-600',
    skills: ['Docker', 'Terraform', 'Kubernetes', 'Jenkins', 'CI/CD', 'DigitalOcean', 'Azure', 'AWS'],
  },
  {
    title: 'Databases',
    icon: Trello,
    color: 'from-purple-500 to-purple-600',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Cassandra', 'DynamoDB'],
  },
  {
    title: 'Security & Monitoring',
    icon: Lock,
    color: 'from-red-500 to-red-600',
    skills: ['Microsoft Entra', 'Prometheus', 'Grafana', 'ELK', 'Nmap', 'Wireshark', 'System Hardening', 'SSO'],
  },
  {
    title: 'Tools & Methodology',
    icon: Wrench,
    color: 'from-yellow-500 to-yellow-600',
    skills: ['Jira', 'Confluence', 'Microsoft Teams', 'Scrum', 'Kanban', 'Trello', 'Slack'],
  },
]
</script>

<template>
  <div class="bg-bg-primary">
    <!-- Hero Section -->
    <section id="hero" class="relative max-w-6xl mx-auto px-lg md:px-2xl pt-12 pb-12 md:pb-20 overflow-hidden">
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
            <!-- Timeline line -->
            <div
              v-if="index !== portfolioStore.experiences.length - 1"
              class="absolute left-[1.375rem] top-24 w-1 h-24 bg-gradient-to-b from-primary-blue via-primary-blue to-primary-blue/30"
            ></div>
            <!-- Timeline circle -->
            <div class="absolute left-0 top-8 w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-blue/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
            </div>

            <div class="ml-20 bg-bg-secondary border-2 border-bg-tertiary rounded-xl overflow-hidden hover:border-primary-blue transition-all duration-300 hover:shadow-card">
              <!-- Header with gradient -->
              <div class="bg-gradient-to-r from-primary-blue to-primary-blue/80 p-2xl">
                <h3 class="text-2xl font-bold text-white mb-sm">{{ exp.role }}</h3>
                <div class="flex flex-col sm:flex-row sm:items-center gap-md">
                  <a
                    v-if="exp.website"
                    :href="exp.website"
                    target="_blank"
                    rel="noopener"
                    class="text-white font-semibold hover:text-white/80 transition-colors no-underline flex items-center gap-sm"
                  >
                    {{ exp.company }}
                    <ExternalLink class="w-4 h-4" />
                  </a>
                  <span v-else class="text-white font-semibold">{{ exp.company }}</span>
                  <span
                    v-if="exp.current"
                    class="px-lg py-sm bg-white/20 text-white font-semibold rounded-full text-xs w-fit"
                  >
                    En cours
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-2xl space-y-lg">
                <!-- Dates and location -->
                <div class="flex flex-col sm:flex-row gap-2xl text-text-secondary text-sm">
                  <div class="flex items-center gap-sm">
                    <Calendar class="w-4 h-4 text-primary-blue flex-shrink-0" />
                    <span>{{ exp.startDate }} - {{ exp.endDate }}</span>
                  </div>
                  <div class="flex items-center gap-sm">
                    <MapPin class="w-4 h-4 text-primary-blue flex-shrink-0" />
                    <span>{{ exp.location }}</span>
                  </div>
                </div>

                <!-- Client -->
                <div v-if="exp.client" class="border-t border-bg-tertiary pt-lg">
                  <p class="text-xs font-bold text-primary-orange uppercase tracking-wide mb-sm">Client</p>
                  <p class="text-text-primary font-semibold">{{ exp.client }}</p>
                </div>

                <!-- Project description -->
                <div v-if="exp.projectDescription" class="border-t border-bg-tertiary pt-lg">
                  <p class="text-sm font-bold text-text-primary mb-md">Descriptif Projet</p>
                  <p class="text-text-secondary leading-relaxed">{{ exp.projectDescription }}</p>
                </div>

                <!-- Missions -->
                <div v-if="exp.missions && exp.missions.length" class="border-t border-bg-tertiary pt-lg">
                  <p class="text-sm font-bold text-text-primary mb-md">Missions</p>
                  <ul class="space-y-sm">
                    <li v-for="(mission, idx) in exp.missions" :key="idx" class="flex gap-md text-text-secondary text-sm leading-relaxed">
                      <span class="text-primary-blue font-bold mt-0.5 flex-shrink-0">→</span>
                      <span>{{ mission }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Technical stack -->
                <div v-if="exp.technicalStack" class="border-t border-bg-tertiary pt-lg">
                  <p class="text-sm font-bold text-text-primary mb-lg">Environnement Technique</p>
                  <div class="space-y-md">
                    <div v-for="(techs, category) in exp.technicalStack" :key="category">
                      <p class="text-xs font-bold text-primary-orange uppercase tracking-wide mb-sm">{{ category }}</p>
                      <div class="flex flex-wrap gap-sm">
                        <span
                          v-for="tech in techs"
                          :key="tech"
                          class="px-md py-sm bg-bg-primary rounded text-xs font-semibold text-text-primary border border-bg-tertiary hover:border-primary-blue hover:text-primary-blue transition-all"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            class="relative"
          >
            <!-- Timeline line -->
            <div
              v-if="index !== portfolioStore.education.length - 1"
              class="absolute left-[1.375rem] top-24 w-1 h-24 bg-gradient-to-b from-primary-orange via-primary-orange to-primary-orange/30"
            ></div>
            <!-- Timeline circle -->
            <div class="absolute left-0 top-8 w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-orange/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
            </div>

            <div class="ml-20 bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-2xl hover:border-primary-blue transition-all duration-300 hover:shadow-card"
          >
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-lg mb-lg">
              <div>
                <div class="flex items-center gap-sm mb-md">
                  <Trophy
                    v-if="index === 0"
                    class="w-6 h-6 text-primary-orange"
                  />
                  <h3 class="text-2xl font-bold text-text-primary">
                    {{ edu.degree }}
                  </h3>
                </div>
                <p class="text-sm font-semibold text-primary-blue uppercase tracking-wide mb-sm">
                  {{ edu.institution }}
                </p>
                <p class="text-text-secondary">
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
          Expertise couvrant 6 domaines clés pour délivrer des solutions robustes et scalables.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
          <div
            v-for="category in skillCategories"
            :key="category.title"
            class="relative group bg-bg-secondary rounded-xl overflow-hidden border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <!-- Gradient header -->
            <div :class="`bg-gradient-to-r ${category.color} p-lg flex items-center gap-md`">
              <component :is="category.icon" class="w-6 h-6 text-white flex-shrink-0" />
              <h3 class="text-xl font-bold text-white">{{ category.title }}</h3>
            </div>

            <!-- Skills container -->
            <div class="p-2xl">
              <div class="flex flex-wrap gap-md">
                <span
                  v-for="skill in category.skills"
                  :key="skill"
                  class="px-md py-sm bg-bg-primary rounded-lg text-sm font-semibold text-text-primary border border-bg-tertiary hover:border-primary-blue hover:text-primary-blue transition-all duration-200 cursor-default"
                >
                  {{ skill }}
                </span>
              </div>

              <!-- Skill count indicator -->
              <div class="mt-lg pt-lg border-t border-bg-tertiary">
                <p class="text-xs text-text-tertiary font-semibold uppercase tracking-wide">
                  {{ category.skills.length }} compétences
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Stats -->
        </div>
    </section>


    <!-- CERTIFICATIONS SECTION -->
    <section id="certifications" class="bg-bg-primary">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-lg">
          Certifications
          <span class="text-primary-orange">Professionnelles</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl">
          Certifications reconnues internationalement validant mon expertise technique.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="grid md:grid-cols-2 gap-lg">
          <div
            v-for="cert in portfolioStore.certifications"
            :key="cert.id"
            class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-2xl hover:border-primary-blue transition-all duration-300 hover:shadow-card hover:-translate-y-1"
          >
            <div class="flex items-start gap-lg mb-lg">
              <Trophy class="w-6 h-6 text-primary-orange flex-shrink-0 mt-sm" />
              <div class="flex-1">
                <h3 class="text-lg font-bold text-text-primary">{{ cert.name }}</h3>
                <p class="text-primary-blue font-semibold mt-sm">{{ cert.issuer }}</p>
              </div>
            </div>
            <p class="text-sm text-text-secondary">
              <span class="font-semibold">Obtenu :</span> {{ cert.issueDate }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ENSEIGNEMENT SECTION -->
    <section id="enseignement" class="bg-bg-primary">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-lg">
          Enseignement
          <span class="text-primary-orange">& Formation</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl">
          Partage de expertise à travers l'enseignement dans des institutions reconnues.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl pb-20">
        <div class="space-y-lg">
          <div
            v-for="teach in portfolioStore.teaching"
            :key="teach.id"
            class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-2xl hover:border-primary-orange transition-all duration-300 hover:shadow-card"
          >
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-lg mb-lg">
              <div class="flex items-start gap-lg flex-1">
                <BookOpenIcon class="w-6 h-6 text-primary-blue flex-shrink-0 mt-sm" />
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-text-primary">{{ teach.institution }}</h3>
                  <p class="text-primary-orange font-semibold mt-sm">{{ teach.position }}</p>
                </div>
              </div>
              <span class="text-sm text-text-secondary font-medium whitespace-nowrap">Depuis {{ teach.startDate }}</span>
            </div>

            <div>
              <p class="text-sm font-semibold text-text-primary mb-md">Cours enseignés :</p>
              <ul class="space-y-sm">
                <li v-for="course in teach.courses" :key="course" class="flex gap-md text-text-secondary text-sm">
                  <span class="text-primary-blue font-bold flex-shrink-0">→</span>
                  <span>{{ course }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-bg-primary py-20 md:py-24">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-16">
          Contactez
          <span class="text-primary-orange">Moi</span>
        </h1>

        <div class="grid md:grid-cols-2 gap-2xl">
          <!-- Left: Contact Info -->
          <div class="space-y-lg">
            <!-- Nom -->
            <div class="bg-bg-secondary rounded-xl p-2xl border-2 border-bg-tertiary hover:border-primary-blue transition-all">
              <div class="flex items-center gap-lg mb-md">
                <div class="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase class="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <p class="text-sm text-text-tertiary font-semibold uppercase">Nom</p>
                  <p class="text-lg font-bold text-text-primary">{{ portfolioStore.personalInfo.firstName }} {{ portfolioStore.personalInfo.lastName }}</p>
                </div>
              </div>
            </div>

            <!-- Position -->
            <div class="bg-bg-secondary rounded-xl p-2xl border-2 border-bg-tertiary hover:border-primary-orange transition-all">
              <div class="flex items-center gap-lg mb-md">
                <div class="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy class="w-6 h-6 text-primary-orange" />
                </div>
                <div>
                  <p class="text-sm text-text-tertiary font-semibold uppercase">Poste</p>
                  <p class="text-lg font-bold text-text-primary">{{ portfolioStore.personalInfo.title }}</p>
                </div>
              </div>
            </div>

            <!-- Company -->
            <div class="bg-bg-secondary rounded-xl p-2xl border-2 border-bg-tertiary hover:border-primary-blue transition-all">
              <div class="flex items-center gap-lg mb-md">
                <div class="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building class="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <p class="text-sm text-text-tertiary font-semibold uppercase">Entreprise actuelle</p>
                  <p class="text-lg font-bold text-text-primary">Lo IT Consulting</p>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="bg-bg-secondary rounded-xl p-2xl border-2 border-bg-tertiary hover:border-primary-blue transition-all">
              <div class="flex items-center gap-lg mb-md">
                <div class="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin class="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <p class="text-sm text-text-tertiary font-semibold uppercase">Adresse</p>
                  <p class="text-lg font-bold text-text-primary">{{ portfolioStore.personalInfo.location }}</p>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="bg-bg-secondary rounded-xl p-2xl border-2 border-bg-tertiary hover:border-primary-orange transition-all">
              <div class="flex items-center gap-lg mb-md">
                <div class="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail class="w-6 h-6 text-primary-orange" />
                </div>
                <div>
                  <p class="text-sm text-text-tertiary font-semibold uppercase">Email</p>
                  <a :href="`mailto:${portfolioStore.personalInfo.email}`" class="text-lg font-bold text-primary-blue hover:text-primary-orange no-underline">
                    {{ portfolioStore.personalInfo.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="bg-bg-secondary rounded-xl p-2xl md:p-3xl border-2 border-bg-tertiary">
            <h3 class="text-2xl font-bold text-text-primary mb-2xl">Envoyez-moi un message</h3>

            <form class="space-y-lg" @submit.prevent="">
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-md">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  class="w-full px-lg py-md bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:border-primary-blue focus:outline-none transition-all"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-md">Email</label>
                <input
                  type="email"
                  placeholder="Votre email"
                  class="w-full px-lg py-md bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:border-primary-blue focus:outline-none transition-all"
                />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-md">Sujet</label>
                <input
                  type="text"
                  placeholder="Sujet de votre message"
                  class="w-full px-lg py-md bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:border-primary-blue focus:outline-none transition-all"
                />
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-md">Message</label>
                <textarea
                  placeholder="Votre message"
                  rows="5"
                  class="w-full px-lg py-md bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:border-primary-blue focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full px-2xl py-lg bg-primary-orange text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-300 shadow-soft hover:shadow-card"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t-4 border-primary-orange bg-bg-primary py-20 md:py-24">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <!-- Main Footer Content -->
        <div class="grid md:grid-cols-3 gap-2xl mb-2xl pb-2xl border-b border-bg-tertiary">
          <!-- Column 1: About -->
          <div>
            <h3 class="text-xl font-bold text-primary-orange mb-lg">À propos</h3>
            <p class="text-text-secondary leading-relaxed mb-lg">
              {{ portfolioStore.personalInfo.bio }}
            </p>
            <div class="space-y-sm text-sm text-text-secondary">
              <div class="flex items-center gap-sm">
                <Mail class="w-4 h-4 text-primary-orange flex-shrink-0" />
                <a :href="`mailto:${portfolioStore.personalInfo.email}`" class="hover:text-primary-blue no-underline">
                  {{ portfolioStore.personalInfo.email }}
                </a>
              </div>
              <div class="flex items-center gap-sm">
                <MapPin class="w-4 h-4 text-primary-orange flex-shrink-0" />
                <span>{{ portfolioStore.personalInfo.location }}</span>
              </div>
              <div class="flex items-center gap-sm">
                <Building class="w-4 h-4 text-primary-orange flex-shrink-0" />
                <span>Lo IT Consulting</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h3 class="text-xl font-bold text-primary-orange mb-lg">Liens rapides</h3>
            <nav class="space-y-md">
              <a href="#hero" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <Home class="w-4 h-4 flex-shrink-0" />
                <span>Accueil</span>
              </a>
              <a href="#experience" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <Briefcase class="w-4 h-4 flex-shrink-0" />
                <span>Expériences</span>
              </a>
              <a href="#skills" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <Wrench class="w-4 h-4 flex-shrink-0" />
                <span>Compétences</span>
              </a>
              <a href="#education" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <GraduationCap class="w-4 h-4 flex-shrink-0" />
                <span>Formations</span>
              </a>
              <a href="#certifications" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <Trophy class="w-4 h-4 flex-shrink-0" />
                <span>Certifications</span>
              </a>
              <a href="#enseignement" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <BookOpenIcon class="w-4 h-4 flex-shrink-0" />
                <span>Enseignement</span>
              </a>
              <a href="#contact" class="flex items-center gap-sm text-text-secondary hover:text-primary-blue transition-colors no-underline">
                <Mail class="w-4 h-4 flex-shrink-0" />
                <span>Contact</span>
              </a>
            </nav>
          </div>

          <!-- Column 3: Follow & Certifications -->
          <div>
            <div class="mb-2xl">
              <h3 class="text-xl font-bold text-primary-orange mb-lg">Me suivre</h3>
              <SocialLinks />
            </div>

            <div>
              <h3 class="text-xl font-bold text-primary-orange mb-lg">Certifications</h3>
              <div class="grid grid-cols-2 gap-md">
                <div class="bg-bg-secondary rounded-lg p-md border-2 border-bg-tertiary hover:border-primary-blue transition-all text-center">
                  <Cloud class="w-6 h-6 mx-auto mb-sm text-primary-blue" />
                  <p class="text-xs font-semibold text-text-primary">AWS</p>
                </div>
                <div class="bg-bg-secondary rounded-lg p-md border-2 border-bg-tertiary hover:border-primary-blue transition-all text-center">
                  <Zap class="w-6 h-6 mx-auto mb-sm text-primary-orange" />
                  <p class="text-xs font-semibold text-text-primary">Azure</p>
                </div>
                <div class="bg-bg-secondary rounded-lg p-md border-2 border-bg-tertiary hover:border-primary-blue transition-all text-center">
                  <Server class="w-6 h-6 mx-auto mb-sm text-primary-blue" />
                  <p class="text-xs font-semibold text-text-primary">Linux</p>
                </div>
                <div class="bg-bg-secondary rounded-lg p-md border-2 border-bg-tertiary hover:border-primary-blue transition-all text-center">
                  <Rocket class="w-6 h-6 mx-auto mb-sm text-primary-orange" />
                  <p class="text-xs font-semibold text-text-primary">DevOps</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom: Copyright -->
        <div class="pt-2xl text-center space-y-md">
          <p class="text-text-secondary text-sm flex items-center justify-center gap-sm">
            Développé par <span class="font-bold text-primary-orange">Lo IT Consulting</span>
            <Heart class="w-4 h-4 text-primary-orange fill-primary-orange" />
          </p>
          <p class="text-text-tertiary text-xs">
            © 2025 {{ portfolioStore.personalInfo.firstName }} {{ portfolioStore.personalInfo.lastName }} - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
