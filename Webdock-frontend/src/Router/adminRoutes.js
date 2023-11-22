import { createRouter, createWebHistory } from "vue-router";

import AdminDashboard from "../views/admindashboard.vue";
import Users from "../views/AdminViews/users.vue";

export default [
  {
    path: "/admin",
    redirect: "/admin/users",
    component: AdminDashboard,
    children: [
      {
        path: "users",
        component: Users,
      },
    ],
  },
];
