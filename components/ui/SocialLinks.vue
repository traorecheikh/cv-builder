<script setup lang="ts">
import { Linkedin, Github, Mail, Phone } from 'lucide-vue-next'

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/cheikh-traore',
    icon: Linkedin,
    color: '#0077B5',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/traorecheikh',
    icon: Github,
    color: '#333',
  },
  {
    name: 'Email',
    url: 'mailto:atidiane741@gmail.com',
    icon: Mail,
    color: '#E64922',
  },
  {
    name: 'Phone',
    url: 'tel:+221781706184',
    icon: Phone,
    color: '#1171B8',
  },
]
</script>

<template>
  <div class="flex gap-md">
    <a
      v-for="link in socialLinks"
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="w-12 h-12 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary hover:border-primary-blue flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-card group"
      :aria-label="link.name"
    >
      <component
        :is="link.icon"
        class="w-5 h-5 text-text-primary group-hover:text-primary-blue transition-colors"
      />
    </a>
  </div>
</template>
