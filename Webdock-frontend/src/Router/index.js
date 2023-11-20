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
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admindashboard.vue')
    }
  ]
})

export default router
