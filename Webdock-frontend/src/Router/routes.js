import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...userRoutes, ...adminRoutes],
});

export default router;
