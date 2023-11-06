import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/underholdning',
      name: 'underholdning',
      component: () => import('../views/underholdning.vue')
    }
  ]
})

export default router
