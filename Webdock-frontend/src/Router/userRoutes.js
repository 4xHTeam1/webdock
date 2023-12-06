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
    path: "/feature-request/:id",
    name: "feature-comments",
    component: () => import("../views/feature-comments.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/searchsite.vue"),
  },
];
