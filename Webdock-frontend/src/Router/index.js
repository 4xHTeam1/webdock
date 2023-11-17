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
      path: "/roadmap",
      name: "roadmap",
      component: () => import("../views/Testroadmap.vue"),
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
      path: "/sso",
      name: "sso",
      component: () => import("../Testsso.vue"),
    },
  ],
});

export default router;
