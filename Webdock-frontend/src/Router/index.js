import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "roadmap",
      component: () => import("../views/roadmap.vue"),
    },
    {
      path: "/feature-request",
      name: "feature-request",
      component: () => import("../views/feature-request.vue"),
    },
    {
      path: "/feature-request/feature-comments",
      name: "feature-comments",
      component: () => import("../views/feature-comments.vue"),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admindashboard.vue')
    }
  ],
});

export default router;
