<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import { useImageLoad } from '../composables/useImageLoad'
import {
  ArrowRight,
  Code2,
  Lock,
  Trello,
  Calendar,
  MapPin,
  ExternalLink,
  Trophy,
  Award,
  BookOpen as BookOpenIcon,
  Mail,
  Wrench,
  Cloud,
  Rocket,
  Building,
  Linkedin,
  Github,
  Phone,
} from 'lucide-vue-next'
import AvailabilityBadge from '../components/ui/AvailabilityBadge.vue'

const portfolioStore = usePortfolioStore()
const { isLoaded, hasError, handleLoad, handleError } = useImageLoad()

const formName = ref('')
const formEmail = ref('')
const formSubject = ref('')
const formMessage = ref('')
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const showAllExperiences = ref(false)
const showAllEducation = ref(false)
const showAllTeaching = ref(false)

const sendEmail = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    const { data, error } = await useFetch('/api/send-mail', {
      method: 'POST',
      body: {
        name: formName.value,
        email: formEmail.value,
        subject: formSubject.value,
        message: formMessage.value,
      },
    })

    if (error.value) {
      submitStatus.value = 'error'
      console.error('Erreur:', error.value)
    } else {
      submitStatus.value = 'success'
      formName.value = ''
      formEmail.value = ''
      formSubject.value = ''
      formMessage.value = ''
      setTimeout(() => {
        submitStatus.value = 'idle'
      }, 5000)
    }
  } catch (err) {
    submitStatus.value = 'error'
    console.error('Erreur lors de l\'envoi:', err)
  } finally {
    isSubmitting.value = false
  }
}

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
    color: 'border-primary-blue',
    skills: ['Spring Boot', 'Java', 'Laravel', 'PHP', 'Node.js', 'Express', 'ASP.net', 'C#', '.NET Core', 'JSF', 'Symfony'],
  },
  {
    title: 'Frontend & Mobile',
    icon: Code2,
    color: 'border-primary-orange',
    skills: ['Angular', 'React JS', 'Flutter', 'Dart', 'Ionic', 'TypeScript', 'JavaScript', 'Bootstrap', 'Java FX', 'WPF'],
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'border-cyan-500',
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'CI/CD',
      'OpenShift',
      'Sonar',
      'EC2',
      'RDS',
    ],
  },
  {
    title: 'Databases',
    icon: Trello,
    color: 'border-purple-500',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch'],
  },
  {
    title: 'Architecture & Security',
    icon: Lock,
    color: 'border-red-500',
    skills: [
      'Microservices',
      'Keycloak',
      'Auth0',
      'UML',
      'Merise',
      'Design Patterns',
    ],
  },
  {
    title: 'Tools & Methodology',
    icon: Wrench,
    color: 'border-yellow-500',
    skills: ['Git', 'GitHub', 'Bitbucket', 'Jira', 'Trello', 'Slack', 'Scrum', 'Agile'],
  },
]
</script>

