import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import EducationView from '../views/EducationView.vue'
import SkillsView from '../views/SkillsView.vue'
import ProjectsView from '../views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/experience',
      name: 'experience',
      component: ExperienceView,
    },
    {
      path: '/education',
      name: 'education',
      component: EducationView,
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
  ],
})

export default router
