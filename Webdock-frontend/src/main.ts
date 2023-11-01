import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import authStore from "./stores/authstore";
import adminStore from "./stores/adminstore";
import searchStore from "./stores/searchstore";
import PortalVue from "portal-vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

createApp(App)
  .use(authStore)
  .use(adminStore)
  .use(searchStore)
  .use(PortalVue)
  .mount("#app");