<template>
  <div class="bg-bg-primary">


    <section
      id="hero"
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden flex flex-col justify-center min-h-[85vh] md:min-h-0"
    >

      <div class="absolute inset-0 bg-gradient-to-br from-bg-tertiary/20 via-bg-primary to-bg-primary opacity-50 -z-10"></div>
      <div class="absolute top-20 right-10 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>

      <div class="grid md:grid-cols-[40%_60%] gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto w-full mb-10">

        <div class="order-1 flex flex-col gap-4 w-full max-w-[320px] mx-auto md:ml-auto md:mr-0">
          <div class="relative w-full h-80 group">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-blue to-primary-orange rounded-3xl p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <div class="relative w-full h-full rounded-3xl bg-bg-secondary shadow-card group-hover:shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]">
              <picture>
                <source srcset="/profile.webp" type="image/webp" fetchpriority="high" />
                <img src="/profile.jpg" alt="Profile photo" class="w-full h-full object-cover object-top" loading="eager" decoding="async" fetchpriority="high" @error="handleError" />
              </picture>
              <div v-if="hasError" class="absolute inset -0 flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-orange">
                <span class="text-6xl font-bold text-white drop-shadow-lg">
                   {{ portfolioStore.personalInfo.firstName.charAt(0) }}{{ portfolioStore.personalInfo.lastName.charAt(0) }}
                </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 w-full h-24">
            <div class="bg-bg-secondary rounded-xl border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 cursor-pointer group flex flex-col items-center justify-center text-center h-full">
              <p class="text-3xl font-bold text-primary-blue group-hover:scale-110 transition-transform duration-300">3+</p>
              <p class="text-text-tertiary text-xs mt-1 group-hover:text-text-secondary transition-colors">Années d'Exp.</p>
            </div>
            <div class="bg-bg-secondary rounded-xl border-2 border-bg-tertiary hover:border-primary-orange transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 group flex flex-col items-center justify-center text-center h-full">
              <p class="text-3xl font-bold text-primary-orange group-hover:scale-110 transition-transform duration-300">20+</p>
              <p class="text-text-tertiary text-xs mt-1 group-hover:text-text-secondary transition-colors">Projets Réalisés</p>
            </div>
          </div>
        </div>


        <div class="order-2 flex flex-col justify-between h-full pt-1 md:pt-0 text-center md:text-left">
          <div class="flex flex-col justify-start">
            <p class="text-primary-blue font-bold text-xs tracking-widest uppercase mb-2">Développeur Backend & DevOps</p>
            <h1 class="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              {{ portfolioStore.personalInfo.firstName }} <span class="text-primary-orange">{{ portfolioStore.personalInfo.lastName }}</span>
            </h1>
            <p class="text-lg text-text-secondary leading-relaxed mt-4 max-w-md mx-auto md:mx-0">{{ portfolioStore.personalInfo.bio }}</p>
          </div>

          <div class="w-full max-w-md mt-4 bg-bg-secondary rounded-xl px-4 py-3 border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 shadow-soft hover:shadow-card flex items-center justify-between mx-auto md:mx-0">
            <span class="text-xs font-bold text-text-tertiary uppercase tracking-wider hidden md:block">Me Retrouver</span>
            <div class="flex justify-center gap-2 w-full md:w-auto">
              <a href="https://www.linkedin.com/in/makhmadane-lo-bb557a169" target="_blank" class="p-2.5 rounded-lg bg-primary-blue/10 hover:bg-primary-blue/20 text-primary-blue transition-all hover:scale-110 group" aria-label="LinkedIn">
                <Linkedin class="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" target="_blank" class="p-2.5 rounded-lg bg-primary-blue/10 hover:bg-primary-blue/20 text-primary-blue transition-all hover:scale-110 group" aria-label="GitHub">
                <Github class="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:dl7781775@gmail.com" class="p-2.5 rounded-lg bg-primary-blue/10 hover:bg-primary-blue/20 text-primary-blue transition-all hover:scale-110 group" aria-label="Email">
                <Mail class="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="tel:+221773022150" class="p-2.5 rounded-lg bg-primary-blue/10 hover:bg-primary-blue/20 text-primary-blue transition-all hover:scale-110 group" aria-label="Phone">
                <Phone class="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="#experience" class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-orange text-white text-base font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[200px]">Voir Parcours <ArrowRight class="w-5 h-5" /></a>
        <a href="#contact" class="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary-blue text-primary-blue text-base font-bold rounded-xl hover:bg-primary-blue/5 active:scale-95 transition-all duration-300 min-w-[200px]">Me Contacter</a>
      </div>
    </section>


    <section id="experience" class="bg-bg-primary py-12">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl mb-16 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
          Expérience <span class="text-primary-orange">Professionnelle</span>
        </h2>
        <p class="text-lg text-text-secondary w-full text-left">
          Un parcours diversifié dans le développement backend, DevOps et l'intégration logicielle.
        </p>
      </div>

      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <div class="space-y-8">
          <div v-for="(exp, index) in (showAllExperiences ? portfolioStore.experiences : portfolioStore.experiences.slice(0, 3))" :key="exp.id" class="relative">
             <div class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl overflow-hidden hover:border-primary-blue transition-all duration-300 hover:shadow-card">
              <div class="bg-gradient-to-r from-primary-blue to-primary-blue/80 p-8">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-orange/80 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
                  </div>
                  <h3 class="text-2xl font-bold text-white">{{ exp.role }}</h3>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span class="text-white font-semibold flex items-center gap-2">{{ exp.company }} <ExternalLink v-if="exp.website" class="w-4 h-4" /></span>
                  <span v-if="exp.current" class="px-3 py-1 bg-white/20 text-white font-semibold rounded-full text-xs w-fit">En cours</span>
                </div>
              </div>
              <div class="p-8 space-y-6">
                <div class="flex flex-col sm:flex-row gap-8 text-text-secondary text-sm">
                   <div class="flex items-center gap-2"><Calendar class="w-4 h-4 text-primary-blue" /><span>{{ exp.startDate }} - {{ exp.endDate }}</span></div>
                   <div class="flex items-center gap-2"><MapPin class="w-4 h-4 text-primary-blue" /><span>{{ exp.location }}</span></div>
                </div>
                <div v-if="exp.client" class="border-t border-bg-tertiary pt-6">
                   <p class="text-xs font-bold text-primary-orange uppercase tracking-wide mb-2">Client</p>
                   <p class="text-text-primary font-semibold">{{ exp.client }}</p>
                </div>
                <div v-if="exp.projectDescription" class="border-t border-bg-tertiary pt-6">
                   <p class="text-sm font-bold text-text-primary mb-2">Descriptif Projet</p>
                   <p class="text-text-secondary leading-relaxed">{{ exp.projectDescription }}</p>
                </div>
                <div v-if="exp.missions && exp.missions.length" class="border-t border-bg-tertiary pt-6">
                   <p class="text-sm font-bold text-text-primary mb-2">Missions</p>
                   <ul class="space-y-2">
                     <li v-for="(mission, idx) in exp.missions" :key="idx" class="flex gap-4 text-text-secondary text-sm leading-relaxed">
                       <span class="text-primary-blue font-bold mt-0.5 flex-shrink-0">→</span><span>{{ mission }}</span>
                     </li>
                   </ul>
                </div>
                <div v-if="exp.technicalStack" class="border-t border-bg-tertiary pt-6">
                  <p class="text-sm font-bold text-text-primary mb-4">Environnement Technique</p>
                  <div class="space-y-4">
                    <div v-for="(techs, category) in exp.technicalStack" :key="category">
                       <p class="text-xs font-bold text-primary-orange uppercase tracking-wide mb-2">{{ category }}</p>
                       <div class="flex flex-wrap gap-2">
                         <span v-for="tech in techs" :key="tech" class="px-3 py-1 bg-bg-primary rounded text-xs font-semibold text-text-primary border border-bg-tertiary hover:border-primary-blue hover:text-primary-blue transition-all">{{ tech }}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="portfolioStore.experiences.length > 3" class="flex justify-center mt-12">
          <button
            type="button"
            @click="showAllExperiences = !showAllExperiences"
            class="px-8 py-3 bg-bg-secondary border-2 border-primary-blue text-primary-blue font-bold rounded-xl hover:bg-primary-blue hover:text-white transition-all duration-300 shadow-soft hover:shadow-lg cursor-pointer active:scale-95"
          >
            {{ showAllExperiences ? 'Voir moins' : 'Voir plus' }}
          </button>
        </div>
      </div>
    </section>


    <section id="education" class="bg-bg-primary py-12">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl mb-16 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
          Formation <span class="text-primary-orange">Académique</span>
        </h2>
        <p class="text-lg text-text-secondary w-full text-left">
          Licence en Génie Logiciel et formation scientifique solide.
        </p>
      </div>
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
         <div class="space-y-8">
           <div v-for="(edu, index) in (showAllEducation ? portfolioStore.education : portfolioStore.education.slice(0, 3))" :key="edu.id" class="relative">
             <div class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-8 hover:border-primary-blue transition-all duration-300 hover:shadow-card">
               <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
                 <div class="flex-1">
                   <div class="flex items-center gap-8 mb-4">
                     <div class="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-blue/80 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                       <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
                     </div>
                     <div class="flex items-center gap-2">
                       <Trophy v-if="index === 0" class="w-6 h-6 text-primary-orange" />
                       <h3 class="text-2xl font-bold text-text-primary">{{ edu.degree }}</h3>
                     </div>
                   </div>
                   <p class="text-sm font-semibold text-primary-blue uppercase tracking-wide mb-2">{{ edu.institution }}</p>
                   <p class="text-text-secondary">{{ edu.field }}</p>
                 </div>
               </div>
               <div class="flex flex-col sm:flex-row gap-8 mb-8 text-text-secondary text-sm">
                 <div class="flex items-center gap-2"><Calendar class="w-4 h-4 text-primary-blue" />{{ edu.startDate }} - {{ edu.endDate }}</div>
                 <div class="flex items-center gap-2"><MapPin class="w-4 h-4 text-primary-blue" />{{ edu.location }}</div>
               </div>
               <div v-if="edu.highlights && edu.highlights.length" class="space-y-2">
                 <div v-for="(highlight, idx) in edu.highlights" :key="idx" class="flex gap-4 items-start">
                   <Award class="w-5 h-5 text-primary-orange mt-1 flex-shrink-0" />
                   <span class="text-text-secondary">{{ highlight }}</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div v-if="portfolioStore.education.length > 3" class="flex justify-center mt-12">
           <button
             type="button"
             @click="showAllEducation = !showAllEducation"
             class="px-8 py-3 bg-bg-secondary border-2 border-primary-blue text-primary-blue font-bold rounded-xl hover:bg-primary-blue hover:text-white transition-all duration-300 shadow-soft hover:shadow-lg cursor-pointer active:scale-95"
           >
             {{ showAllEducation ? 'Voir moins' : 'Voir plus' }}
           </button>
         </div>
      </div>
    </section>


    <section id="languages" class="bg-bg-primary py-12">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl mb-16 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
          Compétences <span class="text-primary-orange">Linguistiques</span>
        </h2>
        <p class="text-lg text-text-secondary w-full text-left">
          Maîtrise de plusieurs langues pour collaborer efficacement dans un contexte international.
        </p>
      </div>
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
           <div class="grid md:grid-cols-3 gap-8">
             <div v-for="lang in portfolioStore.languages" :key="lang.language" class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-8 hover:border-primary-blue transition-all duration-300">
               <h3 class="text-xl font-bold text-text-primary mb-8">
                 {{ lang.language }} <span v-if="lang.mother" class="text-sm text-primary-orange ml-2">Maternelle</span>
               </h3>
               <div class="space-y-2">
                 <div class="flex justify-between items-center">
                   <span class="text-sm text-text-secondary">Compréhension</span><span class="font-semibold text-primary-blue">{{ lang.comprehension }}</span>
                 </div>
                 <div class="flex justify-between items-center">
                   <span class="text-sm text-text-secondary">Expression orale</span><span class="font-semibold text-primary-blue">{{ lang.speaking }}</span>
                 </div>
                 <div class="flex justify-between items-center">
                   <span class="text-sm text-text-secondary">Écrit</span><span class="font-semibold text-primary-blue">{{ lang.writing }}</span>
                 </div>
               </div>
             </div>
           </div>
      </div>
    </section>


    <section id="skills" class="bg-bg-primary py-12">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl mb-16 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
          Compétences <span class="text-primary-orange">Techniques</span>
        </h2>
        <p class="text-lg text-text-secondary w-full text-left">
          Expertise couvrant 6 domaines clés pour délivrer des solutions robustes et scalables.
        </p>
      </div>
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
         <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="category in skillCategories" :key="category.title" class="relative group bg-bg-secondary rounded-xl overflow-hidden border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div :class="`bg-bg-tertiary border-l-4 ${category.color} p-6 flex items-center gap-4`">
                   <component :is="category.icon" class="w-6 h-6 text-text-primary flex-shrink-0" />
                   <h3 class="text-lg font-bold text-text-primary">{{ category.title }}</h3>
                </div>
                <div class="p-8">
                   <div class="flex flex-wrap gap-2">
                     <span v-for="skill in category.skills" :key="skill" class="inline-flex px-4 py-2 bg-bg-tertiary rounded-full text-xs font-semibold text-text-primary border border-bg-tertiary hover:bg-bg-secondary hover:border-primary-blue hover:text-primary-blue hover:shadow-soft hover:scale-105 transition-all duration-200 cursor-default">{{ skill }}</span>
                   </div>
                   <div class="mt-6 pt-6 border-t border-bg-tertiary">
                     <p class="text-xs text-text-tertiary font-semibold uppercase tracking-widest"><span class="text-primary-blue font-bold">{{ category.skills.length }}</span> compétences</p>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </section>


    <section id="certifications" class="bg-bg-primary py-12">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl mb-16 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
          Certifications <span class="text-primary-orange">Professionnelles</span>
        </h2>
        <p class="text-lg text-text-secondary w-full text-left">
          Certifications reconnues internationalement validant mon expertise technique.
        </p>
      </div>
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="cert in portfolioStore.certifications" :key="cert.id" class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-8 hover:border-primary-blue transition-all duration-300 hover:shadow-card hover:-translate-y-1">
            <div class="flex items-start gap-8 mb-8">
              <Trophy class="w-6 h-6 text-primary-orange flex-shrink-0 mt-1" />
              <div class="flex-1">
                <h3 class="text-lg font-bold text-text-primary">{{ cert.name }}</h3>
                <p class="text-primary-blue font-semibold mt-2">{{ cert.issuer }}</p>
              </div>
            </div>
            <p class="text-sm text-text-secondary"><span class="font-semibold">Obtenu :</span> {{ cert.issueDate }}</p>
          </div>
        </div>
      </div>
    </section>


    <section id="enseignement" class="bg-bg-primary py-12">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl mb-16 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
          Enseignement <span class="text-primary-orange">& Formation</span>
        </h2>
        <p class="text-lg text-text-secondary w-full text-left">
          Partage de expertise à travers l'enseignement dans des institutions reconnues.
        </p>
      </div>
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <div class="space-y-8">
          <div v-for="teach in (showAllTeaching ? portfolioStore.teaching : portfolioStore.teaching.slice(0, 3))" :key="teach.id" class="bg-bg-secondary border-2 border-bg-tertiary rounded-xl p-8 hover:border-primary-orange transition-all duration-300 hover:shadow-card">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
              <div class="flex items-start gap-8 flex-1">
                <BookOpenIcon class="w-6 h-6 text-primary-blue flex-shrink-0 mt-1" />
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-text-primary">{{ teach.institution }}</h3>
                  <p class="text-primary-orange font-semibold mt-2">{{ teach.position }}</p>
                </div>
              </div>
              <span class="text-sm text-text-secondary font-medium whitespace-nowrap">Depuis {{ teach.startDate }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-text-primary mb-4">Cours enseignés :</p>
              <ul class="space-y-2">
                <li v-for="course in teach.courses" :key="course" class="flex gap-4 text-text-secondary text-sm">
                  <span class="text-primary-blue font-bold flex-shrink-0">→</span><span>{{ course }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="portfolioStore.teaching.length > 3" class="flex justify-center mt-12">
          <button
            type="button"
            @click="showAllTeaching = !showAllTeaching"
            class="px-8 py-3 bg-bg-secondary border-2 border-primary-orange text-primary-orange font-bold rounded-xl hover:bg-primary-orange hover:text-white transition-all duration-300 shadow-soft hover:shadow-lg cursor-pointer active:scale-95"
          >
            {{ showAllTeaching ? 'Voir moins' : 'Voir plus' }}
          </button>
        </div>
      </div>
    </section>


    <section id="contact" class="bg-bg-primary py-12 relative overflow-hidden">
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl -translate-y-1/2 -z-10"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl -z-10"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center md:text-left mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
            Contactez <span class="text-primary-orange">Moi</span>
          </h2>
          <p class="text-text-secondary text-lg w-full text-left">
            Discutons de votre prochain projet.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 items-start">


          <div class="bg-bg-secondary rounded-xl p-8 border-2 border-bg-tertiary shadow-card hover:border-primary-blue transition-all duration-300 h-full flex flex-col">
            <h3 class="text-2xl font-bold text-text-primary mb-2">Mes Coordonnées</h3>
            <p class="text-text-secondary text-sm mb-8">Les moyens les plus rapides pour me joindre.</p>

            <div class="space-y-6 flex-grow">
               <div class="flex items-center gap-4 p-4 rounded-lg bg-bg-primary border border-bg-tertiary">
                  <div class="w-10 h-10 rounded-lg bg-primary-orange/10 flex items-center justify-center text-primary-orange flex-shrink-0"><Mail class="w-5 h-5" /></div>
                  <div class="overflow-hidden">
                    <p class="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-0.5">Email</p>
                    <a :href="`mailto:${portfolioStore.personalInfo.email}`" class="text-base font-bold text-text-primary hover:text-primary-orange transition-colors truncate block">{{ portfolioStore.personalInfo.email }}</a>
                  </div>
               </div>
               <div class="flex items-center gap-4 p-4 rounded-lg bg-bg-primary border border-bg-tertiary">
                  <div class="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center text-primary-blue flex-shrink-0"><MapPin class="w-5 h-5" /></div>
                  <div>
                    <p class="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-0.5">Localisation</p>
                    <p class="text-base font-bold text-text-primary">{{ portfolioStore.personalInfo.location }}</p>
                  </div>
               </div>
               <div class="flex items-center gap-4 p-4 rounded-lg bg-bg-primary border border-bg-tertiary">
                  <div class="w-10 h-10 rounded-lg bg-bg-secondary border border-bg-tertiary flex items-center justify-center text-text-primary flex-shrink-0"><Building class="w-5 h-5" /></div>
                  <div>
                    <p class="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-0.5">Entreprise</p>
                    <p class="text-base font-bold text-text-primary">Lo IT Consulting</p>
                  </div>
               </div>
            </div>

            <div class="mt-8 pt-6 border-t border-bg-tertiary flex gap-3 justify-center">
                 <a href="https://www.linkedin.com/in/makhmadane-lo-bb557a169" target="_blank" class="w-10 h-10 rounded-lg bg-bg-primary border border-bg-tertiary flex items-center justify-center hover:border-primary-blue text-text-secondary hover:text-primary-blue transition-all" aria-label="LinkedIn"><Linkedin class="w-5 h-5" /></a>
                 <a href="#" target="_blank" class="w-10 h-10 rounded-lg bg-bg-primary border border-bg-tertiary flex items-center justify-center hover:border-primary-blue text-text-secondary hover:text-primary-blue transition-all" aria-label="GitHub"><Github class="w-5 h-5" /></a>
                 <a href="tel:+221773022150" class="w-10 h-10 rounded-lg bg-bg-primary border border-bg-tertiary flex items-center justify-center hover:border-primary-blue text-text-secondary hover:text-primary-blue transition-all" aria-label="Téléphone"><Phone class="w-5 h-5" /></a>
            </div>
          </div>


          <div class="bg-bg-secondary rounded-xl p-8 border-2 border-bg-tertiary shadow-card hover:border-primary-orange transition-all duration-300">
            <h3 class="text-2xl font-bold text-text-primary mb-6">Envoyez-moi un message</h3>
            <form class="space-y-5" @submit.prevent="sendEmail">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-text-tertiary uppercase mb-2 ml-1">Nom</label>
                  <input type="text" placeholder="Votre nom" v-model="formName" required class="w-full px-4 py-3 bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary focus:border-primary-orange focus:outline-none transition-all placeholder-text-tertiary" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-text-tertiary uppercase mb-2 ml-1">Email</label>
                  <input type="email" placeholder="Votre email" v-model="formEmail" required class="w-full px-4 py-3 bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary focus:border-primary-orange focus:outline-none transition-all placeholder-text-tertiary" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-text-tertiary uppercase mb-2 ml-1">Sujet</label>
                <input type="text" placeholder="Sujet" v-model="formSubject" required class="w-full px-4 py-3 bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary focus:border-primary-orange focus:outline-none transition-all placeholder-text-tertiary" />
              </div>
              <div>
                <label class="block text-xs font-bold text-text-tertiary uppercase mb-2 ml-1">Message</label>
                <textarea placeholder="Votre message..." rows="5" v-model="formMessage" required class="w-full px-4 py-3 bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary focus:border-primary-orange focus:outline-none transition-all resize-none"></textarea>
              </div>

              <div v-if="submitStatus === 'success'" class="p-4 bg-accent-green/10 border border-accent-green rounded-lg text-accent-green text-sm font-semibold">
                Message envoyé avec succès!
              </div>
              <div v-if="submitStatus === 'error'" class="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm font-semibold">
                Erreur lors de l'envoi. Veuillez réessayer.
              </div>

              <button type="submit" :disabled="isSubmitting" class="w-fit mx-auto px-8 py-4 bg-primary-orange text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-t-4 border-primary-orange bg-bg-primary py-8">
      <div class="max-w-6xl mx-auto px-lg md:px-2xl">
        <div class="flex items-center justify-center">
          <p class="text-text-tertiary text-base text-center">© 2025 Lo IT Consulting - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  </div>
</template>
