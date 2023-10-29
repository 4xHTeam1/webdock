import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import authStore from "./stores/authstore";
import adminStore from "./stores/adminstore";

createApp(App).use(authStore).use(adminStore).mount("#app");
