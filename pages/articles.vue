<script setup lang="ts">
import { ref } from 'vue'
import { ExternalLink, Calendar, Clock, ArrowRight } from 'lucide-vue-next'
import { useImageLoad } from '../composables/useImageLoad'

const { hasError, handleError } = useImageLoad()

// Dummy data for articles
const articles = ref([
  {
    id: 1,
    title: 'Architecture Microservices avec Spring Boot et Docker',
    excerpt: 'Guide complet sur la conception et le déploiement d\'une architecture microservices résiliente en utilisant l\'écosystème Spring Boot et la conteneurisation Docker.',
    image: 'https://images.unsplash.com/photo-1558494949-efc96ca1a3bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Server rack / Tech abstract
    date: '15 Mai 2024',
    readTime: '12 min',
    category: 'DevOps',
    link: '#'
  },
  {
    id: 2,
    title: 'Optimisation CI/CD avec Jenkins et Kubernetes',
    excerpt: 'Comment mettre en place des pipelines de déploiement continus performants pour vos applications cloud-native sur un cluster Kubernetes.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Coding / Laptop screen
    date: '22 Avril 2024',
    readTime: '8 min',
    category: 'CI/CD',
    link: '#'
  },
  {
    id: 3,
    title: 'Développement Mobile Cross-Platform avec Flutter',
    excerpt: 'Retour d\'expérience sur le développement de l\'application Kaabu Mobile : défis, solutions et avantages de la technologie Flutter.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Mobile phone / App dev
    date: '10 Mars 2024',
    readTime: '10 min',
    category: 'Mobile',
    link: '#'
  },
  {
    id: 4,
    title: 'Sécurisation des APIs REST avec Keycloak',
    excerpt: 'Tutoriel pratique sur l\'intégration de Keycloak pour la gestion des identités et des accès dans vos applications Spring Boot et Angular.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '28 Février 2024',
    readTime: '15 min',
    category: 'Sécurité',
    link: '#'
  },
  {
    id: 5,
    title: 'Introduction à AWS pour les Développeurs Java',
    excerpt: 'Les services essentiels d\'Amazon Web Services que tout développeur backend Java doit connaître pour déployer des applications scalables.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '15 Janvier 2024',
    readTime: '20 min',
    category: 'Cloud',
    link: '#'
  },
  {
    id: 6,
    title: 'Pattern SAGA pour les Transactions Distribuées',
    excerpt: 'Comprendre et implémenter le pattern SAGA pour gérer la cohérence des données dans une architecture distribuée pilotée par événements.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Network / Security / Abstract
    date: '05 Décembre 2023',
    readTime: '18 min',
    category: 'Architecture',
    link: '#'
  }
])
</script>

<template>
  <div class="bg-bg-primary min-h-screen pt-24 pb-12">
    <!-- Header Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-6">
        Articles & <span class="text-primary-orange">Publications</span>
      </h1>
      <p class="text-lg text-text-secondary max-w-2xl mx-auto">
        Partage de connaissances techniques, tutoriels et retours d\'expérience sur le développement logiciel, le DevOps et le Cloud Computing.
      </p>
    </section>

    <!-- Articles Grid -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="group bg-bg-secondary rounded-xl overflow-hidden border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 shadow-soft hover:shadow-card flex flex-col h-full"
        >
          <!-- Image Container -->
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent opacity-60 z-10"></div>
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              @error="handleError"
            />
            <div class="absolute top-4 left-4 z-20">
              <span class="px-3 py-1 text-xs font-bold text-white bg-primary-blue/90 backdrop-blur-sm rounded-full shadow-lg">
                {{ article.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <!-- Meta info -->
            <div class="flex items-center gap-4 text-xs text-text-tertiary mb-3">
              <div class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5" />
                <span>{{ article.date }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock class="w-3.5 h-3.5" />
                <span>{{ article.readTime }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
              {{ article.title }}
            </h3>

            <!-- Excerpt -->
            <p class="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
              {{ article.excerpt }}
            </p>

            <!-- Action -->
            <a
              :href="article.link"
              target="_blank"
              class="inline-flex items-center gap-2 text-sm font-bold text-primary-orange hover:text-primary-blue transition-colors mt-auto"
            >
              Lire l\'article
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Newsletter / Call to Action (Optional filler for "best thing") -->
    <section class="max-w-4xl mx-auto px-4 mt-24">
      <div class="bg-bg-secondary rounded-2xl p-8 md:p-12 border-2 border-bg-tertiary text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <h2 class="text-2xl md:text-3xl font-bold text-text-primary mb-4 relative z-10">
          Restez informés
        </h2>
        <p class="text-text-secondary mb-8 max-w-lg mx-auto relative z-10">
          Abonnez-vous pour recevoir les dernières actualités techniques et mises à jour de mes projets.
        </p>
        <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" @submit.prevent>
          <input 
            type="email" 
            placeholder="Votre adresse email" 
            class="flex-grow px-4 py-3 bg-bg-primary border-2 border-bg-tertiary rounded-lg text-text-primary focus:border-primary-blue focus:outline-none transition-all"
          />
          <button class="px-6 py-3 bg-text-primary text-bg-primary font-bold rounded-lg hover:bg-primary-blue hover:text-white transition-all duration-300">
            S\'abonner
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
