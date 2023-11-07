import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
  ],
});

export default router;
