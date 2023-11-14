import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'roadmap',
      component: () => import('../views/roadmap.vue')
    },
    {
      path: '/feature-request',
      name: 'feature-request',
      component: () => import('../views/feature-request.vue')
    },
    {
      path: '/feature-request/feature-comments',
      name: 'feature-comments',
      component: () => import('../views/feature-comments.vue')
    }
  ]
})

export default router
