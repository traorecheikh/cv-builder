<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-vue-next'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import SmartLoading from '~/components/ui/SmartLoading.vue'
// Import a code highlighting theme
import 'highlight.js/styles/atom-one-dark.css'

const route = useRoute()
const { find } = useStrapi()
const config = useRuntimeConfig()

const strapiUrl = config.public.strapi?.url || 'http://localhost:1337'

// Initialize Markdown parser with Syntax Highlighting and Image URL fixing
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

// Custom Image Renderer to handle Strapi relative URLs
md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  let src = token.attrGet('src')
  const alt = token.content
  
  if (src && src.startsWith('/')) {
    src = `${strapiUrl}${src}`
  }
  
  return `<figure class="my-8">
            <img src="${src}" alt="${alt}" class="w-full rounded-xl shadow-md" loading="lazy">
            ${alt ? `<figcaption class="text-center text-sm text-text-tertiary mt-2 italic">${alt}</figcaption>` : ''}
          </figure>`
}

// Fetch article by slug
const { data: articlesResponse, pending, error } = await useAsyncData(
  `article-${route.params.slug}`,
  () => find('articles', {
    filters: { slug: route.params.slug },
    populate: 'coverImage'
  })
)

const article = computed(() => {
  if (!articlesResponse.value?.data || articlesResponse.value.data.length === 0) return null
  return articlesResponse.value.data[0]
})

// Helper to resolve cover image URL
const getImageUrl = (image: any) => {
  if (!image) return null
  const url = image.url || image?.attributes?.url
  if (!url) return null
  if (url.startsWith('http')) return url
  const fullUrl = `${strapiUrl}${url}`
  console.log('🖼️ Resolved Banner URL:', fullUrl) // Debugging
  return fullUrl
}

// Format date
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Render markdown content
const renderedContent = computed(() => {
  try {
    if (!article.value) return ''
    const content = article.value.content || article.value.attributes?.content || ''
    if (!content) return ''
    return md.render(content)
  } catch (e) {
    console.error('Error rendering markdown:', e)
    return ''
  }
})
</script>

<template>
  <div class="bg-bg-primary min-h-screen pt-12 pb-20 transition-colors duration-300">
    <!-- Loading State -->
    <div v-if="pending" class="max-w-3xl mx-auto px-4 py-12 flex justify-center">
      <SmartLoading 
        :messages="[
          'Chargement de l\'article...',
          'Récupération du contenu Markdown...',
          'Coloration syntaxique du code...',
          'Optimisation des images...',
          'Bonne lecture !'
        ]"
      />
    </div>

    <!-- Error State -->
    <div v-else-if="error || !article" class="max-w-3xl mx-auto px-4 text-center py-20">
      <h1 class="text-3xl font-bold text-text-primary mb-4">Article non trouvé</h1>
      <p class="text-text-secondary mb-8">L'article demandé est introuvable.</p>
      <NuxtLink to="/articles" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-lg hover:opacity-90 transition-all">
        <ArrowLeft class="w-4 h-4" /> Retour aux articles
      </NuxtLink>
    </div>

    <!-- Article Content -->
    <article v-else class="max-w-3xl mx-auto px-4 sm:px-6">
      <!-- Back Link -->
      <NuxtLink to="/articles" class="inline-flex items-center gap-2 text-text-tertiary hover:text-primary-blue mb-8 transition-colors font-medium group">
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour aux articles
      </NuxtLink>

      <!-- Header -->
      <header class="mb-10">
        <div class="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
          <span v-if="article.category || article.attributes?.category" class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full font-bold text-xs uppercase tracking-wide">
            <Tag class="w-3 h-3" />
            {{ article.category || article.attributes?.category }}
          </span>
          <div class="flex items-center gap-1.5">
            <Calendar class="w-4 h-4 text-text-tertiary" />
            <span>{{ formatDate(article.publishedAt || article.attributes?.publishedAt) }}</span>
          </div>
          <div v-if="article.readTime || article.attributes?.readTime" class="flex items-center gap-1.5">
            <Clock class="w-4 h-4 text-text-tertiary" />
            <span>{{ article.readTime || article.attributes?.readTime }}</span>
          </div>
        </div>

        <h1 class="text-3xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
          {{ article.title || article.attributes?.title }}
        </h1>

        <!-- Cover Image -->
        <div v-if="getImageUrl(article.coverImage || article.attributes?.coverImage)" class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12 border border-bg-tertiary group">
          <img 
            :src="getImageUrl(article.coverImage || article.attributes?.coverImage)" 
            :alt="article.title || article.attributes?.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </header>

      <!-- Content Body -->
      <div class="article-content prose prose-lg dark:prose-invert max-w-none">
        <div v-html="renderedContent"></div>
      </div>

      <!-- Footer/Share -->
      <footer class="mt-20 pt-10 border-t border-bg-tertiary">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-text-tertiary italic">Merci de votre lecture !</p>
          <div class="flex gap-4">
            <NuxtLink to="/articles" class="px-6 py-2 bg-bg-secondary hover:bg-bg-tertiary text-text-primary rounded-lg font-medium transition-colors border border-bg-tertiary">
              Lire d'autres articles
            </NuxtLink>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>

<style>
/* Custom Styles for Article Content */
.article-content {
  color: var(--text-secondary);
}

/* Headings */
.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  color: var(--text-primary);
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
}

.article-content h2 {
  font-size: 1.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

/* Links */
.article-content a {
  color: #1171B8; /* primary-blue */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.article-content a:hover {
  color: #C2410C; /* primary-orange */
  text-decoration: underline;
}

/* Code Blocks */
.article-content pre {
  background-color: #1E1E1E !important; /* Atom One Dark bg */
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  border: 1px solid var(--bg-tertiary);
}

.article-content code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
}

/* Inline Code */
.article-content :not(pre) > code {
  color: #C2410C; /* primary-orange */
  background-color: var(--bg-secondary);
  padding: 0.2em 0.4em;
  border-radius: 0.375em;
  font-weight: 500;
}

/* Blockquotes */
.article-content blockquote {
  border-left: 4px solid #C2410C;
  background-color: var(--bg-secondary);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
  color: var(--text-secondary);
}

/* Lists */
.article-content ul {
  list-style-type: disc;
  padding-left: 1.625rem;
  margin: 1.25rem 0;
}

.article-content li {
  margin-bottom: 0.5rem;
}

.article-content li::marker {
  color: #C2410C;
}

/* Tables */
.article-content table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
}

.article-content th {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid var(--border-color);
}

.article-content td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

/* Images */
.article-content img {
  border-radius: 0.75rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
