<script lang="ts">
import { computed, watch, defineComponent } from 'vue'
import { Calendar, Clock, ArrowRight, AlertCircle } from 'lucide-vue-next'
import { useImageLoad } from '../../composables/useImageLoad'

export default defineComponent({
  components: {
    Calendar,
    Clock,
    ArrowRight,
    AlertCircle
  },
  async setup() {
    const { hasError, handleError } = useImageLoad()
    const { find } = useStrapi()
    const config = useRuntimeConfig()

    // Fetch articles from Strapi
    const { data: articlesResponse, pending, error } = await useAsyncData('articles-list', () => find('articles', {
      populate: 'coverImage',
      sort: 'publishedAt:desc',
      locale: 'all'
    } as any))

    // Debugging: Log any errors immediately
    watch(error, (newErr) => {
      if (newErr) {
        console.error('❌ STRAPI FETCH ERROR:', newErr)
        console.error('Full Error Object:', JSON.stringify(newErr, null, 2))
        
        // Log the URL we are trying to hit
        const runtimeConfig = useRuntimeConfig()
        console.log('🔧 Configured Strapi URL:', runtimeConfig.public.strapi?.url || 'FALLBACK: http://localhost:1337')
      }
    }, { immediate: true })

    const articles = computed(() => {
      const data = articlesResponse.value?.data || []
      console.log('Fetched articles:', data) // Debugging
      return data
    })

    // Helper to resolve media URL
    const getImageUrl = (image: any) => {
      if (!image) return null
      const url = image.url || image?.attributes?.url
      if (!url) return null
      
      if (url.startsWith('http')) return url
      const strapiUrl = config.public.strapi?.url || 'http://localhost:1337'
      return `${strapiUrl}${url}`
    }

    // Format date
    const formatDate = (dateString: string) => {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    return {
      pending,
      error,
      articles,
      getImageUrl,
      handleError,
      formatDate,
      hasError
    }
  }
})
</script>

<template>
  <div class="bg-bg-primary min-h-screen pt-12 pb-12">
    <!-- Header Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-6">
        Articles & <span class="text-primary-orange">Publications</span>
      </h1>
      <p class="text-lg text-text-secondary max-w-2xl mx-auto">
        Partage de connaissances techniques, tutoriels et retours d'expérience sur le développement logiciel, le DevOps et le Cloud Computing.
      </p>
    </section>

    <!-- Articles Grid -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-orange"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          <AlertCircle class="w-5 h-5" />
          <span>Impossible de charger les articles. Vérifiez la connexion au backend Strapi.</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="articles.length === 0" class="text-center py-12 text-text-secondary">
        Aucun article publié pour le moment.
      </div>

      <!-- Content -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="group bg-bg-secondary rounded-xl overflow-hidden border-2 border-bg-tertiary hover:border-primary-blue transition-all duration-300 shadow-soft hover:shadow-card flex flex-col h-full"
        >
          <!-- Image Container -->
          <div class="relative h-48 overflow-hidden bg-bg-tertiary">
            <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent opacity-60 z-10"></div>
            <img
              v-if="getImageUrl(article.coverImage || article.attributes?.coverImage)"
              :src="getImageUrl(article.coverImage || article.attributes?.coverImage)"
              :alt="article.title || article.attributes?.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              @error="handleError"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-text-tertiary">
              <span class="text-4xl font-bold opacity-20">H2O</span>
            </div>
            
            <div class="absolute top-4 left-4 z-20">
              <span v-if="article.category || article.attributes?.category" class="px-3 py-1 text-xs font-bold text-white bg-primary-blue/90 backdrop-blur-sm rounded-full shadow-lg">
                {{ article.category || article.attributes?.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <!-- Meta info -->
            <div class="flex items-center gap-4 text-xs text-text-tertiary mb-3">
              <div class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5" />
                <span>{{ formatDate(article.publishedAt || article.attributes?.publishedAt) }}</span>
              </div>
              <div v-if="article.readTime || article.attributes?.readTime" class="flex items-center gap-1.5">
                <Clock class="w-3.5 h-3.5" />
                <span>{{ article.readTime || article.attributes?.readTime }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
              {{ article.title || article.attributes?.title }}
            </h3>

            <!-- Excerpt -->
            <p class="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
              {{ article.excerpt || article.attributes?.excerpt }}
            </p>

            <!-- Action -->
            <div v-if="!article.slug && !article.attributes?.slug" class="text-red-500 text-xs mt-auto">
              Erreur: Slug manquant (vérifiez Strapi)
            </div>
            <NuxtLink
              v-else
              :to="`/articles/${article.slug || article.attributes?.slug}`"
              class="inline-flex items-center gap-2 text-sm font-bold text-primary-orange hover:text-primary-blue transition-colors mt-auto"
            >
              Lire l'article
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Newsletter / Call to Action -->
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
            S'abonner
          </button>
        </form>
      </div>
    </section>
  </div>
</template>