import { createRouter, createWebHistory } from "vue-router";

export default [
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
];
